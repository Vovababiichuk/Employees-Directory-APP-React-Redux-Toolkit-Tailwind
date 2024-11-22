import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { compareAsc, getYear } from 'date-fns';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setQueryParams } from '@/common/store/EmployeesSlice';
import { AppDispatch, RootState } from '@/common/store/store';
import { fetchEmployees } from '@/common/utils/gateway';
import { SortOptions, Statuses } from '@/common/utils/utils';
import { EmployeeTypes, QueryParamsState } from '@/entities/employee/types';
import EmployeeCard from '@/features/EmployeeList/components/EmployeeCard';
import ErrorPage from '@/pages/ErrorPage';

const EmployeeList = ({ currentTab }: { currentTab: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, status, error } = useSelector((state: RootState) => state.employees);
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search')?.toLowerCase() || '';
  const sort = searchParams.get('sort')?.toLowerCase() || SortOptions.ALPHABETICAL;
  const tab = searchParams.get('tab')?.toLowerCase() || '';

  useEffect(() => {
    if (status === Statuses.IDLE) {
      dispatch(fetchEmployees());
    }

    const queryParams: QueryParamsState = {
      tab,
      sort,
      search,
    };

    dispatch(setQueryParams(queryParams));
  }, [dispatch, status, searchParams, sort, search, tab]);

  const filteredEmployees = useMemo(() => {
    return employees.list.filter((employee: EmployeeTypes) => {
      const searchMatches = [employee.name, employee.email, employee.tag].some(field =>
        field.toLowerCase().includes(search),
      );
      const positionMatches =
        currentTab === 'all' || employee.position.toLowerCase() === currentTab.replace(/s$/, '');
      return searchMatches && positionMatches;
    });
  }, [employees.list, search, currentTab]);

  const sortedEmployees = useMemo(() => {
    return filteredEmployees.sort((a, b) =>
      sort === SortOptions.ALPHABETICAL
        ? a.name.localeCompare(b.name)
        : compareAsc(new Date(a.birthDate), new Date(b.birthDate)),
    );
  }, [filteredEmployees, sort]);

  const employeesWithLastInGroupFlag = sortedEmployees.map((employee, index, arr) => {
    const currentYear = getYear(new Date(employee.birthDate));
    const isLastInGroup =
      index === arr.length - 1 || getYear(new Date(arr[index + 1].birthDate)) !== currentYear;
    return { ...employee, isLastInGroup };
  });

  return (
    <ul className="flex flex-col gap-3 pt-6">
      {status === Statuses.LOADING ? (
        Array.from({ length: 10 }).map((_, idx) => (
          <Box key={idx} display="flex" alignItems="center" gap={2}>
            <Skeleton variant="circular" width={72} height={72} />
            <Box>
              <Skeleton width={150} height={20} />
              <Skeleton width={100} height={15} />
            </Box>
          </Box>
        ))
      ) : status === Statuses.FAILED ? (
        <ErrorPage message={error || 'Failed to load employees'} />
      ) : employeesWithLastInGroupFlag.length === 0 ? (
        <ErrorPage message="No employees found." />
      ) : (
        employeesWithLastInGroupFlag.map(employee => (
          <EmployeeCard key={employee.id} {...employee} sortOption={sort} />
        ))
      )}
    </ul>
  );
};

export default EmployeeList;
