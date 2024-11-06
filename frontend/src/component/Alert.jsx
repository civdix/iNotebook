import React, { useContext } from "react";
import NoteContext from "./notecontext/NoteContext";

function Alert() {
  const { response } = useContext(NoteContext);

  return (
    <div className="alert sticky sticky-top">
      <div className={`alert alert-${response.code || "warning"}`} role="alert">
        {response.msg || "Nothing to show"}
      </div>
    </div>
  );
}

export default Alert;
