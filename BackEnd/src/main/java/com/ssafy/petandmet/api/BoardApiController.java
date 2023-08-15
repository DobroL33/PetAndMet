package com.ssafy.petandmet.api;

import com.ssafy.petandmet.dto.board.*;
import com.ssafy.petandmet.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;



@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/board")
public class BoardApiController {
    private final BoardService boardService;

    //======= 입양 후기 ===========

    //입양후기 등록
    @PreAuthorize("hasAnyRole('USER')")
    @PostMapping("/adopt")
    @Operation(summary = "입양후기 등록", description = "입양된 동물들의 후기를 작성합니다.")
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
    @Operation(summary = "입양후기 상세조회", description = "1개의 입양 후기 게시글을 상세조회합니다.")
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
    @Operation(summary = "입양후기 전체조회", description = "입양후기 게시글을 전체조회(페이징)합니다.")
    public Result findAdoptAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam Map<String, String> map) {
        Map<String, Object> response = new HashMap<>();
        try {
            String type = "adopt";
            String uuid = map.get("center_uuid");
            Page<FindAllBoardResponse> findBoard = boardService.findAllBoard(uuid, type, pageable);
            response.put("status", 200);
            response.put("message", "입양후기 게시판 정보 전체조회 성공");
            response.put("total", findBoard.getTotalElements());
            response.put("boards",findBoard.getContent());
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
    @Operation(summary = "입양후기 수정", description = "사용자가 작성한 입양후기 게시글을 수정합니다.")
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
    @Operation(summary = "입양후기 삭제", description = "사용자가 작성한 입양후기 게시글을 삭제합니다.")
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
    @Operation(summary = "후원후기 등록", description = "보호소에서 후원받았던 물품 후기를 작성합니다.(받은 후원을 인증하기 위함)")
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
    @Operation(summary = "후원후기 1개 상세조회", description = "1개의 입양 후기 게시글을 상세조회합니다.")
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
    @Operation(summary = "후원후기 전체조회", description = "후원후기 게시글을 전체조회(페이징)합니다.")
    public Result findSupportAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam Map<String, String> map) {
        Map<String, Object> response = new HashMap<>();
        try{
            String type = "support";
            String uuid = map.get("center_uuid");
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
    @Operation(summary = "후원후기 수정", description = "보호소가 작성한 후원후기 게시글을 수정합니다.")
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
    @Operation(summary = "후원후기 삭제", description = "보호소가 작성한 후원후기 게시글을 삭제합니다.")
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
    @Operation(summary = "공지사항 등록", description = "보호소의 공지사항을 작성합니다.")
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
    @Operation(summary = "공지사항 1개 상세조회", description = "1개의 공지사항 게시글을 상세조회합니다.")
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
    @Operation(summary = "공지사항 전체조회", description = "공지사항 게시글을 전체조회(페이징)합니다.")
    public Result findNoticeAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam Map<String, String> map) {
        Map<String, Object> response = new HashMap<>();
        try{
            String type = "notice";
            String uuid = map.get("center_uuid");
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
    @Operation(summary = "공지사항 수정", description = "보호소가 작성한 공지사항 게시글을 수정합니다.")
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
    @Operation(summary = "공지사항 삭제", description = "보호소가 작성한 공지사항 게시글을 삭제합니다.")
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
    @Operation(summary = "QNA 등록", description = "사용자가 보호소에게 문의할 내용 작성합니다.")
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
    @Operation(summary = "QNA 1개의 상세조회", description = "1개의 QNA 게시글을 상세조회합니다.")
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
    @Operation(summary = "QNA 전체조회", description = "QNA 게시글을 전체조회(페이징)합니다.")
    public Result findQnaAll(@PageableDefault(size = 10) Pageable pageable, @RequestParam Map<String, String> map) {
        Map<String, Object> response = new HashMap<>();
        try{
            String type = "qna";
            String uuid = map.get("center_uuid");
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
    @Operation(summary = "QNA 수정", description = "사용자가 작성한 QNA 게시글을 수정합니다.")
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
    @Operation(summary = "QNA 삭제", description = "사용자가 작성한 QNA 게시글을 삭제합니다.")
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
