import React from "react";

import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import {
    ChatBubble,
    Delete,
    Edit,
    Phone,
    Inventory,
    Star,
} from "@mui/icons-material";

import { Box, Stack, Typography } from "@mui/material";
import { CustomButton } from "../../components";

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

const ProductDetail = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const { queryResult } = useShow();
    const { mutate } = useDelete();

    const { data, isLoading, isError } = queryResult;

    const productDetails = data?.data ?? {};
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Something went wrong!</div>;

    const handleDeleteProperty = () => {
        const response = confirm(
            "Are you sure you want to delete this property?"
        );
        if (response) {
            mutate(
                {
                    resource: "products",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/products");
                    },
                }
            );
        }
    };

    return (
        <Box
            borderRadius="15px"
            padding="20px"
            bgcolor="#aaa"
            width="fit-content"
        >
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Chi tiết
            </Typography>
            <Box
                mt="20px"
                display="flex"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <Box flex={1} maxWidth={764}>
                    <img
                        src={productDetails.hinhanh}
                        alt="property_details-img"
                        height={546}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                        className="property_details-img"
                    />

                    <Box mt="15px">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                                color="#11142D"
                                textTransform="capitalize"
                            >
                                {productDetails.ten}
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    {productDetails.title}
                                </Typography>
                                <Stack
                                    mt={0.5}
                                    direction="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                    <Inventory sx={{ color: "#808191" }} />
                                    <Typography fontSize={14} color="#808191">
                                        {productDetails.soluong}
                                    </Typography>
                                </Stack>
                            </Box>
                            <Box>
                                <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    Giá sản phẩm
                                </Typography>
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    gap={1}
                                >
                                    <Typography
                                        fontSize={25}
                                        fontWeight={700}
                                        color="#475BE8"
                                    >
                                        ${productDetails.gia}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={18} color="#11142D">
                                Loại sản phẩm
                            </Typography>
                            <Typography fontSize={24} color="#808191">
                                {productDetails.loai}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
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
                                icon={<Edit />}
                                handleClick={() => {
                                    navigate(
                                        `/products/edit/${productDetails.id}`
                                    );
                                }}
                            />
                            <CustomButton
                                title={"Delete"}
                                backgroundColor={"#d42e2e"}
                                color="#FCFCFC"
                                fullWidth
                                icon={<Delete />}
                                handleClick={() => {
                                    handleDeleteProperty();
                                }}
                            />
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetail;
