"use client";

import { useState } from "react";
import SnackbarSimple from "../Components/SnakeBar";
import { loginUser } from "../services/authService";
import { useForm } from "react-hook-form"
import {
    Button,
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StyledTextField from "@/app/components/StyledTextField";


export default function LoginForm() {

    const [loading, setLoading] = useState(false);
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

            console.log(values, 'values')
            setLoading(true);
            setTimeout(() => { }, 2000);

            const data = await loginUser(values);

            console.log(data);
            const token = data.token;
            const role = data.userRole

            if (token) {
                localStorage.setItem("token", token);
            }

            if (role) {
                localStorage.setItem("role", role)
            }

            setSnack({
                open: true,
                message: "Login successfully!",
                severity: "success",
            });

            if (role === "admin") {
                Router.push("/dashboard");
            } else if (role === "seller") {
                Router.push("/sellerDashboard");
            } else {
                Router.push("/myorders");
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
    }

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
                            Login
                        </Typography>


                        <form onSubmit={handleSubmit(submitform)}>

                            <Box mb={2}>
                                <StyledTextField
                                    label="Email"
                                    fullWidth
                                    {...register("email", {
                                        required: "email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email address",
                                        }
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
                                {loading ? "Logging in..." : "Login"}
                            </Button>

                            <Link href="/register" style={{ textDecoration: 'none' }}>
                                <Typography variant="body2" textAlign="center" mt={2} color="black" sx={{ cursor: 'pointer' }}>
                                    Don't have an account? Register
                                </Typography>
                            </Link>
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