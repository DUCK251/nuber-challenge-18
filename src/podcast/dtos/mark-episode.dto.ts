import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from './output.dto';

@InputType()
export class MarkEpisodeAsPlayedInput {
  @Field(type => Int)
  episodeId: number;
}

@ObjectType()
export class MarkEpisodeAsPlayedOutput extends CoreOutput {}
