import React from "react";

export type ProviderChildProps = {
    children: React.ReactNode;
}

export type UserStateType = "Focus" | "Short break" | "Long break"

export type UserContextType = {
    state: UserStateType;
    handleSetUserState: (state: UserStateType) => void;
}

export type TimerStateType = "STOP" | "START" | "PAUSE";

export type TimerContextType = {
    state: TimerStateType;
    handleSetTimerState: (state: TimerStateType) => void;
}