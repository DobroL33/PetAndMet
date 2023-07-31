package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.dto.animal.*;
import com.ssafy.petandmet.service.AnimalService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
public class AnimalApiController {

    private final AnimalService animalService;

    @GetMapping("api/v1/animal/page")
    public Result findAll(@PageableDefault(size = 10) Pageable pageable) {
        Page<Animal> findAnimal = animalService.findAll(pageable);

        List<FindAllAnimalResponse> response = findAnimal.stream()
                .map(o -> new FindAllAnimalResponse(o))
                .collect(toList());

        return new Result("성공", response, "null");
    }

    @GetMapping("api/v1/animal/search")
    public Result GetAnimalBySearch(@RequestParam Map<String, String> map) {

        List<Animal> findAnimal = animalService.findAnimalBySearch(map);

        List<FindAnimalBySearchResponse> collect = findAnimal.stream()
                .map(o -> new FindAnimalBySearchResponse(o))
                .collect(toList());

        return new Result("성공", collect, "null");
    }

    @GetMapping("api/v1/animal")
    public Result GetAnimal(@RequestParam(value = "id") String id) {
        Optional<Animal> findAnimal = animalService.findOne(id);

        FindAnimalByIdResponse response = FindAnimalByIdResponse.builder()
                .message("강아지 조회 성공")
                .status("200")
                .name(findAnimal.get().getName())
                .age(findAnimal.get().getAge())
                .specie(findAnimal.get().getSpecie())
                .breed(findAnimal.get().getBreed())
                .findPlace(findAnimal.get().getFindPlace())
                .enteredDate(findAnimal.get().getEnterDate())
//                .centerUuid(findAnimal.get().getCenter().getUuid())
                .build();

        return new Result("성공", response, "null");
    }

    @DeleteMapping("api/v1/animal/{id}")
    public Result deleteAnimal(@PathVariable("id") String id) {
        Optional<String> deleteId = animalService.delete(id);

        AnimalResponse response = new AnimalResponse("200", "동물 정보 삭제 성공");

        return new Result("성공", response, "null");
    }

    @PostMapping("api/v1/animal")
    public Result createAnimal(@RequestBody CreateAnimalRequest request) {
        String id = animalService.join(request);

        AnimalResponse response = new AnimalResponse("200", "강아지 정보 수정 성공");

        return new Result("성공", response, "null");
    }

    @PatchMapping("/api/v1/animal")
    public Result updateAnimal(@RequestBody UpdateAnimalRequest request) {
        animalService.update(request);
        animalService.findOne(request.getUuid());
        UpdateAnimalResponse response = new UpdateAnimalResponse("200", "강아지 정보 수정 성공");

        return new Result("성공", response, "null");
    }
}