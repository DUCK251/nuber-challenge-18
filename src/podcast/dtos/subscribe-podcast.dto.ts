import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from './output.dto';

@InputType()
export class SubscribePodcastInput {
  @Field(type => Int)
  podcastId: number;
}

@ObjectType()
export class SubscribePodcastOutput extends CoreOutput {}
