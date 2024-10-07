import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@components": resolve(__dirname, "src/components"),
            "@utils": resolve(__dirname, "src/utils"),
            "@assets": resolve(__dirname, "src/assets"),
            "@constants": resolve(__dirname, "src/constants"),
            "@services": resolve(__dirname, "src/services"),
            "@type": resolve(__dirname, "src/types"),
            "@api": resolve(__dirname, "src/api"),
            "@mobx": resolve(__dirname, "src/mobx"),
            "@hooks": resolve(__dirname, "src/hooks"),
            "@hocs": resolve(__dirname, "src/hocs"),
        },
    },
});
