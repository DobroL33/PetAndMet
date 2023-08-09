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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
        Map<String, Object> response = new HashMap<>();
        try{
            boardService.join(request);
            response.put("status", 200);
            response.put("message", "입양후기 게시판 정보 등록 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "입양후기 게시판 정보 등록 실패");
            return new Result(false, response, "null");
        }

    }

    //입양 후기 1개 상세보기
    @GetMapping("/adopt/detail")
    public Result GetAdoptBoard(@RequestParam(value = "id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("status", 200);
            response.put("message", "입양후기 게시판 정보 상세조회 성공");
            response.put("board", boardService.findOne(id));
            return new Result(true, response, "null");

        } catch (Exception e){
            response.put("status", 500);
            response.put("message", "입양후기 게시판 정보 상세조회 실패");
            return new Result(false, response, "null");
        }
    }

    //입양 후기 전체 조회(입양 후기)
    @GetMapping("/adopt")
    public Result findAdoptAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam(value = "center_uuid") String uuid, @RequestParam(value = "type") String type) {
        Map<String, Object> response = new HashMap<>();
        try {
            Page<FindAllBoardResponse> findBoard = boardService.findAllBoard(uuid, type, pageable);
            response.put("status", 200);
            response.put("message", "입양후기 게시판 정보 전체조회 성공");
            response.put("total", findBoard.getTotalElements());
            response.put("boards",findBoard);
            return new Result(true, response, "null");
        } catch (Exception e){
            response.put("status", 500);
            response.put("message", "입양후기 게시판 정보 전체조회 실패");
            return new Result(false, response, "null");
        }

    }
    

    //입양 후기 정보 수정
    @PreAuthorize("hasAnyRole('USER', 'CENTER')")
    @PatchMapping("/adopt")
    public Result updateAdoptBoard(@RequestBody UpdateBoardRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            boardService.update(request);
            response.put("status", 200);
            response.put("message", "입양후기 게시판 정보 수정 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "입양후기 게시판 정보 수정 실패");
            return new Result(false, response, "null");
        }

    }

    //입양 후기 정보 삭제
    @PreAuthorize("hasAnyRole('USER', 'CENTER')")
    @DeleteMapping("adopt/{id}")
    public Result deleteAdoptBoard(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            boardService.delete(id);
            response.put("status", 200);
            response.put("message", "입양후기 게시판 정보 삭제 성공");
            return new Result(true, response, "null");

        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "입양후기 게시판 정보 삭제 실패");
            return new Result(false, response, "null");
        }

    }

    //======= 후원 후기 ================================

    //후원후기 등록
    @PreAuthorize("hasAnyRole('CENTER')")
    @PostMapping("/support")
    public Result createSupportBoard(@RequestBody CreateBoardRequest request) {
        Map<String, Object> response = new HashMap<>();
        try{
            boardService.join(request);
            response.put("status", 200);
            response.put("message", "후원후기 게시판 정보 등록 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "후원후기 게시판 정보 등록 실패");
            return new Result(false, response, "null");
        }
    }

    //후원 후기 1개 상세보기
    @GetMapping("/support/detail")
    public Result GetSupportBoard(@RequestParam(value = "id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("status", 200);
            response.put("message", "후원후기 게시판 정보 상세조회 성공");
            response.put("board", boardService.findOne(id));
            return new Result(true, response, "null");
        } catch (Exception e){
            response.put("status", 500);
            response.put("message", "후원후기 게시판 정보 상세조회 실패");
            return new Result(false, response, "null");
        }
    }

    //후원 후기 전체 조회(입양 후기)
    @GetMapping("/support")
    public Result findSupportAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam(value = "center_uuid") String uuid, @RequestParam(value = "type") String type) {
        Map<String, Object> response = new HashMap<>();
        try{
            Page<FindAllBoardResponse> findBoard = boardService.findAllBoard(uuid, type, pageable);
            response.put("status", 200);
            response.put("message", "후원후기 게시판 정보 전체조회 성공");
            response.put("total", findBoard.getTotalElements());
            response.put("boards",findBoard);
            return new Result(true, response, "null");
        } catch (Exception e){
            response.put("status", 500);
            response.put("message", "후원후기 게시판 정보 전체조회 실패");
            return new Result(false, response, "null");
        }
    }

    //후원 후기 정보 수정
    @PreAuthorize("hasAnyRole('CENTER')")
    @PatchMapping("/support")
    public Result updateSupportBoard(@RequestBody UpdateBoardRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            boardService.update(request);
            response.put("status", 200);
            response.put("message", "후원후기 게시판 정보 수정 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "후원후기 게시판 정보 수정 실패");
            return new Result(false, response, "null");
        }
    }

    //후원 후기 정보 삭제
    @PreAuthorize("hasAnyRole('CENTER')")
    @DeleteMapping("support/{id}")
    public Result deleteSupportBoard(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            boardService.delete(id);
            response.put("status", 200);
            response.put("message", "후원후기 게시판 정보 삭제 성공");
            return new Result(true, response, "null");

        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "후원후기 게시판 정보 삭제 실패");
            return new Result(false, response, "null");
        }
    }


    //======= 공지사항 ===============================

    //공지사항 등록
    @PreAuthorize("hasAnyRole('CENTER')")
    @PostMapping("/notice")
    public Result createNoticeBoard(@RequestBody CreateBoardRequest request) {
        Map<String, Object> response = new HashMap<>();
        try{
            boardService.join(request);
            response.put("status", 200);
            response.put("message", "공지사항 게시판 정보 등록 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "공지사항 게시판 정보 등록 실패");
            return new Result(false, response, "null");
        }

    }

    //공지사항 1개 상세보기
    @GetMapping("/notice/detail")
    public Result GetNoticeBoard(@RequestParam(value = "id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("status", 200);
            response.put("message", "공지사항 게시판 정보 상세조회 성공");
            response.put("board", boardService.findOne(id));
            return new Result(true, response, "null");
        } catch (Exception e){
            response.put("status", 500);
            response.put("message", "공지사항 게시판 정보 상세조회 실패");
            return new Result(false, response, "null");
        }
    }

    //공지사항 전체 조회(입양 후기)
    @GetMapping("/notice")
    public Result findNoticeAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam(value = "center_uuid") String uuid, @RequestParam(value = "type") String type) {
        Map<String, Object> response = new HashMap<>();
        try{
            Page<FindAllBoardResponse> findBoard = boardService.findAllBoard(uuid, type, pageable);
            response.put("status", 200);
            response.put("message", "공지사항 게시판 정보 전체조회 성공");
            response.put("total", findBoard.getTotalElements());
            response.put("boards",findBoard);
            return new Result(true, response, "null");
        } catch (Exception e){
            response.put("status", 500);
            response.put("message", "공지사항 게시판 정보 전체조회 실패");
            return new Result(false, response, "null");
        }
    }

    //공지사항 정보 수정
    @PreAuthorize("hasAnyRole('CENTER')")
    @PatchMapping("/notice")
    public Result updateNoticeBoard(@RequestBody UpdateBoardRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            boardService.update(request);
            response.put("status", 200);
            response.put("message", "공지사항 게시판 정보 수정 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "공지사항 게시판 정보 수정 실패");
            return new Result(false, response, "null");
        }
    }

    //공지사항 정보 삭제
    @PreAuthorize("hasAnyRole('CENTER')")
    @DeleteMapping("notice/{id}")
    public Result deleteNoticeBoard(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            boardService.delete(id);
            response.put("status", 200);
            response.put("message", "공지사항 게시판 정보 삭제 성공");
            return new Result(true, response, "null");

        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "공지사항 게시판 정보 삭제 실패");
            return new Result(false, response, "null");
        }
    }

    //======= QNA ================================

    //QNA 등록
    @PreAuthorize("hasAnyRole('USER')")
    @PostMapping("/qna")
    public Result createQnaBoard(@RequestBody CreateBoardRequest request) {
        Map<String, Object> response = new HashMap<>();

        try{
            boardService.join(request);
            response.put("status", 200);
            response.put("message", "QNA 게시판 정보 등록 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "QNA 게시판 정보 등록 실패");
            return new Result(false, response, "null");
        }
    }

    //QNA 1개 상세보기
    @GetMapping("/qna/detail")
    public Result GetQnaBoard(@RequestParam(value = "id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("status", 200);
            response.put("message", "QNA 게시판 정보 상세조회 성공");
            response.put("board", boardService.findOne(id));
            return new Result(true, response, "null");
        } catch (Exception e){
            response.put("status", 500);
            response.put("message", "QNA 게시판 정보 상세조회 실패");
            return new Result(false, response, "null");
        }
    }

    //QNA 전체 조회(입양 후기)
    @GetMapping("/qna")
    public Result findQnaAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam(value = "center_uuid") String uuid, @RequestParam(value = "type") String type) {
        Map<String, Object> response = new HashMap<>();
        try{
            Page<FindAllBoardResponse> findBoard = boardService.findAllBoard(uuid, type, pageable);
            response.put("status", 200);
            response.put("message", "QNA 게시판 정보 전체조회 성공");
            response.put("total", findBoard.getTotalElements());
            response.put("boards",findBoard);
            return new Result(true, response, "null");
        } catch (Exception e){
            response.put("status", 500);
            response.put("message", "QNA 게시판 정보 전체조회 실패");
            return new Result(false, response, "null");
        }
    }

    //QNA 정보 수정
    @PreAuthorize("hasAnyRole('USER', 'CENTER')")
    @PatchMapping("/qna")
    public Result updateQnaBoard(@RequestBody UpdateBoardRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            boardService.update(request);
            response.put("status", 200);
            response.put("message", "QNA 게시판 정보 수정 성공");
            return new Result(true, response, "null");
        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "QNA 게시판 정보 수정 실패");
            return new Result(false, response, "null");
        }
    }

    //QNA 정보 삭제
    @PreAuthorize("hasAnyRole('USER', 'CENTER')")
    @DeleteMapping("qna/{id}")
    public Result deleteQnaBoard(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            boardService.delete(id);
            response.put("status", 200);
            response.put("message", "QNA 게시판 정보 삭제 성공");
            return new Result(true, response, "null");

        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "QNA 게시판 정보 삭제 실패");
            return new Result(false, response, "null");
        }
    }

}
