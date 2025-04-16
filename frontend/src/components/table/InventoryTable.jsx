import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import QrPopup from './qrPopup';

const InventoryTable = (props) => {
  const {
    editInventoryItem,
  } = props
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isQROpen, setIsQROpen] = useState(false);
  const [error, setError] = useState('');


  const openQRCode = () => {
    setIsQROpen(true);
  }
  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/inventory/getAll');
      setInventory(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load inventory.');
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchInventory();
  }, []);

  if (loading) return <Spinner animation="border" className="mt-3" />;
  if (error) return <Alert variant="danger" className="mt-3">{error}</Alert>;

  return (
    <div className="table-responsive mt-4">
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Threshold</th>
            <th>Price</th>
            <th>Batch No</th>
            <th>Manufactured</th>
            <th>Expiry</th>
            <th>Created By</th>
            <th>Updated By</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>QR Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={item._id}>
              <td><a href={`/inventory/${item._id}`}>{item.name}</a></td>
              <td>{item.type}</td>
              <td>{item.quantity}</td>
              <td>{item.threshold_quantity}</td>
              <td>{item.price}</td>
              <td>{item.batch_no}</td>
              <td>{item.manufacturing_date?.slice(0, 10)}</td>
              <td>{item.expiry_date?.slice(0, 10)}</td>
              <td>{item.created_by}</td>
              <td>{item.last_updated_by}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
              <td>{new Date(item.updated_at).toLocaleString()}</td>
              <td>
                <span onClick={() => openQRCode(item._id)}>
                  View QR Code
                  <QrPopup show={isQROpen} url={'http://localhost:3001/inventory/' + item._id} size={200} setShow={setIsQROpen} />

                </span>
              </td>
              <td className="d-flex justify-content-center">
                <span className='link' onClick={() => editInventoryItem(item._id)}> Edit </span>
                <span> | </span>
                <span className='link'> Delete </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default InventoryTable;
