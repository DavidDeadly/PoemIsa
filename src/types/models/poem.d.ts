import { Timestamp } from '@google-cloud/firestore';

interface Poem {
  id: string;
  title: string;
  content: never[];
  html: string;
  text: string;
  usersLiked: string[];
  likes: number;
  createdAt: Date;
  author: Author;
}

type PoemDB = Omit<Poem, 'id' | 'createdAt'> & { createdAt: Timestamp };

type PoemData = Omit<Poem, 'id' | 'likes' | 'usersLiked' | 'createdAt'>;

type PoemDataCreate = Pick<Poem, 'title' | 'content' | 'html' | 'text'>;

type Author = Pick<DBUser, 'id' | 'displayName' | 'photoURL'>;
