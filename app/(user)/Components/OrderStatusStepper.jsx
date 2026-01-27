"use client";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ORDER_STATUS_STEPS } from "../../constant/orderStatus";
import { getActiveStepFromStatus } from "../../utility/orderStatusHelper";

export default function OrderStatusStepper({ status }) {

    if (status === "Cancelled" || status === "Returned") {
        return (
            <Box sx={{ p: 2, bgcolor: "#fee2e2", borderRadius: 2 }}>
                <Typography color="error" fontWeight={600}>
                    ❌ Order {status}
                </Typography>
            </Box>
        );
    }

    const activeStep = getActiveStepFromStatus(status);

    return (
        <Box sx={{ width: "100%", mt: 2 }}>
            <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{
                    "& .MuiStepLabel-label": {
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        color: "#6b7280", // gray
                    },
                    "& .Mui-active .MuiStepLabel-label": {
                        color: "#2563eb", // blue
                        fontWeight: 600,
                    },
                    "& .Mui-completed .MuiStepLabel-label": {
                        color: "#16a34a", // green
                        fontWeight: 600,
                    },
                    "& .MuiStepIcon-root": {
                        color: "#9ba3ac", // default icon
                    },
                    "& .Mui-active .MuiStepIcon-root": {
                        color: "#789ab9", // active blue
                    },
                    "& .Mui-completed .MuiStepIcon-root": {
                        color: "#16a34a", // completed green
                    },
                    "& .MuiStepConnector-line": {
                        borderColor: "#e5e7eb",
                        borderTopWidth: 2,
                    },
                    "& .Mui-completed .MuiStepConnector-line": {
                        borderColor: "#16a34a",
                    },
                    "& .Mui-active .MuiStepConnector-line": {
                        borderColor: "#2563eb",
                    },
                }}
            >
                {ORDER_STATUS_STEPS.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

        </Box>
    );
}
