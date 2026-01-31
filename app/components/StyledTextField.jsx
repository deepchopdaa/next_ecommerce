import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const StyledTextField = styled(TextField)(() => ({
    "& .MuiInputBase-root": {
        borderRadius: 8,
        fontSize: "14px",
    },

    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#d1d5db",
        },
        "&:hover fieldset": {
            borderColor: "#2563eb", // hover border color
        },
        "&.Mui-focused fieldset": {
            borderColor: "#2563eb", // focus border color
            borderWidth: 2,
        },
    },

    "& .MuiInputLabel-root": {
        fontSize: "15px",
    },

    "& .MuiFormHelperText-root": {
        marginLeft: 0,
        fontSize: "12px",
    },
}));

export default StyledTextField;
