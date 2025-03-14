import React, {Dispatch, MutableRefObject, SetStateAction} from "react";

export type ProviderChildProps = {
    children: React.ReactNode;
}

export type ThemeContextType = {
    darkMode: boolean;
    toggleDarkMode(val?: boolean): void;
}

export enum UserStateEnum {
    FOCUS = "Focus",
    SHORT_BREAK = "Short break",
    LONG_BREAK = "Long break",
}

export type UserContextType = {
    state: UserStateEnum;
    setUserStateHandler: (state: UserStateEnum) => void;
    gotoNextState: () => void;
    increasePomoLength: () => void;
    decreasePomoLength: () => void;
    pomoLength: number;
    setPomoLength: (pomoLength: number) => void;
    isNotifEnabled: boolean;
    requestNotifPermission: () => void;
}

export type PomoObjType = {
    focus: number,
    short: number,
    long: number,
}

export type TimerStateType = "STOP" | "START" | "PAUSE";

export type TimerContextType = {
    state: TimerStateType;
    handleSetTimerState: (state: TimerStateType) => void;
    currentTime: number;
    setCurrentTime: (time: number) => void;
    pomoTime: PomoObjType;
    setPomo: (newPomoTime: number, type: keyof PomoObjType) => void;
    setCallbackFn: Dispatch<SetStateAction<() => void>>
    isSoundEnabled: boolean;
    setIsSoundEnabled: Dispatch<SetStateAction<boolean>>;
    isAutoResume: boolean;
    setIsAutoResume: Dispatch<SetStateAction<boolean>>;
}

export type MenuProps = {
    isOpen: boolean;
    toggleMenu: (isOpen?:boolean) => void;
    btnRef: MutableRefObject<HTMLButtonElement | null>;
}

export type MenuItemProps = {
    icon: React.ReactNode;
    text: string;
    kbkeys: string[];
    isDisabled?: boolean;
    onClick?: () => void;
}

export type PreferencesProps = {
    toggleFn: (isOpen: boolean) => void;
}

export type NumberInputProps = {
    defaultValue: number;
    onChange: (value: number) => void;
}

type OnValueChangeType<T> = (value: T) => void;

export type ItemLabelType = {
    label: string;
    isDisabled?: boolean;
}

export type ItemPropsType =
    | ItemLabelType & {itemType: 'switch'; defaultValue: boolean; onValueChange: OnValueChangeType<boolean> }
    | ItemLabelType & {itemType: 'input'; defaultValue: number; onValueChange: OnValueChangeType<number> };
