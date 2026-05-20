import { Pressable, Text, View } from 'react-native';
import type { TabScreenProps } from '../../../app/navigation/types';
import { useAssessmentStore } from '../store';

export function AssessmentScreen(_props: TabScreenProps<'Assessment'>) {
  const { isRecording, latestResult, startRecording, stopRecording } =
    useAssessmentStore();

  return (
    <View className="flex-1 bg-white px-6">
      <Text className="mt-16 text-3xl font-bold text-gray-900">Assessment</Text>

      <View className="flex-1 items-center justify-center gap-8">
        {latestResult && (
          <View className="w-full rounded-2xl bg-gray-50 p-5">
            <Text className="text-sm text-gray-500">Dominant frequency</Text>
            <Text className="text-2xl font-semibold text-gray-900">
              {latestResult.dominantFrequency.toFixed(1)} Hz
            </Text>
            <Text
              className={`mt-1 text-sm font-medium ${
                latestResult.isTremor ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {latestResult.isTremor ? 'Tremor detected' : 'No tremor detected'}
            </Text>
          </View>
        )}

        <Pressable
          onPress={isRecording ? stopRecording : startRecording}
          className={`h-40 w-40 items-center justify-center rounded-full ${
            isRecording ? 'bg-red-500' : 'bg-indigo-500'
          }`}
        >
          <Text className="text-lg font-semibold text-white">
            {isRecording ? 'Stop' : 'Start'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
