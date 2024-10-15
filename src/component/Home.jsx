import React from "react";

function Home() {
  document.title = "Add Notes";

  return (
    <>
      <div>There is some token value: {localStorage.getItem("token")}</div>
    </>
  );
}

export default Home;
