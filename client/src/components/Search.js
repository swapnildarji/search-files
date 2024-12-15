import React from "react";
import '../App.css';
import { Box, TextField, Button } from '@mui/material';

const SearchFiles = ({ searchTerm, setSearchTerm, handleSearch }) => {
    return (
        <>
            <Box sx={{ mt: '5rem', mb: "2rem", display: 'flex', alignContent: 'center', justifyContent: 'center', gap: '1rem' }}>
                <TextField id="outlined-basic" label="Enter Search term" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <Button size="medium" variant="contained" onClick={handleSearch}>Search</Button>
            </Box>
        </>
    );
};

export default SearchFiles;