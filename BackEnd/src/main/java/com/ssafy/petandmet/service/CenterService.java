package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.dto.center.FindCenterByIdResponse;
import com.ssafy.petandmet.dto.center.UpdateCenterRequest;
import com.ssafy.petandmet.repository.CenterRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CenterService {
    private final CenterRepository centerRepository;


    //보호소 전제 조회
    public Page<Center> findAll(Pageable pageable) {
        return centerRepository.findAll(pageable);
    }

    //보호소 1개 찾기
    public FindCenterByIdResponse findOne(String uuid) {
        Center findCenter = centerRepository.findById(uuid).orElseThrow(() -> {
            throw new NullPointerException();
        });
        FindCenterByIdResponse response = FindCenterByIdResponse.builder()
                .message("보호소 조회 성공")
                .status("200")
                .uuid(findCenter.getUuid())
                .name(findCenter.getName())
                .address(findCenter.getAddress())
                .phone(findCenter.getPhone())
                .email(findCenter.getEmail())
                .build();

        return response;
    }

    //보호소 정보 수정
    public boolean update(UpdateCenterRequest request) {
        String uuid = request.getUuid();
        Center findCenter = centerRepository.findById(uuid).orElseThrow(() -> {
            throw new NullPointerException();
        });

        findCenter.setName(request.getName());
        findCenter.setAddress(request.getAddress());
        findCenter.setPhone(request.getPhone());
        findCenter.setEmail(request.getEmail());
//        System.out.println("서비스에서 uuid"+findCenter.get().getUuid() );
//        System.out.println("서비스에서 address"+findCenter.get().getAddress() );
//        System.out.println("서비스에서 phone"+findCenter.get().getPhone() );
//        System.out.println("서비스에서 name"+findCenter.get().getName() );
        return true;
    }
}
