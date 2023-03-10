// Question Repository class

import { Question } from '@/interfaces/questions.interface';
import questionModel from '@/models/questions.model';
import { Document } from 'mongoose';
import BaseRepository from './base.repository';

export default class QuestionRepository extends BaseRepository<Question & Document> {
  constructor() {
    super(questionModel);
  }
}
