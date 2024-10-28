import style from "./Alternative.module.scss";
import { authServices } from "./authServices";

export const AlternativeAuth = () => {
    return (
        <div className={style.alternativeAuth}>
            <p>or continue</p>
            <div className={style.buttons}>{authServices}</div>
        </div>
    );
};
