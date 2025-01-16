import { ColorModeContext, useMode } from "../../theme";
import { Suspense } from "react";
import { Route,Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";  
 import TopBar from "../global/TopBar";
import Sidebar from "../global/SideBar";
import role from "../../scenes/masters/role";
  
function Dashboard() {
   const [theme, colorMode] = useMode();
 
  return (

<ColorModeContext.Provider value={colorMode}>
<ThemeProvider theme={theme}>
    <CssBaseline />
  <div className="app">
    <main className="content">
    {/* <TopBar/> */}

    
     
    </main>
  </div>
</ThemeProvider>
</ColorModeContext.Provider>
   
  );
}

export default Dashboard;