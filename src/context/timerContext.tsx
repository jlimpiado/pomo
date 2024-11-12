import {createContext, FC, useContext, useState} from "react";
import {ProviderChildProps, TimerContextType, TimerStateType} from "@/types.ts";

const defaultValue: TimerContextType = {
   state: "STOP",
    handleSetTimerState:(state) => console.log(state),
}

const TimerContext = createContext(defaultValue);

export const useTimerContext = () => useContext(TimerContext);

const TimerProvider: FC<ProviderChildProps> = ({ children }) => {
    const [timerState, setTimerState] = useState<TimerStateType>("STOP")

    const handleSetTimerState = (state:TimerStateType) => {
        setTimerState(state)
    }

    return (
        <TimerContext.Provider value={{
            state: timerState,
            handleSetTimerState
        }}>
            {children}
        </TimerContext.Provider>
    )
}

export default TimerProvider;