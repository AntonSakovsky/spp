import { FC, ReactNode } from "react";

import style from "./DrawerProperty.module.scss";

type DrawerPropertyProps = {
    propertyIcon: ReactNode;
    propertyText: string;
    propertyField: ReactNode;
};

export const DrawerProperty: FC<DrawerPropertyProps> = ({
    propertyIcon,
    propertyText,
    propertyField,
}) => (
    <div className={style.property}>
        <div className={style.propertyName}>
            {propertyIcon}
            <span>{propertyText}</span>
        </div>
        <div className={style.propertyField}>{propertyField}</div>
    </div>
);
