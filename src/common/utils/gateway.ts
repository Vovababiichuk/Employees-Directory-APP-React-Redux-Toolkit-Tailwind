import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { EmployeeTypes } from '@/entities/employee/types';

const API_URL = 'https://66a0f8b17053166bcabd894e.mockapi.io/api/workers';

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
