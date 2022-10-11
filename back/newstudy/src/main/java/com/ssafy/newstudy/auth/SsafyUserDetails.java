package com.ssafy.newstudy.auth;

import com.ssafy.newstudy.model.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 부가 상세정보(활성화 여부, 만료, 롤 등) 정의.
 */
public class SsafyUserDetails implements UserDetails {
	@Autowired
	UserDto userDto;
	boolean accountNonExpired;
    boolean accountNonLocked;
    boolean credentialNonExpired;
    boolean enabled = false;
    List<? extends GrantedAuthority> roles = new ArrayList<>();


    public SsafyUserDetails(UserDto userDto) {
    		super();
    		this.userDto = userDto;
		List<? extends GrantedAuthority> authorities = userDto.getAuthorities().stream().map(auth -> new SimpleGrantedAuthority(auth.getAuthName()))
				.collect(Collectors.toList());
		this.roles = authorities;
	}
    
    public UserDto getUser() {
    		return this.userDto;
    }
	@Override
	public String getPassword() {
		return this.userDto.getPw();
	}
	@Override
	public String getUsername() {
		return this.userDto.getEmail();
	}
	@Override
	public boolean isAccountNonExpired() {
		return this.accountNonExpired;
	}
	@Override
	public boolean isAccountNonLocked() {
		return this.accountNonLocked;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return this.credentialNonExpired;
	}
	@Override
	public boolean isEnabled() {
		return this.enabled;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles;
	}
	public void setAuthorities(List<? extends GrantedAuthority> roles) {
		this.roles = roles;
	}
}
