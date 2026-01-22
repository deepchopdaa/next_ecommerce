"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { updateSellerBranch } from "../services/profile";
import SnackbarSimple from "@/app/(user)/Components/SnakeBar";

export default function EditSellerModal({ open, handleClose, seller }) {
    const [token, setToken] = useState(null);
    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        defaultValues: {
            accountName: "",
            userName: "",
            userEmail: ""
        }
    });
    // 🔹 Prefill data when modal opens
    useEffect(() => {
        if (seller) {
            reset({
                accountName: seller?.accountName || "",
                userName: seller?.user?.name || "",
                userEmail: seller?.user?.email || ""
            });
        }
    }, [seller, reset]);

    useEffect(() => {
        const t = localStorage.getItem("token");
        setToken(t);
    }, []);

    // 🔹 Submit handler
    const onSubmit = async (data) => {
        try {
            await updateSellerBranch({ data, seller, token })
            handleClose()
            setSnack({
                open: true,
                message: "Profile Update successfully!",
                severity: "success",
            });
        } catch (error) {
            setSnack({
                open: true,
                message: error.message || "Profile Update Failed !",
                severity: "error",
            });
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit Seller Details</DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Stack spacing={2}>

                            {/* Seller Account Name */}
                            <TextField
                                label="Account Name"
                                fullWidth
                                {...register("accountName", {
                                    required: "Account name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Minimum 3 characters"
                                    }
                                })}
                                error={!!errors.accountName}
                                helperText={errors.accountName?.message}
                            />

                            {/* User Name */}
                            <TextField
                                label="User Name"
                                fullWidth
                                {...register("userName", {
                                    required: "User name is required"
                                })}
                                error={!!errors.userName}
                                helperText={errors.userName?.message}
                            />

                            {/* User Email */}
                            <TextField
                                label="User Email"
                                fullWidth
                                {...register("userEmail", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email format"
                                    }
                                })}
                                error={!!errors.userEmail}
                                helperText={errors.userEmail?.message}
                            />

                        </Stack>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            type="submit"
                            color="info"
                            variant="contained"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Updating..." : "Update"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <SnackbarSimple
                open={snack.open}
                setOpen={(open) => setSnack({ ...snack, open })}
                message={snack.message}
                severity={snack.severity}
            />
        </>
    );
}
