import React, { useContext, useEffect } from "react";
import NoteContext from "./notecontext/NoteContext";

function Dashboard() {
  const { userDetails, account } = useContext(NoteContext);
  useEffect(() => {
    account();
  }, []);
  document.title = "Account";

  return (
    <>
      {userDetails.map((index, elem) => {
        return <div key={index}>{elem}</div>;
      })}
    </>
  );
}

export default Dashboard;
