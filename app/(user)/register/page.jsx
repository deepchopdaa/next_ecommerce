"use client";

import { useState } from "react";
import { registerUser } from "../services/authService";
import SnackbarSimple from "../Components/SnakeBar";
import { useForm } from "react-hook-form"
import {
    Button,
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";
import { Switch, FormControlLabel } from "@mui/material";

import { useRouter } from "next/navigation";
import StyledTextField from "@/app/components/StyledTextField";


export default function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [isSeller, setIsSeller] = useState(true);

    const { register, handleSubmit, formState: { errors } } = useForm({
        shouldUseNativeValidation: true,
    })

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const Router = useRouter()


    const submitform = async (values) => {
        try {
            setLoading(true);

            const payload = {
                ...values,
                role: isSeller ? "seller" : "user",
            };

            const data = await registerUser(payload);
            console.log(data)
            const role = data?.user?.role;
            const userId = data?.user?._id
            console.log(userId, "Created User Id")

            setSnack({
                open: true,
                message: "Register successfully!",
                severity: "success",
            });

            if (role === "seller") {
                localStorage.setItem("userId", userId)
                Router.push("/onBoard");
            } else {
                Router.push("/login");
            }

        } catch (error) {
            setSnack({
                open: true,
                message: error.message || "Wrong user details!",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 2,
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1350&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                }}
            >

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.4)",
                    }}
                />

                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 380,
                        padding: 3,
                        borderRadius: 3,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        position: "relative",
                        zIndex: 2,
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(6px)",
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" textAlign="center" fontWeight="bold" mb={2}>
                            Register
                        </Typography>


                        <form onSubmit={handleSubmit(submitform)}>
                            <Box mb={2}>
                                <StyledTextField
                                    label="Name"
                                    fullWidth
                                    {...register("name", {
                                        required: "Username is required",
                                        minLength: {
                                            value: 3,
                                            message: "Username must be at least 3 characters"
                                        }
                                    })}
                                    error={!!errors.username}
                                    helperText={errors.username?.message}
                                />
                            </Box>

                            <Box mb={2}>
                                <StyledTextField
                                    label="Email"
                                    fullWidth
                                    {...register("email", {
                                        required: "email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Box>  

                            <Box mb={2}>
                                <StyledTextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            </Box>
                            <Box mb={2} display="flex" justifyContent="center">
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={isSeller}
                                            onChange={(e) => setIsSeller(e.target.checked)}
                                            color="secondary"
                                        />
                                    }
                                    label={isSeller ? "Register as Seller" : "Register as User"}
                                />
                            </Box>


                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                color="secondary"
                                disabled={loading}
                                sx={{
                                    py: 1,
                                    fontWeight: "bold",
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontSize: "16px"
                                }}
                            >
                                {loading ? "Register in..." : "Register"}
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