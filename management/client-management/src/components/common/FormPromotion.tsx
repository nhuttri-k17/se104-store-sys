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

import { DateInput } from "react-admin";

import { FormPromProps } from "../../interfaces/common";
import CustomButton from "./CustomButton";
import { CreateResponse, UpdateResponse } from "@refinedev/core";
import { BaseRecord } from "@pankod/refine-core";
import { FormEventHandler, useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { set } from "date-fns";
import { engToViet } from "../../constants";

const FormPromotion = ({
    type,
    register,
    handleSubmit,
    formLoading,
    onFinishHandler,
    setValue,
    control,
    errors,
    start,
    end,
}: FormPromProps) => {
    const [date, setDateRange] = useState([
        dayjs().add(0, "day"),
        dayjs().add(1, "day"),
    ]);

    setValue("ngaybatdau", dayjs(date[0]).toDate());
    setValue("ngayketthuc", dayjs(date[1]).toDate());
    const handleStartDateChange = (newValue: Dayjs | null) => {
        if (!newValue || newValue >= date[1]) {
            console.log(date[0]);
        } else {
            setDateRange([newValue, date[1]]);
        }
    };

    const handleEndDateChange = (newValue: Dayjs | null) => {
        if (!newValue || newValue <= date[0]) {
            console.log(date[1]);
        } else {
            setDateRange([date[0], newValue]);
        }
    };

    useEffect(() => {
        setDateRange([
            start ? start : dayjs().add(0, "day"),
            end ? end : dayjs().add(1, "day"),
        ]);
    }, [start, end]);
    const title = engToViet[type as keyof typeof engToViet] + " khuyến mãi";
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    <Stack direction="row" gap={4}>
                        <FormControl sx={{ flex: 1 }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Giá trị
                            </FormHelperText>
                            <TextField
                                fullWidth
                                required
                                id="outlined-basic"
                                color="info"
                                type="number"
                                variant="outlined"
                                {...register("giatri", {
                                    required: "Giá trị là bắt buộc",
                                    validate: (value: number) =>
                                        (value > 0 && value <= 100) ||
                                        "Giá trị phải dương và bé hơn hoặc bằng 100",
                                })}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        color: "#11142d",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "rgba(0,0,0,0.23)",
                                        },
                                    },
                                }}
                                error={!!errors.giatri}
                                helperText={
                                    errors.giatri ? errors.giatri.message : null
                                }
                            />
                        </FormControl>
                        <FormControl sx={{ flex: 1 }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Thời hạn
                            </FormHelperText>
                            <Stack direction="row" gap={1}>
                                <DatePicker
                                    disablePast
                                    value={date[0]}
                                    defaultValue={date[0]}
                                    label="bắt đầu"
                                    // {...register("ngaybatdau", {
                                    //     require: true,
                                    // })}
                                    onChange={(newValue) => {
                                        handleStartDateChange(newValue);
                                        setValue(
                                            "ngaybatdau",
                                            dayjs(newValue).toDate()
                                        );
                                        console.log(dayjs(newValue).toDate());
                                    }}
                                    maxDate={date[1].subtract(1, "day")}
                                />
                                <DatePicker
                                    disablePast
                                    value={date[1]}
                                    defaultValue={date[1]}
                                    label="kết thúc"
                                    onChange={(newValue) => {
                                        handleEndDateChange(newValue);
                                        setValue(
                                            "ngayketthuc",
                                            dayjs(newValue).toDate()
                                        );
                                        console.log(dayjs(newValue).toDate());
                                    }}
                                    minDate={date[0].add(1, "day")}
                                />
                            </Stack>
                        </FormControl>
                    </Stack>
                    <CustomButton
                        type="submit"
                        title={formLoading ? "Đang xác nhận..." : "Xác nhận"}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                    />
                </form>
            </Box>
        </LocalizationProvider>
    );
};

export default FormPromotion;
