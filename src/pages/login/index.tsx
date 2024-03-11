import { AuthPage } from "@refinedev/core";

export const Login = () => {
  return (
    <AuthPage type="login" renderContent={(content) => <div>{content}</div>} />
  );
};
