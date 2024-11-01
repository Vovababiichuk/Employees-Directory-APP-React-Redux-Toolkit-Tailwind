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
    <ul className="flex flex-col gap-4">
      {employees.map(employee => (
        <li className="flex items-center gap-4" key={employee.name}>
          <img
            className="rounded-full object-cover w-[72px] h-[72px]"
            src={employee.avatar}
            alt="Avatar"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="font-medium">{employee.name}</span>
              <span className="text-primary-gray text-sm">{employee.tag}</span>
            </div>
            <span className="text-[13px] text-secondary-gray">{employee.position}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
