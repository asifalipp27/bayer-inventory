package com.mvp.inventory.service;

import com.mvp.inventory.dto.UserInfo;
import com.mvp.inventory.entity.UserEntity;
import com.mvp.inventory.mapper.UserMapper;
import com.mvp.inventory.repository.UserRepositoy;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService {

    private final UserRepositoy userRepositoy;
    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepositoy userRepositoy) {
        this.userRepositoy = userRepositoy;
    }

    //define method for save userinfo
    public UserInfo saveUserInfo(UserInfo userInfo) {
        log.info("Saving user info: {}", userInfo);
        UserEntity entity = userMapper.toEntity(userInfo);
        entity.setPassword(passwordEncoder.encode(userInfo.getPassword()));
        entity = userRepositoy.save(entity);
        log.info("User info saved: {}", entity);
        return userMapper.toDto(entity);
    }

    public UserInfo fetchByUserId(Long userId) {
        UserEntity userEntity = userRepositoy.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toDto(userEntity);
    }
}
