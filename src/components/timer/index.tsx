import styles from './timer.module.css';
import {clsx} from 'clsx';
import {useTimerContext} from "@/context/timerContext.tsx";
import {useEffect, useState} from "react";
import {formatTime} from "@/helpers.ts";
import {useUserContext} from "@/context/userProvider.tsx";

const Timer = () => {
    const {state, currentTime, pomoTime, setCurrentTime, handleSetTimerState, setCallbackFn} = useTimerContext();
    const {state: userState, gotoNextState} = useUserContext();
    const [isRunning, setIsRunning] = useState(false);
    const [minutes, setMinutes] = useState(() => Math.floor(currentTime / 60));
    const [seconds, setSeconds] = useState(() => currentTime % 60);

    useEffect(() => {
        setCallbackFn(() => gotoNextState);
    }, [gotoNextState, setCallbackFn]);

    useEffect(() => {
        switch (state) {
            case "STOP":
            case "PAUSE":
                setIsRunning(false);
                break;

            case "START":
                setIsRunning(true);
                break;

            default:
                setIsRunning(false);
        }
    }, [state])

    useEffect(() => {
        setMinutes(Math.floor(currentTime / 60));
        setSeconds(currentTime % 60);
    }, [currentTime, gotoNextState]);

    useEffect(() => {
        document.title = isRunning ? `${userState.toUpperCase()} ${formatTime(minutes)}:${formatTime(seconds)}` : "POMO"
    }, [minutes, seconds, isRunning, userState])

    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | undefined;
        if(!favicon) return;
        switch (userState) {
            case "Focus":
                favicon.href = "/focus.svg";
                break;
            case "Short break":
                favicon.href = "/shortBreak.svg";
                break;
            case "Long break":
                favicon.href = "/longBreak.svg";
                break;
        }

    }, [userState])

    const resetPomoTime = () => {
        handleSetTimerState('STOP')
        switch (userState) {
            case "Focus":
                setCurrentTime(pomoTime.focus)
                break;
            case "Short break":
                setCurrentTime(pomoTime.short)
                break;
            case "Long break":
                setCurrentTime(pomoTime.long)
                break;
        }
    }

    return (
        <div className={clsx(styles.timer_container, {
            [styles.active_timer]: isRunning
        })}>
            <button onClick={resetPomoTime}>{formatTime(minutes)}<br/>{formatTime(seconds)}</button>
        </div>
    )
}

export default Timer;