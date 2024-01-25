import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
//mui
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function samePageLinkNavigation(event) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}

function LinkTab(props) {
    const navigate = useNavigate();
    return (
        <Tab
            onClick={(event) => {
                // Routing libraries handle this, you can remove the onClick handle when using them.
                if (samePageLinkNavigation(event)) {
                    event.preventDefault();
                    navigate(props.href); 
                }
            }}
            aria-current={props.selected && 'page'}
            {...props}
        />
    );
}

LinkTab.propTypes = {
    selected: PropTypes.bool,
};

export default function Header() {
    const user = useSelector(state => state.user);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        // event.type can be equal to focus with selectionFollowsFocus.
        if (
            event.type !== 'click' ||
            (event.type === 'click' && samePageLinkNavigation(event))
        ) {
            setValue(newValue);
        }
    };
    return <>
    
        {user.Id !== 0 ? <>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    role="navigation"
                >
                    <LinkTab label="דף הבית" href="/homepage" />
                    <LinkTab label="אודות" href="/about" />
                    <LinkTab label="מתכונים" href="/recipes" />
                    <LinkTab label="המתכונים שלי" href="/myRecipes" />
                    <LinkTab label="הוספת מתכון" href="/addRecipe" />
                    <LinkTab label="רשימת קניות" href="/shoppingList" />
                    <LinkTab label="יציאה" href="/exit" />
                </Tabs>
            </Box>
        </> :
            <>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                    role="navigation"
                >
                    <LinkTab label="כניסה" href="/login" />
                    <LinkTab label="הרשמה" href="/signin" />
                    
                </Tabs>
            </Box>
            </>
        }
    </>
}
