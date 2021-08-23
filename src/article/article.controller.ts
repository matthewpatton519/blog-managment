import { Body, Controller, Get, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GeneralHelperService } from 'src/shared/General-helper.service';
import { APP_CONSTANTS } from '../config';
import { ArticleService } from './article.service';
import { ArticleSuccessResponse, ArticleErrorResponse, SetPagination } from './dto/article-list.dto';
import { CommentOnArticleDto,CommentOnCommentDto,CommentOnArticleSuccessResponse,CommentOnArticleErrorResponse } from './dto/comment-on-article.dto';
import { GetCommentListErrorResponse, GetCommentListSuccessResponse } from './dto/get-all-comment-list.dto';
import { GetArticleId, GetArticleSuccessResponse, GetArticleErrorResponse } from './dto/get-article-content.dto';
import { PostArticleDto, PostArticleSuccessResponse, PostArticleErrorResponse } from './dto/post-article.dto';


@Controller('article')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService,
    ) { }


    @Get('list')
    @ApiOperation({ summary: 'List all Articles' })
    @ApiResponse({ status: 200, type: ArticleSuccessResponse })
    @ApiResponse({ status: 400, type: ArticleErrorResponse })

    public async articleList(
        @Query() setPagination: SetPagination,
        @Req() req: any,
        @Res() res: any
    ) {

        const listOfArticle: any = await this.articleService.articleList(setPagination);

        try {
            if (listOfArticle) {
                return res.status(HttpStatus.OK).json(GeneralHelperService.ApiResponse(
                    APP_CONSTANTS.SUCCESS_RESPONSE_STATUS_CODE,
                    APP_CONSTANTS.DATA_SUCCESSFULLY_FOUND,
                    listOfArticle,
                ));
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json(GeneralHelperService.ApiResponse(
                    APP_CONSTANTS.BAD_REQUEST_STATUS_CODE,
                    APP_CONSTANTS.SOMETHING_WENT_WRONG,
                    null,
                ));
            }
        } catch (err) {
            console.log("error", err);
            return res.status(HttpStatus.BAD_REQUEST).json(GeneralHelperService.ApiResponse(
                APP_CONSTANTS.BAD_REQUEST_STATUS_CODE,
                APP_CONSTANTS.SOMETHING_WENT_WRONG,
                null,
            ));
        }

    }

    @Post('get-article-content')
    @ApiOperation({ summary: 'Get an article content' })
    @ApiResponse({ status: 200, type: GetArticleSuccessResponse })
    @ApiResponse({ status: 400, type: GetArticleErrorResponse })
    public async getArticleContent(
        @Body() getArticleId: GetArticleId,
        @Req() req: any,
        @Res() res: any
    ) {

        const isArticleExist = await this.articleService.isArticleExist(getArticleId.articleId);
        if (!isArticleExist) {
            return res.status(HttpStatus.OK).json(GeneralHelperService.ApiResponse(
                APP_CONSTANTS.ARTICLEID_INVALID_CODE,
                APP_CONSTANTS.ARTICLEID_INVALID_MESSAGE,
                null,
            ));
        }

        try {
            const articleContent: any = await this.articleService.getArticleContent(isArticleExist);

            if (articleContent) {
                return res.status(HttpStatus.OK).json(GeneralHelperService.ApiResponse(
                    APP_CONSTANTS.SUCCESS_RESPONSE_STATUS_CODE,
                    APP_CONSTANTS.DATA_SUCCESSFULLY_FOUND,
                    articleContent,
                ));
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json(GeneralHelperService.ApiResponse(
                    APP_CONSTANTS.BAD_REQUEST_STATUS_CODE,
                    APP_CONSTANTS.SOMETHING_WENT_WRONG,
                    null,
                ));
            }
        } catch (err) {
            console.log("error", err);
            return res.status(HttpStatus.BAD_REQUEST).json(GeneralHelperService.ApiResponse(
                APP_CONSTANTS.BAD_REQUEST_STATUS_CODE,
                APP_CONSTANTS.SOMETHING_WENT_WRONG,
                null,
            ));
        }
    }

    @Post('post-article')
    @ApiOperation({ summary: 'Post article' })
    @ApiResponse({ status: 200, type: PostArticleSuccessResponse })
    @ApiResponse({ status: 400, type: PostArticleErrorResponse })
    public async postArticle(
        @Body() postArticleDto: PostArticleDto,
        @Req() req: any,
        @Res() res: any
    ) {

        var fieldArr: any = [{
            'fieldName': postArticleDto.nickName,
            'message': APP_CONSTANTS.NICKNAME_FIELD_REQUIRED
          },
          {
            'fieldName': postArticleDto.title,
            'message': APP_CONSTANTS.TITLE_FIELD_REQUIRED
          },
          {
            'fieldName': postArticleDto.content,
            'message': APP_CONSTANTS.CONTENT_FIELD_REQUIRED
          }
          ];
          for (let i = 0; i < fieldArr.length; i++) {
            if (GeneralHelperService.isRequired(fieldArr[i].fieldName)) {
              return res.status(HttpStatus.OK).json(GeneralHelperService.ApiResponse(
                APP_CONSTANTS.FIELD_IS_REQUIRED,
                fieldArr[i].message,
                null,
              ));
            }
          }

        try {
            const articleContent: any = await this.articleService.postArticle(postArticleDto);

            if (articleContent) {
                return res.status(HttpStatus.OK).json(GeneralHelperService.ApiResponse(
                    APP_CONSTANTS.SUCCESS_RESPONSE_STATUS_CODE,
                    APP_CONSTANTS.ARTICLE_SUCCESSFULLY_CREATED,
                    null,
                ));
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json(GeneralHelperService.ApiResponse(
                    APP_CONSTANTS.BAD_REQUEST_STATUS_CODE,
                    APP_CONSTANTS.SOMETHING_WENT_WRONG,
                    null,
                ));
            }
        } catch (err) {
            console.log("error", err);
            return res.status(HttpStatus.BAD_REQUEST).json(GeneralHelperService.ApiResponse(
                APP_CONSTANTS.BAD_REQUEST_STATUS_CODE,
                APP_CONSTANTS.SOMETHING_WENT_WRONG,
                null,
            ));
        }
    }

    @Post('get-article-comments')
    @ApiOperation({ summary: 'List all comments of an article' })
    @ApiResponse({ status: 200, type: GetCommentListSuccessResponse })
    @ApiResponse({ status: 400, type: GetCommentListErrorResponse })
    public async getArticleComments(
        @Body() getArticleId: GetArticleId,
        @Req() req: any,
        @Res() res: any
    ) {

        const isArticleExist = await this.articleService.isArticleExist(getArticleId.articleId);
        if (!isArticleExist) {
            return res.status(HttpStatus.OK).json(GeneralHelperService.ApiResponse(
                APP_CONSTANTS.ARTICLEID_INVALID_CODE,
                APP_CONSTANTS.ARTICLEID_INVALID_MESSAGE,
                null,
            ));
        }

        try {
            const commentsList: any = await this.articleService.getArticleComments(getArticleId);

            if (commentsList) {
                return res.status(HttpStatus.OK).json(GeneralHelperService.ApiResponse(
                    APP_CONSTANTS.SUCCESS_RESPONSE_STATUS_CODE,
                    APP_CONSTANTS.DATA_SUCCESSFULLY_FOUND,
                    commentsList,
                ));
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json(GeneralHelperService.ApiResponse(
                    APP_CONSTANTS.BAD_REQUEST_STATUS_CODE,
                    APP_CONSTANTS.SOMETHING_WENT_WRONG,
                    null,
                ));
            }
        } catch (err) {
            console.log("error", err);
            return res.status(HttpStatus.BAD_REQUEST).json(GeneralHelperService.ApiResponse(
                APP_CONSTANTS.BAD_REQUEST_STATUS_CODE,
                APP_CONSTANTS.SOMETHING_WENT_WRONG,
                null,
            ));
        }
    }

    @Post('post-comment')
    @ApiOperation({ summary: 'Comment on an article' })
    @ApiResponse({ status: 200, type: CommentOnArticleSuccessResponse })
    @ApiResponse({ status: 400, type: CommentOnArticleErrorResponse })
    public async postComment(
        @Body() commentOnArticleDto: CommentOnArticleDto,
        @Req() req: any,
        @Res() res: any
    ) {
        var fieldArr: any = [{
            'fieldName': commentOnArticleDto.articleId,
            'message': APP_CONSTANTS.ARTICLEID_FIELD_REQUIRED
          },
          {
            'fieldName': commentOnArticleDto.comment,
            'message': APP_CONSTANTS.COMMENT_FIELD_REQUIRED
          },
         
          ];
          for (let i = 0; i < fieldArr.length; i++) {
            if (GeneralHelperService.isRequired(fieldArr[i].fieldName)) {
              return res.status(HttpStatus.OK).json(GeneralHelperService.ApiResponse(
                APP_CONSTANTS.FIELD_IS_REQUIRED,
                fieldArr[i].message,
                null,
              ));
            }
          }
        const isArticleExist = await this.articleService.isArticleExist(commentOnArticleDto.articleId);
        if (!isArticleExist) {
            return res.status(HttpStatus.OK).json(GeneralHelperService.ApiResponse(
                APP_CONSTANTS.ARTICLEID_INVALID_CODE,
                APP_CONSTANTS.ARTICLEID_INVALID_MESSAGE,
                null,
            ));
        }

        try {
            const articleContent: any = await this.articleService.postComment(commentOnArticleDto);

            if (articleContent) {
                return res.status(HttpStatus.OK).json(GeneralHelperService.ApiResponse(
                    APP_CONSTANTS.SUCCESS_RESPONSE_STATUS_CODE,
                    APP_CONSTANTS.COMMENT_SUCCESSFULLY_CREATED,
                    null,
                ));
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json(GeneralHelperService.ApiResponse(
                    APP_CONSTANTS.BAD_REQUEST_STATUS_CODE,
                    APP_CONSTANTS.SOMETHING_WENT_WRONG,
                    null,
                ));
            }
        } catch (err) {
            console.log("error", err);
            return res.status(HttpStatus.BAD_REQUEST).json(GeneralHelperService.ApiResponse(
                APP_CONSTANTS.BAD_REQUEST_STATUS_CODE,
                APP_CONSTANTS.SOMETHING_WENT_WRONG,
                null,
            ));
        }
    }

    @Post('post-comment-on-comment')
    @ApiOperation({ summary: 'Comment on a comment' })
    @ApiResponse({ status: 200, type: CommentOnArticleSuccessResponse })
    @ApiResponse({ status: 400, type: CommentOnArticleErrorResponse })
    public async postCommentOnComment(
        @Body() commentOnCommentDto: CommentOnCommentDto,
        @Req() req: any,
        @Res() res: any
    ) {

        var fieldArr: any = [{
            'fieldName': commentOnCommentDto.commentId,
            'message': APP_CONSTANTS.COMMENTID_FIELD_REQUIRED
          },
          {
            'fieldName': commentOnCommentDto.comment,
            'message': APP_CONSTANTS.COMMENT_FIELD_REQUIRED
          },
         
          ];
          for (let i = 0; i < fieldArr.length; i++) {
            if (GeneralHelperService.isRequired(fieldArr[i].fieldName)) {
              return res.status(HttpStatus.OK).json(GeneralHelperService.ApiResponse(
                APP_CONSTANTS.FIELD_IS_REQUIRED,
                fieldArr[i].message,
                null,
              ));
            }
          }

        const isCommentExist = await this.articleService.isCommentExist(commentOnCommentDto.commentId);
        if (!isCommentExist) {
            return res.status(HttpStatus.OK).json(GeneralHelperService.ApiResponse(
                APP_CONSTANTS.COMMENTID_INVALID_CODE,
                APP_CONSTANTS.COMMENTID_INVALID_MESSAGE,
                null,
            ));
        }

        try {
            const articleContent: any = await this.articleService.postCommentOnComment(isCommentExist.articleId,commentOnCommentDto);

            if (articleContent) {
                return res.status(HttpStatus.OK).json(GeneralHelperService.ApiResponse(
                    APP_CONSTANTS.SUCCESS_RESPONSE_STATUS_CODE,
                    APP_CONSTANTS.COMMENT_SUCCESSFULLY_CREATED,
                    null,
                ));
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json(GeneralHelperService.ApiResponse(
                    APP_CONSTANTS.BAD_REQUEST_STATUS_CODE,
                    APP_CONSTANTS.SOMETHING_WENT_WRONG,
                    null,
                ));
            }
        } catch (err) {
            console.log("error", err);
            return res.status(HttpStatus.BAD_REQUEST).json(GeneralHelperService.ApiResponse(
                APP_CONSTANTS.BAD_REQUEST_STATUS_CODE,
                APP_CONSTANTS.SOMETHING_WENT_WRONG,
                null,
            ));
        }
    }

}
