package com.mvp.inventory.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class UserEntity {
    private Long userId;
    private String userName;
    private String email;;
    private int status;
    private String password;
    private String role;
}
