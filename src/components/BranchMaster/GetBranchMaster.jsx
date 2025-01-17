import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  Dialog,
  TextField,
  Button,
  Grid,
  Box,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import {
  fetchBranchMasterDetails,
  toggleBranchStatus,
} from "../../api/apiBranchMaster";
import { fetchCreatorsApi } from "../../api/apiCreator";
import { fetchBranchMasterById, updateBranchMaster  } from "../../api/apiBranchMaster"; 

const BranchMasterTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loadingCreators, setLoadingCreators] = useState(false);
  const [creators, setCreators] = useState([]);
  const [error, setError] = useState(null);

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
    loadBranchMasterData();
    fetchCreators();
  }, []);

const handleEdit = async (rowData) => {
  if (!rowData.Id) {
    console.error("Id is missing in rowData");
    alert("Cannot edit: Row data is missing Id");
    return;
  }
  try {
    const branchData = await fetchBranchMasterById(rowData.Id); 
    const matchedCreator = creators.find(
      (creator) => creator.creatorID === branchData.creatorID
    );
    const mappedData = {
      Code: branchData.code,
      Name: branchData.name,
      Initials: branchData.initials,
      "Guarantor Name": branchData.gurName,
      "Office Address 1": branchData.offAdd1,
      "Office Address 2": branchData.offAdd2,
      "Office Address 3": branchData.offAdd3,
      "Office City": branchData.offCity,
      "Office Mobile 1": branchData.offMob1,
      "Office Mobile 2": branchData.offMob2,
      "Residential Address 1": branchData.resAdd1,
      "Residential Address 2": branchData.resAdd2,
      "Residential Address 3": branchData.resAdd3,
      CreatorID: branchData.creatorID,
      Creator: matchedCreator ? matchedCreator.creator : "Unknown Creator", 
      "Bank Branch": branchData.bankBranch,
      "Recovery Auth*": branchData.recoveryAuth,
      "Residential City": branchData.resCity,
      "Registered Phone 1": branchData.resPh1,
      "Registered Phone 2": branchData.resPh2,
      "Registered Phone 3": branchData.resPh3,
      "Registered Mobile 1": branchData.resMob1,
      "Registered Mobile 2": branchData.resMob2,
      "Permanent Address 1": branchData.perAdd1,
      "Permanent Address 2": branchData.perAdd2,
      "Permanent Address 3": branchData.perAdd3,
      "Permanent Mobile 1": branchData.perMob1,
      "Permanent Mobile 2": branchData.perMob2,
      "Permanent Fax": branchData.perFax,
      DOB: branchData.dob,
      Age: branchData.age,
      Location: branchData.location,
      "PAN Number": branchData.panNo,
      "Bank Account No": branchData.bankAcNo,
      "Bank Name": branchData.bankName,
      "Other Case": branchData.otherCase,
      Remarks: branchData.remarks,
    };

    setSelectedRow(rowData);
    setFormValues(mappedData);
    setOpenDialog(true);
  } catch (error) {
    console.error("Error in handleEdit:", error.message);
    alert(error.message || "Failed to fetch branch details.");
  }
};

  // const handleEdit = async (rowData) => {
  //   console.log("Row Data with Id:", rowData); // Debugging
  //   if (!rowData.Id) {
  //     console.error("Id is missing in rowData");
  //     alert("Cannot edit: Row data is missing Id");
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5238/api/Masters/GetBranchMasterById?Id=${rowData.Id}`
  //     );

  //     if (response.data.statuscode === 200) {
  //       const branchData = response.data.data[0];

  //       // Find the creator name from the list of creators
  //       const matchedCreator = creators.find(
  //         (creator) => creator.creatorID === branchData.creatorID
  //       );

  //       const mappedData = {
  //         Code: branchData.code,
  //         Name: branchData.name,
  //         Initials: branchData.initials,
  //         "Guarantor Name": branchData.gurName,
  //         "Office Address 1": branchData.offAdd1,
  //         "Office Address 2": branchData.offAdd2,
  //         "Office Address 3": branchData.offAdd3,
  //         "Office City": branchData.offCity,
  //         "Office Mobile 1": branchData.offMob1,
  //         "Office Mobile 2": branchData.offMob2,
  //         "Residential Address 1": branchData.resAdd1,
  //         "Residential Address 2": branchData.resAdd2,
  //         "Residential Address 3": branchData.resAdd3,
  //         CreatorID: branchData.creatorID,
  //         Creator: matchedCreator ? matchedCreator.creator : "Unknown Creator", // Fallback for null creator
  //         "Bank Branch": branchData.bankBranch,
  //         "Recovery Auth*": branchData.recoveryAuth,
  //         "Residential City": branchData.resCity,
  //         "Registered Phone 1": branchData.resPh1,
  //         "Registered Phone 2": branchData.resPh2,
  //         "Registered Phone 3": branchData.resPh3,
  //         "Registered Mobile 1": branchData.resMob1,
  //         "Registered Mobile 2": branchData.resMob2,
  //         "Permanent Address 1": branchData.perAdd1,
  //         "Permanent Address 2": branchData.perAdd2,
  //         "Permanent Address 3": branchData.perAdd3,
  //         "Permanent Mobile 1": branchData.perMob1,
  //         "Permanent Mobile 2": branchData.perMob2,
  //         "Permanent Fax": branchData.perFax,
  //         DOB: branchData.dob,
  //         Age: branchData.age,
  //         Location: branchData.location,
  //         "PAN Number": branchData.panNo,
  //         "Bank Account No": branchData.bankAcNo,
  //         "Bank Name": branchData.bankName,
  //         "Other Case": branchData.otherCase,
  //         Remarks: branchData.remarks,
  //       };

  //       setSelectedRow(rowData);
  //       setFormValues(mappedData);
  //       setOpenDialog(true);
  //     } else {
  //     }
  //   } catch (error) {}
  // };
  useEffect(() => {
    loadBranchMasterData();
  }, []);

  // const loadBranchMasterData = async () => {
  //   setLoading(true);
  //   try {
  //     const data = await fetchBranchMasterDetails();
  //     setTableData(data);
  //   } catch (error) {
  //     console.error("Error loading branch master data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const loadBranchMasterData = async () => {
    setLoading(true);
    try {
      const data = await fetchBranchMasterDetails();
  
      // Ensure all rows have isActive = 1
      const updatedData = data.map((row) => ({
        ...row,
        isActive: row.isActive ?? 1, // Default to 1 if isActive is missing
      }));
  
      setTableData(updatedData);
    } catch (error) {
      console.error("Error loading branch master data:", error);
    } finally {
      setLoading(false);
    }
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
      [field]: "",
    }));
  };

// const handleSave = async () => {
//   if (!selectedRow?.Id) {
//     alert("No row selected for update.");
//     return;
//   }

//   const newErrors = {};
//   fields.forEach((field) => {
//     const error = validateField(field, formValues[field]);
//     if (error) {
//       newErrors[field] = error;
//     }
//   });

//   if (Object.keys(newErrors).length > 0) {
//     setErrors(newErrors);
//     return;
//   }
//   const payload = {
//     Id: selectedRow.Id || null,
//  CreatorID: formValues["CreatorID"] || null,
//  Code: formValues["Code"] || null,
//  Name: formValues["Name"] || null,
//  GurName: formValues["Guarantor Name"] || null,
//  OffAdd1: formValues["Office Address 1"] || null,
//  OffAdd2: formValues["Office Address 2"] || null,
//  OffAdd3: formValues["Office Address 3"] || null,
//  OffCity: formValues["Office City"] || null,
//  OffMob1: formValues["Office Mobile 1"] || null,
//  OffMob2: formValues["Office Mobile 2"] || null,
//  ResAdd1: formValues["Residential Address 1"] || null,
//  ResAdd2: formValues["Residential Address 2"] || null,
//  ResAdd3: formValues["Residential Address 3"] || null,
//  BankBranch: formValues["Bank Branch"] || null,
//  RecoveryAuth: formValues["Recovery Auth*"] || null,
//  ResCity: formValues["Residential City"] || null,
//  ResMob1: formValues["Registered Mobile 1"] || null,
//  ResMob2: formValues["Registered Mobile 2"] || null,
//  ResPh1: formValues["Registered Phone 1"] || null,
//  ResPh2: formValues["Registered Phone 2"] || null,
//  ResPh3: formValues["Registered Phone 3"] || null,
//  PerMob1: formValues["Permanent Mobile 1"] || null,
//  PerMob2: formValues["Permanent Mobile 2"] || null,
//  PerFax: formValues["Permanent Fax"] || null,
//  DOB: formValues["DOB"] || null,
//  Age: formValues["Age"] || null,
//  Location: formValues["Location"] || null,
//  PANNo: formValues["PAN Number"] || null,
//  BankAcNo: formValues["Bank Account No"] || null,
//  BankName: formValues["Bank Name"] || null,
//  OtherCase: formValues["Other Case"] || null,
//  Remarks: formValues["Remarks"] || null,
//   };

//   console.log("Payload sent to API:", payload);

//   try {
//     const response = await updateBranchMaster(payload);
//     console.log("Update successful:", response.message);
//     await loadBranchMasterData(); 
//     setOpenDialog(false); 
//     setFormValues({}); 
//     setErrors({}); 
//   } catch (error) {
//     console.error("Error in handleSave:", error.message);
//     alert(error.message || "Failed to update branch details.");
//   }
// };


const handleSave = async () => {
  if (!selectedRow?.Id) {
    alert("No row selected for update.");
    return;
  }
  const newErrors = {};
  fields.forEach((field) => {
    const error = validateField(field, formValues[field]);
    if (error) {
      newErrors[field] = error;
    }
  });
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  const payload = {
    Id: selectedRow.Id || null,
    CreatorID: formValues["CreatorID"] || null,
    Code: formValues["Code"] || null,
    Name: formValues["Name"] || null,
    GurName: formValues["Guarantor Name"] || null,
    OffAdd1: formValues["Office Address 1"] || null,
    OffAdd2: formValues["Office Address 2"] || null,
    OffAdd3: formValues["Office Address 3"] || null,
    OffCity: formValues["Office City"] || null,
    OffMob1: formValues["Office Mobile 1"] || null,
    OffMob2: formValues["Office Mobile 2"] || null,
    ResAdd1: formValues["Residential Address 1"] || null,
    ResAdd2: formValues["Residential Address 2"] || null,
    ResAdd3: formValues["Residential Address 3"] || null,
    BankBranch: formValues["Bank Branch"] || null,
    RecoveryAuth: formValues["Recovery Auth*"] || null,
    ResCity: formValues["Residential City"] || null,
    ResMob1: formValues["Registered Mobile 1"] || null,
    ResMob2: formValues["Registered Mobile 2"] || null,
    ResPh1: formValues["Registered Phone 1"] || null,
    ResPh2: formValues["Registered Phone 2"] || null,
    ResPh3: formValues["Registered Phone 3"] || null,
    PerMob1: formValues["Permanent Mobile 1"] || null,
    PerMob2: formValues["Permanent Mobile 2"] || null,
    PerFax: formValues["Permanent Fax"] || null,
    DOB: formValues["DOB"] || null,
    Age: formValues["Age"] || null,
    Location: formValues["Location"] || null,
    PANNo: formValues["PAN Number"] || null,
    BankAcNo: formValues["Bank Account No"] || null,
    BankName: formValues["Bank Name"] || null,
    OtherCase: formValues["Other Case"] || null,
    Remarks: formValues["Remarks"] || null,
  };
  console.log("Payload sent to API:", payload);
  try {
    const response = await updateBranchMaster(payload);
    console.log("Update successful:", response.message);
    Swal.fire({
      title: "Success!",
      text: "Branch details updated successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });

    await loadBranchMasterData(); 
    setOpenDialog(false);
    setFormValues({});
    setErrors({});
  } catch (error) {
    console.error("Error in handleSave:", error.message);
    Swal.fire({
      title: "Error",
      text: error.message || "Failed to update branch details.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};
  const fetchCreators = async () => {
    setLoadingCreators(true);
    setError(null);
    try {
      const data = await fetchCreatorsApi();
      setCreators(data);
    } catch (err) {
      setError("Failed to fetch creators. Please try again.");
    } finally {
      setLoadingCreators(false);
    }
  };
  useEffect(() => {
    fetchCreators(); 
  }, []);

  const toggleIsActive = async (rowData) => {
    if (!rowData?.Id) {
      Swal.fire("Error", "Invalid record selected. Missing Id.", "error");
      return;
    }
  
    const updatedStatus = rowData.isActive === 1 ? 0 : 1;
    const updatedIsDeleted = updatedStatus === 0 ? 1 : 0; 
  
    // Optimistically update the UI
    setTableData((prevData) =>
      prevData.map((item) =>
        item.Id === rowData.Id
          ? { ...item, isActive: updatedStatus, isDeleted: updatedIsDeleted }
          : item
      )
    );
  
    const params = {
      IsActive: updatedStatus,
      IsDeleted: updatedIsDeleted,
      ModifiedBy: "currentUser",
    };
  
    try {
      const response = await toggleBranchStatus(rowData.Id, params);
      if (response.statuscode === 200) {
        Swal.fire(
          "Success",
          `Branch has been ${updatedStatus === 1 ? "activated" : "deactivated"}.`,
          "success"
        );
      } else {
        throw new Error(response.message || "Failed to toggle branch status.");
      }
    } catch (error) {
      // Rollback UI if API call fails
      setTableData((prevData) =>
        prevData.map((item) =>
          item.Id === rowData.Id
            ? { ...item, isActive: rowData.isActive, isDeleted: rowData.isDeleted }
            : item
        )
      );
      Swal.fire(
        "Error",
        error.message || "An error occurred while toggling the status.",
        "error"
      );
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
        <Column
          header="S.No."
          body={(rowData, { rowIndex }) => rowIndex + 1}
          style={{ width: "100px" }}
        />
        <Column field="Code" header="Code" />
        <Column field="Name" header="Name" />
        <Column field="CreatorID" header="CreatorID" />
        <Column field="Location" header="Location" />
        <Column
          field="OffAdd1"
          header="Address"
          body={(rowData) =>
            `${rowData.OffAdd1 || ""} ${rowData.OffAdd2 || ""} ${
              rowData.OffAdd3 || ""
            }`
          }
        />
        <Column field="BankAcNo" header="Bank Account No" />
        <Column field="BankName" header="Bank Name" />
        <Column field="BankBranch" header="Branch Code" />
        <Column
          field="OffMob1"
          header="Mobile"
          body={(rowData) =>
            `${rowData.OffMob1 || ""}, ${rowData.OffMob2 || ""}`
          }
        />
        <Column field="RecoveryAuth" header="Recovery Executive" />
        <Column
  header="Actions"
  body={(rowData) => (
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
        checked={rowData.isActive === 1}
        onChange={() => toggleIsActive(rowData)}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "#4caf50", // Green for active
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#81c784", // Green track for active
          },
          "& .MuiSwitch-switchBase": {
            color: rowData.isActive === 1 ? "#4caf50" : "#f44336", // Green for active, Red for inactive
          },
          "& .MuiSwitch-track": {
            backgroundColor: rowData.isActive === 1 ? "#81c784" : "#ef9a9a", // Green for active, Red for inactive
          },
        }}
      />
    </div>
  )}
/>

      </DataTable>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
      >
        <Box sx={{ padding: "32px", background: "#fff", color: "#000" }}>
          <h2>Edit Record</h2>
          <Grid container spacing={3}>
            {fields.map((field, index) => (
              <Grid item xs={12} sm={3} key={index}>
                {field === "Creator" ? (
                  <FormControl
                    fullWidth
                    size="small"
                    error={!!errors[field]}
                    sx={{ background: "#fff", color: "#000" }}
                  >
                    <InputLabel id="creator-label">Creator</InputLabel>
                    <Select
                      labelId="creator-label"
                      label="Creator"
                      value={formValues.CreatorID || ""}
                      onChange={(e) =>
                        handleInputChange("CreatorID", e.target.value)
                      }
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 300,
                            overflowY: "auto",
                          },
                        },
                      }}
                    >
                      {creators.map((creator) => (
                        <MenuItem
                          key={creator.creatorID}
                          value={creator.creatorID}
                          sx={{ background: "#fff", color: "#000" }}
                        >
                          {creator.creator}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors[field] && (
                      <Box sx={{ color: "red", fontSize: "0.75rem" }}>
                        {errors[field]}
                      </Box>
                    )}
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    label={field}
                    value={formValues[field] || ""}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    error={!!errors[field]}
                    helperText={errors[field] || ""}
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              marginTop: "32px",
              display: "flex",
              justifyContent: "end",
              gap: "20px",
            }}
          >
            <Button
              onClick={handleCloseDialog}
              variant="outlined"
              sx={{
                background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
                color: "#fff",
                borderRadius: "8px",
                fontWeight: "700",
                padding: "8px 50px",
                fontSize: "16px",
                "&:hover": {
                  background: "linear-gradient(135deg, #feb47b, #ff7e5f)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                color: "#fff",
                borderRadius: "8px",
                fontWeight: "700",
                padding: "8px 50px",
                fontSize: "16px",
                "&:hover": {
                  background: "linear-gradient(135deg, #00f2fe, #4facfe)",
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
