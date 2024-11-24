import styles from './switch.module.css';
import React, {useEffect, useState} from "react";

export type SwitchProps = {
    defaultVal?: boolean,
    onSwitch(newVal: boolean): void,
};

const Switch: React.FC<SwitchProps> = (props) => {
    const {
        defaultVal = false,
        onSwitch,
    } = props;
    const [isChecked, setIsChecked] = useState(defaultVal);

    useEffect(() => {
        onSwitch(isChecked);
    }, [onSwitch, isChecked]);

    return (
        <button data-switch={isChecked} className={styles.switch} onClick={() => {setIsChecked(prev => !prev)}}>
            <span className={styles.circle}></span>
        </button>
    )
}

export default Switch;