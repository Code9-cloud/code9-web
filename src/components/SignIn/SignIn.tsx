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
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SidePanel from '../SignUp/SidePanel';
import {GoogleCredentialResponse, GoogleLogin} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

const SignIn: React.FC = () => {
    const { signIn, setApplication } = useContext(GlobalContext);

    const getUserDetailsFromGid = async (gid: string, name: string, email: string) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let response = await fetch(process.env.REACT_APP_API_URL + '/sign-in/google_user/', {
            body:JSON.stringify({
                gid: gid,
                name: name,
                email: email,
            }),
            method: 'POST',
            headers: headers,
        });
        if (response.status === 200) {
            let data = await response.json();
            // Fetch Application Data
            let appResponse = await fetch(process.env.REACT_APP_API_URL + '/application/byUserId/' + data.id, {
                method: 'GET',
                headers: headers,
            });
            let applicationData = await appResponse.json();
            if(applicationData.application) {
                setApplication(applicationData.application);
            }
            signIn({ id: data.id, name: data.name, avatar: '' });
        }
    }

    const handleSignIn = () => {
        signIn({ id: '65a0465719f53527b82c3a73', name: 'User', avatar: '/path/to/avatar.jpg' });
    };

    const [isFocused, setIsFocused] = useState(true);

    const handleFocus = () => {
        setIsFocused(false);
    };

    const handleBlur = () => {
        setIsFocused(true);
    };

    const onGoogleSuccess = (res: GoogleCredentialResponse) => {
        if(res.credential) {
            const decoded = jwtDecode<any>(res.credential);
            if(decoded.sub && decoded.email && decoded.name) {
                getUserDetailsFromGid(decoded.sub, decoded.name, decoded.email).then(() => {
                    console.log("Success");
                });
            }
        }
    }

    const onGoogleFailure = () => {
        console.log("Error");
    }


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
                                <GoogleLogin onSuccess={onGoogleSuccess} onError={onGoogleFailure} />
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
