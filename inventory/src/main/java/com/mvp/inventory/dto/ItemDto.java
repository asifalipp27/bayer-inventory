package com.mvp.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItemDto {
    private String itemId;
    private String itemName;
    private String itemType;
    private long quantity;
    private long threshold;
    private Double price;
    private LocalDate expiryDate;
    private String createdBy;
    private String updatedBy;
    private LocalDate createdAt;
    private LocalDate updatedAt;
}
