package com.mvp.inventory.mapper;

import com.mvp.inventory.dto.ItemDto;
import com.mvp.inventory.entity.ItemEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface ItemMapper {
    ItemDto mapToDto(ItemEntity entity);
    ItemEntity mapToEntity(ItemDto dto);

    List<ItemDto> mapToDtoList(List<ItemEntity> entityList);
    List<ItemEntity> mapToEntityList(List<ItemDto> dtoList);
}
