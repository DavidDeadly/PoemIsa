interface Poem {
  id: string;
  title: string;
  content: never[];
  html: string;
  text: string;
  likes: number;
  authorUID: string;
}

type PoemDB = Omit<Poem, 'id'>;

type PoemData = Omit<Poem, 'id' | 'likes'>;

type PoemDataCreate = Pick<Poem, 'content' | 'html' | 'text'>;
