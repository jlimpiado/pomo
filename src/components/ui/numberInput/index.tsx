import styles from './numberInput.module.css';
import ArrowIcon from '@/assets/icons/arrow.svg';

const NumberInput = () => {
    return (
        <div className={styles.container}>
            <input className={styles.input} type="number"/>
            <section>
                <button>
                    <ArrowIcon />
                </button>
                <button>
                    <ArrowIcon />
                </button>
            </section>
        </div>
    )
}

export default NumberInput;