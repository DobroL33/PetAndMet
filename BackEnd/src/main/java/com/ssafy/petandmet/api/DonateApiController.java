package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.Donate;
import com.ssafy.petandmet.dto.donate.Result;
import com.ssafy.petandmet.dto.centerItem.CenterItemDonateTotalPriceRespoonse;
import com.ssafy.petandmet.dto.centerItem.CenterItemResponse;
import com.ssafy.petandmet.dto.donate.*;
import com.ssafy.petandmet.service.DonateService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
public class DonateApiController {

    private final DonateService donateService;

    //동물에게 후원 등록
    @PostMapping("api/v1/donate/animal")
    @Operation(summary = "동물에게 후원 등록", description = "사용자가 특정 동물에 후원합니다.")
    public Result createDonate(@RequestBody CreateAnimalDonateRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            donateService.addAnimalDonate(request);
            response.put("status", 200);
            response.put("message", "동물에게 후원 등록 성공");
            return new Result(true, response, "null");
        } catch (Exception e) {
            response.put("status", 500);
            response.put("message", "동물에게 후원 등록 실패");
            return new Result(false, response, "null");
        }
    }

    //보호소에게 후원 등록
    @PostMapping("api/v1/donate/center")
    @Operation(summary = "보호소에게 후원 등록", description = "사용자가 특정 보호소에 후원합니다.")
    public Result createCenterItemDonate(@RequestBody CreateCenterItemDonateRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            donateService.addCenterItemDonate(request);
            response.put("status", 200);
            response.put("message", "보호소에게 후원 등록 성공");
            return new Result(true, response, "null");
        } catch (Exception e) {
            response.put("status", 500);
            response.put("message", "보호소에게 게시판 정보 등록 실패");
            return new Result(false, response, "null");
        }
    }

    //후원가능한 필요물품 전체목록 가져오기
    @GetMapping("api/v1/donate/item")
    @Operation(summary = "보호소별 후원 가능한 필요물품 조회", description = "보호소별 사용자가 후원 가능한 물품 목록을 조회합니다.")
    public Result getPossibleDonateItem(@RequestParam String uuid) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<CenterItemResponse> possibleCenterItem = donateService.findPossibleItem(uuid);
            response.put("status", 200);
            response.put("message", "후원가능한 필요물품 전체조회 성공");
            response.put("total", possibleCenterItem.stream().count());
            response.put("centerItems",possibleCenterItem);
            return new Result(true, response, "null");
        } catch (Exception e){
            response.put("status", 500);
            response.put("message", "후원가능한 필요물품 전체조회 실패");
            return new Result(true, response, "null");
        }
    }

    //사용자별 후원 가져오기
    @GetMapping("api/v1/donate/user")
    @Operation(summary = "사용자별 후원한 기록 조회", description = "사용자가 후원했던 내역을 조회합니다.")
    public Result getRequestDonate(@RequestParam String uuid) {
        List<Donate> findDonate = donateService.findDonate(uuid);

        if (!findDonate.isEmpty()) {
            List<UserDonateResponse> response = findDonate.stream()
                    .map(o -> new UserDonateResponse(o))
                    .collect(toList());

            return new Result(true, response, "null");
        }
        return new Result(false, "null", "null");
    }

    //보호소별 후원 가져오기
    @GetMapping("api/v1/donate/center")
    @Operation(summary = "보호소별 후원받은 기록 조회", description = "보호소가 후원받은 내역을 조회합니다.")
    public Result getResponseDonate(@RequestParam String uuid) {
        Map<String, Object> response = new HashMap<>();
        try{
            List<Donate> findResponseDonate = donateService.findResponseDonate(uuid);
            List<CenterDonateResponse> donate = findResponseDonate.stream()
                    .map(o -> new CenterDonateResponse(o))
                    .collect(toList());

            response.put("status", 200);
            response.put("message", "보호소별 후원 전체조회 성공");
            response.put("total", donate.stream().count());
            response.put("boards",donate);

            return new Result(true, response, "null");
        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "보호소 전체조회 실패");
            return new Result(true, response, "null");
        }
    }

    //보호소에 물품별 Total 후원 받은 돈
    @GetMapping("api/v1/donate/centeritem")
    @Operation(summary = "필요물품별 후원 받은 돈 조회", description = "보호소 물품별로 후원 받은 총 금액을 조회합니다.")
    public Result getCenterItemDonateTotalPrice(@RequestParam String uuid, @RequestParam Long id) {
        Map<String, Object> response = new HashMap<>();
        try{
            Long totalPrice = donateService.findCenterItemDonateTotalPrice(uuid, id);
            response.put("status", 200);
            response.put("message", "보호소에 물품별 Total 후원 받은 돈 조회 성공");
            response.put("price", totalPrice);
            return new Result(true, response, "null");
        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "보호소에 물품별 Total 후원 받은 돈 조회 실패");
            return new Result(true, response, "null");
        }
    }


}
