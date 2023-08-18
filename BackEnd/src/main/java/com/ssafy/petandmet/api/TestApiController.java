package com.ssafy.petandmet.api;

import com.ssafy.petandmet.dto.animal.Result;
import com.ssafy.petandmet.dto.jwt.Token;
import com.ssafy.petandmet.dto.user.LoginUserRequest;
import com.ssafy.petandmet.service.TestUserService;
import com.ssafy.petandmet.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestApiController {

    private final TestUserService testuserService;
    @PostMapping("/api/v1/test/user")
    public Result login(@RequestBody LoginUserRequest request) {
        Token token = testuserService.login(request);
        return new Result(true, token.getAccessToken(), "null");
    }

    @PostMapping("/api/v1/test/user/refresh")
    public Result refresh(HttpServletRequest request) {
        try {
            Token token = testuserService.refresh(request);

            return new Result(true, token.getAccessToken(), "null");

        } catch (Exception e) {
            return new Result(false, "토큰 정보가 유효하지 않습니다.", e.getMessage());
        }
    }
}
