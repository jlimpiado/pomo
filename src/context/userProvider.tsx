import {createContext, FC, useContext, useState} from "react";
import {ProviderChildProps, UserContextType, UserState} from "../types.ts";

const defaultValue: UserContextType = {
    state: "Focus",
    handleSetUserState(state) {
        console.log(state);
    }
}
const UserContext = createContext(defaultValue);

export const useUserContext = () => useContext(UserContext);

const UserProvider: FC<ProviderChildProps> = ({ children }) => {
    const [currentState, setCurrentState] = useState<UserState>("Focus")

    const handleSetUserState = (state: UserState) => {
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