import React from 'react'
import ProductCard from './Card'
import { Box, Grid } from '@mui/material'

const Main = () => {
    return (
        <div>
            <Grid container spacing={3} sx={{ padding: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <ProductCard />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ProductCard />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ProductCard />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ProductCard />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ProductCard />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ProductCard />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ProductCard />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <ProductCard />
                </Grid>
            </Grid>
        </div >
    )
}

export default Main
