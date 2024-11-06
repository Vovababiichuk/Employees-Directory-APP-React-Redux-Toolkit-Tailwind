import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchEmployeeById, fetchEmployees } from '@/common/utils/gateway';
import {
  loadFromLocalStorage,
  loadSortOption,
  saveToLocalStorage,
  SortOptions,
  Statuses,
} from '@/common/utils/utils';
import { EmployeeTypes } from '@/entities/employee/types';

export type EmployeesState = {
  employees: {
    list: EmployeeTypes[];
    selected: EmployeeTypes | null;
  };
  status: keyof typeof Statuses;
  error: string | null;
  searchQuery: string;
  positionFilter: string;
  sortOption: SortOptions;
};

const initialState: EmployeesState = {
  employees: {
    list: [],
    selected: null,
  },
  status: Statuses.IDLE,
  error: null,
  searchQuery: loadFromLocalStorage('searchQuery') || '',
  positionFilter: loadFromLocalStorage('positionFilter') || 'All',
  sortOption: loadSortOption(),
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      saveToLocalStorage('searchQuery', action.payload);
    },
    setPositionFilter(state, action: PayloadAction<string>) {
      state.positionFilter = action.payload;
      saveToLocalStorage('positionFilter', action.payload);
    },
    setSortOption(state, action: PayloadAction<SortOptions>) {
      state.sortOption = action.payload;
      saveToLocalStorage('sortOption', action.payload);
    },
    setSelectedEmployee(state, action: PayloadAction<EmployeeTypes | null>) {
      state.employees.selected = action.payload;
      saveToLocalStorage('selectedEmployee', action.payload);
    },
  },
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

export const { setSearchQuery, setPositionFilter, setSelectedEmployee, setSortOption } =
  employeesSlice.actions;
export default employeesSlice.reducer;
