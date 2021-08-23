import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from './entity/article.entity';
import { Comment } from './entity/comment.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Article,Comment])],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
