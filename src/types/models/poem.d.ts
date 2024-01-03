import { Timestamp } from '@google-cloud/firestore';

interface Poem {
  id: string;
  title: string;
  content: never[];
  html: string;
  text: string;
  usersLiked: string[];
  createdAt: Date;
  author: Author;
}

type PoemDB = Omit<Poem, 'id' | 'createdAt'> & { createdAt: Timestamp };

type PoemData = Omit<Poem, 'id' | 'usersLiked' | 'createdAt'>;

type PoemNoti = Pick<Poem, 'id' | 'title' | 'text'> & {
  authorPic: string;
  summary: string;
};

type PoemDataCreate = Pick<Poem, 'title' | 'content' | 'html' | 'text'>;

type Author = Pick<DBUser, 'id' | 'displayName' | 'photoURL'>;
