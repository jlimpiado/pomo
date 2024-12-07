import styles from './preferences.module.css';
import {useEffect, useRef} from "react";
import {ItemPropsType, PomoObjType, PreferencesProps} from "@/types.ts";
import CloseIcon from "@/assets/icons/close.svg";
import Item from "@/components/preferences/item.tsx";
import {useTimerContext} from "@/context/timerContext.tsx";
import {useUserContext} from "@/context/userProvider.tsx";
import {getMinutes, minutesToSeconds} from "@/helpers.ts";
import {useThemeContext} from "@/context/themeProvider.tsx";
import {createPortal} from "react-dom";

const Preferences = (props: PreferencesProps) => {
    const {
        toggleFn
    } = props;
    const preferencesRef = useRef<HTMLDivElement>(null);
    const {
        pomoTime,
        setPomo,
        isSoundEnabled,
        setIsSoundEnabled,
        isAutoResume,
        setIsAutoResume
    } = useTimerContext();
    const {
        pomoLength,
        setPomoLength,
        isNotifEnabled,
        requestNotifPermission
    } = useUserContext();
    const {toggleDarkMode, darkMode} = useThemeContext();

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

    const itemsArr: ItemPropsType[] = [
        {
            label: "Dark mode",
            defaultValue: darkMode,
            itemType: "switch",
            onValueChange: (val: boolean) => toggleDarkMode(val),
        },
        {
            label: "Focus (minutes)",
            defaultValue: getMinutes(pomoTime.focus),
            itemType: "input",
            onValueChange: (val: number) => updatePomo(val, "focus"),
        },
        {
            label: "Pomos",
            defaultValue: pomoLength,
            itemType: "input",
            onValueChange: (val: number) => setPomoLength(val),
        },
        {
            label: "Short break (minutes)",
            defaultValue: getMinutes(pomoTime.short),
            itemType: "input",
            onValueChange: (val: number) => setPomo(val, "short"),
        },
        {
            label: "Long break (minutes)",
            defaultValue: getMinutes(pomoTime.long),
            itemType: "input",
            onValueChange: (val: number) => setPomo(val, "long"),
        },
        {
            label: "Autoresume",
            defaultValue: isAutoResume,
            itemType: "switch",
            onValueChange: (val: boolean) => setIsAutoResume(val),
        },
        {
            label: "Sound",
            defaultValue: isSoundEnabled,
            itemType: "switch",
            onValueChange: (val: boolean) => setIsSoundEnabled(val),
        },
        {
            label: "Notifications",
            defaultValue: isNotifEnabled,
            itemType: "switch",
            onValueChange: () => {
                if(!isNotifEnabled) requestNotifPermission()
                else new Notification("You can disable notifications via your browser settings.")
            },
            isDisabled: !("Notification" in window)
        },
    ]

    return (
        <section ref={preferencesRef} className={styles.container}>
            {createPortal(<span className={styles.backdrop}></span>, document.querySelector(".App")!)}

            <div className={styles.header}>
                <h1>Settings</h1>
                <button className={styles.close_btn} onClick={() => toggleFn(false)}>
                    <CloseIcon />
                </button>
            </div>
            <ul style={{listStyleType: 'none', padding: '0 0 16px'}}>
                {itemsArr.map((item, idx) => (
                    <Item key={item.itemType+"@"+item.defaultValue+"@"+idx} {...item} />
                ))}
            </ul>
        </section>
    )
}

export default Preferences;