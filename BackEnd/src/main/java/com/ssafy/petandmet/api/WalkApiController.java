package com.ssafy.petandmet.api;

import com.github.dockerjava.zerodep.shaded.org.apache.hc.core5.http.HttpStatus;
import com.ssafy.petandmet.domain.StatusType;
import com.ssafy.petandmet.dto.walk.Result;
import com.ssafy.petandmet.dto.walk.SignWalkRequest;
import com.ssafy.petandmet.dto.walk.WalkAbleTime;
import com.ssafy.petandmet.dto.walk.WalkStatusRequest;
import com.ssafy.petandmet.dto.walk.WalkTime;
import com.ssafy.petandmet.service.UserService;
import com.ssafy.petandmet.service.WalkService;
import com.ssafy.petandmet.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/walk")
@Slf4j
public class WalkApiController {
    private final UserService userService;
    private final WalkService walkService;

    /**
     * 산책 가능 시간 조회
     *
     * @param map 쿼리 스트링
     * @return 시간별 산책 가능 여부
     */
    @GetMapping("/time")
    public Result getWalkAbleTime(@RequestParam Map<String, String> map) {
        List<WalkAbleTime> walkAbleTimes = walkService.getWalkTimes(map);
        Map<String, Object> result = new HashMap<>();
        result.put("message", "산책 등록 가능 시간 조회 성공");
        result.put("status", 200);
        result.put("walkTimes", walkAbleTimes);
        return new Result(true, result, "null");
    }


    /**
     * 산책 등록
     *
     * @param request 센터 uuid, 동물 uuid, 연월일, 시간
     * @return 산책 등록 결과
     */
    @PostMapping
    public Result signWalk(@RequestBody SignWalkRequest request) {
        log.debug(request.toString());
        Map<String, Object> result = new HashMap<>();
        try {
            walkService.signWalk(request);
            result.put("status", HttpStatus.SC_OK);
            result.put("message", "산책 등록 성공");
            return new Result(true, result, null);
        } catch (Exception e) {
            result.put("status", HttpStatus.SC_BAD_REQUEST);
            result.put("message", e.getMessage());
            return new Result(false, null, result);
        }
    }

    /**
     * USER가 신청한 산책 정보 불러오기
     *
     * @return 등록한 산책 정보
     */
    @GetMapping("/user")
    public Result getUserWalkTime() {
        Map<String, Object> result = new HashMap<>();
        Optional<String> userUuid = SecurityUtil.getCurrentUserUuid();
        if (userUuid.isEmpty()) {
            result.put("status", HttpStatus.SC_BAD_REQUEST);
            result.put("message", "사용자 정보가 존재하지 않습니다.");
            return new Result(false, null, result);
        }

        result.put("status", HttpStatus.SC_OK);
        result.put("message", "등록한 산책 불러오기 성공.");
        result.put("user_walk_times", walkService.getUserWalkTime(userUuid.get()));
        return new Result(true, result, null);
    }

    @DeleteMapping("/user")
    public Result deleteUserWalkTime(@Valid @RequestBody WalkTime request) {
        log.debug("request = " + request.toString());
        Map<String, Object> result = new HashMap<>();
        Optional<String> userUuid = SecurityUtil.getCurrentUserUuid();
        if (userUuid.isEmpty()) {
            result.put("status", HttpStatus.SC_BAD_REQUEST);
            result.put("message", "사용자 정보가 존재하지 않습니다.");
            return new Result(false, null, result);
        }
        try {
            result.put("status", HttpStatus.SC_OK);
            result.put("message", "산책 삭제 성공");
            walkService.deleteUserWalkTime(userUuid.get(), request);
            return new Result(true, result, null);
        } catch (Exception e) {
            result.put("status", HttpStatus.SC_BAD_REQUEST);
            result.put("message", e.getMessage());
            return new Result(false, null, result);
        }
    }

    @GetMapping("/center")
    @PreAuthorize("hasRole('CENTER')")
    public Result getRequestedWalkTIme(@PageableDefault(size = 10) Pageable pageable) {
        Optional<String> userUuid = SecurityUtil.getCurrentUserUuid();
        Map<String, Object> result = new HashMap<>();
        if (userUuid.isEmpty()) {
            result.put("status", HttpStatus.SC_BAD_REQUEST);
            result.put("message", "사용자 정보가 존재하지 않습니다.");
            return new Result(false, null, result);
        }
        Optional<String> centerUuid = userService.getCenterUuid(userUuid.get());
        log.debug(centerUuid.get());
        Page<WalkTime> walkTimes = walkService.getRequestedWalkTIme(centerUuid.get(), pageable);
        result.put("status", HttpStatus.SC_OK);
        result.put("message", "신청 받은 산책 가져오기 성공");
        result.put("walk_times", walkTimes.stream().toList());
        result.put("total", walkTimes.getTotalElements());
        return new Result(true, result, null);
    }

    @PostMapping("/status")
//    @PreAuthorize("hasRole('CENTER')")
    public Result changeWalkStatus(@RequestBody WalkStatusRequest request) {
        log.debug(request.toString());
        Optional<String> userUuid = SecurityUtil.getCurrentUserUuid();
        Map<String, Object> result = new HashMap<>();
        if (userUuid.isEmpty()) {
            result.put("status", HttpStatus.SC_BAD_REQUEST);
            result.put("message", "사용자 정보가 존재하지 않습니다.");
            return new Result(false, null, result);
        }
        if (!request.getStatusResult().equals(StatusType.APPROVAL.toString()) && !request.getStatusResult().equals(StatusType.REJECTION.toString())) {
            result.put("status", HttpStatus.SC_BAD_REQUEST);
            result.put("message", "요청이 잘못되었습니다.");
            return new Result(false, null, result);
        }
        walkService.changeWalkStatus(request.getWorkId(), request.getStatusResult());
        result.put("status", HttpStatus.SC_OK);
        result.put("message", "산책 상태 변경 성공.");
        return new Result(true, result, null);
    }
}
