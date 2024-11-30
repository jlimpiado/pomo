import styles from './numberInput.module.css';
import ArrowIcon from '@/assets/icons/arrow.svg';
import {ChangeEvent, FC} from "react";
import {NumberInputProps} from "@/types.ts";

const NumberInput: FC<NumberInputProps> = (props) => {
    const {
        defaultValue,
        onChange
    } = props;
    const incrementCount = () => {
        onChange(defaultValue + 1);
    }

    const decrementCount = () => {
        let nextCount = defaultValue - 1;
        if(nextCount <= 0) nextCount = 0
        onChange(nextCount);
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(+event.target.value);
    }

    return (
        <div className={styles.container}>
            <input className={styles.input} type="number" value={defaultValue} onChange={handleOnChange}/>
            <section>
                <button className={styles.btn_up} onClick={incrementCount}>
                    <ArrowIcon />
                </button>
                <button className={styles.btn_down} onClick={decrementCount}>
                    <ArrowIcon />
                </button>
            </section>
        </div>
    )
}

export default NumberInput;