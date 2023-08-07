import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import channels from "../constants/channels";
import messageCountList from "../constants/messageCountList";
import engagementMessageOverTimeChartOptions from "./engagementHelper";

const EngagementMessagesOverTime = ()=>{

  const options = engagementMessageOverTimeChartOptions(messageCountList, channels)

	return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default EngagementMessagesOverTime;