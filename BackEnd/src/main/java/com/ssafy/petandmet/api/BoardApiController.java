package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.Board;
import com.ssafy.petandmet.dto.board.*;
import com.ssafy.petandmet.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
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

    //입양후기 등록
    @PreAuthorize("hasAnyRole('USER')")
    @PostMapping("/adopt")
    public Result createAdoptBoard(@RequestBody CreateBoardRequest request) {

        try{
            boardService.join(request);
            BoardResponse response = new BoardResponse("200", "입양후기 게시판 정보 등록 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            BoardResponse response = new BoardResponse("500", "입양후기 게시판 정보 등록 실패");
            return new Result(false, response, "null");
        }

    }

    //입양 후기 1개 상세보기
    @GetMapping("/adopt/detail")
    public Result GetAdoptBoard(@RequestParam(value = "id") Long id) {
        try {
            FindBoardByIdResponse response = boardService.findOne(id);
            return new Result(true, response, "null");
        } catch (Exception e){
            return new Result(false,"null","null");
        }
    }

    //입양 후기 전체 조회(입양 후기)
    @GetMapping("/adopt")
    public Result findAdoptAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam(value = "center_uuid") String uuid, @RequestParam(value = "type") String type) {
        try {
            Page<Board> findBoard = boardService.findAllBoard(uuid, type, pageable);
            List<FindAllBoardResponse> response = findBoard.stream()
                    .map(o -> new FindAllBoardResponse(o))
                    .collect(toList());

            return new Result(true, response, "null");
        } catch (Exception e){
            return new Result(false, "null", "null");
        }

    }

    //입양 후기 정보 수정
    @PreAuthorize("hasAnyRole('USER', 'CENTER')")
    @PatchMapping("/adopt")
    public Result updateAdoptBoard(@RequestBody UpdateBoardRequest request) {
        try {
            boardService.update(request);
            UpdateBoardResponse response = new UpdateBoardResponse("200", "입양후기 게시판 정보 수정 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            UpdateBoardResponse response = new UpdateBoardResponse("500", "입양후기 게시판 정보 수정 성공");
            return new Result(false, response, "null");
        }

    }

    //입양 후기 정보 삭제
    @PreAuthorize("hasAnyRole('USER', 'CENTER')")
    @DeleteMapping("adopt/{id}")
    public Result deleteAdoptBoard(@PathVariable("id") Long id) {
        try {
            Long deleteId = boardService.delete(id);
            BoardResponse response = new BoardResponse("200", "입양후기 게시판 정보 삭제 성공");
            return new Result(true, response, "null");

        }catch (Exception e){
            BoardResponse response = new BoardResponse("500", "입양후기 게시판 정보 삭제 실패");
            return new Result(false, response, "null");
        }

    }

    //======= 후원 후기 ===========
    //후원후기 등록
    @PreAuthorize("hasAnyRole('CENTER')")
    @PostMapping("/support")
    public Result createSupportBoard(@RequestBody CreateBoardRequest request) {

        try{
            boardService.join(request);
            BoardResponse response = new BoardResponse("200", "후원후기 게시판 정보 등록 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            BoardResponse response = new BoardResponse("500", "후원후기 게시판 정보 등록 실패");
            return new Result(false, response, "null");
        }
    }

    //후원 후기 1개 상세보기
    @GetMapping("/support/detail")
    public Result GetSupportBoard(@RequestParam(value = "id") Long id) {
        try {
            FindBoardByIdResponse response = boardService.findOne(id);
            return new Result(true, response, "null");
        } catch (Exception e){
            return new Result(false,"null","null");
        }
    }

    //후원 후기 전체 조회(입양 후기)
    @GetMapping("/support")
    public Result findSupportAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam(value = "center_uuid") String uuid, @RequestParam(value = "type") String type) {
        try{
            Page<Board> findBoard = boardService.findAllBoard(uuid, type, pageable);
            List<FindAllBoardResponse> response = findBoard.stream()
                    .map(o -> new FindAllBoardResponse(o))
                    .collect(toList());

            return new Result(true, response, "null");
        } catch (Exception e){
            return new Result(false, "null", "null");
        }
    }

    //후원 후기 정보 수정
    @PreAuthorize("hasAnyRole('CENTER')")
    @PatchMapping("/support")
    public Result updateSupportBoard(@RequestBody UpdateBoardRequest request) {
        try {
            boardService.update(request);
            UpdateBoardResponse response = new UpdateBoardResponse("200", "후원후기 게시판 수정 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            UpdateBoardResponse response = new UpdateBoardResponse("500", "후원후기 게시판 수정 성공");
            return new Result(false, response, "null");
        }
    }

    //후원 후기 정보 삭제
    @PreAuthorize("hasAnyRole('CENTER')")
    @DeleteMapping("support/{id}")
    public Result deleteSupportBoard(@PathVariable("id") Long id) {
        try {
            Long deleteId = boardService.delete(id);
            BoardResponse response = new BoardResponse("200", "후원후기 게시판 정보 삭제 성공");
            return new Result(true, response, "null");

        }catch (Exception e){
            BoardResponse response = new BoardResponse("500", "후원후기 게시판 정보 삭제 실패");
            return new Result(false, response, "null");
        }
    }


    //======= 공지사항 ===========
    //공지사항 등록
    @PreAuthorize("hasAnyRole('CENTER')")
    @PostMapping("/notice")
    public Result createNoticeBoard(@RequestBody CreateBoardRequest request) {
        try{
            boardService.join(request);
            BoardResponse response = new BoardResponse("200", "공지사항 게시판 정보 등록 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            BoardResponse response = new BoardResponse("500", "공지사항 게시판 정보 등록 실패");
            return new Result(false, response, "null");
        }

    }

    //공지사항 1개 상세보기
    @GetMapping("/notice/detail")
    public Result GetNoticeBoard(@RequestParam(value = "id") Long id) {
        try {
            FindBoardByIdResponse response = boardService.findOne(id);
            return new Result(true, response, "null");
        } catch (Exception e){
            return new Result(false,"null","null");
        }
    }

    //공지사항 전체 조회(입양 후기)
    @GetMapping("/notice")
    public Result findNoticeAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam(value = "center_uuid") String uuid, @RequestParam(value = "type") String type) {
        try{
            Page<Board> findBoard = boardService.findAllBoard(uuid, type, pageable);
            List<FindAllBoardResponse> response = findBoard.stream()
                    .map(o -> new FindAllBoardResponse(o))
                    .collect(toList());

            return new Result(true, response, "null");
        } catch (Exception e){
            return new Result(false, "null", "null");
        }
    }

    //공지사항 정보 수정
    @PreAuthorize("hasAnyRole('CENTER')")
    @PatchMapping("/notice")
    public Result updateNoticeBoard(@RequestBody UpdateBoardRequest request) {
        try {
            boardService.update(request);
            UpdateBoardResponse response = new UpdateBoardResponse("200", "공지사항 게시판 수정 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            UpdateBoardResponse response = new UpdateBoardResponse("500", "공지사항 게시판 수정 성공");
            return new Result(false, response, "null");
        }
    }

    //공지사항 정보 삭제
    @PreAuthorize("hasAnyRole('CENTER')")
    @DeleteMapping("notice/{id}")
    public Result deleteNoticeBoard(@PathVariable("id") Long id) {
        try {
            Long deleteId = boardService.delete(id);
            BoardResponse response = new BoardResponse("200", "공지사항 게시판 정보 삭제 성공");
            return new Result(true, response, "null");

        }catch (Exception e){
            BoardResponse response = new BoardResponse("500", "공지사항 게시판 정보 삭제 실패");
            return new Result(false, response, "null");
        }
    }

    //======= QNA ===========
    //QNA 등록
    @PreAuthorize("hasAnyRole('USER')")
    @PostMapping("/qna")
    public Result createQnaBoard(@RequestBody CreateBoardRequest request) {

        try{
            boardService.join(request);
            BoardResponse response = new BoardResponse("200", "QNA 게시판 정보 등록 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            BoardResponse response = new BoardResponse("500", "QNA 게시판 정보 등록 실패");
            return new Result(false, response, "null");
        }
    }

    //QNA 1개 상세보기
    @GetMapping("/qna/detail")
    public Result GetQnaBoard(@RequestParam(value = "id") Long id) {
        try {
            FindBoardByIdResponse response = boardService.findOne(id);
            return new Result(true, response, "null");
        } catch (Exception e){
            return new Result(false,"null","null");
        }
    }

    //QNA 전체 조회(입양 후기)
    @GetMapping("/qna")
    public Result findQnaAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam(value = "center_uuid") String uuid, @RequestParam(value = "type") String type) {
        try{
            Page<Board> findBoard = boardService.findAllBoard(uuid, type, pageable);
            List<FindAllBoardResponse> response = findBoard.stream()
                    .map(o -> new FindAllBoardResponse(o))
                    .collect(toList());

            return new Result(true, response, "null");
        } catch (Exception e){
            return new Result(false, "null", "null");
        }
    }

    //QNA 정보 수정
    @PreAuthorize("hasAnyRole('USER', 'CENTER')")
    @PatchMapping("/qna")
    public Result updateQnaBoard(@RequestBody UpdateBoardRequest request) {
        try {
            boardService.update(request);
            UpdateBoardResponse response = new UpdateBoardResponse("200", "QNA 게시판 수정 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            UpdateBoardResponse response = new UpdateBoardResponse("500", "QNA 게시판 수정 성공");
            return new Result(false, response, "null");
        }
    }

    //QNA 정보 삭제
    @PreAuthorize("hasAnyRole('USER', 'CENTER')")
    @DeleteMapping("qna/{id}")
    public Result deleteQnaBoard(@PathVariable("id") Long id) {
        try {
            Long deleteId = boardService.delete(id);
            BoardResponse response = new BoardResponse("200", "QNA 게시판 정보 삭제 성공");
            return new Result(true, response, "null");

        }catch (Exception e){
            BoardResponse response = new BoardResponse("500", "QNA 게시판 정보 삭제 실패");
            return new Result(false, response, "null");
        }
    }

}
