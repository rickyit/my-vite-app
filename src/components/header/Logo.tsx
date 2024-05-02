import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} width={50} height={50} />
    </Link>
  );
};

export default Logo;
