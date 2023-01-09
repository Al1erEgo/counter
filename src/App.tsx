import React, {useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import {Settings} from "./components/Settings";
import {Navigate, Route, Routes} from "react-router-dom";
import {Error404} from "./components/Error404/Error404";

export type SettingsType = {
    startValue: number
    maxValue: number
    info: string
    error: string
    switcher: boolean
}

function App() {

    const [settings, setSettings] = useState<SettingsType>({startValue: 0, maxValue: 5, info: '', error: '', switcher: true})

    console.log(settings)

    const setSettingsCallback = (startValue: number, maxValue: number, info: string, error: string, switcher: boolean) => {
        setSettings({startValue, maxValue, info, error, switcher})
    }

    const setInfoCallback = (info: string) => {
        setSettings({...settings, info})
    }

    const setErrorCallback = (error: string) => {
        setSettings({...settings, error})
    }

    const setSwitcherCallback = (switcher: boolean) => {
        setSettings({...settings, switcher})
    }

    return (
        <div className="App">
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/counter'}/>}/>
                    <Route path={'/*'} element={<div><Error404/></div>}/>
                    {
                        settings.switcher ?
                            <>
                                <Route path={'/counter'} element={<Counter settings={settings}
                                                                           setSwitcher={setSwitcherCallback}
                                />}/>
                                <Route path={'/settings'} element={<Settings settings={settings}
                                                                             setSettings={setSettingsCallback}
                                                                             setInfo={setInfoCallback}
                                                                             setError={setErrorCallback}
                                                                             setSwitcher={setSwitcherCallback}
                                />}/>
                            </>
                            :
                            <Route path={'/counter'} element={<><Counter settings={settings}
                                                                         setSwitcher={setSwitcherCallback}
                            />
                                <Settings settings={settings}
                                          setSettings={setSettingsCallback}
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