import React from "react";
import styles from './menu.module.css';
import ChartIcon from '@/assets/icons/chart.svg'
import GearIcon from '@/assets/icons/gear.svg'
import ReturnIcon from '@/assets/icons/return.svg'
import {MenuProps} from "@/types.ts";

const Menu: React.FC<MenuProps> = (props) => {
    const {
        isOpen,
        // toggleMenu,
    } = props;
    return (
        <div className={`${styles.menu_container}${isOpen ? ' ' + styles.open : ''}`}>
            <section className={styles.menu_item}>
                <ChartIcon /> Statistics
            </section>
            <section className={styles.menu_item}>
                <GearIcon /> Preferences
            </section>
            <section className={styles.menu_item}>
                <ReturnIcon /> Shortcuts
            </section>
        </div>
    )
}

export default Menu;