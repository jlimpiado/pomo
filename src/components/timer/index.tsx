import styles from './timer.module.css';
import {clsx} from 'clsx';
import {useTimerContext} from "@/context/timerContext.tsx";
import {useEffect, useState} from "react";

const Timer = () => {
    const {state} = useTimerContext();
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        switch(state) {
            case "STOP":
            case "PAUSE":
                setIsRunning(false);
                break;
            case "START":
                setIsRunning(true);
        }
    }, [state])

    return (
        <div className={clsx(styles.timer_container, {
            [styles.active_timer]: isRunning
        })}>
            <p>25<br />00</p>
        </div>
    )
}

export default Timer;