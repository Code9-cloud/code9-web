import React, { useContext } from "react";
import { useState } from 'react';
import { GlobalContext } from '../../GlobalContext';
import "./signup.css";
import "../SignIn/signin.css";
import signup_logo from "./signup-logo.png"
import { Link } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen'
import PersonIcon from '@mui/icons-material/Person';
import {Button, TextField, SvgIcon } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import {ReactComponent as Google} from './vectors/google.svg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SidePanel from "./SidePanel";


const SignUp: React.FC  = () => {

    const { signIn } = useContext(GlobalContext);

    const handleSignIn = () => {
        signIn({ name: 'User', avatar: '/path/to/avatar.jpg' });
    };

    const [isFocused, setIsFocused] = useState(true);

    const handleFocus = () => {
        setIsFocused(false);
    };

    const handleBlur = () => {
        setIsFocused(true);
    };


    return (
        <div id="signup" style={{display: 'flex'}}>
            <SidePanel />
            <div id="signup--signup">
                <div id="signup--signup--main">
                    <div id="signup--signup--logo">
                        <img src={signup_logo} alt="" width="50px"/>
                        <div style={{fontSize: "32px", fontWeight: "700", marginBottom: "3%"}}>SignUp</div>
                        <div>Already have an account ? <Link to="/"><span style={{color: "#6200EE"}}>Sign In</span></Link></div>
                    </div>
                    <div id="signup--signup--inputs">
                        <div className="signup--input" id="fullname">
                            <div>Full Name</div>
                            <TextField 
                            placeholder='Enter Your Name'
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <PersonIcon style={{color: "white"}} />
                                    </InputAdornment>
                                ),
                                }}
                        
                            inputProps={{
                                style: {
                                    height: "10px",
                                },
                            }}
                            sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 },}} 
                            />
                        </div>
                        <div className="signup--input">
                            <div>Email ID</div>
                            <TextField 
                            placeholder='Enter Your Email'
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <MailOutlineIcon style={{color: "white"}} />
                                    </InputAdornment>
                                ),
                                }}
                        
                            inputProps={{
                                style: {
                                    height: "10px",
                                },
                            }}
                            sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 },}} 
                            />
                        </div>
                        <div className="signup--input" id="password">
                            <div>Password</div>
                            <TextField 
                            placeholder='Enter Your Password'
                            type="password"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <LockOpenIcon style={{color: "white"}} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <VisibilityIcon style={{color: "white"}} />
                                    </InputAdornment>
                                ),
                                }}
                        
                            inputProps={{
                                style: {
                                    height: "10px",
                                },
                            }}
                            sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 },}} 
                            />
                        </div>
                        <div className="signup--input" id="cpassword">
                            <div>Confirm Password</div>
                            <TextField 
                            type="password"
                            placeholder='Re-enter Your Password'
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <LockOpenIcon style={{color: "white"}} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <VisibilityIcon style={{color: "white"}} />
                                    </InputAdornment>
                                ),
                                }}
                        
                            inputProps={{
                                style: {
                                    height: "10px",
                                },
                            }}
                            sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 },}} 
                            />
                        </div>
                        <div>
                            <Link to="/onboard1">
                                <Button fullWidth variant="contained" style={{backgroundColor: "#374151", color: "white", textTransform: "none"}}>
                                    SingUp
                                </Button>
                            </Link>
                        </div>
                        <br />
                        <div style={{textAlign: "center"}}>----------- Or continue with -----------</div>
                        <br />
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div>
                                <Button 
                                variant="contained" 
                                startIcon={<SvgIcon component={Google} />}
                                style={{backgroundColor: "#22212D", color: "white", border: "2px solid #374151", padding: "5px 30px", textTransform: "none"}}>
                                   Login with Google
                                </Button>
                            </div>
                            <div>
                                <Button 
                                variant="contained" 
                                startIcon={<SvgIcon component={GitHub} />}
                                style={{backgroundColor: "#22212D", color: "white", border: "2px solid #374151", padding: "5px 30px", textTransform: "none"}}>
                                    Login with GitHub
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>By logging in to Code9, you agree to our terms of service.</footer>
            </div>
        </div>
    );
};

export default SignUp