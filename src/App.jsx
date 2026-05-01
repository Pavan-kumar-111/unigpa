import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Universities from './pages/Universities';
import OUHome from './pages/OU/OUHome';
import OUMCA from './pages/OU/OUMCA';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/universities/ou" element={<OUHome />} />
            <Route path="/universities/ou/mca" element={<OUMCA />} />
            
            {/* Under Development Routes */}
            <Route path="/universities/ou/mba" element={<NotFound type="under-development" />} />
            <Route path="/universities/ou/degree" element={<NotFound type="under-development" />} />
            
            <Route path="/about" element={<About />} />
            
            {/* 404 Fallback */}
            <Route path="*" element={<NotFound type="404" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
