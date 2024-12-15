import React from "react";
import '../App.css';

const SearchFiles = ({ searchTerm, setSearchTerm, handleSearch }) => {
    return (
        <>
            <div className="Search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter search term"
                    className="Search-input"
                />
                <button onClick={handleSearch} className="Search-button">Search</button>
            </div>
        </>
    );
};

export default SearchFiles;