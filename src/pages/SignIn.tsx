import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Formity } from "formity";

import components from "@/features/auth/components/signUpComponents";
import schema from "@/features/auth/schemas/signInSchema";

/**
 * Entry point for the login page. Here we import the components and schema for the login form.
 * And it is passed to the Formity component.
 * @returns The login form.
 */
const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const onReturn = (result: unknown) => {
    console.log('from sign in', result);
    toast({
      title: "Sign in successful.",
      description: "You have successfully signed in.",
      duration: 4000,
      variant: "destructive"
    })
    navigate("/home");
  }

  return (
    <Formity
      components={components}
      schema={schema}
      onReturn={onReturn}
    />
  )
}

export default SignIn;
