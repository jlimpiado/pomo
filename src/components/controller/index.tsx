import ThreeDots from '@/assets/icons/three_dots.svg';
import PlayIcon from '@/assets/icons/play.svg';
import FastForward from '@/assets/icons/fast_forward.svg';
// import PauseIcon from '@/assets/icons/pause.svg';
import styles from './controller.module.css';

const Controller = () => {
    return (
        <div className={styles.controller}>
            <button className={styles.secondary}>
                <ThreeDots />
            </button>
            <button className={styles.primary}>
                <PlayIcon />
            </button>
            <button className={styles.secondary}>
                <FastForward />
            </button>
        </div>
    )
}

export default Controller;