import {useUserContext} from "../context/userProvider.tsx";

const Chip = () => {
    const {state: currentState} = useUserContext()
    return (
        <div>{currentState}</div>
    )
}

export default Chip;