import React, { useState } from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Paper } from '@mui/material';
import VehicleType from '../../components/VheicleDetails/VheicleType/VheicleType';
import ModelType from '../../components/VheicleDetails/ModelType/ModelType';
import Brand from '../../components/VheicleDetails/Brand/Brand';
import Fuel from '../../components/VheicleDetails/Fuel/Fuel';

const VheicleDetails = () => {
  const [selectedComponent, setSelectedComponent] = useState('VehicleType');

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'VehicleType':
        return <VehicleType />;
      case 'ModelType':
        return <ModelType />;
      case 'Brand':
        return <Brand />;
      case 'Fuel':
        return <Fuel />;
      default:
        return <Typography>Select an option to view details.</Typography>;
    }
  };

  const radioOptions = [
    { value: 'VehicleType', label: 'Vehicle Type', color: '#4caf50' },
    { value: 'ModelType', label: 'Model Type', color: '#ff9800' },
    { value: 'Brand', label: 'Brand', color: '#2196f3' },
    { value: 'Fuel', label: 'Fuel', color: '#f44336' },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ marginBottom: '24px', fontWeight: 'bold', color: '#333', textAlign: 'center' }}
      >
        Vehicle Details
      </Typography>

      <Paper
        elevation={3}
        sx={{
          padding: '16px',
          borderRadius: '16px',
          marginBottom: '24px',
          backgroundColor: '#f8f8f8',
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h6"
          sx={{ marginBottom: '16px', fontWeight: '600', color: '#555', textAlign: 'center' }}
        >
          Select a Category
        </Typography>
        <RadioGroup
          row
          value={selectedComponent}
          onChange={(e) => setSelectedComponent(e.target.value)}
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'nowrap', // Prevent wrapping to another row
          }}
        >
          {radioOptions.map(({ value, label, color }) => (
            <FormControlLabel
              key={value}
              value={value}
              control={
                <Radio
                  sx={{
                    '&.Mui-checked': {
                      color: color,
                    },
                    '&:hover': {
                      backgroundColor: `${color}22`, // Light background on hover
                      borderRadius: '50%',
                    },
                  }}
                />
              }
              label={
                <Box
                  sx={{
                    padding: '8px 16px',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: selectedComponent === value ? color : '#f0f0f0',
                    color: selectedComponent === value ? '#ffffff' : '#333',
                    fontWeight: 600,
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: `${color}33`, 
                      cursor: 'pointer',
                    },
                  }}
                >
                  {label}
                </Box>
              }
              sx={{
                margin: '0',
              }}
            />
          ))}
        </RadioGroup>
      </Paper>

      <Box
        sx={{
          padding: '24px',
          borderRadius: '16px',
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        {renderSelectedComponent()}
      </Box>
    </Box>
  );
};

export default VheicleDetails;
