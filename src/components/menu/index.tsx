import React, { useEffect, useRef} from "react";
import styles from './menu.module.css';
import ChartIcon from '@/assets/icons/chart.svg'
import GearIcon from '@/assets/icons/gear.svg'
import ReturnIcon from '@/assets/icons/return.svg'
import {MenuItemProps, MenuProps} from "@/types.ts";

const MenuItem = (props: MenuItemProps) => {
    const {
        icon,
        text,
        kbkeys
    } = props;
    return (
        <button className={styles.menu_item}>
                <span className={styles.label}>
                    {icon} {text}
                </span>
            <span className={styles.shortcut}>
                {
                    kbkeys.length > 0 && (
                        kbkeys.map((keys, idx) => (
                            <>
                                <span className={styles.key} key={keys}>{keys}</span>{idx === kbkeys.length - 1 ? '': '+'}
                            </>
                        ))
                    )
                }
            </span>
        </button>
    )
}

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
            <button className={styles.menu_item} disabled>
                <MenuItem icon={<ChartIcon />} text="Statistics" kbkeys={['Ctrl', 'S']} />
            </button>
            <button className={styles.menu_item} disabled>
                <MenuItem icon={<GearIcon />} text="Preferences" kbkeys={['Ctrl', 'P']} />
            </button>
            <button className={styles.menu_item} disabled>
                <MenuItem icon={<ReturnIcon />} text="Shortcuts" kbkeys={['Ctrl', 'K']} />
            </button>
        </div>
    )
}

export default Menu;