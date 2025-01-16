'use client';
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Card,
  Tooltip,
  IconButton,
  Switch,
  TablePagination
} from '@mui/material';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2';
import apiClient from '../../network/apiClient';
import axios from 'axios';

const tableCellStyle = {
  background: '#ff4c4c',
  padding: '10px 16px',
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
  textTransform: 'uppercase'
};

const MainPage = () => {
  const [rows, setRows] = useState([]);
  const [pageName, setPageName] = useState('');
  const [mainMenuIcon, setMainMenuIcon] = useState('');

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set default rows per page

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await apiClient.get("/Menu/GetMainMenuDetails");
      if (response.data && response.data.statuscode === 200) {
        setRows(response.data.data); // Assuming response.data.data is your array of menu items
      } else {
        console.error("Failed to fetch menu data:", response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching menu data:", error);
      Swal.fire({
        title: 'Error',
        text: "Could not fetch menu data. Please try again.",
        icon: 'error',
        confirmButtonColor: 'red',
      });
    }
  };

  const handleSubmit = async () => {
    const payload = {
      Title: pageName,
      Icon: mainMenuIcon,
      ParentId: 0,
      subparentId: 0,
      PageName: null,
      PageUrl: null,
      IsActive: true,
      IsDeleted: false
    };

    try {
      const response = await apiClient.post('/Menu/InsertMenuData', payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.statuscode === 200) {
        const newRow = response.data.data; // This should be the new menu item
        Swal.fire({
          title: 'Success',
          text: 'Added Successfully',
          icon: 'success',
          confirmButtonColor: 'green',
          confirmButtonText: 'OK!'
        });

        setRows(prevRows => [...prevRows, newRow]); // Add the new item to the existing rows
        setPageName('');
        setMainMenuIcon('');
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message || "Failed to add the menu item.",
          icon: 'error',
          confirmButtonColor: 'red',
        });
      }
    } catch (error) {
      console.error("Error inserting menu data:", error);
      Swal.fire({
        title: 'Error',
        text: "There was an error inserting the menu data. Please try again.",
        icon: 'error',
        confirmButtonColor: 'red',
      });
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };
  
  const ActiveSubMenu = async (event) => {
    if (!event || event.mainid === undefined) return;
    const deletedMainId = event.mainid;
    const objVM = {
      mainid: deletedMainId,
      isActive: true,
      IsDeleted: false

    };
    mainSwitch(objVM);
  }
  const deleteMainMenu = async (event) => {
    if (!event || event.mainid === undefined) return;
    const deletedMainId = event.mainid;
    const objVM = {
      mainid: deletedMainId,
      isActive: false,
      IsDeleted: true
    };
    mainSwitch(objVM);
  }
  const mainSwitch=async(objVM)=>{
    try {
      const response = await apiClient.post('/Menu/DeleteMenuData', objVM, {

        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.data.statuscode === 200) {
        if(objVM.isActive==true){
                    Swal.fire({
                      title: 'Success',
                      text: 'Menu item DeActive successfully.',
                      icon: 'success',
                      confirmButtonColor: 'red',
                    });
                  }
                  else{
                    Swal.fire({
                      title: 'Success',
                      text: 'Menu item Active successfully.',
                      icon: 'success',
                      confirmButtonColor: 'green',
                    });
                  }
        // Fetch updated menu data after deletion
        fetchMenuData();
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message || "Failed to delete the menu item.",
          icon: 'error',
          confirmButtonColor: 'red',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: "An error occurred while deleting the menu item. Please try again.",
        icon: 'error',
        confirmButtonColor: 'red',
      });
      console.error("Error deleting menu data:", error);
    }
  }
  

  // Calculate the current rows to display
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
     <Card
               sx={{
                 boxShadow: "none",
                 borderRadius: "7px",
                 mb: "10px",
               }}
               className="rmui-card"
             >
        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
          Main Menu
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField 
              label="Page Name" 
              variant="outlined" 
              value={pageName} 
              onChange={(e) => setPageName(e.target.value)} 
              fullWidth 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField 
              label="Icon" 
              variant="outlined" 
              value={mainMenuIcon} 
              onChange={(e) => setMainMenuIcon(e.target.value)} 
              fullWidth 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{
                fontWeight: 'bold',
                bgcolor: 'green',
                borderRadius:'0px',
                color:'white',
                '&:hover': { bgcolor: 'green' }
              }}
              fullWidth
              startIcon={<SendIcon />}
            >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Card>

      <TableContainer component={Paper} sx={{ marginTop: "20px",background:'#c7c0c0' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyle}>S.No</TableCell>
              <TableCell sx={tableCellStyle}>Title</TableCell>
              <TableCell sx={tableCellStyle}>Icon</TableCell>
              <TableCell sx={tableCellStyle}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, index) => (
                <TableRow key={row.mainid}>
                  <TableCell sx={{ textAlign: 'center' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.title}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: row.icon }}></TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Tooltip title="Edit" arrow>
                      <IconButton color="secondary" onClick={() => {/* handle edit */}}>
                        <EditCalendarIcon sx={{ color: 'red' }} />
                      </IconButton>
                    </Tooltip>
                    {/* <Switch
                                                    color="secondary"
                                                    onClick={() => ActiveSubMenu(row)} // Handling deletion
                                                    checked={row.isActive === 1} // Switch checked if isActive is 1
                                                  //onChange={() => toggleStatus(row.mainid)} // Toggle active state
                                                    sx={{
                                                        '& .MuiSwitch-switchBase': {
                                                            '&.Mui-checked': {
                                                                '& .MuiSwitch-thumb': {
                                                                    background: "linear-gradient(135deg, #4CAF50, #8BC34A)",
                                                                },
                                                            },
                                                            '&:not(.Mui-checked) .MuiSwitch-thumb': {
                                                                background: 'red', // red color when inactive
                                                            },
                                                            '&.Mui-checked + .MuiSwitch-track': {
                                                                border: '1px solid black',
                                                            },
                                                            '&:not(.Mui-checked) + .MuiSwitch-track': {
                                                                backgroundColor: 'red', // red color when inactive
                                                            },
                                                        },
                                                        '& .MuiSwitch-switchBase + .MuiSwitch-track': {
                                                            border: 'none',
                                                        },
                                                    }}
                                                /> */}

                                          {row.isDeleted === 0 && (
                                            <>
                                                <Switch
                                                    color="secondary"
                                                    onClick={() => ActiveSubMenu(row)} // Handling deletion
                                                    checked={row.isActive === 1} // Switch checked if isActive is 1
                                                    //onChange={() => toggleStatus(row.mainid)} // Toggle active state
                                                    sx={{
                                                        '& .MuiSwitch-switchBase': {
                                                            '&.Mui-checked': {
                                                                '& .MuiSwitch-thumb': {
                                                                    background: "linear-gradient(135deg, #4CAF50, #8BC34A)",
                                                                },
                                                            },
                                                            '&:not(.Mui-checked) .MuiSwitch-thumb': {
                                                                background: 'red', // red color when inactive
                                                            },
                                                            '&.Mui-checked + .MuiSwitch-track': {
                                                                border: '1px solid black',
                                                            },
                                                            '&:not(.Mui-checked) + .MuiSwitch-track': {
                                                                backgroundColor: 'red', // red color when inactive
                                                            },
                                                        },
                                                        '& .MuiSwitch-switchBase + .MuiSwitch-track': {
                                                            border: 'none',
                                                        },
                                                    }}
                                                />
                                                <span style={{ marginLeft: '10px' }}>
                                                    {row.isActive === 1 ? '' : ''}
                                                </span>
                                            </>
                                        )}
                                        {row.isDeleted === 1 && row.isActive === 0 && (
                                            <span style={{ color: 'gray', marginLeft: '10px' }}>
                                                <Switch
                                                    color="secondary"
                                                    onClick={() => deleteMainMenu(row)}
                                                    //checked={item.isDeleted === 1} 
                                                   // onChange={() => toggleStatus(row.mainid)}
                                                    sx={{
                                                        '& .MuiSwitch-switchBase': {
                                                            '&.Mui-checked': {
                                                                '& .MuiSwitch-thumb': {
                                                                    background: "linear-gradient(135deg, #4CAF50, #8BC34A)",
                                                                },
                                                            },
                                                            '&:not(.Mui-checked) .MuiSwitch-thumb': {
                                                                background: 'red', // red color when inactive
                                                            },
                                                            '&.Mui-checked + .MuiSwitch-track': {
                                                                border: '1px solid black',
                                                            },
                                                            '&:not(.Mui-checked) + .MuiSwitch-track': {
                                                                backgroundColor: 'red', // red color when inactive
                                                            },
                                                        },
                                                        '& .MuiSwitch-switchBase + .MuiSwitch-track': {
                                                            border: 'none',
                                                        },
                                                    }}
                                                />
                                                {row.isDeleted === 1 ? '' : ''}
                                            </span>
                                        )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Component */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
          component="div"
          count={rows.length} // Total number of rows
          rowsPerPage={rowsPerPage} // Rows per page
          page={page} // Current page
          onPageChange={handleChangePage} // Handle page change
          onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
        />
      </TableContainer>
    </>
  );
};

export default MainPage;