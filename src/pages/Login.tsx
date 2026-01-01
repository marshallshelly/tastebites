import { valibotResolver } from "@hookform/resolvers/valibot";
import { Button, Divider, Input } from "@heroui/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  type InferOutput,
  minLength,
  object,
  string,
  email,
  pipe,
} from "valibot";
import { fetcher } from "../lib/utils/fetcher";
import { toast } from "sonner";
import { useAppDispatch } from "../hooks";
import { signIn } from "../slice/user";

const schema = object({
  email: pipe(
    string(),
    minLength(1, "Email is required"),
    email("Invalid email address")
  ),
  password: pipe(string(), minLength(1, "Password is required")),
});

type FormFields = InferOutput<typeof schema>;

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormFields>({
    resolver: valibotResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    try {
      const { data } = await fetcher.post("/login", values);
      dispatch(signIn(data));
      navigate("/", { viewTransition: true });
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message, {
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl tracking-tight sm:text-4xl font-semibold leading-7 text-[#03337B]">
                LOGIN TO YOUR ACCOUNT
              </h1>
              <Divider className="w-1/2 h-1.5 rounded-full my-4 bg-[#E50000]" />
              <p className="mt-6 text-lg leading-8 text-gray-600">
                There are many variations of passages of Lorem Ipsu available,
                but the majority have suffered alte.
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-2 space-y-4"
              >
                <Input
                  {...register("email")}
                  label="Email *"
                  type="email"
                  variant="underlined"
                  errorMessage={errors.email?.message}
                  isInvalid={!!errors.email?.message}
                />
                <Input
                  {...register("password")}
                  label="Password *"
                  type="password"
                  variant="underlined"
                  errorMessage={errors.password?.message}
                  isInvalid={!!errors.password?.message}
                  autoComplete="current-password"
                />
                <div className="text-right text-danger">
                  <Link to="/forgot-password" viewTransition>
                    Forgot password?
                  </Link>
                </div>
                <br />
                <Button radius="sm" type="submit" isLoading={isSubmitting}>
                  Login
                </Button>
                <br />
                <p className="inline-block">Don't have an account?</p>{" "}
                <Link to="/signup" viewTransition>
                  <strong>Register now!</strong>
                </Link>
              </form>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 hidden sm:block"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}
