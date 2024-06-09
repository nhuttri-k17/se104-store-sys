import { useGetIdentity, useTable } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import FormAccount from "../../components/common/FormAccount";
import React, { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { isKyThuat } from "../../utils/validateRole";

const AccountEdit = () => {
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm();
    useEffect(() => {
        setValue("password", "");
    }, []);
    const onFinishHandler = async (data: FieldValues) => {
        await onFinish({
            ...data,
        });
    };

    const data = queryResult?.data?.data;

    const { data: user } = useGetIdentity();
    const right = isKyThuat(user?.vaitro);
    if (data && data?.email === "alice@gami9l.com") {
        return <div>Bạn không thể chỉnh sửa tài khoản này</div>;
    }
    return (
        <FormAccount
            type="Edit"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            onFinishHandler={onFinishHandler}
            watch={watch}
            errors={errors}
            iSEdit={true}
            right={right}
        />
    );
};

export default AccountEdit;
