export type EmployeeTypes = {
  id: string;
  name: string;
  avatar: string;
  position: string;
  tag: string;
  birthDate: string;
  phone: string;
  email: string;
  isLastInGroup: boolean;
};

export type QueryParamsState = {
  tab: string;
  sort: string;
  search: string;
};
