import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
  Label,
  LabelList,
} from "recharts";
import { nanoid } from "nanoid";

export default function Chart(props) {
  const { data, showLabelList, upperDomainValue, chartTitle, label } = props;
  return (
    <div className="content-wrapper" key={nanoid()}>
      <h3 className="chart-title">{chartTitle}</h3>
      <ResponsiveContainer width={"80%"} height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"timestamp"}>
            <Label value={label}></Label>
          </XAxis>
          <YAxis domain={[0, upperDomainValue]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="kWh" fill="#8884d8">
            {showLabelList && <LabelList dataKey="kWh" position="top" />}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

{
  /* <ResponsiveContainer width={"80%"} height={400}>
      <LineChart
        width={400}
        height={400}
        data={element}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis domain={[0, 60]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="kWh" stroke="#8884d8" />
      </LineChart>
      </ResponsiveContainer> */
}
