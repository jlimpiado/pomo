import {createContext, FC, useContext, useEffect, useRef, useState} from "react";
import {ProviderChildProps, TimerContextType, TimerStateType} from "@/types.ts";

const defaultValue: TimerContextType = {
    state: "STOP",
    handleSetTimerState: (state) => console.log(state),
    currentTime: 0,
    setCurrentTime: (time: number) => console.log(time),
}

const TimerContext = createContext(defaultValue);

export const useTimerContext = () => useContext(TimerContext);

const TimerProvider: FC<ProviderChildProps> = ({children}) => {
    const [timerState, setTimerState] = useState<TimerStateType>("STOP");
    // 25 * 60 = 25 minutes in seconds
    const [currentTime, setCurrentTime] = useState(() => 1500);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
            setCurrentTime
        }}>
            {children}
        </TimerContext.Provider>
    )
}

export default TimerProvider;