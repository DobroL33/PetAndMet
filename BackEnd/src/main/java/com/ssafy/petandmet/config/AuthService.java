package com.ssafy.petandmet.config;

import com.ssafy.petandmet.domain.RoleType;
import com.ssafy.petandmet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        log.debug("회원 인증 처리");
        Optional<com.ssafy.petandmet.domain.User> user = userRepository.findUserByUserId(userId);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("유효하지 않은 회원입니다.");
        }
//        log.debug("user = " + user.get());

        RoleType roleType = user.get().getRoleType();
        Set<String> roleSet = new HashSet<>();
        roleSet.add(roleType.toString());
        String[] roles = Arrays.copyOf(roleSet.toArray(), roleSet.size(), String[].class);

        return User.builder()
                .username(user.get().getUuid())
                .password(user.get().getPassword())
                .roles(roles)
                .build();
    }
}