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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";

// Make a Schema of the form object
const UserSchema = z.object({
  email: z.string().email("Not a valid email").toLowerCase(),
  password: z.string().min(8, "Password should be at least 8"),
});

const UserSchema2 = z.object({
  email: z.string().email("Not a valid email").toLowerCase(),
  password: z.string().min(8, "Password should be at least 8"),
});

// Create the form data type
export type UserFormData = z.infer<typeof UserSchema>;
export type RegisterFormData = z.infer<typeof UserSchema2>;

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const form2 = useForm<RegisterFormData>({
    resolver: zodResolver(UserSchema2),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (formData: UserFormData) => {
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/");
    } catch (e) {}
    // try {
    //   if (!member) await useCreateMember(formData);
    //   else {
    //     await useUpdateMember(member.id, formData);
    //     setMember();
    //   }
    //   form.reset();
    //   toast({
    //     title: "Member Created",
    //     description: "A new member is added to the database",
    //   });
    // } catch (e) {
    //   toast({
    //     variant: "destructive",
    //     title: "Something went wrong",
    //     description: "Failed to add member to the database",
    //   });
    // }
  };

  const onRegister = async (formData: RegisterFormData) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      toast({
        title: "User Created",
        description: "A new user is added to the database",
      });
    } catch (e) {}

    // try {
    //   if (!member) await useCreateMember(formData);
    //   else {
    //     await useUpdateMember(member.id, formData);
    //     setMember();
    //   }
    //   form.reset();
    //   toast({
    //     title: "Member Created",
    //     description: "A new member is added to the database",
    //   });
    // } catch (e) {
    //   toast({
    //     variant: "destructive",
    //     title: "Something went wrong",
    //     description: "Failed to add member to the database",
    //   });
    // }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>Use the form below to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onLogin)}>
              <div className="flex-1 space-y-4">
                <FormField
                  control={form.control}
                  name="email"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
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
      <Card>
        <CardHeader>
          <CardTitle>Register an account</CardTitle>
          <CardDescription>Use the form below to register</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form2}>
            <form onSubmit={form2.handleSubmit(onRegister)}>
              <div className="flex-1 space-y-4">
                <FormField
                  control={form2.control}
                  name="email"
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
                  control={form2.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
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
    </>
  );
};

export default LoginForm;
