import React from "react";

function Home() {
  document.title = "Add Notes";

  return (
    <>
<<<<<<< HEAD
      <div>There is some token value= {localStorage.getItem("token")}</div>
=======
      <div>There is some token value: {localStorage.getItem("token")}</div>
>>>>>>> origin/main
    </>
  );
}

export default Home;
