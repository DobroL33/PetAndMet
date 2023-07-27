package com.ssafy.petandmet.api;

import com.ssafy.petandmet.dto.animal.Result;
import com.ssafy.petandmet.dto.jwt.Token;
import com.ssafy.petandmet.dto.user.CreateUserRequest;
import com.ssafy.petandmet.dto.user.LoginUserRequest;
import com.ssafy.petandmet.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@Slf4j
public class UserApiController {
    private final UserService userService;

    /**
     * 사용자 회원가입
     *
     * @param request 사용자 request
     * @return 회원가입 결과
     */
    @PostMapping("/new")
    public Result CreateUser(@RequestBody CreateUserRequest request) {
        log.debug(request.toString());
        log.debug("사용자 등록 컨트롤러");
        try {
            userService.join(request);
        } catch (IllegalStateException e) {
            return new Result("실패", "null", e.getMessage());
        }

        return new Result("성공", "", "null");
    }

    /**
     * 사용자 로그인
     * @param request 사용자 정보
     * @return access jwt 토큰
     */
    @PostMapping
    public Result login(@RequestBody LoginUserRequest request) {
        log.debug(request.toString());
        Token token = userService.login(request);
        return new Result("성공", token.getAccessToken(), "null");
    }
}
