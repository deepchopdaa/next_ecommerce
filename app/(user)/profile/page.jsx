"use client";

import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Avatar,
    Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { getUserDetail, updateUserDetail } from "../services/profile";
import SnackbarSimple from "../Components/SnakeBar";

export default function UserProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [userId, setuserId] = useState(null)
    const [token, setToken] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    useEffect(() => {
        const t = localStorage.getItem("token");
        setToken(t);
    }, []);

    // 🔹 Fetch user
    useEffect(() => {
        if (!token) return;

        const fetchUser = async () => {
            try {
                const data = await getUserDetail(token)
                setuserId(data?.user?._id)
                setValue("name", data?.user?.name);
                setValue("email", data?.user?.email);
            } catch (error) {
                setSnack({
                    open: true,
                    message: error.message || "User Detail Not Found !",
                    severity: "error",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [token, setValue]);

    // 🔹 Update profile
    const onSubmit = async (formData) => {
        try {
            setSaving(true);
            const res = await updateUserDetail({ formData, userId, token })

            setSnack({
                open: true,
                message: "Profile updated Successfully !",
                severity: "success",
            });
        } catch (error) {
            setSnack({
                open: true,
                message: error.message || "User Profile Not Updated !",
                severity: "error",
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box className="flex h-screen items-center justify-center">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    bgcolor: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                }}
            >
                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 420,
                        borderRadius: 4,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        {/* Header */}
                        <Box textAlign="center" mb={3}>
                            <Avatar
                                sx={{
                                    mx: "auto",
                                    mb: 1,
                                    width: 72,
                                    height: 72,
                                    bgcolor: "indigo.500",
                                    fontSize: 28,
                                }}
                            >
                                {String(setValue?.name || "U")[0]}
                            </Avatar>

                            <Typography variant="h6" fontWeight={700}>
                                Profile Settings
                            </Typography>3
                            <Typography variant="body2" color="text.secondary">
                                Manage your account details
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box mb={2.5}>
                                <TextField
                                    label="Full Name"
                                    fullWidth
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: {
                                            value: 3,
                                            message: "Minimum 3 characters",
                                        },
                                    })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            </Box>

                            <Box mb={3}>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    {...register("email")}
                                    helperText={errors.email?.message}
                                />
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                size="large"
                                disabled={saving}
                                sx={{
                                    py: 1.4,
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    bgcolor: "#4f46e5",
                                    ":hover": {
                                        bgcolor: "#3f34b3ff",
                                    },
                                }}
                            >
                                {saving ? "Saving..." : "Update Profile"}
                            </Button>
                        </form>
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
