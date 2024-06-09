import { AuthPage } from "@refinedev/mui";

export const Login = () => {
    return (
        <AuthPage
            type="login"
            formProps={{
                defaultValues: {
                    email: "alice@gami9l.com",
                    password: "123456",
                },
            }}
        />
    );
};
