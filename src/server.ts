import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import UtilsRoute from '@/routes/utils.route';
import TopicRoute from '@routes/topics.route';
import LessonRoute from '@routes/lessons.route';
import QuestionRoute from '@routes/question.route';

import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new UtilsRoute(),
  new TopicRoute(),
  new LessonRoute(),
  new QuestionRoute(),
]);

app.listen();
