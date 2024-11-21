import { differenceInYears, format } from 'date-fns';

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
