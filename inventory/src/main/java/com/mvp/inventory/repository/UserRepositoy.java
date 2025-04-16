package com.mvp.inventory.repository;

import com.mvp.inventory.entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

@Service
public interface UserRepositoy extends MongoRepository<UserEntity, Long> {

    UserEntity findByUserName(String userName);

    UserEntity findByEmail(String email);

    UserEntity findByUserId(Long userId);
}
