import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Label,
  LabelList,
} from "recharts";

export default function Chart(props) {
  const {
    data,
    showLabelList,
    upperDomainValue,
    chartTitle,
    label,
    dataKey,
    keyProp,
  } = props;
  return (
    <div className="content-wrapper" key={keyProp}>
      <h3 className="chart-title">{chartTitle}</h3>
      <ResponsiveContainer width={"80%"} height={400}>
        <BarChart data={data} margin={{ right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKey}>
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
