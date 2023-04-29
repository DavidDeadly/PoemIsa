type PoetryQuotesData = {
  count: number;
  data: PoetryQuotesFS[];
};

interface IPoetryQuotesRepository {
  getAll(): Promise<PoetryQuotesData>;
}
