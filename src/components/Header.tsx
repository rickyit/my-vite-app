import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-100">
      <div className="container mx-auto py-5 items-center border-bottom">
        <nav className="flex space-x-3">
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
      </div>
    </header>
  );
};

export default Header;
