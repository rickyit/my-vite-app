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
      <div className="flex flex-row gap-5">
        <div className="flex-none w-[300px]">
          <MemberForm member={member} setMember={() => setMember(undefined)} />
        </div>
        <div className="flex-1">
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
