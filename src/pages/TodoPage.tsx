import TodoForm from "@/forms/TodoForm";
import { db } from "@/lib/firebase";
import { Todo } from "@/types";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    console.log("i am fetching");
    const unsubscribe = onSnapshot(
      collection(db, "todos"),
      (snapshot) => {
        const tasksArray: Todo[] = [];
        snapshot.forEach((doc) => {
          tasksArray.push(doc.data() as Todo);
        });
        setTodos(tasksArray);
      },
      (e) => {
        console.log(e);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <TodoForm />
      <div>{todos.length > 0 && JSON.stringify(todos)}</div>
    </div>
  );
};

export default TodoPage;
