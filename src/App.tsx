import React, {useContext} from 'react';
import {GlobalContext} from "./GlobalContext";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/SideBar/SideBar";
import EntitiesEditor from "./components/EntitiesEditor/EntitiesEditor";
import FlowEditor from "./components/FlowEditor/FlowEditor";
import ComingSoon from "./components/ComingSoon/ComingSoon";
import SignIn from "./components/SignIn/SignIn";
import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import SignUp from './components/SignUp/SingUp';
import LandingPage from './components/LandingPage/LandingPage';
import MainPage from './MainPage';
import Onboarding1 from './components/Onboarding/Onboarding1';
import Onboarding2 from './components/Onboarding/Onboarding2';

function App() {
    const { user, currentSection } = useContext(GlobalContext);

    const renderSection = () => {
        switch (currentSection) {
            case 'Entities':
                return <EntitiesEditor />;
            case 'Services':
                return <FlowEditor />;
            case 'Deploy':
                return <ComingSoon />;
            default:
                return <div>Select a section</div>;
        }
    };
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
