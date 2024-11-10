import React from "react";

export type ProviderChildProps = {
    children: React.ReactNode;
}

export type UserState = "Focus" | "Short break" | "Long break"

export type UserContextType = {
    state: UserState;
    handleSetUserState: (state: UserState) => void;
}