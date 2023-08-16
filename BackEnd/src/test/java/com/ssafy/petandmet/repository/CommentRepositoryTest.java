package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Board;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.Comment;
import com.ssafy.petandmet.domain.User;
import com.ssafy.petandmet.dto.comment.CreateCommentRequest;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class CommentRepositoryTest {
    @Autowired
    CommentRepository commentRepository;

    @Test
    void 댓글을_등록한다(){
        ///given
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
                .board(board)
                .content("content1")
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        //when
        commentRepository.save(comment1);

        //then
        Optional<Comment> result = commentRepository.findById(comment1.getId());
        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(comment1.getId());
    }
    @Test
    void 댓글을_삭제한다(){
        ///given
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
                .board(board)
                .content("content1")
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        commentRepository.save(comment1);

        //when
        commentRepository.deleteById(comment1.getId());
        //then
        Optional<Comment> getComment = commentRepository.findById(comment1.getId());
        assertThat(getComment).isEmpty();
    }
}
