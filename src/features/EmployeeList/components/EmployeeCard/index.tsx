import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '@/common/store/store';
import { formatDate, SortOptions } from '@/common/utils/utils';
import { EmployeeTypes } from '@/entities/employee/types';

interface EmployeeCardProps extends EmployeeTypes {
  isLastInGroup: boolean;
}

const EmployeeCard = ({
  id,
  name,
  avatar,
  position,
  tag,
  birthDate,
  isLastInGroup,
}: EmployeeCardProps) => {
  const { sortOption } = useSelector((state: RootState) => state.employees);

  const birthDateFormatted = birthDate ? formatDate(birthDate, 'd MMM') : '';
  const birthYearFormatted = birthDate ? formatDate(birthDate, 'yyyy') : '';

  return (
    <div className="hover:bg-primary-input-bg transition-colors duration-200">
      {sortOption === SortOptions.BIRTHDATE && isLastInGroup && (
        <div className="flex items-center my-4">
          <Divider sx={{ flexGrow: 1, mr: 6 }} />
          <span className="text-secondary-gray text-sm">{birthYearFormatted}</span>
          <Divider sx={{ flexGrow: 1, ml: 6 }} />
        </div>
      )}
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
        {sortOption === SortOptions.BIRTHDATE && (
          <div className="text-sm text-secondary-gray">{birthDateFormatted}</div>
        )}
      </Link>
    </div>
  );
};

export default EmployeeCard;
