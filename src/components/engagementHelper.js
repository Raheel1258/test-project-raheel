import moment from "moment";

const engagementMessageOverTimeChartOptions = (messageCountList, channels) => {
  // Convert message counts to a nested map: channelId -> date -> count
  const countsByChannelAndDate = new Map();
  messageCountList.forEach(({ count, timeBucket, channelId }) => {
    if (!countsByChannelAndDate.has(channelId)) {
      countsByChannelAndDate.set(channelId, new Map());
    }
    countsByChannelAndDate.get(channelId).set(timeBucket, count);
  });
  // Create a sorted array of all dates
  const allDates = Array.from(
    new Set(messageCountList.map(({ timeBucket }) => timeBucket))
  ).sort();
  // Filter out channels with messages from only one date
  const channelsWithMultipleDates = Array.from(countsByChannelAndDate.entries())
    .filter(([channelId, countsByDate]) => countsByDate.size > 1)
    .map(([channelId]) => channelId);
  // Generate chart series
  const series = channelsWithMultipleDates.map((channelId) => ({
    name: channels.find((ch) => ch.id === channelId).name,
    data: allDates.map(
      (date) => countsByChannelAndDate.get(channelId).get(date) || 0
    ),
  }));
  // Generate Highcharts options
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Engagement Messages Over Time",
    },
    xAxis: {
      categories: allDates.map((date) => moment(date).format("MMM DD, YYYY")), // format dates in 'MMM DD, YYYY' format
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Message Count",
      },
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      headerFormat: "<b>{point.key}</b><br>",
      pointFormat: "{series.name}: {point.y}",
    },
    plotOptions: {
      line: {
        animation: false,
      },
    },
    series,
  };
  return options;
};
export default engagementMessageOverTimeChartOptions;
