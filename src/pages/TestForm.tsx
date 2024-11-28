import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { SignUp } from "@/features/auth/types/SignUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const signUpSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters."
  }),
  paternalLastName: z.string().min(2, {
    message: "Paternal Last Name must be at least 2 characters."
  }),
  maternalLastName: z.string().min(2, {
    message: "Maternal Last Name must be at least 2 characters."
  }),
  email: z.string().email({ message: "Invalid email address." })
})

const TestForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      paternalLastName: "",
      maternalLastName: "",
      email: ""
    }
  })

  const onSubmit = (data: SignUp) => {
    console.log(data);
    navigate("/home");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Paternal Last Name */}
        <FormField
          control={form.control}
          name="paternalLastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paternal Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maternalLastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maternal Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Hernandez" {...field} />
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
                <Input placeholder="johndoe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit"
          variant="outline"
        >
          Sign Up
        </Button>
      </form>
    </Form>
  )
}

export default TestForm
