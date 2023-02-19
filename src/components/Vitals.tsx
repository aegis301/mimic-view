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
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";
import "../static/Vitals.css";
import InvertedTriangleSVG from "./TriangleSVG";

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
			console.log(payload);
			if (payload.length === 0) {
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

export default function Vitals() {
	const [subject_id, setSubject_id] = useState("");
	const [stay_id, setStay_id] = useState("");
	const [data, setData] = useState<
		{
			charttime: string;
			heart_rate: number;
			sbp: number;
			dbp: number;
			mbp: number;
		}[]
	>([]);

	const convertData = (data: any) => {
		// iterate over index of length of data and convert to array of objects
		const outData = [];
		for (let i = 0; i < data.charttime.length; i++) {
			outData.push({
				charttime: data.charttime[i],
				heart_rate: data.heart_rate[i],
				sbp: data.sbp[i],
				dbp: data.dbp[i],
				mbp: data.mbp[i],
			});
		}
		return outData;
	};

	useEffect(() => {
		const fetchData = async () => {
			axios
				.get("http://localhost:8000/vitalsigns/31921426")
				.then((response) => {
					const { subject_id, stay_id, ...dataArrays } = response.data.payload; // isolate the data arrays
					setSubject_id(subject_id);
					setStay_id(stay_id);
					// convert the data arrays to an array of objects
					setData(convertData(dataArrays));
				})
				.catch((error) => {
					console.log(error);
				});
		};
		fetchData();
	}, []);

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
				<p>Subject ID: {subject_id}</p>
				<p>Stay ID: {stay_id}</p>
			</header>
			<ResponsiveContainer
				width="100%"
				height="80%"
				minWidth={500}
				minHeight={500}
			>
				<ComposedChart width={1000} height={500} data={data}>
					<XAxis dataKey="charttime" />
					<YAxis />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip content={<CustomTooltip />} />
					<Legend verticalAlign="top" height={36} />
					<Scatter dataKey="heart_rate" fill="#82ca9d" line shape="cross" />
					<Scatter
						dataKey="sbp"
						fill="#e83535"
						line
						shape="<InvertedTriangleSVG />"
					/>
					<Brush dataKey="charttime" height={30} stroke="#8884d8" />
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
}
