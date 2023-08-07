package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Board;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.User;
import com.ssafy.petandmet.dto.board.CreateBoardRequest;
import com.ssafy.petandmet.dto.board.FindBoardByIdResponse;
import com.ssafy.petandmet.dto.board.UpdateBoardRequest;
import com.ssafy.petandmet.repository.BoardRepository;
import com.ssafy.petandmet.repository.CenterRepository;
import com.ssafy.petandmet.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final CenterRepository centerRepository;
    private final UserRepository userRepository;
    //게시물 등록
    public boolean join(CreateBoardRequest request) {

        Center center = centerRepository.findById(request.getCenterUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });
        User user = userRepository.findByUserUuid(request.getUserUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });

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
        return true;
    }

    //게시물 삭제
    @Transactional
    public Long delete(Long id) {
        Board findBoard = boardRepository.findById(id).orElseThrow(() -> {
            throw new NullPointerException();
        });
        boardRepository.delete(findBoard);
        return id;
    }

    //게시글 1개 찾기(상세보기)
    public FindBoardByIdResponse findOne(Long id) {
        Board findBoard = boardRepository.findById(id).orElseThrow(() -> {
            throw new NullPointerException();
        });

        FindBoardByIdResponse response = FindBoardByIdResponse.builder()
                .message("게시판 조회 성공")
                .status("200")
                .title(findBoard.getTitle())
                .content(findBoard.getContent())
                .createdAt(findBoard.getCreatedAt())
                .photoUrl(findBoard.getPhotoUrl())
                .type(findBoard.getType())
                .updatedAt(findBoard.getUpdatedAt())
                .userUuid(findBoard.getUser().getUuid())
                .centerUuid(findBoard.getCenter().getUuid())
                .build();

        return response;
    }

    //게시글 정보 수정
    @Transactional
    public boolean update(UpdateBoardRequest request) {
        Long id = request.getId();
        Board findBoard = boardRepository.findById(id).orElseThrow(() -> {
            throw new NullPointerException();
        });

        findBoard.setTitle(request.getTitle());
        findBoard.setContent(request.getContent());
        findBoard.setPhotoUrl(request.getPhotoUrl());
        findBoard.setUpdatedAt(LocalDateTime.now());

        return true;
    }

    //페이지
    public Page<Board> findAllBoard(String uuid, String type, Pageable pageable) {
        return boardRepository.findBoardByType(uuid, type, pageable);
    }


}