import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Employee {
  id: number;
  name: string;
  avatar?: string;
}

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface EmployeesState {
  employees: Employee[];
  status: RequestStatus;
  error: string | null;
  searchQuery: string;
  positionFilter: number;
}

const initialState: EmployeesState = {
  employees: [],
  status: 'idle',
  error: null,
  searchQuery: '',
  positionFilter: 0,
};

const SERVER_URL = 'https://66a0f8b17053166bcabd894e.mockapi.io/api/workers';

export const fetchEmployees = createAsyncThunk<Employee[]>('employees/fetchEmployees', async () => {
  const response = await axios.get<Employee[]>(`${SERVER_URL}`);
  return response.data;
});

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
  },
});

export const { setSearchQuery, setPositionFilter } = employeesSlice.actions;

export default employeesSlice.reducer;
