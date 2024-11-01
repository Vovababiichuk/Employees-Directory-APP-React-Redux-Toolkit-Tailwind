import { Link } from 'react-router-dom';
import { EmployeeTypes } from '@/entities/employee/types';

const EmployeeCard = ({ id, name, avatar, position, tag }: EmployeeTypes) => {
  return (
    <Link to={`/employees/${id}`} className="flex items-center gap-4" key={name}>
      <img className="rounded-full object-cover w-[72px] h-[72px]" src={avatar} alt="Avatar" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <span className="font-medium">{name}</span>
          <span className="text-primary-gray text-sm">{tag}</span>
        </div>
        <span className="text-[13px] text-secondary-gray">{position}</span>
      </div>
    </Link>
  );
};

export default EmployeeCard;
