import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="flex space-x-6">
      <Link to="/" className="font-medium">
        Home
      </Link>
      <Link to="/about" className="font-medium">
        About
      </Link>
      <Link to="/contact" className="font-medium">
        Contact
      </Link>
      <Link to="/members" className="font-medium">
        Members
      </Link>
      <Link to="/todo" className="font-medium">
        Todo
      </Link>
    </nav>
  );
};

export default Menu;
