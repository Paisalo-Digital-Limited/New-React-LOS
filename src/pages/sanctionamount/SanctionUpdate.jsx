import React, { useState } from 'react';
import { Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdate';

const SanctionUpdate = () => {
  const [creator, setCreator] = useState('');
  const [code, setCode] = useState('');
  const [disbursementDate, setDisbursementDate] = useState('');
  const [startDate, setStartDate] = useState('');

  return (
    <>
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '7px',
          mb: '10px'
        }}
        className="rmui-card"
      >
        {/* Form Header */}
        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
          Modify Sanction Amount
        </Typography>
        {/* First Row */}
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginBottom: '5px' }}>
          <Grid item xs={12} md={2} sm={4}>
            <FormControl fullWidth size="medium">
              <InputLabel id="ddlCreator">Creator</InputLabel>
              <Select
                id="ddlCreator"
                label="creator type"
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
              label="Fi code"
              variant="outlined"
              size="medium"
              id="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Disbursement Date"
              variant="outlined"
              type="date" // Use type="date" for date input
              InputLabelProps={{
                shrink: true,
              }}
              value={disbursementDate}
              onChange={(e) => setDisbursementDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Start Date"
              variant="outlined"
              type="date" // Use type="date" for date input
              InputLabelProps={{
                shrink: true,
              }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              size="large"
              sx={{ bgcolor:'#1677ffe6',  borderRadius:'0px', color:'white', fontWeight:'bold'}}
              startIcon={<SecurityUpdateGoodIcon />}
            >
              UPDATE
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default SanctionUpdate;