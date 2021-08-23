import { ApiProperty } from '@nestjs/swagger';

export class CommentOnArticleDto {

    @ApiProperty()
    articleId: number;

    @ApiProperty()
    comment: string;



}

export class CommentOnCommentDto {

    @ApiProperty()
    commentId: number;

    @ApiProperty()
    comment: string;



}

export class CommentOnArticleSuccessResponse {

    @ApiProperty({
        default: 200,
    })
    responseCode: number;

    @ApiProperty({
        default: 'cooment post successfully.',
    })
    responseMessage: string;


}

export class CommentOnArticleErrorResponse {

    @ApiProperty({
        default: 400,
    })
    responseCode: number;

    @ApiProperty({
        default: 'Something went wrong',
    })
    responseMessage: string;
}
