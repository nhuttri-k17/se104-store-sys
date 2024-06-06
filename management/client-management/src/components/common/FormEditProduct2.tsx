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

import { FormPropEdit2 } from "../../interfaces/common";
import CustomButton from "./CustomButton";
import { engToViet } from "../../constants";

const FormEditProduct2 = ({
    type,
    register,
    handleSubmit,
    handleImageChange,
    formLoading,
    onFinishHandler,
    image,
    isDisabledType,
    insertNumber,
    exportNumber,
    conlai,
}: FormPropEdit2) => {
    const title = engToViet[type as keyof typeof engToViet] + " sản phẩm";
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700}>
                {title}
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
                        <FormControl>
                            <Typography>
                                Sản phẩm trong kho: {conlai}
                            </Typography>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Nhập hàng
                            </FormHelperText>
                            <TextField
                                fullWidth
                                required
                                type="number"
                                id="outlined-basic"
                                color="info"
                                defaultValue={0}
                                variant="outlined"
                                onChange={(event) => {
                                    insertNumber(Number(event.target.value));
                                }}
                            />
                        </FormControl>
                        <CustomButton
                            type="submit"
                            title={
                                formLoading ? "Đang xác nhận..." : "Xác nhận"
                            }
                            backgroundColor="#475be8"
                            color="#fcfcfc"
                        />
                    </form>
                </Box>
                <Box
                    mt={2.5}
                    borderRadius="15px"
                    padding="20px"
                    bgcolor="#aaa"
                    flex={2}
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
                        <FormControl>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Nhập tên sản phẩm
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
                                Mô tả
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
                                {...register("mota", { required: true })}
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
                                    Nhập loại sản phẩm
                                </FormHelperText>
                                <Select
                                    variant="outlined"
                                    color="info"
                                    displayEmpty
                                    required
                                    inputProps={{
                                        "aria-label": "Without label",
                                    }}
                                    {...register("loai", {
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
                                    <MenuItem value="nhan">Nhẫn</MenuItem>
                                    <MenuItem value="vong-tay">
                                        Vòng tay
                                    </MenuItem>
                                    <MenuItem value="dong-ho">Đồng hồ</MenuItem>
                                    <MenuItem value="khuyen-tai">
                                        Khuyên tai
                                    </MenuItem>
                                    <MenuItem value="mong-tay-gia">
                                        Móng tay giả
                                    </MenuItem>
                                    <MenuItem value="trang-suc">
                                        Trang sức
                                    </MenuItem>
                                </Select>
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
                                    Nhập giá sản phẩm
                                </FormHelperText>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-basic"
                                    color="info"
                                    type="number"
                                    variant="outlined"
                                    {...register("gia", { required: true })}
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
                                />
                            </FormControl>
                        </Stack>

                        <Stack
                            direction="column"
                            gap={1}
                            justifyContent="center"
                            mb={2}
                        >
                            <Stack direction="row" gap={2}>
                                <FormControl>
                                    <FormHelperText
                                        sx={{
                                            fontWeight: 500,
                                            margin: "10px 0",
                                            fontSize: 16,
                                            color: "#11142d",
                                        }}
                                    >
                                        Nhập số lượng sản phẩm
                                    </FormHelperText>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        color="info"
                                        type="number"
                                        variant="outlined"
                                        {...register("soluong", {
                                            required: true,
                                        })}
                                        sx={{
                                            "& .MuiInputBase-input": {
                                                color: "#11142d",
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor:
                                                        "rgba(0,0,0,0.23)", // Border color when not focused
                                                },
                                            },
                                        }}
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
                                        Tình trạng
                                    </FormHelperText>
                                    <Select
                                        variant="outlined"
                                        color="info"
                                        displayEmpty
                                        required
                                        disabled={isDisabledType}
                                        inputProps={{
                                            "aria-label": "Without label",
                                        }}
                                        {...register("tinhtrang", {
                                            required: true,
                                        })}
                                        sx={{
                                            "& .MuiInputBase-input": {
                                                color: "#11142d",
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor:
                                                        "rgba(0,0,0,0.23)", // Border color when not focused
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem value="chưa bán">
                                            chưa bán
                                        </MenuItem>
                                        <MenuItem value="đang bán">
                                            đang bán
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Stack direction="row" gap={2}>
                                <Typography
                                    color="#11142d"
                                    fontSize={16}
                                    fontWeight={500}
                                    my="10px"
                                >
                                    Hình ảnh sản phẩm
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
                                            handleImageChange(
                                                e.target.files![0]
                                            );
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
                            title={
                                formLoading ? "Đang xác nhận..." : "Xác nhận"
                            }
                            backgroundColor="#475be8"
                            color="#fcfcfc"
                        />
                    </form>
                </Box>
            </Stack>
        </Box>
    );
};

export default FormEditProduct2;
