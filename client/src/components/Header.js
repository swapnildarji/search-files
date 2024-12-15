import React from "react";
import { Box } from '@mui/material';
import '../App.css';

const Header = () => {
    return (
        <>
            <Box sx={{ backgroundColor: '#1F2833', padding: '5px', color: 'white', textAlign: 'start', paddingLeft: '20px', boxShadow: '5' }}>
                <h2>Search Through My Files</h2>
            </Box>

        </>
    );
};

export default Header;