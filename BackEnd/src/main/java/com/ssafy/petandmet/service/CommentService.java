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
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CenterRepository centerRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    public Long join(CreateCommentRequest request){

        Center center = centerRepository.findByUuid(request.getCenterUuid());
//        System.out.println(center.toString());
        Optional<User> user = userRepository.findByUserUuid(request.getUserUuid());
//        System.out.println(user.toString());
        Board board = boardRepository.findById(request.getBoardId());

        Comment comment = Comment.builder()
                .board(board)
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .user(user.get())
                .build();

        commentRepository.save(comment);
        return comment.getId();
    }

    @Transactional
    public Optional<String> delete(String id) {
        Optional<Comment> findComment = commentRepository.findById(id);
        if(findComment.isEmpty()) {
            return Optional.empty();
        }
        commentRepository.delete(findComment.get());
        return Optional.of(id);
    }

}
