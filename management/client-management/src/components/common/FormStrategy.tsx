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

const FormStrategy = ({
    type,
    register,
    handleSubmit,
    formLoading,
    onFinishHandler,
}: FormAccProps) => {
    const title = engToViet[type as keyof typeof engToViet] + " chiến lược";
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
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            {...register("ten", { required: true })}
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
                            Nội dung
                        </FormHelperText>
                        <TextareaAutosize
                            minRows={5}
                            required
                            placeholder="Write description"
                            color="info"
                            style={{
                                width: "100%",
                                background: "transparent",
                                fontSize: "16px",
                                borderColor: "rgba(0,0,0,0.23)",
                                borderRadius: 6,
                                padding: 10,
                            }}
                            {...register("noidung", { required: true })}
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

export default FormStrategy;
