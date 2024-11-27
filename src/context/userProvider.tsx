import {createContext, FC, useCallback, useContext, useEffect, useState} from "react";
import {ProviderChildProps, UserContextType, UserStateType} from "../types.ts";

const defaultValue: UserContextType = {
    state: "Focus",
    setUserStateHandler() {},
    gotoNextState(){},
    increasePomoLength(){},
    decreasePomoLength(){},
    pomoLength: 0,
    setPomoLength(){}
}
const UserContext = createContext(defaultValue);

export const useUserContext = () => useContext(UserContext);

const UserProvider: FC<ProviderChildProps> = ({ children }) => {
    const [userState, setUserState] = useState<UserStateType>("Focus");
    const [pomoLength, setPomoLength] = useState(() => 1);
    const [pomoCount, setPomoCount] = useState(() => 0);

    useEffect(() => {
        if(userState === "Short break") {
            setPomoCount(prev => prev + 1);
        }

        if(userState === "Long break") {
            setPomoCount(0);
        }
    }, [userState]);

    const handleSetUserState = (state: UserStateType) => {
        setUserState(state)
    }

    const gotoNextState = useCallback(() => {
        setUserState(prev => {
            if(prev === "Focus") {
                if(pomoCount >= pomoLength) {
                    return "Long break"
                }
                return "Short break"
            }
            return "Focus"
        })
    }, [pomoCount, pomoLength])

    const increasePomoLength = () => {
        setPomoLength(prev => prev +1);
    }

    const decreasePomoLength = () => {
        setPomoLength(prev => {
            const newLength = prev - 1;
            if(newLength <= 0) {
                return 1
            }
            return newLength
        })
    }

    return (
        <UserContext.Provider value={{
            state: userState,
            setUserStateHandler: handleSetUserState,
            gotoNextState,
            increasePomoLength,
            decreasePomoLength,
            pomoLength,
            setPomoLength
        }} >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;