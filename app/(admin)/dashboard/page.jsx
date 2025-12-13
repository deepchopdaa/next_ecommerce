"use client";
import React, { use, useEffect, useState } from "react";
import SnackbarSimple from "../../(user)/Components/SnakeBar";
import { useForm } from "react-hook-form";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControlLabel,
    Checkbox,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import Image from "next/image";


const inputStyle = {
    "& .MuiOutlinedInput-root": {
        color: "#000", // input text color
        backgroundColor: "#fff",
        "& fieldset": { borderColor: "#1976d2" },
        "&:hover fieldset": { borderColor: "#1565c0" },
        "&.Mui-focused fieldset": { borderColor: "#0d47a1" },
    },
    "& .MuiInputLabel-root": {
        color: "#000",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#0d47a1",
    },
};

/* const initialProducts = [
    {
        id: 1,
        name: "Apple iPhone 15 Pro",
        brand: "Apple",
        category: "Smartphones",
        price: 139900,
        discountPrice: 124900,
        rating: 4.8,
        reviews: 11234,
        stock: true,
        images: sat,
        description: "",
    },
    ]; */

export default function ProductTable() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [username, setuserName] = useState(null);
    const token = localStorage.getItem("token") || {};
    const [updateid, setUpdateid] = useState(null);
    const [categories, setCategories] = useState([]);
    const [Brand, setBrands] = useState([]);

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm();

    const handlesubmit = (e) => {
        e.preventDefault();
        console.log(e)
    }


    const userDatail = async () => {
        const userDetail = await fetch("/api/user/userDetail", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const userData = await userDetail.json();
        setuserName(userData.user.name);
        console.log(userData.user.name, "user Name")
        console.log(userData, "user detail in dashboard");
    }

    const GetProducts = async () => {
        const products = await fetch("/api/admin/product", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const productData = await products.json();
        setProducts(productData.products);
        console.log(productData, "product data in dashboard");
    }


    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/admin/category");
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.log("Category fetch error:", error);
        }
    };
    const fetchBrands = async () => {
        try {
            const res = await fetch("/api/admin/brand");
            const data = await res.json();
            setBrands(data);
        } catch (error) {
            console.log("Category fetch error:", error);
        }
    };

    useEffect(() => {
        userDatail();
        GetProducts()
        fetchCategories();
        fetchBrands()
    }, []);


    const [form, setForm] = useState({
        id: "",
        name: "",
        brand: "",
        category: "",
        price: "",
        discountPrice: "",
        rating: "",
        reviews: "",
        stock: false,
        images: "",
        description: "",
    });

    const handleOpenCreate = () => {
        setEditMode(false);
        reset({
            name: "",
            brand: "",
            category: "",
            price: "",
            discountPrice: "",
            rating: "",
            stock: false,
            image: "",
            description: "",
        });
        setForm({ images: "" });
        setOpen(true);
    };


    const handleOpenEdit = (product) => {
        console.log(product)
        setEditMode(true);
        setUpdateid(product._id);
        reset({
            name: product.name,
            brand: product?.brand?._id,
            category: product?.category?._id,
            price: product.price,
            discountPrice: product.discountPrice,
            rating: product.rating,
            description: product.description,
            stock: product.stock,
            images: product.image,
        });
        setForm({
            images: product.image,
            preview: `/uploads/${product.image}`
        });
        setOpen(true);
    };

    const handleSave = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("category", data.category);
        formData.append("brand", data.brand);
        formData.append("price", data.price);
        formData.append("discountPrice", data.discountPrice);
        formData.append("description", data.description);
        formData.append("stock", data.stock);

        if (form.images) {
            formData.append("image", form.images);
        }

        // Debug FormData
        for (let pair of formData.entries()) {
            console.log(pair[0] + ":", pair[1]);
        }

        const url = editMode
            ? `/api/admin/product?id=${updateid}`
            : "/api/admin/product";

        const method = editMode ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        });

        console.log(res, 'response after saving product');

        setSnack({
            open: true,
            message: res.ok
                ? editMode
                    ? "Product updated successfully!"
                    : "Product created successfully!"
                : "Failed to save product!",
            severity: res.ok ? "success" : "error",
        });

        GetProducts();
        setOpen(false);
    };

    const handleDeleteConfirm = (id) => {
        setDeleteId(id);
        setDeleteConfirm(true);
    };

    const handleDelete = async () => {
        const res = await fetch(`/api/admin/product?id=${deleteId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })

        if (res.ok) {
            setSnack({
                open: true,
                message: "Product deleted successfully!",
                severity: "success",
            });
            setProducts(products.filter((p) => p._id !== deleteId));
        } else {
            setSnack({
                open: true,
                message: "Failed to delete product!",
                severity: "error",
            });
        }
        setDeleteConfirm(false);
    };

    return (
        <>

            <div className="p-4">
                <Box className="text-gray-800 flex justify-center" mb={2}>
                    <h2 className="text-2xl font-bold">Welcome, {username} </h2>
                </Box>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#0d47a1",
                        color: "#fff",
                        "&:hover": { backgroundColor: "#08306b" },
                    }}
                    onClick={handleOpenCreate}
                >
                    Create Product
                </Button>


                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Discount Price</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {products.map((row) => (
                                <TableRow key={row?._id}>
                                    <TableCell>
                                        {row?.image ? (
                                            <Image
                                                src={`/uploads/${row.image}`}
                                                alt="product"
                                                width={100}
                                                height={100}
                                                style={{ width: 100, height: 100, borderRadius: 6 }}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}

                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row?.brand?.name}</TableCell>
                                    <TableCell>{row?.category?.name}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>{row.discountPrice}</TableCell>
                                    <TableCell>{row.stock}</TableCell>
                                    <TableCell>{row.rating}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            onClick={() => handleOpenEdit(row)}
                                            style={{ marginRight: "8px" }}
                                        >
                                            Update
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDeleteConfirm(row._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Create / Edit Modal */}
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>{editMode ? "Update Product" : "Create Product"}</DialogTitle>

                    <form onSubmit={handleSubmit(handleSave)}>
                        <DialogContent>

                            <TextField
                                label="Name"
                                fullWidth
                                margin="dense"
                                {...register("name", { required: "Name is required" })}
                                sx={inputStyle}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />


                            <TextField
                                label="Description"
                                fullWidth
                                margin="dense"
                                {...register("description", { required: "description is required" })}
                                sx={inputStyle}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />

                            <FormControl fullWidth margin="dense" sx={inputStyle} error={!!errors.category}>
                                <InputLabel>Brand</InputLabel>

                                <Select
                                    label="Brand"
                                    value={watch("brand") || ""}
                                    {...register("brand", { required: "Brand is required" })}
                                    onChange={(e) => {
                                        setForm({ ...form, brand: e.target.value });
                                        setValue("brand", e.target.value);
                                    }}
                                >
                                    {Brand?.map((brand) => (
                                        <MenuItem key={brand._id} value={brand._id}>
                                            {brand.name}
                                        </MenuItem>
                                    ))}
                                </Select>

                                {errors.brand && (
                                    <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                                        {errors.brand.message}
                                    </p>
                                )}
                            </FormControl>

                            <FormControl fullWidth margin="dense" sx={inputStyle} error={!!errors.category}>
                                <InputLabel>Category</InputLabel>

                                <Select
                                    label="Category"
                                    value={watch("category") || ""}
                                    {...register("category", { required: "Category is required" })}
                                    defaultValue=""
                                    onChange={(e) => setValue("category", e.target.value)}
                                >
                                    {categories?.map((cat) => (
                                        <MenuItem key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </Select>

                                {errors.category && (
                                    <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                                        {errors.category.message}
                                    </p>
                                )}
                            </FormControl>

                            <TextField
                                label="Price"
                                type="number"
                                fullWidth
                                margin="dense"
                                {...register("price", { required: "price is required" })}
                                sx={inputStyle}
                                error={!!errors.price}
                                helperText={errors.price?.message}
                            />

                            <TextField
                                label="Discounted Price"
                                type="number"
                                fullWidth
                                margin="dense"
                                {...register("discountPrice", { required: "discountPrice is required" })}
                                sx={inputStyle}
                                error={!!errors.discountPrice}
                                helperText={errors.discountPrice?.message}
                            />

                            <TextField
                                label="Stock"
                                type="number"
                                fullWidth
                                margin="dense"
                                {...register("stock", { required: "stock is required" })}
                                sx={inputStyle}
                                error={!!errors.stock}
                                helperText={errors.stock?.message}
                            />


                            {/* FILE UPLOAD */}
                            <Button variant="outlined" color="info" component="label" fullWidth sx={{ mt: 2 }}>
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setForm({
                                                ...form,
                                                images: file,
                                                preview: URL.createObjectURL(file)
                                            });

                                            setValue("image", file.name);
                                        }
                                    }}
                                />
                            </Button>

                            {form.images && (
                                <img
                                    src={form.preview}
                                    alt="preview"
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        objectFit: "cover",
                                        marginTop: "10px",
                                        borderRadius: "8px",
                                        border: "1px solid #1976d2",
                                    }}
                                />
                            )}

                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => setOpen(false)}>Close</Button>
                            <Button type="submit" variant="contained" color="success">
                                {editMode ? "Update" : "Create"}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>


                {/* Delete Confirmation Popup */}
                <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                    <DialogActions>
                        <Button color="info" onClick={() => setDeleteConfirm(false)}>Close</Button>
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
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
