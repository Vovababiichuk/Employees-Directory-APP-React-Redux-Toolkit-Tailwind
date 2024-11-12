import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '@/common/store/store';
import { fetchEmployeeById } from '@/common/utils/gateway';
import { calculateAge, formatDate, Statuses } from '@/common/utils/utils';
import ProfileSkeleton from '@/features/EmployeeProfile/components/SkeletonProfile';
import ErrorPage from '@/pages/ErrorPage/index';
import ArrowLeftIcon from '/icons/arrow-left.svg';
import PhoneIcon from '/icons/phone.svg';
import StarIcon from '/icons/star.svg';

const EmployeeProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { status, error, employees } = useSelector((state: RootState) => state.employees);
  const { selected } = employees;

  useEffect(() => {
    if (id) dispatch(fetchEmployeeById(id));
  }, [dispatch, id]);

  const { name, avatar, position, tag, birthDate, phone } = selected || {};

  const birthDateFormatted = birthDate ? formatDate(birthDate, 'd MMMM yyyy') : '';
  const age = calculateAge(birthDate);

  return (
    <div className="max-w-7xl mx-auto bg-white min-h-screen">
      {status === Statuses.LOADING ? (
        <ProfileSkeleton />
      ) : status === Statuses.FAILED ? (
        <ErrorPage message={error || 'Failed to load employee data'} />
      ) : (
        <div>
          <div className="relative flex flex-col gap-4 items-center text-center p-4 pt-[72px] pb-5 bg-primary-input-bg">
            <Link
              to="/"
              className="absolute top-6 left-8 hover:scale-110 transition-transform duration-300"
            >
              <img src={ArrowLeftIcon} alt="Arrow left icon" width={10} height={10} />
            </Link>
            <img
              className="rounded-full object-cover w-[104px] h-[104px] mb-2"
              src={avatar}
              alt="Avatar"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className="font-medium text-2xl">{name}</span>
                <span className="text-primary-gray text-lg">{tag}</span>
              </div>
              <span className="text-base text-secondary-gray">{position}</span>
            </div>
          </div>
          <div className="flex flex-col gap-10 bg-white p-4 pt-7">
            <div className="flex justify-between mb-2">
              <span className="flex items-center gap-2">
                <img src={StarIcon} alt="Star icon" width={20} height={20} />
                {birthDateFormatted}
              </span>
              <span className="text-[15px] text-secondary-gray">{age} years</span>
            </div>
            <span className="flex items-center gap-2">
              <img src={PhoneIcon} alt="Phone icon" width={20} height={20} />
              {phone}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;
