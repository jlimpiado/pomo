import ThreeDots from '@/assets/icons/three_dots.svg';
import PlayIcon from '@/assets/icons/play.svg';
import FastForward from '@/assets/icons/fast_forward.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import styles from './controller.module.css';
import {useTimerContext} from "@/context/timerContext.tsx";
import {useUserContext} from "@/context/userProvider.tsx";
import {useEffect, useState} from "react";
import Menu from "@/components/menu";

const Controller = () => {
    const {state, handleSetTimerState, pomoTime, setCurrentTime} = useTimerContext();
    const {state: userState,gotoNextState} = useUserContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleFastForward = () => {
        gotoNextState();
        handleSetTimerState('STOP')
    }

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
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
            <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <button className={styles.secondary} onClick={toggleMenu}>
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