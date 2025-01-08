import { ColorModeContext, useMode } from "../../theme";
 
import { CssBaseline, ThemeProvider } from "@mui/material";  
 import TopBar from "../global/TopBar";
import Sidebar from "../global/SideBar";
  
function Dashboard() {
   const [theme, colorMode] = useMode();
 
  return (

<ColorModeContext.Provider value={colorMode}>
<ThemeProvider theme={theme}>
    <CssBaseline />
  <div className="app">
  <Sidebar />
    <main className="content">
    <TopBar/>

 
     
    </main>
  </div>
</ThemeProvider>
</ColorModeContext.Provider>
   
  );
}

export default Dashboard;