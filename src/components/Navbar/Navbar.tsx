import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Switch,
    Button,
    Menu,
    MenuItem,
    Avatar,
    IconButton, SvgIcon, Tabs
} from '@mui/material';

import logo from '../../Code9logo_white.png';
import CustomTab from "../CustomTab/CustomTab";
import CustomTabs from "../CustomTab/CustomTabs";
import {Reply } from "@mui/icons-material";

const Navbar = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleTabChange = (event: any, newValue: any) => {
        setSelectedTab(newValue);
    };

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" color="transparent">
            <Toolbar style={{ position: 'relative' }}>
                {/* Left Side - Logo and Names */}
                <div style={{ display: 'flex', alignItems: 'center', flex: 1, marginRight: 'auto' }}>
                    <IconButton edge="start" color="inherit" aria-label="logo">
                        <img src={logo} alt="Code9 Logo" height="40px" />
                    </IconButton>
                </div>

                {/* Center - Tab Group */}
                <CustomTabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
                >
                    <CustomTab label={"Entities"} />
                    <CustomTab icon={"Workflows"} />
                    {/* More Tabs */}
                </CustomTabs>

                {/* Right Side - Switch and User Menu */}
                <div style={{ marginLeft: 'auto' }}>
                    {/*<Switch /> /!* Customize as needed *!/*/}
                    <Button variant="outlined" startIcon={<Reply />}>
                        Switch to Product View
                    </Button>
                    <Button onClick={handleMenu}>
                        <Avatar alt="User Name" src="/static/avatar.jpeg" />
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                        {/* More items */}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;