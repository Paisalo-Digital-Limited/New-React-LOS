import { Box, IconButton, InputBase, Typography, Popover, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SearchIcon from "@mui/icons-material/Search";
import { getStoredUserName ,getStoredDesignation, getStoredEmail} from "../../shared/utils/userDetails";
import image from "../../assets/satish.png"
import { getStoredPageName } from "../../shared/utils/authToken";
const TopBar = () => {
    
    const pageName = getStoredPageName();
    const userName = getStoredUserName();
    const designation = getStoredDesignation();
    const email = getStoredEmail();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    window.addEventListener('storage', () => {
        const h3Element = document.getElementById('pageNameTag');
        if (h3Element) {
           
            h3Element.textContent = getStoredPageName();
           
        }
    })
    // State to manage the popover visibility
    const [anchorEl, setAnchorEl] = useState(null);

    // User data for the profile (replace with your actual data)

    // Functions to handle the popover
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Box display="flex" justifyContent="space-between" p={2} sx={{ background: 'brown' }}>
            <div display="flex" backgroundColor={colors.grey[400]} borderRadius="3px">
                {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton> */}
                <h3 style={{color:"#fff"}} id="pageNameTag">{pageName}</h3>
            </div>
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleClick}>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>

            {/* Popover for user details */}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Box p={2} width={200} sx={{background:'white'}}>
                <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={image}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h6"
                    color="#db4f4a"
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {userName}
                  </Typography>
                  <Typography variant="h6" color={colors.greenAccent[500]}>
                    {designation}
                  </Typography>
                  <Typography variant="h6" color={colors.grey[500]}>
                    {email}
                  </Typography>
                </Box>
              </Box>
                </Box>
            </Popover>
        </Box>
    );
}

 

export default TopBar;
