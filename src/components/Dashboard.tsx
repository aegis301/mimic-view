import React from "react";
import "../static/Dashboard.css";
import Vitals from "./Vitals";
import { Button, TextField } from "@mui/material";
import axios from "axios";

export default function Dashboard() {
	const [stayId, setStayId] = React.useState<string>("31921426");
	const [newStayId, setNewStayId] = React.useState<string>("");
	const [subjectId, setSubjectId] = React.useState<string>("");
	const [data, setData] = React.useState<
		{
			charttime: string;
			heart_rate: number;
			inv_dbp_sbp: number[];
			inv_mbp: number;
		}[]
	>([]);

	const convertData = (data: any) => {
		// iterate over index of length of data and convert to array of objects
		const outData = [];
		for (let i = 0; i < data.charttime.length; i++) {
			outData.push({
				charttime: data.charttime[i],
				heart_rate: data.heart_rate[i],
				inv_dbp_sbp: [data.sbp[i], data.dbp[i]],
				inv_mbp: data.mbp[i],
			});
		}
		return outData;
	};

	React.useEffect(() => {
		const fetchData = async () => {
			axios
				.get("http://localhost:8000/vitalsigns/31921426")
				.then((response) => {
					const { subject_id, stay_id, ...dataArrays } = response.data.payload; // isolate the data arrays
					setSubjectId(subject_id);
					setStayId(stay_id);
					// convert the data arrays to an array of objects
					setData(convertData(dataArrays));
				})
				.catch((error) => {
					console.log(error);
				});
		};
		fetchData();
	}, [setStayId, setSubjectId]);

	const handleSearch = (newStayId: string): void => {};

	return (
		<div className="Dashboard">
			<div>
				<form>
					<TextField
						id="stayId"
						label="Stay ID"
						variant="outlined"
						onChange={(e) => {
							e.preventDefault();
							console.log((e.target as HTMLInputElement).value);
							setNewStayId((e.target as HTMLInputElement).value);
						}}
					/>
					<Button onClick={() => handleSearch(newStayId)} variant="contained">
						Search
					</Button>
				</form>
			</div>

			<Vitals
				stayId={stayId}
				setStayId={setStayId}
				subjectId={subjectId}
				setSubjectId={setSubjectId}
				data={data}
			/>
		</div>
	);
}
