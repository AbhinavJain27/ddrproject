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
import Footer from './components/Footer';
import OffCanvas from './components/OffCanvas'
import ScrollToTop from './components/ScrollToTop';
import ScrollToHash from './components/ScrollToHash';

function App() {
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
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
