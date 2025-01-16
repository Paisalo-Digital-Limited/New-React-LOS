import React, {useState} from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const UpdateScheme  = () => {
  const [creator, setCreator] = useState("");
  const [code, setCode] = useState("");
  const columns = [
    { id: "sNo", label: "S.No" },
    { id: "code", label: "Code" },
    { id: "creatorName", label: "Creator Name" },
    { id: "aadharId", label: "Aadhar ID" },
    { id: "schemeCode", label: "Scheme Code" },
    { id: "address", label: "Address" },
    { id: "loanAmount", label: "Loan Amount" },
    { id: "loanReason", label: "Loan Reason" },
    { id: "loanDuration", label: "Loan Duration" },
    { id: "Action", label: "Action" },
  ];

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
      {/* Form Header */}
      <Typography
              variant="h5"
              sx={{ marginBottom: "20px", fontWeight: "bold" }}
          >
             Update Scheme Code 
          </Typography>
        
          <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      justifyContent="flex-start"
                      sx={{ marginBottom: "5px" }}
                  >
                   
            <Grid item xs={12} md={3} sm={4}>
            <FormControl fullWidth size="medium">
              <InputLabel id="ddlCreator">Creator Name</InputLabel>
              <Select
                id="ddlCreator"
                label="creator type"
                labelId="creator-label"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              >
                <MenuItem value="">
                    -- Select Creator--
                </MenuItem>
                {/* Add more options dynamically if needed */}
              </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3} sm={4}>
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
            <Grid item xs={12} sm={5} md={3}>
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
         <Card
                 sx={{
                   boxShadow: "none",
                   borderRadius: "7px",
                   mb: "10px",
                 }}
                 className="rmui-card"
               >
        <TableContainer component={Paper} sx={{marginTop:"20px"}}>
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    textTransform: "uppercase",
                                    background: "#ED1C24",
                                    color: "white",
                                    textAlign: "center",
                                    fontSize: "10px",
                                    letterSpacing: "1px",       
                                }}
                            >
                                {columns.map((header, index) => (
                                    <TableCell
                                        key={index}
                                        sx={{
                                           
                                            color: 'white',
                                            textAlign:"center"
                                        }}
                                    >
                                        {header.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {/* <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    count={filteredData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={(event: any, newPage: number) => {
                                        setPage(newPage);

                                    }}
                                    onRowsPerPageChange={(event: {
                                        target: { value: string };
                                    }) => {
                                        const newRowsPerPage = parseInt(event.target.value, 10);
                                        setRowsPerPage(newRowsPerPage);
                                        setPage(0);

                                    }}
                                />
                            </TableRow>
                        </TableFooter> */}
                    </Table>
                </TableContainer>    
          </Card>
    </>
  );
};
export default UpdateScheme;