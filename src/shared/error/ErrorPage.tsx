import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2">Unexpected error occurred...</h2>
      <span className="text-primary-gray mb-4">Try again a bit later</span>
      <Link className="text-primary-blue underline" to="/">
        Reload page
      </Link>
    </div>
  );
};

export default ErrorPage;
