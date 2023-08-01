package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.dto.center.FindCenterByIdResponse;
import com.ssafy.petandmet.dto.center.Result;
import com.ssafy.petandmet.dto.center.UpdateCenterRequest;
import com.ssafy.petandmet.dto.center.UpdateCenterResponse;
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

        List<Center> collect = findCenter.stream().collect(toList());

        return new Result("성공", collect, "null");
    }

    //보호소 한개 찾기
    @GetMapping("/detail")
    public Result GetCenter(@RequestParam(value = "uuid") String id){
        Optional<Center> findCenter = centerService.findOne(id);

        FindCenterByIdResponse response = FindCenterByIdResponse.builder()
                .message("보호소 조회 성공")
                .status("200")
                .uuid(findCenter.get().getUuid())
                .name(findCenter.get().getName())
                .address(findCenter.get().getAddress())
                .phone(findCenter.get().getPhone())
                .email(findCenter.get().getEmail())
                .build();

        return new Result("성공", response, "null");
    }

    //보호소 정보 수정
    @PatchMapping
    public Result updateCenter(@RequestBody UpdateCenterRequest request){
        System.out.println(request.toString());
        centerService.update(request);
//        centerService.findOne(request.getUuid());
        UpdateCenterResponse response = new UpdateCenterResponse("200", "보호소 정보 수정 성공");

        return  new Result("성공", response,"null");
    }


}
