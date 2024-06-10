import dayjs from "dayjs";

export interface Indent {
    vaitro: string;
    id: string;
}

export interface CustomButtonProps {
    type?: string;
    title: string;
    backgroundColor: string;
    width?: string;
    color: string;
    fullWidth?: boolean;
    flex?: number;
    icon?: ReactNode;
    disabled?: boolean;
    handleClick?: () => void;
}

export interface ProfileProps {
    type: string;
    name: string;
    avatar: string;
    email: string;
    properties: Array | undefined;
}

export interface PropertyProps {
    _id: string;
    title: string;
    description: string;
    location: string;
    price: string;
    photo: string;
    creator: string;
}

export interface FormProps {
    type: string;
    register: any;
    onFinish: (
        values: FieldValues
    ) => Promise<
        void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>
    >;
    formLoading: boolean;
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
    onFinishHandler: (data: FieldValues) => Promise<void> | void;
    handleImageChange: (file) => void;
    image: { name: string; url: string };
    isDisabledType?: boolean;
}

export interface FormPropEdit {
    type: string;
    register: any;
    onFinish: (
        values: FieldValues
    ) => Promise<
        void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>
    >;
    formLoading: boolean;
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
    handleImageChange: (file) => void;
    onFinishHandler: (data: FieldValues) => Promise<void> | void;
    image: { name: string; url: string };
    isDisabledType?: boolean;
    insertNumber: React.Dispatch<React.SetStateAction<number>>;
    exportNumber: React.Dispatch<React.SetStateAction<number>>;
}

export interface FormPropEdit2 {
    type: string;
    register: any;
    onFinish: (
        values: FieldValues
    ) => Promise<
        void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>
    >;
    formLoading: boolean;
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
    handleImageChange: (file) => void;
    onFinishHandler: (data: FieldValues) => Promise<void> | void;
    image: { name: string; url: string };
    isDisabledType?: boolean;
    conlai: number;
    insertNumber: React.Dispatch<React.SetStateAction<number>>;
    exportNumber: React.Dispatch<React.SetStateAction<number>>;
}
export interface FormAccProps {
    type: string;
    register: any;
    watch?: UseFormWatch<FieldValues>;
    errors?: FieldErrors<FieldValues>;
    onFinish: (
        values: FieldValues
    ) => Promise<
        void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>
    >;
    formLoading: boolean;
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
    onFinishHandler: (data: FieldValues) => Promise<void> | void;
    iSEdit?: boolean;
    right?: boolean;
}

export interface FormStaffProps {
    type: string;
    register: any;
    onFinish: (
        values: FieldValues
    ) => Promise<
        void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>
    >;
    formLoading: boolean;
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
    onFinishHandler: (data: FieldValues) => Promise<void> | void;
    iSEdit?: boolean;
    handleImageChange: (file) => void;
    image: { name: string; url: string };
    id?: string | undefined | BaseKey | number;
    vaitro?: string;
    right?: boolean;
}

export interface FormPromProps {
    type: string;
    register: any;
    onFinish: (
        values: FieldValues
    ) => Promise<
        void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>
    >;
    formLoading: boolean;
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
    onFinishHandler: (data: FieldValues) => Promise<void> | void;
    iSEdit?: boolean;
    setValue: UseFormSetValue<FieldValues>;
    control: Control<FieldValues>;
    errors: FieldErrors<FieldValues>;
    start?: dayjs.Dayjs;
    end?: dayjs.Dayjs;
    right?: boolean;
}
