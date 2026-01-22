"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    Box,
    Grid,
    Button,
    Typography,
    Stack,
} from "@mui/material";
import ProductCard from "../../Components/ProductCard";
import { getSellerById, getSellerProducts } from "../../services/sellerListService"
import SnackbarSimple from "../../Components/SnakeBar";

export default function SellerDetailPage() {
    const { id } = useParams();

    const [seller, setSeller] = useState(null);
    const [branches, setBranches] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeBranch, setActiveBranch] = useState(null);

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // Load seller + branches
    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const data = await getSellerById(id)

                setSeller(data.seller);
                setBranches(data.branches);
            } catch (error) {
                setSnack({
                    open: true,
                    message: error.message || "Sellers Detail Not Found !",
                    severity: "success",
                });
            }
        };

        fetchSeller();
    }, [id]);

    useEffect(() => {
        if (!id) return;

        const fetchProducts = async () => {
            try {
                const data = await getSellerProducts({
                    sellerId: id,
                    branchId: activeBranch,
                });

                setProducts(data?.products);
            } catch (error) {
                setSnack({
                    open: true,
                    message: error.message || "Seller Product Not Found !",
                    severity: "success",
                });
            }
        };

        fetchProducts();
    }, [id, activeBranch]);

    return (
        <>
            <Box sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight={700} mb={2}>
                    {seller?.name}
                </Typography>

                {/* Branch Filter */}
                <Stack direction="row" spacing={2} mb={4}>
                    <Button
                        color="info"
                        variant={!activeBranch ? "contained" : "outlined"}
                        onClick={() => setActiveBranch(null)}
                    >
                        All Branches
                    </Button>

                    {branches?.map((branch) => (
                        <Button
                            key={branch?._id}
                            color="info"
                            variant={activeBranch === branch._id ? "contained" : "outlined"}
                            onClick={() => setActiveBranch(branch?._id)}
                        >
                            {branch?.branchName}
                        </Button>
                    ))}
                </Stack>

                {/* Products */}
                <Grid container spacing={3}>
                    {products.length > 0 ? products?.map((product) => (
                        <Grid item xs={12} sm={6} md={3} key={product?._id}>
                            <ProductCard product={product} />
                        </Grid>
                    )) : <h4 className="flex justify-center mx-auto align-center">Product Not Available</h4>}
                </Grid>
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
