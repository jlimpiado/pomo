import styles from './numberInput.module.css';
import ArrowIcon from '@/assets/icons/arrow.svg';
import {ChangeEvent, FC, useEffect, useState} from "react";
import {NumberInputProps} from "@/types.ts";

const NumberInput: FC<NumberInputProps> = (props) => {
    const {
        defaultValue,
        onChange
    } = props;
    const [count, setCount] = useState(() => defaultValue);

    const incrementCount = () => {
        setCount(prev => prev + 1);
    }

    const decrementCount = () => {
        setCount(prev => {
            const nextCount = prev - 1;
            if(nextCount <= 0) return 0;
            return nextCount;
        });
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCount(Number(event.target.value))
    }

    useEffect(() => {
        onChange(count)
    }, [count, onChange]);

    return (
        <div className={styles.container}>
            <input className={styles.input} type="number" value={count} onChange={handleOnChange}/>
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