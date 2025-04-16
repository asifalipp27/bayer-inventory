package com.mvp.inventory.mapper;

import com.mvp.inventory.dto.UserInfo;
import com.mvp.inventory.entity.UserEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",
unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE
)
public interface UserMapper {
    UserEntity toEntity(UserInfo userInfo);

    UserInfo toDto(UserEntity userEntity);

}
