import styles from './switch.module.css';
import React  from "react";

export type SwitchProps = {
    defaultVal?: boolean,
    onSwitch(newVal: boolean): void,
};

const Switch: React.FC<SwitchProps> = (props) => {
    const {
        defaultVal = false,
        onSwitch,
    } = props;

    return (
        <button data-switch={defaultVal} className={styles.switch} onClick={() => {
            onSwitch(!defaultVal)
        }}>
            <span className={styles.circle}></span>
        </button>
    )
}

export default Switch;