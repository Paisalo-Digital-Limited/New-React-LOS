import { ColorModeContext, useMode } from "../../theme";
import { Suspense } from "react";
import { Route,Routes } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";  
 import TopBar from "../global/TopBar";
import Sidebar from "../global/SideBar";
 import Role from "../masters/role";
 import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../network/apiClient";
import '../../css/MainLayout.css'

 function MenuRoutes({ menuData }) {
  return (
    <Routes>
      {menuData.map((item) => {
        // debugger;
        if (item.pageUrl!=null &&item.pageUrl.length>0 && item.pageName!=null&& item.pageName.length>0) {
           
          return (
            <Route
              key={item.mainid}
              path={item.pageUrl}
              element={getDynamicElement(item.pageName)}
            />
          );
        }
        return null; // Skip items without pageUrl or pageName
      })}
    </Routes>
  );
}
 function getDynamicElement(element) {
  switch (element) {
    case "/dashboard":
      return <Dashboard />;
      break;
    case "Role Permission":
      return <Role />;
      break;
   
  }
}

function Dashboard() {
   const [theme, colorMode] = useMode();
    const [menuData, setMenuData] = useState([]);
   const fetchSideBarList = async () => {
  
    const response = await apiClient.get("/Menu/GetMenuData",{ requireAuth: true , checkTokenInResponse: false});
    
    if(response.data.statuscode=== 200){
      
     // const hierarchy = buildMenuHierarchy(response.data.data);

     setMenuData(response.data.data);

    
     }else{
      
     }

  };

   useEffect(() => {
     
    fetchSideBarList()}, []);


  return (

<ColorModeContext.Provider value={colorMode}>
<ThemeProvider theme={theme}>
    <CssBaseline />
  <div className="app">
    <main className="content">
      
   <TopBar />
        {/* <Routes>    
            <Route path="department" element={getDynamicElement("Role")} />
        </Routes> */}
    <Box sx={{  padding:2 }}>
      <MenuRoutes menuData={menuData} />
    </Box>
    
    </main>
  </div>
</ThemeProvider>
</ColorModeContext.Provider>
   
  );
}

export default Dashboard;