// export default function CustomTooltip ({ active, payload }: any) => {
// 	if (active) {
// 		try {
// 			return (
// 				<div className="custom-tooltip">
// 					<p className="intro">{`Chart Time: ${payload[0].payload.charttime}`}</p>
// 					{payload.map((entry: any) => {
// 						return (
// 							<p className="label" key={entry.name}>
// 								{`${entry.name}: ${entry.value}`}
// 							</p>
// 						);
// 					})}
// 				</div>
// 			);
// 		} catch (TypeError) {
// 			if (payload === null) {
// 				return <div className="custom-tooltip"></div>;
// 			} else {
// 				return (
// 					<div className="custom-tooltip">
// 						<p className="intro">{`Chart Time: ${payload[0].payload.charttime}`}</p>
// 					</div>
// 				);
// 			}
// 		}
// 	}
// 	return null;
// };
export {};
