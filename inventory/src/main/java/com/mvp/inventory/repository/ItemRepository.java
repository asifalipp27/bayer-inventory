package com.mvp.inventory.repository;

import com.mvp.inventory.entity.ItemEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;

public interface ItemRepository extends MongoRepository<ItemEntity, Long> {
    ItemEntity findByItemId(Long itemId);

    ItemEntity findByItemName(String itemName);

    ItemEntity findByItemType(String itemType);

    ItemEntity findByQuantity(long quantity);

    ItemEntity findByThreshold(long threshold);

    ItemEntity findByExpiryDate(LocalDate expiryDate);

    ItemEntity findByCreatedBy(String createdBy);

    ItemEntity findByUpdatedBy(String updatedBy);
}
