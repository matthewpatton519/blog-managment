import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entity/article.entity';
import { Comment } from './entity/comment.entity';
import { GeneralHelperService } from 'src/shared/General-helper.service';
import { PostArticleDto } from './dto/post-article.dto';
import { GetArticleId } from './dto/get-article-content.dto';
import { CommentOnArticleDto, CommentOnCommentDto } from './dto/comment-on-article.dto';


@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private ArticleModel: Repository<Article>,
        @InjectRepository(Comment) private CommentModel: Repository<Comment>
    ) { }

    public async articleList(setPagination): Promise<any> {
        const pages = Number(setPagination.page) > 0 ? parseInt(setPagination.page as any) - 1 : 0
        const limit = Number(setPagination.perPage) > 0 ? parseInt(setPagination.perPage as any) : 10

        const [articleData, totalRecords] = await this.ArticleModel.findAndCount(
            {
                take: limit,
                skip: pages
            }
        );
        var totalPage = Math.ceil(totalRecords / limit);

        var articleList: any = [];
        if (articleData) {
            articleData.forEach(articleVal => {
                var article = {
                    'articleId': articleVal.id,
                    'title': articleVal.title,
                    'nickName': articleVal.nickName,
                    'creationdate': GeneralHelperService.getDateTime(articleVal.createdAt)
                };
                articleList.push(article);

            });
        }

        return {
            list: articleList,
            totalPage: totalPage,
            totalRecords: totalRecords,
            currentPage: (totalPage >= 1) ? pages + 1 : 0
        };
    }

    public async getArticleContent(articleContent): Promise<any> {

        return {
            'articleContent': articleContent.content
        };
    }

    public async isArticleExist(articleId): Promise<any> {
        var articleContent = await this.ArticleModel.findOne({
            where: [{ "id": articleId }]
        });

        return articleContent;
    }

    public async postArticle(postArticleDto: PostArticleDto): Promise<any> {
        const newArticle = this.ArticleModel.create(postArticleDto);
        await this.ArticleModel.save(newArticle);
        return true;

    }

    public async getArticleComments(getArticleId: GetArticleId): Promise<any> {
        var articleComments = await this.CommentModel.find({
            where: [{ "articleId": getArticleId.articleId }]
        });
        var commentList: any = [];
        if (articleComments) {
            articleComments.forEach(commentsVal => {
                var article = {
                    'commentId': commentsVal.id,
                    'comment': commentsVal.comment,
                    'creationdate': GeneralHelperService.getDateTime(commentsVal.createdAt)
                };
                commentList.push(article);
            });

        }
        return { list: commentList };
    }

    public async postComment(commentOnArticleDto: CommentOnArticleDto): Promise<any> {
        
        const newComment = this.CommentModel.create(commentOnArticleDto);
        await this.CommentModel.save(newComment);
        return true;

    }

    public async postCommentOnComment(articleId,commentOnCommentDto: CommentOnCommentDto): Promise<any> {
        var postComment={
            articleId:articleId,
            parentCommentId:commentOnCommentDto.commentId,
            comment:commentOnCommentDto.comment

        };
        const newComment = this.CommentModel.create(postComment);
        await this.CommentModel.save(newComment);
        return true;

    }

    public async isCommentExist(commentId): Promise<any> {
        var articleContent = await this.CommentModel.findOne({
            where: [{ "id": commentId }]
        });

        return articleContent;
    }

}
