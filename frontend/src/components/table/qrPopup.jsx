import React from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import QRCodeGenerator from "../qrcode/QrCode";

const QrPopup = ({url, show, setShow}) => {
    return (
        <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
            <Modal.Title>View QR Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <QRCodeGenerator url={url} size={200}/>
            </Modal.Body>
        </Modal>
        
    )
}
export default QrPopup