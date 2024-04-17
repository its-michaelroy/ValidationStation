import errorImg from "../assets/CP2_vs_Code_Ninja.png";
import "../index.css";

const Error404Page = () => {
  return (
    <>
      <h1>404 Page Not Found - Are You Lost?</h1>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={errorImg} style={{ height: "99vh", width: "99vw" }} />
      </div>
    </>
  );
};

export default Error404Page;
