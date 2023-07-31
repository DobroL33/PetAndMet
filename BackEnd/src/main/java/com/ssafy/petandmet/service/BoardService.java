package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.domain.Board;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.User;
import com.ssafy.petandmet.dto.animal.CreateAnimalRequest;
import com.ssafy.petandmet.dto.animal.UpdateAnimalRequest;
import com.ssafy.petandmet.dto.board.CreateBoardRequest;
import com.ssafy.petandmet.dto.board.UpdateBoardRequest;
import com.ssafy.petandmet.repository.AnimalRepository;
import com.ssafy.petandmet.repository.BoardRepository;
import com.ssafy.petandmet.repository.CenterRepository;
import com.ssafy.petandmet.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final CenterRepository centerRepository;
    private final UserRepository userRepository;
    //게시물 등록
    public Long join(CreateBoardRequest request) {

        System.out.println(request.toString());
        Center center = centerRepository.findByUuid(request.getCenterUuid());
        System.out.println(center.toString());
        User user = userRepository.findByUuid(request.getUserUuid());
        System.out.println(user.toString());

        Board board = Board.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .photoUrl(request.getPhotoUrl())
                .type(request.getType())
                .updatedAt(null)
                .user(user)
                .center(center)
                .build();

        boardRepository.save(board);
        return board.getId();
    }

    //게시물 삭제
    @Transactional
    public Optional<String> delete(String uuid) {
        Optional<Board> findBoard = boardRepository.findById(uuid);
        if(findBoard.isEmpty()) {
            return Optional.empty();
        }
        boardRepository.delete(findBoard.get());
        return Optional.of(uuid);
    }

    //게시글 1개 찾기(상세보기)
    public Optional<Board> findOne(String uuid) {
        return boardRepository.findById(uuid);
    }

    //게시글 정보 수정
    @Transactional
    public void update(UpdateBoardRequest request) {
        String id = request.getId();
        Optional<Board> findBoard = boardRepository.findById(id);

        if(findBoard.isEmpty()) {
            return;
        }

        findBoard.get().setTitle(request.getTitle());
        findBoard.get().setContent(request.getContent());
        findBoard.get().setPhotoUrl(request.getPhotoUrl());
        findBoard.get().setUpdatedAt(LocalDateTime.now());
    }

    //페이지
    public Page<Board> findAll(String uuid, String type, Pageable pageable) {
        return boardRepository.findBoardByType(type, uuid, pageable);
    }


}