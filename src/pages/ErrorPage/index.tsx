import { useRouteError } from 'react-router-dom';
import { ErrorContainer } from './styles';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <ErrorContainer id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </ErrorContainer>
  );
};

export default ErrorPage;
