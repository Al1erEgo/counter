import React, {useEffect, useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import {Settings} from "./components/Settings";
import {Navigate, Route, Routes} from "react-router-dom";
import {Error404} from "./components/Error404/Error404";

export type SettingsType = {
    currentCounter: number
    startValue: number
    maxValue: number
    info: string
    error: string
    switcher: boolean
}

function App() {

    const localStorageCheck = (settingsFromLS: string) => {
        return settingsFromLS.includes('currentCounter') &&
                settingsFromLS.includes('startValue') &&
                 settingsFromLS.includes('maxValue') &&
                  settingsFromLS.includes('info') &&
                   settingsFromLS.includes('error') &&
                    settingsFromLS.includes('switcher')
    }

    const [settings, setSettings] = useState<SettingsType>(() => {
        const settingsFromLS = localStorage.getItem('Settings')
        const parsedSettings: SettingsType = settingsFromLS && localStorageCheck(settingsFromLS) ? JSON.parse(settingsFromLS) : {
            currentCounter: 0,
            startValue: 0,
            maxValue: 5,
            info: '',
            error: '',
            switcher: true
        }
        return parsedSettings
    })

    const setSettingsCallback = (currentCounter: number, startValue: number, maxValue: number, info: string, error: string, switcher: boolean) => {
        setSettings({currentCounter, startValue, maxValue, info, error, switcher})
    }

    const setCounter = (newCounter: number) =>  setSettings({...settings, currentCounter: newCounter})
    const setInfoCallback = (info: string) => setSettings({...settings, info})
    const setErrorCallback = (error: string) => setSettings({...settings, error})
    const setSwitcherCallback = (switcher: boolean) => setSettings({...settings, switcher})

    useEffect(() => localStorage.setItem('Settings', JSON.stringify(settings)), [settings])

    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<Navigate to={'/counter'}/>}/>
                <Route path={'/*'} element={<div><Error404/></div>}/>
                {
                    settings.switcher ?
                        <>
                            <Route path={'/counter'} element={<Counter  settings={settings}
                                                                        setCounter={setCounter}
                                                                        setSwitcher={setSwitcherCallback}
                            />}/>
                            <Route path={'/settings'} element={<Settings settings={settings}
                                                                         setSettings={setSettingsCallback}
                                                                         setCounter={setCounter}
                                                                         setInfo={setInfoCallback}
                                                                         setError={setErrorCallback}
                                                                         setSwitcher={setSwitcherCallback}
                            />}/>
                        </>
                        :
                        <Route path={'/counter'} element={<><Counter settings={settings}
                                                                     setCounter={setCounter}
                                                                     setSwitcher={setSwitcherCallback}
                        />
                            <Settings settings={settings}
                                      setSettings={setSettingsCallback}
                                      setCounter={setCounter}
                                      setInfo={setInfoCallback}
                                      setError={setErrorCallback}
                            /></>
                        }/>
                }
            </Routes>
        </div>
    );
}

export default App;
