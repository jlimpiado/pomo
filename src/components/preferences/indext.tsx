import styles from './preferences.module.css';
import {useEffect, useRef} from "react";
import {PreferencesProps} from "@/types.ts";

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
            </div>
        </section>
    )
}

export default Preferences;