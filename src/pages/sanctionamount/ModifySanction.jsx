import React, { useState } from 'react';
import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdate';

const ModifySanctionPage = () => {
  const [creator, setCreator] = useState('');
  const [code, setCode] = useState('');
  const [amount, setAmount] = useState('');

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
          <Grid item xs={12} md={3} sm={3}>
            <FormControl fullWidth>
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
          <Grid item xs={12} md={3} sm={3}>
            <TextField
              fullWidth
              label="code"
              variant="outlined"
              size="medium"
              id="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={7}>
          <Button
                           variant="contained"
                           size="large"
                           sx={{ bgcolor:'green',  borderRadius:'0px', color:'white'
                           
                           }}
                           startIcon={<SearchIcon />}
                         >
                             
                           Search
                         </Button>
          </Grid>
        </Grid>
      </Card>
      {/* Second Row */}
      
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start" sx={{ marginTop: '15px' }}>
          <Grid item xs={12} md={3} sm={3} hidden>
            <TextField
              fullWidth
              id="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              size="medium"
              label="sanction Amount"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3} sm={3} hidden>
            <Button
              variant="contained"
              size="medium"
              sx={{
                padding: '6px 18px',
                fontSize: '15px',
                background: 'linear-gradient(135deg, #E91E63, #F06292)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  background: 'linear-gradient(135deg,rgb(175, 57, 96),rgb(187, 65, 106) )',
                  boxShadow: '0px 8px 15px rgba(245, 213, 213, 0.4)',
                  transform: 'scale(1.05)'
                },
                // Base properties for the icon
                '& .MuiButton-startIcon': {
                  fontSize: '24px'
                }
              }}
              startIcon={<SecurityUpdateGoodIcon />}
            >
              Update
            </Button>
         
         
            <Button
              variant="contained"
              size="medium"
              sx={{
                padding: '6px 18px',
                fontSize: '15px',
                marginLeft:"30px",
                background: 'linear-gradient(135deg,rgb(233, 30, 30),rgb(235, 65, 65))',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  background: 'linear-gradient(135deg,rgb(219, 59, 59),rgb(216, 51, 51) )',
                  boxShadow: '0px 8px 15px rgba(245, 213, 213, 0.4)',
                  transform: 'scale(1.05)'
                },
                // Base properties for the icon
                '& .MuiButton-startIcon': {
                  fontSize: '24px'
                }
              }}
             
            >
              Delete Sanction
            </Button>
            </Grid>
          
          {/* <Grid item xs={12} sm={3}>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={handleDelete}
                  sx={{ marginTop: 2 }}
                >
                  <span style={{ marginRight: 8 }}>Delete Sanction</span>
                  <i className="fa fa-trash" />
                </Button>
              </Grid> */}
        </Grid>
      
    </>
  );
};
export default ModifySanctionPage;
