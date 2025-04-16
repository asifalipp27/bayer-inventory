package com.mvp.inventory.repository;

import com.mvp.inventory.entity.ItemEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ItemRepository extends MongoRepository<ItemEntity, Long> {
    ItemEntity findByItemId(Long itemId);

    ItemEntity findByItemName(String itemName);

    ItemEntity findByItemType(String itemType);

    ItemEntity findByQuantity(long quantity);

    ItemEntity findByThreshold(long threshold);

    ItemEntity findByExpiryDate(LocalDate expiryDate);

    ItemEntity findByCreatedBy(String createdBy);

    ItemEntity findByUpdatedBy(String updatedBy);

    // Custom finder for low stock
    List<ItemEntity> findByQuantityLessThanEqual(long threshold);

    // Finder for expired items
    List<ItemEntity> findByExpiryDateBefore(LocalDate date);

    @Query("{'$text': {'$search': ?0}}")
    Page<ItemEntity> searchByTextWithPagination(String searchTerm, Pageable pageable);
}
