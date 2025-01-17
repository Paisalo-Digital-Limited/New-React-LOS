import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import image from "../../assets/logo.png";
import apiClient from "../../network/apiClient";
import "./Sidebar.css";

const Item = ({ title, to, icon, selected, setSelected }) => {
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: "grey", // Static color
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
    const menuMap = {};
    const menuHierarchy = [];

    data.forEach((menu) => {
        menu.subMenu = [];
        menuMap[menu.mainid] = menu;
    });

    data.forEach((menu) => {
        if (menu.parentId === 0) {
            menuHierarchy.push(menu);
        } else if (menuMap[menu.parentId]) {
            menuMap[menu.parentId].subMenu.push(menu);
        }
    });

    return menuHierarchy;
};

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [menuData, setMenuData] = useState([]);

    const fetchSideBarList = async () => {
        const response = await apiClient.get("/Menu/GetMenuData", { requireAuth: true, checkTokenInResponse: false });
    
        if (response.data.statuscode === 200) {
            showSideMenuBar(response.data.data);
        } else {
            // Handle error case
        }
    };

    const showSideMenuBar = (data) => {
        const formattedData = data.map((menu) => ({
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
    };

    const renderMenuItems = (menus) =>
        menus.map((menu) =>
            menu.subMenu && menu.subMenu.length > 0 ? (
                <SubMenu
                    key={menu.mainid}
                    title={menu.title}
                    icon={<PeopleOutlinedIcon />}
                >
                    {renderMenuItems(menu.subMenu)}
                </SubMenu>
            ) : (
                <MenuItem
                    key={menu.mainid}
                    icon={<HomeOutlinedIcon />}
                    onClick={() => console.log(`Navigating to ${menu.pageUrl}`)}
                >
                    {menu.title}
                    <Link to={'/role' || "#"} />
                </MenuItem>
            )
        );

    useEffect(() => {
        fetchSideBarList();
    }, []);

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                borderRight: '1px solid grey',
                "& .pro-sidebar-inner": {
                    background: "white !important",
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                    fontWeight: 'bold',
                    color: 'grey',
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
                            color: "grey", // Static color
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Box>
                                    <img
                                        alt="profile-user"
                                        width="100px"
                                        src={image}
                                        style={{ cursor: "pointer" }}
                                    />
                                </Box>
                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : ""}>
                        <Menu>
                            {menuData.length > 0 ? renderMenuItems(menuData) : <div>No Menu Items</div>}
                        </Menu>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;