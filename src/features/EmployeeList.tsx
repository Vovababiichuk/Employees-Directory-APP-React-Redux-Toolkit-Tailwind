import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../store/EmployeesSlice';
import { AppDispatch, RootState } from '../store/store';

const EmployeeList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector((state: RootState) => state.employees.employees);
  const status = useSelector((state: RootState) => state.employees.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [dispatch, status]);

  return (
    <div>
      {employees.map(employee => (
        <div key={employee.id}>
          <p>{employee.name}</p>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
