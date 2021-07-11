import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Area, AreaChart, Line, LineChart, CartesianGrid, ReferenceArea, ResponsiveContainer, XAxis, YAxis } from "recharts";
import getPoints from "./data";
import moment from "moment";

const getXAxisTicks = () => {
	const startDate = new Date(2020, 0, 26);
	const currentDate = new Date();

	const ticks = [];

	let date = startDate;
	while (date.getTime() < currentDate.getTime()) {
		date = new Date(date.getTime() + 1000 * 60 * 60 * 24);
		// console.log(date);
		if (date.getDate() === 1) {
			// console.log(date);
			ticks.push(date.getTime());
		}
	}
	console.log(ticks);
	return ticks;
};

const Main = props => {
	const [data, setData] = useState([[new Date(), 0]]);
	useEffect(() => {
		getPoints(21).then(points => setData(points));
	}, []);

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<div style={{ height: "95%", width: "95%", position: "absolute" }}>
			<ResponsiveContainer width={"100%"} height={"100%"}>
				<AreaChart data={data}>
					<CartesianGrid strokeDashArray={"1 1"} />
					<XAxis
						dataKey={"x"}
						name={"asd"}
						// type={"date"}
						// tickCount={data.length}
						domain={["dataMin", "dataMax"]}
						interval={"preserveEnd"}
						type={"number"}
						ticks={getXAxisTicks()}
						// axisLine={false}

						tickFormatter={x => `${new Date(x).getMonth() + 1}/${new Date(x).getFullYear()}`}
					/>
					<Area type={"linear"} dataKey={"y"} stroke={"black"} dot={false} fill={"none"} />
					<Area type={"linear"} dataKey={"trend"} stroke={"black"} dot={false} fill={"lightblue"} />

					<YAxis dataKey={"y"} ticks={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]} domain={[0, 1000]} name={"New cases daily"} />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Main;
