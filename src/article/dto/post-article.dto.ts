import { ApiProperty } from '@nestjs/swagger';

export class PostArticleDto {

    @ApiProperty()
    nickName: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;

}

export class PostArticleSuccessResponse {

    @ApiProperty({
        default: 200,
    })
    responseCode: number;

    @ApiProperty({
        default: 'success',
    })
    responseMessage: string;

  
}

export class PostArticleErrorResponse {

    @ApiProperty({
        default: 400,
    })
    responseCode: number;

    @ApiProperty({
        default: 'Something went wrong',
    })
    responseMessage: string;
}
