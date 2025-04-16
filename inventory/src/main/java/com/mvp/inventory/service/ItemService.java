package com.mvp.inventory.service;

import com.mvp.inventory.dto.ItemDto;
import com.mvp.inventory.entity.ItemEntity;
import com.mvp.inventory.mapper.ItemMapper;
import com.mvp.inventory.repository.ItemRepository;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Slf4j
public class ItemService implements ItemServiceIn {

    private final ItemRepository itemRepository;
    private final ItemMapper itemMapper = Mappers.getMapper(ItemMapper.class);

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public ItemDto createItem(ItemDto itemDto) {
        log.info("Creating item: {}", itemDto);
        ItemEntity entity = itemMapper.mapToEntity(itemDto);
         itemRepository.save(entity);
        return  itemMapper.mapToDto(entity);;
    }

    @Override
    public List<ItemDto> getAllItems() {
        log.info("Fetching all items");
        List<ItemEntity> itemEntities = itemRepository.findAll();
        if (itemEntities.isEmpty()) {
            log.warn("No items found");
            return List.of();
        }
        log.info("Items found: {}", itemEntities.size());
        List<ItemDto> itemDtos = itemMapper.mapToDtoList(itemEntities);
        return itemDtos;
    }

    public List<ItemDto> getAllItems(int page,int size,String sortBy) {
        log.info("Fetching all items with pagination: page={}, size={}", page, size);
        Sort sort = Sort.by(sortBy).ascending();
        PageRequest pagenation = PageRequest.of(page, size,sort);
        List<ItemEntity> itemEntities = (List<ItemEntity>) itemRepository.findAll(pagenation);
        if (itemEntities.isEmpty()) {
            log.warn("No items found");
            return List.of();
        }
        log.info("Items found: {}", itemEntities.size());
        List<ItemDto> itemDtos = itemMapper.mapToDtoList(itemEntities);
        return itemDtos;
    }

    @Override
    public ItemDto getItemById(Long itemId) {
        log.info("Fetching item by ID: {}", itemId);
        ItemEntity itemEntity = itemRepository.findById(itemId).orElse(null);
        if (itemEntity != null) {
            log.info("Item found: {}", itemEntity);
            return itemMapper.mapToDto(itemEntity);
        }
        return null;
    }

    @Override
    public ItemDto updateItem(Long itemId, ItemDto itemDto) {
        log.info("Updating item with ID: {}", itemId);
        ItemEntity itemEntity = itemRepository.findById(itemId).orElse(null);
        if (itemEntity != null) {
            itemEntity.setQuantity(itemDto.getQuantity());
            itemRepository.save(itemEntity);
            log.info("Item updated: {}", itemEntity);
            return itemMapper.mapToDto(itemEntity);
        } else {
            log.warn("Item with ID {} not found", itemId);
            throw new RuntimeException("Item not found");
        }
    }

    @Override
    public void deleteItem(Long itemId) {
        log.info("Deleting item with ID: {}", itemId);
        ItemEntity itemEntity = itemRepository.findById(itemId).orElse(null);
        if (itemEntity != null) {
            itemRepository.delete(itemEntity);
            log.info("Item deleted: {}", itemEntity);
        } else {
            log.warn("Item with ID {} not found", itemId);
            throw new RuntimeException("Item not found");
        }
    }

    @Override
    public List<ItemDto> getItemsBelowThreshold() {
        log.info("Fetching items below threshold");
        List<ItemEntity> itemEntities = itemRepository.findAll();
        if (!itemEntities.isEmpty()) {
           List<ItemEntity> items = itemEntities.stream().filter(item -> item.getQuantity() <= item.getThreshold()).toList();
            log.info("Items below threshold: {}", items.size());
            List<ItemDto> itemDtos = itemMapper.mapToDtoList(items);
            return itemDtos;
        }
        return List.of();
    }

    @Override
    public List<ItemDto> getExpiredItems() {
        log.info("Fetching expired items");
        List<ItemEntity> itemEntities = itemRepository.findByExpiryDateBefore(LocalDate.now());
        if (!itemEntities.isEmpty()) {
            log.info("Expired items found: {}", itemEntities.size());
            List<ItemDto> itemDtos = itemMapper.mapToDtoList(itemEntities);
            return itemDtos;
        }
        return List.of();
    }
}
