import {useUserContext} from "../../context/userProvider.tsx";
import styles from "./style.module.css";
import BrainIcon from "@/assets/icons/brain.svg";
import CoffeeIcon from "@/assets/icons/coffee.svg";

const Chip = () => {
    const {state: currentState} = useUserContext()
    return (
        <div className={styles.chip} data-state={currentState}>
            {
                currentState === "Focus"
                    ? <BrainIcon />
                    : <CoffeeIcon />
            }{currentState}
        </div>
    )
}

export default Chip;