import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { EmployeeTypes } from '../types/types';

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

type EmployeesState = {
  employees: EmployeeTypes[];
  status: RequestStatus;
  error: string | null;
  searchQuery: string;
  positionFilter: number;
  selectedEmployee: EmployeeTypes | null;
};

const initialState: EmployeesState = {
  employees: [],
  status: 'idle',
  error: null,
  searchQuery: '',
  positionFilter: 0,
  selectedEmployee: null,
};

const SERVER_URL = 'https://66a0f8b17053166bcabd894e.mockapi.io/api/workers';

export const fetchEmployees = createAsyncThunk<EmployeeTypes[]>(
  'employees/fetchEmployees',
  async () => {
    const response = await axios.get<EmployeeTypes[]>(`${SERVER_URL}`);
    return response.data;
  },
);

export const fetchEmployeeById = createAsyncThunk<EmployeeTypes, string>(
  'employees/fetchEmployeeById',
  async id => {
    const response = await axios.get<EmployeeTypes>(`${SERVER_URL}/${id}`);
    return response.data;
  },
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setPositionFilter(state, action: PayloadAction<number>) {
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
      .addCase(fetchEmployees.rejected, state => {
        state.status = 'failed';
      });

    builder
      .addCase(fetchEmployeeById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedEmployee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { setSearchQuery, setPositionFilter } = employeesSlice.actions;

export default employeesSlice.reducer;
