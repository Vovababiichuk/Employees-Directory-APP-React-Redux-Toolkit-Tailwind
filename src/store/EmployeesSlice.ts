import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { EmployeeTypes } from '@/entities/employee/types';
import { SortOptions, Statuses } from '@/utils';

type EmployeesState = {
  employees: {
    list: EmployeeTypes[];
    selected: EmployeeTypes | null;
  };
  status: keyof typeof Statuses;
  error: string | null;
  searchQuery: string;
  positionFilter: string;
  sortOption: 'alphabetical' | 'birthdate';
};

const API_URL = 'https://66a0f8b17053166bcabd894e.mockapi.io/api/workers';

const saveToLocalStorage = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.error('Failed to parse JSON from localStorage', error);
      return null;
    }
  }
  return null;
};

export const fetchEmployees = createAsyncThunk<EmployeeTypes[], void, { rejectValue: string }>(
  'employees/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<EmployeeTypes[]>(API_URL);
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message || 'Failed to fetch employees');
    }
  },
);

export const fetchEmployeeById = createAsyncThunk<EmployeeTypes, string, { rejectValue: string }>(
  'employees/fetchEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get<EmployeeTypes>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message || 'Failed to fetch employee');
    }
  },
);

const loadSortOption = (): EmployeesState['sortOption'] => {
  const sortOption = loadFromLocalStorage('sortOption');
  if (sortOption === SortOptions.ALPHABETICAL || sortOption === SortOptions.BIRTHDATE) {
    return sortOption;
  }
  return SortOptions.ALPHABETICAL;
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
    setSortOption(state, action: PayloadAction<'alphabetical' | 'birthdate'>) {
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
      .addCase(fetchEmployeeById.pending, state => {
        state.status = Statuses.LOADING;
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
