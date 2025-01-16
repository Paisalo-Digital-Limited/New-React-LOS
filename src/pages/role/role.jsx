

import React, { ChangeEvent, useState } from "react";
import Department from "./Department";
import Designation from "./Designation";
import Role from "./Rolee";
import Permission from "./Permission";
import {
  Card,
  Radio,
  Grid,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Typography,
  Box,
  Divider,
  Chip,
} from "@mui/material";

export default function UserAccess() {
  const [selectedPage, setSelectedPage] = useState("getrolepermission");

  const handlePageChange = (event) => {
    setSelectedPage(event.target.value);
  };

  return (
    <>

       <Box sx={{ p: 2 }}>
           <Card sx={{ boxShadow: "none", borderRadius: "7px", p: 2, mb: 2 }}>
      <Grid sx={{boxShadow: "none", mb: 2,}}>
        {/* Radio Buttons */}
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            row
            value={selectedPage}
            onChange={handlePageChange}
            sx={{justifyContent: "left" }}
          >
            {[
              { value: "getrolepermission", label: "Get Role Permission" },
              { value: "getrole", label: "Get Role" },
              { value: "department", label: "Department" },
              { value: "designation", label: "Designation" },
            ].map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={
                  <Radio
                    sx={{
                      color: "#4CAF50",
                      "&.Mui-checked": {
                        color: "#388E3C",
                      },
                    }}
                  />
                }
                label={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: selectedPage === option.value ? "bold" : "normal",
                        color: selectedPage === option.value ? "#388E3C" : "#000",
                      }}
                    >
                      {option.label}
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        height: "4px",
                        backgroundColor: selectedPage === option.value ? "#4CAF50" : "transparent",
                        borderRadius: "4px",
                        transition: "background-color 0.3s ease",
                      }}
                    />
                  </Box>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
      </Card>
      <Box sx={{ mb: 2,}}>
        {selectedPage === "department" && <Department />}
        {selectedPage === "designation" && <Designation />}
        {selectedPage === "getrole" && <Role />}
        {selectedPage === "getrolepermission" && <Permission />}
      </Box>
    
      </Box>

      </>
  );
}