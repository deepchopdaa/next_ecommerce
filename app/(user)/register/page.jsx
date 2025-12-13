"use client";

import { useState } from "react";
import SnackbarSimple from "../Components/SnakeBar";
import { useForm } from "react-hook-form"
import {
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";
import { useRouter } from "next/navigation";


export default function RegisterForm() {
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
        setLoading(true);
        setTimeout(() => { }, 5000);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            setLoading(false);
            setSnack({
                open: true,
                message: "Register successfully!",
                severity: "success",
            });
            Router.push("/login");
        } else {
            setLoading(false);
            setSnack({
                open: true,
                message: "Wrong user details!",
                severity: "error",
            });
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
                            Register
                        </Typography>


                        <form onSubmit={handleSubmit(submitform)}>
                            <Box mb={2}>
                                <TextField
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
                                <TextField
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
                                <TextField
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