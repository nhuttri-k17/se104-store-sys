import React from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import FormPromotion from "../../components/common/FormPromotion";
import { isTiepThi } from "../../utils/validateRole";

const PromotionCreate = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        setValue,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { data: user } = useGetIdentity();
    const right = isTiepThi(user?.vaitro);
    if (!right) {
        return <div>Bạn không có quyền truy cập trang này</div>;
    }

    const onFinishHandler = async (data: FieldValues) => {
        await onFinish({
            ...data,
        });
    };
    return (
        <FormPromotion
            type="Create"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            onFinishHandler={onFinishHandler}
            setValue={setValue}
            control={control}
            errors={errors}
            right={right}
        />
    );
};

export default PromotionCreate;
