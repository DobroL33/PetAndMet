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

import java.util.List;
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
        Page<Center> findCenter = centerService.findAll(pageable);
        if(!findCenter.isEmpty()){
            List<FindAllCenterResponse> response =findCenter.stream()
                    .map(o -> new FindAllCenterResponse(o))
                    .collect(toList());

            return new Result("true", response, "null");
        }

        return new Result("false", "null", "null");
    }

    //보호소 한개 찾기
    @GetMapping("/detail")
    public Result GetCenter(@RequestParam(value = "id") String id){
        FindCenterByIdResponse response = centerService.findOne(id);

        if(response != null){
            return new Result("true", response, "null");
        }

        return new Result("false", "null", "null");
    }

    //보호소 정보 수정
    @PatchMapping
    public Result updateCenter(@RequestBody UpdateCenterRequest request){
        if(centerService.update(request)){
            UpdateCenterResponse response = new UpdateCenterResponse("200", "보호소 정보 수정 성공");
            return  new Result("true", response,"null");
        }

        UpdateCenterResponse response = new UpdateCenterResponse("500", "보호소 정보 수정 실패");
        return  new Result("false", response,"null");
    }


}
