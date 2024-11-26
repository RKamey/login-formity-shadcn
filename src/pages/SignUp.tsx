import { useNavigate } from "react-router-dom";
import { Formity, Value } from "formity";
import components from "@/features/auth/components/SignUp";
import schema from "@/features/auth/schemas/signUpSchema";
import { useToast } from "@/hooks/use-toast";

/**
 * Entry point for the login page. Here we import the components and schema for the login form.
 * And it is passed to the Formity component.
 * @returns The login form.
 */
const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleReturn = (result: Value) => {
    toast({
      title: "Login successful",
      description: "You have successfully logged in.",
      duration: 4000,
      variant: "destructive"
    });
    console.log(result);
    navigate("/home");
  } 

  return (
    <Formity components={components} schema={schema} onReturn={handleReturn} />
  )
}

export default SignUp;
