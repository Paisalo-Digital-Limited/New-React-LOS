import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Switch,
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { getVehicleTypes, createVehicleType, updateVehicleType, toggleVehicleTypeStatus  } from '../../../api/apiVheicle';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const VehicleType = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [loading, setLoading] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [fetchError, setFetchError] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [first] = useState(0);

  const validateInputs = () => {
    let isValid = true;
    setNameError('');
    setDescriptionError('');

    if (!name.trim()) {
      setNameError('Vehicle Name is required.');
      isValid = false;
    }
    if (!description.trim()) {
      setDescriptionError('Description is required.');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    try {
      const vehicleTypeData = { name: name.trim(), description: description.trim() };
      await createVehicleType(vehicleTypeData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Vehicle type created successfully.',
        confirmButtonText: 'OK',
      });
      setName('');
      setDescription('');
      fetchVehicleTypes();
    } catch (apiError) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: apiError.message || 'An error occurred while creating the vehicle type.',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicleTypes = async () => {
    setLoading(true);
    try {
      const data = await getVehicleTypes();
      if (data.statuscode === 200) {
        setVehicleTypes(
          data.data.map((item, index) => ({ id: index + 1, ...item }))
        );
      } else {
        setFetchError(data.message || 'Failed to fetch vehicle types.');
      }
    } catch (error) {
      setFetchError(error.message || 'An error occurred while fetching vehicle types.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  const handleEdit = (rowData) => {
    setEditData(rowData);
    setName(rowData.name);
    setDescription(rowData.description);
    setEditDialogOpen(true);
  };

  const saveEdit = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      const updatedData = { id: editData.id, name: name.trim(), description: description.trim() };
      const response = await updateVehicleType(updatedData);

      if (response.statuscode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Vehicle type updated successfully.',
          confirmButtonText: 'OK',
        });
        setEditDialogOpen(false);
        fetchVehicleTypes(); // Refresh the data table
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.message || 'Failed to update the vehicle type.',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'An error occurred while updating the vehicle type.',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (rowData) => {
    setLoading(true);
    try {
      // Call the API utility function to toggle the status
      const result = await toggleVehicleTypeStatus(rowData.id);
  
      console.log('API Response:', result); // Debugging: Check the API response
  
      if (result.statuscode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `Vehicle type has been ${!rowData.isActive ? 'activated' : 'deactivated'}.`,
          confirmButtonText: 'OK',
        });
  
        // Update the local state to reflect the changes
        const updatedVehicleTypes = vehicleTypes.map((type) =>
          type.id === rowData.id
            ? { ...type, isActive: !rowData.isActive, isDeleted: false } // Toggle only isActive; ensure isDeleted remains false
            : type
        );
  
        setVehicleTypes(updatedVehicleTypes); // Update the UI
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.message || 'Failed to update vehicle type status.',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error toggling status:', error); // Debugging: Check for errors
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'An error occurred while updating vehicle type status.',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };
  

  const actionTemplate = (rowData) => {
    return (
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
       <EditIcon
  onClick={() => handleEdit(rowData)}
  sx={{
    fontSize: '24px',
    color: '#1976d2',
    cursor: 'pointer',
    '&:hover': {
      color: '#115293',
    },
  }}
/>
        <Switch
        checked={rowData.isActive}
        onChange={() => toggleStatus(rowData)}
        sx={{
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#4caf50', 
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#81c784', 
          },
          '& .MuiSwitch-track': {
            backgroundColor: rowData.isActive ? '#81c784' : '#ef9a9a',
          },
        }}
      />
      </div>
    );
  };

  
  
  return (
    <Card>
      <Typography variant="h5" sx={{ marginBottom: '15px', fontWeight: 'bold', color: 'black' }}>
        Vehicle Master
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: '5px' }}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Vehicle Name"
            variant="outlined"
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!nameError}
            helperText={nameError}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!descriptionError}
            helperText={descriptionError}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            size="small"
            type="button"
            onClick={handleSubmit}
            sx={{
              padding: '7px 20px',
              fontSize: '15px',
              background: 'linear-gradient(135deg, #008000, #008000)',
              borderRadius: '8px',
              '&:hover': {
                background: 'linear-gradient(135deg, #81c783, #4caf50)',
                transform: 'scale(1.05)',
              },
            }}
            startIcon={<CheckBoxIcon />}
          >
            {loading ? 'Saving...' : 'Submit'}
          </Button>
        </Grid>
      </Grid>

      {fetchError && <Typography color="error">{fetchError}</Typography>}
      <Box className="card" sx={{marginTop:'50px'}}>
        <DataTable
          value={vehicleTypes}
          paginator
          paginatorPosition="bottom"
          paginatorTemplate="RowsPerPageDropdown CurrentPageReport PrevPageLink PageLinks NextPageLink"
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          responsiveLayout="scroll"
          loading={loading}
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        
          style={{ textAlign: 'left' }}
        >
           <Column
      header="Sr. No."
      body={(rowData, { rowIndex }) => first + rowIndex + 1}
      style={{ width: '100px' }}
    />
          <Column field="id" header="ID" />
          <Column field="name" header="Vehicle Name" />
          <Column field="description" header="Description" />
          <Column header="Actions" body={actionTemplate} />
        </DataTable>
      </Box>

      <Dialog
  open={editDialogOpen}
  onClose={() => setEditDialogOpen(false)}
  fullWidth
  maxWidth="sm"
  sx={{
    '& .MuiDialog-paper': {
      borderRadius: '16px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    },
  }}
>
  <DialogTitle
    sx={{
      textAlign: 'center',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #2196f3, #21cbf3)',
      color: 'white',
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px',
      padding: '16px 24px',
         marginBottom:'30px'
    }}
    
  >
    Edit Vehicle Type
  </DialogTitle>
  <DialogContent
    sx={{
      padding: '24px',
      backgroundColor: '#ffff',
    }}
  >
    <TextField
      label="Vehicle Name"
      variant="outlined"
      fullWidth
      size="medium"
      value={name}
      onChange={(e) => setName(e.target.value)}
      error={!!nameError}
      helperText={nameError}
      sx={{
        marginBottom: 3,marginTop:'10px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
        
        },
        '& .MuiInputLabel-root': {
          fontWeight: 500,
          fontSize: '1rem',
        },
      }}
    />
    <TextField
      label="Description"
      variant="outlined"
      fullWidth
      size="medium"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      error={!!descriptionError}
      helperText={descriptionError}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
        },
        '& .MuiInputLabel-root': {
          fontWeight: 500,
          fontSize: '1rem',
        },
      }}
    />
  </DialogContent>
  <DialogActions
    sx={{
      justifyContent: 'center',
      padding: '16px',
      background: '#f9f9f9',
      borderBottomLeftRadius: '16px',
      borderBottomRightRadius: '16px',
    }}
  >
    <Button
      onClick={() => setEditDialogOpen(false)}
      variant="outlined"
      size="large"
      sx={{
        borderRadius: '12px',
        padding: '8px 24px',
        fontSize: '1rem',
        textTransform: 'none',
        borderColor: '#d32f2f',
        color: '#d32f2f',
        '&:hover': {
          background: '#ffd2d2',
        },
      }}
    >
      Cancel
    </Button>
    <Button
      onClick={saveEdit}
      variant="contained"
      size="large"
      sx={{
        borderRadius: '12px',
        padding: '8px 24px',
        fontSize: '1rem',
        textTransform: 'none',
        background: 'linear-gradient(135deg, #21cbf3, #2196f3)',
        color: 'white',
        '&:hover': {
          background: 'linear-gradient(135deg, #1a78c2, #1976d2)',
        },
      }}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

    </Card>
  );
};

export default VehicleType;
