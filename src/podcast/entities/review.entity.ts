import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { CoreEntity } from './core.entity';
import { Podcast } from './podcast.entity';

@Entity()
@ObjectType()
export class Review extends CoreEntity {
  @Field(type => User)
  @ManyToOne(type => User, user => user.reviews, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  createdBy: User;

  @RelationId((review: Review) => review.createdBy)
  createdById: number;

  @Field(type => Podcast)
  @ManyToOne(type => Podcast, podcast => podcast.reviews, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  podcast: Podcast;

  @RelationId((review: Review) => review.podcast)
  podcastId: number;

  @Field(type => Int)
  @Column()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @Field(type => String)
  @Column()
  @IsString()
  @Length(5, 255)
  comment: string;
}
