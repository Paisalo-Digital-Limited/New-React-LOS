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
              padding:'20px'
            }}
            className="rmui-card"
          >
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Department Master
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
             variant="contained"
             size="large"
             sx={{ bgcolor:'green',  borderRadius:'0px', color:'white',fontWeight:'bold'}}
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
        <TableHead sx={{ backgroundColor: '#ff4c4c' }}>
        <TableRow sx={{ background: '#ff4c4c', color: 'white' }}>
              <TableCell sx={{ textAlign: 'center', color: 'white' }}>S.NO</TableCell>
              <TableCell sx={{ textAlign: 'center', color: 'white' }}>Title</TableCell>
              <TableCell sx={{ textAlign: 'center', color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((role, index) => (
              <TableRow key={role.id} hover  sx={{ background: 'white'}}>
                <TableCell align="center" sx={{color: 'black' }}>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell align="center"  sx={{color: 'black' }}>{role.name}</TableCell>
                <TableCell align="center"  sx={{color: 'black' }}>
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

      {openModal && (
        <Dialog open={openModal} onClose={() => setOpenModal(false)}  maxWidth="xs" fullWidth>
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



// import React, { useState, useEffect } from 'react';
// import {
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Snackbar,
//   Card,
//   Switch,
//   IconButton,
//   TablePagination,
// } from '@mui/material';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import Tooltip from '@mui/material/Tooltip'; 
// import MuiAlert from '@mui/material/Alert';
// import CloseIcon from '@mui/icons-material/Close';
// import axiosInstance from './apidepartment'; // Import your axios instance// Adjust the import path accordingly// Import Loader component
// import Swal from 'sweetalert2';

// const Department = () => {
//   const [name, setName] = useState('');
//   const [departments, setDepartments] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [editedDepartmentName, setEditedDepartmentName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [editedDepartmentId, setEditedDepartmentId] = useState(null);
  
//   const [showLoader, setShowLoader] = useState(true);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

//   useEffect(() => {
//     const loadDepartments = async () => {
//       await getDepartments();
//       setShowLoader(false);
//     };
    
//     loadDepartments();
//   }, []);

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to create this department?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, create it!',
//       cancelButtonText: 'No, cancel!',
//     });
  
//     if (result.isConfirmed) {
//       const data = { name, id: 0 };
//       try {
//         await axiosInstance.post('/CreateDepartment', data);  // Removed header since it's being set in the axios instance
//         setName('');
//         setSnackbarMessage('Department created successfully.');
//         setSnackbarOpen(true);
//         getDepartments();
//       } catch (error) {
//         console.error(error);
//         setSnackbarMessage('Failed to create department.');
//         setSnackbarOpen(true);
//       }
//     }
//   };

//   const handleUpdate = async () => {
//     if (editedDepartmentName && editedDepartmentId !== null) {
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: 'Do you want to update this department?',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, update it!',
//         cancelButtonText: 'No, cancel!',
//       });
  
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.post('/UpdateDepartment', { 
//             id: editedDepartmentId, 
//             name: editedDepartmentName 
//           }); // Removed header since it's being set in the axios instance
//           setSnackbarMessage('Department updated successfully.');
//           getDepartments();
//           setOpenModal(false);
//         } catch (error) {
//           console.error(error);
//           setSnackbarMessage('Failed to update department.');
//         } finally {
//           setSnackbarOpen(true);
//         }
//       }
//     }
//   };

//   const getDepartments = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get('/GetDepartmentDetails');
//       if (response.status === 200) {
//         setDepartments(response.data.data);
//       } else {
//         console.error(response.status + ': ' + response.statusText);
//         setSnackbarMessage('Failed to fetch departments.');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error(error);
//       setSnackbarMessage('Failed to fetch departments.');
//       setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to delete this department?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'No, cancel!',
//     });
    
//     if (result.isConfirmed) {
//       try {
//         await axiosInstance.get(`/DeleteDepartment?DepartmentId=${id}`); // Removed header since it's being set in the axios instance
//         setSnackbarMessage('Department deleted successfully.');
//         setSnackbarOpen(true);
//         await getDepartments(); 
//       } catch (error) {
//         console.error(error);
//         setSnackbarMessage('Failed to delete department.');
//         setSnackbarOpen(true);
//       }
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const displayedDepartments = departments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Grid container spacing={2} justifyContent="center">

      


//           <Grid item xs={12}>
//             <Card>
//               <Grid item xs={12} p={2}>
//                 <Typography variant="h5" sx={{ marginBottom: "5px", fontWeight: "bold" }}>Department Master</Typography>
//               </Grid>
//               <Grid item xs={12} p={1} mt={-1}>
//                 <form onSubmit={handleSubmit}>
//                   <Grid container direction="row" spacing={2} sx={{marginBottom:'1rem'}}>
//                     <Grid item xs={5} md={2}>
//                       <TextField
//                         value={name}
//                         onChange={(event) => setName(event.target.value)}
//                         variant="outlined"
//                         label="Enter Department Name"
//                         fullWidth
//                         size="medium"
//                       />
//                     </Grid>
//                     <Grid item xs={2} mt={0.5}>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         size="small"
//                         sx={{
//                           padding: "10px 12px",
//                           fontSize: "15px",
//                           background: "linear-gradient(135deg, #008000, #008000)",
//                           borderRadius: "8px",
//                           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                           "&:hover": {
//                             background: "linear-gradient(135deg, #81c783, #4caf50)",
//                           }
//                         }}
//                         startIcon={<CheckBoxIcon />}
//                       >
//                         SUBMIT
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </form>
//               </Grid>
//             </Card>
//           </Grid>

//           <Grid item xs={12} mb={2}>
//             <TableContainer component={Paper} sx={{borderRadius: '5px'}}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>S.NO</TableCell>
//                     <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Title</TableCell>
//                     <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {displayedDepartments.map((department, index) => (
//                     <TableRow key={department.id}>
//                       <TableCell sx={{padding: "10px 16px", textAlign:'center'}}>{(page * rowsPerPage) + index + 1}</TableCell>
//                       <TableCell sx={{padding: "10px 16px", textAlign:'center'}}>{department.name}</TableCell>
//                       <TableCell sx={{padding: "10px 16px", textAlign:'center'}}>
//                         <Button color="secondary" onClick={() => { 
//                           setEditedDepartmentName(department.name); 
//                           setEditedDepartmentId(department.id); 
//                           setOpenModal(true); 
//                         }}>
//                           <Tooltip title="Edit Designation" arrow>
//                             <EditCalendarIcon sx={{color:'red'}} />
//                           </Tooltip>
//                         </Button>
//                         <Switch
//                           checked={true}
//                           onChange={() => handleToggleActive(department.id, true)}
//                           color="success"
//                           inputProps={{ 'aria-label': 'controlled' }}
//                         />
//                         {/* <Button color="error" onClick={() => handleDelete(department.id)}>Delete</Button> */}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25]}
//                 component="div"
//                 count={departments.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//               />
//             </TableContainer>

//             {openModal && (
//               <Modal
//                 onClose={() => setOpenModal(false)}
//                 onUpdate={handleUpdate}
//                 editedDepartmentName={editedDepartmentName}
//                 setEditedDepartmentName={setEditedDepartmentName}
//               />
//             )}
//           </Grid>

//           <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
//             <MuiAlert onClose={handleSnackbarClose} severity="info">{snackbarMessage}</MuiAlert>
//           </Snackbar>

//     </Grid>
//   );
// };

// const Modal = ({ onClose, onUpdate, editedDepartmentName, setEditedDepartmentName }) => {
//   return (
//     <Paper 
//       elevation={6} 
//       square 
//       sx={{ 
//         position: 'absolute', 
//         top: '50%', 
//         left: '50%', 
//         transform: 'translate(-50%, -50%)', 
//         padding: '16px', 
//         maxWidth: '500px', 
//         width: { xs: '90%', sm: '500px' }, 
//       }}
//     >
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Typography variant="h6">Edit Department Name*</Typography>
//         <IconButton onClick={onClose}>
//           <CloseIcon sx={{color: 'red'}} />
//         </IconButton>
//       </div>
//       <TextField
//         value={editedDepartmentName}
//         onChange={(event) => setEditedDepartmentName(event.target.value)}
//         variant="outlined"
//         label="Name"
//         fullWidth
//         margin="normal" 
//       />
//       <Button onClick={onUpdate} variant="contained" color="primary" style={{ float: 'inline-end', marginTop: '16px' }}>Update</Button>
//     </Paper>
//   );
// };

// export default Department;

