"use client";

import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SellerCard({ seller }) {
    const router = useRouter();

    return (
        <Card
            onClick={() => router.push(`/seller/${seller._id}`)}
            sx={{
                cursor: "pointer",
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
            }}
        >
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
                {String(seller?.user?.name || "U")[0]}
            </Avatar>
            <CardContent>
                <Typography variant="h6" fontWeight={600}>
                    Seller Name : {seller?.user?.name}
                </Typography>
                <Typography variant="body" fontWeight={600}>
                    Seller Email : {seller?.user?.email}
                </Typography>
                <br />
                <Typography variant="body" fontWeight={400}>
                    Account Name : {seller?.accountName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    View products →
                </Typography>
            </CardContent>
        </Card>
    );
}
