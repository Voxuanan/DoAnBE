import { model, Schema, Document, PaginateModel, Types } from 'mongoose';
import { Question } from '@interfaces/questions.interface';
import paginate from 'mongoose-paginate-v2';

const questionSchema: Schema = new Schema(
  {
    audio: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    lesson: { type: Types.ObjectId, ref: 'Lesson' },
  },
  { timestamps: true },
);

questionSchema.index({ name: 1, topic: 1 }, { unique: true });
questionSchema.plugin(paginate);

const questionModel = model<Question & Document, PaginateModel<Question & Document>>('Question', questionSchema, 'Question');

export default questionModel;
