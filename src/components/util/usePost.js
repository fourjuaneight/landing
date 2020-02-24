import { useEffect, useReducer } from 'react';
import { post } from 'axios';

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
  const [state, dispatch] = useReducer(dataFetchReducer, {
    fetching: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: 'fetching' });
      post(url, data, {
        headers: {
          'Content-Type': content,
        },
      })
        .then(() => dispatch({ type: 'fetched' }))
        .catch(error => dispatch({ type: 'error', error }));
    }
  }, [url, data]);

  return state;
};

export default usePost;
