import { useNavigate } from 'react-router-dom';
import FlyIcon from '/img/fly.png';
import SearchIcon from '/img/search.png';

type ErrorPageProps = {
  message: string;
};

const ErrorPage = ({ message }: ErrorPageProps) => {
  const navigate = useNavigate();
  const isNoEmployeesMessage = message === 'Try to adjust your request';

  return (
    <div className="flex flex-col items-center pt-[128px]">
      <img className="mb-2" src={isNoEmployeesMessage ? SearchIcon : FlyIcon} alt="Icon" />
      <h2 className="text-lg font-semibold mb-2">
        {isNoEmployeesMessage ? "We didn't find anyone" : 'Unexpected error occurred...'}
      </h2>
      <span className="text-primary-gray mb-4">{message}</span>
      {!isNoEmployeesMessage && (
        <button onClick={() => navigate('/')} className="text-primary-blue underline" type="button">
          Back to Main Page
        </button>
      )}
    </div>
  );
};

export default ErrorPage;
