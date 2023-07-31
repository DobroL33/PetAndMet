package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.Board;
import com.ssafy.petandmet.dto.board.*;
import com.ssafy.petandmet.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/board")
public class BoardApiController {
    private final BoardService boardService;

    //======= 입양 후기 ===========

    //입양 후기 등록
    @PostMapping("/adopt")
    public Result createAdoptBoard(@RequestBody CreateBoardRequest request) {

        Long id = boardService.join(request);

        BoardResponse response = new BoardResponse("200", "게시판 정보 등록 성공");

        return new Result("성공", response, "null");
    }

    //입양 후기 1개 상세보기
    @GetMapping("/adopt/detail")
    public Result GetAdoptBoard(@RequestParam(value = "id") String id) {
        Optional<Board> findBoard = boardService.findOne(id);

        FindBoardByIdResponse response = FindBoardByIdResponse.builder()
                .message("게시판 조회 성공")
                .status("200")
                .title(findBoard.get().getTitle())
                .content(findBoard.get().getContent())
                .createdAt(findBoard.get().getCreatedAt())
                .photoUrl(findBoard.get().getPhotoUrl())
                .type(findBoard.get().getType())
                .updatedAt(findBoard.get().getUpdatedAt())
                .userUuid(findBoard.get().getUser().getUuid())
                .centerUuid(findBoard.get().getCenter().getUuid())
                .build();

        return new Result("성공", response, "null");
    }

    //입양 후기 전체 조회(입양 후기)
    @GetMapping("/adopt")
    public Result findAdoptAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam(value = "center_uuid") String uuid, @RequestParam(value = "type") String type) {
        Page<Board> findBoard = boardService.findAll(uuid, type, pageable);

        List<Board> collect = findBoard.stream().collect(toList());

        return new Result("성공", collect, "null");
    }

    //입양 후기 정보 수정
    @PatchMapping("/adopt")
    public Result updateAdoptBoard(@RequestBody UpdateBoardRequest request) {
        boardService.update(request);
        boardService.findOne(request.getId());
        UpdateBoardResponse response = new UpdateBoardResponse("200", "입양후기 정보 수정 성공");

        return new Result("성공", response, "null");
    }

    //입양 후기 정보 삭제
    @DeleteMapping("adopt/{id}")
    public Result deleteAdoptBoard(@PathVariable("id") String id) {
        Optional<String> deleteId = boardService.delete(id);

        BoardResponse response = new BoardResponse("200", "입양후기 게시판 정보 삭제 성공");

        return new Result("성공", response, "null");
    }

    //======= 후원 후기 ===========
    //후원 후기 등록
    @PostMapping("/support")
    public Result createSupportBoard(@RequestBody CreateBoardRequest request) {

        Long id = boardService.join(request);

        BoardResponse response = new BoardResponse("200", "후원후기 게시판 정보 등록 성공");

        return new Result("성공", response, "null");
    }

    //후원 후기 1개 상세보기
    @GetMapping("/support/detail")
    public Result GetSupportBoard(@RequestParam(value = "id") String id) {
        Optional<Board> findBoard = boardService.findOne(id);

        FindBoardByIdResponse response = FindBoardByIdResponse.builder()
                .message("게시판 조회 성공")
                .status("200")
                .title(findBoard.get().getTitle())
                .content(findBoard.get().getContent())
                .createdAt(findBoard.get().getCreatedAt())
                .photoUrl(findBoard.get().getPhotoUrl())
                .type(findBoard.get().getType())
                .updatedAt(findBoard.get().getUpdatedAt())
                .userUuid(findBoard.get().getUser().getUuid())
                .centerUuid(findBoard.get().getCenter().getUuid())
                .build();

        return new Result("성공", response, "null");
    }

    //후원 후기 전체 조회(입양 후기)
    @GetMapping("/support")
    public Result findSupportAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam(value = "center_uuid") String uuid, @RequestParam(value = "type") String type) {
        Page<Board> findBoard = boardService.findAll(uuid, type, pageable);

        List<Board> collect = findBoard.stream().collect(toList());

        return new Result("성공", collect, "null");
    }

    //후원 후기 정보 수정
    @PatchMapping("/support")
    public Result updateSupportBoard(@RequestBody UpdateBoardRequest request) {
        boardService.update(request);
        boardService.findOne(request.getId());
        UpdateBoardResponse response = new UpdateBoardResponse("200", "후원후기 정보 수정 성공");

        return new Result("성공", response, "null");
    }

    //후원 후기 정보 삭제
    @DeleteMapping("support/{id}")
    public Result deleteSupportBoard(@PathVariable("id") String id) {
        Optional<String> deleteId = boardService.delete(id);

        BoardResponse response = new BoardResponse("200", "후원후기 게시판 정보 삭제 성공");

        return new Result("성공", response, "null");
    }


    //======= 공지사항 ===========
    //공지사항 등록
    @PostMapping("/notice")
    public Result createNoticeBoard(@RequestBody CreateBoardRequest request) {

        Long id = boardService.join(request);

        BoardResponse response = new BoardResponse("200", "공지사항 게시판 정보 등록 성공");

        return new Result("성공", response, "null");
    }

    //공지사항 1개 상세보기
    @GetMapping("/notice/detail")
    public Result GetNoticeBoard(@RequestParam(value = "id") String id) {
        Optional<Board> findBoard = boardService.findOne(id);

        FindBoardByIdResponse response = FindBoardByIdResponse.builder()
                .message("게시판 조회 성공")
                .status("200")
                .title(findBoard.get().getTitle())
                .content(findBoard.get().getContent())
                .createdAt(findBoard.get().getCreatedAt())
                .photoUrl(findBoard.get().getPhotoUrl())
                .type(findBoard.get().getType())
                .updatedAt(findBoard.get().getUpdatedAt())
                .userUuid(findBoard.get().getUser().getUuid())
                .centerUuid(findBoard.get().getCenter().getUuid())
                .build();

        return new Result("성공", response, "null");
    }

    //공지사항 전체 조회(입양 후기)
    @GetMapping("/notice")
    public Result findNoticeAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam(value = "center_uuid") String uuid, @RequestParam(value = "type") String type) {
        Page<Board> findBoard = boardService.findAll(uuid, type, pageable);

        List<Board> collect = findBoard.stream().collect(toList());

        return new Result("성공", collect, "null");
    }

    //공지사항 정보 수정
    @PatchMapping("/notice")
    public Result updateNoticeBoard(@RequestBody UpdateBoardRequest request) {
        boardService.update(request);
        boardService.findOne(request.getId());
        UpdateBoardResponse response = new UpdateBoardResponse("200", "공지사항 정보 수정 성공");

        return new Result("성공", response, "null");
    }

    //공지사항 정보 삭제
    @DeleteMapping("notice/{id}")
    public Result deleteNoticeBoard(@PathVariable("id") String id) {
        Optional<String> deleteId = boardService.delete(id);

        BoardResponse response = new BoardResponse("200", "공지사항 게시판 정보 삭제 성공");

        return new Result("성공", response, "null");
    }

    //======= QNA ===========
    //QNA 등록
    @PostMapping("/qna")
    public Result createQnaBoard(@RequestBody CreateBoardRequest request) {

        Long id = boardService.join(request);

        BoardResponse response = new BoardResponse("200", "QNA 게시판 정보 등록 성공");

        return new Result("성공", response, "null");
    }

    //QNA 1개 상세보기
    @GetMapping("/qna/detail")
    public Result GetQnaBoard(@RequestParam(value = "id") String id) {
        Optional<Board> findBoard = boardService.findOne(id);

        FindBoardByIdResponse response = FindBoardByIdResponse.builder()
                .message("게시판 조회 성공")
                .status("200")
                .title(findBoard.get().getTitle())
                .content(findBoard.get().getContent())
                .createdAt(findBoard.get().getCreatedAt())
                .photoUrl(findBoard.get().getPhotoUrl())
                .type(findBoard.get().getType())
                .updatedAt(findBoard.get().getUpdatedAt())
                .userUuid(findBoard.get().getUser().getUuid())
                .centerUuid(findBoard.get().getCenter().getUuid())
                .build();

        return new Result("성공", response, "null");
    }

    //QNA 전체 조회(입양 후기)
    @GetMapping("/qna")
    public Result findQnaAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam(value = "center_uuid") String uuid, @RequestParam(value = "type") String type) {
        Page<Board> findBoard = boardService.findAll(uuid, type, pageable);

        List<Board> collect = findBoard.stream().collect(toList());

        return new Result("성공", collect, "null");
    }

    //QNA 정보 수정
    @PatchMapping("/qna")
    public Result updateQnaBoard(@RequestBody UpdateBoardRequest request) {
        boardService.update(request);
        boardService.findOne(request.getId());
        UpdateBoardResponse response = new UpdateBoardResponse("200", "QNA 정보 수정 성공");

        return new Result("성공", response, "null");
    }

    //QNA 정보 삭제
    @DeleteMapping("qna/{id}")
    public Result deleteQnaBoard(@PathVariable("id") String id) {
        Optional<String> deleteId = boardService.delete(id);

        BoardResponse response = new BoardResponse("200", "QNA 게시판 정보 삭제 성공");

        return new Result("성공", response, "null");
    }

}
