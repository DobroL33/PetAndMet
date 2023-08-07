package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Board;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.User;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import static org.mockito.BDDMockito.then;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class BoardRepositoryTest {
    @Autowired
    BoardRepository boardRepository;

    @Test
    void 게시판을_등록한다() {
        //given
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

        Board board1 = Board.builder()
                .title("title1")
                .content("content1")
                .type("notice")
                .user(user)
                .center(center1)
                .build();

        //when
        boardRepository.save(board1);

        //then
        Optional<Board> result = boardRepository.findById(board1.getId());
        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(board1.getId());
    }

//    @Test
//    void 타입기준으로_모두_조회한다() {
//        //given
//        User user = User.builder()
//                .uuid("user")
//                .id("id")
//                .password("pwd")
//                .email("email")
//                .phone("010")
//                .name("name")
//                .build();
//
//        Center center1 = Center.builder()
//                .uuid("aa1")
//                .address("bb1")
//                .email("cc1")
//                .build();
//
//        Board board1 = Board.builder()
//                .title("title1")
//                .content("content1")
//                .type("notice")
//                .user(user)
//                .center(center1)
//                .build();
//
//        Board board2 = Board.builder()
//                .title("title1")
//                .content("content1")
//                .type("adopt")
//                .user(user)
//                .center(center1)
//                .build();
//
//        Board board3 = Board.builder()
//                .title("title1")
//                .content("content1")
//                .type("adopt")
//                .user(user)
//                .center(center1)
//                .build();
//        Pageable pageable = PageRequest.of(0,5);
//        boardRepository.findBoardByType(center1.getUuid(),"adopt",pageable);
//
//        //when
//        Page<Board> boards = boardRepository.findBoardByType(center1.getUuid(),"adopt",pageable);
//
//        //then
//        assertThat(boards).hasSize(1);
//
//    }

    @Test
    void 하나의_게시판을_조회한다(){
        //given
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

        Board board1 = Board.builder()
                .title("title1")
                .content("content1")
                .type("notice")
                .user(user)
                .center(center1)
                .build();

        boardRepository.save(board1);

        //when
        Optional<Board> selectBoard = boardRepository.findById(1L);

        //then
        assertThat(selectBoard).isPresent();
        assertThat(selectBoard.get().getId()).isEqualTo(1L);
    }

    @Test
    void 게시판을_수정한다(){
        //given
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

        Board board1 = Board.builder()
                .title("title1")
                .content("content1")
                .type("notice")
                .user(user)
                .center(center1)
                .build();

        Board board = boardRepository.save(board1);

        //when
        board.setTitle("title12");

        //then
        Optional<Board> selectBoard = boardRepository.findById(board1.getId());
        assertThat(selectBoard).isPresent();
        assertThat(selectBoard.get().getId()).isEqualTo(board.getId());
        assertThat(selectBoard.get().getTitle()).isEqualTo(board.getTitle());
    }

    @Test
    void 게시판을_삭제한다(){
        //given
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

        Board board1 = Board.builder()
                .title("title1")
                .content("content1")
                .type("notice")
                .user(user)
                .center(center1)
                .build();

        boardRepository.save(board1);

        //when
        boardRepository.deleteById(board1.getId());

        //then
        Optional<Board> getBoard = boardRepository.findById(board1.getId());
        assertThat(getBoard).isEmpty();
    }
}
