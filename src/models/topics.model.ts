import { model, Schema, Document } from 'mongoose';
import { Topic } from '@interfaces/topics.interface';

const topicSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const topicModel = model<Topic & Document>('Topic', topicSchema);

export default topicModel;
