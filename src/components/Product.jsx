import React, { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";

import "../Product.css";
import ProductDiagram from "./ProductDiagram";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", price: "", quantity: "" });
  const [isEditing, setIsEditing] = useState(false);

  const load = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name: form.name,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity)
    };

    if (isEditing) {
      await updateProduct(form.id, product);
    } else {
      await addProduct(product);
    }

    setForm({ id: null, name: "", price: "", quantity: "" });
    setIsEditing(false);
    await load();
  };

  const handleEdit = (p) => {
    setForm({ id: p.id, name: p.name, price: p.price, quantity: p.quantity });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    await load();
  };

  return (
    <div className="crud-container" style={{margin:"20px"}}>
      <h1 className="crud-title">Product Manager</h1>
      <h5>Add, update or delete items in database in order to view corresponding charts</h5>

      <div className="crud-card">
        <form onSubmit={handleSubmit}>
          <h2>{isEditing ? "Edit Product" : "Add Product"}</h2>

          <input
            className="crud-input"
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            className="crud-input"
            type="number"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            required
          />

          <input
            className="crud-input"
            type="number"
            step="1"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
            required
          />

          <button className="crud-btn btn-primary" type="submit">
            {isEditing ? "Update" : "Add"}
          </button>

          {isEditing && (
            <button
              className="crud-btn btn-secondary"
              type="button"
              onClick={() => {
                setIsEditing(false);
                setForm({ id: null, name: "", price: "", quantity: "" });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <table className="crud-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price Each</th>
            <th>Quantity</th>
            <th className="crud-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.quantity}</td>
              <td className="crud-actions">
                <button
                  className="crud-btn btn-warning"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="crud-btn btn-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProductDiagram />
    </div>
  );
}
