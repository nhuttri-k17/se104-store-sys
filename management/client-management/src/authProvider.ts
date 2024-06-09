import { Email } from "@mui/icons-material";
import { AuthBindings } from "@refinedev/core";
import { log } from "console";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthBindings = {
    login: async ({ username, email, password }) => {
        if ((username || email) && password) {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem(TOKEN_KEY, data.id);
                return {
                    success: true,
                    redirectTo: "/",
                };
            }
        }

        return {
            success: false,
            error: {
                name: "LoginError",
                message: "Invalid username or password",
            },
        };
    },
    logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    check: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        const response = await fetch("http://localhost:8080/me", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: token }),
        });

        if (token && response.ok) {
            const data = await response.json();
            const { id, ten, hinhanh, ...rest } = data;
            return {
                id: id,
                name: ten || "John Doe",
                avatar:
                    hinhanh && hinhanh !== ""
                        ? hinhanh
                        : "https://i.pravatar.cc/300",
                ...rest,
            };
        } else {
            localStorage.removeItem(TOKEN_KEY);
            return {
                success: false,
                redirectTo: "/login",
            };
        }
        return null;
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
};
