import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog, TextField, Button, IconButton, Grid, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import styles from './Datatable.module.css';
import axios from "axios";

const BranchMasterTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

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

  useEffect(() => {
    fetchBranchMasterData();
  }, []);

  const fetchBranchMasterData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5238/api/Masters/GetBranchMasterDetails"
      );

      if (response.data.statuscode === 200) {
        setTableData(response.data.data);
      } else {
        console.error(response.data.message);
        setTableData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (rowData) => {
    setSelectedRow(rowData);
    setFormValues(rowData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
    setFormValues({});
    setErrors({});
  };

  const validateField = (field, value) => {
    let error = "";
    if (!value) {
      error = `${field} is required`;
    } else if (field.includes("Mobile") && !/^\d{10}$/.test(value)) {
      error = "Mobile number must be 10 digits";
    } else if (field.includes("Email") && !/^\S+@\S+\.\S+$/.test(value)) {
      error = "Invalid email format";
    }
    return error;
  };

  const handleInputChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value),
    }));
  };

  const handleSave = async () => {
    const newErrors = {};
  
    // Validate each field
    fields.forEach((field) => {
      const error = validateField(field, formValues[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
  
    // Check if there are validation errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    // Map formValues to the API payload structure
    const payload = {
      code: formValues["Code"],
      initials: formValues["Initials"],
      name: formValues["Name"],
      gurName: formValues["Guarantor Name"],
      offAdd1: formValues["Office Address 1"],
      offAdd2: formValues["Office Address 2"],
      offAdd3: formValues["Office Address 3"],
      offCity: formValues["Office City"],
      offMob1: formValues["Office Mobile 1"],
      offMob2: formValues["Office Mobile 2"],
      resAdd1: formValues["Residential Address 1"],
      resAdd2: formValues["Residential Address 2"],
      resAdd3: formValues["Residential Address 3"],
      resCity: formValues["Residential City"],
      creator: formValues["Creator"],
      bankBranch: formValues["Bank Branch"],
      recoveryAuth: formValues["Recovery Auth*"],
      resPh1: formValues["Registered Phone 1"],
      resPh2: formValues["Registered Phone 2"],
      resPh3: formValues["Registered Phone 3"],
      resMob1: formValues["Registered Mobile 1"],
      resMob2: formValues["Registered Mobile 2"],
      perAdd1: formValues["Permanent Address 1"],
      perAdd2: formValues["Permanent Address 2"],
      perAdd3: formValues["Permanent Address 3"],
      perMob1: formValues["Permanent Mobile 1"],
      perMob2: formValues["Permanent Mobile 2"],
      perFax: formValues["Permanent Fax"],
      dob: formValues["DOB"], 
      age: formValues["Age"],
      location: formValues["Location"],
      panNo: formValues["PAN Number"],
      bankAcNo: formValues["Bank Account No"],
      bankName: formValues["Bank Name"],
      otherCase: formValues["Other Case"],
      remarks: formValues["Remarks"],
      relation: formValues["Relation"], 
      userID: "someUserID", 
      creation_Date: new Date().toISOString(), 
      last_Mod_UserID: "someLastModUserID", 
    };
  
    try {
      const response = await axios.post(
        "https://apiuat.paisalo.in:4015/admin/api/Masters/UpdateBranchMaster",
        payload
      );
  
      if (response.data.statuscode === 200) {
        console.log("Update successful:", response.data.message);
        fetchBranchMasterData(); // Refresh data in the table
        setOpenDialog(false); // Close the dialog
      } else {
        console.error("Update failed:", response.data.message);
        alert(`Update failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error updating record:", error);
      alert("Error updating record. Please try again later.");
    }
  };
  
  

  return (
    <Box>


<DataTable
  value={tableData}
  paginator
  paginatorPosition="bottom"
  paginatorTemplate="RowsPerPageDropdown CurrentPageReport PrevPageLink PageLinks NextPageLink"
  rows={5}
  rowsPerPageOptions={[5, 10, 20]}
  responsiveLayout="scroll"
  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
  style={{ textAlign: "left" }}
  loading={loading}
>
  {/* Serial Number */}
  <Column
    header="S.No."
    body={(rowData, { rowIndex }) => rowIndex + 1}
    style={{ width: "100px" }}
  />

  {/* Specific Columns */}
  <Column field="Code" header="Code" />
  <Column field="Name" header="Name" />
  <Column field="CreatorID" header="CreatorID" />
  <Column field="Location" header="Location" />
  <Column
    field="OffAdd1"
    header="Address"
    body={(rowData) =>
      `${rowData.OffAdd1 || ""} ${rowData.OffAdd2 || ""} ${rowData.OffAdd3 || ""}`
    }
  />
  <Column field="BankAcNo" header="Bank Account No" />
  <Column field="BankName" header="Bank Name" />
  <Column field="Code" header="Branch Code" /> {/* Assuming Code is the Branch Code */}
  <Column
    field="OffMob1"
    header="Mobile"
    body={(rowData) => `${rowData.OffMob1 || ""}, ${rowData.OffMob2 || ""}`}
  />
  <Column field="Creation_Date" header="Creation Date" />
  <Column field="RecoveryAuth" header="Recovery Executive" />

  {/* Actions */}
  <Column
    header="Actions"
    body={(rowData) => (
      <IconButton
        type="button"
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleEdit(rowData);
        }}
        sx={{
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          color: "#fff",
          borderRadius: "12px",
        }}
      >
        <EditIcon sx={{ fontSize: "1.2rem", color: "#fff" }} />
      </IconButton>
    )}
  />
</DataTable>



      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: "16px",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box
          sx={{
            padding: "32px",
            backgroundColor: "#ffff",
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "12px",
              marginBottom: "24px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "1.5rem",
                color: "#1e293b",
                fontWeight: "700",
              }}
            >
              Edit Record
            </h2>
          </Box>

          <Box
            sx={{
              maxHeight: "550px",
              overflowY: "auto",
              paddingRight: "8px",
              "&::-webkit-scrollbar": {
                width: "3px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "red",
                borderRadius: "15px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Grid container spacing={3} sx={{ marginTop: "1px" }}>
              {fields.map((field, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <TextField
                    fullWidth
                    size="small"
                    label={field}
                    variant="outlined"
                    value={formValues[field] || ""}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    error={!!errors[field]}
                    helperText={errors[field] || ""}
                    InputLabelProps={{
                      style: { color: "#64748b", fontWeight: 500 },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box
            sx={{
              marginTop: "32px",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              borderTop: "1px solid #e5e7eb",
              paddingTop: "16px",
              gap: "20px",
            }}
          >
            <Button
              onClick={handleCloseDialog}
              sx={{
                backgroundColor: "#f3f4f6",
                color: "#4b5563",
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#e5e7eb",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#1d4ed8",
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default BranchMasterTable;
