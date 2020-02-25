import { useEffect, useReducer, useState } from 'react';

const dataFetchReducer = (state, { type, error }) => {
  switch (type) {
    case 'fetching': {
      return {
        ...state,
        fetching: true,
        success: false,
        error: null,
      };
    }
    case 'fetched': {
      return {
        ...state,
        fetching: false,
        success: true,
        error: null,
      };
    }
    case 'error': {
      return {
        ...state,
        fetching: false,
        success: false,
        error,
      };
    }
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};

const usePost = ({ url, data, content = 'application/json' }) => {
  const [send, setSend] = useState(false);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    fetching: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    if (send) {
      dispatch({ type: 'fetching' });

      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': content },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (!response.ok) {
            dispatch({
              type: 'error',
              error: `${response.status} - ${response.type}`,
            });

            return;
          }

          dispatch({ type: 'fetched' });
        })
        .catch(error => dispatch({ type: 'error', error }));
    }

    const cleanup = () => setSend(false);

    return cleanup();
  }, [send, url, data]);

  return [state, setSend];
};

export default usePost;
