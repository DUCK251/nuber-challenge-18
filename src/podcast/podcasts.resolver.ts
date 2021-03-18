import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PodcastsService } from './podcasts.service';
import { Podcast } from './entities/podcast.entity';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { CoreOutput } from './dtos/output.dto';
import {
  PodcastSearchInput,
  PodcastOutput,
  EpisodesOutput,
  EpisodesSearchInput,
  GetAllPodcastsOutput,
} from './dtos/podcast.dto';
import { UpdatePodcastInput } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dtos/create-episode.dto';
import { UpdateEpisodeInput } from './dtos/update-episode.dto';
import { Role } from 'src/auth/role.decorator';
import {
  SearchPodcastInput,
  SearchPodcastOutput,
} from './dtos/search-podcast.dto';
import {
  CreateReviewInput,
  CreateReviewOutput,
} from './dtos/create-review.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  SubscribePodcastInput,
  SubscribePodcastOutput,
} from './dtos/subscribe-podcast.dto';
import {
  SubscriptionsInput,
  SubscriptionsOutput,
} from './dtos/subscription.dto';
import {
  MarkEpisodeAsPlayedInput,
  MarkEpisodeAsPlayedOutput,
} from './dtos/mark-episode.dto';

@Resolver(of => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query(returns => GetAllPodcastsOutput)
  getAllPodcasts(): Promise<GetAllPodcastsOutput> {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation(returns => CreatePodcastOutput)
  @Role(['Host'])
  createPodcast(
    @Args('input') createPodcastInput: CreatePodcastInput,
  ): Promise<CreatePodcastOutput> {
    return this.podcastsService.createPodcast(createPodcastInput);
  }

  @Query(returns => PodcastOutput)
  getPodcast(
    @Args('input') podcastSearchInput: PodcastSearchInput,
  ): Promise<PodcastOutput> {
    return this.podcastsService.getPodcast(podcastSearchInput.id);
  }

  @Mutation(returns => CoreOutput)
  @Role(['Host'])
  deletePodcast(
    @Args('input') podcastSearchInput: PodcastSearchInput,
  ): Promise<CoreOutput> {
    return this.podcastsService.deletePodcast(podcastSearchInput.id);
  }

  @Mutation(returns => CoreOutput)
  @Role(['Host'])
  updatePodcast(
    @Args('input') updatePodcastInput: UpdatePodcastInput,
  ): Promise<CoreOutput> {
    return this.podcastsService.updatePodcast(updatePodcastInput);
  }

  @Query(returns => SearchPodcastOutput)
  @Role(['Any'])
  searchPodcasts(
    @Args('input') searchPodcastInput: SearchPodcastInput,
  ): Promise<SearchPodcastOutput> {
    return this.podcastsService.searchPodcastByTitle(searchPodcastInput);
  }

  @Mutation(returns => CreateReviewOutput)
  @Role(['Listener'])
  reviewPodcast(
    @AuthUser() createdBy: User,
    @Args('input') createReviewInput: CreateReviewInput,
  ): Promise<CreateReviewOutput> {
    return this.podcastsService.reviewPodcast(createdBy, createReviewInput);
  }

  @Mutation(returns => SubscribePodcastOutput)
  @Role(['Listener'])
  subscribeToPodcast(
    @AuthUser() user: User,
    @Args('input') subscribePodcastInput: SubscribePodcastInput,
  ): Promise<SubscribePodcastOutput> {
    return this.podcastsService.subscribeToPodcast(user, subscribePodcastInput);
  }

  @Query(returns => SubscriptionsOutput)
  @Role(['Any'])
  seeSubscriptions(
    @Args('input') subscriptionsInput: SubscriptionsInput,
  ): Promise<SubscriptionsOutput> {
    return this.podcastsService.seeSubscriptions(subscriptionsInput);
  }
}

@Resolver(of => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastService: PodcastsService) {}

  @Query(returns => EpisodesOutput)
  getEpisodes(
    @Args('input') podcastSearchInput: PodcastSearchInput,
  ): Promise<EpisodesOutput> {
    return this.podcastService.getEpisodes(podcastSearchInput.id);
  }

  @Mutation(returns => CreateEpisodeOutput)
  @Role(['Host'])
  createEpisode(
    @Args('input') createEpisodeInput: CreateEpisodeInput,
  ): Promise<CreateEpisodeOutput> {
    return this.podcastService.createEpisode(createEpisodeInput);
  }

  @Mutation(returns => CoreOutput)
  @Role(['Host'])
  updateEpisode(
    @Args('input') updateEpisodeInput: UpdateEpisodeInput,
  ): Promise<CoreOutput> {
    return this.podcastService.updateEpisode(updateEpisodeInput);
  }

  @Mutation(returns => CoreOutput)
  @Role(['Host'])
  deleteEpisode(
    @Args('input') episodesSearchInput: EpisodesSearchInput,
  ): Promise<CoreOutput> {
    return this.podcastService.deleteEpisode(episodesSearchInput);
  }

  @Mutation(returns => MarkEpisodeAsPlayedOutput)
  @Role(['Listener'])
  markEpisodeAsPlayed(
    @AuthUser() user: User,
    @Args('input') markEpisodeAsPlayedInput: MarkEpisodeAsPlayedInput,
  ): Promise<MarkEpisodeAsPlayedOutput> {
    return this.podcastService.markEpisodeAsPlayed(
      user,
      markEpisodeAsPlayedInput,
    );
  }
}
