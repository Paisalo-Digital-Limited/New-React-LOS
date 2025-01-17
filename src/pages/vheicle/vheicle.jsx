import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Grid,
  Card
} from '@mui/material';
import VehicleType from '../../components/VheicleDetails/VheicleType/VheicleType';
import ModelType from '../../components/VheicleDetails/ModelType/ModelType';
import Brand from '../../components/VheicleDetails/Brand/Brand';
import Fuel from '../../components/VheicleDetails/Fuel/Fuel';

const VehicleDetails = () => {
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

  return (
    <Box sx={{ p: 2 }}>
      <Card 
        elevation={3}
        sx={{
          padding: '16px',
          mb: 2,
          borderRadius: '0px',
          marginBottom: '24px',
          backgroundColor: '#f8f8f8',
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
        }}
      >
        <FormControl fullWidth>
          <FormLabel
            id="vehicle-category-radio-group-label"
            sx={{
              marginBottom: '16px',
              fontWeight: '600',
              fontSize: '1.2rem',
              color: '#555',
              textAlign: 'left',
            }}
          >
            Select a Category
          </FormLabel>
          <RadioGroup
            aria-labelledby="vehicle-category-radio-group-label"
            name="vehicle-category-radio-group"
            value={selectedComponent}
            onChange={(e) => setSelectedComponent(e.target.value)}
            sx={{
              width: '100%',
            }}
          >
            <Grid container spacing={2} justifyContent="left">
              <Grid item xs={3} sm={2} md={2} lg={2} xl={2}>
                <FormControlLabel
                  value="VehicleType"
                  control={
                    <Radio
                      sx={{
                        color: '#4caf50',
                        '&.Mui-checked': { color: '#4caf50' },
                      }}
                    />
                  }
                  label="Vehicle Type"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                  
                      fontWeight: '600',
                      color:'#000'
                    },
                  }}
                />
              </Grid>
              <Grid item xs={3} sm={2} md={2} lg={2} xl={2}>
                <FormControlLabel
                  value="ModelType"
                  control={
                    <Radio
                      sx={{
                        color: '#ff9800',
                        '&.Mui-checked': { color: '#ff9800' },
                      }}
                    />
                  }
                  label="Model Type"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                    
                      fontWeight: '600',  color:'#000'
                    },
                  }}
                />
              </Grid>
              <Grid item xs={3} sm={2} md={2} lg={2} xl={2}>
                <FormControlLabel
                  value="Brand"
                  control={
                    <Radio
                      sx={{
                        color: '#2196f3',
                        '&.Mui-checked': { color: '#2196f3' },
                      }}
                    />
                  }
                  label="Brand"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                     
                      fontWeight: '600',  color:'#000'
                    },
                  }}
                />
              </Grid>
              <Grid item xs={3} sm={2} md={2} lg={2} xl={2}>
                <FormControlLabel
                  value="Fuel"
                  control={
                    <Radio
                      sx={{
                        color: '#f44336',
                        '&.Mui-checked': { color: '#f44336' },
                      }}
                    />
                  }
                  label="Fuel"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                    
                      fontWeight: '600',  color:'#000'
                    },
                  }}
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Card>

      <Box
        sx={{
          padding: '24px',
          borderRadius: '0px',
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        {renderSelectedComponent()}
      </Box>
    </Box>
  );
};

export default VehicleDetails;
