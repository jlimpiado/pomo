import {FC} from "react";
import {ItemPropsType} from "@/types.ts";
import {NumberInput, Switch} from "@/components/ui";
import styles from './item.module.css';

const Item: FC<ItemPropsType> = (props) => {
    const {
        label,
        itemType,
        defaultValue,
        onValueChange,
        isDisabled
    } = props;
    const handleSetItemNewValue = (newValue: number | boolean) => {
        if(itemType === 'switch') onValueChange(!!newValue);
        else onValueChange(Number(newValue));
    }

    return (
        <li className={styles.container} aria-disabled={isDisabled}>
            <span>{label}</span>
            {
                itemType === 'switch' ? (
                    <Switch defaultVal={!!defaultValue} onSwitch={handleSetItemNewValue} />
                ) : (
                    <NumberInput defaultValue={Number(defaultValue)} onChange={handleSetItemNewValue} />
                )
            }
        </li>
    )
}

export default Item;