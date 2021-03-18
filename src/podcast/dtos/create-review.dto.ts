import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { Review } from '../entities/review.entity';
import { CoreOutput } from './output.dto';

@InputType()
export class CreateReviewInput extends PickType(
  Review,
  ['rating', 'comment'],
  InputType,
) {
  @Field(type => Int)
  @IsInt()
  podcastId: number;
}

@ObjectType()
export class CreateReviewOutput extends CoreOutput {
  @Field(type => Int, { nullable: true })
  @IsInt()
  id?: number;
}
