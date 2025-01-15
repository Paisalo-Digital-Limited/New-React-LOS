import { ColorModeContext, useMode } from "./theme";
import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./pages/global/TopBar";
import Dashboard from "./pages/dashboard/index";
import Role from "./scenes/masters/role/index";
import Sidebar from "./pages/global/SideBar";
import LandingPage from "./pages/LandingPage";
import { Outlet } from "react-router-dom";
import AddCreator from  "./pages/mastercreator/creator";
import VehicleDetails from './pages/vheicle/vheicle';
import BranchMaster from "./pages/branchmaster/branchmaster";

const SidebarLayout = () => (
  <div className="app">
    <Sidebar />
    <main className="content">
      <Outlet />
    </main>
  </div>
);

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Routes without sidebar */}
          <Route path="/" element={<LandingPage />} />

          {/* Routes with sidebar */}
          <Route element={<SidebarLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/role" element={<Role />} />
            <Route path="/vehicle" element={<VehicleDetails />} />
        <Route path="/mastercreator" element={<AddCreator/>} />
        <Route path="/branchmaster" element={<BranchMaster/>} />
            {/* Add more routes with sidebar here */}
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
