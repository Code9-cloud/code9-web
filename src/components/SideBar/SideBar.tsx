import React, {useContext, useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { GlobalContext } from '../../GlobalContext';
import {ListItemButton, SvgIcon} from "@mui/material";
import {Api as ApiIcon, Category as CategoryIcon, RocketLaunch as RocketLaunchIcon} from "@mui/icons-material";

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { currentSection, setSection } = useContext(GlobalContext);

    const sections = ['Entities', 'Services', 'Deploy'];
    const section_icons : any = {
        'Entities': <CategoryIcon />,
        'Services': <ApiIcon />,
        'Deploy': <RocketLaunchIcon />,
    }

    return (
        <div style={{ width: isCollapsed ? '50px' : '250px', height: '100%' }}>
            {/*<button onClick={() => setIsCollapsed(!isCollapsed)}></button>*/}
            <List>
                {sections.map((section) => (
                    <ListItemButton
                        key={section}
                        selected={currentSection === section}
                        onClick={() => setSection(section) }
                    >
                        <ListItemIcon>{ section_icons[section] }</ListItemIcon>
                        { !isCollapsed && <ListItemText primary={section} /> }
                    </ListItemButton>
                ))}
            </List>
        </div>
    );
};

export default Sidebar;
