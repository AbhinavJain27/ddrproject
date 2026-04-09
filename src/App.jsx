import './App.css'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar'
import PageOne from './pages/PageOne';
import PageTwo from './pages/PageTwo';
import PageThree from './pages/PageThree';
import PageFour from './pages/PageFour';
import PageFive from './pages/PageFive';
import PageSix from './pages/PageSix';
import PageSeven from './pages/PageSeven';
import AchieversPage from './pages/AchieversPage';
import CampaignsPage from './pages/CampaignsPage';
import ReportPlasticPage from './pages/ReportPlasticPage';
import StartCampaignPage from './pages/StartCampaignPage';
import AuthPage from './pages/AuthPage';
import Footer from './components/Footer';
import OffCanvas from './components/OffCanvas'
import ScrollToTop from './components/ScrollToTop';
import ScrollToHash from './components/ScrollToHash';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "linear-gradient(135deg, #eefaf1 0%, #ffffff 100%)",
          color: "#146c43",
          fontWeight: "700",
        }}
      >
        Checking your account...
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <ScrollToTop />
      <ScrollToHash />
      <OffCanvas />
      <div style={{ flex: 1, paddingBottom: "60px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/page1" element={<PageOne />} />
          <Route path="/page2" element={<PageTwo />} />
          <Route path="/page3" element={<PageThree />} />
          <Route path="/page4" element={<PageFour />} />
          <Route path="/page5" element={<PageFive />} />
          <Route path="/page6" element={<PageSix />} />
          <Route path="/page7" element={<PageSeven />} />
          <Route path="/achievers" element={<AchieversPage />} />
          <Route path="/reports" element={<ReportPlasticPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/campaigns/start" element={<StartCampaignPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
