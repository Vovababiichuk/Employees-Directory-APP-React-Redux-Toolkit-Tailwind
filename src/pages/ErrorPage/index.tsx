import FlyIcon from '/img/fly.png';
import SearchIcon from '/img/search.png';

const ErrorPage = ({ message }: { message: string }) => {
  const isNoEmployeesMessage = message === 'Try to adjust your request';

  const icon = isNoEmployeesMessage ? SearchIcon : FlyIcon;
  const title = isNoEmployeesMessage ? "We didn't find anyone" : 'Unexpected error occurred...';

  return (
    <div className="flex flex-col items-center pt-40">
      <img className="mb-2" src={icon} alt="Icon" />
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <span className="text-primary-gray mb-4">{message}</span>
      {!isNoEmployeesMessage && (
        <button
          onClick={() => window.location.reload()}
          className="text-primary-blue underline"
          type="reset"
        >
          Reload page
        </button>
      )}
    </div>
  );
};

export default ErrorPage;
