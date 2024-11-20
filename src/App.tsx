import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EmployeeProfile from './features/EmployeeProfile/index';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage/index';

const App = () => (
  <Router>
    <div className="bg-gray-200 min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees/:id" element={<EmployeeProfile />} />
        <Route path="*" element={<ErrorPage message="404 - Page Not Found" />} />
      </Routes>
    </div>
  </Router>
);

export default App;
