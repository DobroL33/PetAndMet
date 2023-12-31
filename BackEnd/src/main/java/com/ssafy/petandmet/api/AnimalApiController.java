package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.dto.animal.*;
import com.ssafy.petandmet.service.AnimalService;
import com.ssafy.petandmet.service.S3Service;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AnimalApiController {

    private final AnimalService animalService;

    private final S3Service s3Service;

    @GetMapping("api/v1/animal")
    @Operation(summary = "동물 전체조회", description = "모든 동물을 조회(페이징)합니다")
    public Result findAll(@PageableDefault(size = 10) Pageable pageable) {
        Page<Animal> findAnimal = animalService.findAll(pageable);

        if (!findAnimal.isEmpty()) {
            List<FindAllAnimalResponse> response = findAnimal.stream()
                    .map(o -> {
                        if (o.getPhotoUrl() != null && !o.getPhotoUrl().equals("")) {
                            String profileUrl = s3Service.getProfileUrl(o.getPhotoUrl());
                            o.setPhotoUrl(profileUrl);
                            return new FindAllAnimalResponse(o);
                        }
                        o.setPhotoUrl(null);
                        return new FindAllAnimalResponse(o);
                    })
                    .collect(toList());

            return new Result(true, response, "null");
        }
        return new Result(false, "null", "null");
    }

    @GetMapping("api/v1/animal/search")
    @Operation(summary = "동물 필터링조회", description = "동물을 필터링해서 조회(페이징)합니다")
    public Result GetAnimalBySearch(@RequestParam Map<String, String> map, @PageableDefault(size = 10) Pageable pageable) {
        log.debug(pageable.toString());
        Page<Animal> findAnimal = animalService.findAnimalBySearch(map, pageable);

        if (!findAnimal.isEmpty()) {
            List<FindAnimalBySearchResponse> response = findAnimal.stream()
                    .map(o -> {
                        if (o.getPhotoUrl() != null && !o.getPhotoUrl().equals("")) {
                            String profileUrl = s3Service.getProfileUrl(o.getPhotoUrl());
                            o.setPhotoUrl(profileUrl);
                            return new FindAnimalBySearchResponse(o);
                        }
                        o.setPhotoUrl(null);
                        return new FindAnimalBySearchResponse(o);
                    })
                    .collect(toList());

            Map<String, Object> result = new HashMap<>();
            result.put("animals", response);
            result.put("total", response.size());

            return new Result(true, result, "null");
        }

        return new Result(false, "null", "null");
    }

    @DeleteMapping("api/v1/animal/{id}")
    @Operation(summary = "동물 삭제", description = "동물을 삭제합니다")
    public Result deleteAnimal(@PathVariable("id") String id) {

        try {
            animalService.delete(id);

            AnimalResponse response = new AnimalResponse(200, "동물 정보 삭제 성공");
            return new Result(true, response, "null");

        } catch (Exception e) {
            AnimalResponse response = new AnimalResponse(500, "동물 정보 삭제 실패");
            return new Result(false, response, e.getMessage());
        }
    }

    @PostMapping("api/v1/animal")
    @Operation(summary = "동물 등록", description = "동물을 등록합니다")
    public Result createAnimal(@RequestPart CreateAnimalRequest request, @RequestPart(required = false) MultipartFile image) {
        try {
            animalService.join(image, request);

            AnimalResponse response = new AnimalResponse(200, "강아지 정보 등록 성공");
            return new Result(true, response, "null");

        } catch (Exception e) {
            AnimalResponse response = new AnimalResponse(500, "강아지 정보 등록 실패");
            return new Result(false, response, e.getMessage());
        }
    }


    @PatchMapping("/api/v1/animal")
    @Operation(summary = "동물 수정", description = "동물을 수정합니다")
    public Result updateAnimal(@RequestBody UpdateAnimalRequest request) {
        try {
            animalService.update(request);

            UpdateAnimalResponse response = new UpdateAnimalResponse(200, "강아지 정보 수정 성공");
            return new Result(true, response, "null");

        } catch (Exception e) {
            UpdateAnimalResponse response = new UpdateAnimalResponse(500, "강아지 정보 수정 실패");
            return new Result(false, response, e.getMessage());
        }
    }

    @GetMapping("/api/v1/animal/page-count")
    public Result getPageCount(@RequestParam("center_uuid") String uuid, @RequestParam Long size) {
        Long findPageCount = animalService.findPageCount(uuid, size);

        PageCountResponse response = new PageCountResponse(findPageCount);
        return new Result(true, response, "null");
    }

    @GetMapping("api/v1/animal/detail")
    @Operation(summary = "동물 상세조회", description = "1마리의 특정 동물만 조회합니다")
    public Result GetAnimal(@RequestParam String uuid) {
        try {
            FindAnimalByIdResponse response = animalService.findOne(uuid);

            return new Result(true, response, "null");
        } catch (Exception e) {
            return new Result(false, "null", e.getMessage());
        }
    }
}
