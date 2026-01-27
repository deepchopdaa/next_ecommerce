"use client";

import { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import SellerCard from "./SellerCard";
import { useDispatch } from "react-redux";
import { getSellerList } from "../services/sellerListService";
export default function HomePage() {
    const [sellers, setSellers] = useState([]);
    /* api Calling for filter Sidebar in Products */
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSeller = async () => {
            const res = await getSellerList()
            setSellers(res.sellers)
        }
        fetchSeller()
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
                {sellers?.map((seller) => (
                    <Grid item xs={12} sm={6} md={3} key={seller._id}>
                        <SellerCard seller={seller} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
