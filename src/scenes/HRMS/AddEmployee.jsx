import React from "react";
import {
  Box,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
  Card,
} from "@mui/material";


const StaticForm = () => {
  return (
    <Card>
    <Box sx={{ padding: "16px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="For Branch"
          />
        </Grid>

        {/* First Name, Last Name, Email */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="First Name *" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Last Name *" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Email *" fullWidth variant="outlined" defaultValue="dotnetdev1@paisalo.in" />
        </Grid>

        {/* Password, Gender, Designation */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Password *" type="password" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Gender *" select fullWidth variant="outlined">
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Designation *" select fullWidth variant="outlined">
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Tester">Tester</MenuItem>
          </TextField>
        </Grid>

        {/* Department, Role, Reporting */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Department *" select fullWidth variant="outlined">
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Role *" select fullWidth variant="outlined">
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Reporting *" fullWidth variant="outlined" />
        </Grid>

        {/* Creator, Branch Code, Date of Birth */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Creator *" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Branch Code *" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Date of Birth *"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>

        {/* Mother's First Name, Mother's Last Name, Father's Last Name */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Mother's First Name *" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Mother's Last Name *" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Father's Last Name *" fullWidth variant="outlined" />
        </Grid>

        {/* Permanent Address, Current Address */}
        <Grid item xs={12} sm={6}>
          <TextField label="Permanent Address *" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Current Address *" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="Same as Permanent Address"
          />
        </Grid>

        {/* Mobile Number, Category, Religion */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Mobile Number *" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Category *" select fullWidth variant="outlined">
            <MenuItem value="General">General</MenuItem>
            <MenuItem value="SC/ST">SC/ST</MenuItem>
            <MenuItem value="OBC">OBC</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Religion *" select fullWidth variant="outlined">
            <MenuItem value="Hindu">Hindu</MenuItem>
            <MenuItem value="Muslim">Muslim</MenuItem>
            <MenuItem value="Christian">Christian</MenuItem>
          </TextField>
        </Grid>

        {/* Blood Group, Marital Status, Spouse's Details */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Blood Group *" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Marital Status *" select fullWidth variant="outlined">
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="Married">Married</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Spouse First Name" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Spouse Last Name" fullWidth variant="outlined" />
        </Grid>

        {/* FI Sourcing */}
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="FI Sourcing"
          />
        </Grid>

        {/* Submit & Details Buttons */}
        <Grid container sx={{ display: 'flex', justifyContent: 'flex-end', gap:'1rem', alignItems: 'center', spacing: 2 }}>
  <Grid item xs={12} sm={6} md={2}>
    <Button
      variant="contained"
      color="success"
      fullWidth
    >
      Submit
    </Button>
  </Grid>
  <Grid item xs={12} sm={6} md={2}>
    <Button
      variant="contained"
      color="warning"
      fullWidth
    >
      Details
    </Button>
  </Grid>
</Grid>


      </Grid>
    </Box>
    </Card>
  );
};

export default StaticForm;