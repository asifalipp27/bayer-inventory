import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './SingleItem.css';
import QRCodeGenerator from "../qrcode/QrCode";

export default function SingleInventory() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:5000/api/inventory/get/${id}`);
        if (!res.ok) {
          throw new Error("Product not found");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!product) return null;

  return (
    <div className="product-card">
      {/* Image Section */}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Info Section */}
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-quantity">Quantity: {product.quantity}</p>
        <p className="product-quantity">Expiry date: {product.expiry_date}</p>
        <p className="product-quantity">Batch No: {product.batch_no}</p>
        <p className="product-quantity">Manufactring date: {product.manufacturing_date}</p>

        
      </div>
      <div>
        <QRCodeGenerator url={ window.location.href} />
      </div>
    </div>
  );
}
