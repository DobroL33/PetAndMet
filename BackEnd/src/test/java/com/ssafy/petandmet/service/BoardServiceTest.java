package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Board;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.RoleType;
import com.ssafy.petandmet.domain.User;
import com.ssafy.petandmet.dto.board.CreateBoardRequest;
import com.ssafy.petandmet.dto.board.FindBoardByIdResponse;
import com.ssafy.petandmet.dto.board.UpdateBoardRequest;
import com.ssafy.petandmet.dto.center.UpdateCenterRequest;
import com.ssafy.petandmet.repository.AnimalRepository;
import com.ssafy.petandmet.repository.BoardRepository;
import com.ssafy.petandmet.repository.CenterRepository;
import com.ssafy.petandmet.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
@Transactional
public class BoardServiceTest {

    @Mock
    BoardRepository boardRepository;
    @Mock
    CenterRepository centerRepository;
    @Mock
    UserRepository userRepository;
    @InjectMocks
    private BoardService boardService;

    @Test
    void 게시판을_등록할수있다() {
        //given2
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

        CreateBoardRequest request = CreateBoardRequest.builder()
                .id("1")
                .title("title1")
                .content("content1")
                .type("adopt")
                .userUuid("user")
                .centerUuid("aa1")
                .createdAt(LocalDateTime.now())
                .build();

        given(centerRepository.findById(any(String.class))).willReturn(Optional.of(center1));
        given(userRepository.findByUserUuid(any(String.class))).willReturn(Optional.of(user));
        //when
        boolean join = boardService.join(request);

        //then
        then(centerRepository).should().findById(request.getCenterUuid());
        then(userRepository).should().findByUserUuid(request.getUserUuid());
        then(boardRepository).should().save(any(Board.class));

        assertThat(join).isEqualTo(true);
    }

//    @Test
//    void 게시판를_전체조회_할수있다(){
//
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
//        Board board2 = Board.builder()
//                .title("title2")
//                .content("content2")
//                .type("adopt")
//                .user(user)
//                .center(center1)
//                .build();
//        Board board3 = Board.builder()
//                .title("title2")
//                .content("content2")
//                .type("adopt")
//                .user(user)
//                .center(center1)
//                .build();
//        Pageable pageable = PageRequest.of(0,5);
//
//        //when
//        Page<FindAllBoardResponse> findBoards = boardService.findAllBoard(board2.getCenter().getUuid(),board2.getType(),pageable);
//
//        //then
//        then(boardRepository).should().findBoardByType(board2.getCenter().getUuid(),board2.getType(),pageable);
//
////        assertThat(findBoards).hasSize(2);
//        List<FindAllBoardResponse> findBoardsContent = findBoards.getContent();
//        assertThat(findBoardsContent.get(0).getTitle()).isEqualTo("title2");
//        assertThat(findBoardsContent.get(0).getContent()).isEqualTo("content2");
//        assertThat(findBoardsContent.get(0).getType()).isEqualTo("adopt");
//        System.out.println("게시판 전체조회를 성공했습니다.");
//    }

    @Test
    void 게시판_상세조회를_할수있다(){
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

        FindBoardByIdResponse board2 = FindBoardByIdResponse.builder()
                .message("게시판 조회 성공")
                .status("200")
                .userUuid(user.getUuid())
                .centerUuid(center1.getUuid())
                .title("title1")
                .content("content1")
                .type("notice")
                .build();

        given(boardRepository.findById(1L)).willReturn(Optional.ofNullable(board1));

        //when
        FindBoardByIdResponse findBoard = boardService.findOne(1L);

        //then
        then(boardRepository).should().findById(1L);

        assertThat(findBoard).isEqualTo(board2);

        System.out.println("게시판 상세조회를 성공했습니다.");
    }

    @Test
    void 게시판을_수정할수있다() {
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

        given(boardRepository.findById(1L)).willReturn(Optional.ofNullable(board1));

        UpdateBoardRequest dto = UpdateBoardRequest.builder()
                .id(1L)
                .title("title12")
                .content("content12")
                .type("notice")
                .user(user.getUuid())
                .center(center1.getUuid())
                .build();

        //when
        boardService.update(dto);

        //then
        then(boardRepository).should().findById(1L);
        System.out.println("게시판 수정을 성공했습니다.");
    }

    @Test
    void 특정_게시판을_삭제할수있다() {
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

        given(boardRepository.findById(1L)).willReturn(Optional.ofNullable(board1));

        //when
        Long deleteId = boardService.delete(1L);

        //then
        then(boardRepository).should().findById(1L);
        then(boardRepository).should().delete(board1);

        assertThat(deleteId).isEqualTo(1L);
    }
}