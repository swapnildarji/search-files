import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search';
import Header from './components/Header';
import FileList from './components/FileList';
import Loader from './components/Loader';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [firstSearch, setFirstSearch] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setFirstSearch(true)
    if (!searchTerm) {
      setLoading(false);
      showToast('Please Enter Search query', "info")
      return;
    }
    try {

      const response = await axios.get(`https://search-files-server.vercel.app/search?q=${searchTerm}`);

      setData(response.data.data);
      console.log('=data', response)
    } catch (error) {
      showToast('Something went Wrong!', 'error')
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, sev) => {
    setMessage(msg);  // Set the message to show in the Snackbar
    setSeverity(sev);  // Set the severity to control the toast type
    setOpen(true);     // Show the Snackbar
  };

  const handleClose = () => {
    setOpen(false); // Close the Snackbar
  };

  return (
    <div className="App">
      {loading && <Loader />}
      <Header />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />

      {data && data.length ? 
      <FileList fileList={data} /> : 
      <>
        {
          firstSearch?<h2 style={{margin: "5rem"}}>Results not found</h2>:
          <div></div>
        }
      </>
      
      }

      <Snackbar
        open={open}         // Controls whether the Snackbar is shown
        autoHideDuration={3000} // Automatically close after 3 seconds
        onClose={handleClose} // Function to close the Snackbar
        anchorOrigin={{
          vertical: 'center',    // Position vertically in the center
          horizontal: 'center',  // Position horizontally in the center
        }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
