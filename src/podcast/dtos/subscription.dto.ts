import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';
import { CoreOutput } from './output.dto';

@InputType()
export class SubscriptionsInput {
  @Field(type => Int)
  userId: number;
}

@ObjectType()
export class SubscriptionsOutput extends CoreOutput {
  @Field(type => [Podcast], { nullable: true })
  subscriptions?: Podcast[];
}
