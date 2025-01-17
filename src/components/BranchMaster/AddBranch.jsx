import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Button,
  Card,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import { insertBranchMaster } from "../../api/apiBranchMaster";
import BranchMasterTable from "../../components/BranchMaster/GetBranchMaster";
import { fetchCreatorsApi } from "../../api/apiCreator";
import AddIcon from "@mui/icons-material/Add";
const AddBranchMaster = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingCreators, setLoadingCreators] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [creators, setCreators] = useState([]);

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
      Id: formData.id || 0,
      CreatorID: formData.creator ? parseInt(formData.creator, 10) : null, 
      Code: formData.code || "",
      Initials: formData.initials || "",
      Name: formData.name || "",
      GurName: formData.guarantor_name || "",
      OffAdd1: formData.office_address_1 || "",
      OffAdd2: formData.office_address_2 || "",
      OffAdd3: formData.office_address_3 || "",
      OffCity: formData.office_city || "",
      OffMob1: formData.office_mobile_1 || "",
      OffMob2: formData.office_mobile_2 || "",
      ResAdd1: formData.residential_address_1 || "",
      ResAdd2: formData.residential_address_2 || "",
      ResAdd3: formData.residential_address_3 || "",
      RecoveryAuth: formData.recovery_auth || "",
      ResCity: formData.residential_city || "",
      ResPh1: formData.registered_phone_1 || "",
      ResPh2: formData.registered_phone_2 || "",
      ResPh3: formData.registered_phone_3 || "",
      ResMob1: formData.registered_mobile_1 || "",
      ResMob2: formData.registered_mobile_2 || "",
      PerAdd1: formData.permanent_address_1 || "",
      PerAdd2: formData.permanent_address_2 || "",
      PerAdd3: formData.permanent_address_3 || "",
      PerMob1: formData.permanent_mobile_1 || "",
      PerMob2: formData.permanent_mobile_2 || "",
      PerFax: formData.permanent_fax || "",
      DOB: formData.dob ? new Date(formData.dob).toISOString() : null,
      Age: formData.age || null,
      Location: formData.location || "",
      PANNo: formData.pan_number || "",
      BankAcNo: formData.bank_account_no || "",
      BankName: formData.bank_name || "",
      OtherCase: formData.other_case || "",
      Remarks: formData.remarks || "",
      Relation: formData.relation || "",
      UserID: formData.user_id || "",
      Creation_Date: new Date().toISOString(),
      Last_Mod_UserID: formData.last_mod_user_id || "",
      RecoveryExec: formData.recovery_exec || "",
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
        setFormData({});
        setOpenDialog(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message || "Failed to insert Branch Master",
        });
      }
    } catch (error) {
      console.error("Error during API call:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred. Please try again.",
      });
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
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#0ea5e9",
            color: "#ffffff",
            fontWeight: 700,
          }}
        >
          <AddIcon />
          Add
        </Button>
      </Box>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: "#fff",
            color: "#000",
            borderBottom: "1px solid #666",
            lineHeight: "1",
            padding: "20px 22px",
          }}
        >
          {" "}
          Add Branch Master
        </DialogTitle>
        <DialogContent sx={{ background: "#fff" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ marginTop: "20px" }}>
              {fields.map((field, index) => {
                const fieldName = field.replace(/\s+/g, "_").toLowerCase();
                return (
                  <Grid item xs={12} sm={3} key={index}>
                    {field === "Creator" ? (
                      <FormControl
                        fullWidth
                        size="small"
                        error={!!errors.creator}
                        sx={{ background: "#fff", color: "#000" }}
                      >
                        <InputLabel id="creator-label">Creator</InputLabel>
                        <Select
                          labelId="creator-label"
                          name="creator"
                          label="Creator"
                          value={formData.creator || ""}
                          onChange={(e) =>
                            handleChange({
                              target: {
                                name: "creator",
                                value: String(e.target.value),
                              },
                            })
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
                          {loadingCreators ? (
                            <MenuItem disabled>
                              <CircularProgress size={20} />
                              Loading...
                            </MenuItem>
                          ) : error ? (
                            <MenuItem disabled>{error}</MenuItem>
                          ) : creators.length > 0 ? (
                            creators.map((creator) => (
                              <MenuItem
                                key={creator.creatorID}
                                value={String(creator.creatorID)}
                                sx={{ background: "#fff", color: "#000" }}
                              >
                                {creator.creator}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>No creators found</MenuItem>
                          )}
                        </Select>
                        {errors.creator && (
                          <Box sx={{ color: "red", fontSize: "0.75rem" }}>
                            {errors.creator}
                          </Box>
                        )}
                      </FormControl>
                    ) : (
                      <TextField
                        fullWidth
                        size="small"
                        label={field}
                        name={fieldName}
                        value={formData[fieldName] || ""}
                        onChange={handleChange}
                        error={!!errors[fieldName]}
                        helperText={errors[fieldName] || ""}
                      />
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions sx={{ background: "#fff" }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            sx={{
              marginRight: "8px",
              borderRadius: "6px",
              fontSize: "1rem",
              backgroundColor: "#b3b3b3",
              color: "#000",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            sx={{
              borderRadius: "6px",
              fontSize: "1rem",
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
      <BranchMasterTable />
    </Card>
  );
};

export default AddBranchMaster;
