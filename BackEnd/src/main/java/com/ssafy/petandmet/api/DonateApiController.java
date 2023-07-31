package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.CenterItem;
import com.ssafy.petandmet.domain.Donate;
import com.ssafy.petandmet.dto.animal.Result;
import com.ssafy.petandmet.dto.donate.CenterDonateResponse;
import com.ssafy.petandmet.dto.donate.CreateDonateRequest;
import com.ssafy.petandmet.dto.donate.CreateDonateResponse;
import com.ssafy.petandmet.dto.donate.PossibleItemResponse;
import com.ssafy.petandmet.dto.donate.UserDonateResponse;
import com.ssafy.petandmet.service.DonateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
public class DonateApiController {

    private final DonateService donateService;

    @PostMapping("api/v1/donate")
    public Result createDonate(@RequestBody CreateDonateRequest request) {

        donateService.add(request);

        CreateDonateResponse response = new CreateDonateResponse("후원 성공", "200");

        return new Result("true", response, "null");
    }

    @GetMapping("api/v1/donate")
    public Result getDonate(@RequestParam String uuid) {

        List<CenterItem> possibleCenterItem = donateService.findPossibleItem(uuid);

        List<PossibleItemResponse> response = possibleCenterItem.stream()
                .map(o -> new PossibleItemResponse(o))
                .collect(toList());

        return new Result("true", response, "null");
    }

    @GetMapping("api/v1/donate/user")
    public Result getRequestDonate(@RequestParam String uuid) {

        List<Donate> findDonate = donateService.findDonate(uuid);

        System.out.println("findDonate.size() = " + findDonate.size());
        List<UserDonateResponse> response = findDonate.stream()
                .map(o -> new UserDonateResponse(o))
                .collect(toList());

        return new Result("true", response, "null");
    }

    @GetMapping("api/v1/donate/center")
    public Result getResponseDonate(@RequestParam String uuid) {
        List<Donate> findResponseDonate = donateService.findResponseDonate(uuid);

        List<CenterDonateResponse> response = findResponseDonate.stream()
                .map(o -> new CenterDonateResponse(o))
                .collect(toList());

        return new Result("true", response, "null");
    }


}
