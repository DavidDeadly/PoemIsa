import { PoetryQoutesCollection, mapSnapshotToPoetryQuote } from '@/models';

export class PoetryQuotesRepository implements IPoetryQuotesRepository {
  static repository: PoetryQuotesRepository;

  private constructor() {}

  static init() {
    this.repository = this.repository || new PoetryQuotesRepository();

    return this.repository;
  }

  async getAll(): Promise<PoetryQuotesData> {
    const querySnapshot = await PoetryQoutesCollection.get();
    const poetryQuotes = mapSnapshotToPoetryQuote(querySnapshot);

    return {
      count: querySnapshot.size,
      data: poetryQuotes
    };
  }
}
