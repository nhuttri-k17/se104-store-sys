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

import { FormStaffProps } from "../../interfaces/common";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";
import { baseUrl } from "../../constants/url";

interface AccountData {
    id: string;
    email: string;
    ten: string;
    nhanvienId?: string;
}

const FormStaff = ({
    type,
    register,
    handleSubmit,
    formLoading,
    onFinishHandler,
    iSEdit,
    id,
    image,
    vaitro,
    handleImageChange,
}: FormStaffProps) => {
    const [vt, setVT] = useState(vaitro);
    const [accountData, setAccountData] = useState([]);
    const [defaultAccount, setDefaultAccount] = useState({ id: "", email: "" });
    useEffect(() => {
        // Function to fetch account data
        const fetchAccountData = async () => {
            try {
                const response = await fetch(
                    `${baseUrl}/api/v1/accounts/empty`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                const data = await response.json();
                setAccountData(data);
                if (iSEdit) {
                    const res = await fetch(
                        `${baseUrl}/api/v1/accounts/staff/${id}`,
                        {
                            method: "GET",
                            headers: { "Content-Type": "application/json" },
                        }
                    );
                    const d = await res.json();
                    setDefaultAccount({
                        id: d.id,
                        email: d.email,
                    });
                    console.log(d);
                    console.log(defaultAccount);
                }
            } catch (error) {
                console.error("Error fetching account data:", error);
            }
        };
        fetchAccountData();
    }, [iSEdit, id]);

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700}>
                {type} a Staff
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
                    <FormControl sx={{ flex: 1 }}>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Chọn loại nhân viên
                        </FormHelperText>
                        <Select
                            variant="outlined"
                            color="info"
                            displayEmpty
                            required
                            inputProps={{ "aria-label": "Without label" }}
                            defaultValue={vaitro}
                            {...register("vaitro", {
                                required: true,
                            })}
                            sx={{
                                "& .MuiInputBase-input": {
                                    color: "#11142d",
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "rgba(0,0,0,0.23)", // Border color when not focused
                                    },
                                },
                            }}
                        >
                            {vaitro === "admin" && (
                                <MenuItem value="admin">Admin</MenuItem>
                            )}

                            {vaitro !== "admin" && (
                                <MenuItem value="kythuat">Kỹ thuật</MenuItem>
                            )}
                            {vaitro !== "admin" && (
                                <MenuItem value="banhang">Bán hàng</MenuItem>
                            )}
                            {vaitro !== "admin" && (
                                <MenuItem value="tiepthi">Tiếp thị</MenuItem>
                            )}
                            {vaitro !== "admin" && (
                                <MenuItem value="quanly">Quản lý</MenuItem>
                            )}
                        </Select>
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
                            Chọn tài khoản
                        </FormHelperText>
                        <Select
                            variant="outlined"
                            color="info"
                            displayEmpty
                            required={!iSEdit}
                            inputProps={{ "aria-label": "Without label" }}
                            defaultValue={defaultAccount.email}
                            {...register("taiKhoanId", {
                                required: { true: !iSEdit },
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
                        >
                            {!iSEdit &&
                                accountData?.map((acc: AccountData) => (
                                    <MenuItem value={acc.id}>
                                        {acc.email}
                                    </MenuItem>
                                ))}
                            <MenuItem value={defaultAccount.id}>
                                {defaultAccount.email}
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <Stack
                        direction="column"
                        gap={1}
                        justifyContent="center"
                        mb={2}
                    >
                        <Stack direction="row" gap={2}>
                            <Typography
                                color="#11142d"
                                fontSize={16}
                                fontWeight={500}
                                my="10px"
                            >
                                Hình ảnh nhân viên
                            </Typography>

                            <Button
                                component="label"
                                sx={{
                                    width: "fit-content",
                                    color: "#2ed480",
                                    textTransform: "capitalize",
                                    fontSize: 16,
                                }}
                            >
                                Upload *
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleImageChange(e.target.files![0]);
                                    }}
                                />
                            </Button>
                        </Stack>
                        <Typography
                            fontSize={14}
                            color="#808191"
                            sx={{ wordBreak: "break-all" }}
                        >
                            {image?.name}
                        </Typography>
                    </Stack>

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

export default FormStaff;
