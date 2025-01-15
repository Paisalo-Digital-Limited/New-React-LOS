import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,  Switch,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import { createBrand, getBrandDetails, updateBrand, deleteBrand } from "../../../api/apiVheicle";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const BrandType = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editBrand, setEditBrand] = useState(null);

  const handleSubmit = async () => {
    let isValid = true;

    setNameError(false);
    setDescriptionError(false);

    if (!name.trim()) {
      setNameError(true);
      isValid = false;
    }
    if (!description.trim()) {
      setDescriptionError(true);
      isValid = false;
    }

    if (isValid) {
      setLoading(true);
      const brandData = { Name: name, Description: description };

      try {
        const response = await createBrand(brandData);
        if (response.statuscode === 200) {
          Swal.fire("Success", "Brand created successfully!", "success");
          fetchBrands();
          setName("");
          setDescription("");
        } else {
          Swal.fire("Error", response.message || "Failed to create brand.", "error");
        }
      } catch (error) {
        Swal.fire("Error", error.message || "An error occurred.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await getBrandDetails();
      if (response.statuscode === 200) {
        setBrands(response.data);
      } else {
        Swal.fire("Error", response.message || "Failed to fetch brand details.", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "An error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSave = async () => {
    if (!editBrand.name.trim() || !editBrand.description.trim()) {
      Swal.fire("Warning", "Both fields are required.", "warning");
      return;
    }

    try {
      const response = await updateBrand({
        Id: editBrand.id,
        Name: editBrand.name,
        Description: editBrand.description,
      });

      if (response.statuscode === 200) {
        Swal.fire("Success", "Brand updated successfully!", "success");
        fetchBrands();
        setEditDialogOpen(false);
      } else {
        Swal.fire("Error", response.message || "Failed to update brand.", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "An error occurred.", "error");
    }
  };

  const handleEdit = (rowData) => {
    setEditBrand(rowData);
    setEditDialogOpen(true);
  };

  const toggleStatus = async (rowData) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${rowData.isActive ? "deactivate" : "activate"} this brand?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteBrand(rowData.id);
          if (response.statuscode === 200) {
            Swal.fire(
              "Success",
              rowData.isActive
                ? "Brand deactivated successfully!"
                : "Brand activated successfully!",
              "success"
            );
            fetchBrands();
          } else {
            Swal.fire(
              "Error",
              response.message || "Failed to toggle status.",
              "error"
            );
          }
        } catch (error) {
          Swal.fire("Error", error.message || "An error occurred.", "error");
        }
      }
    });
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
        onChange={() => toggleStatus(rowData)}
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
     Brand Master
    </Typography>

        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: "5px" }}>
          <Grid item xs={12} md={2} sm={3}>
            <TextField
              label="Brand Name"
              variant="outlined"
              fullWidth
              size="medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              helperText={nameError && "Brand Name is required"}
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
              error={descriptionError}
              helperText={descriptionError && "Description is required"}
            />
          </Grid>

          <Grid item xs={12} md={2} container alignItems="center">
            <Button
              variant="contained"
              size="small"
              sx={{
                padding: "10px 12px",
                fontSize: "15px",
                background: "linear-gradient(135deg, #008000, #008000)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  background: "linear-gradient(135deg, #81c783, #4caf50)",
                  boxShadow: "0px 8px 15px rgba(76, 175, 80, 0.4)",
                  transform: "scale(1.05)",
                },
              }}
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
            <CircularProgress />
          ) : (
            <DataTable
              value={brands}
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
              />
              <Column field="id" header="ID" />
              <Column field="name" header="Brand Name" />
              <Column field="description" header="Description" />
              <Column header="Actions" body={actionTemplate} />
            </DataTable>
          )}
        </Box>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '16px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        },
      }}>
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
    }}> Edit Brand</DialogTitle>
        <DialogContent   sx={{
      padding: '24px',
      backgroundColor: '#ffff',
    }}>
          <TextField
            label="Brand Name"
            variant="outlined"
            fullWidth
            size="medium"
            value={editBrand?.name || ""}
            onChange={(e) =>
              setEditBrand((prev) => ({ ...prev, name: e.target.value }))
            }
            sx={{ marginBottom: "15px",marginTop:'10px', }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            size="medium"
            value={editBrand?.description || ""}
            onChange={(e) =>
              setEditBrand((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
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
                onClick={handleEditSave}
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
    </>
  );
}

export default BrandType;