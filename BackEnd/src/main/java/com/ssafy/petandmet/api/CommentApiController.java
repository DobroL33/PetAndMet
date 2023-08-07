package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.Comment;

import com.ssafy.petandmet.dto.board.Result;
import com.ssafy.petandmet.dto.comment.CommentResponse;
import com.ssafy.petandmet.dto.comment.CreateCommentRequest;
import com.ssafy.petandmet.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        try {
            commentService.join(request);
            BoardResponse response = new BoardResponse("200", "QNA 정보 등록 성공");
            return new Result("true", response, "null");

        }catch (Exception e){
            BoardResponse response = new BoardResponse("500", "QNA 정보 등록 실패");
            return new Result("false", response, "null");
        }
    }

    //삭제
    @PreAuthorize("hasAnyRole('USER', 'CENTER')")
    @DeleteMapping("/qna/{comment_id}")
    public Result deleteAdoptBoard(@PathVariable("comment_id") Long id) {
        try {
            Long deleteId = commentService.delete(id);
            CommentResponse response = new CommentResponse("200", "댓글 정보 삭제 성공");
            return new Result("true", response, "null");
        }
        catch (Exception e){
            CommentResponse response = new CommentResponse("500", "댓글 정보 삭제 실패");
            return new Result("false", response, "null");
        }
    }

    //게시판의 모든 댓글 찾기
    @GetMapping("/qna")
    public Result findQnaComment(@RequestParam(value = "id") Long id){
        List<Comment> collect = commentService.findByBoardId(id);
        return new Result("성공",collect,"null");
    }
}
