import { styled } from "@mui/material/styles";
import {
    FormControl,
} from "@mui/material";

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    "& .MuiInputLabel-root": {
        fontSize: "14px",
    },

    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        backgroundColor: "#fff",

        "& fieldset": {
            borderColor: "#d0d5dd",
        },

        "&:hover fieldset": {
            borderColor: theme.palette.primary.main,
        },

        "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
            borderWidth: "2px",
        },
    },

    "& .Mui-error fieldset": {
        borderColor: theme.palette.error.main,
    },
}));
