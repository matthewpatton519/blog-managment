import { ApiProperty } from '@nestjs/swagger';


export class CommentListDto {

    @ApiProperty({ example: 1 })
    commentId: number;

    @ApiProperty({ example: "It is a long established fact that a reader will be distracted by the readable content." })
    comment: string;

    @ApiProperty({ example: "2021/08/23 04:44:18 PM" })
    creationDate: string;
}

export class CommentListResponse {
    @ApiProperty({
        type: [CommentListDto],
    })
    list: CommentListDto[];
}

export class GetCommentListSuccessResponse {

    @ApiProperty({
        default: 200,
    })
    responseCode: number;

    @ApiProperty({
        default: 'success',
    })
    responseMessage: string;

    @ApiProperty()
    responseData: CommentListResponse;
}

export class GetCommentListErrorResponse {

    @ApiProperty({
        default: 400,
    })
    responseCode: number;

    @ApiProperty({
        default: 'Something went wrong',
    })
    responseMessage: string;
}

