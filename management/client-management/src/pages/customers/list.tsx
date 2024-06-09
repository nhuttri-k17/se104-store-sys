import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDelete, useTable } from "@refinedev/core";
import React, { useState } from "react";
import { CustomButton } from "../../components";
import { useNavigate } from "react-router-dom";
import { Edit, Delete, Add } from "@mui/icons-material";
import SmallButton from "../../components/common/SmallButton";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { escapeRegExp } from "@mui/x-data-grid/utils/utils";
import { format } from "date-fns";
interface QuickSearchToolbarProps {
    clearSearch: () => void;
    onChange: () => void;
    value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
    return (
        <div>
            <TextField
                fullWidth
                sx={{
                    width: "70%",
                    padding: "5px 10px",
                    borderRadius: "5px",
                }}
                size="medium"
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{
                                visibility: props.value ? "visible" : "hidden",
                            }}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
            />
        </div>
    );
}

const CustomerList = () => {
    const {
        tableQueryResult: { data, isLoading, isError },
    } = useTable();
    const navigate = useNavigate();
    const { mutate } = useDelete();
    const handleDeleteProperty = (uid: string) => {
        const response = confirm(
            "Bạn có chắc chắn muốn xóa khách hàng này không?"
        );
        if (response) {
            mutate(
                {
                    resource: "customers",
                    id: uid as string,
                },
                {
                    onSuccess: () => {
                        navigate("/customers");
                    },
                }
            );
        }
    };

    const customersData = data?.data ?? [];

    const [searchText, setSearchText] = useState("");
    const [rows, setRows] = useState<any[]>(customersData);

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        const filteredRows = customersData.filter((row: any) => {
            return Object.keys(row).some((field: any) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    React.useEffect(() => {
        setRows(customersData);
    }, [customersData]);

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "ten",
            headerName: "Tên",
            flex: 1,
        },
        {
            field: "email",
            headerName: "email",
            flex: 1,
        },
        {
            field: "sdt",
            headerName: "SDT",
            flex: 1,
        },
        {
            field: "ngaylap",
            headerName: "Ngày lập",
            flex: 1,
            valueFormatter: ({ value }) => {
                return format(new Date(value), "yyyy-MM-dd");
            },
        },
        {
            field: "action",
            headerName: "Hành động",
            flex: 0.75,
            sortable: false,
            renderCell: (params) => {
                return (
                    <span
                        style={{
                            display: "none",
                        }}
                    >
                        <SmallButton
                            title={""}
                            backgroundColor={"#d42e2e"}
                            color="#FCFCFC"
                            fullWidth={false}
                            icon={<Delete />}
                            handleClick={() => {
                                handleDeleteProperty(params.row.id);
                            }}
                        />
                    </span>
                );
            },
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Stack direction="column" width="100%">
                <Stack
                    direction="row"
                    width="100%"
                    justifyContent="space-between"
                >
                    <Typography
                        fontSize={25}
                        fontWeight={700}
                        paddingBlockEnd={2}
                    >
                        Khách hàng
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        {false && (
                            <CustomButton
                                title="Thêm khách hàng"
                                handleClick={() =>
                                    navigate("/customers/create")
                                }
                                backgroundColor="#475be8"
                                color="#fcfcfc"
                                icon={<Add />}
                            />
                        )}
                    </Stack>
                </Stack>
                <Box mt="40px" height="fit-content">
                    <DataGrid
                        components={{ Toolbar: QuickSearchToolbar }}
                        loading={isLoading || !data}
                        getRowId={(row) => row.id}
                        rows={rows}
                        columns={columns}
                        componentsProps={{
                            toolbar: {
                                value: searchText,
                                onChange: (
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => requestSearch(event.target.value),
                                clearSearch: () => requestSearch(""),
                            },
                        }}
                    />
                </Box>
            </Stack>
        </Box>
    );
};

export default CustomerList;
