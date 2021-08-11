import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Container } from "@material-ui/core";

import { StoreState } from "../types";
import { fakeGetAccounts } from "../redux/actions";
import AccountsTable from "./AccountsTable";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((state: StoreState) => state.accounts);

  useEffect(() => {
    dispatch(fakeGetAccounts());
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <AccountsTable accounts={accounts} />
    </Container>
  );
};

export default App;
