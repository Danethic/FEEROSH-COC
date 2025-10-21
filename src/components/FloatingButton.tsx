import React from "react";
import { IonIcon } from "@ionic/react";
import { useHistory } from "react-router";
import "./FloatingButton.css";

interface FloatingButtonProps {
    icon: string;
    side?: "left" | "right";
    background?: string;
    color?: string;
    offset?: string; // por ejemplo "50%", "10vh", "120px"
    to?: string;
    border?: string;
    onClick?: () => void;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
    icon,
    side = "right",
    offset = "50%",
    color,
    background,
    border,
    to,
    onClick,
}) => {
    const history = useHistory();

    const handleClick = () => {
        if (onClick) onClick();
        else if (to) history.push(to);
    };

    return (
        <div
            className={`floating-btn ${side}`}
            style={{ top: offset, color: color, background: background, border: border, boxShadow: `0 0px 10px ${background}` }}
            onClick={handleClick}
        >
            <IonIcon icon={icon} className="floating-icon" />
        </div>
    );
};
