import TodosTable from "@/components/TodosTable";
import TodoForm from "@/forms/TodoForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Member, Todo } from "@/types";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const TodoPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [todo, setTodo] = useState<Todo | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "members"), (snapshot) => {
      const membersArray: Member[] = [];
      snapshot.forEach((doc) => {
        membersArray.push({ id: doc.id, ...doc.data() } as Member);
      });
      setMembers(membersArray);
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-8 gap-5">
        <div className="col-span-2">
          <TodoForm
            members={members}
            todo={todo}
            setTodo={() => setTodo(undefined)}
          />
        </div>
        <div className="col-span-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Todos</CardTitle>
              <CardDescription>This is all your todos</CardDescription>
            </CardHeader>
            <CardContent>
              <TodosTable members={members} onEdit={setTodo} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
