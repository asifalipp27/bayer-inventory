package com.mvp.inventory.controller;

import com.google.zxing.WriterException;
import com.mvp.inventory.service.QRCodeGenerator;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/qr")
public class QRCodeController {

    @GetMapping("/{itemId}/{batchNo}/{expiryDate}")
    public ResponseEntity<byte[]> generateQRCode(@PathVariable String itemId,
                                                 @PathVariable String batchNo,
                                                 @PathVariable String expiryDate) {
        try {
            // You can customize the data to encode (e.g., URL or item info)
            String data = "Item ID: " + itemId +
                    "\nBatch No: " + batchNo +
                    "\nExpiry Date: " + expiryDate;

            byte[] qrImage = QRCodeGenerator.generateQRCodeImage(data, 250, 250);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            return ResponseEntity.ok().headers(headers).body(qrImage);

        } catch (WriterException | IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
