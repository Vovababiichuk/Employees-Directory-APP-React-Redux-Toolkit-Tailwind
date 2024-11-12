import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { compareAsc, getYear } from 'date-fns';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/common/store/store';
import { fetchEmployees } from '@/common/utils/gateway';
import { SortOptions, Statuses } from '@/common/utils/utils';
import { EmployeeTypes } from '@/entities/employee/types';
import EmployeeCard from '@/features/EmployeeList/components/EmployeeCard';
import ErrorPage from '@/pages/ErrorPage';

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
      positionFilter === 'All' ||
      employee.position.toLowerCase() === positionFilter.toLowerCase().replace(/s$/, '');

    return searchMatches && positionMatches;
  });

  const sortedEmployees = filteredEmployees.sort((a, b) =>
    sortOption === SortOptions.ALPHABETICAL
      ? a.name.localeCompare(b.name)
      : compareAsc(new Date(a.birthDate), new Date(b.birthDate)),
  );

  const employeesWithLastInGroupFlag = sortedEmployees.map((employee, index, arr) => {
    const currentYear = getYear(new Date(employee.birthDate));
    const isLastInGroup =
      index === arr.length - 1 || getYear(new Date(arr[index + 1].birthDate)) !== currentYear;
    return { ...employee, isLastInGroup };
  });

  return (
    <ul className="flex flex-col gap-3 mt-[-3px]">
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
        employeesWithLastInGroupFlag.map(employee => (
          <EmployeeCard key={employee.id} {...employee} isLastInGroup={employee.isLastInGroup} />
        ))
      )}
    </ul>
  );
};

export default EmployeeList;
