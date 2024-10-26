import { refreshToken } from "@api/index";
import { userStore } from "@mobx/UserStore/UserStore";
import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import io, { Socket } from "socket.io-client";

type WebsocketContextType = {
    socket: Socket | null;
    isRetry: boolean;
    requestName: string;
    setRequestName: (name: string) => void;
    setRetry: (flag: boolean) => void;
};

const WebSocketContext = createContext<WebsocketContextType>({
    socket: null,
    isRetry: false,
    requestName: "",
    setRequestName: (name: string) => {},
    setRetry: (flag: boolean) => {},
});

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

type WebSocketProviderProps = PropsWithChildren;

export const WebSocketProvider: FC<WebSocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const [isRetry, setIsRetry] = useState(false);
    const [requestName, setRequest] = useState("");

    useEffect(() => {
        const connectSocket = () => {
            socketRef.current = io("http://localhost:3000", {
                auth: {
                    token: userStore.accessToken,
                },
            });

            socketRef.current?.on("exception", async (error) => {
                console.log('exception');
                if (error.message === "Invalid token" && error.status === "error") {
                    try {
                        await refreshToken();
                        socketRef.current?.disconnect();
                        connectSocket();
                        setIsRetry(true);
                    } catch (error) {
                        console.log(error);
                    }
                }
            });

            socketRef.current?.on("message", (data) => {
                console.log(data);
            });

            setSocket(socketRef.current);
        };
        connectSocket();

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    return (
        <WebSocketContext.Provider
            value={{
                socket,
                isRetry,
                setRetry: (flag: boolean) => setIsRetry(flag),
                requestName,
                setRequestName: (name: string) => setRequest(name),
            }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};
