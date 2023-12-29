import * as React from "react";
import Navbar from "../Navbar/Navbar";
import "./onboard1.css";
import { TextField, InputAdornment, ToggleButtonGroup,  } from "@mui/material";
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import {Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GridViewIcon from '@mui/icons-material/GridView';
import EastIcon from '@mui/icons-material/East';
import { Link } from "react-router-dom";

const Onboarding1 = () => {

    const [age, setAge] = React.useState('Select your Role');

    const handleChange = (event: {target: { value: React.SetStateAction<string>; }}) => {
        setAge(event.target.value);
    };
    
    const [alignment, setAlignment] = React.useState('web');
    const handleChange1 = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
      ) => {
        setAlignment(newAlignment);
      };

      const control = {
        value: alignment,
        onChange: handleChange1,
        exclusive: true,
      };
    
    
    return (
        <div id="onboard1">
            <Navbar />  
            <div id="onboard1--main">
                <div id="onboard1--main--heading">
                    <span style={{fontSize: "32px", fontWeight: "700"}}>Hi Nikhil! Let’s get you onboarded. </span>
                    <br />
                    <span>Complete the Form and Create Your First App</span>
                </div>
                <div id="onboard1--main--main">
                    <div id="main--input--1" className="display">
                        <div id="input--name" className="input">
                            <div>Company name</div>
                            <TextField 
                            fullWidth
                            placeholder='Enter your Company Name'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ApartmentIcon style={{color: "white"}} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <CloseIcon style={{color: "white"}} />
                                    </InputAdornment>

                                )
                                }}
                            sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }}} 
                            />
                        </div> 
                        <div id="input--role" className="input">
                            <div>Role</div>
                            <Select
                            id="select"
                            style={{width: '100%'}}
                            startAdornment={(
                                <InputAdornment position="start">
                                    <BusinessCenterIcon />
                                </InputAdornment>
                            )}
                            value={age}
                            displayEmpty
                            onChange={handleChange}
                            renderValue={(value) => (value !== '' ? value : 'Select your Role')}
                            >
                                <MenuItem value="" style={{color: "gray"}}>
                                    <em>None</em>e
                                </MenuItem>
                                <MenuItem value="Business Manager">Business Manager</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div id="main--input--2" className="display">
                        <div id="input--size" className="input">
                            <div>How big is your company</div>
                            <div>
                            <Stack
                            direction="row"
                            spacing={4}
                            >
                                <ToggleButtonGroup style={{display: "flex", width: "100%", justifyContent: "space-between"}} {...control}>
                                    <ToggleButton value="web" id="web" className="togglebutton" style={{fontFamily: "Plus Jakarta Sans", padding: '1px', height: "55px", border: "1px solid #222", borderRadius: "5px"}} sx={{ "&:focus": {
                                    border: '2px solid #5245FF'
                                    }}}>1-10</ToggleButton>
                                    <ToggleButton value="android" id = "android" className="togglebutton" style={{fontFamily: "Plus Jakarta Sans", border: "1px solid #222", height: "55px", borderRadius: "5px"}} sx={{ "&:focus": {
                                    border: '2px solid #5245FF'
                                    }}}>10-100</ToggleButton>        
                                    <ToggleButton value="ios1" id="ios1" className="togglebutton" style={{fontFamily: "Plus Jakarta Sans", border: "1px solid #222", height: "55px", borderRadius: "5px"}} sx={{"&:focus": {
                                    border: '2px solid #5245FF'
                                    }}}>100-1000</ToggleButton>
                                    <ToggleButton value="ios2" id="ios2" className="togglebutton" style={{fontFamily: "Plus Jakarta Sans", border: "1px solid #222", height: "55px", borderRadius: "5px"}} sx={{"&:focus": {
                                    border: '2px solid #5245FF'
                                    }}}>1000+</ToggleButton>
                                </ToggleButtonGroup>

                            </Stack>
                            </div>
                        </div>
                        <div id="input--appname" className="input">
                            <div>Name your Application</div>
                            <TextField 
                            fullWidth
                            placeholder='Enter Your Application Name'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <GridViewIcon style={{color: "white"}} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <CloseIcon style={{color: "white"}} />
                                    </InputAdornment>

                                )
                                }}
                            sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }}} 
                            />
                        </div>
                    </div>
                    <div id="main--input--3">
                        <div id="input--mcq">
                            <div>How do you want to use Code9</div>
                            <div id="mcq--checkboxes">
                                <div id="checklist1" className="checklist">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox />} id="checklabel1" label={<div style={{fontFamily: 'Plus Jakarta Sans'}}>Dynamic Personalised Homepage</div>} />
                                        <FormControlLabel control={<Checkbox />} id="checklabel2" label={<div style={{fontFamily: 'Plus Jakarta Sans'}}>Loyalty/ Incentive Programs / Gamification</div>} />
                                        <FormControlLabel control={<Checkbox />} id="checklabel3" label={<div style={{fontFamily: 'Plus Jakarta Sans'}}>Dynamic Pricing, Discounts, Commission</div>} />
                                        <FormControlLabel control={<Checkbox />} id="checklabel4" label={<div style={{fontFamily: 'Plus Jakarta Sans'}}>Internal Process Automation</div>} />
                                    </FormGroup>
                                </div>
                                <div id="checklist2" className="checklist">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox />} id="checklabel5" label={<div style={{fontFamily: 'Plus Jakarta Sans'}}>Any Kind of Scoring(User, Lead, Credit etc)</div>}/>
                                        <FormControlLabel control={<Checkbox />} id="checklabel6" label={<div style={{fontFamily: 'Plus Jakarta Sans'}}>Feature Flags</div>} />
                                        <FormControlLabel control={<Checkbox />} id="checklabel7" label={<div style={{fontFamily: 'Plus Jakarta Sans'}}>Bank-end A/B Testing</div>} />
                                        <FormControlLabel control={<Checkbox />} id="checklabel8" label={<div style={{fontFamily: 'Plus Jakarta Sans'}}>Generic Rule Engine</div>} />
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="onboard1--main--continue" style={{display: "flex", justifyContent: 'end'}}>
                    <Link to="/mainpage">
                        <Button variant="contained" style={{fontSize: "16px", backgroundColor: "#374151", color: "white", textTransform: "none", width: "150px", fontFamily: 'Plus Jakarta Sans'}} endIcon={<EastIcon />}>
                            Continue
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Onboarding1;