import { Timestamp } from "firebase/firestore";

export type Todo = {
  id: string;
  date: Timestamp;
  task: string;
  assignee: string;
  note: string;
  status: boolean;
};

export type Member = {
  id: string;
  name: string;
  email: string;
  age: number;
};
