package com.ssafy.petandmet.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
    private final TokenProvider tokenProvider; //토큰 생성 및 유효성 검증
    private final CustomEntryPoint entryPoint; //
    private final CustomAccessDeniedHandler accessDeniedHandler; //인가 제어
    private final CorsConfig corsConfig; //cors 설정

    private static final String[] POST_LIST = {
            //사용자
            "api/v1/user", //로그인
            "api/v1/user/new", //회원가입
            "api/v1/user/id-check", //아이디 중복 확인
            "api/v1/user/send-email-auth", //이메일 인증 코드 전송
            "api/v1/user/check-email-auth", //이메일 인증 코드 확인
            "api/v1/user/pwd-reset", //비밀번호 초기화
            "api/v1/user/find-id", //아이디 찾기
            "api/v1/user/refresh", //토큰 재발행
            "api/v1/test/user",
            "api/v1/test/user/refresh"
    };

    private static final String[] GET_LIST = {
            //동물
            "api/v1/animal", //동물 전체 목록 조회
            "api/v1/animal/detail", //동물 상세 조회
            "api/v1/animal/search", //동물 필터링 조회
            //보호소
            "api/v1/center", //보호소 페이징 가져오기
            "api/v1/center/detail", //특정 보호소 정보 가져오기
            "api/v1/center/item", //보호소가 등록한 물품 조회
            //라이브
            "api/v1/live", //현재 방송중인 라이브 전체 조회
            "api/v1/live/search", //현재 방송중인 라이브 전체 조회
            "api/v1/live/detail", //라이브 상세 조회
            //후원
            "api/v1/donate", //사용자가 후원 가능한 물품 조회
            //게시판
            "api/v1/board/adopt", //입양 후기 게시글 전체 조회
            "api/v1/board/adopt/detail", //입양 후기 게시글 상세 조회
            "api/v1/board/support", //후원 후기 게시글 전체 조회
            "api/v1/board/support/detail", //후원 후기 게시글 상세 조회
            "api/v1/board/notice", //공지사항 게시글 전체 조회
            "api/v1/board/notice/detail", //공지사항 게시글 상세 조회
            "api/v1/board/qna", //QNA 게시글 전체 조회
            "api/v1/board/qna/detail", //QNA 게시글 상세 조회
            //산책
            "api/v1/walk/time", //산책 신청 가능한 시간 조회
    };

    private static final String[] SWAGGER_LIST = {
            "/v3/api-docs/**",
            "/swagger*/**"
    };


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                //html 공격 막기 위한 csrf 비활성화
                .csrf(AbstractHttpConfigurer::disable)
                //
                .cors(AbstractHttpConfigurer::disable)
                //h2 콘솔 사용 위함
                .headers(c -> c.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable).disable())
                //cors 필터
                .addFilter(corsConfig.corsFilter())
                //url 요청 권한 설정
                .authorizeHttpRequests(auth -> {
                    try {
                        auth
                                .requestMatchers(SWAGGER_LIST).permitAll()
                                .requestMatchers(HttpMethod.POST, POST_LIST).permitAll()
                                .requestMatchers(HttpMethod.GET, GET_LIST).permitAll()
                                .anyRequest().authenticated()
                        ;
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                })
                //401(Unauthorized), 403(Forbidden) 제어
                .exceptionHandling(c ->
                        c.authenticationEntryPoint(entryPoint).accessDeniedHandler(accessDeniedHandler)
                )
                .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .apply(new JwtSecurityConfig(tokenProvider))
        ;
        return httpSecurity.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
