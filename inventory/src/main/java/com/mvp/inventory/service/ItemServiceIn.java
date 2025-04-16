package com.mvp.inventory.service;

import com.mvp.inventory.dto.ItemDto;

import java.util.List;

public interface ItemServiceIn {

    ItemDto createItem(ItemDto itemDto);
    List<ItemDto> getAllItems();
    ItemDto getItemById(Long itemId);
    ItemDto updateItem(Long itemId, ItemDto itemDto);
    void deleteItem(Long itemId);
    List<ItemDto> getItemsBelowThreshold();
    List<ItemDto> getExpiredItems();
}
