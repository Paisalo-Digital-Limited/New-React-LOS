import React, { useState } from "react";
import { TextField, Grid, Button, Card, Typography, Box } from "@mui/material";
import Swal from "sweetalert2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { insertBranchMaster } from "../../api/apiBranchMaster";
import BranchMasterTable from '../../components/BranchMaster/GetBranchMaster'
const AddBranchMaster = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
//api call
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
      <Typography variant="h5" gutterBottom>
        Branch Master
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {fields.map((field, index) => {
            const fieldName = field.replace(/\s+/g, "_").toLowerCase();
            return (
              <Grid item xs={12} sm={3} key={index}>
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

<Button
  type="submit"
  variant="contained"
  disabled={loading}
  sx={{
    marginTop: "20px",
    background: loading
      ? "linear-gradient(135deg, #b3b3b3 0%, #e0e0e0 100%)"
      : "linear-gradient(135deg, #28a745 0%, #218838 100%)",
    color: "#fff",
    fontWeight: 600,
    padding: "10px 20px",
    borderRadius: "12px",
    textTransform: "none",
    transition: "background 0.3s ease",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      background: "linear-gradient(135deg, #218838 0%, #28a745 100%)",
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.7,
    },
  }}
>
  {loading ? (
    <>
      <span
        className="spinner"
        style={{
          marginRight: "8px",
          border: "2px solid #fff",
          borderRadius: "50%",
          borderTop: "2px solid transparent",
          width: "16px",
          height: "16px",
          animation: "spin 1s linear infinite",
        }}
      ></span>
      Submitting...
    </>
  ) : (
    <>
      <CheckCircleIcon sx={{ marginRight: "8px", fontSize: "1.2rem" }} />
      Submit
    </>
  )}
</Button>


      </form>
<Box sx={{marginTop:'30px'}}>
<BranchMasterTable/>
</Box>
      
    </Card>



  );
};

export default AddBranchMaster;
