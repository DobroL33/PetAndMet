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
            "api/v1/user/pwd-reset", //비밀번호 초기화
            "api/v1/user/send-email-auth", //이메일 인증 코드 전송
            "api/v1/user/check-email-auth", //이메일 인증 코드 확인
            "api/v1/user/find-id" //아이디 찾기
    };

    private static final String[] WHITE_LIST = {
            "/api/v1/**"
    };

    private static final String[] USER_LIST = {
            "/api/v1/user"
    };

    private static final String[] GET_LIST = {
            "/api/v1/center"
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
                                .requestMatchers(HttpMethod.POST, "api/v1/user").permitAll() //로그인 API
                                .requestMatchers(HttpMethod.POST, "api/v1/user/new").permitAll() //회원가입 API
                                .requestMatchers(HttpMethod.POST, "api/v1/user/id-check").permitAll() //아이디 중복확인 API
                                .requestMatchers(HttpMethod.POST, "api/v1/user/pwd-reset").permitAll() //임시 비밀번호 초기화 API
                                //게시판
                                .requestMatchers(HttpMethod.POST, "api/v1/board/adopt").hasAnyRole("USER") //입양후기 게시판 작성
                                .requestMatchers(HttpMethod.PATCH, "api/v1/board/adopt").hasAnyRole("USER","CENTER") //입양후기 게시판 수정
                                .requestMatchers(HttpMethod.DELETE, "api/v1/board/adopt/{id}").hasAnyRole("USER","CENTER") //입양후기 게시판 삭제
                                .requestMatchers(HttpMethod.POST, "api/v1/board/support").hasAnyRole("CENTER") //후원후기 게시판 작성
                                .requestMatchers(HttpMethod.PATCH, "api/v1/board/support").hasAnyRole("CENTER") //후원후기 게시판 수정
                                .requestMatchers(HttpMethod.DELETE, "api/v1/board/support/{id}").hasAnyRole("CENTER") //후원후기 게시판 삭제
                                .requestMatchers(HttpMethod.POST, "api/v1/board/notice").hasAnyRole("CENTER") //공지사항 게시판 작성
                                .requestMatchers(HttpMethod.PATCH, "api/v1/board/notice").hasAnyRole("CENTER") //공지사항 게시판 수정
                                .requestMatchers(HttpMethod.DELETE, "api/v1/board/notice/{id}").hasAnyRole("CENTER") //공지사항 게시판 삭제
                                .requestMatchers(HttpMethod.POST, "api/v1/board/qna").hasAnyRole("USER","CENTER") //QNA 게시판 작성
                                .requestMatchers(HttpMethod.PATCH, "api/v1/board/qna").hasAnyRole("USER","CENTER") //QNA 게시판 수정
                                .requestMatchers(HttpMethod.DELETE, "api/v1/board/qna/{id}").hasAnyRole("USER","CENTER") //QNA 게시판 삭제
                                .requestMatchers(HttpMethod.POST, "api/v1/comment/qna").hasAnyRole("USER","CENTER") //QNA 댓글 작성
                                .requestMatchers(HttpMethod.DELETE, "api/v1/comment/qna/{comment_id}").hasAnyRole("USER","CENTER") //QNA 댓글 삭제
//                                .requestMatchers(WHITE_LIST).permitAll()
//                                .requestMatchers(DEFAULT_LIST).permitAll()
//                                .requestMatchers(PathRequest.toH2Console()).permitAll()
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