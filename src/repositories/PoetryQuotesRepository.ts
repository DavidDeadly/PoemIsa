import {
  PoetryQoutesCollection,
  mapSnapshotToPoetryQuote
} from '@/models/PoetryQuotes';

export class PoetryQuotesRepository implements IPoetryQuotesRepository {
  async getAll(): Promise<PoetryQuotesData> {
    const querySnapshot = await PoetryQoutesCollection.get();
    const poetryQuotes = mapSnapshotToPoetryQuote(querySnapshot);

    return {
      count: querySnapshot.size,
      data: poetryQuotes
    };
  }
}
