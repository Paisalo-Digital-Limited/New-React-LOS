 import { ColorModeContext, useMode } from "./theme";
 import { redirect, Route ,Routes} from "react-router-dom";
 import { CssBaseline, ThemeProvider } from "@mui/material";  
 import TopBar from "./pages/global/TopBar";
 import Dashboard from "./pages/dashboard";
 import AddCreator from  "./pages/mastercreator/creator";
 import VehicleDetails from './pages/vheicle/vheicle';
 import LandingPage from "./pages/LandingPage";
 import BranchMaster from "./pages/branchmaster/branchmaster";
function App() {
  const [theme, colorMode] = useMode();
 
  return (
<ColorModeContext.Provider value={colorMode}>
    <CssBaseline />
      {/* <TopBar />
      <Dashboard/> */}
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/vehicle" element={<VehicleDetails />} />
        <Route path="/mastercreator" element={<AddCreator/>} />
        <Route path="/branchmaster" element={<BranchMaster/>} />
      </Routes>
</ColorModeContext.Provider>

   
  );
}

export default App;
