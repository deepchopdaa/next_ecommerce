"use client";
import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Switch,
    FormControlLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import SnackbarSimple from "../../../(user)/Components/SnakeBar";
import { createBrand, deleteBrand, getBrands, updateBrand } from "../../services/brand";

export default function BrandPage() {
    const [brands, setBrands] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token") || {};

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // CREATE FORM
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // EDIT FORM
    const {
        register: editRegister,
        handleSubmit: handleEditSubmit,
        reset: editReset,
        formState: { errors: editErrors },
    } = useForm();

    /* Getting Brand */
    const fetchBrands = async () => {
        const data = await getBrands()
        setBrands(data);
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    /* For Creating Brand */
    const onCreate = async (data) => {
        setLoading(true);
        try {
            const res = await createBrand(data)
            reset();
            setSnack({ open: true, message: "Brand added successfully!", severity: "success" });
        } catch (error) {
            setSnack({ open: true, message: error.message || "Brand adding Failed", severity: "error" });
        } finally {
            setLoading(false);
        }
        fetchBrands();
    };

    /* for Delete Brand */
    const handleDelete = async (id) => {
        try {
            const res = await deleteBrand(id)
            setSnack({ open: true, message: "Brand deleted!", severity: "success" });
        } catch (error) {
            setSnack({ open: true, message: error.message || "Brand not Deleted", severity: "error" });
        }
        fetchBrands();
    }


    /* For Brand Update model open that time set value */
    const openEdit = (brand) => {
        setEditId(brand._id);
        editReset({ name: brand.name, isActive: brand.isActive });
        setEditOpen(true);
    };

    /* For Brand Update */
    const onUpdate = async (data) => {
        try {
            const res = await updateBrand({ editId, data })
            setEditOpen(false);
            setSnack({ open: true, message: "Brand updated!", severity: "success" });

        } catch (error) {
            setSnack({ open: true, message: error.message || "Brand Not updated!", severity: "error" });
        } finally {
            fetchBrands();
        }
    };

    return (
        <>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Brand Management
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onCreate)}
                    sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}
                >
                    <TextField
                        label="Brand Name"
                        {...register("name", { required: "Brand name is required" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />

                    <FormControlLabel
                        control={<Switch {...register("isActive")} defaultChecked color="info" />}
                        label="Active"
                    />

                    <Button type="submit" disabled={loading} variant="contained">
                        {loading ? "Adding..." : "Add Brand"}
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell><b>Status</b></TableCell>
                                <TableCell><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {brands.map((brand) => (
                                <TableRow key={brand._id}>
                                    <TableCell>{brand.name}</TableCell>

                                    <TableCell>
                                        {brand.isActive ? "Active" : "Inactive"}
                                    </TableCell>

                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            sx={{ mr: 1 }}
                                            onClick={() => openEdit(brand)}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(brand._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* EDIT MODAL */}
                <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth>
                    <DialogTitle>Edit Brand</DialogTitle>

                    <Box component="form" onSubmit={handleEditSubmit(onUpdate)}>
                        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <TextField
                                label="Brand Name"
                                {...editRegister("name", { required: "Brand name is required" })}
                                error={!!editErrors.name}
                                helperText={editErrors.name?.message}
                            />

                            <FormControlLabel
                                control={<Switch {...editRegister("isActive")} defaultChecked color="info" />}
                                label="Active"
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                            <Button type="submit" color="info" variant="contained">
                                Update
                            </Button>
                        </DialogActions>
                    </Box>
                </Dialog>
            </Container>

            <SnackbarSimple
                open={snack.open}
                setOpen={(open) => setSnack({ ...snack, open })}
                message={snack.message}
                severity={snack.severity}
            />
        </>
    );
}
