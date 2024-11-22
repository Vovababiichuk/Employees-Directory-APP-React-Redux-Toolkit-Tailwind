import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchEmployeeById, fetchEmployees } from '@/common/utils/gateway';
import { Statuses } from '@/common/utils/utils';
import { EmployeeTypes, QueryParamsState } from '@/entities/employee/types';

export type EmployeesState = {
  employees: {
    list: EmployeeTypes[];
    selected: EmployeeTypes | null;
  };
  status: keyof typeof Statuses;
  error: string | null;
  tab: string;
  sort: string;
  search: string;
};

const initialState: EmployeesState = {
  employees: {
    list: [],
    selected: null,
  },
  status: Statuses.IDLE,
  error: null,
  tab: '',
  sort: '',
  search: '',
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setQueryParams(state, action: PayloadAction<QueryParamsState>) {
      const { tab = '', sort = '', search = '' } = action.payload;
      state.tab = tab;
      state.sort = sort;
      state.search = search;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEmployees.pending, state => {
        state.status = Statuses.LOADING;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<EmployeeTypes[]>) => {
        state.status = Statuses.SUCCEEDED;
        state.employees.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = Statuses.FAILED;
        state.error = action.payload || 'Failed to fetch employees';
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action: PayloadAction<EmployeeTypes>) => {
        state.status = Statuses.SUCCEEDED;
        state.employees.selected = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.status = Statuses.FAILED;
        state.error = action.payload || 'Failed to fetch employee';
      });
  },
});

export const { setQueryParams } = employeesSlice.actions;
export default employeesSlice.reducer;
