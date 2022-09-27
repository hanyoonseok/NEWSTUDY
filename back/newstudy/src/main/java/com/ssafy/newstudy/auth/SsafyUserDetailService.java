package com.ssafy.newstudy.auth;

import com.ssafy.newstudy.model.dao.UserDao;
import com.ssafy.newstudy.model.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
 */
@Component
@RequiredArgsConstructor
public class SsafyUserDetailService implements UserDetailsService{
	private final UserDao userDao;
	
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    		UserDto userDto = userDao.selectUserByEmail(email);
    		if(userDto != null) {
    			SsafyUserDetails userDetails = new SsafyUserDetails(userDto);
    			return userDetails;
    		}
    		return null;
    }
}
