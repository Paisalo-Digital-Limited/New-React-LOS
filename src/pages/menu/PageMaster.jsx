'use client';

import React, {useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Tooltip,
  IconButton,
  Card,
  FormHelperText, 
  Switch,
  TablePagination

} from '@mui/material';

import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import SendIcon from '@mui/icons-material/Send';
import apiClient from '../../network/apiClient';

const initialRows = [
  { id: 1, sNo: 1, menu: 'Dashboard', subMenu: 'Overview', pageName: 'Home', pageUrl: '/home', status: true },
  { id: 2, sNo: 2, menu: 'User Management', subMenu: 'User List', pageName: 'Users', pageUrl: '/users', status: true }
];

const tableHeaders = ['S.No', 'Menu', 'Sub Menu', 'Title', 'Page Url', 'Action'];

const AddMenuMaster = () => {
  const [rows] = useState(initialRows);
  const [menu, setMenu] = useState('');
  const [menuData, setMenuData] = useState([]);
  const [parentId, setParentId] = useState(null);
  const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Set default rows per page
    const [pageNo, setPageNo] = useState(1);
    const [menuListData, setMenuListData] = useState([]);
    const [subparentId, setsubparentId] = useState([]);
    const [subMenuData, setSubMenuData] = useState([]);

  const [errors, setErrors] = React.useState({
    menu: "",
    subMenu: "",
    pageName: "",
    pageUrl: "",
});
 useEffect(() => {
    fetchMenuData();
    fetchMenuDataForList();
}, [pageNo, rowsPerPage]);

const fetchMenuData = async () => {
  try {
    const response = await apiClient.get("/Menu/GetMainMenu");
    if (response.status === 200) {
      setMenuData(response.data.data);
    }
  } catch (error) {
    console.error('Error fetching menu data:', error);
  }
};
const fetchMenuDataForList = async () => {
  try {
      
      const response = await apiClient.get("/Menu/GetMainMenuListData")

      if (response.status === 200) {
        setMenuListData(response.data.data); // Set menu list data
          // if (data.data.length > 0) {
          //     setTotalCount(data.data[0].totalCount);
          // } else {
          //     setTotalCount(0);
          // }
      // } else {
      //     console.error('Failed to fetch menu data:', data.message);
      }
  } catch (error) {
      console.error('Error fetching menu data:', error);
  }
};
  const handleMenuChange = (event) => {
    debugger;
    const selectedTitle = event.target.value;
    setMenu(selectedTitle);
    const selectedMenuItem = menuData.find((item) => item.title === selectedTitle);
    if (selectedMenuItem) {
        setParentId(selectedMenuItem.id);
    }
};
  return (
    <>
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '7px',
          mb: '10px'
        }}
        className="rmui-card"
      >
        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
          Page Master
        </Typography>

        <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
        <Grid item xs={12} sm={3} md={2}>
                        <FormControl fullWidth error={!!errors.menu}>
                            <InputLabel id="menu-label">Menu</InputLabel>
                            <Select
                                value={menu}
                                // <SelectState state={state} onSelectChange={(event: SelectChangeEvent) => handleStateChange(event)} />

                                onChange={handleMenuChange}
                                label="Menu"
                                labelId="menu-label"
                                id="menu-select"
                            >
                                {menuData.map((menuItem) => (
                                    <MenuItem key={menuItem.id} value={menuItem.title}>
                                        {menuItem.title}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.menu && <FormHelperText>{errors.menu}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3} md={2}>
                        <FormControl fullWidth error={!!errors.subMenu}>
                            <InputLabel id="sub-menu-label">Sub Menu</InputLabel>
                            <Select
                                value={subparentId || ""} // Ensure default value is never undefined
                               onChange={(e) => setsubparentId(e.target.value)} // Parse value to number
                               // onChange={(e) => setsubparentId(Number(e.target.value))} // Parse value to number

                                label="Sub Menu"
                                labelId="sub-menu-label"
                                id="sub-menu-select"
                            >
                                {menuListData && menuListData.length > 0 ? (
                                    menuListData.map((submenuItem) => (
                                        <MenuItem key={submenuItem.id} value={submenuItem.id}> {/* Use ID as value */}
                                            {submenuItem.title} {/* Display title */}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No submenus available</MenuItem>
                                )}
                            </Select>
                            {errors.subMenu && <FormHelperText>{errors.subMenu}</FormHelperText>}
                        </FormControl>
                    </Grid>

          <Grid item xs={12} sm={3} md={2}>
            <TextField label="Page Name" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12} sm={3} md={2}>
            <TextField label="Page URL" variant="outlined" fullWidth />
          </Grid>

         <Grid item xs={12} sm={4} md={2}>
           
          
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                fontWeight: 'bold',
                    bgcolor: 'green',
                    borderRadius:'0px',
                    color:'white',
                    '&:hover': { bgcolor: 'green' } // Ensuring it stays green on hover
                  }}
              fullWidth
              startIcon={<SendIcon />} // Adding Submit Icon
            >
              SUBMIT
            </Button>
          
            
          </Grid>
        </Grid>
      </Card>

      <TableContainer component={Paper} sx={{ borderRadius: '5px' , marginTop:"20px", background:'#c7c0c0'}}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    background: '#ff4c4c',
                    padding: '10px 16px',
                    color: 'white',
                    textAlign: 'center'
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.menu}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.subMenu}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.pageName}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.pageUrl}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Tooltip title="Edit" arrow>
                      <IconButton sx={{ padding: '4px' }} onClick={"() => editMenu(row)"}>
                        <EditCalendarIcon sx={{ fontSize: '24px', color: 'red' }} />
                      </IconButton>
                    </Tooltip>
                    <Switch
                      // checked={role.isActive}
                      checked={true}
                      // onChange={() => handleToggleActive(role.id, role.isActive)}
                      onChange={""}
                      color="success"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableHeaders.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
                  rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
                  component="div"
                  count={rows.length} // Total number of rows
                  rowsPerPage={rowsPerPage} // Rows per page
                  page={page} // Current page
                  //onPageChange={handleChangePage} // Handle page change
                  //onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
                />
      </TableContainer>
    </>
  );
};

export default AddMenuMaster;
