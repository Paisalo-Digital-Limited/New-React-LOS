import { ColorModeContext, useMode } from "./theme";
import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./pages/global/TopBar";
import Dashboard from "./pages/dashboard/dashboard";
import Role from "./pages/role/role";
import Sidebar from "./pages/global/SideBar";
import LandingPage from "./pages/LandingPage";
import { Outlet } from "react-router-dom";
import Menu from "./pages/menu";
import SanctionAmount from "./pages/sanctionamount";
import DocsUpload from "./pages/docsupload";
import ReadyForAudit from "./pages/audit";
import NeftDone from "./pages/neft";
import AddCreator from  "./pages/mastercreator/creator";
import VehicleDetails from './pages/vheicle/vheicle';
import BranchMaster from "./pages/branchmaster/branchmaster";


const SidebarLayout = () => (
  <div className="app">
    <Sidebar />
    <main className="content">
    <TopBar/>
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
            <Route path="/menu" element={<Menu />} />
            <Route path="/sanctionamount" element={<SanctionAmount />} />
            <Route path="/docsupload" element={<DocsUpload />} />
            <Route path="/readyforaudit" element={<ReadyForAudit />} />
            <Route path="/neftdone" element={<NeftDone />} />
            <Route path="/vehicle" element={<VehicleDetails />} />
            <Route path="/mastercreator" element={<AddCreator/>} />
            <Route path="/branchmaster" element={<BranchMaster/>} />
            {/* <Route path="/role" element={<Role/>} /> */}
            {/* Add more routes with sidebar here */}
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
