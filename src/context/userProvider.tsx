import {createContext, FC, useContext, useEffect, useRef, useState} from "react";
import {ProviderChildProps, UserContextType, UserStateEnum} from "../types.ts";

const notifMessages  = {
    [UserStateEnum.FOCUS]: "Focus mode!",
    [UserStateEnum.SHORT_BREAK]: "Time for a short break.",
    [UserStateEnum.LONG_BREAK]: "Go take a long break.",
}

const defaultValue: UserContextType = {
    state: UserStateEnum.FOCUS,
    setUserStateHandler() {},
    gotoNextState(){},
    increasePomoLength(){},
    decreasePomoLength(){},
    pomoLength: 1,
    setPomoLength(){},
    isNotifEnabled: false,
    requestNotifPermission(){},
}

const UserContext = createContext(defaultValue);

export const useUserContext = () => useContext(UserContext);

const UserProvider: FC<ProviderChildProps> = ({ children }) => {
    const [userState, setUserState] = useState<UserStateEnum>(defaultValue.state);
    const [pomoLength, setPomoLength] = useState(() => defaultValue.pomoLength);
    const [pomoCount, setPomoCount] = useState(() => 0);
    const [isNotifEnabled, setIsNotifEnabled] = useState(defaultValue.isNotifEnabled)
    const notifObj = useRef<Notification | null>(null)
    const isNotifShowing = useRef(false)

    useEffect(() => {
        if(userState === UserStateEnum.SHORT_BREAK) {
            setPomoCount(prev => prev + 1);
        }

        if(userState === UserStateEnum.LONG_BREAK) {
            setPomoCount(0);
        }
    }, [userState]);

    useEffect(() => {
        if(Notification.permission === 'granted') setIsNotifEnabled(true)
    }, []);

    const createNotifInstance = (msg: string) => {
        const notif = new Notification(msg);
        notif.addEventListener('show', () => {
            isNotifShowing.current = true
        })

        notif.addEventListener('close', () => {
            isNotifShowing.current = false;
        })
        return notif;
    }

    const requestNotifPermission = () => {
        Notification.requestPermission().then(permission => {
            if(permission === 'granted') {
                setIsNotifEnabled(true)
            } else if(permission === 'denied') {
                alert('Notification denied, enable it in your browser settings.')
            }
        });
    }

    const notifUser = (state: UserStateEnum) => {
        if(isNotifShowing.current) notifObj.current?.close();
        notifObj.current = createNotifInstance(notifMessages[state])
    }

    const handleSetUserState = (state: UserStateEnum) => {
        setUserState(state)
    }

    const gotoNextState = () => {
        setUserState(prev => {
            let newState = UserStateEnum.FOCUS;
            if(prev === UserStateEnum.FOCUS) {
                if(pomoCount >= pomoLength) {
                    newState = UserStateEnum.LONG_BREAK;
                } else newState = UserStateEnum.SHORT_BREAK;
            }
            notifUser(newState);
            return newState
        })
    }

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
            setPomoLength,
            isNotifEnabled,
            requestNotifPermission,
        }} >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;