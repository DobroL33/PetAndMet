package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.Live;
import com.ssafy.petandmet.dto.animal.AnimalResponse;
import com.ssafy.petandmet.dto.animal.Result;
import com.ssafy.petandmet.dto.live.*;
import com.ssafy.petandmet.service.LiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
public class LiveApiController {

    private final LiveService liveService;

    @PreAuthorize("hasAnyRole('USER', 'CENTER')")
    @PostMapping("api/v1/live")
    public Result createLive(@RequestBody CreateLiveRequest request) {
        try {
            liveService.createLive(request);

            CreateLiveResponse response = new CreateLiveResponse("라이브 등록 성공", "200");
            return new Result(true, response, "null");
        } catch (Exception e) {
            return new Result(false, "null", e.getMessage());
        }
    }

    @DeleteMapping("api/v1/live")
    public Result deleteLive(@RequestParam Long id) {
        try {
            liveService.deleteLive(id);

            DeleteLiveResponse response = new DeleteLiveResponse("라이브 삭제 성공", "200");
            return new Result(true, response, "null");
        } catch (Exception e) {
            return new Result(false, "null", e.getMessage());
        }
    }

    @PatchMapping("api/v1/live")
    public Result updateLive(@RequestBody UpdateLiveRequest request) {
        try {
            liveService.updateLive(request);

            DeleteLiveResponse response = new DeleteLiveResponse("라이브 수정 성공", "200");
            return new Result(true, response, "null");
        } catch (Exception e) {
            return new Result(false, "null", e.getMessage());
        }
    }

    @GetMapping("api/v1/live")
    public Result getLiveList(@PageableDefault(size = 10) Pageable pageable) {
        Page<Live> liveList = liveService.findLiveList(pageable);

        if (!liveList.isEmpty()) {
            List<LiveResponseDto> toDto = liveList.stream()
                    .map(o -> new LiveResponseDto(o))
                    .collect(toList());

            LiveResponse response = new LiveResponse("라이브 전체 목록 조회 성공", 200, toDto.size(), toDto);

            return new Result(true, response, "null");
        }
        return new Result(false, "null", "null");
    }

    @GetMapping("api/v1/live/search")
    public Result getLiveListByCenterUuid(@RequestParam String uuid) {
        List<Live> liveList = liveService.findLiveListByCenter(uuid);

        if (!liveList.isEmpty()) {
            List<LiveListResponse> toDto = liveList.stream()
                    .map(o -> new LiveListResponse(o))
                    .collect(toList());

            LiveResponse response = new LiveResponse("라이브 필터링 목록 조회 성공", 200, toDto.size(), toDto);

            return new Result(true, response, "null");
        }
        return new Result(false, "null", "null");
    }

    @GetMapping("api/v1/live/detail")
    public Result getLiveDetail(@RequestParam Long id) {
        Live live = liveService.findLiveDetail(id);

        if (live != null) {
            LiveDetailResponse response = new LiveDetailResponse(live);
            return new Result(true, response, "null");

        }
        return new Result(false, "null", "null");
    }

}
