import { TableCell, TableRow } from "@/components/ui/table";
import { Member, Todo } from "@/types";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  useDeleteTodo,
  useUpdateTodo,
  useUpdateTodoStatus,
} from "@/api/TodoApi";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

type Props = {
  members: Member[];
  todo: Todo;
  onEdit: (todo: Todo) => void;
};

const TodoTableRow = ({ members, todo, onEdit }: Props) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleCheckedChange = async (status: boolean) => {
    setIsUpdating(true);
    try {
      await useUpdateTodoStatus(todo.id, status);
    } catch (e) {
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsUpdating(true);
    try {
      await useDeleteTodo(todo.id);

      toast({
        title: "Todo Delete",
        description: "A todo is deleted to the database",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Failed to delete todo to the database",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <TableRow key={todo.id}>
      <TableCell className="font-medium">
        {format(todo.date.toDate(), "MMM d, yyyy")}
      </TableCell>
      <TableCell>{todo.task}</TableCell>
      <TableCell>
        {members &&
          members.length > 0 &&
          members.find((member) => member.id == todo.assignee)?.name}
      </TableCell>
      <TableCell>{todo.note}</TableCell>
      <TableCell>
        <Switch
          defaultChecked={todo.status}
          onCheckedChange={handleCheckedChange}
          disabled={isUpdating}
        />
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis size={20} />{" "}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(todo)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default TodoTableRow;
