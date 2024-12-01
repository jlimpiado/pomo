import './App.css'
import Chip from "@/components/chip";
import Timer from "@/components/timer";
import Controller from "@/components/controller";
import {useUserContext} from "@/context/userProvider.tsx";
import {useThemeContext} from "@/context/themeProvider.tsx";

function App() {
    const {state} = useUserContext()
    const {darkMode} = useThemeContext();
  return (
    <main className="App" data-state={state} data-darkmode={darkMode}>
        <Chip />
        <Timer />
        <Controller />
    </main>
  )
}

export default App
