import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Stack from "@mui/material/Stack";
import { useForm } from "@refinedev/react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { FormPropEdit } from "../../interfaces/common";
import CustomButton from "../../components/common/CustomButton";
import { FieldValues } from "react-hook-form";
import { useGetIdentity } from "@refinedev/core";
import { isBanHang } from "../../utils/validateRole";

export const OrderEdit = () => {
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        setValue,
    } = useForm();
    const orderData = queryResult?.data?.data;

    const onFinishHandler = async (data: FieldValues) => {
        const response = confirm("Bạn có chắc chắn muốn thay đổi không?");
        if (!response) return;
        await onFinish({
            ...data,
        });
    };

    const { data: user } = useGetIdentity();
    const right = isBanHang(user?.vaitro);

    if (!right) {
        return <div>Bạn không có quyền truy cập trang này</div>;
    }

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700}>
                Chi tiết đơn hàng
            </Typography>

            <Stack direction="row" gap={1}>
                <Box
                    mt={2.5}
                    borderRadius="15px"
                    padding="20px"
                    bgcolor="#aaa"
                    flex={1}
                >
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
                        <Stack
                            direction="row"
                            width="100%"
                            justifyContent="space-between"
                        >
                            <Typography
                                fontSize={28}
                                width="max-content"
                                flex={1}
                            >
                                Tình trạng đơn hàng: {orderData?.tinhtrang}
                            </Typography>
                            <Stack
                                direction="row"
                                gap={2}
                                width="100%"
                                justifyContent="end"
                                flex={1}
                            >
                                <CustomButton
                                    disabled={
                                        orderData?.tinhtrang !== "Chưa xử lý"
                                    }
                                    type="submit"
                                    handleClick={async () => {
                                        await setValue(
                                            "tinhtrang",
                                            "Đã xác nhận"
                                        );
                                    }}
                                    title={
                                        formLoading
                                            ? "Đang xử lí..."
                                            : "Xác nhận"
                                    }
                                    backgroundColor="#475be8"
                                    color="#fcfcfc"
                                />
                                <CustomButton
                                    type="submit"
                                    disabled={
                                        orderData?.tinhtrang !== "Chưa xử lý"
                                    }
                                    handleClick={async () => {
                                        await setValue("tinhtrang", "Hủy");
                                    }}
                                    title={
                                        formLoading
                                            ? "Đang xử lí..."
                                            : "Hủy đơn hàng"
                                    }
                                    backgroundColor="#475be8"
                                    color="#fcfcfc"
                                />
                            </Stack>
                        </Stack>
                        <Typography fontSize={28} width="max-content" flex={1}>
                            Thông tin khách hàng
                        </Typography>
                        <FormControl>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "5px 0",
                                    fontSize: 20,
                                    color: "#11142d",
                                }}
                            >
                                Tên khách hàng: {orderData?.khachhang.ten}
                            </FormHelperText>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 18,
                                    color: "#11142d",
                                }}
                            >
                                ID: {orderData?.khachhang.id}
                            </FormHelperText>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "5px 0",
                                    fontSize: 18,
                                    color: "#11142d",
                                }}
                            >
                                Email: {orderData?.khachhang.email}
                            </FormHelperText>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "5px 0",
                                    fontSize: 18,
                                    color: "#11142d",
                                }}
                            >
                                SDT:{" "}
                                {orderData?.khachhang.sdt
                                    ? orderData?.khachhang.sdt
                                    : "Chưa có"}
                            </FormHelperText>
                        </FormControl>
                        <Typography fontSize={25} fontWeight={700}>
                            Thông tin đơn hàng
                        </Typography>
                        <FormControl>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "5px 0",
                                    fontSize: 18,
                                    color: "#11142d",
                                }}
                            >
                                Mã khuyến mãi: {orderData?.khuyenmaiId}
                            </FormHelperText>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "5px 0",
                                    fontSize: 18,
                                    color: "#11142d",
                                }}
                            >
                                Giá trị khuyến mãi: {orderData?.khuyenmaigiatri}{" "}
                                %
                            </FormHelperText>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "5px 0",
                                    fontSize: 18,
                                    color: "#11142d",
                                }}
                            >
                                Ngày lập: {orderData?.ngaylap}
                            </FormHelperText>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "5px 0",
                                    fontSize: 18,
                                    color: "#11142d",
                                }}
                            >
                                Tổng giá trị: {orderData?.tonggiatri} VND
                            </FormHelperText>
                        </FormControl>
                        <Typography fontSize={23} fontWeight={400}>
                            Chi tiết đơn hàng
                        </Typography>

                        {orderData?.chitietdonhang.map(
                            (item, index: number) => (
                                <Grid container spacing={3} width="100%">
                                    <Grid item xs={2}>
                                        <Typography>
                                            {index}. {item.ten}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            {item.sanphamId}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>
                                            Loại: {item.loai}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>
                                            số lượng: {item.soluong}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>
                                            tổng giá trị: {item.tonggiatri}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )
                        )}
                    </form>
                </Box>
            </Stack>
        </Box>
    );
};
