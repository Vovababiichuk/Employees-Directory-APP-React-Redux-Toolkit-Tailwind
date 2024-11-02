import FlyIcon from '/img/fly.png';

const ErrorPage = ({ message }: { message: string }) => {
  console.log('ErrorPage RENDER', message);
  return (
    <div className="flex flex-col items-center pt-40">
      <img src={FlyIcon} alt="" />
      <h2 className="text-lg font-semibold mb-2">Unexpected error occurred...</h2>
      <span className="text-primary-gray mb-4">{message}</span>{' '}
      <button
        onClick={() => window.location.reload()}
        className="text-primary-blue underline"
        type="reset"
      >
        Reload page
      </button>
    </div>
  );
};

export default ErrorPage;
