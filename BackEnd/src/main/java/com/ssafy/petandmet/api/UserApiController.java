package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.Point;
import com.ssafy.petandmet.dto.animal.InterestAnimal;
import com.ssafy.petandmet.dto.animal.Result;
import com.ssafy.petandmet.dto.jwt.Token;
import com.ssafy.petandmet.dto.user.*;
import com.ssafy.petandmet.service.UserService;
import com.ssafy.petandmet.service.S3Service;
import com.ssafy.petandmet.util.SecurityUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@Slf4j
public class UserApiController {
    private final UserService userService;
    private final S3Service s3Service;
    private final int INTEREST_ANIMAL_COUNT = 8;

    /**
     * 마일리지 조회
     *
     * @param request 사용자 UUID
     * @return 사용자 마일리지 조회
     */
    @GetMapping("/mileage/{uuid}")
    public Result findMileage(@PathVariable String uuid) {
        Long findMileage = userService.findMileage(uuid);

        UserMileageResponse response = new UserMileageResponse(findMileage);
        return new Result(true, response, "null");
    }

    /**
     * 마일리지 충전 내역 조회
     *
     * @param request 사용자 UUID
     * @return 전체 마일리지 충전 내역 조회
     */
    @GetMapping("/mileage")
    public Result findMileageLog(@RequestParam String uuid) {
        List<Point> findMileage = userService.findMileageLog(uuid);

        if (!findMileage.isEmpty()) {
            List<MileageResponse> response = findMileage
                    .stream()
                    .map(o -> new MileageResponse(o))
                    .collect(Collectors.toList());
            return new Result(true, response, "null");
        }
        return new Result(false, "null", "null");
    }

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

            return new Result(true, new AnimalFrindlinessResponse(response), "null");

        } catch ( Exception e) {
            return new Result(false, "null", e.getMessage());
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
            return new Result(false, "null", e.getMessage());
        }

        return new Result(true, "", "null");
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
        return new Result(true, token.getAccessToken(), "null");
    }

    /**
     * 토큰 재발행
     *
     * @param request jwt 토큰
     * @return access jwt 토큰
     */
    @PostMapping("/refresh")
    public Result refresh(HttpServletRequest request) {
        try {
            Token token = userService.refresh(request);

            return new Result(true, token.getAccessToken(), "null");

        } catch (Exception e) {
            return new Result(false, "토큰 정보가 유효하지 않습니다.", e.getMessage());
        }
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
        return new Result(true, "로그아웃하였습니다.", "null");
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
            return new Result(true, "존재하는 아이디가 없습니다.", "null");
        }
        return new Result(true, "존재하는 아이디가 있습니다.", "null");
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
        return new Result(true, "이메일 인증 코드 전송", "null");
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
            return new Result(true, "이메일 인증 코드 확인", "null");
        }
        return new Result(false, "이메일 인증 코드 확인", "null");
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
        return new Result(true, userInfoResponse, "null");
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
                return new Result(true, "회원 탈퇴", "null");
            }
        }
        return new Result(false, "회원 탈퇴", "null");
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
        return new Result(true, "비밀번호 초기화", "null");
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
        return new Result(true, "개인정보 수정", "null");
    }

    @PostMapping("/find-id")
    public Result findId(@RequestBody FindIdRequest request) {
        log.debug("아이디 찾기 컨트롤러");
        boolean isValid = userService.checkEmailAuthCode(request);
        log.debug("isValid = " + isValid);
        if (isValid) {
            return new Result(true, "이메일 인증", "null");
        }
        return new Result(false, "이메일 인증", "null");
    }

    /**
     * 동물 찜하기
     *
     * @param request 사용자 uuid, 동물 uuid
     * @return 좋아요 결과
     */
    @PostMapping("/interest")
    public Result interestAnimal(@RequestBody InterestAnimalRequest request) {
        log.debug("동물 찜하기 컨트롤러");
        try {
            boolean isInterest = userService.interestAnimal(request);
            if (isInterest) {
                return new Result(true, "좋아요", "null");
            } else {
                return new Result(true, "좋아요 취소", "null");
            }
        } catch (NullPointerException e) {
            return new Result(false, e.getMessage(), "null");
        }
    }

    /**
     * 사용자가 찜한 동물 조회
     *
     * @param pageable INTEREST_ANIMAL_COUNT 만큼 조회
     * @return 찜한 동물들
     */
    @GetMapping("/interest")
    public Result getInterestAnimals(@PageableDefault(size = INTEREST_ANIMAL_COUNT) Pageable pageable) {
        String userUuid = SecurityUtil.getCurrentUserUuid().get();
        List<InterestAnimal> interestAnimals = userService.getInterestAnimals(pageable, userUuid);
        log.debug("관심 가져오기");
        return new Result(true, interestAnimals, "null");
    }

    /**
     * 사용자 프로필 업로드
     *
     * @param request 사진
     * @return 업로드 유무
     * @throws FileUploadException 이미지 업로드 오류
     */
    @PostMapping("/profile")
    public Result uploadProfile(UserProfileUploadRequest request) throws FileUploadException {
        log.debug("사용자 프로필 사진 등록 컨트롤러");
        Optional<String> uuid = SecurityUtil.getCurrentUserUuid();
        String currentTime = LocalDateTime.now().toString();
        String fileName = currentTime + request.getImage().getOriginalFilename();
        log.debug(fileName);
        boolean isUpload = s3Service.uploadFile(request.getImage(), fileName);
        userService.setPhotoUrl(uuid.get(), fileName);
        if (isUpload) {
            return new Result(true, "업로드 성공", "null");
        }
        return new Result(false, "업로드 실패", "null");
    }

    /**
     * 프로필 사진 불러오기
     *
     * @return 만료시간 설정된 url
     */
    @GetMapping("/profile")
    public Result getProfileUrl() {
        log.debug("사용자 프로필 사진 불러오기 컨트롤러");
        Optional<String> uuid = SecurityUtil.getCurrentUserUuid();
        String photoUrl = userService.getPhotoUrl(uuid.get());
        String profileUrl = s3Service.getProfileUrl(photoUrl);
        log.debug(profileUrl);
        return new Result(true, profileUrl, "null");
    }
}
