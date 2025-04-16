package com.mvp.inventory.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
@Document(collection = "users")
public class UserEntity {
    @Id
    private Long userId;
    private String userName;
    private String email;;
    private int status;
    private String password;
    private String role;
}
