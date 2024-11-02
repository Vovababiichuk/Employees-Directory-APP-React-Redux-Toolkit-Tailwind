import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { EmployeeTypes } from '@/entities/employee/types';

type EmployeesState = {
  employees: EmployeeTypes[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchQuery: string;
  positionFilter: string;
  selectedEmployee: EmployeeTypes | null;
};

const initialState: EmployeesState = {
  employees: [],
  status: 'idle',
  error: null,
  searchQuery: '',
  positionFilter: 'All',
  selectedEmployee: null,
};

const SERVER_URL = 'https://66a0f8b17053166bcabd894e.mocapi.io/api/workers';

export const fetchEmployees = createAsyncThunk<EmployeeTypes[]>(
  'employees/fetchEmployees',
  async () => {
    const res = await axios.get<EmployeeTypes[]>(`${SERVER_URL}`);
    return res.data;
  },
);

export const fetchEmployeeById = createAsyncThunk<EmployeeTypes, string>(
  'employees/fetchEmployeeById',
  async id => {
    const res = await axios.get<EmployeeTypes>(`${SERVER_URL}/${id}`);
    return res.data;
  },
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setPositionFilter(state, action: PayloadAction<string>) {
      state.positionFilter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEmployees.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });

    builder
      .addCase(fetchEmployeeById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedEmployee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { setSearchQuery, setPositionFilter } = employeesSlice.actions;

export default employeesSlice.reducer;
