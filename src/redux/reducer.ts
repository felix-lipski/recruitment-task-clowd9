import { Reducer } from "redux";

import mockAccounts from "../db/mock.json";
import { StoreState } from "../types";
import { FakeGetAccounts, FAKE_GET_ACCOUNTS } from "./actions";

export const initialState: StoreState = {
  accounts: [],
};

export const reducer: Reducer<StoreState | undefined, FakeGetAccounts> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FAKE_GET_ACCOUNTS:
      return { ...state, accounts: mockAccounts };
    default:
      return state;
  }
};
