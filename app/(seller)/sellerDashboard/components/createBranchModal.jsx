"use client";

import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { createSellerBranch } from "../services/profile";
import SnackbarSimple from "@/app/(user)/Components/SnakeBar";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 420,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function CreateBranchModal({ open, handleClose, sellerId }) {



    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const [form, setForm] = useState({
        branchName: "",
        contactNo: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        primary: false,
    });


    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await createSellerBranch({ sellerId, form })

            handleClose();
            setForm({
                branchName: "",
                contactNo: "",
                address: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
                primary: false,
            });
            setSnack({
                open: true,
                message: "Branch Created successfully!",
                severity: "success",
            });

        } catch (error) {
            setSnack({
                open: true,
                message: error.message || "Branch Not Created !",
                severity: "error",
            });
        }
    };



    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h6" fontWeight="bold" mb={2}>
                        Create Branch
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        display="flex"
                        flexDirection="column"
                        gap={1.5}
                    >
                        <TextField fullWidth label="Branch Name" name="branchName" required onChange={handleChange} />
                        <TextField fullWidth label="Contact No" name="contactNo" required onChange={handleChange} />
                        <TextField fullWidth label="Address" name="address" required onChange={handleChange} />
                        <TextField fullWidth label="City" name="city" required onChange={handleChange} />
                        <TextField fullWidth label="State" name="state" required onChange={handleChange} />
                        <TextField fullWidth label="Country" name="country" required onChange={handleChange} />
                        <TextField fullWidth label="Pincode" name="pincode" required onChange={handleChange} />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={form.primary}
                                    name="primary"
                                    onChange={handleChange}
                                />
                            }
                            label="Primary Branch"
                        />

                        <Button fullWidth variant="contained" color="info" type="submit">
                            Create Branch
                        </Button>
                    </Box>

                </Box>
            </Modal>
            <SnackbarSimple
                open={snack.open}
                setOpen={(open) => setSnack({ ...snack, open })}
                message={snack.message}
                severity={snack.severity}
            />
        </>
    );
}
