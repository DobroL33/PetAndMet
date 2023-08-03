package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.CenterItem;
import com.ssafy.petandmet.domain.Donate;
import com.ssafy.petandmet.dto.animal.Result;
import com.ssafy.petandmet.dto.donate.*;
import com.ssafy.petandmet.service.DonateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
public class DonateApiController {

    private final DonateService donateService;

    @PostMapping("api/v1/donate/animal")
    public Result createDonate(@RequestBody CreateAnimalDonateRequest request) {
        if (donateService.addAnimalDonate(request)) {
            CreateDonateResponse response = new CreateDonateResponse("후원 성공", "200");
            return new Result("true", response, "null");
        };
        CreateDonateResponse response = new CreateDonateResponse("후원 실패", "500");
        return new Result("false", response, "null");
    }
    @PostMapping("api/v1/donate/center")
    public Result createCenterItemDonate(@RequestBody CreateCenterItemDonateRequest request) {
        if (donateService.addCenterItemDonate(request)) {
            CreateDonateResponse response = new CreateDonateResponse("후원 성공", "200");
            return new Result("true", response, "null");
        };
        CreateDonateResponse response = new CreateDonateResponse("후원 실패", "500");
        return new Result("false", response, "null");
    }

    @GetMapping("api/v1/donate")
    public Result getPossibleDonateItem(@RequestParam String uuid) {

        List<CenterItem> possibleCenterItem = donateService.findPossibleItem(uuid);

        if (!possibleCenterItem.isEmpty()) {
            List<PossibleItemResponse> response = possibleCenterItem.stream()
                    .map(o -> new PossibleItemResponse(o))
                    .collect(toList());

            return new Result("true", response, "null");
        }
        return new Result("false", "null", "null");
    }

    @GetMapping("api/v1/donate/user")
    public Result getRequestDonate(@RequestParam String uuid) {
        List<Donate> findDonate = donateService.findDonate(uuid);

        if (!findDonate.isEmpty()) {
            List<UserDonateResponse> response = findDonate.stream()
                    .map(o -> new UserDonateResponse(o))
                    .collect(toList());

            return new Result("true", response, "null");
        }
        return new Result("false", "null", "null");
    }

    @GetMapping("api/v1/donate/center")
    public Result getResponseDonate(@RequestParam String uuid) {
        List<Donate> findResponseDonate = donateService.findResponseDonate(uuid);

        if (!findResponseDonate.isEmpty()) {
            List<CenterDonateResponse> response = findResponseDonate.stream()
                    .map(o -> new CenterDonateResponse(o))
                    .collect(toList());

            return new Result("true", response, "null");
        }
        return new Result("false", "null", "null");
    }


}
