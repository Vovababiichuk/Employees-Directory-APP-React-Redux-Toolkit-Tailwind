import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { compareAsc } from 'date-fns';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeeTypes } from '@/entities/employee/types';
import EmployeeCard from '@/features/EmployeeList/components/EmployeeCard';
import ErrorPage from '@/pages//ErrorPage';
import { fetchEmployees } from '@/store/EmployeesSlice';
import { AppDispatch, RootState } from '@/store/store';
import { Statuses } from '@/utils';

const EmployeeList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, status, error, searchQuery, positionFilter, sortOption } = useSelector(
    (state: RootState) => state.employees,
  );

  useEffect(() => {
    if (status === Statuses.IDLE) dispatch(fetchEmployees());
  }, [status, dispatch]);

  const filteredEmployees = employees.list.filter((employee: EmployeeTypes) => {
    const searchMatches = [employee.name, employee.email, employee.tag].some(field =>
      field.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const positionMatches =
      positionFilter === 'All' || employee.position.toLowerCase() === positionFilter.toLowerCase();

    return searchMatches && positionMatches;
  });

  const sortedEmployees = filteredEmployees.sort((a: EmployeeTypes, b: EmployeeTypes) => {
    if (sortOption === 'alphabetical') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'birthdate') {
      return compareAsc(new Date(a.birthDate), new Date(b.birthDate));
    }
    return 0;
  });

  return (
    <ul className="flex flex-col gap-4">
      {status === Statuses.LOADING ? (
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
      ) : status === Statuses.FAILED ? (
        <ErrorPage message={error || 'Failed to load employee data'} />
      ) : filteredEmployees.length === 0 ? (
        <ErrorPage message="Try to adjust your request" />
      ) : (
        sortedEmployees.map(employee => <EmployeeCard key={employee.id} {...employee} />)
      )}
    </ul>
  );
};

export default EmployeeList;
