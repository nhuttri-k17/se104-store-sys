import React from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import FormStrategy from "../../components/common/FormStrategy";
import { isTiepThi } from "../../utils/validateRole";
import { Indent } from "../../interfaces/common";

const StrategyCreate = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
    } = useForm();

    const { data: user } = useGetIdentity<Indent>();
    const right = isTiepThi(user?.vaitro);
    if (!right) {
        return <div>Bạn không có quyền truy cập trang này</div>;
    }

    const onFinishHandler = async (data: FieldValues) => {
        await onFinish({
            ...data,
            nhanvienId: user?.id,
        });
    };

    return (
        <FormStrategy
            type="Create"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            onFinishHandler={onFinishHandler}
            right={right}
        />
    );
};

export default StrategyCreate;
