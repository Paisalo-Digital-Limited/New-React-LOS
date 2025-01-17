import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableRow
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchIcon from "@mui/icons-material/Search";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const SanctionUpdate = () => {
  const [creator, setCreator] = useState("");
  const [code, setCode] = useState("");

  const rows = Array.from({ length: 14 }, (_, index) => ({
    id: index + 1,
    pageName: `John Doe ${index + 1}`,
    totalCount: `100`,
  }));

  const chartSetting = {
    yAxis: [
      {
        label: "rainfall (mm)",
      },
    ],
    series: [{ dataKey: "seoul" }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  const dataset = [
    {
      london: 59,
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: "Jan",
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      seoul: 28,
      month: "Feb",
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
      seoul: 41,
      month: "Mar",
    },
    {
      london: 54,
      paris: 56,
      newYork: 92,
      seoul: 73,
      month: "Apr",
    },
    {
      london: 57,
      paris: 69,
      newYork: 92,
      seoul: 99,
      month: "May",
    },
    {
      london: 60,
      paris: 63,
      newYork: 103,
      seoul: 144,
      month: "June",
    },
    {
      london: 59,
      paris: 60,
      newYork: 105,
      seoul: 319,
      month: "July",
    },
    {
      london: 65,
      paris: 60,
      newYork: 106,
      seoul: 249,
      month: "Aug",
    },
    {
      london: 51,
      paris: 51,
      newYork: 95,
      seoul: 131,
      month: "Sept",
    },
    {
      london: 60,
      paris: 65,
      newYork: 97,
      seoul: 55,
      month: "Oct",
    },
    {
      london: 67,
      paris: 64,
      newYork: 76,
      seoul: 48,
      month: "Nov",
    },
    {
      london: 61,
      paris: 70,
      newYork: 103,
      seoul: 25,
      month: "Dec",
    },
  ];

  return (
    <>
      <Grid sx={{ marginLeft: "5%" }}>
        {/* Form Header */}
        <Typography variant="h5" sx={{ marginTop: "10px" }}>
          Branch Dashboard
        </Typography>
        {/* First Row */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="flex-start"
          sx={{ marginTop: "5px" }}
        >
          <Grid item xs={12} md={2} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="ddlCreator">Creator</InputLabel>
              <Select
                id="ddlCreator"
                label="creator type "
                labelId="creator-label"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              >
                <MenuItem value="">--Select Creator--</MenuItem>
                {/* Add more options dynamically if needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2} sm={4}>
            <TextField
              fullWidth
              label="Branch code"
              variant="outlined"
              size="small"
              id="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: "flex", gap: "16px" }}>
                <DatePicker
                  label="From Date"
                  size="small"
                  // value={searchParams.fromDate}
                  // onChange={(newValue) => {
                  //     handleInputChange("fromDate", newValue);
                  //     setErrors((prev) => ({ ...prev, fromDate: "" })); // Clear error on change
                  // }}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        // error={!!errors.fromDate}
                        // helperText={errors.fromDate}
                      />
                    ),
                  }}
                />
              </Box>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: "flex", gap: "16px" }}>
                <DatePicker
                  label="To Date"
                  // value={searchParams.fromDate}
                  // onChange={(newValue) => {
                  //     handleInputChange("fromDate", newValue);
                  //     setErrors((prev) => ({ ...prev, fromDate: "" })); // Clear error on change
                  // }}
                  slots={{
                    textField: (params) => (
                      <TextField
                        size="small"
                        {...params}
                        fullWidth
                        // error={!!errors.fromDate}
                        // helperText={errors.fromDate}
                      />
                    ),
                  }}
                />
              </Box>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              size="large"
              sx={{
                padding: "6px 35px",
                fontSize: "15px",
                marginRight: "8px",
                background: "green",
                "&:hover": {
                  background: "green",
                  boxShadow: "0px 8px 15px rgba(245, 213, 213, 0.4)",
                  transform: "scale(1.05)",
                  // Apply the hover effects to the icon on button hover
                  "& .MuiButton-startIcon": {
                    transform: "scale(1.2)",
                    filter: "drop-shadow(0 4px 8px rgba(255, 255, 255, 0.6))",
                  },
                },
                // Base properties for the icon
                "& .MuiButton-startIcon": {
                  fontSize: "24px",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                },
              }}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} marginTop={2}>
          {rows.map((row) => (
            <Grid item xs={12} md={1.8} key={row.id}>
              {" "}
              <Card
                variant="outlined"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "20px",
                  justifyContent: "space-between",
                  backgroundColor: "rgb(236, 247, 239)",
                }}
              >
                <Grid>
                  <Typography variant="body1">{row.pageName}</Typography>
                  <Typography variant="body1">{row.totalCount}</Typography>
                </Grid>

                <AccountBalanceWalletIcon
                  sx={{ background: "#EDEADE", color: "red" }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Card
          sx={{
            boxShadow: "none",
            borderRadius: "7px",
            border:"1px solid #EDEADE",
            marginTop:"30px",
            width:"80%",
            padding: { xs: "18px", sm: "20px", lg: "25px" },
            position: "relative",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginTop: "20px", marginRight: "20px" }}
          >
            Performance Overview
          </Typography>
          <Grid sx={{width:'90%', height:'80%'}}>
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "month",
                
               }]}
              {...chartSetting}
            />
          </Grid>
        </Card>
        <Card
          sx={{
            boxShadow: "none",
            borderRadius: "7px",
            border:"1px solid #EDEADE",
            marginTop:"30px",
            width:"80%",
            padding: { xs: "18px", sm: "20px", lg: "25px" },
            position: "relative",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginTop: "20px", marginRight: "20px" }}
          >
            Sourcing Records
          </Typography>
        </Card>
        <Card
          sx={{
            boxShadow: "none",
            borderRadius: "7px",
            border:"1px solid #EDEADE",
            marginTop:"30px",
            width:"80%",
            padding: { xs: "18px", sm: "20px", lg: "25px" },
            position: "relative",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginTop: "20px", marginRight: "20px" }}
          >
            Records Not Ready To Push
          </Typography>
          <TableContainer component={Paper} sx={{marginTop:"20px"}}>
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    textTransform: "uppercase",
                                    background: 'linear-gradient(90deg,#ed1c24,#ed1c24)',
                                    color: "white",
                                    textAlign: "center",
                                    fontSize: "10px",
                                    letterSpacing: "1px",
                                      
                                }}
                            >
                                {['S.No', 'ID', 'Name', 'Description', 'Code', 'Head', 'Action'].map((header, index) => (
                                    <TableCell
                                        key={index}
                                        sx={{
                                            textAlign:"center",
                                            color: 'white',
                                        }}
                                    >
                                     {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        
                    </Table>
                </TableContainer>
        </Card>
      </Grid>
    </>
  );
};
export default SanctionUpdate;
