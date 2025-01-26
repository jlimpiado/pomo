import {createContext, FC, useContext, useEffect, useRef, useState} from "react";
import {PomoObjType, ProviderChildProps, TimerContextType, TimerStateType} from "@/types.ts";
import {getMinutes} from "@/helpers.ts";
import alarmAudio from "@/assets/alarm-beep.wav";

const defaultPomo = {
    focus: 1500,
    short: 300,
    long: 900
}

const defaultValue: TimerContextType = {
    state: "STOP",
    handleSetTimerState(){},
    currentTime: defaultPomo.focus,
    setCurrentTime: () => {},
    pomoTime: defaultPomo,
    setPomo() {},
    setCallbackFn(){},
    isSoundEnabled: true,
    setIsSoundEnabled: () => {},
    isAutoResume: false,
    setIsAutoResume(){}
}

const TimerContext = createContext(defaultValue);

export const useTimerContext = () => useContext(TimerContext);

const TimerProvider: FC<ProviderChildProps> = ({children}) => {
    const [timerState, setTimerState] = useState<TimerStateType>(defaultValue.state);
    // 25 * 60 = 25 minutes in seconds
    const [currentTime, setCurrentTime] = useState(defaultValue.currentTime);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [pomoTime, setPomoTime] = useState<PomoObjType>(defaultValue.pomoTime)
    const [callbackFn, setCallbackFn] = useState(() => function(){})
    const [isSoundEnabled, setIsSoundEnabled] = useState(defaultValue.isSoundEnabled);
    const [isAutoResume, setIsAutoResume] = useState(defaultValue.isAutoResume);
    const audioRef = useRef<HTMLAudioElement>(new Audio(alarmAudio));

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

    const setPomo = (val: number, type: keyof typeof defaultPomo) => {
        setPomoTime(prev => {
            if(getMinutes(val) > 60 || val === 0) return prev;
            return ({...prev, [type]: val})
        })
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


    useEffect(() => {
        const playAlarm = async () => {
            if(!isSoundEnabled) return Promise.resolve();

            const playPromise = audioRef.current.play()
            if(playPromise !== undefined) {
              return playPromise.then((_) => {
                setTimeout(() => {
                    audioRef.current.pause(); // Pauses the audio
                    audioRef.current.currentTime = 0; // Resets playback to the beginning
                }, 3000); // 3 seconds
              });
            }

            return Promise.resolve();
        }

        const timerEnded = () => {
          playAlarm()
            .then(() => callbackFn())
            .then(() => {
              if (isAutoResume) setTimerState("START");
            });
        }

        if(currentTime === 0) {
            timerEnded()
        }
    }, [currentTime, isSoundEnabled, callbackFn, isAutoResume]);

    return (
        <TimerContext.Provider value={{
            state: timerState,
            handleSetTimerState,
            currentTime,
            setCurrentTime,
            pomoTime,
            setPomo,
            setCallbackFn,
            isSoundEnabled,
            setIsSoundEnabled,
            isAutoResume,
            setIsAutoResume
        }}>
            {children}
        </TimerContext.Provider>
    )
}

export default TimerProvider;