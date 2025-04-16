import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './dashboard.css';
import InventoryTable from "./InventoryTable";

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  type: yup.string().oneOf(['Medicine', 'Equipments', 'Consumables', 'Utilities']).required(),
  quantity: yup.number().required().min(0),
  threshold_quantity: yup.number().required().min(0),
  price: yup.number().required().min(0),
  expiry_date: yup.date().nullable().typeError('Invalid date'),
  manufacturing_date: yup.date().nullable().typeError('Invalid date'),
  batch_no: yup.string().nullable(),
});


const DashboardTable = () => {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [inventoryData, setInventoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm({
      resolver: yupResolver(schema)
    });

    const saveData = (data) => {
      data.created_by = "Asif";
      data.last_updated_by = "Asif";
      const url = 'http://localhost:5000/api/inventory/add';
      fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    const onSubmit = (data) => {
      console.log('Submitted Data:', data);
      setShow(false);
      saveData(data);
      reset(); // reset form after submission
    };

    const deleteInventoryItem = (id) => {
      
    }
    const getSingleItem= async (id) => {
        try {
          const res = await fetch(`http://localhost:5000/api/inventory/get/${id}`);
          if (!res.ok) {
            throw new Error("Product not found");
          }
          const data = await res.json();
          setSelectedItem(data);
        } catch (err) {
          console.log(err.message);
        } finally {
          console.log(false);
        }
    }
    const editInventoryItem = (id) => {
      setShow(true);
      setEdit(true);
      getSingleItem(id);
    }
    return (
      <div className="dash-container">
        <div className="d-flex">
          <Button variant="primary" size="sm"  onClick={() => setShow(true)} className="add-inventory-button" >Add Inventory</Button>
        </div>
        <div>
          {isLoading ? <div>Loading...</div> : <InventoryTable editInventoryItem={editInventoryItem} deleteInventoryItem={deleteInventoryItem} />}
        </div>
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{edit ? 'Edit Inventory Item' : 'Add Inventory Item'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3 element-contianer">
                <Form.Label>Name</Form.Label>
                <Form.Control {...register('name')} />
                <Form.Text className="text-danger">{errors.name?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 element-contianer">
                <Form.Label>Type</Form.Label>
                <Form.Select {...register('type')}>
                  <option value="">Select type</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Equipments">Equipments</option>
                  <option value="Consumables">Consumables</option>
                  <option value="Utilities">Utilities</option>
                </Form.Select>
                <Form.Text className="text-danger">{errors.type?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 element-contianer">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" {...register('quantity')} />
                <Form.Text className="text-danger">{errors.quantity?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 element-contianer">
                <Form.Label>Threshold Quantity</Form.Label>
                <Form.Control type="number" {...register('threshold_quantity')} />
                <Form.Text className="text-danger">{errors.threshold_quantity?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 element-contianer">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" {...register('price')} />
                <Form.Text className="text-danger">{errors.price?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 element-contianer">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control type="date" {...register('expiry_date')} />
                <Form.Text className="text-danger">{errors.expiry_date?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 element-contianer">
                <Form.Label>Manufacturing Date</Form.Label>
                <Form.Control type="date" {...register('manufacturing_date')} />
                <Form.Text className="text-danger">{errors.manufacturing_date?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 element-contianer">
                <Form.Label>Batch No</Form.Label>
                <Form.Control type="text" {...register('batch_no')} />
                <Form.Text className="text-danger">{errors.batch_no?.message}</Form.Text>
              </Form.Group>
              <Modal.Footer className="px-0">
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save Item
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  };

  export default DashboardTable