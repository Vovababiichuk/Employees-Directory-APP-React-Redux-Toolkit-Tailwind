import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EmployeeProfile from './features/employees/EmployeeProfile';
import HomePage from './pages/home/HomePage';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-200">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees/:id" element={<EmployeeProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
