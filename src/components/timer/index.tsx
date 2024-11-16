import styles from './timer.module.css';
import {clsx} from 'clsx';
import {useTimerContext} from "@/context/timerContext.tsx";
import {useEffect, useState} from "react";
import {formatTime} from "@/helpers.ts";

const Timer = () => {
    const {state, currentTime} = useTimerContext();
    const [isRunning, setIsRunning] = useState(false);
    const [minutes, setMinutes] = useState(() => Math.floor(currentTime / 60));
    const [seconds, setSeconds] = useState(() => currentTime % 60);

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
    }, [currentTime]);

    return (
        <div className={clsx(styles.timer_container, {
            [styles.active_timer]: isRunning
        })}>
            <p>{formatTime(minutes)}<br/>{formatTime(seconds)}</p>
        </div>
    )
}

export default Timer;