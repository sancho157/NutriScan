import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BarChart } from 'react-native-gifted-charts';
import { getHistory } from '../storage/scanHistoryStorage';
import { useTheme } from '../contexts/themeContext';

const { width } = Dimensions.get('window');

export const StatisticsScreen = () => {
  const { colors, theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [nutriScoreData, setNutriScoreData] = useState<any[]>([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [totalScans, setTotalScans] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadStatistics();
    }, [])
  );

  const loadStatistics = async () => {
    setLoading(true);
    const history = await getHistory();
    setTotalScans(history.length);

    const scoreCount: Record<string, number> = { a: 0, b: 0, c: 0, d: 0, e: 0 };
    history.forEach(item => {
      const grade = item.nutriscore_grade?.toLowerCase();
      if (grade && Object.prototype.hasOwnProperty.call(scoreCount, grade)) {
        scoreCount[grade]++;
      }
    });

    const chartData = [
      { label: 'A', value: scoreCount.a, frontColor: colors.nutriA },
      { label: 'B', value: scoreCount.b, frontColor: colors.nutriB },
      { label: 'C', value: scoreCount.c, frontColor: colors.nutriC },
      { label: 'D', value: scoreCount.d, frontColor: colors.nutriD },
      { label: 'E', value: scoreCount.e, frontColor: colors.nutriE },
    ];
    setNutriScoreData(chartData);

    const last7Days = getLast7Days();
    const dailyCount: Record<string, number> = {};
    last7Days.forEach(day => { dailyCount[day] = 0; });
    history.forEach(item => {
      const date = new Date(item.scannedAt).toISOString().split('T')[0];
      if (dailyCount[date] !== undefined) dailyCount[date]++;
    });

    const weeklyChartData = last7Days.map(day => ({
      label: day.slice(5),
      value: dailyCount[day],
      frontColor: '#0A84FF',
    }));
    setWeeklyData(weeklyChartData);
    setLoading(false);
  };

  const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.buttonPrimary} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.totalText, { color: colors.text }]}>
        Total de escaneamentos: {totalScans}
      </Text>

      <Text style={[styles.title, { color: colors.text }]}>
        Distribuicao Nutri-Score
      </Text>
      {nutriScoreData.some(d => d.value > 0) ? (
        <BarChart
          data={nutriScoreData}
          width={width - 60}
          height={220}
          barWidth={45}
          spacing={15}
          isAnimated
          yAxisLabelPrefix=""
          yAxisTextStyle={{ color: colors.textSecondary }}
          xAxisLabelTextStyle={{ color: colors.text, fontWeight: 'bold' }}
          noOfSections={4}
        />
      ) : (
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          Nenhum produto com Nutri-Score registrado.
        </Text>
      )}

      <Text style={[styles.title, { color: colors.text, marginTop: 30 }]}>
        Evolucao (ultimos 7 dias)
      </Text>
      {weeklyData.some(d => d.value > 0) ? (
        <BarChart
          data={weeklyData}
          width={width - 60}
          height={220}
          barWidth={35}
          spacing={12}
          isAnimated
          yAxisLabelPrefix=""
          yAxisTextStyle={{ color: colors.textSecondary }}
          xAxisLabelTextStyle={{ color: colors.text }}
          noOfSections={4}
        />
      ) : (
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          Nenhum escaneamento nos ultimos 7 dias.
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  totalText: { fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 14 },
});