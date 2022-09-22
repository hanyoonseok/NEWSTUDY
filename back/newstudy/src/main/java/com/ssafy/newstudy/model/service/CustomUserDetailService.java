package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dao.UserDao;
import com.ssafy.newstudy.model.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service("userDetailService")
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserDto> opt = Optional.of(userDao.selectUserByEmail(email));
        return opt.map(user->getUserDetail(email, user)).orElseThrow(()->new UsernameNotFoundException("존재하지 않는 email 입니다."));
    }

    private User getUserDetail(String email, UserDto userDto){
        List<GrantedAuthority> authorities = userDto.getAuthorities().stream().map(auth -> new SimpleGrantedAuthority(auth.getAuthName()))
                .collect(Collectors.toList());
        return new User(userDto.getEmail(), userDto.getPw(), authorities);
    }
}
