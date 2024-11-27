import React, {MutableRefObject} from "react";

export type ProviderChildProps = {
    children: React.ReactNode;
}

export type UserStateType = "Focus" | "Short break" | "Long break"

export type UserContextType = {
    state: UserStateType;
    setUserStateHandler: (state: UserStateType) => void;
    gotoNextState: () => void;
    increasePomoLength: () => void;
    decreasePomoLength: () => void;
    setPomoLength: (pomoLength: number) => void;
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
    setPomoTime: (newPomoTime: PomoObjType) => void;
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
type OnValueChangeType<T> = (value: T) => void;

export type ItemLabelType = {
    label: string;
}

export type ItemPropsType =
    | ItemLabelType & {itemType: 'switch'; defaultValue: boolean; onValueChange: OnValueChangeType<boolean> }
    | ItemLabelType & {itemType: 'input'; defaultValue: number; onValueChange: OnValueChangeType<number> };
