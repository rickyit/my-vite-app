import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/firebase";
import { Member, Todo } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import TodoTableRow from "./TodoTableRow";

type Props = {
  members: Member[];
  onEdit: (todo: Todo) => void;
};

const TodosTable = ({ members, onEdit }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const todosArray: Todo[] = [];
      snapshot.forEach((doc) => {
        todosArray.push({ id: doc.id, ...doc.data() } as Todo);
      });
      setTodos(todosArray);
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.length > 0 &&
            todos.map((todo) => (
              <TodoTableRow
                key={todo.id}
                members={members}
                todo={todo}
                onEdit={onEdit}
              />
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodosTable;
