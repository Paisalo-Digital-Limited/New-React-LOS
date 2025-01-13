import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Switch,
  IconButton,
  Card,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
  Tooltip
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import axiosInstance from './apidepartment';
import apiClient from '../../../network/apiClient';
import SendIcon from '@mui/icons-material/Send';

// This function simulates a hook for getting a token.
const useToken = () => {
  // Replace with your logic to retrieve the token
  return { token: sessionStorage.getItem('authToken') };
};

const GetRole = () => {
  const { token } = useToken();
  const [name, setName] = useState('');
  const [roles, setRoles] = useState([]);
  const [editRole, setEditRole] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editedRoleName, setEditedRoleName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getRoles();
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to create this new role: "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, create it!',
      cancelButtonText: 'No, cancel!'
    });

    if (result.isConfirmed) {
      const data = { name, id: 0 };
      try {
        await axiosInstance.post('/CreateNewRole', data);
        await Swal.fire('Success', 'Role created successfully!', 'success');
        getRoles();
        setName('');
      } catch (error) {
        await Swal.fire('Error', 'Failed to create role. Please try again.', 'error');
        console.error(error);
      }
    }
  };

  const handleEdit = (role) => {
    setEditRole(role);
    setEditedRoleName(role.name);
    setOpenModal(true);
  };

  const handleUpdate = async () => {
    if (editRole) {
      try {
        const updatedRole = { ...editRole, name: editedRoleName };
        await axiosInstance.post('/UpdateRole', updatedRole);
        await Swal.fire('Success', 'Role updated successfully!', 'success');
        getRoles();
      } catch (error) {
        await Swal.fire('Error', 'Failed to update the role. Please try again.', 'error');
        console.error(error);
      }
    }
    setOpenModal(false);
  };

  const getRoles = async () => {
    debugger;
    try {
      const response = await apiClient.get('/Masters/GetRoles', { requireAuth: true });
    debugger;

      setRoles(response.data.data);
    } catch (error) {
      await Swal.fire('Error', 'Failed to fetch roles. Please try again.', 'error');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone. Do you want to delete this role?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it!'
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.get(`/DeleteRole?Id=${id}`);
        await Swal.fire('Success', 'Role deleted successfully!', 'success');
        getRoles();
      } catch (error) {
        await Swal.fire('Error', 'Failed to delete role. Please try again.', 'error');
        console.error(error);
      }
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      await axiosInstance.post('/UpdateRoleStatus', { id, isActive: newStatus });
      await Swal.fire('Success', 'Role status updated successfully!', 'success');
      getRoles();
    } catch (error) {
      await Swal.fire('Error', 'Failed to update role status. Please try again.', 'error');
      console.error(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditRole(null);
    setEditedRoleName('');
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Card>
          <Typography variant="h5" sx={{ marginBottom: "5px", fontWeight: "bold" }}>Role Master</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={5} md={3}>
                <TextField
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  variant="outlined"
                  label="Enter Role Name"
                  fullWidth
                  size="large"
                />
              </Grid>
              <Grid item xs={2}>
              <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                fontWeight: 'bold',
                bgcolor: 'green',
                '&:hover': { bgcolor: 'green' } // Ensuring it stays green on hover
              }}
              fullWidth
              startIcon={<SendIcon />} // Adding Submit Icon
            >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>

      <Grid item xs={12} mb={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
                  <TableRow sx={{ background: '#ff4c4c', color: 'white' }}>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>S.NO</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((role, index) => (
                <TableRow key={role.id}>
                  <TableCell sx={{ textAlign: 'center' }}>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{role.name}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{role.id}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <IconButton color="secondary" onClick={() => handleEdit(role)}>
                      <Tooltip title="Edit Designation" arrow>
                        <EditCalendarIcon sx={{ color: 'red' }} />
                      </Tooltip>
                    </IconButton>
                    <Switch
                      checked={true}
                      onChange={() => handleToggleActive(role.id, true)}
                      color="success"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={roles.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>

      {openModal && (
        <Dialog open={openModal} onClose={closeModal} maxWidth="xs">
          <DialogTitle>
            Edit Role Name
            <IconButton edge="end" color="inherit" onClick={closeModal} aria-label="close">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              value={editedRoleName}
              onChange={(event) => setEditedRoleName(event.target.value)}
              variant="outlined"
              label="Name"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
};

export default GetRole;