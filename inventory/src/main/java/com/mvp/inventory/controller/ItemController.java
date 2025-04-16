package com.mvp.inventory.controller;

import com.mvp.inventory.dto.ItemDto;
import com.mvp.inventory.entity.ItemEntity;
import com.mvp.inventory.service.ItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("inventory")
@Slf4j
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    // Define methods for item management here
    // For example:
    @PostMapping("/add")
    public ResponseEntity<?> addItem(@RequestBody ItemDto itemDto) {
        ItemDto item = itemService.createItem(itemDto);
        log.info("Adding item");
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    // Add more endpoints for other CRUD operations as needed
    // For example, getItemById, updateItem, deleteItem, etc.
    @GetMapping("/items/{id}")
    public ResponseEntity<ItemDto> getItemById(@PathVariable Long id) {
        ItemDto item = itemService.getItemById(id);
        if (item != null) {
            return new ResponseEntity<>(item, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<ItemDto> updateItem(@PathVariable Long id, @RequestBody ItemDto itemDto) {
        ItemDto updatedItem = itemService.updateItem(id, itemDto);
        if (updatedItem != null) {
            return new ResponseEntity<>(updatedItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/items/{page}/{size}/{sortBy}")
    public ResponseEntity<List<ItemDto>> getAllItems(@PathVariable int page, @PathVariable int size,String sortBy) {
        List<ItemDto> items = itemService.getAllItems(page, size,sortBy);
        if (items.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(items, HttpStatus.OK);
        }
    }

    @QueryMapping
    public List<ItemDto> getExpiredItems() {
        return itemService.getItemsBelowThreshold();
    }

}
