import api from "./axios";

export const createPurchase = (data) =>
  api.post("/purchases", data);

export const getPurchases = (filters) =>
  api.get("/purchases", { params: filters });
