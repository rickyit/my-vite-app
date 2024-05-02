import { MemberFormData } from "@/forms/MemberForm";
import { db } from "@/lib/firebase";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";

export const useCreateMember = async (formData: MemberFormData) => {
  return await addDoc(collection(db, "members"), formData);
};

export const useUpdateMember = async (id: string, formData: MemberFormData) => {
  return await setDoc(doc(db, "members", id), formData, { merge: true });
};

export const useDeleteMember = async (id: string) => {
  return await deleteDoc(doc(db, "members", id));
};
