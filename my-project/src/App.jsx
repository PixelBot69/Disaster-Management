import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

import SubmitReportForm from './components/SubmitReportForm';
import EmergencyRequestForm from './components/EmergencyRequestForm';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';



function App() {
    return (
        <Router>
            <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboards" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> {/* Add new route */}
          <Route path="/submit-report" element={<SubmitReportForm />} />
          <Route path="/emergency-request" element={<EmergencyRequestForm />} /> 
                
               
            </Routes>
        </Router>
    );
}

export default App;
