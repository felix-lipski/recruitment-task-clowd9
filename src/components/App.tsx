import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Container } from "@material-ui/core";

import { StoreState } from "../common/types";
import { addOrReplaceFilterTerms } from "../common/arrayFunctions";
import { fakeGetAccounts } from "../redux/actions";
import AccountsTable from "./AccountsTable";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((state: StoreState) => state.accounts);

  useEffect(() => {
    const foo = [
      { keys: ["firstName", "lastName"], term: "aa" },
      { keys: ["accountType"], term: "aa" },
    ];
    console.log(
      addOrReplaceFilterTerms(foo, { keys: ["accountType"], term: "t" })
    );
    console.log(addOrReplaceFilterTerms(foo, { keys: ["new"], term: "t" }));
    console.log(
      addOrReplaceFilterTerms(foo, {
        keys: ["firstName", "lastName"],
        term: "bbb",
      })
    );
    dispatch(fakeGetAccounts());
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <AccountsTable accounts={accounts} />
    </Container>
  );
};

export default App;
