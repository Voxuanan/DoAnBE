import { model, Schema, Document, PaginateModel } from 'mongoose';
import { Lesson } from '@interfaces/lessons.interface';
import paginate from 'mongoose-paginate-v2';

const lessonSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

lessonSchema.plugin(paginate);

const lessonModel = model<Lesson & Document, PaginateModel<Lesson & Document>>('Lesson', lessonSchema, 'Lesson');

export default lessonModel;
