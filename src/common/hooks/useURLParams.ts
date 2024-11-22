import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setQueryParams } from '@/common/store/EmployeesSlice';
import { QueryParamsState } from '@/entities/employee/types';

export const useURLParams = (key: keyof QueryParamsState, defaultValue: string) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentValue = useCallback(() => {
    const params = new URLSearchParams(location.search);
    return params.get(key) || defaultValue;
  }, [location.search, key, defaultValue]);

  const updateValue = useCallback(
    (newValue: string) => {
      const params = new URLSearchParams(location.search);
      if (newValue) {
        params.set(key, newValue);
      } else {
        params.delete(key);
      }

      navigate({ search: params.toString() }, { replace: true });

      const queryParams = Object.fromEntries(params.entries()) as QueryParamsState;
      dispatch(setQueryParams(queryParams));
    },
    [dispatch, navigate, location.search, key],
  );

  return [getCurrentValue(), updateValue] as const;
};
