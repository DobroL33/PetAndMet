package com.ssafy.petandmet.api;

import com.ssafy.petandmet.dto.animal.Result;
import com.ssafy.petandmet.dto.jwt.Token;
import com.ssafy.petandmet.dto.user.*;
import com.ssafy.petandmet.service.UserService;
import com.ssafy.petandmet.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@Slf4j
public class UserApiController {
    private final UserService userService;

    /**
     * 동물 우호도 조회
     *
     * @param request 사용자 UUID, 동물 UUID
     * @return 우호도 Percent
     */
    @PostMapping("/animal-friendliness")
    public Result getAnimalFriendless(@RequestBody AnimalFriendlinessRequest request) {
        try {
            Long response = userService.findAnimalFriendliness(request);

            return new Result("성공", new AnimalFrindlinessResponse(response), "null");

        } catch ( Exception e) {
            return new Result("실패", "null", e.getMessage());
        }
    }

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
     *
     * @param request 사용자 정보
     * @return access jwt 토큰
     */
    @PostMapping
    public Result login(@RequestBody LoginUserRequest request) {
        log.debug(request.toString());
        Token token = userService.login(request);
        return new Result("성공", token.getAccessToken(), "null");
    }

    /**
     * 사용자 로그아웃
     *
     * @param authorization 사용자 인증 토큰
     * @return 로그아웃 결과
     */
    @DeleteMapping
    public Result logout(@RequestHeader(value = "Authorization") String authorization) {
        log.debug("로그아웃 컨트롤러");
        log.debug(authorization);
        String accessToken = authorization.substring(7);
        userService.logout(accessToken);
        return new Result("성공", "로그아웃하였습니다.", "null");
    }

    /**
     * 아이디 중복 확인
     *
     * @param request 사용자가 원하는 ID
     * @return 중복 여부 결과
     */
    @PostMapping("/id-check")
    public Result isDuplicateId(@RequestBody IdCheckRequest request) {
        log.debug("아이디 중복확인 컨트롤러");
        log.debug(request.toString());
        boolean isExist = userService.isDuplicateId(request);
        if (!isExist) {
            return new Result("성공", "존재하는 아이디가 없습니다.", "null");
        }
        return new Result("성공", "존재하는 아이디가 있습니다.", "null");
    }

    /**
     * 이메일 인증 코드 전송
     *
     * @param request 사용자 이메일
     * @return 전송 여부
     */
    @PostMapping("/send-email-auth")
    public Result sendEmailAuthenticationCode(@RequestBody SendEmailAuthRequest request) {
        log.debug("이메일 인증 코드 전송 컨트롤러");
        log.debug(request.toString());
        userService.sendEmailAuthCode(request);
        return new Result("성공", "이메일 인증 코드 전송", "null");
    }

    /**
     * 이메일 인증 코드 확인
     *
     * @param request 사용자 이메일, 코드
     * @return 코드 일치 여부
     */
    @PostMapping("/check-email-auth")
    public Result checkEmailAuthenticationCode(@RequestBody CheckEmailAuthRequest request) {
        log.debug("이메일 인증 코드 확인 컨트롤러");
        log.debug(request.toString());
        boolean isValid = userService.checkEmailAuthCode(request);
        log.debug("isValid = " + isValid);
        if (isValid) {
            return new Result("성공", "이메일 인증 코드 확인", "null");
        }
        return new Result("실패", "이메일 인증 코드 확인", "null");
    }

    /**
     * 사용자 마이페이지
     *
     * @return 사용자 정보
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('USER')")
    public Result getUserInfo() {
        log.debug("사용자 마이페이지 컨트롤러");
        UserInfoResponse userInfoResponse = null;
        Optional<String> uuid = SecurityUtil.getCurrentUserUuid();
//        uuid.ifPresent(log::debug);
        if (uuid.isPresent()) {
            userInfoResponse = userService.getUserInfo(uuid.get());
        }
        return new Result("성공", userInfoResponse, "null");
    }


    /**
     * 회원 탈퇴
     *
     * @return 탈퇴 여부
     */
    @DeleteMapping("/withdrawal")
    public Result withdrawal() {
        log.debug("회원 탈퇴 컨트롤러");
        Optional<String> uuid = SecurityUtil.getCurrentUserUuid();
        if (uuid.isPresent()) {
            boolean isWithdrawal = userService.withdrawal(uuid.get());

            if (isWithdrawal) {
                return new Result("성공", "회원 탈퇴", "null");
            }
        }
        return new Result("실패", "회원 탈퇴", "null");
    }

    /**
     * 임의 비밀번호 초기화
     *
     * @param request 사용자의 id, email
     * @return 초기화 여부
     */
    @PostMapping("/pwd-reset")
    public Result passwordReset(@RequestBody PasswordResetRequest request) {
        log.debug("임시 비밀번호 초기화 컨트롤러");
        userService.passwordReset(request);
        return new Result("성공", "비밀번호 초기화", "null");
    }

    /**
     * 사용자 개인 정보 수정
     *
     * @param request 사용자 name, phone
     * @return 개인 정보 수정 결과
     */
    @PatchMapping
    public Result modifyInfo(@RequestBody ModifyInfoRequest request) {
        log.debug("개인 정보 수정 컨트롤러");
        Optional<String> uuid = SecurityUtil.getCurrentUserUuid();
        uuid.ifPresent(s -> userService.modifyInfo(s, request));
        return new Result("성공", "개인정보 수정", "null");
    }
}
