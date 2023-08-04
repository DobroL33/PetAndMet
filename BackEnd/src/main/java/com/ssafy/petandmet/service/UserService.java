package com.ssafy.petandmet.service;

import com.ssafy.petandmet.config.TokenProvider;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.Donate;
import com.ssafy.petandmet.domain.RoleType;
import com.ssafy.petandmet.domain.User;
import com.ssafy.petandmet.dto.jwt.Token;
import com.ssafy.petandmet.dto.user.*;
import com.ssafy.petandmet.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
//@Transactional
public class UserService {
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final CenterRepository centerRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailAuthenticationRepository emailAuthenticationRepository;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final DonateRepository donateRepository;
    private final WalkRepository walkRepository;

    /**
     * 사용자 등록
     *
     * @param request 회원가입 request
     */
    @Transactional
    public void join(CreateUserRequest request) {
        log.debug("사용자 등록 서비스");

        //회원 존재 확인
        isDuplicateUser(request.getId());

        //user와 center 저장
        User user = createUser(request);
        Center center = null;
        if (request.getRoleType().equals(RoleType.CENTER.toString())) {
            center = createCenter(request, user);
            user.setCenter(center);
        }
        userRepository.save(user);
        if (center != null)
            centerRepository.save(center);
    }

    /**
     * User Entity 새성
     *
     * @param request 회원가입 request
     * @return User Entity
     */
    private User createUser(CreateUserRequest request) {
        String userUuid = UUID.randomUUID().toString();
        request.passwordEncoder(passwordEncoder); //비밀번호 암호화
        return User.builder()
                .uuid(userUuid)
                .id(request.getId())
                .password(request.getPassword())
                .email(request.getEmail())
                .phone(request.getPhone())
                .name(request.getName())
                .roleType(RoleType.valueOf(request.getRoleType()))
                .build();
    }

    /**
     * Center Entity 새성
     *
     * @param request 회원가입 request
     * @param user    User Entity
     * @return Center Entity
     */
    private Center createCenter(CreateUserRequest request, User user) {
        String centerUuid = UUID.randomUUID().toString();
        return Center.builder()
                .uuid(centerUuid)
                .user(user)
                .name(request.getCenterName())
                .address(request.getCenterAddress())
                .phone(request.getCenterPhone())
                .email(request.getCenterEmail())
                .build();
    }

    /**
     * 사용자 아이디 존재 확인
     *
     * @param userId 사용자 아이디
     * @throws IllegalStateException 이미 존재하는 회원
     */
    private void isDuplicateUser(String userId) {
        Optional<User> findUser = userRepository.findByUserId(userId);

        if (findUser.isPresent()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    /**
     * 사용자 로그인
     *
     * @param request 사용자 정보
     * @return access jwt 토큰
     */
    @Transactional
    public Token login(LoginUserRequest request) {
        try {
            // id, pw 기반으로 UsernamePasswordAuthenticationToken 객체 생성
            UsernamePasswordAuthenticationToken authenticationToken = request.toAuthentication();

            // security에 구현한 AuthService가 실행됨
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
//            log.debug("authenticate = " + authentication);
            Token token = tokenProvider.generateToken(authentication);

//            request.passwordEncoder(passwordEncoder);
//            User user = userRepository.findUser(request.getId(), request.getPassword());
//            log.debug(user.toString());

//            Token token = tokenProvider.generateToken(user);
            log.debug(token.toString());
            refreshTokenRepository.save(token);

            return token;
        } catch (NullPointerException e) {
            throw new NullPointerException("사용자가 없습니다.");
        }
    }

    /**
     * 사용자 로그아웃
     *
     * @param accessToken 사용자 access token
     */
    @Transactional
    public void logout(String accessToken) {
        Optional<Token> findToken = refreshTokenRepository.findById(accessToken);
        //토큰 불러오기 확인
        log.debug("findToken = " + findToken);

        if (findToken.isPresent()) {
            refreshTokenRepository.delete(findToken.get());
            log.debug("로그아웃 성공");
        } else {
            throw new NullPointerException("로그아웃에 오류가 생겼습니다.");
        }
    }

    /**
     * 아이디 중복 확인
     *
     * @param request 사용자 ID
     * @return 아이디 중복 여부
     */
    @Transactional
    public boolean isDuplicateId(IdCheckRequest request) {
        Optional<User> user = userRepository.findByUserId(request.getId());
        return user.isPresent();
    }

    /**
     * 이메일 인증 코드 전송
     *
     * @param request 사용자 이메일
     * @return 전송 여부
     */
    @Transactional
    public void sendEmailAuthCode(SendEmailAuthRequest request) {
        log.debug("이메일 인증 코드 전송 서비스");

        int code = generateRandomCode();
        EmailAuthentication emailAuthentication = EmailAuthentication
                .builder()
                .email(request.getEmail())
                .code(code)
                .build();
        emailAuthenticationRepository.save(emailAuthentication);
    }

    /**
     * 이메일 인증 코드 생성
     *
     * @return 임의 6자리 숫자
     */
    private static int generateRandomCode() {
        java.util.Random generator = new java.util.Random();
        generator.setSeed(System.currentTimeMillis());
        return generator.nextInt(1000000) % 1000000;
    }

    /**
     * 이메일 인증 코드 확인
     *
     * @param request 사용자 이메일, 코드
     * @return 코드 일치 여부
     */
    @Transactional
    public boolean checkEmailAuthCode(CheckEmailAuthRequest request) {
        log.debug("이메일 인증 코드 확인 서비스");
        Optional<EmailAuthentication> emailAuthentication = emailAuthenticationRepository.findById(request.getEmail());
        log.debug("emailAuthentication = " + emailAuthentication);
        if (emailAuthentication.isPresent() && request.getCode() == emailAuthentication.get().getCode()) {
            emailAuthenticationRepository.delete(emailAuthentication.get());
            log.debug("이메일 인증 성공");
            return true;
        }
        return false;
    }

    public UserInfoResponse getUserInfo(String uuid) {
        Optional<User> user = userRepository.findByUserUuid(uuid);
        return user.map(value -> UserInfoResponse.builder().message("개인정보 가져오기 성공").status("200").name(value.getName()).email(value.getEmail()).phone(value.getPhone()).build()).orElse(null);
    }

    /**
     * 회원 탈퇴
     *
     * @param uuid 사용자 uuid
     * @return 탈퇴 여부
     */
    @Transactional
    public boolean withdrawal(String uuid) {
        Optional<User> user = userRepository.findByUserUuid(uuid);
        if (user.isPresent()) {
            userRepository.delete(user.get());
            return true;
        }
        return false;
    }

    /**
     * 사용자 비밀번호 임의 초기화
     *
     * @param request 사용자 id, email
     */
    @Transactional
    public void passwordReset(PasswordResetRequest request) {
        Optional<User> user = userRepository.findByUserIdEmail(request.getId(), request.getEmail());
        if (user.isPresent()) {
            String tmpPassword = generateTmpPassword();
            log.debug("tmpPassword = " + tmpPassword);
            request.passwordEncoder(passwordEncoder, tmpPassword);
            user.get().setPassword(request.getPassword());
            userRepository.save(user.get());
        }
    }

    /**
     * 임의 비밀번호 생성
     *
     * @return 임의 문자열
     */
    private String generateTmpPassword() {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();
        return random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    /**
     * 사용자 개인 정보 수정
     *
     * @param uuid    사용자 uuid
     * @param request 사용자 name, phone
     */
    public void modifyInfo(String uuid, ModifyInfoRequest request) {
        log.debug("개인 정보 수정 서비스");
        Optional<User> user = userRepository.findByUserUuid(uuid);
        if (user.isPresent()) {
            user.get().setName(request.getName());
            user.get().setPhone(request.getPhone());
            userRepository.save(user.get());
        }
    }

    public Long findAnimalFriendliness(AnimalFriendlinessRequest request) {

        Long totalDoantePrice = donateRepository.findTotalPriceByUserIdAndAnimalId(request.getUserUuid(), request.getAnimalUuid());
        Long WalkCount = walkRepository.findCountByUserIdAndAnimalId(request.getUserUuid(), request.getAnimalUuid());

        Long friendliness = getAnimalFreindLiness(totalDoantePrice, WalkCount);

        return friendliness;
    }

    private Long getAnimalFreindLiness(Long totalDoantePrice, Long walkCount) {
        Long friendliness;

        if (totalDoantePrice >= 50000L) {
            friendliness = 50L; // 50%
        } else {
            friendliness = (long)(totalDoantePrice * 0.001); // 1% 씩 증가
        }
        friendliness += walkCount * 10;
        if (friendliness >= 100L) {
            friendliness = 100L;
        }
        return friendliness;
    }
}