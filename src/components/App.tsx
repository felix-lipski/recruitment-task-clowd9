import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { StoreState } from "../types";
import { fakeGetAccounts } from "../redux/actions";
import AccountsTable from "./AccountsTable";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((state: StoreState) => state.accounts);

  useEffect(() => {
    console.log(accounts);
    dispatch(fakeGetAccounts());
  }, [dispatch, accounts]);

  return <AccountsTable accounts={accounts} />;
};

export default App;
