package com.ssafy.petandmet.dto.user;

import com.ssafy.petandmet.dto.animal.InterestAnimal;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class InterestAnimalResponse {

    private String message;
    private int status;
    private List<InterestAnimal> animals;
}
