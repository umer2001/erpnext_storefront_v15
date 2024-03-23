import { AuthPage, useLogin } from "@refinedev/core";

export const Login = () => {
  const { mutate: login } = useLogin();
  return (
    <AuthPage
      type="login"
      renderContent={(content) => <div>{content}</div>}
      // formProps={{
      //   onSubmit: (e) => {
      //     e.preventDefault();
      //     const email = (e.target as HTMLFormElement)?.email.value;
      //     const password = (e.target as HTMLFormElement)?.password.value;
      //     console.log(email, password);
      //     login({ usr: email, pwd: password });
      //   },
      // }}
    />
  );
};
