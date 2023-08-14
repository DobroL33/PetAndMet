package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.Point;
import com.ssafy.petandmet.dto.animal.InterestAnimal;
import com.ssafy.petandmet.dto.user.AnimalFriendlinessRequest;
import com.ssafy.petandmet.dto.user.AnimalFrindlinessResponse;
import com.ssafy.petandmet.dto.user.CheckEmailAuthRequest;
import com.ssafy.petandmet.dto.user.CreateUserRequest;
import com.ssafy.petandmet.dto.user.FindIdRequest;
import com.ssafy.petandmet.dto.user.IdCheckRequest;
import com.ssafy.petandmet.dto.user.InterestAnimalRequest;
import com.ssafy.petandmet.dto.user.InterestAnimalResponse;
import com.ssafy.petandmet.dto.user.LoginUserRequest;
import com.ssafy.petandmet.dto.user.MileageResponse;
import com.ssafy.petandmet.dto.user.ModifyInfoRequest;
import com.ssafy.petandmet.dto.user.PasswordResetRequest;
import com.ssafy.petandmet.dto.user.Result;
import com.ssafy.petandmet.dto.jwt.Token;
import com.ssafy.petandmet.dto.user.SendEmailAuthRequest;
import com.ssafy.petandmet.dto.user.UserIdCheckResponse;
import com.ssafy.petandmet.dto.user.UserInfoResponse;
import com.ssafy.petandmet.dto.user.UserLoginResponse;
import com.ssafy.petandmet.dto.user.UserMileageLogResponse;
import com.ssafy.petandmet.dto.user.UserMileageResponse;
import com.ssafy.petandmet.dto.user.UserProfileUploadRequest;
import com.ssafy.petandmet.dto.user.UserRefreshResponse;
import com.ssafy.petandmet.dto.user.UserResponse;
import com.ssafy.petandmet.service.UserService;
import com.ssafy.petandmet.service.S3Service;
import com.ssafy.petandmet.util.SecurityUtil;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    @Operation(summary = "사용자 마일리지 조회", description = "현재 사용자의 마일리지를 조회합니다.")
    public Result findMileage(@PathVariable String uuid) {
        Long findMileage = userService.findMileage(uuid);

        UserMileageResponse response = new UserMileageResponse("사용자 마일리지 조회 성공", 200, findMileage);
        return new Result(true, response, null);
    }

    /**
     * 마일리지 충전 내역 조회
     *
     * @param request 사용자 UUID
     * @return 전체 마일리지 충전 내역 조회
     */
    @GetMapping("/mileage")
    @Operation(summary = "사용자 마일리지 충전 내역 조회", description = "사용자가 마일리지를 충전했던 내역을 조회합니다.")
    public Result findMileageLog(@RequestParam String uuid) {
        List<Point> findMileage = userService.findMileageLog(uuid);

        if (!findMileage.isEmpty()) {
            List<MileageResponse> response = findMileage
                    .stream()
                    .map(o -> new MileageResponse(o))
                    .collect(Collectors.toList());

            UserMileageLogResponse userMileageLogResponse = new UserMileageLogResponse("마일리지 충전 내역 조회 성공", 200, response);
            return new Result(true, userMileageLogResponse, null);
        }
        UserMileageLogResponse userMileageLogResponse = new UserMileageLogResponse("마일리지 충전 내역 조회 실패", 200, null);
        return new Result(false, null, userMileageLogResponse);
    }

    /**
     * 동물 우호도 조회
     *
     * @param request 사용자 UUID, 동물 UUID
     * @return 우호도 Percent
     */
    @PostMapping("/animal-friendliness")
    @Operation(summary = "사용자와 동물 사이의 호감도 조회", description = "사용자와 특정 동물사이의 호감도를 조회합니다.")
    public Result getAnimalFriendless(@RequestBody AnimalFriendlinessRequest request) {
        try {
            Long response = userService.findAnimalFriendliness(request);

            return new Result(true, new AnimalFrindlinessResponse(200, response), null);

        } catch (Exception e) {
            return new Result(false, null, e.getMessage());
        }
    }

    /**
     * 사용자 회원가입
     *
     * @param request 사용자 request
     * @return 회원가입 결과
     */
    @PostMapping("/new")
    @Operation(summary = "사용자 회원가입", description = "사용자가 회원가입(사용자/보호소)합니다.")
    public Result CreateUser(@RequestBody CreateUserRequest request) {
        log.debug(request.toString());
        log.debug("사용자 등록 컨트롤러");
        try {
            userService.join(request);
        } catch (IllegalStateException e) {
            UserResponse error = new UserResponse(e.getMessage(), 409);
            return new Result(false, null, error);
        }

        UserResponse response = new UserResponse("회원가입 성공", 200);
        return new Result(true, response, null);
    }

    /**
     * 사용자 로그인
     *
     * @param request 사용자 정보
     * @return access jwt 토큰
     */
    @PostMapping
    @Operation(summary = "사용자 로그인", description = "사용자가 로그인합니다.")
    public Result login(@RequestBody LoginUserRequest request) {
        log.debug(request.toString());
        try {
            Token token = userService.login(request);
            UserLoginResponse response = new UserLoginResponse("로그인 성공", 200, token.getAccessToken(), null);
            String centerUuid = userService.getCenterUuid(request);
            if (centerUuid != null) {
                response.setCenterUuid(centerUuid);
            }
            return new Result(true, response, null);
        } catch (Exception e) {
            UserLoginResponse response = new UserLoginResponse(e.getMessage(), 400, null, null);
            return new Result(false, null, response);
        }
    }

    /**
     * 토큰 재발행
     *
     * @param request jwt 토큰
     * @return access jwt 토큰
     */
    @PostMapping("/refresh")
    @Operation(summary = "토큰 재발행", description = "만료된 토큰을 다시 발행합니다.")
    public Result refresh(HttpServletRequest request) {
        try {
            Token token = userService.refresh(request);

            UserRefreshResponse response = new UserRefreshResponse("토큰 재발행 성공", 200, token.getAccessToken());
            return new Result(true, response, null);

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
    @Operation(summary = "사용자 로그아웃", description = "사용자가 로그아웃합니다.")
    public Result logout(@RequestHeader(value = "Authorization") String authorization) {
        log.debug("로그아웃 컨트롤러");
        log.debug(authorization);
        String accessToken = authorization.substring(7);
        userService.logout(accessToken);
        UserResponse response = new UserResponse("로그아웃하였습니다.", 200);
        return new Result(true, response, null);
    }

    /**
     * 아이디 중복 확인
     *
     * @param request 사용자가 원하는 ID
     * @return 중복 여부 결과
     */
    @PostMapping("/id-check")
    @Operation(summary = "아이디 중복확인", description = "회원가입시 아이디가 이미 있는지 확인합니다.")
    public Result isDuplicateId(@RequestBody IdCheckRequest request) {
        log.debug("아이디 중복확인 컨트롤러");
        log.debug(request.toString());
        boolean isExist = userService.isDuplicateId(request.getId());
        if (!isExist) {
            UserIdCheckResponse response = new UserIdCheckResponse("사용 가능한 아이디입니다.", 200, 1);
            return new Result(true, response, null);
        }
        UserIdCheckResponse response = new UserIdCheckResponse("존재하는 아이디가 있습니다.", 409, 0);
        return new Result(false, null, response);
    }

    /**
     * 이메일 인증 코드 전송
     *
     * @param request 사용자 이메일
     * @return 전송 여부
     */
    @PostMapping("/send-email-auth")
    @Operation(summary = "이메일 인증 코드 전송", description = "중복확인 및 사용자 본인인증을 위해 이메일로 인증코드를 전송합니다.")
    public Result sendEmailAuthenticationCode(@RequestBody SendEmailAuthRequest request) {
        log.debug("이메일 인증 코드 전송 컨트롤러");
        log.debug(request.toString());
        userService.sendEmailAuthCode(request);
        UserResponse response = new UserResponse("이메일 전송 성공", 200);
        return new Result(true, response, null);
    }

    /**
     * 이메일 인증 코드 확인
     *
     * @param request 사용자 이메일, 코드
     * @return 코드 일치 여부
     */
    @PostMapping("/check-email-auth")
    @Operation(summary = "이메일 인증 코드 확인", description = "중복확인 및 사용자 본인인증을 위해 이메일로 받은 인증코드를 확인합니다.")
    public Result checkEmailAuthenticationCode(@RequestBody CheckEmailAuthRequest request) {
        log.debug("이메일 인증 코드 확인 컨트롤러");
        log.debug(request.toString());
        boolean isValid = userService.checkEmailAuthCode(request);
        log.debug("isValid = " + isValid);
        if (isValid) {
            UserResponse response = new UserResponse("이메일 인증 성공", 200);
            return new Result(true, response, null);
        }
        UserResponse response = new UserResponse("이메일 인증 실패", 400);
        return new Result(false, null, response);
    }

    /**
     * 사용자 마이페이지
     *
     * @return 사용자 정보
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('USER')")
    @Operation(summary = "사용자 마이페이지", description = "사용자의 마이페이지를 조회합니다.")
    public Result getUserInfo() {
        log.debug("사용자 마이페이지 컨트롤러");
        UserInfoResponse userInfoResponse = null;
        Optional<String> uuid = SecurityUtil.getCurrentUserUuid();
//        uuid.ifPresent(log::debug);
        if (uuid.isPresent()) {
            userInfoResponse = userService.getUserInfo(uuid.get());
            return new Result(true, userInfoResponse, null);
        }
        return new Result(false, null, null);
    }


    /**
     * 회원 탈퇴
     *
     * @return 탈퇴 여부
     */
    @DeleteMapping("/withdrawal")
    @Operation(summary = "회원 탈퇴", description = "사용자가 회원을 탈퇴합니다.")
    public Result withdrawal() {
        log.debug("회원 탈퇴 컨트롤러");
        Optional<String> uuid = SecurityUtil.getCurrentUserUuid();
        if (uuid.isPresent()) {
            boolean isWithdrawal = userService.withdrawal(uuid.get());

            if (isWithdrawal) {
                UserResponse response = new UserResponse("회원 탈퇴 성공", 200);
                return new Result(true, response, null);
            }
        }
        return new Result(false, null, null);
    }

    /**
     * 임의 비밀번호 초기화
     *
     * @param request 사용자의 id, email
     * @return 초기화 여부
     */
    @PostMapping("/pwd-reset")
    @Operation(summary = "임의 비밀번호 초기화", description = "비밀번호 찾기시 사용자 아이디와 이메일을 확인해서 이메일로 임시 비밀번호 전송합니다.")
    public Result passwordReset(@RequestBody PasswordResetRequest request) {
        log.debug("임시 비밀번호 초기화 컨트롤러");
        userService.passwordReset(request);
        UserResponse response = new UserResponse("임시 비밀번호 초기화 성공", 200);
        return new Result(true, response, null);
    }

    /**
     * 사용자 개인 정보 수정
     *
     * @param request 사용자 name, phone
     * @return 개인 정보 수정 결과
     */
    @PatchMapping
    @Operation(summary = "회원 정보 수정", description = "사용자가 회원정보(별명, 전화번호)를 수정합니다.")
    public Result modifyInfo(@RequestBody ModifyInfoRequest request) {
        log.debug("개인 정보 수정 컨트롤러");
        Optional<String> uuid = SecurityUtil.getCurrentUserUuid();
        uuid.ifPresent(s -> userService.modifyInfo(s, request));
        UserResponse response = new UserResponse("개인 정보 수정 성공", 200);
        return new Result(true, response, null);
    }

    @PostMapping("/find-id")
    @Operation(summary = "아이디 찾기", description = "사용자의 아이디를 이메일 인증을 통해 아이디를 찾습니다.")
    public Result findId(@RequestBody FindIdRequest request) {
        log.debug("아이디 찾기 컨트롤러");
        boolean isValid = userService.checkEmailAuthCode(request);
        log.debug("isValid = " + isValid);
        if (isValid) {
            UserResponse response = new UserResponse("아이디 찾기 성공", 200);
            return new Result(true, response, null);
        }
        return new Result(false, null, null);
    }

    /**
     * 동물 찜하기
     *
     * @param request 사용자 uuid, 동물 uuid
     * @return 좋아요 결과
     */
    @PostMapping("/interest")
    @Operation(summary = "동물 찜하기", description = "사용자가 특정동물을 찜합니다.")
    public Result interestAnimal(@RequestBody InterestAnimalRequest request) {
        log.debug("동물 찜하기 컨트롤러");
        try {
            boolean isInterest = userService.interestAnimal(request);
            if (isInterest) {
                return new Result(true, "좋아요", null);
            } else {
                return new Result(true, "좋아요 취소", null);
            }
        } catch (NullPointerException e) {
            return new Result(false, e.getMessage(), null);
        }
    }

    /**
     * 사용자가 찜한 동물 조회
     *
     * @param pageable INTEREST_ANIMAL_COUNT 만큼 조회
     * @return 찜한 동물들
     */
    @GetMapping("/interest")
    @Operation(summary = "사용자별 찜한 동물 조회", description = "사용자가 찜한 동물을 모두 조회합니다.")
    public Result getInterestAnimals(@PageableDefault(size = INTEREST_ANIMAL_COUNT) Pageable pageable) {
        String userUuid = SecurityUtil.getCurrentUserUuid().get();
        List<InterestAnimal> interestAnimals = userService.getInterestAnimals(pageable, userUuid);

        if (!interestAnimals.isEmpty()) {
            InterestAnimalResponse response = new InterestAnimalResponse("좋아요한 동물 조회 성공", 200, interestAnimals);
            return new Result(true, response, null);
        }
        return new Result(false, null, null);
    }

    /**
     * 사용자 프로필 업로드
     *
     * @param request 사진
     * @return 업로드 유무
     * @throws FileUploadException 이미지 업로드 오류
     */
    @PostMapping("/profile")
    @Operation(summary = "사용자 프로필 업로드", description = "사용자가 변경하고싶은 프로필 사진을 업로드합니다.")
    public Result uploadProfile(UserProfileUploadRequest request) throws FileUploadException {

        log.debug("사용자 프로필 사진 등록 컨트롤러");
        Optional<String> uuid = SecurityUtil.getCurrentUserUuid();
        String currentTime = LocalDateTime.now().toString();
        String fileName = currentTime + request.getImage().getOriginalFilename();
        log.debug(fileName);
        boolean isUpload = s3Service.uploadFile(request.getImage(), fileName);
        userService.setPhotoUrl(uuid.get(), fileName);
        if (isUpload) {
            UserResponse response = new UserResponse("업로드 성공", 200);
            return new Result(true, response, null);
        }
        return new Result(false, "업로드 실패", null);
    }

    /**
     * 프로필 사진 불러오기
     *
     * @return 만료시간 설정된 url
     */
    @GetMapping("/profile")
    @Operation(summary = "프로필 사진 불러오기", description = "사용자가 변경/업로드한 사진을 조회합니다.")
    public Result getProfileUrl() {
        log.debug("사용자 프로필 사진 불러오기 컨트롤러");
        Optional<String> uuid = SecurityUtil.getCurrentUserUuid();
        String photoUrl = userService.getPhotoUrl(uuid.get());
        String profileUrl = s3Service.getProfileUrl(photoUrl);
        log.debug(profileUrl);
        return new Result(true, profileUrl, null);
    }
}
