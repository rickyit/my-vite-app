import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/firebase";
import { Member } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import MemberTableRow from "./MemberTableRow";

type Props = {
  onEdit: (member: Member) => void;
};

const MembersTable = ({ onEdit }: Props) => {
  const [members, setMembers] = useState<Member[]>([]);

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
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Age</TableHead>
            <TableHead className="text-right w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length > 0 &&
            members.map((member) => (
              <MemberTableRow key={member.id} member={member} onEdit={onEdit} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MembersTable;
