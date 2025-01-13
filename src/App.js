import { ColorModeContext, useMode } from "./theme";
import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./scenes/global/TopBar";
import Dashboard from "./scenes/dashboard";
import Role from "./scenes/masters/role";
import Sidebar from "./scenes/global/SideBar";
import LandingPage from "./scenes/LandingPage";
import { Outlet } from "react-router-dom";

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
            {/* Add more routes with sidebar here */}
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
