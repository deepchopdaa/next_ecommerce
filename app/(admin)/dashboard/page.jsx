"use client";

import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
    Avatar,
    Chip,
} from "@mui/material";
import { getsellerList } from "../services/sellers";
import SnackbarSimple from "@/app/(user)/Components/SnakeBar";

export default function SellerListPage() {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const data = await getsellerList()
                setSellers(data.data);
            } catch (error) {
                setSnack({
                    open: true,
                    message: error.message,
                    severity: "error",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchSellers();
    }, []);

    if (loading) {
        return (
            <Box className="flex justify-center items-center h-[70vh]">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Box p={4}>
                <Typography variant="h5" fontWeight="bold" mb={3}>
                    Seller Management
                </Typography>

                <Grid container spacing={3}>
                    {sellers.map((seller) => (
                        <Grid item xs={12} md={6} lg={4} key={seller._id}>
                            <Card className="shadow-md rounded-xl">
                                <CardContent>
                                    {/* Header */}
                                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                                        <Avatar>
                                            {seller.user?.name?.charAt(0)}
                                        </Avatar>

                                        <Box>
                                            <Typography fontWeight="bold">
                                                {seller.accountName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {seller.user?.email}
                                            </Typography>   
                                        </Box>
                                    </Box>

                                    {/* Info */}
                                    <Box display="flex" justifyContent="space-between">
                                        <Chip
                                            label="Seller"
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                        />

                                        <Typography variant="caption" color="text.secondary">
                                            Joined:{" "}
                                            {new Date(seller.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {sellers.length === 0 && (
                    <Typography textAlign="center" color="text.secondary">
                        No sellers found
                    </Typography>
                )}
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
