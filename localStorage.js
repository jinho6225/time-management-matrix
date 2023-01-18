
export function read() {
	const json = localStorage.getItem("time-matrix-data");

	if (!json) {
		return [
			{
				id: 1,
				items: ['Enter to do Things']
			},
			{
				id: 2,
				items: []
			},
			{
				id: 3,
				items: []
			},
      {
				id: 4,
				items: []
			},
		];
	}

	return JSON.parse(json);
}

export function save(data) {
	localStorage.setItem("time-matrix-data", JSON.stringify(data));
}