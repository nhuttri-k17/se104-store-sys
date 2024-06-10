import React from "react";
import { useGetIdentity, useShow, useTable } from "@refinedev/core";
import {
    PieChart,
    PropertyReferrals,
    TotalRevenue,
    PropertyCard,
} from "../../components";

import { Typography, Box, Stack } from "@mui/material";
import { isQuanLy } from "../../utils/validateRole";
import { Indent } from "../../interfaces/common";

interface Stat {
    total_sale: number;
    customer: number;
    this_month_customer: number;
    this_month_sale: number;
    last_month_sale: number;
    top_product_sale: any[];
    year: { tonggiatri: number }[];
}
const DashboardHome = () => {
    const {
        tableQueryResult: { data, isLoading, isError },
    } = useTable();

    const stat = (data?.data ?? {}) as Partial<Stat>;
    const totalRevenue = stat?.total_sale;
    const totalCustomer = stat?.customer;
    const newCustomer = stat?.this_month_customer;
    const saleThisMonth = stat?.this_month_sale;

    const totalThisMonth = saleThisMonth;
    const totalLastMonth = stat?.last_month_sale;

    const productSoldTop5ThisMonth = stat?.top_product_sale || [];
    const yearData = stat?.year?.map(({ tonggiatri }) => tonggiatri) || [];

    const { data: quanly } = useGetIdentity<Indent>();
    const right = isQuanLy(quanly?.vaitro);

    if (!right) {
        return <div>Bạn không có quyền truy cập trang này</div>;
    }

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Something went wrong!</Typography>;
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Thống kê
            </Typography>

            <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart
                    title="Tổng doanh thu"
                    value={totalRevenue}
                    series={[75, 25]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Tống số khách hàng"
                    value={totalCustomer}
                    series={[75, 25]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Khách hàng mới"
                    value={newCustomer}
                    series={[60, 40]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Doanh thu tháng này"
                    value={saleThisMonth}
                    series={[75, 25]}
                    colors={["#275be8", "#c4e8ef"]}
                />
            </Box>

            <Stack
                mt="25px"
                width="100%"
                direction={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <TotalRevenue
                    totalThisMonth={totalThisMonth}
                    totalLastMonth={totalLastMonth}
                    datas={yearData || []}
                />
                <PropertyReferrals
                    productSoldTop5ThisMonth={productSoldTop5ThisMonth}
                    totalThisMonth={totalThisMonth}
                />
            </Stack>

            {/* <Box
                flex={1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
            >
                <Typography fontSize="18px" fontWeight={600} color="#11142d">
                    Latest Properties
                </Typography>

                <Box
                    mt={2.5}
                    sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                >
                    {latestProperties.map((property) => (
                        <PropertyCard
                            key={property._id}
                            id={property._id}
                            title={property.title}
                            location={property.location}
                            price={property.price}
                            photo={property.photo}
                        />
                    ))}
                </Box>
            </Box> */}
        </Box>
    );
};

export default DashboardHome;
