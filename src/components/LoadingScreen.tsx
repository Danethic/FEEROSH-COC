import React from "react";
import { IonSpinner } from "@ionic/react";
import "./LoadingScreen.css";

export const LoadingScreen: React.FC<{ message?: string }> = ({ message }) => (
    <div className="loading-screen">
        <IonSpinner name="crescent" color="light" />
        {message && <p>{message}</p>}
    </div>
);
