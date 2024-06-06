import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import { FormAccProps } from "../../interfaces/common";
import CustomButton from "./CustomButton";
import { CreateResponse, UpdateResponse } from "@refinedev/core";
import { BaseRecord } from "@pankod/refine-core";
import { FormEventHandler, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { engToViet } from "../../constants";

const FormAccount = ({
    type,
    register,
    handleSubmit,
    formLoading,
    onFinishHandler,
    watch,
    errors,
    iSEdit,
}: FormAccProps) => {
    const title = engToViet[type as keyof typeof engToViet] + " tài khoản";
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700}>
                {title}
            </Typography>

            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#aaa">
                <form
                    style={{
                        marginTop: "20px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                    onSubmit={handleSubmit(onFinishHandler)}
                >
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Nhập tên
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required={!iSEdit}
                            disabled={iSEdit}
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            {...register("ten", { required: !iSEdit })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Email
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required={!iSEdit}
                            disabled={iSEdit}
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            {...register("email", { required: !iSEdit })}
                        />
                    </FormControl>
                    <FormControl sx={{ marginBottom: "20px" }}>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Mật khẩu
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="password"
                            color="info"
                            variant="outlined"
                            type="password"
                            {...register("password", { required: true })}
                            error={!!errors.password}
                            helperText={
                                errors.password ? "Mật khẩu là bắt buộc" : ""
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ marginBottom: "20px" }}>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Xác nhận mật khẩu
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="confirmPassword"
                            color="info"
                            variant="outlined"
                            type="password"
                            {...register("confirmPassword", {
                                required: "Xác nhận mật khẩu là bắt buộc",
                                validate: (value: string) =>
                                    value === watch("password") ||
                                    "Mật khẩu không khớp",
                            })}
                            error={!!errors.confirmPassword}
                            helperText={
                                errors.confirmPassword
                                    ? errors.confirmPassword.message
                                    : ""
                            }
                        />
                    </FormControl>
                    <CustomButton
                        type="submit"
                        title={formLoading ? "Đang xác nhận..." : "Xác nhận"}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                    />
                </form>
            </Box>
        </Box>
    );
};

export default FormAccount;
