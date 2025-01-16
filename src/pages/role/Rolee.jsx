// import React, { useState } from 'react';
// import {
//   Grid,
//   Typography,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableFooter,
//   IconButton,
//   Paper,
//   TablePagination,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Tooltip,
//   Switch,
//   Card
// } from '@mui/material';
// import { CheckBox as CheckBoxIcon, EditCalendar as EditCalendarIcon, Close as CloseIcon, Update as UpdateIcon } from '@mui/icons-material';
// import Swal from 'sweetalert2';
// import AnimateButton from 'components/@extended/AnimateButton';
// import SendIcon from '@mui/icons-material/Send';

// const initialRoles = [
//   { id: 1, name: 'Admin' },
//   { id: 2, name: 'User' },
//   { id: 3, name: 'Manager' }
// ];

// const GetRole = () => {
//   const [name, setName] = useState('');
//   const [roles, setRoles] = useState(initialRoles);
//   const [editRole, setEditRole] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const [editedRoleName, setEditedRoleName] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [nameError, setNameError] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!name.trim()) {
//       setNameError('Role Name is required');
//       return;
//     }
//     setNameError('');
//     const newRole = { id: roles.length + 1, name };
//     setRoles([...roles, newRole]);
//     Swal.fire('Success', 'Role created successfully!', 'success');
//     setName('');
//   };

//   const handleEdit = (role) => {
//     setEditRole(role);
//     setEditedRoleName(role.name);
//     setOpenModal(true);
//   };

//   const handleUpdate = () => {
//     setRoles((prevRoles) => prevRoles.map((role) => (role.id === editRole.id ? { ...role, name: editedRoleName } : role)));
//     Swal.fire('Success', 'Role updated successfully!', 'success');
//     setOpenModal(false);
//   };

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Card
//            sx={{
//              boxShadow: "none",
//              borderRadius: "7px",
//              mb: "10px",
//            }}
//            className="rmui-card"
//          >
//       <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
//         Role Master
//       </Typography>

//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2} mb={2}>
//           <Grid item xs={12} md={4}>
//             <TextField
//               value={name}
//               onChange={(event) => {
//                 setName(event.target.value);
//                 setNameError('');
//               }}
//               variant="outlined"
//               label="Enter Role Name"
//               fullWidth
//               error={!!nameError}
//               helperText={nameError}
//             />
//           </Grid>
//           <Grid item xs={12} md={2}>
//           <AnimateButton>
//             <Button
//               type="submit"
//               variant="contained"
//               size="large"
//               sx={{
//                 fontWeight: 'bold',
//                 bgcolor: 'green',
//                 '&:hover': { bgcolor: 'green' } // Ensuring it stays green on hover
//               }}
//               fullWidth
//               startIcon={<SendIcon />} // Adding Submit Icon
//             >
//              SUBMIT
//             </Button>
//             </AnimateButton>
//           </Grid>
//         </Grid>
//       </form>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ background: '#ff4c4c', color: 'white' }}>
//               <TableCell sx={{ textAlign: 'center', color: 'white' }}>S.NO</TableCell>
//               <TableCell sx={{ textAlign: 'center', color: 'white' }}>Name</TableCell>
//               <TableCell sx={{ textAlign: 'center', color: 'white' }}>ID</TableCell>
//               <TableCell sx={{ textAlign: 'center', color: 'white' }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {roles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((role, index) => (
//               <TableRow key={role.id} hover>
//                 <TableCell align="center">{index + 1 + page * rowsPerPage}</TableCell>
//                 <TableCell align="center">{role.name}</TableCell>
//                 <TableCell align="center">{role.id}</TableCell>
//                 <TableCell align="center">
//                   <IconButton color="primary" onClick={() => handleEdit(role)}>
//                     <Tooltip title="Edit Role" arrow>
//                       <EditCalendarIcon sx={{ color: 'red' }} />
//                     </Tooltip>
//                   </IconButton>
//                   <Switch
//                     // checked={role.isActive}
//                     checked={true}
//                     // onChange={() => handleToggleActive(role.id, role.isActive)}
//                     onChange={() => handleToggleActive(role.id, true)}
//                     color="success"
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25]}
//                 count={roles.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//               />
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>

//       {openModal && (
//         <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="xs" fullWidth>
//           <DialogTitle>
//             Edit Role Name
//             <IconButton
//               edge="end"
//               color="inherit"
//               onClick={() => setOpenModal(false)}
//               aria-label="close"
//               sx={{ position: 'absolute', right: 6, top: 6, color: 'red' }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <TextField
//               value={editedRoleName}
//               onChange={(event) => setEditedRoleName(event.target.value)}
//               variant="outlined"
//               label="Role Name"
//               fullWidth
//               margin="normal"
//             />
//           </DialogContent>
//           <DialogActions>
//           <Button
//         variant="contained"
//         startIcon={<UpdateIcon />}
//         sx={{
//           textTransform: "none",
//           borderRadius: "18px",
//           fontWeight: "bold",
//           fontSize: "16px",
//           padding: "12px 12px",
//           backgroundColor: "#42A5F5",
//           color: "white",
//           boxShadow: "0px 4px 15px rgba(66, 165, 245, 0.3)",
//           transition: "all 0.3s ease-in-out",
//           "&:hover": {
//             backgroundColor: "#1E88E5",
//             boxShadow: "0px 6px 20px rgba(30, 136, 229, 0.4)",
//           },
//         }}
//         onClick={handleUpdate}
//       >
//         Update
//       </Button>

//           </DialogActions>
//         </Dialog>
//       )}
//     </Card>
//   );
// };

// export default GetRole;




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
  Tooltip,
  Box
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import axiosInstance from './apidepartment';

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
    try {
      const response = await axiosInstance.get('/GetRoles');
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
        
    <Box>
    <Card sx={{ boxShadow: "none", borderRadius: "7px", p: 2, mb: 2 }}>
      <Grid item xs={12}>
     
          <Typography variant="h5" sx={{ marginBottom: "5px", fontWeight: "bold" }}>Role Master</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ boxShadow: "none"}}>
              <Grid item xs={5} md={3}>
                <TextField
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  variant="outlined"
                  label="Enter Role Name"
                  fullWidth
                  size="medium"
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                   variant="contained"
                   size="large"
                   sx={{ bgcolor:'green',  borderRadius:'0px', color:'white',fontWeight:'bold'}}
                  startIcon={<CheckBoxIcon />}
                  onClick={handleSubmit}
                >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </form>
      
      </Grid>
      
      <Grid item xs={12} mb={2} mt={1}>
        <TableContainer component={Paper}>
          <Table>
                <TableHead sx={{ backgroundColor: '#ff4c4c' }}>
                <TableRow sx={{ background: '#ff4c4c', color: 'white' }}>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>S.NO</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((role, index) => (
                <TableRow key={role.id}   sx={{ background: 'white'}}>
                  <TableCell sx={{ textAlign: 'center', color: 'black' }}>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell sx={{ textAlign: 'center', color: 'black' }}>{role.name}</TableCell>
                  <TableCell sx={{ textAlign: 'center', color: 'black' }}>{role.id}</TableCell>
                  <TableCell sx={{ textAlign: 'center', color: 'black' }}>
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
              <TableRow sx={{ background: 'white' }}>
                <TablePagination
                  sx={{ color: 'black'}}
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
      </Card>


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
    </Box>
  );
};

export default GetRole;