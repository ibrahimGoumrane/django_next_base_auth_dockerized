
export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type CreateUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type UpdateUser = {
  first_name?: string;
  last_name?: string;
  email?: string;
};
export type DeleteUser = {
  id: number;
};
