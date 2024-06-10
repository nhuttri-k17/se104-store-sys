import React from "react";
import { FieldValues } from "react-hook-form";
import { useForm } from "@refinedev/react-hook-form";
import FormPromotion from "../../components/common/FormPromotion";
import dayjs from "dayjs";
import { useGetIdentity } from "@refinedev/core";
import { isTiepThi } from "../../utils/validateRole";
import { Indent } from "../../interfaces/common";

const PromotionEdit = () => {
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        setValue,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const promo = queryResult?.data?.data;
    const { data: user } = useGetIdentity<Indent>();
    const right = isTiepThi(user?.vaitro);
    const onFinishHandler = async (data: FieldValues) => {
        await onFinish({
            ...data,
        });
    };
    return (
        <FormPromotion
            type="Edit"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            onFinishHandler={onFinishHandler}
            setValue={setValue}
            control={control}
            errors={errors}
            start={dayjs(promo?.ngaybatdau.split("T")[0])}
            end={dayjs(promo?.ngayketthuc.split("T")[0])}
            right={right}
        />
    );
};

export default PromotionEdit;
