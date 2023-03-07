import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import WordsRoute from '@routes/words.route';
import TopicRoute from '@routes/topics.route';
import LessonRoute from '@routes/lessons.route';

import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new WordsRoute(), new TopicRoute(), new LessonRoute()]);

app.listen();
