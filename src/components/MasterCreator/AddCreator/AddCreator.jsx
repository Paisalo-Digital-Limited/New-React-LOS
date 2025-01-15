"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  Typography, 
} from "@mui/material";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  insertCreator,
  fetchCreators,
  fetchCreatorDetails,
  updateCreator,
} from "../../../api/apiCreatorMaster";
import Swal from "sweetalert2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DropdownField from "./Dropdown";

const AddCreator = () => {
  const [formData, setFormData] = useState({
    creator: "",
    description: "",
    tag: "",
    deF_BANK: "",
    deF_CASH: "",
    creatorType: "",
    creatorFor: "",
    addressEn: "",
    addressHi: "",
    phone: "",
    branch_email: "",
    credit_email: "",
    zoneName: "",
    stateCodeEn: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);

  const handleEdit = async (creatorId) => {
    setLoading(true);
    try {
      const data = await fetchCreatorDetails(creatorId);
      setEditData({
        ...data,
        creatorID: data.creatorID || creatorId,
      });
      setOpenEditDialog(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch creator details.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCreator = async () => {
    if (!editData || !editData.creatorID) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Missing Creator ID. Unable to update.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await updateCreator(editData);

      if (response.statuscode === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "✅ Creator updated successfully!",
        });

        setTableData((prevData) =>
          prevData.map((row) =>
            row.creatorID === editData.creatorID ? { ...row, ...editData } : row
          )
        );

        setOpenEditDialog(false);
        setEditData(null);
      } else {
        throw new Error(response.message || "Failed to update creator");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Failed to update creator.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleToggleTable = () => {
    if (!showTable) {
      loadCreators();
    }
    setShowTable(!showTable);
  };

  const handleDropdownChange = (field) => (event) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };
  const handleSubmit = async (e) => {
    console.log("Submit button clicked");
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await insertCreator(formData);

      if (response.statuscode === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "✅ Creator added successfully!",
        });

        setTableData((prevData) => [
          { id: response.data.creatorID || prevData.length + 1, ...formData },
          ...prevData,
        ]);

        setFormData({
          creator: "",
          description: "",
          tag: "",
          deF_BANK: "",
          deF_CASH: "",
          creatorType: "",
          creatorFor: "",
          addressEn: "",
          addressHi: "",
          phone: "",
          branch_email: "",
          credit_email: "",
          zoneName: "",
          stateCodeEn: "",
        });
        setFormErrors({});
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `❌ ${response.message}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "❌ Failed to submit data.",
      });
    } finally {
      setLoading(false);
    }
  };
  const loadCreators = async () => {
    setTableLoading(true);
    try {
      const response = await fetchCreators();
      if (response.statuscode === 200) {
        setTableData(
          response.data.map((item) => ({
            id: item.creatorID || Date.now(),
            creatorID: item.creatorID,
            creator: item.creator || item.Creator || "N/A",
            stateName: item.stateCodeEn || "N/A",
            zoneName: item.zoneName || "N/A",
            address:
              `${item.addressEn || ""}, ${item.addressHi || ""}`.trim() ||
              "N/A",
          }))
        );
      } else {
        Swal.fire({
          icon: "info",
          title: "No Data",
          text: response.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error Fetching Data",
        text: "❌ Failed to fetch data from server.",
      });
    } finally {
      setTableLoading(false);
    }
  };
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    let errors = {};

    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = `${key.replace(/_/g, " ")} is required.`;
      }
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.phone =
        "❌ Phone number must be exactly 10 digits and contain only numbers.";
    }

    if (formData.branch_email && !emailRegex.test(formData.branch_email)) {
      errors.branch_email = "❌ Branch Email is invalid.";
    }

    if (formData.credit_email && !emailRegex.test(formData.credit_email)) {
      errors.credit_email = "❌ Credit Email is invalid.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  useEffect(() => {
    loadCreators();
  }, []);
  const creatorTypeOptions = [
    { label: "Choose...", value: "" },
    { label: "HO", value: "HO" },
    { label: "BR", value: "BR" },
  ];

  const creatorForOptions = [
    { label: "Choose...", value: "" },
    { label: "ABF", value: "ABF" },
    { label: "BOTH", value: "BOTH" },
    { label: "MFI", value: "MFI" },
  ];

  const zoneNameOptions = [
    { label: "Choose...", value: "" },
    { label: "ZONE1", value: "ZONE1" },
    { label: "ZONE2", value: "ZONE2" },
    { label: "ZONE3", value: "ZONE3" },
    { label: "ZONE4", value: "ZONE4" },
    { label: "ZONE5", value: "ZONE5" },
    { label: "ZONE6", value: "ZONE6" },
  ];

  const stateCodeEnOptions = [
    { label: "Choose...", value: "" },
    { label: "DL", value: "DL" },
    { label: "MH", value: "MH" },
  ];

  useEffect(() => {
    loadCreators();
  }, []);

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "0px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: "20px", fontWeight: "bold" }}
        >
          Add Creator Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {[
              { label: "Creator*", name: "creator" },
              { label: "Description*", name: "description" },
              { label: "Tag*", name: "tag" },
              { label: "Def_Bank*", name: "deF_BANK" },
              { label: "Def_Cash*", name: "deF_CASH" },
              { label: "Address (English)*", name: "addressEn" },
              { label: "Address (Hindi)*", name: "addressHi" },
              { label: "Phone*", name: "phone" }, // Specify type for Phone
              { label: "Branch Email*", name: "branch_email" },
              { label: "Credit Email*", name: "credit_email" },
            ].map((field) => (
              <Grid key={field.name} item xs={12} md={3}>
                <TextField
                  label={field.label}
                  name={field.name}
                  type={field.type || "text"}
                  value={formData[field.name] || ""}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    if (name === "phone") {
                      if (value.length <= 10 && /^[0-9]*$/.test(value)) {
                        handleInputChange(e);
                      }
                    } else {
                      handleInputChange(e);
                    }
                  }}
                  error={Boolean(formErrors[field.name])}
                  helperText={formErrors[field.name]}
                  fullWidth
                  inputProps={field.name === "phone" ? { maxLength: 10 } : {}}
                />
              </Grid>
            ))}

            {[
              {
                label: "Creator Type*",
                name: "creatorType",
                options: [
                  { label: "HO", value: "HO" },
                  { label: "BR", value: "BR" },
                ],
              },
              {
                label: "Creator For*",
                name: "creatorFor",
                options: [
                  { label: "ABF", value: "ABF" },
                  { label: "BOTH", value: "BOTH" },
                  { label: "MFI", value: "MFI" },
                ],
              },
              {
                label: "Zone Name*",
                name: "zoneName",
                options: [
                  { label: "Zone1", value: "Zone1" },
                  { label: "Zone2", value: "Zone2" },
                  { label: "Zone3", value: "Zone3" },
                  { label: "Zone4", value: "Zone4" },
                  { label: "Zone5", value: "Zone5" },
                  { label: "Zone6", value: "Zone6" },
                ],
              },
              {
                label: "State*",
                name: "stateCodeEn",
                options: [
                  { label: "State1", value: "State1" },
                  { label: "State2", value: "State2" },
                ],
              },
            ].map((field) => (
              <Grid key={field.name} item xs={12} md={3}>
                <FormControl fullWidth error={Boolean(formErrors[field.name])}>
                  <InputLabel id={`${field.name}-label`}>
                    {field.label}
                  </InputLabel>
                  <Select
                    labelId={`${field.name}-label`}
                    id={`${field.name}-select`}
                    value={formData[field.name] || ""}
                    label={field.label}
                    onChange={handleDropdownChange(field.name)}
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: "#fafafa",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{formErrors[field.name]}</FormHelperText>
                </FormControl>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                ) : (
                  <SendIcon />
                )
              }
              sx={{
                background: loading
                  ? "linear-gradient(135deg, #b3c0c8, #90a4ae)"
                  : "linear-gradient(135deg, #388E3C, #4CAF50)",
                color: "white",
                borderRadius: "8px",
                boxShadow:
                  "0 10px 25px rgba(50, 50, 93, 0.1), 0 4px 6px rgba(0, 0, 0, 0.08)",
                textTransform: "uppercase",
                fontWeight: "bold",
                letterSpacing: "0.8px",
                padding: "12px 24px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  background: "linear-gradient(135deg, #388E3C, #4CAF50)",
                  boxShadow:
                    "0 15px 30px rgba(50, 50, 93, 0.2), 0 5px 10px rgba(0, 0, 0, 0.1)",
                },
                "&:disabled": {
                  background: "linear-gradient(135deg, #cfd8dc, #b0bec5)",
                  cursor: "not-allowed",
                  boxShadow: "none",
                },
              }}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>

            <Button
              variant="outlined"
              onClick={handleToggleTable}
              startIcon={showTable ? <VisibilityOffIcon /> : <VisibilityIcon />}
              sx={{
                background: showTable
                  ? "linear-gradient(135deg, #ff7e5f, #feb47b)"
                  : "linear-gradient(135deg, #56ccf2, #2f80ed)",
                color: "white",
                border: "2px solid transparent",
                borderRadius: "8px",
                fontWeight: "600",
                padding: "10px 24px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                transition: "all 0.4s ease",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  transform: "scale(1.05)",
                  border: "2px solid #ffffff",
                  background: showTable
                    ? "linear-gradient(135deg, #ff6a4e, #ff9640)"
                    : "linear-gradient(135deg, #4b9be9, #1e88e5)",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              {showTable ? "Hide Creator Details" : "View Creator Details"}
            </Button>
          </Box>
        </form>
      </Card>

      {showTable && (
        <Card
          sx={{
            boxShadow: "none",
            borderRadius: "0px",
            mb: "25px",
            padding: { xs: "18px", sm: "20px", lg: "25px" },
          }}
          className="rmui-card"
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: "20px", fontWeight: "bold" }}
          >
            Creator List
          </Typography>
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
            >
              <Column
                header="Sr. No."
                body={(rowData, { rowIndex }) => rowIndex + 1}
                style={{ width: "100px" }}
              />
              <Column field="creator" header="Creator" />
              <Column field="stateName" header="State Name" />
              <Column field="zoneName" header="Zone Name" />
              <Column field="address" header="Address" />
              <Column
                header="Actions"
                body={(rowData) => (
                  <IconButton
                    type="button"
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); 
                      handleEdit(rowData.id);
                    }}
                    sx={{
                      background:
                        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                      color: "#fff",
                      borderRadius: "12px",
                    }}
                  >
                    <EditIcon sx={{ fontSize: "1.2rem", color: "#fff" }} />
                  </IconButton>
                )}
              />
            </DataTable>
          </Box>
        </Card>
      )}

      <Box>
        <Dialog
          open={openEditDialog}
          onClose={handleCloseEditDialog}
          type="button"
          fullWidth
          maxWidth="md"
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "16px",
              background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <DialogTitle
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
              color: "#3f51b5",
              background: "linear-gradient(135deg, #e0f7fa, #b2ebf2)",
              borderRadius: "16px 16px 0 0",
            }}
          >
            ✍️ Edit Creator Details
          </DialogTitle>

          {/* Dialog Content */}
          <Box>
            <DialogContent
              sx={{
                padding: "24px",
                background: "#fff",
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                  {[
                    { label: "Creator*", name: "creator" },
                    { label: "Description*", name: "description" },
                    { label: "Tag*", name: "tag" },
                    { label: "Def_Bank*", name: "deF_BANK" },
                    { label: "Def_Cash*", name: "deF_CASH" },
                    { label: "Address (English)*", name: "addressEn" },
                    { label: "Address (Hindi)*", name: "addressHi" },
                    {
                      label: "Phone*",
                      name: "phone",
                      regex: /^\d{10}$/,
                      maxLength: 10,
                      type: "tel",
                    },
                    {
                      label: "Branch Email*",
                      name: "branch_email",
                      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    },
                    {
                      label: "Credit Email*",
                      name: "credit_email",
                      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    },
                  ].map((field) => (
                    <Grid key={field.name} item xs={12} md={6}>
                      <TextField
                        label={field.label}
                        name={field.name}
                        value={editData?.[field.name] || ""}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          if (
                            name === "phone" &&
                            field.regex &&
                            !/^\d{0,10}$/.test(value)
                          ) {
                            return;
                          }
                          setEditData((prev) => ({
                            ...prev,
                            [name]: value,
                          }));
                        }}
                        error={
                          field.regex
                            ? !field.regex.test(editData?.[field.name] || "")
                            : false
                        }
                        helperText={
                          field.regex &&
                          !field.regex.test(editData?.[field.name] || "")
                            ? `Invalid ${
                                field.name === "phone"
                                  ? "phone number (10 digits only)"
                                  : "format"
                              }`
                            : ""
                        }
                        fullWidth
                        type={field.type || "text"} // Use specified type or default to text
                        inputProps={
                          field.maxLength
                            ? { maxLength: field.maxLength }
                            : undefined
                        }
                        InputProps={{
                          sx: {
                            borderRadius: "12px",
                            backgroundColor: "#fafafa",
                            "&:hover": {
                              backgroundColor: "#f5f5f5",
                            },
                          },
                        }}
                      />
                    </Grid>
                  ))}

                  {/* Dropdown Fields */}
                  <DropdownField
                    label="Creator Type"
                    name="creatorType"
                    value={editData?.creatorType || ""}
                    onChange={(event) => {
                      setEditData((prev) => ({
                        ...prev,
                        creatorType: event.target.value,
                      }));
                    }}
                    options={creatorTypeOptions}
                    error={formErrors.creatorType}
                  />
                  <DropdownField
                    label="Creator For"
                    name="creatorFor"
                    value={editData?.creatorFor || ""}
                    onChange={(event) => {
                      setEditData((prev) => ({
                        ...prev,
                        creatorFor: event.target.value,
                      }));
                    }}
                    options={creatorForOptions}
                    error={formErrors.creatorFor}
                  />
                  <DropdownField
                    label="Zone Name"
                    name="zoneName"
                    value={editData?.zoneName || ""}
                    onChange={(event) => {
                      setEditData((prev) => ({
                        ...prev,
                        zoneName: event.target.value,
                      }));
                    }}
                    options={zoneNameOptions}
                    error={formErrors.zoneName}
                  />
                  <DropdownField
                    label="State"
                    name="stateCodeEn"
                    value={editData?.stateCodeEn || ""}
                    onChange={(event) => {
                      setEditData((prev) => ({
                        ...prev,
                        stateCodeEn: event.target.value,
                      }));
                    }}
                    options={stateCodeEnOptions}
                    error={formErrors.stateCodeEn}
                  />
                </Grid>
              )}
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: "space-between",
                padding: "16px 24px",
                background: "#f9fafb",
                borderTop: "1px solid #e0e0e0",
                borderRadius: "0 0 16px 16px",
              }}
            >
              <Button
                onClick={handleCloseEditDialog}
                variant="outlined"
                color="error"
                sx={{
                  borderRadius: "8px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  border: "2px solid #e57373",
                  "&:hover": {
                    backgroundColor: "#ffcdd2",
                    border: "2px solid #ef5350",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateCreator}
                type="button"
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
                  color: "white",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #2ecc71 0%, #3498db 100%)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    </>
  );
};

export default AddCreator;
