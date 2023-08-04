package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Board;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.Comment;
import com.ssafy.petandmet.domain.User;
import com.ssafy.petandmet.dto.comment.CreateCommentRequest;
import com.ssafy.petandmet.repository.BoardRepository;
import com.ssafy.petandmet.repository.CenterRepository;
import com.ssafy.petandmet.repository.CommentRepository;
import com.ssafy.petandmet.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CenterRepository centerRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    public boolean join(CreateCommentRequest request){

        Center center = centerRepository.findById(request.getCenterUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });
//        System.out.println(center.toString());
        User user = userRepository.findByUserUuid(request.getUserUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });
//        System.out.println(user.toString());
        Board board = boardRepository.findById(request.getBoardId()).orElseThrow(() -> {
            throw new NullPointerException();
        });

        Comment comment = Comment.builder()
                .board(board)
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        commentRepository.save(comment);
        return true;
    }

    @Transactional
    public Long delete(Long id) {
        Comment findComment = commentRepository.findById(id).orElseThrow(() -> {
            throw new NullPointerException();
        });
        commentRepository.delete(findComment);
        return id;
    }

    public List<Comment> findByBoardId(Long board){
//        Board findBoard = boardRepository.findById(board);
//        Long boardId = findBoard.getId();
        return commentRepository.findByBoardId(board);
    }

}
