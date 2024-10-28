import { FC, ReactNode } from "react";

import style from "./AuthFormSkeleton.module.scss";

type AuthFormSkeletonProps = {
    image: string;
    imageAlt?: string;
    title: string;
    subtitle: string;
    form: ReactNode;
};

export const AuthFormSkeleton: FC<AuthFormSkeletonProps> = ({
    title,
    subtitle,
    image,
    imageAlt,
    form,
}) => (
    <div className={style.formSkeleton}>
        <div className={style.imagePart}>
            <h1 className={style.title}>{title}</h1>
            <p className={style.subtitle}>{subtitle}</p>
            <div className={style.image}>
                <img src={image} alt={imageAlt} />
            </div>
        </div>

        <div className={style.formPart}>
            {form}
        </div>
    </div>
);
