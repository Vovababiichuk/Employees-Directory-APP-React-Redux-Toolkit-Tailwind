import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom';
import ArrowLeftIcon from '/icons/arrow-left.svg';

const ProfileSkeleton = () => (
  <div className="max-w-6xl mx-auto bg-white min-h-screen">
    <div className="relative flex flex-col gap-4 items-center text-center p-4 pt-20 pb-6 bg-primary-input-bg">
      <Link
        to="/"
        className="absolute top-8 left-4 hover:scale-110 transition-transform duration-300"
      >
        <img src={ArrowLeftIcon} alt="Arrow left icon" width={10} height={10} />
      </Link>
      <Skeleton variant="circular" width={124} height={124} />
      <Skeleton width={150} height={30} />
      <Skeleton width={100} height={20} />
    </div>
    <div className="flex flex-col gap-10 bg-white p-4 pt-6">
      <div className="flex justify-between">
        <Skeleton width={150} height={20} />
        <Skeleton width={50} height={20} />
      </div>
      <Skeleton width={150} height={20} />
    </div>
  </div>
);

export default ProfileSkeleton;
