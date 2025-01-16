import React, { ChangeEvent, useState } from "react";
import {
  Card,
  Radio,
  Grid,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Typography,
  Box
} from "@mui/material";
import AddMenuMaster from "./PageMaster";
import SubMenu from "./SubMenu";
import MainPage from "./MainMenu";

export default function UserAccess() {
  const [selectedPage, setSelectedPage] = useState("mainMenu");

  const handlePageChange = (event) => {
    setSelectedPage(event.target.value);
  };

  return (
    <Card
      sx={{
        boxShadow: 'none',
        borderRadius: '7px',
        mb: '10px'
      }}
      className="rmui-card"
    >
      <Box sx={{ padding: '30px' }}>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                row
                value={selectedPage}
                onChange={handlePageChange}
                sx={{ justifyContent: "left" }}
              >
                {[
                  { value: "mainMenu", label: "Main Menu" },
                  { value: "subMenu", label: "Sub Menu" },
                  { value: "page", label: "Page" },
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

          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              {selectedPage === "mainMenu" && <MainPage />}
              {selectedPage === "subMenu" && <SubMenu />}
              {selectedPage === "page" && <AddMenuMaster />}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}