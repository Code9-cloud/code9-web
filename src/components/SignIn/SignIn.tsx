import React, { useContext } from 'react';
import { useState } from 'react';
import { Button, SvgIcon, TextField } from '@mui/material';
import { GlobalContext } from '../../GlobalContext';
import "./signin.css";
import signin_logo from "./signin-logo.png"
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Checkbox from '@mui/material/Checkbox';
import { GitHub } from '@mui/icons-material';
import {ReactComponent as Google} from './vectors/google.svg';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SidePanel from '../SignUp/SidePanel';

const SignIn: React.FC = () => {
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
        <div id='signin' style={{display: 'flex'}}>
            <SidePanel />
            <div id="signin--signin">
                <div id="signin--signin--main">
                    <div id="signin--signin--logo">
                        <img src={signin_logo} alt="" width="50px"/>
                        <div style={{fontSize: "32px", fontWeight: "700"}}>SignIn</div>
                        <div>Start building backend blazing fast with Code9</div>
                    </div>
                    <div id="signin--signin--inputs">
                        <div className="signin--input" id="email">
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
                        <div className="signin--input">
                            <div>Password</div>
                            <TextField placeholder='Enter Your Password' 
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
                            sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 },}} 
                            inputProps={{
                                style: {
                                  height: "10px",
                                },
                            }}
                            />
                            <div id="signin--helpers">
                                <div><Checkbox style={{marginLeft: "-10px"}} /> Remember Me</div>
                                <div style={{marginTop: "auto", marginBottom: "auto"}}>Forgot Password ?</div>
                            </div>
                        </div>
                        <div>
                            <Button fullWidth variant="contained" style={{backgroundColor: "#374151", color: "white", textTransform: "none"}} onClick={handleSignIn}>
                                Sign In
                            </Button>
                        </div>
                        <div style={{textAlign: "center"}}>----------- Or continue with -----------</div>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div>
                                <Button 
                                data-client_id="107155738547-2hblmveiemkave337b3eiglpc3pgd622.apps.googleusercontent.com"
                                
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
                        <div style={{textAlign: 'center'}}>Dont't have any account yet? <Link to='/signup'><span style={{color: "#6200EE"}}>Sign Up</span></Link></div>
                    </div>
                </div>
                <footer style={{width: "100%"}}>By logging in to Code9, you agree to our terms of service.</footer>
                
            </div>
        </div>
    );
};

export default SignIn;
