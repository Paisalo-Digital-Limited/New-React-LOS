import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  IconButton,
  Tooltip,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';

const DeleteRequest = () => {
  const [fiCode, setFiCode] = useState("");
  const [creator, setCreator] = useState("");
  const [rows, setRows] = useState([]);

 
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "10px",
        }}
        className="rmui-card"
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: "20px",
            fontWeight: "bold",
            fontSize: "20px",
            marginTop: "10px",
          }}
        >
          Fi Delete Request
        </Typography>
        <form>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
            sx={{ marginBottom: "5px" }}
          >
             <Grid item xs={12} sm={5} md={3}>
              <FormControl fullWidth size="medium">
                <InputLabel id="product-type-label">Creator</InputLabel>
                <Select
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                  label="Creator"
                  labelId="product-type-label"
                  id="product-type"
                >
                  <MenuItem value="001">Agra</MenuItem>
                  <MenuItem value="002">Delhi</MenuItem>
                  <MenuItem value="003">Mumbai</MenuItem>
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={12} sm={5} md={3}>
              <TextField
                label="Fi Code"
                variant="outlined"
                value={fiCode}
                onChange={(e) => setFiCode(e.target.value)}
                fullWidth
                size="medium"
              />
            </Grid>
           
            <Grid item xs={12} md={4} sm={6}>
            <Button
                           variant="contained"
                           size="large"
                           sx={{ bgcolor:'green',  borderRadius:'0px', color:'white',fontWeight:'bold'}}
                           startIcon={<SearchIcon />}>
                           SERACH
                         </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
      <Card
        sx={{
          boxShadow: "none",
          mb: "10px",
          marginTop:"10px"
        }}
        className="rmui-card"
      >
        <Grid
          container
          alignItems="center"
          sx={{ marginBottom: "5px", marginLeft: "4px", marginTop:"10px" }}
        >
          <Grid item xs={12} sm={3} md={2}>
            <Box>
              <TextField
                variant="standard"
                label="Document ID:"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <Box>
              <TextField
                variant="standard"
                label="Data Desc:"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={2} md={1} marginTop={2.5}>
            <Box>
              <CheckBox />
            </Box>
          </Grid>
          <Grid item xs={12} sm={2} md={1} marginTop={2}>
            <Box>
            <Button
                           variant="contained"
                           size="large"
                           sx={{ bgcolor:'#1677ffe6',  borderRadius:'0px', color:'white',fontWeight:'bold'}}
                           startIcon={<SendIcon />}>
                           SUBMIT
                         </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>

      
    </>
  );
};

export default DeleteRequest;
