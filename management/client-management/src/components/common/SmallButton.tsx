import { Button } from "@mui/material";
import { ReactNode } from "react";

interface SmallButtonProps {
    type?: string;
    title: string;
    backgroundColor: string;
    width?: string;
    color: string;
    fullWidth?: boolean;
    flex?: number;
    icon?: ReactNode;
    disabled?: boolean;
    handleClick?: () => void;
}

const SmallButton = ({
    type,
    title,
    backgroundColor,
    color,
    fullWidth,
    icon,
    handleClick,
    flex,
    disabled,
    width,
}: SmallButtonProps) => {
    return (
        <Button
            disabled={disabled}
            type={type === "submit" ? "submit" : "button"}
            sx={{
                flex: flex ? 1 : "unset",
                padding: "10px 15px",
                width: width ? width : "fit-content",
                backgroundColor,
                color,
                fontSize: 16,
                gap: "5px",
                "&:hover": {
                    opacity: 0.9,
                    backgroundColor,
                },
            }}
            onClick={handleClick}
        >
            {icon}
            {title}
        </Button>
    );
};

export default SmallButton;
