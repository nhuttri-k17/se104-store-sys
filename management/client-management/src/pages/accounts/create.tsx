import React from "react";
import { FieldValues } from "react-hook-form";
import { useForm } from "@refinedev/react-hook-form";
import FormAccount from "../../components/common/FormAccount";
import { useGetIdentity } from "@refinedev/core";
import { isKyThuat } from "../../utils/validateRole";
import { Indent } from "../../interfaces/common";

const AccountCreate = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { data: user } = useGetIdentity<Indent>();
    const right = isKyThuat(user?.vaitro);

    if (!right) {
        return <div>Bạn không có quyền truy cập trang này</div>;
    }

    const onFinishHandler = async (data: FieldValues) => {
        await onFinish({
            ...data,
        });
    };
    return (
        <FormAccount
            type="Create"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            onFinishHandler={onFinishHandler}
            watch={watch}
            errors={errors}
            iSEdit={false}
            right={right}
        />
    );
};

export default AccountCreate;
