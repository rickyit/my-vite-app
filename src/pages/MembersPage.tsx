import MembersTable from "@/components/MembersTable";
import MemberForm from "@/forms/MemberForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Member } from "@/types";
import { useState } from "react";

const MembersPage = () => {
  const [member, setMember] = useState<Member | undefined>(undefined);

  return (
    <div>
      <div className="grid grid-cols-8 gap-5">
        <div className="col-span-2">
          <MemberForm member={member} setMember={() => setMember(undefined)} />
        </div>
        <div className="col-span-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Members</CardTitle>
              <CardDescription>This is all your members</CardDescription>
            </CardHeader>
            <CardContent>
              <MembersTable onEdit={setMember} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
