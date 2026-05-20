export const historyKeys = {
  all: ['history'] as const,
  list: () => [...historyKeys.all, 'list'] as const,
  detail: (id: string) => [...historyKeys.all, 'detail', id] as const,
};
