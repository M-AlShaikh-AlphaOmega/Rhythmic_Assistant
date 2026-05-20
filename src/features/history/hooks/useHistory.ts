import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../shared/api/client';
import { historyKeys } from '../../../shared/api/queryKeys';

export interface AssessmentRecord {
  id: string;
  date: string;
  dominantFrequency: number;
  magnitude: number;
  isTremor: boolean;
}

async function fetchHistory(): Promise<AssessmentRecord[]> {
  const { data } = await apiClient.get<AssessmentRecord[]>('/assessments');
  return data;
}

export function useHistory() {
  return useQuery({
    queryKey: historyKeys.list(),
    queryFn: fetchHistory,
  });
}
