import React from 'react';
import SidePanel from '../SignUp/SidePanel';
import "./landpage.css"
import landimg from "./landimg.png";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

const LandingPage = () => {
    return (
        <div id="landpage" style={{display: 'flex'}}>
            <SidePanel />
            <div id="landpage--main">
                <div id="landpage--main--check">
                    <div style={{fontSize: "32px", fontWeight: "700"}}>Check your Email</div>
                    <br />
                    <img src={landimg} alt="" />
                    <br /><br />
                    <div id="main--go--back">
                        <div>Check your nikhiltyagi.dev@gmail.com inbox for instructions from us on how to verify your account</div>
                        <br />
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", gap: "5px"}}>
                            <Link to="/signup"><IconButton><KeyboardBackspaceIcon style={{textTransform: 'none', color: "white"}} /></IconButton></Link>
                            <div style={{marginTop: "auto", marginBottom: "auto "}}>Go back to <span style={{color: "#6200EE"}}>Sign Up</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
