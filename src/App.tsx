import './App.css'
import Chip from "@/components/chip";
import Timer from "@/components/timer";
import Controller from "@/components/controller";
import {useUserContext} from "@/context/userProvider.tsx";

function App() {
    const {state} = useUserContext()
  return (
    <main className="App" data-state={state}>
        <Chip />
        <Timer />
        <Controller />
    </main>
  )
}

export default App
