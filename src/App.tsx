import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EmployeeProfile from './features/EmployeeProfile/index';
import HomePage from './pages/HomePage/index';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-200 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees/:id" element={<EmployeeProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
