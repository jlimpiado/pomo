import styles from './preferences.module.css';
import {useEffect, useRef} from "react";
import {PomoObjType, PreferencesProps} from "@/types.ts";
import CloseIcon from "@/assets/icons/close.svg";
import Item from "@/components/preferences/item.tsx";
import {useTimerContext} from "@/context/timerContext.tsx";
import {useUserContext} from "@/context/userProvider.tsx";
import {getMinutes, minutesToSeconds} from "@/helpers.ts";

const Preferences = (props: PreferencesProps) => {
    const {
        toggleFn
    } = props;
    const preferencesRef = useRef<HTMLDivElement>(null);
    const {
        pomoTime,
        setPomo
    } = useTimerContext();
    const {pomoLength} = useUserContext();

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

    const updatePomo = (newVal: number, type: keyof PomoObjType) => {
        setPomo(minutesToSeconds(newVal), type);
    }

    return (
        <section ref={preferencesRef} className={styles.container}>
            <div className={styles.header}>
                <h1>Settings</h1>
                <button className={styles.close_btn} onClick={() => toggleFn(false)}>
                    <CloseIcon />
                </button>
            </div>
            <ul style={{listStyleType: 'none', padding: '0 0 16px'}}>
                <Item label="Dark mode" defaultValue={false} itemType="switch" onValueChange={(val) => console.log(val)} />
                <Item label="Focus (minutes)" defaultValue={getMinutes(pomoTime.focus)} itemType="input" onValueChange={(val) => updatePomo(val, "focus")} />
                <Item label="Pomos" defaultValue={pomoLength} itemType="input" onValueChange={(val) => console.log(val)}/>
                <Item label="Short break (minutes)" defaultValue={getMinutes(pomoTime.short)} itemType="input" onValueChange={(val) => updatePomo(val, "short")} />
                <Item label="Long break (minutes)" defaultValue={getMinutes(pomoTime.long)} itemType="input" onValueChange={(val) => updatePomo(val, "long")} />
                <Item label="Auto resume" defaultValue={false} itemType="switch" onValueChange={(val) => console.log(val)} />
                <Item label="Sound" defaultValue={false} itemType="switch" onValueChange={(val) => console.log(val)} />
                <Item label="Notification" defaultValue={false} itemType="switch" onValueChange={(val) => console.log(val)} />
            </ul>
        </section>
    )
}

export default Preferences;