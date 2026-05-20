import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import type { TabScreenProps } from '../../../app/navigation/types';
import { useHistory } from '../hooks/useHistory';

export function HistoryScreen(_props: TabScreenProps<'History'>) {
  const { data, isLoading, isError } = useHistory();

  return (
    <View className="flex-1 bg-white px-6">
      <Text className="mt-16 text-3xl font-bold text-gray-900">History</Text>

      {isLoading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#6366f1" />
        </View>
      )}

      {isError && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500">Failed to load history.</Text>
        </View>
      )}

      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerClassName="py-6 gap-3"
          renderItem={({ item }) => (
            <View className="rounded-xl bg-gray-50 p-4">
              <Text className="text-sm text-gray-500">{item.date}</Text>
              <Text className="mt-1 text-base font-semibold text-gray-900">
                {item.dominantFrequency.toFixed(1)} Hz
              </Text>
              <Text
                className={`text-sm ${item.isTremor ? 'text-red-500' : 'text-green-500'}`}
              >
                {item.isTremor ? 'Tremor detected' : 'No tremor detected'}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text className="mt-12 text-center text-gray-400">
              No assessments yet.
            </Text>
          }
        />
      )}
    </View>
  );
}
