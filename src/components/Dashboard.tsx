import React from "react";
import "../static/Dashboard.css";
import Vitals from "./Vitals";

export default function Dashboard() {
	const [stayId, setStayId] = React.useState<string>("31921426");
	const [subjectId, setSubjectId] = React.useState<string>("");

	return (
		<div className="Dashboard">
			<Vitals
				stayId={stayId}
				setStayId={setStayId}
				subjectId={subjectId}
				setSubjectId={setSubjectId}
			/>
		</div>
	);
}
