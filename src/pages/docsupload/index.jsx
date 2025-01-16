import React, { ChangeEvent, useState } from "react";
import {
  Card,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";
import Document from "./Docs";
import DeleteRequest from "./DeleteRequest";
import Deletedocument from "./Delete";


export default function UserAccess() {
  const [selectedPage, setSelectedPage] = useState("docupload");

  const handlePageChange = (event) => {
    setSelectedPage(event.target.value);
  };

  return (
    <>
      <Box sx={{ margin: "0 auto" }}>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: 2,
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "20px", fontWeight: "bold", fontSize:'20px' }}>
          User Access
        </Typography>

        {/* Radio Buttons */}
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            row
            value={selectedPage}
            onChange={handlePageChange}
            sx={{ mt: 3, justifyContent: "left" }}
          >
            {[
              { value: "docupload", label: "Docs Upload" },
              { value: "deleterequest", label: "Doc Delete Request" },
              { value: "docdelete", label: "Doc Delete" },
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
      </Card>

      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: 2,
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
      >
        {selectedPage === "docupload" && <Document />}
        {selectedPage === "deleterequest" && <DeleteRequest />}
        {selectedPage === "docdelete" && <Deletedocument />}
      </Card>
      </Box>
      </>
  );
}

