export interface Filters {
  age?: number;
  gender?: 1 | 2;
  search?: string;
}

export type UserRecord = {
  age: number;
  gender: 1 | 2;
  name: string;
  phone: string;
  surname: string;
};

export type UserField = keyof UserRecord;
