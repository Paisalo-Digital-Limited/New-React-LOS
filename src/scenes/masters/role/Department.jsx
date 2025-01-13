import React, { useState } from 'react';
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
  IconButton,
  Paper,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Switch,
  Card
} from '@mui/material';
import { CheckBox as CheckBoxIcon, EditCalendar as EditCalendarIcon, Close as CloseIcon, Update as UpdateIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';
//import AnimateButton from 'components/@extended/AnimateButton';
import SendIcon from '@mui/icons-material/Send';

const initialDepartment = [
  { SNo:1, name: 'Admin' },
  { SNo:2, name: 'User' },
  { SNo:3, name:"user"}
];

const Department = () => {
  const [name, setName] = useState('');
  const [roles, setRoles] = useState(initialDepartment);
  const [editRole, setEditRole] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editedRoleName, setEditedRoleName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [nameError, setNameError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) {
      setNameError('Role Name is required');
      return;
    }
    setNameError('');
    const newRole = { id: roles.length + 1, name };
    setRoles([...roles, newRole]);
    Swal.fire('Success', 'Role created successfully!', 'success');
    setName('');
  };

  const handleEdit = (role) => {
    setEditRole(role);
    setEditedRoleName(role.name);
    setOpenModal(true);
  };

  const handleUpdate = () => {
    setRoles((prevRoles) => prevRoles.map((role) => (role.id === editRole.id ? { ...role, name: editedRoleName } : role)));
    Swal.fire('Success', 'Role updated successfully!', 'success');
    setOpenModal(false);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
     <Card
            sx={{
              boxShadow: "none",
              borderRadius: "7px",
              mb: "10px",
            }}
            className="rmui-card"
          >
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Department Master
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={4}>
            <TextField
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setNameError('');
              }}
              variant="outlined"
              label="Enter Department Name"
              fullWidth
              error={!!nameError}
              helperText={nameError}
            />
          </Grid>
          <Grid item xs={12} md={2}>
          {/* <AnimateButton> */}
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
            {/* </AnimateButton> */}
          </Grid>
        </Grid>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#ff4c4c', color: 'white' }}>
              <TableCell sx={{ textAlign: 'center', color: 'white' }}>S.NO</TableCell>
              <TableCell sx={{ textAlign: 'center', color: 'white' }}>Title</TableCell>
              <TableCell sx={{ textAlign: 'center', color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((role, index) => (
              <TableRow key={role.id} hover>
                <TableCell align="center">{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell align="center">{role.name}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEdit(role)}>
                    <Tooltip title="Edit Role" arrow>
                      <EditCalendarIcon sx={{ color: 'red' }} />
                    </Tooltip>
                  </IconButton>
                  <Switch
                    // checked={role.isActive}
                    checked={true}
                    // onChange={() => handleToggleActive(role.id, role.isActive)}
                   // onChange={() => handleToggleActive(role.id, true)}
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

      {openModal && (
        <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="xs" fullWidth>
          <DialogTitle>
            Edit Department Name
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setOpenModal(false)}
              aria-label="close"
              sx={{ position: 'absolute', right: 6, top: 6, color: 'red' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              value={editedRoleName}
              onChange={(event) => setEditedRoleName(event.target.value)}
              variant="outlined"
              label="Department Name"
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
          <Button
        variant="contained"
        startIcon={<UpdateIcon />}
        sx={{
          textTransform: "none",
          borderRadius: "18px",
          fontWeight: "bold",
          fontSize: "16px",
          padding: "12px 12px",
          backgroundColor: "#42A5F5",
          color: "white",
          boxShadow: "0px 4px 15px rgba(66, 165, 245, 0.3)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#1E88E5",
            boxShadow: "0px 6px 20px rgba(30, 136, 229, 0.4)",
          },
        }}
        onClick={handleUpdate}
      >
        Update
      </Button>

          </DialogActions>
        </Dialog>
      )}
    </Card>
  );
};

export default Department;


 
