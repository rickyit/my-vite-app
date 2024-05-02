import { useCreateMember, useUpdateMember } from "@/api/MemberApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Member } from "@/types";
import { useEffect } from "react";
import zodInputStringPipe from "@/lib/zodInputStringPipe";

// Make a Schema of the form object
const MemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Not a valid email").toLowerCase(),
  age: z.coerce
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .int("Age must be an integer")
    .positive("Age must be a positive number"),
});

// Create the form data type
export type MemberFormData = z.infer<typeof MemberSchema>;

type Props = {
  member: Member | undefined;
  setMember: () => void;
};

const MemberForm = ({ member, setMember }: Props) => {
  const { toast } = useToast();
  const form = useForm<MemberFormData>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      name: "",
      email: "",
      age: 0,
    },
  });

  useEffect(() => {
    if (member) {
      form.setValue("name", member.name);
      form.setValue("email", member.email);
      form.setValue("age", member.age);
    }
  }, [member]);

  const onSubmit = async (formData: MemberFormData) => {
    try {
      if (!member) await useCreateMember(formData);
      else {
        await useUpdateMember(member.id, formData);
        setMember();
      }
      form.reset();
      toast({
        title: "Member Created",
        description: "A new member is added to the database",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Failed to add member to the database",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a member</CardTitle>
        <CardDescription>
          Use the form below to add a new member
          {member && JSON.stringify(member)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MemberForm;
