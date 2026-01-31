"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Divider,
    Button,
    Box,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import CreateBranchModal from "../components/createBranchModal";
import EditSellerModal from "../components/editSellerDetail"
import { deleteSellerBranch, getSellerProfile, primarySellerBranch } from "../services/profile";
import SnackbarSimple from "@/app/(user)/Components/SnakeBar";

export default function SellerProfile({ params }) {
    const { sellerId } = params;

    const [data, setData] = useState(null);
    const [branch, setBranch] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [openedit, setOpenedit] = useState(false);
    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const fetchSellerProfile = async () => {
        try {
            const res = await getSellerProfile()
            setData(res?.data);
        } catch (err) {
            setError(err.message);
            setSnack({
                open: true,
                message: "Seller Profile Fetch failed !",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSellerProfile();
    }, [branch]);



    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-600 font-semibold">
                {error}
            </div>
        );
    }

    const handleDelete = async (id) => {
        try {
            const res = await deleteSellerBranch({ id })
            setSnack({
                open: true,
                message: "Branch Deleted !",
                severity: "success",
            });
        } catch (error) {
            setSnack({
                open: true,
                message: error.message || "Branch Not Deleted !",
                severity: "error",
            });
        }
    };

    const { seller, branches } = data;

    const handlePrimary = async (branchId) => {

        const payload = { sellerId: seller?._id, branchId: branchId }
        try {
            const res = await primarySellerBranch({ payload })
            setBranch(res)
            setSnack({
                open: true,
                message: "Branch Set As Primary !",
                severity: "success",
            });
        } catch (error) {
            setSnack({
                open: true,
                message: error.message || "Branch Not set Primary!",
                severity: "error",
            });
        }
    }

    return (
        <>
            <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

                {/* 🔹 Seller Card */}
                <Card className="shadow-lg rounded-xl">
                    <CardContent className="space-y-2">
                        <Box className="flex justify-between">
                            <Typography variant="h5" className="font-bold">
                                Seller Profile
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={() => setOpenedit(true)}
                            >
                                <EditIcon fontSize="medium" />
                            </IconButton>
                        </Box>
                        <Divider />

                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <p className="text-gray-500 text-sm">Account Name</p>
                                <p className="font-semibold text-lg">
                                    {seller.accountName}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Seller Name</p>
                                <p className="font-semibold text-lg">
                                    {seller?.user?.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Seller Email</p>
                                <p className="font-semibold text-lg">
                                    {seller?.user?.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Seller ID</p>
                                <p className="font-mono text-sm break-all">
                                    {seller._id}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/*  Branches Section */}
                <div>
                    <Box className="flex justify-between items-center mb-4">
                        <Typography variant="h6" className="font-bold ">
                            Branches ({branches.length})
                        </Typography>
                        <Button variant="contained" color="info" onClick={() => setOpen(true)}>
                            Create Branch
                        </Button>
                    </Box>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {branches.map((branch) => (
                            <Card
                                key={branch._id}
                                className={`group relative rounded-2xl border bg-white transition-all duration-300
                            ${branch?.primary
                                        ? "border-indigo-500 shadow-xl ring-2 ring-indigo-500/30"
                                        : "border-gray-200 hover:border-gray-800 hover:shadow-xl"
                                    }
                            `}
                            >
                                {/* Delete Button */}
                                <IconButton
                                    size="small"
                                    className="!absolute right-1 top-3 text-gray-900 
                                hover:text-green-600 hover:bg-red-500"
                                    onClick={() => handleDelete(branch?._id)}
                                >
                                    <DeleteOutlineIcon fontSize="medium" />
                                </IconButton>

                                <CardContent className="space-y-4 p-5">
                                    {/* Header */}
                                    <div className="flex items-start justify-between">
                                        <Typography
                                            variant="subtitle1"
                                            className="font-semibold text-gray-800 group-hover:text-indigo-600 transition"
                                        >
                                            {branch?.branchName}
                                        </Typography>

                                        <span className="rounded-full bg-indigo-50 px-2 mr-5 py-1 text-xs font-medium text-indigo-600">
                                            {branch?.primary ? "primary branch" : <Button variant="text" color="inherit" size="small" style={{ fontSize: "9px", padding: "0px" }} onClick={() => handlePrimary(branch?._id)}>Set As Primary</Button>}
                                        </span>
                                    </div>

                                    <Divider />

                                    {/* Address */}
                                    <p className="text-sm leading-relaxed text-gray-800">
                                        Address : {branch.address}
                                    </p>

                                    {/* Location */}
                                    <div className="space-y-1 text-sm text-gray-700">
                                        <p>📍 {branch.city}, {branch.state}</p>
                                        <p>🌍 {branch.country} – {branch.pincode}</p>
                                        <p>🌍 {branch?.contactNo}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <CreateBranchModal
                    open={open}
                    handleClose={() => setOpen(false)}
                    sellerId={seller._id}
                    fetchSellerProfile={fetchSellerProfile}
                />
                <EditSellerModal
                    open={openedit}
                    handleClose={() => setOpenedit(false)}
                    seller={seller}
                    fetchSellerProfile={fetchSellerProfile}
                />

            </div>
            <SnackbarSimple
                open={snack.open}
                setOpen={(open) => setSnack({ ...snack, open })}
                message={snack.message}
                severity={snack.severity}
            />

        </>
    );
}
