import { useCreateTodo, useUpdateTodo } from "@/api/TodoApi";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Member, Todo } from "@/types";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

// Make a Schema of the form object
const TodoSchema = z.object({
  date: z.date(),
  task: z.string().min(1, "Task is required"),
  assignee: z.string().min(1, "Assignee is required"),
  note: z.string().optional(),
  status: z.boolean(),
});

// Create the form data type
export type TodoFormData = z.infer<typeof TodoSchema>;

type Props = {
  members: Member[];
  todo: Todo | undefined;
  setTodo: () => void;
};

const TodoForm = ({ members, todo, setTodo }: Props) => {
  const { toast } = useToast();
  const form = useForm<TodoFormData>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      date: new Date(),
      task: "",
      assignee: "",
      note: "",
      status: false,
    },
  });

  useEffect(() => {
    if (todo) {
      form.setValue("date", todo.date.toDate());
      form.setValue("task", todo.task);
      form.setValue("assignee", todo.assignee);
      form.setValue("note", todo.note);
      form.setValue("status", todo.status);
    }
  }, [todo]);

  const onSubmit = async (formData: TodoFormData) => {
    try {
      if (!todo) await useCreateTodo(formData);
      else {
        await useUpdateTodo(todo.id, formData);
        setTodo();
      }
      form.reset();
      toast({
        title: "Todo Created",
        description: "A new Todo is added to the database",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Failed to add Todo to the database",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Todo</CardTitle>
        <CardDescription>Use the form below to add a new Todo</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[100%] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div>
                <FormLabel className="flex mb-3">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[100%] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div> */}
              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[100%]">
                          <SelectValue placeholder="Select Member" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {members &&
                          members.length > 0 &&
                          members.map((member) => (
                            <SelectItem value={member.id} key={member.id}>
                              {member.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
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

export default TodoForm;
