package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.domain.Center;
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
    public Optional<Center> findOne(String uuid) {
        return centerRepository.findById(uuid);
    }

    //보호소 정보 수정
    public void update(UpdateCenterRequest request) {
        String uuid = request.getUuid();
        Optional<Center> findCenter = centerRepository.findById(uuid);
        System.out.println("서비스에서 "+ request.toString());
        if(findCenter.isEmpty()) {
            return;
        }

        findCenter.get().setName(request.getName());
        findCenter.get().setAddress(request.getAddress());
        findCenter.get().setPhone(request.getPhone());
        findCenter.get().setEmail(request.getEmail());
//        System.out.println("서비스에서 uuid"+findCenter.get().getUuid() );
//        System.out.println("서비스에서 address"+findCenter.get().getAddress() );
//        System.out.println("서비스에서 phone"+findCenter.get().getPhone() );
//        System.out.println("서비스에서 name"+findCenter.get().getName() );
    }
}
