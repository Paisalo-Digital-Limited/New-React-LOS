import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Card,Link ,
  Typography,Modal ,Box,Tabs,Tab,List ,ListItem,ListItemText ,ListItemIcon ,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Description,
  AccountBox,
  Fingerprint,
  Folder,
} from "@mui/icons-material";
import PreviewIcon from '@mui/icons-material/Preview';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import apiClient from "../../network/apiClient";
import CircularProgress from '@mui/material/CircularProgress';
// import { useMode,tokens } from "../../theme";
import './model.css';

// Document details with icons
const documentDetails = [
  { docName: "Document Application Form Front", icon: <Description /> },
  { docName: "Document Application Form Back", icon: <AccountBox /> },
  { docName: "Group Loan Application Front", icon: <AccountBox /> },
  { docName: "Borrower Aadhar", icon: <Fingerprint /> },
  { docName: "Borrower Bank Passbook", icon: <Folder /> },
  { docName: "Voter ID Borrower", icon: <Fingerprint /> },
  { docName: "Signed Disbursement Sheet", icon: <AccountBox /> },
  { docName: "Pronote", icon: <Description /> },
  { docName: "CAM", icon: <AccountBox /> },
  { docName: "End Use Certificate", icon: <AccountBox /> },
  { docName: "Aadhar ID Back", icon: <Fingerprint /> },
];

// Static documents for loading state
const staticDocuments = documentDetails.map((detail, index) => ({
  id: `${index + 1}`,
  name: detail.docName,
  docID: index + 1,
  docName: detail.docName,
  checklistId: null,
  docData: null,
  docFilePath: null,
  dc: 0,
  createdDate: null,
  filePath: null,
  grNo: 0,
  icon: detail.icon,
}));
const ReadyForAudit = () => {
  const [filterOption, setFilterOption] = useState('date');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [creator, setCreator] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const[Creatorlist,setCreatorlist]=useState([]);

  //--------model open--------
   const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState('');
    const [pinfoData, setPinfoData] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [pinInfopen, setPinInfopen] = useState(false);
    const [IncomeDataopen, setIncomeopen] = useState(false); 
    const [PronoteDocopen, setPronoteDocopen] = useState(false);
    const [selectedType, setSelectedType] = useState('borrower');
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [GetAllDocopen, setGetAllDocopen] = useState(false); 

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
    setFromDate('');
    setToDate('');
    setCreator('');
    setBranchCode('');
    setGroupCode('');
  };
  useEffect(()=>{
    debugger;
    getCreatorDropdown();
  },[]);
  const handleGetAllDocModelOpen = async (FiCode, Creator) => {
    setLoading(true); // Start loading state
    try {
        //const response = await fetch(`https://apiuat.paisalo.in:4015/fi/api/FIIndex/GetAllDoc?creator=BAREILLY&ficode=261863`);
        const response = await fetch(`https://apiuat.paisalo.in:4015/fi/api/FIIndex/GetAllDoc?creator=${Creator}&ficode=${FiCode}`);
        const data = await response.json();
        if (data.statuscode === 200) {
            const mergedDocuments = data.data.map((doc) => ({
                ...doc,
                icon: doc.icon || <Description />,
            }));
            setDocuments(mergedDocuments);
            setGetAllDocopen(true);
        } else {
            console.error('Error fetching documents:', data.message);
        }
    } catch (error) {
        console.error("Failed to fetch documents", error);
    } finally {
        setLoading(false);
    }
};
useEffect(() => {
  //handleGetAllDocModelOpen(); // Fetch documents on component mount
}, []);
  const filteredDocuments = documents.filter(doc => selectedType === 'borrower' ? doc.grNo <= 0 : doc.grNo > 0);

//   const handleCellClick = () => {
//     setModalData(row.pInfo || '-'); // Set data for the modal
//     setModalOpen(true); // Open the modal
// };
const handleGetAllDocClose = () => {
  setGetAllDocopen(false); // Close the modal
  //setSelectedRow(null); // Clear the selected row data
};
 // Handle opening the modal
 const handleOpenModal = (doc) => {
  setSelectedDocument(doc);
  setOpenModal(true);
};
// Handle closing the modal
const handleCloseModal = () => {
  setOpenModal(false);
  setSelectedDocument(null);
};

  const getCreatorDropdown=async()=>{
    debugger;
    try{
        //setLoading(true);
        const response=await apiClient.get("/Masters/GetCreator",
            {
                requireAuth: true , checkTokenInResponse: false
            }
        );
        const fetchCreator=response.data.data;
        setCreatorlist(fetchCreator);
    }
    catch(error){

    }
    finally{
        //setLoading(false);
    }
    //----------Search data-----------------------
  

  }
//   const handleGetAllDocModelOpen = async (FiCode, Creator) => {
//     debugger;
//     setLoading(true); // Start loading state
//     try {
//         // Fetching documents from the API using the FiCode and Creator parameters
//         const response = await fetch(`https://apiuat.paisalo.in:4015/fi/api/FIIndex/GetAllDoc?creator=${Creator}&ficode=${261863}`);
        
//         const data = await response.json();

//         if (data.statuscode === 200) {
//             // If the response is successful, process the documents
//             const mergedDocuments = data.data.map((doc) => ({
//                 ...doc,
//                 icon: doc.icon || <Description />, // Assign default icon if not provided
//             }));

//             // Filter documents based on `grNo`
//             const borrowerDocuments = mergedDocuments.filter((doc) => doc.grNo <= 0);
//             const coBorrowerDocuments = mergedDocuments.filter((doc) => doc.grNo > 0);

//             // Assuming you have some way to determine selectedType, e.g., from state or specific logic
//             const selectedType = 'borrower'; // Replace with your own logic to get selectedType
//             setDocuments(selectedType === 'borrower' ? borrowerDocuments : coBorrowerDocuments);
//         } else {
//             console.error('Error fetching documents:', data.message);
//         }
//     } catch (error) {
//         console.error("Failed to fetch documents", error);
//     } finally {
//         setLoading(false); // End loading state
//         setGetAllDocopen(true); // Open the modal after data has been fetched
//     }
//     [selectedType]
// };

const getSortedDocuments = () => {
  return [...documents].sort((a, b) => {
    if (a.filePath && !b.filePath) return -1;
    if (!a.filePath && b.filePath) return 1;
    return 0;
  });
};
  const handlePersonalInfoClick = async (FiCode, Creator) => {
    debugger;
    if (!FiCode || !Creator) {
        console.error('Invalid inputs for handlePersonalInfoClick:', { FiCode, Creator });
        return;
    }
    setLoading(true);  // Set loading to true before making the API call
    const url = `https://apiuat.paisalo.in:4015/fi/api/FiPostSanction/GetPinFoDocument?FiCode=${FiCode}&Creator=${Creator}`;
    //const url = `https://localhost:7030/api/FiPostSanction/GetPinFoDocument?FiCode=${261809}&Creator=${Creator}`;
    try {
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json"
                //Authorization: `Bearer ${token}`, // Ensure proper headers
            },
        });
        if (response.status === 200) {
            const apipinfoData = (response.data.data || '[]');  
            setPinfoData(apipinfoData);  
            setSelectedRowData(apipinfoData[0] || null);  
            setPinInfopen(true); 
        } else {
            console.error('Error in API response:', response.data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error in handlePersonalInfoClick:', error);
    } finally {
        setLoading(false);  
    }
};
//-------------Income Details----------
const handleIncomeClick = async (FiCode, Creator) => {
  debugger;
  if (!FiCode || !Creator) {
      console.error('Invalid inputs for handlePersonalInfoClick:', { FiCode, Creator });
      return;
  }
  setLoading(true);  // Set loading to true before making the API call
  const url = `https://apiuat.paisalo.in:4015/fi/api/FiPostSanction/GetPinFoDocument?FiCode=${FiCode}&Creator=${Creator}`;
 // const url = `https://localhost:7030/api/FiPostSanction/GetFiInComebyCreatorFiCode?FiCode=${261809}&Creator=${Creator}`;
  try {
      const response = await axios.get(url, {
          headers: {
              "Content-Type": "application/json"
              //Authorization: `Bearer ${token}`, // Ensure proper headers
          },
      });
      if (response.status === 200) {
          const apipinfoData = (response.data.data || '[]');  
          setPinfoData(apipinfoData);  
          setSelectedRowData(apipinfoData[0] || null);  
          setPinInfopen(true); 
      } else {
          console.error('Error in API response:', response.data.message || 'Unknown error');
      }
  } catch (error) {
      console.error('Error in handlePersonalInfoClick:', error);
  } finally {
      setLoading(false);  
  }
};
//----------Doc Details-------------------
const handleDocClick = async (FiCode, Creator) => {
  if (!FiCode || !Creator) {
      console.error('Invalid inputs for handlePersonalInfoClick:', { FiCode, Creator });
      return;
  }
  setLoading(true);  // Set loading to true before making the API call
  const url = `https://apiuat.paisalo.in:4015/fi/api/FiPostSanction/GetPinFoDocument?FiCode=${FiCode}&Creator=${Creator}`;
  //const url = `https://localhost:7030/api/FiPostSanction/GetFiDocumentbyCreatorFiCode?FiCode=${261809}&Creator=${Creator}`;
  try {
      const response = await axios.get(url, {
          headers: {
              "Content-Type": "application/json"
              //Authorization: `Bearer ${token}`, // Ensure proper headers
          },
      });
      if (response.status === 200) {
          const apipinfoData = (response.data.data || '[]');  
          setPinfoData(apipinfoData);  
          setSelectedRowData(apipinfoData[0] || null);  
          setPronoteDocopen(true); 
      } else {
          console.error('Error in API response:', response.data.message || 'Unknown error');
      }
  } catch (error) {
      console.error('Error in handlePersonalInfoClick:', error);
  } finally {
      setLoading(false);  
  }
};
//---------loan Agreeement-----------------
const DbNamevalue="PDLERP";
const handleLoanAgreement = async (fiId) => {
  debugger;
  setLoading(true);
  const HouseVisitVM = {
    F_Id: fiId,
    Type: 'SecondeSign',
    DbName: DbNamevalue,
  };

  try {
    const response = await axios.post(
      'https://apiuat.paisalo.in:4015/PDLDocReports/api/DocGen/GetDocument',
      HouseVisitVM
    );
    const { code, message, data } = response.data;
    if (code === 200) {
      const pdfFilePath = data;
      const fileName = pdfFilePath.split(':').pop();
      const pdfUrl = `https://predeptest.paisalo.in:8084/${fileName}`;
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    } else if (code === 201) {
      alert('No Data Found');
    } else {
      alert('Error');
    }
  } catch (error) {
    console.error('Error fetching the report:', error);
    alert('Request Failed');
  } finally {
    setLoading(false);
  }
};
//------------------------------------
  const handleCreatorChange = (event) => {
    debugger;
    const selectedCreator = event.target.value;
    setCreator(selectedCreator); 
  };
  //----------send To NEFT-------------
  // Send To  Neft Api call 
  const handleSentToNeft = async (FiCode, Creator,  remark) => {
    debugger;
    if (!FiCode || !Creator) {
        console.error('Invalid inputs for handleSentToNeft:', { FiCode, Creator });
        return;
    }
    setLoading(true); 
    //const url = `https://apiuat.paisalo.in:4015/fi/api/FiPostSanction/AssignreadyforNeft?FiCode=${FiCode}&Creator=${Creator}`;
    const url = `https://localhost:7030/api/FiPostSanction/AssignreadyforNeft?FiCode=${261809}&Creator=${Creator}`;
    try {
        // Making a POST request with the required data
        //const response = await axios.post(url);
        const response = await axios.post(
            url,
            {}, // Pass an empty object for the body
            {
                headers: {
                    "Content-Type": "application/json"
                    //Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200) {
            alert("API call successful:", response.data);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false); 
            }, 3000); 
        }
        else {
            console.error('Error in API response:', response.data.message || 'Unknown error');
        }
    } catch (error) {
       // console.error('Error in handleSentToNeft:', error);
    } finally {
        setLoading(false); 
    }
};

const [BackToNeftopen, setBackToNeftopen] = useState(false);
const [selectedDataBranch, setselectedDataBranch] = useState({ FiCode: "", Creator: "" });
const [remark, setRemark] = useState("");

const [showSuccess, setShowSuccess] = useState(false);
const handleSentToBranch = (FiCode,Creator) => {
  setselectedDataBranch({
      FiCode: FiCode || "", // Set FiCode from the row
      Creator: Creator || "", // Set Creator from the row
  });
  setRemark(""); // Reset remark field
  setBackToNeftopen(true); // Open the modal
};

const SaveBackNeftToBranch = async () => {
  debugger;
  const { FiCode, Creator } = selectedDataBranch; // Destructure state
  const payloadRemark = remark;
  const groupcode = null;
  const cso = null;
  const br = null;

  if (!FiCode || !Creator || !payloadRemark) {
      console.error("All required fields must be filled!");
      return;
  }

  const url = `https://apiuat.paisalo.in:4015/fi/api/FiPostSanction/BackReadyForNeft?FiCode=${encodeURIComponent(FiCode)}&Creator=${encodeURIComponent(Creator)}&remark=${encodeURIComponent(payloadRemark)}&groupcode=${groupcode || ""}&cso=${cso || ""}&br=${br || ""}`;
  
  setLoading(true); // Set loading to true
  try {
      console.log("Making API call to:", url);
      const response = await axios.post(
          url,
          {}, // Pass an empty object for the body
          {
              headers: {
                  "Content-Type": "application/json"
                  //Authorization: `Bearer ${token}`,
              },
          }
      );

      if (response.status === 200) {
          console.log("API call successful:", response.data);
          setShowSuccess(true);
          setTimeout(() => {
              setShowSuccess(false);
              setBackToNeftopen(false);
          }, 2000);
      } else {
          console.error("API call failed:", response.data.message || "Unknown error");
      }
  } catch (error) {
      console.error("Error during API call:", error.response?.data || error.message);
  } finally {
      setLoading(false); // Set loading to false regardless of success or failure
  }
};

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7030/api/FiPostSanction/GetFiReadyForNeft`, {
          params: {
            Creator: creator,
            Branch: branchCode,
            GroupCode: groupCode,
            pageSize: 15,
            pageNumber: 1,
            fromDate:fromDate,
            toDate:toDate,
          }
        }
      );
      if (response.status === 200) {
        setData(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = () => {
    fetchData();
  };
  const tableCellStyle = {
    background: '#FF4C4C',
    padding: '10px 16px',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  };
  return (
    <div>
          <Card>
            <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
              <Grid item xs={6} container justifyContent="start">
                <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
                  Ready For Audit
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="medium">
                  <InputLabel>Search By</InputLabel>
                  <Select value={filterOption} onChange={handleFilterChange} label="Search By" size="medium">
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="ficode">Creator</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {filterOption === 'date' && (
                <>
                  <Grid item xs={12} sm={6} md={2}>
                    <TextField
                      fullWidth
                      label="From Date"
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <TextField
                      fullWidth
                      label="To Date"
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      size="medium"
                    />
                  </Grid>
                </>
              )}
              {filterOption === 'ficode' && (
                <>
                  <Grid item xs={12} sm={6} md={2}>
                     <FormControl fullWidth size="medium">
                    <InputLabel>Creator</InputLabel>
                    <Select
                      label="Creator"
                      size="medium"
                      value={creator}
                      onChange={handleCreatorChange}
                    >
                      {Creatorlist.map((index) => (
                        <MenuItem key={index.creatorid} value={index.creator}>
                          {index.creator}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <TextField
                      fullWidth
                      label="Branch Code"
                      variant="outlined"
                      size="medium"
                      value={branchCode}
                      onChange={(e) => setBranchCode(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <TextField
                      fullWidth
                      label="Group Code"
                      variant="outlined"
                      size="medium"
                      value={groupCode}
                      onChange={(e) => setGroupCode(e.target.value)}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={8} md={2}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      fontWeight: 'bold',
                      bgcolor: 'primary.main',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                    fullWidth
                    startIcon={<SearchIcon />}
                    onClick={handleSearch}
                  >
                    SEARCH
                  </Button>
              </Grid>
            </Grid>
            

            <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {[
                      'SNo.',
                      'SmCode',
                      'ficode',
                      'Creator',
                      'Group',
                      'Branch',
                      'Name',
                     // 'dealerVehicleType',
                     // 'verify',
                      //'loanDuration',
                      //'Loan Amount',
                      //'Document Present',
                      //'Account',
                      'SchCode',
                      'Date',
                      'A/C Verify',
                       'Model/Brand',
                      'Pinfo',
                      'Income',
                      'Doc',
                      'Document',
                      'Action',
                    ].map((header, index) => (
                      <TableCell sx={tableCellStyle} key={index}>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={16} sx={{ textAlign: 'center' }}>Loading...</TableCell>
                    </TableRow>
                  ) : (
                    data.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.smCode}</TableCell>
                        <TableCell>{row.fiCode}</TableCell>
                        <TableCell>{row.creator}</TableCell>
                        <TableCell>{row.groupCode}</TableCell>
                        <TableCell>{row.branch || '-'}</TableCell>
                        <TableCell>{row.fullName}</TableCell>
                        <TableCell>{row.schCode || '-'}</TableCell>
                        <TableCell>{row.createdOn || '-'}</TableCell>
                        <TableCell>{row.verify || '-'}</TableCell>
                        <TableCell>{row.model || '-'}</TableCell>
                        {/* <TableCell>{row.total || '-'}</TableCell> */}
                                  <TableCell align="center">
                      <Button
                          variant="contained"
                          color="red"
                          backgroundColor="none"
                          onClick={() => {
                              
                              if (row?.fiCode && row?.creator) {
                                  console.log('Row Data:', row);  
                                  handlePersonalInfoClick(row.fiCode.toString(), row.creator);
                              } else {
                                  console.error('Missing FiCode or Creator in row:', row);
                              }
                          }}
                          disabled={loading} 
                      >
                          {loading ? 'Loading...' : <PreviewIcon/>}
                      </Button>
                  </TableCell>
                       
                        <TableCell align="center">
                      <Button
                          variant="contained"
                          color="red"
                          onClick={() => {
                              
                              if (row?.fiCode && row?.creator) {
                                  console.log('Row Data:', row);  
                                  handleIncomeClick(row.fiCode.toString(), row.creator);
                              } else {
                                  console.error('Missing FiCode or Creator in row:', row);
                              }
                          }}
                          disabled={loading} 
                      >
                           {loading ? 'Loading...' : <PreviewIcon/>}
                      </Button>
                  </TableCell>
                  <TableCell align="center">
                      <Button
                          variant="contained"
                          color="red"
                          
                          onClick={() => {
                              
                              if (row?.fiCode && row?.creator) {
                                  console.log('Row Data:', row);  
                                  handleDocClick(row.fiCode.toString(), row.creator);
                              } else {
                                  console.error('Missing FiCode or Creator in row:', row);
                              }
                          }}
                          disabled={loading} 
                      >
                         {loading ? 'Loading...' : <PreviewIcon/>}
                      </Button>
                  </TableCell>

                  <TableCell align="center">
                      <Button
                          variant="contained"
                          color="red"
                          onClick={() => {
                              
                              if (row?.fiCode && row?.creator) {
                                  console.log('Row Data:', row);  
                                  handleLoanAgreement(row.fiId);
                              } else {
                                  console.error('Missing FiCode or Creator in row:', row);
                              }
                          }}
                          disabled={loading} 
                      >
                          {loading ? 'Loading...' : <FileDownloadIcon/>}
                      </Button>
                      <Button
                          variant="contained"
                          color="red"
                          onClick={() => {
                              if (row?.fiCode && row?.creator) {
                                  console.log('Row Data:', row);
                                  handleGetAllDocModelOpen(row.fiCode.toString(), row.creator);
                              } else {
                                  console.error('Missing FiCode or Creator in row:', row);
                              }
                          }}
                          disabled={loading}
                      >
                          {loading ? 'Loading...' : <PreviewIcon/>}
                      </Button>
                  </TableCell>

                       
                       
                        <TableCell align="center"> 
                          {/* <Button
                                                                color="primary"
                                                                onClick={() => {
                                                                    if (row?.fiCode && row?.creator) {
                                                                        console.log("Row Data:", row); // Debugging row data
                                                                        handleSentToNeft(row.fiCode.toString(), row.creator);
                                                                    } else {
                                                                        console.error("Missing FICode or Creator in row:", row);
                                                                    }
                                                                }}
                                                                sx={{ fontSize: "9px", display: 'flex', alignItems: 'center' }}
                                                            >
                                                              
                                                            </Button> */}
                                                             <Button
                                                          variant="contained"
                                                          color="red"
                                                          onClick={() => {
                                                              if (row?.fiCode && row?.creator) {
                                                                  console.log('Row Data:', row);
                                                                  handleSentToNeft(row.fiCode.toString(), row.creator);
                                                              } else {
                                                                  console.error('Missing FiCode or Creator in row:', row);
                                                              }
                                                          }}
                                                          disabled={loading}
                                                      >
                                                          {loading ? 'Loading...' : <CheckIcon />}
                                                      </Button>
                                                      <Button
                                                          variant="contained"
                                                          color="red"
                                                          onClick={() => {
                                                              if (row?.fiCode && row?.creator) {
                                                                  console.log('Row Data:', row);
                                                                  handleSentToBranch(row.fiCode.toString(), row.creator);
                                                              } else {
                                                                  console.error('Missing FiCode or Creator in row:', row);
                                                              }
                                                          }}
                                                          disabled={loading}
                                                      >
                                                          {loading ? 'Loading...' : <ArrowBackIcon/>}
                                                      </Button>
                                                      

                                                            </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          <Modal
                open={pinInfopen}
                onClose={() => setPinInfopen(false)}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                        width: "80%",
                        maxHeight: "80%",
                        overflowY: "auto",
                        padding: "16px",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            marginBottom: "16px",
                            textAlign: "center",
                            color: "#D32F2F",
                        }}
                    >
                        Personal Information
                    </Typography>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {[
                                        "S.NO",
                                        "Name",
                                        "Address",
                                        "Mob",
                                        "AC No",
                                        "Bank",
                                        "Creator",
                                        "Code",
                                        "Amt",
                                        "Duration",
                                        "Gender",
                                        "Religion",
                                    ].map((header) => (
                                        <TableCell
                                            key={header.replace(/\s/g, "_")}
                                            sx={{
                                                fontWeight: "bold",
                                                textTransform: "uppercase",
                                                background: "linear-gradient(90deg, #FF4C4C, #FF7F7F)",
                                                color: "white",
                                                textAlign: "center",
                                            }}
                                        >
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedRowData ? (
                                    <TableRow>
                                        <TableCell sx={{ textAlign: 'center' }}>1</TableCell>
                                        <TableCell>{selectedRowData.fullName || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.address || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.phoneNo || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.accNo || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.bankName || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.creator || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.fiCode || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.loanAmount || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.loanDuration || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.gender || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.religion || 'N/A'}</TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={13} align="center">
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ textAlign: "center", marginTop: "16px" }}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setPinInfopen(false)} // Close modal
                            sx={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                padding: "8px 16px",
                            }}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={IncomeDataopen}
                onClose={() => setIncomeopen(false)}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                        width: "80%",
                        maxHeight: "80%",
                        overflowY: "auto",
                        padding: "16px",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            marginBottom: "16px",
                            textAlign: "center",
                            color: "#D32F2F",
                        }}
                    >
                        Income  Information
                    </Typography>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {[
                                        "S.NO",
                                        "fullName",
                                        "ifsc",
                                        "Rent",
                                        "Fooding",
                                        "Education",
                                        "Health",
                                        "Travelling",
                                        "Entertainment",
                                        "Others",
                                        "Income",
                                    ].map((header) => (
                                        <TableCell
                                            key={header.replace(/\s/g, "_")}
                                            sx={{
                                                fontWeight: "bold",
                                                textTransform: "uppercase",
                                                background: "linear-gradient(90deg, #FF4C4C, #FF7F7F)",
                                                color: "white",
                                                textAlign: "center",
                                            }}
                                        >
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedRowData ? (
                                    <TableRow>
                                        <TableCell sx={{ textAlign: 'center' }}>1</TableCell>
                                        <TableCell>{selectedRowData.fullName || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.ifsc || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.rent || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.fooding || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.education || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.health || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.travelling || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.entertainment || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.others || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.income || 'N/A'}</TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={11} align="center">
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>


                        </Table>
                    </TableContainer>

                    <Box sx={{ textAlign: "center", marginTop: "16px" }}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setIncomeopen(false)} // Close modal
                            sx={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                padding: "8px 16px",
                            }}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Modal open={PronoteDocopen} onClose={() => setPronoteDocopen(false)}>

<Box sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    width: "80%",
    maxHeight: "80%",
    overflowY: "auto",
    padding: "16px",
}}>

    <Typography variant="h6" sx={{
        fontWeight: "bold",
        marginBottom: "16px",
        textAlign: "center",
        color: "#D32F2F",
    }}>
        Document Information
    </Typography>

    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    {['S.NO', 'Creator', 'FiCode', 'Doc Name', 'Remarks', 'Action'].map((header, index) => (
                        <TableCell
                            key={header.replace(/\s/g, '_')}
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                background: 'linear-gradient(90deg, #FF4C4C, #FF7F7F)',
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            {header}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            {/* <TableBody>
                {selectedRowData ? (
                    selectedRowData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                            <TableCell>{item.Creator || 'N/A'}</TableCell>
                            <TableCell>{item.FiCode || 'N/A'}</TableCell>
                            <TableCell>{item.Document || 'N/A'}</TableCell>
                            <TableCell>{item.Remarks || 'N/A'}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                                <IconButton color="primary"
                                            onClick={() => handleViewDoc(item.DocName)}> 
                                    <VisibilityIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} align="center">
                            No data available
                        </TableCell>
                    </TableRow>
                )}
            </TableBody> */}
            <TableBody>
                                {selectedRowData ? (
                                    <TableRow>
                                        <TableCell sx={{ textAlign: 'center' }}>1</TableCell>
                                        <TableCell>{selectedRowData.creator || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.fiCode || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.docName || 'N/A'}</TableCell>
                                        <TableCell>{selectedRowData.remarks || 'N/A'}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                        {loading ? 'Loading...' : 'doc'}
                                {/* <IconButton color="primary"
                                            onClick={() => handleViewDoc(item.DocName)}> 
                                    <VisibilityIcon />
                                </IconButton> */}
                            </TableCell>
                                        
                                    </TableRow>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={11} align="center">
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
            
        </Table>
    </TableContainer>

    <Box sx={{ textAlign: "center", marginTop: "16px" }}>
        <Button variant="contained" color="error" onClick={() => setPronoteDocopen(false)}> {/* Close modal button */}
            Close
        </Button>
    </Box>
</Box>
</Modal>

    <Modal open={GetAllDocopen} onClose={handleGetAllDocClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          width: '50%',
          padding: '16px',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            marginBottom: '16px',
            textAlign: 'center',
            color: '#1976D2',
          }}
        >
          Documents
        </Typography>
        
        {/* Display FiCode and Creator from the selected row */}
        {/* {selectedRow && (
          <>
            <Typography>FiCode: {selectedRow.FiCode}</Typography>
            <Typography>Creator: {selectedRow.Creator}</Typography>
          </>
        )} */}
        
        {/* Document Tabs */}
        <Card variant="outlined" sx={{ height: { xs: "400px", sm: "500px", md: "550px" }, display: "flex", flexDirection: "column", overflow: "hidden", marginTop: '16px' }}>
            <Tabs
                value={selectedType}
                onChange={(event, newValue) => setSelectedType(newValue)}
                textColor="primary"
                indicatorColor="primary"
                sx={{ mb: 1 }}
            >
                <Tab label="Borrower Documents" value="borrower" />
                <Tab label="Co-Borrower Documents" value="co-borrower" />
            </Tabs>
            <Box sx={{ flexGrow: 1, overflowY: "auto", padding: '10px' }}>
                <List>
                    {loading ? (
                        <ListItem>
                            <ListItemText primary="Loading..." />
                        </ListItem>
                    ) : (
                        filteredDocuments.length > 0 ? (
                            filteredDocuments.map((doc, index) => (
                                <ListItem key={index} divider>
                                    <ListItemIcon sx={{ color: doc.filePath ? "green" : "red", minWidth: "40px" }}>
                                        <Description />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            doc.filePath ? (
                                                <Link
                                                    onClick={() => handleOpenModal(doc)} // Define handleOpenModal function for functionality
                                                    sx={{ cursor: "pointer", color: "green", textDecoration: "underline", fontWeight: 'bold' }}
                                                >
                                                    {doc.docName}
                                                </Link>
                                            ) : (
                                                doc.docName
                                            )
                                        }
                                        secondary={doc.docFilePath ? `File Path: ${doc.docFilePath}` : "File not available"}
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText primary="No documents found." />
                            </ListItem>
                        )
                    )}
                </List>
            </Box>
        </Card>

        <Box sx={{ textAlign: 'center', marginTop: '16px' }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleGetAllDocClose} // Close the modal
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              padding: '8px 16px',
              marginLeft: '8px',
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
          
          
    <Modal open={BackToNeftopen} onClose={() => setBackToNeftopen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                        width: "50%",
                        padding: "16px",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            marginBottom: "16px",
                            textAlign: "center",
                            color: "#1976D2",
                        }}
                    >
                        Update Remarks
                    </Typography>

                    {/* Hidden fields */}
                    <input type="hidden" value={selectedDataBranch.FiCode} id="ficode" />
                    <input type="hidden" value={selectedDataBranch.Creator} id="creator" />

                    {/* Display hidden field values */}
                    <Typography>FiCode: {selectedDataBranch.FiCode}</Typography>
                    <Typography>Creator: {selectedDataBranch.Creator}</Typography>

                    {/* Textarea for remarks */}
                    <textarea
                        className="form-control"
                        id="remark"
                        name="remark"
                        rows={4}
                        style={{ width: "100%", marginTop: "16px" }}
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                    ></textarea>

                    {/* Buttons */}
                    <Box sx={{ textAlign: "center", marginTop: "16px" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={SaveBackNeftToBranch}
                            sx={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                padding: "8px 16px",
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => setBackToNeftopen(false)}
                            sx={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                padding: "8px 16px",
                                marginLeft: "8px",
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
            {/* Modal to display PDF */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedDocument?.docName}</DialogTitle>
        <DialogContent>
          {/* If there's a PDF URL, display it in an iframe */}
          {selectedDocument?.filePath && (
            <iframe
              src={`https://predeptest.paisalo.in:8084${selectedDocument.filePath.split(':').pop()}`}
              style={{ width: '100%', height: '500px', border: 'none' }}
              title="Document Preview"
            />
          )}
          {!selectedDocument?.filePath && <p>File not available to view.</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    
    </div>
  );
};
export default ReadyForAudit;