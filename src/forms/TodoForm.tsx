import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { useState } from "react";

type Todo = {
  id: string;
  task: string;
  completed: boolean;
};

const TodoForm = () => {
  const [task, setTask] = useState<string>("");

  const [completed, setCompleted] = useState<boolean>(false);

  const handleChange = (v: any) => {
    if (v) setCompleted(true);
    else setCompleted(false);
  };

  const handleSubmit = async () => {
    try {
      const doc = await addDoc(collection(db, "todos"), {
        task,
        completed,
      });
      console.log(getDoc(doc));
      setTask("");
      setCompleted(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col">
      <p>
        <Input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {task}
      </p>
      <p>
        <input
          type="checkbox"
          checked={completed}
          onChange={(v) => handleChange(v.target.checked)}
        />
      </p>
      <p>
        <Button onClick={handleSubmit}>Submit</Button>
      </p>
    </div>
  );
};

export default TodoForm;
