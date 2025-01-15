import React, { useState } from "react";
import { TextField, Grid, Button, Card, Typography, Box, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import Swal from "sweetalert2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { insertBranchMaster } from "../../api/apiBranchMaster";
import BranchMasterTable from "../../components/BranchMaster/GetBranchMaster";
import AddIcon from '@mui/icons-material/Add';
const AddBranchMaster = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateFields = () => {
    const newErrors = {};
    fields.forEach((field) => {
      const fieldName = field.replace(/\s+/g, "_").toLowerCase();
      if (!formData[fieldName]) {
        newErrors[fieldName] = `${field} is required`;
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      ...formData,
      dob: new Date(formData.dob).toISOString(),
      creation_Date: new Date().toISOString(),
    };

    setLoading(true);

    try {
      const response = await insertBranchMaster(payload);
      const { statuscode, message } = response;
      if (statuscode === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: message || "Branch Master inserted successfully!",
        });
        setFormData({}); // Clear form fields
        setOpenDialog(false); // Close dialog
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message || "Failed to insert Branch Master",
        });
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    "Code",
    "Name",
    "Initials",
    "Guarantor Name",
    "Office Address 1",
    "Office Address 2",
    "Office Address 3",
    "Office City",
    "Office Mobile 1",
    "Office Mobile 2",
    "Residential Address 1",
    "Residential Address 2",
    "Residential Address 3",
    "Creator",
    "Bank Branch",
    "Recovery Auth*",
    "Residential City",
    "Registered Phone 1",
    "Registered Phone 2",
    "Registered Phone 3",
    "Registered Mobile 1",
    "Registered Mobile 2",
    "Permanent Address 1",
    "Permanent Address 2",
    "Permanent Address 3",
    "Permanent Mobile 1",
    "Permanent Mobile 2",
    "Permanent Fax",
    "DOB",
    "Age",
    "Location",
    "PAN Number",
    "Bank Account No",
    "Bank Name",
    "Other Case",
    "Remarks",
  ];

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "7px",
        mb: "25px",
        padding: { xs: "18px", sm: "20px", lg: "25px" },
      }}
      className="rmui-card"
    >
      <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", marginBottom: "16px" }}>
      <Button
  variant="contained"
  onClick={() => setOpenDialog(true)}
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#0ea5e9',
    color: '#ffffff',
    fontWeight: 700,
    fontSize:'1.5rem',
    padding: '10px 26px',
    borderRadius: '12px', 
    textTransform: 'none',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: '#0284c7',
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
    },
    '&:active': {
      backgroundColor: '#0369a1', 
      boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
    },
  }}
>
  <AddIcon sx={{ fontSize: '20px' }} /> 
  Add
</Button>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle  sx={{background:'#fff', color:'#000', borderBottom:'1px solid #666', lineHeight:'0.6', padding:'0px 22px'}}>
          <h2>Add Branch Master</h2></DialogTitle>
        <DialogContent sx={{background:'#fff'}}>
          <form onSubmit={handleSubmit} >
            <Grid container spacing={2} sx={{marginTop:'2px'}}>
              {fields.map((field, index) => {
                const fieldName = field.replace(/\s+/g, "_").toLowerCase();
                return (
                  <Grid item xs={12} sm={12} md={4} key={index}>
                    <TextField
                      fullWidth
                      size="small"
                      label={field}
                      name={fieldName}
                      value={formData[fieldName] || ""}
                      onChange={handleChange}
                      variant="outlined"
                      error={!!errors[fieldName]}
                      helperText={errors[fieldName] || ""}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions sx={{background:'#fff'}}>
          <Button onClick={() => setOpenDialog(false)} variant="outlined" sx={{ marginRight: "8px", borderRadius:'6px',
              fontSize:'1rem',  backgroundColor:'#b3b3b3', color:'#000'}}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            sx={{
              borderRadius:'6px',
              fontSize:'1rem',
              backgroundColor: loading ? "#b3b3b3" : "#28a745",
              "&:hover": {
                backgroundColor: loading ? "#b3b3b3" : "#218838",
              },
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ marginTop: "30px" }}>
        <BranchMasterTable />
      </Box>
    </Card>
  );
};

export default AddBranchMaster;
