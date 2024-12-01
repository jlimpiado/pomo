import {createContext, FC, useContext, useState} from "react";
import {ProviderChildProps, ThemeContextType} from "@/types.ts";

const defaultValue = {
    darkMode: false,
    toggleDarkMode: () => {},
}

const ThemeContext = createContext<ThemeContextType>(defaultValue);

export const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider: FC<ProviderChildProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = (val?: boolean) => {
        setIsDarkMode(prev => val ? val : !prev);
    }

    return (
        <ThemeContext.Provider value={{
            darkMode: isDarkMode,
            toggleDarkMode,
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;