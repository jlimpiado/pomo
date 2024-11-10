import {useUserContext} from "../../context/userProvider.tsx";
import styles from "./style.module.css";
import BrainIcon from "@/assets/icons/brain.svg";

const Chip = () => {
    const {state: currentState} = useUserContext()
    return (
        <div className={styles.chip}>
            <BrainIcon />{currentState}
        </div>
    )
}

export default Chip;