export interface Account {
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

