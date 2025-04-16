package com.mvp.inventory.repository;

import com.mvp.inventory.entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepositoy extends MongoRepository<UserEntity, Long> {

}
