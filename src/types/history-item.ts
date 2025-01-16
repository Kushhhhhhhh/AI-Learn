export type HistoryItem = {
    _id: string;
    type: string;
    query: string;
    response: Record<string, string | number | boolean | null | object>;
    createdAt: string;
  }