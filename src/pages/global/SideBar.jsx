import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import image from "../../assets/user_logo.png"
import { useEffect } from "react";
import apiClient from "../../network/apiClient";
import { getStoredUserName ,getStoredDesignation} from "../../shared/utils/userDetails";


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };
  
  const buildMenuHierarchy = (data) => {
    debugger;
    // Initialize a map to store all menu items by their mainid
    const menuMap = {};
    const menuHierarchy = [];
  
    // Step 1: Create a map of all menu items
    data.forEach((menu) => {
      menu.subMenu = []; // Initialize subMenu array for each item
      menuMap[menu.mainid] = menu; // Map menu items by their mainid
    });
    debugger;
  
    // Step 2: Build the hierarchy
    data.forEach((menu) => {
      if (menu.parentId === 0) {
        // Add root-level menus (parentId === 0) to the hierarchy
        menuHierarchy.push(menu);
      } else if (menuMap[menu.parentId]) {
        // Add to the subMenu array of the parent
        menuMap[menu.parentId].subMenu.push(menu);
      }
    });
    debugger;
  
    return menuHierarchy;
  };

  const Sidebar = () => {
    const userName = getStoredUserName();
    const designation = getStoredDesignation();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [menuData, setMenuData] = useState([]);


    const fetchSideBarList = async () => {
      debugger;
      const response = await apiClient.get("/Menu/GetMenuData",{ requireAuth: true , checkTokenInResponse: false});
      
      if(response.data.statuscode=== 200){
        
       // const hierarchy = buildMenuHierarchy(response.data.data);
       debugger;

        showSideMenuBar(response.data.data);
        alert("Success:"+response.data.data);
      }else{
        
        alert("Error:"+response.data.message);
      }

    };

    const showSideMenuBar = (data) => {
      
      const formattedData = data.map((menu, index) => ({
        mainid: menu.mainid,
        parentId: menu.parentId,
        title: menu.title,
        pageUrl: menu.pageUrl,
        pageName: menu.pageName,
        icon: menu.icon,
        isActive: menu.isActive,
        isDeleted: menu.isDeleted,
        totalCount: menu.totalCount,
      }));
      
      const hierarchy = buildMenuHierarchy(formattedData);
      console.log(hierarchy);
      setMenuData(hierarchy);
    }
  
   
    const renderMenuItems = (menus) =>
      menus.map((menu) =>
        menu.subMenu && menu.subMenu.length > 0 ? (
          <SubMenu
            key={menu.mainid}
            title={menu.title} // Fallback to title if pageName is empty
            icon={<PeopleOutlinedIcon />} // Replace with dynamic icons based on menu data
          >
            {renderMenuItems(menu.subMenu)}
          </SubMenu>
        ) : (
          <MenuItem
            key={menu.mainid}
            icon={<HomeOutlinedIcon />} // Replace with dynamic icons based on menu data
            onClick={() => console.log(`Navigating to ${menu.pageUrl}`)}
          >
            { menu.title} {/* Fallback to title if pageName is empty */}
            <Link to={'/role' || "#"} />
          </MenuItem>
        )
      );
    useEffect(() => {
     
    fetchSideBarList()}, []);



  
    return (
      <Box
      sx={{
        height: "100vh", // Full viewport height
        display: "flex", // Flex container
        flexDirection: "column", // Vertical layout
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          color: colors.grey[400],
        },
        "& .pro-inner-item:hover": {
          color: "#db4f4a !important",
        },
        "& .pro-menu-item.active": {
          color: "#db4f4a !important",
        },
      }}
    >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : <MenuOutlinedIcon />}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[400],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
            
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
             
            {!isCollapsed && (
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
                    variant="h3"
                    color="#db4f4a"
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {userName}
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    {designation}
                  </Typography>
                </Box>
              </Box>
            )}
  
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>

            <Menu iconShape="square">
        {menuData.length > 0 ? renderMenuItems(menuData) : <div>No Menu Items</div>}
      </Menu>
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    );


    
     
  };
  
  export default Sidebar;
  