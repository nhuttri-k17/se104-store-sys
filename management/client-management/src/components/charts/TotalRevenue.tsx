import React from "react";
import ReactApexChart from "react-apexcharts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ArrowCircleUpRounded from "@mui/icons-material/ArrowCircleUpRounded";
import ArrowCircleDownRounded from "@mui/icons-material/ArrowCircleDownRounded";

import { TotalRevenueOptions, TotalRevenueSeries } from "./chart.config";

// interface TotalRevenueProps {
//     totalThisMonth: number;
//     totalLastMonth: number;
//     monthlyRevenue: [];
// }

const TotalRevenue = ({ totalThisMonth, totalLastMonth, datas }) => {
    const percentage = (
        ((totalThisMonth - totalLastMonth) / totalLastMonth) *
        100
    ).toFixed(3);
    const [monthlyRevenue, setMonthlyRevenue] = React.useState([
        {
            name: "Revenue",
            data: [183, 124, 115, 85, 143, 143, 96, 10, 1, 10, 100, 1],
        },
    ]);

    React.useEffect(
        () =>
            setMonthlyRevenue([
                {
                    name: "Revenue",
                    data: datas,
                },
            ]),
        []
    );
    return (
        <Box
            p={4}
            flex={1}
            bgcolor="#fcfcfc"
            id="chart"
            display="flex"
            flexDirection="column"
            borderRadius="15px"
        >
            <Typography fontSize={18} fontWeight={600} color="#11142d">
                Tổng doanh thu hiện tại
            </Typography>

            <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
                {totalThisMonth > totalLastMonth ? (
                    <>
                        <Typography
                            fontSize={28}
                            fontWeight={700}
                            color="#11142d"
                        >
                            ${totalThisMonth}
                        </Typography>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <ArrowCircleUpRounded
                                sx={{ fontSize: 25, color: "#475be8" }}
                            />
                            <Stack>
                                <Typography fontSize={15} color="#475be8">
                                    {percentage}%
                                </Typography>
                                <Typography fontSize={12} color="#808191">
                                    So với tháng trước
                                </Typography>
                            </Stack>
                        </Stack>
                    </>
                ) : (
                    <>
                        <Typography
                            fontSize={28}
                            fontWeight={700}
                            color="#11142d"
                        >
                            {totalThisMonth} VND
                        </Typography>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <ArrowCircleDownRounded
                                sx={{ fontSize: 25, color: "#D10363" }}
                            />
                            <Stack>
                                <Typography fontSize={15} color="#D10363">
                                    {-percentage}%
                                </Typography>
                                <Typography fontSize={12} color="#808191">
                                    So với tháng trước
                                </Typography>
                            </Stack>
                        </Stack>
                    </>
                )}
            </Stack>

            <ReactApexChart
                series={monthlyRevenue} //{TotalRevenueSeries}
                type="bar"
                height={310}
                options={TotalRevenueOptions}
            />
        </Box>
    );
};

export default TotalRevenue;
