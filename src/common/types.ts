export interface Account {
  [index: string]: string | null | string[] | number;
  id: number;
  firstName: string | null;
  lastName: string | null;
  userName: string;
  accountType: string;
  createDate: string;
  permissions: string[];
}

export interface StoreState {
  accounts: Account[];
}

export interface FilterTerm {
  keys: Array<string>;
  term: string;
}

export type Sortable = { [index: string]: unknown };
