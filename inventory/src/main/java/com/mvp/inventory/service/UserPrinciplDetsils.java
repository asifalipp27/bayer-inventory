package com.mvp.inventory.service;

import com.mvp.inventory.entity.UserEntity;
import com.mvp.inventory.entity.UserPrincipl;
import com.mvp.inventory.repository.UserRepositoy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserPrinciplDetsils implements UserDetailsService {

    private final UserRepositoy userRepositoy;
    ;

    public UserPrinciplDetsils(UserRepositoy userRepositoy) {
        this.userRepositoy = userRepositoy;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity entity = userRepositoy.findByUserName(username);
        if (entity == null) {
            throw new UsernameNotFoundException("User Not found with name:" + username);
        }
        return new UserPrincipl(entity);
    }
}
