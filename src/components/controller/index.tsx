import ThreeDots from '@/assets/icons/three_dots.svg';
import PlayIcon from '@/assets/icons/play.svg';
import FastForward from '@/assets/icons/fast_forward.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import styles from './controller.module.css';
import {useTimerContext} from "@/context/timerContext.tsx";
import {useUserContext} from "@/context/userProvider.tsx";
import {useEffect} from "react";

const Controller = () => {
    const {state, handleSetTimerState, pomoTime, setCurrentTime} = useTimerContext();
    const {state: userState,gotoNextState} = useUserContext();

    const handleFastForward = () => {
        gotoNextState();
        handleSetTimerState('STOP')
    }

    useEffect(() => {
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
    }, [pomoTime, setCurrentTime, userState]);

    return (
        <div className={styles.controller}>
            <button className={styles.secondary}>
                <ThreeDots/>
            </button>
            <button className={styles.primary} onClick={() => {
                if (state === 'START') handleSetTimerState('PAUSE');
                else handleSetTimerState("START");
            }}>
                {
                    state !== "START" ?
                        <PlayIcon/>
                        : <PauseIcon/>
                }
            </button>
            <button className={styles.secondary} onClick={handleFastForward}>
                <FastForward/>
            </button>
        </div>
    )
}

export default Controller;