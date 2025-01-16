import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Card,
  Paper,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { CheckBox as CheckBoxIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
// import AnimateButton from 'components/@extended/AnimateButton';
// Static Data
const roles = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Editor' },
  { id: 3, name: 'Viewer' },
];

const subMenus = [
  { id: 1, title: 'Dashboard' },
  { id: 2, title: 'Settings' },
  { id: 3, title: 'Profile' },
];

const Permission = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [userId, setUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedSubMenu, setSelectedSubMenu] = useState('');

  const handleSelectRow = (id) => {
    const newSelectedRows = selectedRows.includes(id) ? selectedRows.filter((rowId) => rowId !== id) : [...selectedRows, id];
    setSelectedRows(newSelectedRows);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    toast.info(`Role changed to ${event.target.value}`);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubMenuChange = (event) => {
    setSelectedSubMenu(event.target.value);
  };

  const handleSearch = () => {
    if (!userId || !selectedRole || !selectedSubMenu) {
      toast.error('Please select Role, User ID, and Sub Menu.');
    } else {
      toast.success('Search executed. Data filtered.');
    }
  };

  return (
    <>
      <ToastContainer />
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "10px",
        }}
        className="rmui-card"
      >
        <Typography variant="h5"  sx={{ marginBottom: "20px", fontWeight: "bold" }}>
          Role Permission
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select value={selectedRole} onChange={handleRoleChange} label="Role">
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>User ID</InputLabel>
              <Select value={userId} onChange={handleUserIdChange} label="User ID">
                {[
                  { id: 1, email: 'user1@example.com' },
                  { id: 2, email: 'user2@example.com' }
                ].map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sub Menu</InputLabel>
              <Select value={selectedSubMenu} onChange={handleSubMenuChange} label="Sub Menu">
                {subMenus.map((submenu) => (
                  <MenuItem key={submenu.id} value={submenu.id}>
                    {submenu.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3} md={3}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
        {/* <AnimateButton> */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSearch}
            fullWidth
            startIcon={<SearchIcon />} // Adding Search Icon
          >
            Search
          </Button>
          {/* </AnimateButton> */}
        </Grid>
        <Grid item xs={6}>
        {/* <AnimateButton> */}
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            sx={{
              fontWeight: 'bold',
              bgcolor: 'green',
              '&:hover': { bgcolor: 'primary.success' }
            }}
            fullWidth
            startIcon={<SendIcon />} // Adding Submit Icon
          >
           SUBMIT
          </Button>
          {/* </AnimateButton> */}
        </Grid>
      </Grid>
    </Grid>

        </Grid>
      </Card>

        <Grid container spacing={2} marginTop={5}>
          {subMenus.map((submenu) => (
            <Grid item xs={12} sm={6} md={4} key={submenu.id}>
              <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: '5px' , justifyContent:"space-between"}}>
              <Typography variant="body1">{submenu.title}</Typography>
                <Checkbox
                  checked={selectedRows.includes(submenu.id)}
                  onChange={() => handleSelectRow(submenu.id)}
                  color="success"
                />
                
              </Paper>
            </Grid>
          ))}
        </Grid>
    </>
  );
};

export default Permission;