package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.CenterItem;
import com.ssafy.petandmet.dto.animal.Result;
import com.ssafy.petandmet.dto.centerItem.CenterItemResponse;
import com.ssafy.petandmet.dto.centerItem.CreateCenterItemRequest;
import com.ssafy.petandmet.dto.centerItem.CreateCenterItemResponse;
import com.ssafy.petandmet.dto.centerItem.UpdateCenterItemRequest;
import com.ssafy.petandmet.service.CenterItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
public class CenterItemApiController {

    private final CenterItemService centerItemService;

    @PostMapping("api/v1/center/item")
    public Result createCenterItem(@RequestBody CreateCenterItemRequest request) {

        if (centerItemService.addItem(request)) {
            CreateCenterItemResponse response = new CreateCenterItemResponse("품목 등록 성공", "200");
            return new Result(true, response, "null");
        }
        CreateCenterItemResponse response = new CreateCenterItemResponse("품목 등록 실패", "500");
        return new Result(false, response, "null");
    }

    @DeleteMapping("api/v1/center/item/{id}")
    public Result removeCenterItem(@PathVariable Long id) {
        if (centerItemService.removeItem(id)) {
            CreateCenterItemResponse response = new CreateCenterItemResponse("품목 삭제 성공", "200");
            return new Result(true, response, "null");
        }
        CreateCenterItemResponse response = new CreateCenterItemResponse("품목 삭제 실패", "200");
        return new Result(false, response, "null");
    }

    @PatchMapping("api/v1/center/item")
    public Result updateCenterItem(@RequestBody UpdateCenterItemRequest request) {

        if (centerItemService.updateItem(request)) {
            CreateCenterItemResponse response = new CreateCenterItemResponse("품목 정보 수정 성공", "200");
            return new Result(true, response, "null");
        }
        CreateCenterItemResponse response = new CreateCenterItemResponse("품목 정보 수정 실패", "500");
        return new Result(false, response, "null");
    }

    @GetMapping("api/v1/center/item")
    public Result getCenterItem(@RequestParam String uuid) {

        List<CenterItem> centerItem = centerItemService.findCenterItem(uuid);

        if (!centerItem.isEmpty()) {
            List<CenterItemResponse> response = centerItem.stream()
                    .map(o -> new CenterItemResponse(o))
                    .collect(toList());

            return new Result(true, response, "null");
        }
        return new Result(false, "null", "null");
    }

}
