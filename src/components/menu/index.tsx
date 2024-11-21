import React, { useEffect, useRef} from "react";
import styles from './menu.module.css';
import ChartIcon from '@/assets/icons/chart.svg'
import GearIcon from '@/assets/icons/gear.svg'
import ReturnIcon from '@/assets/icons/return.svg'
import {MenuProps} from "@/types.ts";

const Menu: React.FC<MenuProps> = (props) => {
    const {
        isOpen,
        toggleMenu,
        btnRef
    } = props;
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickedOutsite = (event: MouseEvent) => {
            if(menuRef.current && !menuRef.current.contains(event.target as Node)) {
                if(btnRef.current && btnRef.current.contains(event.target as Node)) return;
                toggleMenu(false);
            }
        }

        if(isOpen) {
            document.addEventListener('mousedown', handleClickedOutsite);
        } else {
            document.removeEventListener('mousedown', handleClickedOutsite);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickedOutsite);
        }
    }, [btnRef, isOpen, toggleMenu]);

    return (
        <div ref={menuRef} className={`${styles.menu_container}${isOpen ? ' ' + styles.open : ''}`}>
            <section className={styles.menu_item}>
                <section>
                    <ChartIcon /> Statistics
                </section>
                <span className={styles.shortcut}>
                    <span className={styles.key}>Ctrl</span>+<span className={styles.key}>S</span>
                </span>
            </section>
            <section className={styles.menu_item}>
                <section>
                    <GearIcon /> Preferences
                </section>
                <span className={styles.shortcut}>
                    <span className={styles.key}>Ctrl</span>+<span className={styles.key}>P</span>
                </span>
            </section>
            <section className={styles.menu_item}>
                <section>
                    <ReturnIcon /> Shortcuts
                </section>
                <span className={styles.shortcut}>
                    <span className={styles.key}>Ctrl</span>+<span className={styles.key}>K</span>
                </span>
            </section>
        </div>
    )
}

export default Menu;