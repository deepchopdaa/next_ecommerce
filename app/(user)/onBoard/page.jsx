"use client";

import { useForm, useFieldArray } from "react-hook-form";
import {
    Box,
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    IconButton,
    Divider,
    Grid
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SnackbarSimple from "../Components/SnakeBar";
import { onBoardUser } from "../services/onBoard"
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SellerBranchForm() {

    const router = useRouter()

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            seller: {
                accountName: "",
            },
            branches: [
                {
                    branchName: "",
                    contactNo: "",
                    address: "",
                    city: "",
                    state: "",
                    country: "",
                    pincode: ""
                }
            ]
        }
    });

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "branches"
    });

    const onSubmit = async (data) => {
        console.log("Payload ", data);
        try {
            const userId = localStorage.getItem("userId")
            console.log(userId, "userId")
            const res = await onBoardUser(data)
            setSnack({
                open: true,
                message: "onBoard are successfully!",
                severity: "success",
            });
            router.push("/login")
        } catch (error) {

            setSnack({
                open: true,
                message: "OnBoarding Not Feild!",
                severity: "error",
            });

        }
        // { seller, branches }
    };

    return (
        <>
            <Box className="max-w-5xl mx-auto mt-10 px-4">
                <Card className="shadow-xl rounded-2xl">
                    <CardContent>

                        {/* ================= SELLER (ONE) ================= */}
                        <Typography variant="h5" fontWeight={600} className="mb-4">
                            Seller Details
                        </Typography>

                        <Grid container mt={2} mb={2} spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Account Name"
                                    {...register("seller.accountName", { required: true })}
                                    error={!!errors?.seller?.accountName}
                                    helperText={errors?.seller?.accountName && "Required"}
                                />
                            </Grid>
                        </Grid>

                        <Divider />

                        {/* ================= BRANCH (MAX 5) ================= */}
                        <div className="flex justify-between items-center mb-5">
                            <Typography variant="h6" mt={2} fontWeight={600}>
                                Branch Details (Max 5)
                            </Typography>

                            <Button
                                startIcon={<AddIcon />}
                                color="info"
                                variant="contained"
                                disabled={fields.length >= 5}
                                onClick={() =>
                                    append({
                                        branchName: "",
                                        address: "",
                                        city: "",
                                        state: "",
                                        country: "",
                                        pincode: ""
                                    })
                                }
                            >
                                Add Branch
                            </Button>
                        </div>

                        {fields.map((item, index) => (
                            <Card
                                key={item.id}
                                className="mt-3 border border-gray-200 rounded-xl"
                            >
                                <CardContent>
                                    <Grid container spacing={2}>

                                        {[
                                            "branchName",
                                            "contactNo",
                                            "address",
                                            "city",
                                            "state",
                                            "country",
                                            "pincode"
                                        ].map((field) => (
                                            <Grid item xs={12} sm={6} key={field}>
                                                <TextField
                                                    fullWidth
                                                    label={field.replace(/([A-Z])/g, " $1")}
                                                    {...register(`branches.${index}.${field}`, {
                                                        required: true
                                                    })}
                                                    error={!!errors?.branches?.[index]?.[field]}
                                                    helperText={
                                                        errors?.branches?.[index]?.[field] && "Required"
                                                    }
                                                />
                                            </Grid>
                                        ))}

                                        <Grid item xs={12} className="text-right">
                                            {fields.length > 1 && (
                                                <IconButton color="error" onClick={() => remove(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            )}
                                        </Grid>

                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            className="mt-8 rounded-xl"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Save Seller & Branches
                        </Button>

                    </CardContent>
                </Card>
            </Box>
            <SnackbarSimple
                open={snack.open}
                setOpen={(open) => setSnack({ ...snack, open })}
                message={snack.message}
                severity={snack.severity}
            />
        </>
    );
}
