import { Routes, Route, Outlet, useNavigate} from "react-router-dom";

import './App.css';
import StartPage from "./pages/StartPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import OPTVerification from "./pages/OPTVerification";
import SideBar from "./components/SideBar";
import AnalyticsPage from "./pages/AnalyticsPage";
import WriterPost from "./pages/WriterPost";
import Contents from "./pages/Contents";

function Layout() {
  // const navigate = useNavigate();
  // const user = false;
  // if(!user){
  //   navigate('/')
  // }
  return (
    <main>
      <Navbar/>
      <div className="flex gap-3">
        {/* left */}
        <div className="w-1/6 h-screen bg-slate-500">
          <SideBar/>
        </div>
        {/* right */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      {/* <Footer/> */}
    </main>
  );
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/contents" element={<Contents />} />
        <Route path="/writer" element={<WriterPost />} />
      </Route>
      <Route path="/auth" element={<StartPage/>}/>
      <Route path="/otp-verification" element={<OPTVerification/>}/>
    </Routes>
  );
}

export default App;
