import React from "react";
import { useGetIdentity } from "@refinedev/core";
import { Stack, Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import FormStrategy from "../../components/common/FormStrategy";

import { format } from "date-fns";
import { Indent } from "../../interfaces/common";

const StrategyEdit = () => {
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
    } = useForm();
    const strategyData = queryResult?.data?.data;

    const { data: user } = useGetIdentity<Indent>();
    const right = user?.vaitro === "tiepthi";

    const onFinishHandler = async (data: FieldValues) => {
        await onFinish({
            ...data,
            nhanvienId: user?.id,
        });
    };
    return (
        <Stack direction="column">
            <Typography fontSize={25} fontWeight={400}>
                Người đăng: {strategyData?.nguoidang?.ten}
            </Typography>
            <Typography fontSize={25} fontWeight={400}>
                Ngày đăng: {strategyData?.ngaydang.split("T")[0]}
            </Typography>
            <FormStrategy
                type="Edit"
                register={register}
                onFinish={onFinish}
                formLoading={formLoading}
                handleSubmit={handleSubmit}
                onFinishHandler={onFinishHandler}
                iSEdit={true}
                right={right}
            />
        </Stack>
    );
};

export default StrategyEdit;
