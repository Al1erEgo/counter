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

    const [settings, setSettings] = useState<SettingsType>({startValue: 0, maxValue: 5, info: '', error: ''})

    console.log(settings)

    const setSettingsCallback = (startValue: number, maxValue: number, info: string, error: string) => {
        setSettings({startValue, maxValue, info, error})
    }

    const setInfoCallback = (info: string) => {
        setSettings({...settings, info})
    }

    const setErrorCallback = (error: string) => {
        setSettings({...settings, error})
    }

    return (
        <div className="App">
            <Counter settings={settings}/>
            <Settings settings={settings}
                      setSettings={setSettingsCallback}
                      setInfo={setInfoCallback}
                      setError={setErrorCallback}
            />
        </div>
    );
}

export default App;
