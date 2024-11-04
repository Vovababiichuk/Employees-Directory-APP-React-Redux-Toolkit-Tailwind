import { differenceInYears, format } from 'date-fns';

export const Statuses = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
} as const;

export const formatDate = (date: string | Date | undefined, formatString: string): string => {
  if (!date) {
    throw new Error('Invalid date: date must be provided');
  }

  const dateObject = new Date(date);

  if (isNaN(dateObject.getTime())) {
    throw new Error('Invalid date: provided date is not valid');
  }

  return format(dateObject, formatString);
};

export const calculateAge = (birthDate: string | Date | undefined): number | null => {
  if (!birthDate) return null;

  const dateObject = new Date(birthDate);

  if (isNaN(dateObject.getTime())) {
    return null;
  }

  return differenceInYears(new Date(), dateObject);
};
