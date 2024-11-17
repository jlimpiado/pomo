import {createContext, FC, useContext, useEffect, useRef, useState} from "react";
import {PomoObjType, ProviderChildProps, TimerContextType, TimerStateType} from "@/types.ts";

const defaultPomo = {
    focus: 1500,
    short: 300,
    long: 900
}

const defaultValue: TimerContextType = {
    state: "STOP",
    handleSetTimerState(){},
    currentTime: 0,
    setCurrentTime: () => {},
    pomoTime: defaultPomo,
    setPomoTime() {}
}

const TimerContext = createContext(defaultValue);

export const useTimerContext = () => useContext(TimerContext);

const TimerProvider: FC<ProviderChildProps> = ({children}) => {
    const [timerState, setTimerState] = useState<TimerStateType>("STOP");
    // 25 * 60 = 25 minutes in seconds
    const [currentTime, setCurrentTime] = useState(() => defaultPomo.focus);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [pomoTime, setPomoTime] = useState<PomoObjType>(defaultPomo)

    const handleSetTimerState = (state: TimerStateType) => {
        setTimerState(state)
    }

    const startCountDown = () => {
        setCurrentTime(prev => {
            const newTime = prev - 1;
            if (newTime === 0) {
                setTimerState("STOP");
                return 0;
            }
            return newTime;
        });
    }

    useEffect(() => {
        switch (timerState) {
            case "START":
                if (intervalRef.current !== null) clearInterval(intervalRef.current);
                intervalRef.current = setInterval(startCountDown, 1000);
                break;
            case "PAUSE":
                if (intervalRef.current !== null) clearInterval(intervalRef.current);
                break;
            case "STOP":
                if (intervalRef.current !== null) clearInterval(intervalRef.current);
                break;
        }
    }, [timerState])

    return (
        <TimerContext.Provider value={{
            state: timerState,
            handleSetTimerState,
            currentTime,
            setCurrentTime,
            pomoTime,
            setPomoTime
        }}>
            {children}
        </TimerContext.Provider>
    )
}

export default TimerProvider;