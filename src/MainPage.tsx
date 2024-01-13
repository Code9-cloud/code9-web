import React, {useContext} from 'react';
import {GlobalContext} from "./GlobalContext";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/SideBar/SideBar";
import EntitiesEditor from "./components/EntitiesEditor/EntitiesEditor";
import ComingSoon from "./components/ComingSoon/ComingSoon";
import './App.css';
import ServiceEditor from "./components/ServiceEditor/ServiceEditor";
import DatabaseConfig from "./components/DatabaseConfig/DatabaseConfig";
import Deployment from "./components/Deployment/Deployment";


const MainPage = () => {
    const {currentSection } = useContext(GlobalContext);

    return (
        <div className="app-container">
            <Navbar />
            <div className="app-body" style={{ display: 'flex', flexDirection: 'row' }}>
                <Sidebar />
                <div className="main-content">
                    {currentSection === 'Entities' && <EntitiesEditor />}
                    {currentSection === 'Services' && <ServiceEditor />}
                    {currentSection === 'Database' && <DatabaseConfig />}
                    {currentSection === 'Deploy' && <Deployment />}
                </div>
            </div>
        </div>
    );
}

export default MainPage;