import { differenceInYears, format } from 'date-fns';
import { EmployeesState } from '@/common/store/EmployeesSlice';

export enum Statuses {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

export enum SortOptions {
  ALPHABETICAL = 'alphabetical',
  BIRTHDATE = 'birthdate',
}

export const formatDate = (date: Date | string | undefined, formatStr: string): string => {
  if (!date) throw new Error('Invalid date: date must be provided');
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) throw new Error('Invalid date: provided date is not valid');
  return format(dateObj, formatStr);
};

export const calculateAge = (birthDate: Date | string | undefined): number | null => {
  if (!birthDate) return null;
  const dateObj = new Date(birthDate);
  return isNaN(dateObj.getTime()) ? null : differenceInYears(new Date(), dateObj);
};

export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Failed to parse JSON from localStorage', error);
    return null;
  }
};

export const loadSortOption = (): EmployeesState['sortOption'] => {
  const sortOption = loadFromLocalStorage('sortOption');
  if (sortOption === SortOptions.ALPHABETICAL || sortOption === SortOptions.BIRTHDATE) {
    return sortOption;
  }
  return SortOptions.ALPHABETICAL;
};
