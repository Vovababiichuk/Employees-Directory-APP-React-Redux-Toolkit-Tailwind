import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployeeById, fetchEmployees } from '@/common/utils/gateway';
import { Statuses } from '@/common/utils/utils';
import { EmployeeTypes } from '@/entities/employee/types';

export type EmployeesState = {
  employees: {
    list: EmployeeTypes[];
    selected: EmployeeTypes | null;
  };
  status: keyof typeof Statuses;
  error: string | null;
};

const initialState: EmployeesState = {
  employees: {
    list: [],
    selected: null,
  },
  status: Statuses.IDLE,
  error: null,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEmployees.pending, state => {
        state.status = Statuses.LOADING;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = Statuses.SUCCEEDED;
        state.employees.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = Statuses.FAILED;
        state.error = action.payload || 'Failed to fetch employees';
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.status = Statuses.SUCCEEDED;
        state.employees.selected = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.status = Statuses.FAILED;
        state.error = action.payload || 'Failed to fetch employee';
      });
  },
});

export default employeesSlice.reducer;
