import { Timestamp } from '@google-cloud/firestore';

interface Poem {
  id: string;
  title: string;
  content: never[];
  html: string;
  text: string;
  likes: string[];
  createdAt: Date;
  author: Author;
}

type PoemDB = Omit<Poem, 'id' | 'createdAt'> & { createdAt: Timestamp };

type PoemData = Omit<Poem, 'id' | 'likes' | 'createdAt'>;

type PoemDataCreate = Pick<Poem, 'content' | 'html' | 'text'>;

type Author = Pick<DBUser, 'id' | 'displayName' | 'photoURL'>;
