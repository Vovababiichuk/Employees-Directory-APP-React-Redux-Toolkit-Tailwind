import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import employeesReducer from '@/store/EmployeesSlice';

const logger = createLogger({
  collapsed: true,
  diff: true,
  duration: true,
});

const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
