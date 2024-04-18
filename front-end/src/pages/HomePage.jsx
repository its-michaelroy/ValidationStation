import backgroundImage from "../assets/main.jpg";
import "../index.css";

const HomePage = () => {
  return (
    <div
      className="homepage"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="homepage-message">
        <h1>HomePage</h1>
        <p>Welcome to ValidationStation!</p>
        <p>
          Explore our services to validate and manage your contact data
          seamlessly!
        </p>
      </div>
    </div>
  );
};

export default HomePage;
