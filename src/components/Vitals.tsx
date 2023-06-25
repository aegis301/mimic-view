import {
	Tooltip,
	CartesianGrid,
	YAxis,
	XAxis,
	Legend,
	ResponsiveContainer,
	ComposedChart,
	Scatter,
	Brush,
	Area,
} from "recharts";
import "../static/Vitals.css";

const CustomTooltip = ({ active, payload }: any) => {
	if (active) {
		try {
			return (
				<div className="custom-tooltip">
					<p className="intro">{`Chart Time: ${payload[0].payload.charttime}`}</p>
					{payload.map((entry: any) => {
						return (
							<p className="label" key={entry.name}>
								{`${entry.name}: ${entry.value}`}
							</p>
						);
					})}
				</div>
			);
		} catch (TypeError) {
			if (payload === null) {
				return <div className="custom-tooltip"></div>;
			} else {
				return (
					<div className="custom-tooltip">
						<p className="intro">{`Chart Time: ${payload[0].payload.charttime}`}</p>
					</div>
				);
			}
		}
	}
	return null;
};

export default function Vitals({
	stayId,
	subjectId,
	data,
}: {
	stayId: string;
	subjectId: string;
	data: any;
}) {
	return (
		<div
			className="Vitals"
			style={{
				height: "100%",
				width: "100%",
			}}
		>
			<header className="Vitals-header">
				<h3>Vitals</h3>
				<p>Subject ID: {subjectId}</p>
				<p>Stay ID: {stayId}</p>
			</header>
			<ResponsiveContainer
				width="100%"
				height="80%"
				minWidth={500}
				minHeight={500}
			>
				<ComposedChart width={1000} height={1000} data={data}>
					<XAxis dataKey="charttime" />
					<YAxis />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip content={<CustomTooltip />} />
					<Legend verticalAlign="top" height={36} />
					<Area
						dataKey="inv_dbp_sbp"
						fill="#e83535"
						type="linear"
						dot
						stroke="#c22b2b"
						connectNulls
						name="SABP/DABP"
					/>
					<Scatter
						dataKey="inv_mbp"
						fill="#c22b2b"
						line
						shape="cross"
						name="MAP"
					/>
					<Scatter
						dataKey="heart_rate"
						fill="#82ca9d"
						line
						shape="cross"
						name="Heart Rate"
					/>
					<Scatter
						dataKey="resp_rate"
						fill="#8884d8"
						line
						shape="cross"
						name="Respiratory Rate"
					/>
					<Scatter
						dataKey="temperature"
						fill="#ffc658"
						line
						shape="cross"
						name="Temperature"
					/>
					<Scatter
						dataKey="spo2"
						fill="#1567eb"
						line
						shape="cross"
						name="SpO2"
					/>
					<Scatter
						dataKey="glucose"
						fill="#068a2b"
						line
						shape="cross"
						name="Glucose"
					/>

					<Brush
						dataKey="charttime"
						height={30}
						stroke="#8884d8"
						strokeWidth={4}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
}
