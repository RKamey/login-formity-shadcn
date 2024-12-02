import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useEffect } from 'react';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleReturn = () => navigate('/');

  useEffect(() => {
    console.error('Full Error Object:', error);

    if (isRouteErrorResponse(error)) {
      console.error('Route Error Details:', {
        status: error.status,
        statusText: error.statusText,
        data: error.data
      });
    }
  }, [error]);

  let errorMessage = 'An unexpected error occurred';
  let errorCode = '500';

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        errorMessage = 'Oops, This Page Not Found!';
        errorCode = '404';
        break;
      case 403:
        errorMessage = 'Access Forbidden';
        errorCode = '403';
        break;
      case 500:
        errorMessage = 'Internal Server Error';
        errorCode = '500';
        break;
      default:
        errorMessage = error.statusText || 'An unexpected error occurred';
        errorCode = error.status.toString();
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
    console.error('Error Stack:', error.stack);
  }

  return (
    <div className='flex flex-col justify-center items-center h-96 gap-3'>
      <h1 className='text-7xl font-bold tracking-wider'>{errorCode}</h1>
      <h2 className='text-xl font-light text-slate-600'>{errorMessage}</h2>
      
      {import.meta.env.VITE_ENVIRONMENT === 'development' && (
        <div className='mt-4 p-4 bg-gray-100 rounded'>
          <h3 className='font-bold'>Technical Details:</h3>
          <pre className='text-xs text-left overflow-auto max-w-md'>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

      <div className='flex gap-4'>
        <Button 
          className='bg-black text-white hover:bg-black'
          onClick={handleReturn}
        >
          Ir al Inicio
        </Button>
        <Button 
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Recargar Página
        </Button>
      </div>
    </div>
  )
}

export default ErrorPage;