import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EmployeeTypes } from '@/entities/employee/types';
import { RootState } from '@/store/store';
import { formatDate } from '@/utils';

const EmployeeCard = ({ id, name, avatar, position, tag, birthDate }: EmployeeTypes) => {
  const { sortOption } = useSelector((state: RootState) => state.employees);

  const birthDateFormatted = birthDate ? formatDate(birthDate, 'd MMM') : '';

  return (
    <Link to={`/employees/${id}`} key={name} className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img className="rounded-full object-cover w-[72px] h-[72px]" src={avatar} alt="Avatar" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="font-medium">{name}</span>
            <span className="text-primary-gray text-sm">{tag}</span>
          </div>
          <span className="text-[13px] text-secondary-gray">{position}</span>
        </div>
      </div>
      {sortOption === 'birthdate' && (
        <div className="text-sm text-secondary-gray">{birthDateFormatted}</div>
      )}
    </Link>
  );
};

export default EmployeeCard;
