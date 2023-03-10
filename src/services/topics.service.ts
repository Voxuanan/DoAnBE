import TopicRepository from '@/repositories/topic.repository';
import { CreateTopicDto } from '@dtos/topics.dto';
import { HttpException } from '@exceptions/HttpException';
import { Topic } from '@interfaces/topics.interface';
import topicModel from '@models/topics.model';
import { isEmpty } from '@utils/util';

class TopicService {
  private readonly topics = topicModel;
  private readonly topicRepository: TopicRepository;

  constructor() {
    this.topicRepository = new TopicRepository();
  }

  public async findAllTopic(): Promise<Topic[]> {
    const topics: Topic[] = await this.topicRepository.findAll({});
    return topics;
  }

  public async findTopicById(topicId: string): Promise<Topic> {
    if (isEmpty(topicId)) throw new HttpException(400, 'TopicId is empty');

    const findTopic: Topic = await this.topics.findOne({ _id: topicId });
    if (!findTopic) throw new HttpException(409, "Topic doesn't exist");
    return findTopic;
  }

  public async createTopic(topicData: CreateTopicDto): Promise<Topic> {
    if (isEmpty(topicData)) throw new HttpException(400, 'TopicData is empty');

    const findTopic: Topic = await this.topics.findOne({ name: topicData.name });
    if (findTopic) throw new HttpException(409, `This name ${topicData.name} already exists`);

    const createTopicData: Topic = await this.topics.create({ ...topicData });

    return createTopicData;
  }

  public async updateTopic(topicId: string, topicData: CreateTopicDto): Promise<Topic> {
    if (isEmpty(topicData)) throw new HttpException(400, 'TopicData is empty');

    if (topicData.name) {
      const findTopic: Topic = await this.topics.findOne({ name: topicData.name });
      if (findTopic && findTopic._id != topicId) throw new HttpException(409, `This name ${topicData.name} already exists`);
    }

    const updateTopicById: Topic = await this.topics.findByIdAndUpdate({ _id: topicId }, topicData, { new: true });
    if (!updateTopicById) throw new HttpException(409, "Topic doesn't exist");

    return updateTopicById;
  }

  public async deleteTopic(topicId: string): Promise<Topic> {
    const deleteTopicById: Topic = await this.topics.findByIdAndDelete(topicId);
    if (!deleteTopicById) throw new HttpException(409, "Topic doesn't exist");

    return deleteTopicById;
  }
}

export default TopicService;
