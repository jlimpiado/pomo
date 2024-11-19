import styles from './timer.module.css';
import {clsx} from 'clsx';
import {useTimerContext} from "@/context/timerContext.tsx";
import {useEffect, useState} from "react";
import {formatTime} from "@/helpers.ts";
import {useUserContext} from "@/context/userProvider.tsx";

const Timer = () => {
    const {state, currentTime} = useTimerContext();
    const {gotoNextState} = useUserContext();
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

        if(currentTime === 0) {
            gotoNextState();
        }
    }, [currentTime, gotoNextState]);

    return (
        <div className={clsx(styles.timer_container, {
            [styles.active_timer]: isRunning
        })}>
            <p>{formatTime(minutes)}<br/>{formatTime(seconds)}</p>
        </div>
    )
}

export default Timer;