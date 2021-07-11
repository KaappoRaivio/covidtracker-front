const url =
	"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

const getSeries = (data, country) => {
	for (const row of data.split("\n")) {
		if (row.split(",")[1] === "Finland") {
			return row.split(",");
		}
	}
};

const getLegend = data => {
	return data.split("\n")[0].split(",");
};

const getPoints = async (period = 14) => {
	const res = await fetch(url);
	const data = await res.text();

	const legend = getLegend(data).slice(4);

	const series = getSeries(data, "Finland").slice(4);

	const points = legend.map((item, index) => [item, series[index] - series[index - 1] || 0]);
	return points.map((point, index) => {
		const [month, day, year] = point[0].split("/");
		// if (day === 1) {
		return {
			x: new Date(parseInt(`20${year}`), parseInt(month - 1), parseInt(day)).getTime(),
			name: point[0],
			y: point[1],
			trend:
				index < Math.floor(period / 2) || index >= points.length - Math.ceil(period / 2)
					? 0
					: points
							.slice(index - Math.floor(period / 2), index + Math.ceil(period / 2))
							.map(point => point[1])
							.reduce((a, b) => a + b) / period,
		};
	});
};

export default getPoints;
