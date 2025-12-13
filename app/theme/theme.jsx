"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#ffffffff",
        },
        secondary: {
            main: "#6a676aff",
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#1976d2" },
                        "&:hover fieldset": { borderColor: "#1565c0" },
                        "&.Mui-focused fieldset": { borderColor: "#0d47a1" },
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: "#000",
                    backgroundColor: "#fff",
                    "& fieldset": { borderColor: "#1976d2" },
                    "&:hover fieldset": { borderColor: "#1565c0" },
                    "&.Mui-focused fieldset": { borderColor: "#0d47a1" },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "#000",
                    "&.Mui-focused": {
                        color: "#0d47a1",
                    },
                },
            },
        }
    },
    typography: {
        fontFamily: "Roboto, sans-serif",
    },
});
