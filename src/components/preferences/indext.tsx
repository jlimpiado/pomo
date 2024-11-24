import styles from './preferences.module.css';
import {useEffect, useRef} from "react";
import {PreferencesProps} from "@/types.ts";
import CloseIcon from "@/assets/icons/close.svg";
import {NumberInput, Switch} from "@/components/ui";

const Preferences = (props: PreferencesProps) => {
    const {
        toggleFn
    } = props;
    const preferencesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(preferencesRef.current && !preferencesRef.current.contains(event.target as Node)) {
                toggleFn(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [toggleFn])

    return (
        <section ref={preferencesRef} className={styles.container}>
            <div className={styles.header}>
                <h1>Settings</h1>
                <button className={styles.close_btn} onClick={() => toggleFn(false)}>
                    <CloseIcon />
                </button>
            </div>
            <div>
                <Switch defaultVal={false} onSwitch={(val) => console.log(val)}/>
                <NumberInput />
            </div>
        </section>
    )
}

export default Preferences;