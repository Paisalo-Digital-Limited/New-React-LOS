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
import SearchIcon from '@mui/icons-material/Search';

const Deletedocument = () => {
  const [fiCode, setFiCode] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [creator, setCreator] = useState("");
  const [rows, setRows] = useState([]);

  const headers = [
    { label: " DOC Id", key: "doc" },
    { label: "Fi Code", key: "ficode" },
    { label: "Action", key: "action" },
  ];

  const tableCellStyle = {
    background: "linear-gradient(90deg,#ed1c24,#ed1c24)",
    padding: "10px 12px",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  };

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
          Fi Docs Upload
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
                label="Branch Code"
                variant="outlined"
                value={branchCode}
                onChange={(e) => setBranchCode(e.target.value)}
                fullWidth
                size="medium"
              />
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
            
            <Grid item xs={12} md={3} sm={5}>
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

      <Card sx={{ boxShadow: "none", borderRadius: "7px", mb: "25px" }}>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: "5px", marginTop: "20px" }}
        >
          <Table>
            <TableHead>
            <TableRow>
                <TableCell sx={tableCellStyle}>Doc Id</TableCell>
                <TableCell sx={tableCellStyle}>Fi Code</TableCell>
                <TableCell sx={tableCellStyle}>Action</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default Deletedocument;
