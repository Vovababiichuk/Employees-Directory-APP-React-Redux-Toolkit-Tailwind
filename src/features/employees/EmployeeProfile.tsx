// import Skeleton from '@mui/material/Skeleton';
import { differenceInYears, format } from 'date-fns';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEmployeeById } from '../../store/EmployeesSlice';
import { AppDispatch, RootState } from '../../store/store';
import PhoneIcon from '/icons/phone.svg';
import StarIcon from '/icons/star.svg';

const EmployeeProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const employee = useSelector((state: RootState) => state.employees.selectedEmployee);

  useEffect(() => {
    if (id) dispatch(fetchEmployeeById(id));
  }, [dispatch, id]);

  if (!employee) return <div>Loading...</div>;

  const { avatar, name, position, tag, birthDate, phone } = employee;

  const birthDateFormatted = format(new Date(birthDate), 'd MMMM yyyy');
  const age = differenceInYears(new Date(), new Date(birthDate));

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen">
      <div className="flex flex-col items-center text-center p-4 pt-16 pb-6 bg-primary-input-bg">
        <img className="rounded-full object-cover w-[124px] h-[124px]" src={avatar} alt="Avatar" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="font-medium text-2xl">{name}</span>
            <span className="text-primary-gray text-lg">{tag}</span>
          </div>
          <span className="text-base text-secondary-gray">{position}</span>
        </div>
      </div>
      <div className="flex flex-col gap-6 bg-white p-4 pt-6">
        <div className="flex justify-between">
          <span className="flex items-center gap-2">
            <img src={StarIcon} alt="Star icon" width={20} height={20} />
            {birthDateFormatted}
          </span>
          <span>{age} years</span>
        </div>
        <span className="flex items-center gap-2">
          <img src={PhoneIcon} alt="Phone icon" width={20} height={20} />
          {phone}
        </span>
      </div>
    </div>
  );
};

export default EmployeeProfile;
