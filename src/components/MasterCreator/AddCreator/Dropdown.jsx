import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
} from "@mui/material";

const DropdownField = ({
  label,
  name,
  value,
  options,
  onChange,
  error,
}) => {
  return (
    <Grid item xs={12} md={4}>
      <Box>
        <FormControl fullWidth error={Boolean(error)}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}-label`}
            id={name}
            value={value || ""}
            label={label}
            onChange={onChange}
            sx={{
              borderRadius: "8px",
              backgroundColor: "#fafafa",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            {options.length > 0 ? (
              options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No options available</MenuItem>
            )}
          </Select>
          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
      </Box>
    </Grid>
  );
};

export default DropdownField;
