import { ApiProperty } from '@nestjs/swagger';

export class SetPagination {


    @ApiProperty({
        default: 20,
    })
    perPage: number;

    @ApiProperty({
        default: 1,
    })
    page: number;
}

export class ArticleListDto{

    @ApiProperty({ example: 1 })
    articleId: number;

    @ApiProperty({ example: "article-1" })
    title: string;

    @ApiProperty({ example: "#article1"})
    nickName: string;

    @ApiProperty({ example: "2021/08/23 04:44:18 PM" })
    creationDate:string;
}

export class ArticleListResponse{
    @ApiProperty({
        type: [ArticleListDto],
      })
      articleList: ArticleListDto[];

      @ApiProperty({ example: 2 })
      totalPage: number;
  
      @ApiProperty({ example: 6 })
      totalRecords: number;
  
      @ApiProperty({ example: 1 })
      currentPage: number;
}
export class ArticleSuccessResponse {

    @ApiProperty({
        default: 200,
    })
    responseCode: number;

    @ApiProperty({
        default: 'success',
    })
    responseMessage: string;

    @ApiProperty()
    responseData: ArticleListResponse;
}

export class ArticleErrorResponse {

    @ApiProperty({
        default: 400,
    })
    responseCode: number;

    @ApiProperty({
        default: 'Something went wrong',
    })
    responseMessage: string;
}
