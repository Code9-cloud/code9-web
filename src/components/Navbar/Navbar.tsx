import React from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Menu,
    MenuItem,
    Avatar,
    IconButton, SvgIcon, Tabs
} from '@mui/material';

import logo from '../../Code9logo_white.png';
import {GlobalContext} from "../../GlobalContext";

const Navbar = () => {
    const {user, signOut, application} = React.useContext(GlobalContext);
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleTabChange = (event: any, newValue: any) => {
        setSelectedTab(newValue);
    };

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSignout = () => {
        handleClose();
        signOut();
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSave = async () => {
        // Post application to backend
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let response = await fetch(process.env.REACT_APP_API_URL + '/application/'+user?.id, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ application: application }),
        });
        handleClose();
    }

    return (
        <AppBar position="static" color="transparent">
            <Toolbar style={{ position: 'relative' }}>
                {/* Left Side - Logo and Names */}
                <div style={{ display: 'flex', alignItems: 'center', flex: 1, marginRight: 'auto' }}>
                    <IconButton edge="start" color="inherit" aria-label="logo" disableRipple={true}>
                        <img src={logo} alt="Code9 Logo" height="40px" />
                    </IconButton>
                </div>

                {/* Center - Tab Group */}
                {/*<CustomTabs*/}
                {/*    value={selectedTab}*/}
                {/*    onChange={handleTabChange}*/}
                {/*    style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}*/}
                {/*>*/}
                {/*    <CustomTab label={"Entities"} />*/}
                {/*    <CustomTab icon={"Workflows"} />*/}
                {/*    /!* More Tabs *!/*/}
                {/*</CustomTabs>*/}

                {/* Right Side - Switch and User Menu */}
                <div style={{ marginLeft: 'auto' }}>
                    {/*<Switch /> /!* Customize as needed *!/*/}
                    {/*<Button variant="outlined" startIcon={<Reply />}>*/}
                    {/*    Switch to Product View*/}
                    {/*</Button>*/}
                    <Button onClick={handleMenu}>
                        <Avatar alt="User Name" src="/static/avatar.jpeg" />
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleSave}>Save</MenuItem>
                        <MenuItem onClick={handleSignout}>Logout</MenuItem>
                        {/* More items */}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;