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
    FormControlLabel,
    Switch,
} from "@mui/material";
import { useForm } from "react-hook-form";
import SnackbarSimple from "../../../(user)/Components/SnakeBar"
import { createCategory, deleteCategory, getCategory, updateCategory } from "../../services/category";

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [token, setToken] = useState(null);

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const {
        register: editRegister,
        handleSubmit: handleEditSubmit,
        reset: editReset,
        formState: { errors: editErrors },
    } = useForm();

    const fetchCategories = async () => {
        const data = await getCategory(token)
        setCategories(data);
    };

    useEffect(() => {
        const t = localStorage.getItem("token");
        setToken(t);
    }, []);

    useEffect(() => {
        fetchCategories();
    }, []);

    const onCreate = async (data) => {

        try {
            const res = await createCategory({ data, token })
            reset();

            console.log(res.message, "responce message")
            setLoading(false);
            setSnack({
                open: true,
                message: "Category Added successfully!",
                severity: "success",
            });
        } catch (error) {
            setLoading(false);
            setSnack({
                open: true,
                message: error.message,
                severity: "error",
            });
        } finally {
            fetchCategories();
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await deleteCategory({ id, token })
            setLoading(false);
            setSnack({
                open: true,
                message: "Category Delete successfully!",
                severity: "success",
            });
        } catch (error) {
            setLoading(false);
            setSnack({
                open: true,
                message: error.message,
                severity: "error",
            });
        } finally {
            fetchCategories();
        }
    };

    const openEdit = (cat) => {
        setEditId(cat._id);
        editReset({ name: cat.name, description: cat.description || "" });
        setEditOpen(true);
    };

    const onUpdate = async (data) => {
        try {
            const res = await updateCategory({ editId, data, token })
            setEditOpen(false);
            fetchCategories();

            setLoading(false);
            setSnack({
                open: true,
                message: "Category Update successfully!",
                severity: "success",
            });

        } catch (error) {

            setLoading(false);
            setSnack({
                open: true,
                message: error.message,
                severity: "error",
            });
        } finally {
            fetchCategories()
        }
    };

    return (
        <>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Category Management
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onCreate)}
                    sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}
                >
                    <TextField
                        label="Category Name"
                        {...register("name", { required: "Name is required" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />

                    <TextField
                        label="Description"
                        multiline
                        rows={3}
                        {...register("description")}
                    />

                    <FormControlLabel
                        control={<Switch {...register("isActive")} defaultChecked color="info" />}
                        label="Active"
                    />

                    <Button type="submit" disabled={loading} variant="contained">
                        {loading ? "Adding Category" : "Add Category"}
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell><b>Description</b></TableCell>
                                <TableCell><b>Status</b></TableCell>
                                <TableCell><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {categories.map((cat) => (
                                <TableRow key={cat._id}>
                                    <TableCell>{cat.name}</TableCell>
                                    <TableCell>{cat.description}</TableCell>
                                    <TableCell>
                                        {cat.isActive ? "Active" : "Inactive"}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            sx={{ mr: 1 }}
                                            onClick={() => openEdit(cat)}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(cat._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth>
                    <DialogTitle>Edit Category</DialogTitle>

                    <Box
                        component="form"
                        onSubmit={handleEditSubmit(onUpdate)}
                    >
                        <DialogContent
                            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                        >
                            <TextField
                                label="Category Name"
                                {...editRegister("name", { required: "Name is required" })}
                                error={!!editErrors.name}
                                helperText={editErrors.name?.message}
                            />

                            <TextField
                                label="Description"
                                multiline
                                rows={3}
                                {...editRegister("description")}
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