import api from "./axios";

export const createTransfer = (data) =>
    api.post("/transfers", data);

export const getTransfers = () =>
    api.get("/transfers");
