import { ApiProperty } from '@nestjs/swagger';

export class GetArticleId {


    @ApiProperty({
        default: 1,
    })
    articleId: number;
}

export class GetArticleResponse{
    @ApiProperty({
        default: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets",
    })
      content: string;
}

export class GetArticleSuccessResponse {

    @ApiProperty({
        default: 200,
    })
    responseCode: number;

    @ApiProperty({
        default: 'success',
    })
    responseMessage: string;

    @ApiProperty()
    responseData: GetArticleResponse;
}

export class GetArticleErrorResponse {

    @ApiProperty({
        default: 400,
    })
    responseCode: number;

    @ApiProperty({
        default: 'Something went wrong',
    })
    responseMessage: string;
}
