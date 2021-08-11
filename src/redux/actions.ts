export const FAKE_GET_ACCOUNTS = "FAKE_GET_ACCOUNTS";
export interface FakeGetAccounts {
  type: typeof FAKE_GET_ACCOUNTS;
}
export const fakeGetAccounts = () => ({ type: FAKE_GET_ACCOUNTS });
