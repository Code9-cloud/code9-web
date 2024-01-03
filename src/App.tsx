import React, {useContext} from 'react';
import {GlobalContext} from "./GlobalContext";
import SignIn from "./components/SignIn/SignIn";
import './App.css';
import {Routes, Route} from 'react-router';
import SignUp from './components/SignUp/SingUp';
import LandingPage from './components/LandingPage/LandingPage';
import MainPage from './MainPage';
import Onboarding1 from './components/Onboarding/Onboarding1';
import Onboarding2 from './components/Onboarding/Onboarding2';

function App() {
    const { user } = useContext(GlobalContext);


    return (
        <div className="app-container">
            { !user ? (
                <Routes>
                    <Route path='/' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/land' element={<LandingPage />}/>
                    <Route path='/mainpage' element={<MainPage />}/>
                    <Route path='/onboard1' element={<Onboarding1 />}/>
                    <Route path='/onboard2' element={<Onboarding2 />}/>
                </Routes>
            ) : (<MainPage />)
            }
        </div>
    );
}

export default App;
