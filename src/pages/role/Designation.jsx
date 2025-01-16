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
//   Card,
//   FormControl,
//   InputLabel,
//   Select
// } from '@mui/material';
// import { CheckBox as CheckBoxIcon, EditCalendar as EditCalendarIcon, Close as CloseIcon, Update as UpdateIcon } from '@mui/icons-material';
// import Swal from 'sweetalert2';
// import AnimateButton from 'components/@extended/AnimateButton';
// import SendIcon from '@mui/icons-material/Send';

// const initialDepartment = [
//   { SNo:1, name: 'Admin' },
//   { SNo:2, name: 'User' },
//   { SNo:3, name:"user"}
// ];

// const Designation = () => {
//   const [name, setName] = useState('');
//   const [roles, setRoles] = useState(initialDepartment);
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
//    <Card
//           sx={{
//             boxShadow: "none",
//             borderRadius: "7px",
//             mb: "10px",
//           }}
//           className="rmui-card"
//         >
//       <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
//         Designation Master
//       </Typography>

//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2} mb={2}>
//         <Grid item xs={12} sm={5} md={3}>
//             <FormControl fullWidth >
//               <InputLabel id="sub-menu-label">Department</InputLabel>
//               <Select
//                 label="Sub Menu"
//                 labelId="sub-menu-label"
//                 id="sub-menu-select"
//               >
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={5} md={3}>
//             <TextField
//               value={name}
//               onChange={(event) => {
//                 setName(event.target.value);
//                 setNameError('');
//               }}
//               variant="outlined"
//               label="Enter Designation Name"
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
//               SUBMIT
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
//               <TableCell sx={{ textAlign: 'center', color: 'white' }}>Title</TableCell>
//               <TableCell sx={{ textAlign: 'center', color: 'white' }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {roles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((role, index) => (
//               <TableRow key={role.id} hover>
//                 <TableCell align="center">{index + 1 + page * rowsPerPage}</TableCell>
//                 <TableCell align="center">{role.name}</TableCell>
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
//             Edit Designation Name
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
//               label="Designation Name"
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

// export default Designation;



import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  IconButton,
  Switch,
  Card,
  TablePagination
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import Tooltip from '@mui/material/Tooltip';
import MuiAlert from '@mui/material/Alert';
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from './apidepartment'; // Import your axios instance

const Designation = () => {
  const [title, setTitle] = useState('');
  const [designations, setDesignations] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [editedDesignationTitle, setEditedDesignationTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [editedDesignationId, setEditedDesignationId] = useState(null);

  useEffect(() => {
    getDesignations();
  }, []); // Fetch designations initially

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const { isConfirmed } = await Swal.fire({
      title: 'Confirm Creation',
      text: 'Do you want to create a new designation?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
  
    if (isConfirmed) {
      const data = {
        id: 0,
        title,
        isActive: true,
        isDeleted: false,
        createdOn: new Date().toISOString(),
        modifiedOn: new Date().toISOString(),
      };
  
      try {
        await axiosInstance.post('/CreateDesignation', data);
        setTitle(''); // Clear the input field
        Swal.fire('Success!', 'Designation created successfully.', 'success');
        getDesignations(); // Fetch updated designations
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'Failed to create designation.', 'error');
      }
    }
  };

  const handleUpdate = async () => {
    if (editedDesignationTitle && editedDesignationId !== null) {
      const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to update this designation?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
      });
  
      if (isConfirmed) {
        const data = {
          id: editedDesignationId,
          title: editedDesignationTitle,
          isActive: true,
          isDeleted: false,
          modifiedOn: new Date().toISOString(),
        };
  
        try {
          await axiosInstance.post('/UpdateDesignation', data);
          Swal.fire('Updated!', 'Designation updated successfully.', 'success');
          getDesignations(); // Refresh the designations list
          setOpenModal(false); // Close the modal
        } catch (error) {
          console.error(error);
          Swal.fire('Error!', 'Failed to update designation.', 'error');
        }
      }
    }
  };

  const getDesignations = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/GetDesignationDetails');
      if (response.status === 200) {
        setDesignations(response.data.data);
      } else {
        console.error(response.status + ': ' + response.statusText);
        setSnackbarMessage('Failed to fetch designations.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Failed to fetch designations.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete the designation!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (isConfirmed) {
      try {
        await axiosInstance.get(`/DeleteDesignation?DesignationId=${id}`);
        Swal.fire('Deleted!', 'Designation deleted successfully.', 'success');
        getDesignations(); // Refresh the designations
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'Failed to delete designation.', 'error');
      }
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      await axiosInstance.post('/UpdateRoleStatus', { id, isActive: newStatus });
      Swal.fire('Success', 'Role status updated successfully!', 'success');
      getDesignations(); // Refresh the designations
    } catch (error) {
      Swal.fire('Error', 'Failed to update role status. Please try again.', 'error');
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

  const displayedDesignations = designations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Card>
          <Grid item xs={12} p={2}>
            <Typography variant="h5" sx={{ marginBottom: "5px", fontWeight: "bold" }}>Designation Master</Typography>
          </Grid>
          <Grid item xs={12} p={1}>
            <form onSubmit={handleSubmit}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={5} md={3}>
                  <TextField
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    variant="outlined"
                    label="Enter Designation Title"
                    fullWidth
                    size="medium"
                  />
                </Grid>
                <Grid item xs={2} mt={0.5}>
                  <Button
                     variant="contained"
                     size="large"
                     sx={{ bgcolor:'green',  borderRadius:'0px', color:'white',fontWeight:'bold'}}
                    startIcon={<CheckBoxIcon />}
                  >
                    SUBMIT
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Card>
      </Grid>

      <Grid item xs={12} mb={2}>
        <TableContainer component={Paper} sx={{ borderRadius: '5px'}}>
          <Table>
                <TableHead sx={{ backgroundColor: '#ff4c4c' }}>
             <TableRow sx={{ background: '#ff4c4c', color: 'white' }}>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>S.NO</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedDesignations.map((designation, index) => (
                <TableRow key={designation.id} sx={{ background: 'white'}}>
                  <TableCell sx={{ padding: "10px 16px", textAlign: 'center', color: 'black'}}>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell sx={{ padding: "10px 16px", textAlign: 'center', color: 'black'}}>{designation.title}</TableCell>
                  <TableCell sx={{ padding: "10px 16px", textAlign: 'center', color: 'black'}}>
                    <Button
                      color="secondary"
                      onClick={() => {
                        setEditedDesignationTitle(designation.title);
                        setEditedDesignationId(designation.id);
                        setOpenModal(true);
                      }}
                    >
                      <Tooltip title="Edit Designation" arrow>
                        <EditCalendarIcon sx={{ color: 'red' }} />
                      </Tooltip>
                    </Button>
                    <Switch
                      checked={designation.isActive}
                      onChange={() => handleToggleActive(designation.id, designation.isActive)}
                      color="success"
                    />
                    {/* <Button color="error" onClick={() => handleDelete(designation.id)}>Delete</Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
       
          <TableRow sx={{ background: 'white' }}>
          <TablePagination
           sx={{ color: 'black'}}
            rowsPerPageOptions={[5, 10, 25]}
            count={designations.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          </TableRow>
          </Table>
        </TableContainer>

        {/* Modal for Updating Designation */}
        {openModal && (
          <Modal
            onClose={() => setOpenModal(false)}
            onUpdate={handleUpdate}
            editedDesignationTitle={editedDesignationTitle}
            setEditedDesignationTitle={setEditedDesignationTitle}
          />
        )}
      </Grid>

      {/* Snackbar for Feedback */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="info">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

const Modal = ({ onClose, onUpdate, editedDesignationTitle, setEditedDesignationTitle }) => {
  return (
    <Paper
      elevation={6}
      square
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '16px',
        width: '90%', // Responsive width
        maxWidth: '600px', // Max width
        boxSizing: 'border-box' // Ensure padding is included in width calculation
      }}
    >
      <IconButton onClick={onClose} style={{ position: 'absolute', top: '8px', right: '8px' }}>
        <CloseIcon sx={{ color: 'red' }} />
      </IconButton>
      
      <Typography variant="h6" gutterBottom>Edit Designation Title</Typography>
      <TextField
        sx={{ marginTop: '1rem' }}
        value={editedDesignationTitle}
        onChange={(event) => setEditedDesignationTitle(event.target.value)}
        variant="outlined"
        label="Title"
        fullWidth
      />
      <Button onClick={onUpdate} variant="contained" color="primary" style={{ float: 'inline-end', marginTop: '16px' }}>
        Update
      </Button>
    </Paper>
  );
};

export default Designation;