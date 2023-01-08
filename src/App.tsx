import React, {useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import {Settings} from "./components/Settings";

export type SettingsType = {
    startValue: number
    maxValue: number
    info: string
    error: string
}

function App() {

    const [settings, setSettings] = useState<SettingsType>({startValue: 0, maxValue: 1, info: 'Enter values and press Set', error: ''})

    console.log(settings)

    const setSettingsCallback = (startValue: number, maxValue: number, info: string, error: string) => {
        setSettings({startValue, maxValue, info, error})
    }

    return (
        <div className="App">
            <Counter settings={settings}/>
            <Settings settings={settings} setSettings={setSettingsCallback}/>
        </div>
    );
}

export default App;
