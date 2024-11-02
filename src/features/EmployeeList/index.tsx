import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeCard from '@/features/EmployeeList/components/EmployeeCard';
import ErrorPage from '@/pages//ErrorPage';
import { fetchEmployees } from '@/store/EmployeesSlice';
import { AppDispatch, RootState } from '@/store/store';

const EmployeeList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, status, error, searchQuery, positionFilter } = useSelector(
    (state: RootState) => state.employees,
  );

  useEffect(() => {
    if (status === 'idle') dispatch(fetchEmployees());
  }, [status, dispatch]);

  const filteredEmployees = employees.filter(employee => {
    const searchMatches = [employee.name, employee.email, employee.tag].some(field =>
      field.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const positionMatches =
      positionFilter === 'All' || employee.position.toLowerCase() === positionFilter.toLowerCase();

    return searchMatches && positionMatches;
  });

  return (
    <ul className="flex flex-col gap-4">
      {status === 'loading' ? (
        Array(17)
          .fill(0)
          .map((_, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2}>
              <Skeleton variant="circular" width={72} height={72} />
              <Box>
                <Skeleton width={150} height={20} />
                <Skeleton width={100} height={15} />
              </Box>
            </Box>
          ))
      ) : status === 'failed' ? (
        <ErrorPage message={error || 'Failed to load employee data'} />
      ) : (
        filteredEmployees.map(employee => <EmployeeCard key={employee.name} {...employee} />)
      )}
    </ul>
  );
};

export default EmployeeList;
