import { ORDER_STATUS_STEPS } from "../constant/orderStatus";

export const getActiveStepFromStatus = (status) => {
    return ORDER_STATUS_STEPS.indexOf(status);
};
