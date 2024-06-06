import {
    Delete,
    Inventory,
    CategoryOutlined,
    MonetizationOn,
    Warehouse,
    Edit,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

import { PropertyCardProps } from "../../interfaces/property";
import CustomButton from "./CustomButton";
import { useDelete } from "@refinedev/core";
import { itemGenres } from "../../constants";

const PropertyCard = ({
    id,
    ten,
    soluong,
    loai,
    gia,
    hinhanh,
    tinhtrang,
    type,
}: PropertyCardProps) => {
    const navigate = useNavigate();
    const { mutate } = useDelete();
    const handleDeleteProperty = () => {
        const response = confirm(
            "Are you sure you want to delete this products?"
        );
        if (response) {
            mutate(
                {
                    resource: `${type}`,
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate(`/${type}`);
                    },
                }
            );
        }
    };

    return (
        <Card
            // component={Link}
            // to={`/products/show/${id}`}
            sx={{
                maxWidth: "330px",
                padding: "10px",
                bgcolor: "#ddd",
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
                },
                cursor: "pointer",
                textDecoration: "none",
            }}
            elevation={0}
        >
            <CardMedia
                component="img"
                width="100%"
                height={210}
                image={hinhanh}
                alt="card image"
                sx={{ borderRadius: "10px", objectFit: "contain" }}
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "10px",
                    paddingX: "15px",
                }}
            >
                <Stack direction="row" gap={1} justifyContent="space-between">
                    <Stack direction="column" gap={1}>
                        <Typography
                            fontSize={16}
                            fontWeight={500}
                            color="#11142d"
                        >
                            {ten}
                        </Typography>
                        <Stack direction="row" gap={0.5} alignItems="">
                            <CategoryOutlined
                                sx={{
                                    fontSize: 18,
                                    color: "#11142d",
                                    marginTop: 0.5,
                                }}
                            />
                            <Typography fontSize={14} color="#808191">
                                {itemGenres[loai as keyof typeof itemGenres]}
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <Stack
                                direction="row"
                                gap={0.5}
                                alignItems="center"
                            >
                                <Inventory
                                    sx={{
                                        fontSize: 18,
                                        color: "#11142d",
                                        marginTop: 0.5,
                                    }}
                                />
                                <Typography fontSize={14} color="#808191">
                                    {soluong}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack direction="column">
                        <Box
                            px={1.5}
                            py={0.5}
                            borderRadius={1}
                            bgcolor="#9498dc"
                            height="fit-content"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography
                                fontSize={12}
                                fontWeight={600}
                                color="#1e36e4"
                            >
                                {gia}VND
                            </Typography>
                        </Box>
                        <Stack
                            direction="row"
                            gap={0.5}
                            alignItems="end"
                            height="100%"
                            justifyContent="end"
                            paddingBlockStart={1}
                        >
                            {tinhtrang === "chưa bán" ? (
                                <>
                                    <Warehouse
                                        sx={{
                                            fontSize: 18,
                                            color: "#11142d",
                                            marginTop: 0.5,
                                        }}
                                    />
                                    <Typography
                                        fontSize={14}
                                        color="#808191"
                                        sx={{
                                            display: "inline-block",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        chưa bán
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <MonetizationOn
                                        sx={{
                                            fontSize: 18,
                                            color: "#15a100",
                                            marginTop: 0.5,
                                        }}
                                    />
                                    <Typography
                                        fontSize={14}
                                        color="#808191"
                                        sx={{
                                            display: "inline-block",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        đang bán
                                    </Typography>
                                </>
                            )}
                        </Stack>
                    </Stack>
                </Stack>

                <Stack
                    width="100%"
                    mt="25px"
                    direction="row"
                    flexWrap="wrap"
                    gap={2}
                >
                    <CustomButton
                        title={"Edit"}
                        backgroundColor="#475BE8"
                        color="#FCFCFC"
                        fullWidth
                        flex={1}
                        icon={<Edit />}
                        handleClick={() => {
                            navigate(`/${type}/edit/${id}`);
                        }}
                    />
                    <CustomButton
                        title={"Delete"}
                        backgroundColor={"#d42e2e"}
                        color="#FCFCFC"
                        fullWidth
                        flex={1}
                        icon={<Delete />}
                        handleClick={() => {
                            handleDeleteProperty();
                        }}
                    />
                </Stack>
            </CardContent>
        </Card>
    );
};

export default PropertyCard;
