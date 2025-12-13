"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import SnackbarSimple from "../Components/SnakeBar"

export default function ReviewForm({ reviews, productId }) {
    const [loading, setLoading] = useState(false);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            rating: null,
            comment: "",
        },
    });

    const onSubmit = async (values) => {

        console.log(values, "form submit values ")
        const res = await fetch("/api/user/userDetail/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...values,
                productId
            }),
        });
        reset();

        const message = await res.json()
        console.log(message.message, "responce message")

        if (res.ok) {
            setLoading(false);
            setSnack({
                open: true,
                message: "Review Added successfully!",
                severity: "success",
            });
        } else {
            setLoading(false);
            setSnack({
                open: true,
                message: message.message,
                severity: "error",
            });
        }
    };

    return (
        <>
            <Box sx={{ mt: 4, mx: 10 }}>

                <Typography variant="h5" sx={{ mb: 2, px: 10 }}>Write a Review</Typography>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        name="rating"
                        control={control}
                        rules={{ required: "Rating is required" }}
                        render={({ field }) => (
                            <Rating
                                value={field.value}
                                onChange={(_, value) => field.onChange(value)}
                            />
                        )}
                    />
                    {errors.rating && (
                        <Typography color="error">{errors.rating.message}</Typography>
                    )}

                    {/* COMMENT */}
                    <TextField
                        fullWidth
                        label="Comment"
                        multiline
                        rows={3}
                        sx={{ mt: 2 }}
                        {...register("comment", { required: "Comment is required" })}
                        error={!!errors.comment}
                        helperText={errors.comment?.message}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="warning"
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? "Submit in..." : "Submit"}
                    </Button>
                </form>

                {/* SHOW REVIEWS */}
                <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Reviews</Typography>

                {reviews?.length === 0 && <Typography>No reviews yet.</Typography>}

                {reviews?.map((rev) => (
                    <Box key={rev?._id} sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
                        <Typography variant="subtitle1">
                            {rev?.userId?.name || "Unknown User"}
                        </Typography>

                        <Rating value={rev?.rating} readOnly size="small" />

                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {rev?.comment}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                            {new Date(rev?.createdAt).toLocaleString()}
                        </Typography>
                    </Box>
                ))}
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
