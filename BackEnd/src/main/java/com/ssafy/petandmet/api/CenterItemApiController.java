package com.ssafy.petandmet.api;


import com.ssafy.petandmet.dto.centerItem.Result;
import com.ssafy.petandmet.dto.centerItem.CenterItemResponse;
import com.ssafy.petandmet.dto.centerItem.CreateCenterItemRequest;
import com.ssafy.petandmet.dto.centerItem.UpdateCenterItemRequest;
import com.ssafy.petandmet.service.CenterItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
public class CenterItemApiController {

    private final CenterItemService centerItemService;

    //필요물품 등록
    @PostMapping("api/v1/center/item")
    public Result createCenterItem(@RequestBody CreateCenterItemRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            centerItemService.addItem(request);
            response.put("status", 200);
            response.put("message", "필요물품 등록 성공");
            return new Result(true, response, "null");
        } catch (Exception e) {
            response.put("status", 500);
            response.put("message", "필요물품 등록 실패");
            return new Result(false, response, e.getMessage());
        }
    }

    //필요물품 삭제
    @DeleteMapping("api/v1/center/item/{id}")
    public Result removeCenterItem(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            centerItemService.removeItem(id);
            response.put("status", 200);
            response.put("message", "필요물품 삭제 성공");
            return new Result(true, response, "null");

        } catch (Exception e) {
            response.put("status", 500);
            response.put("message", "필요물품 삭제 실패");
            return new Result(false, response, "null");
        }
    }

    //필요물품 수정
    @PatchMapping("api/v1/center/item")
    public Result updateCenterItem(@RequestBody UpdateCenterItemRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            centerItemService.updateItem(request);
            response.put("status", 200);
            response.put("message", "필요물품 수정 성공");
            return new Result(true, response, "null");
        } catch (Exception e) {
            response.put("status", 500);
            response.put("message", "필요물품 수정 실패");
            return new Result(false, response,"null");
        }
    }

    //필요물품 전체조회
    @GetMapping("api/v1/center/item")
    public Result getCenterItem(@RequestParam String uuid) {
        Map<String, Object> response = new HashMap<>();
        try {
        List<CenterItemResponse> centerItem = centerItemService.findCenterItem(uuid);
            response.put("status", 200);
            response.put("message", "필요물품 전체조회 성공");
            response.put("total", centerItem.stream().count());
            response.put("centerItems",centerItem);
            return new Result(true, response, "null");
        } catch (Exception e){
            response.put("status", 500);
            response.put("message", "필요물품 전체조회 실패");
            return new Result(true, response, "null");
        }
    }

}
