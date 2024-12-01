import React, {Fragment, useEffect, useRef, useState} from "react";
import styles from './menu.module.css';
import ChartIcon from '@/assets/icons/chart.svg'
import GearIcon from '@/assets/icons/gear.svg'
import ReturnIcon from '@/assets/icons/return.svg'
import {MenuItemProps, MenuProps} from "@/types.ts";
import Preferences from "@/components/preferences";
import {createPortal} from "react-dom";

const MenuItem = (props: MenuItemProps) => {
    const {
        icon,
        text,
        kbkeys,
        isDisabled = false,
        onClick
    } = props;
    return (
        <button className={styles.menu_item} disabled={isDisabled} onClick={onClick}>
                <span className={styles.label}>
                    {icon} {text}
                </span>
            <span className={styles.shortcut}>
                {
                    kbkeys.length > 0 && (
                        kbkeys.map((keys, idx) => (
                            <Fragment key={keys + idx}>
                                <span className={styles.key}>{keys}</span>{idx === kbkeys.length - 1 ? '' : '+'}
                            </Fragment>
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
    const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

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
            <MenuItem icon={<ChartIcon/>} text="Statistics" kbkeys={['Ctrl', 'S']} isDisabled />
            <MenuItem
                icon={<GearIcon/>}
                text="Preferences"
                kbkeys={['Ctrl', 'P']}
                onClick={() => {
                setIsPreferencesOpen(true);
                    toggleMenu(false);
                }}
            />
            {
                isPreferencesOpen && createPortal(
                    <Preferences toggleFn={() => setIsPreferencesOpen(false)} />,
                    document.querySelector(".App")!
                )
            }
            <MenuItem icon={<ReturnIcon/>} text="Shortcuts" kbkeys={['Ctrl', 'K']} isDisabled />
        </div>
    )
}

export default Menu;