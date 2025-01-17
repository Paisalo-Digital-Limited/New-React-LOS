import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, Switch
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Swal from "sweetalert2";
import { createFuelType, getFuelTypeDetails, updateFuelType, deleteFuelType } from "../../../api/apiVheicle";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import EditIcon from '@mui/icons-material/Edit';
const FuelType = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFuelType, setEditFuelType] = useState(null);

  const fetchFuelTypes = async () => {
    setLoading(true);
    try {
      const response = await getFuelTypeDetails();
      if (response.statuscode === 200) {
        setFuelTypes(response.data);
      } else {
        Swal.fire("Error", response.message || "Failed to fetch data.", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "An error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFuelTypes();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim()) {
      Swal.fire("Warning", "Both fields are required!", "warning");
      return;
    }

    setLoading(true);

    try {
      const response = await createFuelType({ Name: name, Description: description });
      if (response.statuscode === 200) {
        Swal.fire("Success", response.message, "success");
        fetchFuelTypes(); // Refresh the table data
        setName("");
        setDescription("");
      } else if (response.StatusCode === 203) {
        Swal.fire("Info", response.message, "info");
      } else {
        Swal.fire("Error", response.message || "Failed to create fuel type.", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "An error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (fuelType) => {
    setEditFuelType(fuelType);
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    if (!editFuelType?.name.trim() || !editFuelType?.description.trim()) {
      Swal.fire("Warning", "Both fields are required!", "warning");
      return;
    }

    setLoading(true);

    try {
      const response = await updateFuelType({
        Id: editFuelType.id,
        Name: editFuelType.name,
        Description: editFuelType.description,
      });
      if (response.statuscode === 200) {
        Swal.fire("Success", response.message, "success");
        fetchFuelTypes(); // Refresh the table data
        setEditDialogOpen(false);
      } else {
        Swal.fire("Error", response.message || "Failed to update fuel type.", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "An error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleFuelType = async (rowData) => {
    const updatedStatus = !rowData.isActive;
  
    // Optimistically update the UI
    setFuelTypes((prev) =>
      prev.map((fuel) =>
        fuel.id === rowData.id ? { ...fuel, isActive: updatedStatus } : fuel
      )
    );
  
    try {
      const response = await deleteFuelType(rowData.id); // Assuming delete API is used to toggle
      if (response.statuscode === 200) {
        Swal.fire(
          "Success",
          `Fuel type has been ${updatedStatus ? "activated" : "deactivated"}`,
          "success"
        );
      } else {
        throw new Error(response.message || "Failed to toggle status.");
      }
    } catch (error) {
      // Rollback UI if API fails
      setFuelTypes((prev) =>
        prev.map((fuel) =>
          fuel.id === rowData.id ? { ...fuel, isActive: !updatedStatus } : fuel
        )
      );
      Swal.fire("Error", error.message || "An error occurred.", "error");
    }
  };
  
  const actionTemplate = (rowData) => (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <EditIcon
        onClick={() => handleEdit(rowData)}
        sx={{
          fontSize: "24px",
          color: "#1976d2",
          cursor: "pointer",
          "&:hover": { color: "#115293" },
        }}
      />
      <Switch
        checked={rowData.isActive}
        onChange={() => toggleFuelType(rowData)}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "#4caf50",
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#81c784",
          },
          "& .MuiSwitch-track": {
            backgroundColor: rowData.isActive ? "#81c784" : "#ef9a9a",
          },
        }}
      />
    </div>
  );
  

  return (
    <>
           <Typography variant="h5" sx={{ marginBottom: '15px', fontWeight: 'bold', color: 'black' }}>
           Fuel Master
           </Typography>

        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: "5px" }}>
          <Grid item xs={12} md={2} sm={3}>
            <TextField
              label="Fuel Name"
              variant="outlined"
              fullWidth
              size="medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={2} sm={4}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              size="medium"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={2} container alignItems="center">
            <Button
              variant="contained"
               size="large"
               type="button"
               sx={{ bgcolor:'green',  borderRadius:'0px', color:'white',fontWeight:'bold'}}
              startIcon={<CheckBoxIcon />}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Submit"}
            </Button>
          </Grid>
        </Grid>

        <Box className="card" sx={{ marginTop: "50px" }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <DataTable
              value={fuelTypes}
              paginator
              paginatorPosition="bottom"
              paginatorTemplate="RowsPerPageDropdown CurrentPageReport PrevPageLink PageLinks NextPageLink"
              rows={5}
              rowsPerPageOptions={[5, 10, 20]}
              responsiveLayout="scroll"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              style={{ textAlign: "left" }}
            >
              <Column
                header="Sr. No."
                body={(rowData, { rowIndex }) => rowIndex + 1}
                style={{ width: "100px" }}
                headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }}/>
              <Column field="id" header="ID"
                headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }} />
              <Column field="name" header="Fuel Name" 
                headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }}/>
              <Column field="description" header="Description" 
                headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }}/>
              <Column header="Actions" body={actionTemplate} 
                headerStyle={{ backgroundColor: '#ff4c4c', color: 'white' }}/>
            </DataTable>
          )}
        </Box>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '16px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          },
        }}
        >
        <DialogTitle sx={{
      textAlign: 'center',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #2196f3, #21cbf3)',
      color: 'white',
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px',
      padding: '16px 24px',
         marginBottom:'30px'
    }}>Edit Fuel Type</DialogTitle>
        <DialogContent>
          <TextField
            label="Fuel Name"
            variant="outlined"
            fullWidth
            size="medium"
            value={editFuelType?.name || ""}
            onChange={(e) =>
              setEditFuelType((prev) => ({ ...prev, name: e.target.value }))
            }
            sx={{ marginBottom: "15px",marginTop:'10px', }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            size="medium"
            value={editFuelType?.description || ""}
            onChange={(e) =>
              setEditFuelType((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}
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
            >Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" 
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
    </>
  );
};

export default FuelType;
