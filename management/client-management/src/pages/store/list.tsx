import { Add } from "@mui/icons-material";
import {
    Box,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useList, useNavigation, useTable } from "@refinedev/core";
import React, { useMemo } from "react";
import { CustomButton, PropertyCard } from "../../components";
import { useNavigate } from "react-router-dom";
import { itemGenres } from "../../constants";

const StoreProductList = () => {
    const {
        tableQueryResult: { data, isLoading, isError },
        current,
        setCurrent,
        setPageSize,
        pageCount,
        sorter,
        setSorter,
        filters,
        setFilters,
    } = useTable();

    const allProducts = data?.data ?? [];
    const currentPrice = sorter.find((item) => item.field === "gia")?.order;
    console.log(allProducts);

    const toggleSort = (field: string) => {
        setSorter([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
    };

    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) =>
            "field" in item ? item : []
        );

        return {
            ten:
                logicalFilters.find((item) => item.field === "ten")?.value ||
                "",
            loai:
                logicalFilters.find((item) => item.field === "loai")?.value ||
                "",
        };
    }, [filters]);

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error...</Typography>;
    return (
        <Box>
            <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Stack direction="column" width="100%">
                    <Typography fontSize={25} fontWeight={700}>
                        {!allProducts.length
                            ? "Không có sản phẩm nào"
                            : `Tất cả sản phẩm ${
                                  itemGenres[
                                      currentFilterValues.loai as keyof typeof itemGenres
                                  ]
                                      ? itemGenres[
                                            currentFilterValues.loai as keyof typeof itemGenres
                                        ]
                                      : ""
                              }`}
                    </Typography>
                    <Box
                        mb={2}
                        mt={3}
                        display="flex"
                        width="84%"
                        justifyContent="space-between"
                        flexWrap="wrap"
                    >
                        <Box
                            display="flex"
                            gap={2}
                            flexWrap="wrap"
                            mb={{ xs: "20px", sm: 0 }}
                        >
                            <CustomButton
                                title={`Sắp xếp theo giá ${
                                    currentPrice === "asc" ? "↑" : "↓"
                                }`}
                                handleClick={() => toggleSort("gia")}
                                backgroundColor="#475be8"
                                color="#fcfcfc"
                            />
                            <TextField
                                variant="outlined"
                                color="info"
                                placeholder="Search by title"
                                value={currentFilterValues.ten}
                                onChange={(e) => {
                                    setFilters([
                                        {
                                            field: "ten",
                                            operator: "contains",
                                            value: e.currentTarget.value
                                                ? e.currentTarget.value
                                                : undefined,
                                        },
                                    ]);
                                }}
                            />
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue=""
                                value={currentFilterValues.loai}
                                onChange={(e) => {
                                    setFilters(
                                        [
                                            {
                                                field: "loai",
                                                operator: "eq",
                                                value: e.target.value,
                                            },
                                        ],
                                        "replace"
                                    );
                                }}
                            >
                                <MenuItem value="">All</MenuItem>
                                {[
                                    "Nhẫn",
                                    "Vòng tay",
                                    "Đồng hồ",
                                    "Khuyên tai",
                                    "Móng tay giả",
                                    "Trang sức",
                                ].map((type) => (
                                    <MenuItem
                                        key={type}
                                        value={type.toLowerCase()}
                                    >
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                </Stack>
            </Box>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                {/* <CustomButton
                    title="Add Property"
                    handleClick={() => navigate("/products/create")}
                    backgroundColor="#475be8"
                    color="#fcfcfc"
                    icon={<Add />}
                /> */}
            </Stack>
            <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {allProducts?.map((property) => (
                    <PropertyCard
                        key={property.id}
                        id={property.id}
                        ten={property.ten}
                        loai={property.loai}
                        soluong={property.soluong}
                        gia={property.gia}
                        hinhanh={property.hinhanh}
                        tinhtrang={property.tinhtrang}
                        type="store"
                    />
                ))}
            </Box>
            {/* PAGINATION */}
            {allProducts.length > 0 && (
                <Box display="flex" gap={2} mt={3} flexWrap="wrap">
                    <CustomButton
                        title="Previous"
                        handleClick={() => setCurrent((prev) => prev - 1)}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        disabled={!(current > 1)}
                    />
                    <Box
                        display={{ xs: "hidden", sm: "flex" }}
                        alignItems="center"
                        gap="5px"
                    >
                        Page{" "}
                        <strong>
                            {current} of {pageCount}
                        </strong>
                    </Box>
                    <CustomButton
                        title="Next"
                        handleClick={() => setCurrent((prev) => prev + 1)}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        disabled={current === pageCount}
                    />
                    <Select
                        variant="outlined"
                        color="info"
                        displayEmpty
                        required
                        inputProps={{ "aria-label": "Without label" }}
                        defaultValue={10}
                        onChange={(e) =>
                            setPageSize(
                                e.target.value ? Number(e.target.value) : 10
                            )
                        }
                    >
                        {[10, 20, 30, 40, 50].map((size) => (
                            <MenuItem key={size} value={size}>
                                Show {size}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            )}
        </Box>
    );
};

export default StoreProductList;
