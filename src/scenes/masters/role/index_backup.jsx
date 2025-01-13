import { use } from "react";
import { useEffect, useState } from "react";
 import axios from "axios";
import apiClient from "../../../network/apiClient";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useMode,tokens } from "../../../theme";
const Role = () => {
const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'department', headerName: 'Department', width: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'empCode', headerName: 'Employee Code', width: 180 },
    { field: 'reportingName', headerName: 'Reporting Manager', width: 200 },
    { field: 'isActive', headerName: 'Status', width: 120 },
  ];
  useEffect(() => {
    debugger;
    fetchUsers()}, []);

  const fetchUsers = async () => {
    try {
      setLoading(true); // Set loading state to true while fetching data
  

    

      // Make the API request using axios
      const response = await apiClient.get(
        "/User/GetUsers",
        {
          requireAuth: false , checkTokenInResponse: false
        }
      );
      debugger;
      // Assuming response.data contains the user data array
    // Format the data for DataGrid
    const formattedData = response.data.data.map((user, index) => ({
      id: user.id, // Use the id from the response
      name: user.name,
      email: user.email,
      department: user.departmentName,
      role: user.roleName,
      empCode: user.empCode,
      reportingName: user.reportingName,
      isActive: user.isActive ? 'Active' : 'Inactive', // Display active status as text
    }));

  
     setRows(formattedData); // Set the formatted data into the state
    } catch (error) {
      console.error("Error fetching users:", error); // Log any error that occurs
    } finally {
      setLoading(false); // Set loading to false once the request is completed
    }
  };





  return (
    <Box m="20px" width="90%">
    
    <Box
    width="100%"
      m="40px 0 0 0"
      height="80%"
      sx={{background:'#fff',borderRadius:'10px',boxShadow:'0px 0px 10px 0px #0000001a'}}
    >
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
       
        sx={{fontFamily: 'Source Sans Pro',fontSize: 16,fontColor: colors.grey[500],  color: '#000', 
          '& .MuiDataGrid-cell': {
            color: '#000', // Ensure that text within the cells is also black
          },
          '& .MuiCheckbox-root': {
            color: '#800000 !important', // Set checkbox color to maroon
          },
          '& .MuiSvgIcon-root': {
            color: '#000 !important', // Set all icons color to black
          },
          '& .MuiTablePagination-root': {
            color: '#000', // Set pagination text color to black
          },
          '& .MuiTablePagination-select': {
            color: '#000', // Set "Rows per page" dropdown text color to black
          },
          '& .MuiTablePagination-displayedRows': {
            color: '#000', // Set page info (e.g., "1–12 of 12") color to black
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.greenAccent[500]} !important`, // Button color
          },

        }}
      />
    </div>
    </Box>
    </Box>
  );
};

export default Role;