import {FC, useEffect, useState} from "react";
import {ItemPropsType} from "@/types.ts";
import {NumberInput, Switch} from "@/components/ui";
import styles from './item.module.css';

const Item: FC<ItemPropsType> = (props) => {
    const {
        label,
        itemType,
        defaultValue,
        onValueChange
    } = props;
    const [itemValue, setItemValue] = useState(() => defaultValue);

    const handleSetItemNewValue = (newValue: number | boolean) => {
        setItemValue(newValue);
    }

    useEffect(() => {
        if(itemType === 'switch') {
            onValueChange(!!itemValue);
        } else onValueChange(Number(itemValue))

    }, [itemType, onValueChange, itemValue]);

    return (
        <li className={styles.container}>
            <span>{label}</span>
            {
                itemType === 'switch' ? (
                    <Switch defaultVal={!!itemValue} onSwitch={handleSetItemNewValue} />
                ) : (
                    <NumberInput defaultValue={Number(itemValue)} onChange={handleSetItemNewValue} />
                )
            }
        </li>
    )
}

export default Item;