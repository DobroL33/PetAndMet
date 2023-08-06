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
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
public class LiveApiController {

    private final LiveService liveService;

    @PostMapping("api/v1/live")
    public Result createLive(@RequestBody CreateLiveRequest request) {

        if (liveService.createLive(request)) {
            CreateLiveResponse response = new CreateLiveResponse("라이브 등록 성공", "200");
            return new Result("true", response, "null");
        }
        return new Result("false", "null", "null");
    }

    @DeleteMapping("api/v1/live")
    public Result deleteLive(@RequestParam Long id) {

        if (liveService.deleteLive(id)) {
            DeleteLiveResponse response = new DeleteLiveResponse("라이브 삭제 성공", "200");
            return new Result("true", response, "null");
        }
        return new Result("false", "null", "null");
    }

    @PatchMapping("api/v1/live")
    public Result updateLive(@RequestBody UpdateLiveRequest request) {

        if (liveService.updateLive(request)) {
            DeleteLiveResponse response = new DeleteLiveResponse("라이브 수정 성공", "200");
            return new Result("true", response, "null");
        }
        return new Result("false", "null", "null");
    }

    @GetMapping("api/v1/live")
    public Result getLiveList(@PageableDefault(size = 10) Pageable pageable) {
        Page<Live> liveList = liveService.findLiveList(pageable);

        if (!liveList.isEmpty()) {
            List<LiveResponseDto> response = liveList.stream()
                    .map(o -> new LiveResponseDto(o))
                    .collect(toList());

            return new Result("true", response, "null");
        }
        return new Result("false", "null", "null");
    }

    @GetMapping("api/v1/live/search")
    public Result getLiveListByCenterUuid(@RequestParam String uuid) {
        List<Live> liveList = liveService.findLiveListByCenter(uuid);

        if (!liveList.isEmpty()) {
            List<LiveListResponse> response = liveList.stream()
                    .map(o -> new LiveListResponse(o))
                    .collect(toList());

            return new Result("true", response, "null");
        }
        return new Result("false", "null", "null");
    }

    @GetMapping("api/v1/live/detail")
    public Result getLiveDetail(@RequestParam Long id) {
        Live live = liveService.findLiveDetail(id);

        if (live != null) {
            LiveDetailResponse response = new LiveDetailResponse(live);
            return new Result("true", response, "null");
        }
        return new Result("false", "null", "null");
    }

}
