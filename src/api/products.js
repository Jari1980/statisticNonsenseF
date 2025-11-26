const API = "http://localhost:8080/api";

export const getProducts = () =>
  fetch(API).then((r) => r.json());

export const addProduct = (product) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

export const updateProduct = (id, product) =>
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

export const deleteProduct = (id) =>
  fetch(`${API}/${id}`, { method: "DELETE" });