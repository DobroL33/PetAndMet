package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.dto.center.FindCenterByIdResponse;
import com.ssafy.petandmet.dto.center.Result;
import com.ssafy.petandmet.dto.center.UpdateCenterRequest;
import com.ssafy.petandmet.dto.center.UpdateCenterResponse;
import com.ssafy.petandmet.dto.center.FindAllCenterResponse;
import com.ssafy.petandmet.service.CenterService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static java.util.stream.Collectors.toList;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/center")
public class CenterApiController {

    private final CenterService centerService;

    //보호소 전제 조회
    @GetMapping
    public Result findAll(@PageableDefault(size = 10) Pageable pageable) {
        Map<String, Object> response = new HashMap<>();
        try{
            Page<Center> findCenter = centerService.findAll(pageable);
            List<FindAllCenterResponse> center =findCenter.stream()
                    .map(o -> new FindAllCenterResponse(o))
                    .collect(toList());

            response.put("status", 200);
            response.put("message", "보호소 전체조회 성공");
            response.put("total", center.stream().count());
            response.put("boards",center);
            return new Result(true,response,"null");
        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "보호소 전체조회 실패");
            return new Result(false, response, "null");

        }

    }

    //보호소 한개 찾기
    @GetMapping("/detail")
    public Result GetCenter(@RequestParam(value = "id") String id){
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("status", 200);
            response.put("message", "보호소 상세조회 성공");
            response.put("board", centerService.findOne(id));
            return new Result(true, response, "null");

        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "보호소 상세조회 실패");
            return new Result(false, response, "null");
        }


    }

    //보호소 정보 수정
    @PatchMapping
    public Result updateCenter(@RequestBody UpdateCenterRequest request){
        Map<String, Object> response = new HashMap<>();
        try {
            centerService.update(request);
            response.put("status", 200);
            response.put("message", "보호소 수정 성공");
            return  new Result(true, response,"null");
        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "보호소 수정 실패");
            return  new Result(false, response,"null");
        }

    }


}
