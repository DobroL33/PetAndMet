package com.ssafy.petandmet.api;

import com.ssafy.petandmet.dto.animal.Result;
import com.ssafy.petandmet.dto.walk.WalkTime;
import com.ssafy.petandmet.service.WalkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/walk")
@Slf4j
public class WalkApiController {
    private final WalkService walkService;

    /**
     * 산책 가능 시간 조회
     *
     * @param map 쿼리 스트링
     * @return 시간별 산책 가능 여부
     */
    @GetMapping("/time")
    public Result getWalkAbleTime(@RequestParam Map<String, String> map) {
        List<WalkTime> walkTimes = walkService.getWalkTimes(map);
        Map<String, Object> result = new HashMap<>();
        result.put("message", "산책 등록 가능 시간 조회 성공");
        result.put("status", 200);
        result.put("walkTimes", walkTimes);
        return new Result(true, result, "null");
    }

}
