package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Board;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.Comment;
import com.ssafy.petandmet.domain.User;
import com.ssafy.petandmet.dto.comment.CommentResponse;
import com.ssafy.petandmet.dto.comment.CreateCommentRequest;
import com.ssafy.petandmet.repository.BoardRepository;
import com.ssafy.petandmet.repository.CenterRepository;
import com.ssafy.petandmet.repository.CommentRepository;
import com.ssafy.petandmet.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
@Transactional
public class CommentServiceTest {
    @Mock
    CommentRepository commentRepository;
    @Mock
    CenterRepository centerRepository;
    @Mock
    BoardRepository boardRepository;
    @Mock
    UserRepository userRepository;
    @InjectMocks
    private CommentService commentService;

    @Test
    void 댓글을_등록할수있다(){
        User user = User.builder()
                .uuid("user")
                .id("id")
                .password("pwd")
                .email("email")
                .phone("010")
                .name("name")
                .build();

        Center center1 = Center.builder()
                .uuid("aa1")
                .address("bb1")
                .email("cc1")
                .build();

        Board board = Board.builder()
                .title("title1")
                .content("content1")
                .type("adopt")
                .user(user)
                .center(center1)
                .build();

        CreateCommentRequest request = CreateCommentRequest.builder()
                .id("1")
                .userUuid(user.getUuid())
                .centerUuid(center1.getUuid())
                .boardId(1L)
                .content("content")
                .createdAt(LocalDateTime.now())
                .build();

        given(centerRepository.findById(any(String.class))).willReturn(Optional.ofNullable(center1));
        given(userRepository.findByUserUuid(any(String.class))).willReturn(Optional.of(user));
        given(boardRepository.findById(any(Long.class))).willReturn(Optional.of(board));

        //when
        boolean join = commentService.join(request);

        //then
        then(centerRepository).should().findById(request.getCenterUuid());
        then(userRepository).should().findByUserUuid(request.getUserUuid());
        then(boardRepository).should().findById(request.getBoardId());
        then(commentRepository).should().save(any(Comment.class));

        assertThat(join).isEqualTo(true);
    }

    @Test
    void 댓글을_삭제할수있다(){
        User user = User.builder()
                .uuid("user")
                .id("id")
                .password("pwd")
                .email("email")
                .phone("010")
                .name("name")
                .build();

        Center center1 = Center.builder()
                .uuid("aa1")
                .address("bb1")
                .email("cc1")
                .build();

        Board board = Board.builder()
                .title("title1")
                .content("content1")
                .type("adopt")
                .user(user)
                .center(center1)
                .build();
        Comment comment1 = Comment.builder()
                .id(1L)
                .board(board)
                .content("content1")
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();
        given(commentRepository.findById(1L)).willReturn(Optional.ofNullable(comment1));

        //when
        Long deleteId = commentService.delete(1L);

        //then
        then(commentRepository).should().findById(1L);
        then(commentRepository).should().delete(comment1);

        assertThat(deleteId).isEqualTo(1L);

    }

}
