import { TableCell, TableRow } from "@/components/ui/table";
import { Member } from "@/types";
import { Ellipsis, RefreshCw } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMember } from "@/api/MemberApi";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  member: Member;
  onEdit: (member: Member) => void;
};

const MemberTableRow = ({ member, onEdit }: Props) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsUpdating(true);
    try {
      setTimeout(async () => {
        await useDeleteMember(member.id);
      }, 2000);
      toast({
        title: "Member Delete",
        description: "A member is deleted to the database",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Failed to delete member to the database",
      });
    } finally {
      setTimeout(async () => {
        setIsUpdating(false);
      }, 2000);
    }
  };

  return (
    <TableRow key={member.id}>
      <TableCell className="font-medium">{member.name} </TableCell>
      <TableCell>{member.email}</TableCell>
      <TableCell>{member.age}</TableCell>
      <TableCell className="text-right">
        {isUpdating ? (
          <RefreshCw className="w-[12px] h-[12px] animate-spin" />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis size={20} />{" "}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(member)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </TableCell>
    </TableRow>
  );
};

export default MemberTableRow;
