import { Field, InputType, Int } from '@nestjs/graphql';
import { CoreOutput } from './output.dto';

@InputType()
export class MarkEpisodeAsPlayedInput {
  @Field(type => Int)
  episodeId: number;
}

@InputType()
export class MarkEpisodeAsPlayedOutput extends CoreOutput {}
