package com.ssafy.petandmet.api;

import com.ssafy.petandmet.domain.Comment;

import com.ssafy.petandmet.dto.board.Result;
import com.ssafy.petandmet.dto.comment.CommentResponse;
import com.ssafy.petandmet.dto.comment.CreateCommentRequest;
import com.ssafy.petandmet.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/comment")
public class CommentApiController {
    private final CommentService commentService;

    //등록
    @PostMapping("/qna")
    public Result createComment(@RequestBody CreateCommentRequest request) {


        Long id = commentService.join(request);

        CommentResponse response = new CommentResponse("200","댓글 등록 성공");
        return new Result("성공", response, "null");
    }

    //삭제
    @DeleteMapping("/qna/{comment_id}")
    public Result deleteAdoptBoard(@PathVariable("comment_id") String id) {
        Optional<String> deleteId = commentService.delete(id);

        CommentResponse response = new CommentResponse("200", "댓글 정보 삭제 성공");

        return new Result("성공", response, "null");
    }

    //게시판의 모든 댓글 찾기
    @GetMapping("/qna")
    public Result findQnaComment(@RequestParam(value = "id") Long id){
        List<Comment> collect = commentService.findByBoardId(id);
        return new Result("성공",collect,"null");
    }
}
