package com.mvp.inventory.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "inventry_items")
public class ItemEntity {

    @Id
    private Long itemId;
    private String itemName;
    private String itemType;
    private long quantity;
    private long threshold;
    private LocalDate expiryDate;
    private String createdBy;
    private String updatedBy;
    private LocalDate createdAt;
    private LocalDate updatedAt;

}
