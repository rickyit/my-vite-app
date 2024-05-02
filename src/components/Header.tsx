import Logo from "./header/Logo";
import Menu from "./header/Menu";
import AccountNav from "./header/AccountNav";

const Header = () => {
  return (
    <header className="border-b-2">
      <div className="container mx-auto flex-row flex gap-6 py-3 items-center border-bottom">
        <Logo />
        <Menu />
        <AccountNav />
      </div>
    </header>
  );
};

export default Header;
