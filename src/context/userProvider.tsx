import {createContext, FC, useContext, useState} from "react";
import {ProviderChildProps, UserContextType, UserStateType} from "../types.ts";

const defaultValue: UserContextType = {
    state: "Focus",
    handleSetUserState(state) {
        console.log(state);
    }
}
const UserContext = createContext(defaultValue);

export const useUserContext = () => useContext(UserContext);

const UserProvider: FC<ProviderChildProps> = ({ children }) => {
    const [currentState, setCurrentState] = useState<UserStateType>("Focus")

    const handleSetUserState = (state: UserStateType) => {
        setCurrentState(state)
    }

    return (
        <UserContext.Provider value={{
            state: currentState,
            handleSetUserState
        }} >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;