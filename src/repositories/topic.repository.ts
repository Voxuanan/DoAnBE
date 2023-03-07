// Topic Repository class

import { Topic } from '@/interfaces/topics.interface';
import topicModel from '@/models/topics.model';
import BaseRepository from './base.repository';

export default class TopicRepository extends BaseRepository<Topic> {
  constructor() {
    super(topicModel);
  }
}
