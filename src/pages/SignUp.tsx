import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Formity } from "formity";
import schema from "@/features/auth/schemas/signUpSchema";
import components from "@/features/auth/components/signUpComponents";

/**
 * Entry point for the login page. Here we import the components and schema for the login form.
 * And it is passed to the Formity component.
 * @returns The login form.
 */
const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const onReturn = (result: unknown) => {
    console.log('from page', result);
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      duration: 4000,
      variant: "destructive"
    });
    navigate("/login");
  }

  return (
    <Formity
      schema={schema}
      components={components}
      onReturn={onReturn}
    />
  )
}

export default SignUp;
