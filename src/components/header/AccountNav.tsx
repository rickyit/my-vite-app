import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const AccountNav = () => {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">Hi, Ricky</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AccountNav;
