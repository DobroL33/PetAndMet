package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.Comment;

import com.ssafy.petandmet.dto.board.FindAllBoardResponse;
import com.ssafy.petandmet.dto.board.Result;
import com.ssafy.petandmet.dto.comment.CommentResponse;
import com.ssafy.petandmet.dto.comment.CreateCommentRequest;
import com.ssafy.petandmet.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/comment")
public class CommentApiController {
    private final CommentService commentService;

    //등록
    @PreAuthorize("hasAnyRole('USER', 'CENTER')")
    @PostMapping("/qna")
    public Result createComment(@RequestBody CreateCommentRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            commentService.join(request);
            response.put("status", 200);
            response.put("message", "댓글 등록 성공");
            return new Result(true, response, "null");

        }catch (Exception e){
            response.put("status", 500);
            response.put("message", "댓글 등록 실패");
            return new Result(false, response, "null");
        }
    }

    //삭제
    @PreAuthorize("hasAnyRole('USER', 'CENTER')")
    @DeleteMapping("/qna/{comment_id}")
    public Result deleteAdoptBoard(@PathVariable("comment_id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            commentService.delete(id);
            response.put("status", 200);
            response.put("message", "댓글 삭제 성공");
            return new Result(true, response, "null");
        }
        catch (Exception e){
            response.put("status", 500);
            response.put("message", "댓글 삭제 실패");
            return new Result(false, response, "null");
        }
    }

    //게시판의 모든 댓글 찾기
    @GetMapping("/qna")
    public Result findQnaComment(@RequestParam(value = "id") Long id){
        Map<String, Object> response = new HashMap<>();
        try {
            List<Comment> collect = commentService.findByBoardId(id);
            response.put("status", 200);
            response.put("message", "댓글 전체조회 성공");
            response.put("total", collect.stream().count());
            response.put("comments",collect);
            return new Result(true, response, "null");
        } catch (Exception e){
            response.put("status", 500);
            response.put("message", "댓글 전체조회 실패");
            return new Result(false, response, "null");
        }
    }
}
