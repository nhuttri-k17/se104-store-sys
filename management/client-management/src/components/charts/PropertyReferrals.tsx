import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { propertyReferralsInfo } from "../../constants/index";

interface ProgressBarProps {
    title: string;
    percentage: number;
    color: string;
}

const ProgressBar = ({ title, percentage, color }: ProgressBarProps) => (
    <Box width="100%">
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Typography fontSize={16} fontWeight={500} color="#11142d">
                {title}
            </Typography>
            <Typography fontSize={16} fontWeight={500} color="#11142d">
                {percentage}%
            </Typography>
        </Stack>
        <Box
            mt={2}
            position="relative"
            width="100%"
            height="8px"
            borderRadius={1}
            bgcolor="#e4e8ef"
        >
            <Box
                width={`${percentage}%`}
                bgcolor={color}
                position="absolute"
                height="100%"
                borderRadius={1}
            />
        </Box>
    </Box>
);

interface PropertyReferralsProps {
    productSoldTop5ThisMonth: [];
    totalThisMonth: number;
}

const PropertyReferrals = ({ productSoldTop5ThisMonth, totalThisMonth }) => {
    const colors = ["#6C5DD3", "#7FBA7A", "#FFCE73", "#FFA2C0", "#F45252"];
    return (
        <Box
            p={4}
            bgcolor="#fcfcfc"
            id="chart"
            minWidth={490}
            display="flex"
            flexDirection="column"
            borderRadius="15px"
        >
            <Typography fontSize={18} fontWeight={600} color="#11142d">
                Top 5 sản phẩm bán chạy nhất
            </Typography>

            <Stack my="20px" direction="column" gap={4}>
                {productSoldTop5ThisMonth.map((pro, index) => (
                    <ProgressBar
                        key={pro.id}
                        title={pro.ten}
                        percentage={
                            index < productSoldTop5ThisMonth.lenth - 1
                                ? Math.floor(
                                      (pro.tonggiatri * 100) / totalThisMonth
                                  )
                                : Math.ceil(
                                      (pro.tonggiatri * 100) / totalThisMonth
                                  )
                        }
                        color={colors[index]}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default PropertyReferrals;
