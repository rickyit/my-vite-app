import { TodoFormData } from "@/forms/TodoForm";
import { db } from "@/lib/firebase";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";

export const useCreateTodo = async (formData: TodoFormData) => {
  return await addDoc(collection(db, "todos"), formData);
};

export const useUpdateTodo = async (id: string, formData: TodoFormData) => {
  return await setDoc(doc(db, "todos", id), formData, { merge: true });
};

export const useUpdateTodoStatus = async (id: string, status: boolean) => {
  return await setDoc(doc(db, "todos", id), { status }, { merge: true });
};

export const useDeleteTodo = async (id: string) => {
  return await deleteDoc(doc(db, "todos", id));
};
