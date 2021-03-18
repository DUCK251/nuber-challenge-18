import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Podcast } from '../entities/podcast.entity';
import { CoreOutput } from './output.dto';
import { PaginationInput, PaginationOutput } from './pagination.dto';

@InputType()
export class SearchPodcastInput extends PaginationInput {
  @Field(type => String)
  query: string;
}

@ObjectType()
export class SearchPodcastOutput extends PaginationOutput {
  @Field(type => [Podcast], { nullable: true })
  podcasts?: Podcast[];
}
