var GameAssets = (function() {
	"use strict";

	var StandardPackage = {

	};
	var ClassicPackage = {
		name: "Classic",
		backgroundColor: "#bbada0",
		cellBackgroundColor: "rgba(238, 228, 218, 0.35)",
		tileBackgroundColor: {
			"2": "#eee4da",
			"4": "#ede0c8",
			"8": "#f2b179",
			"16": "#f59563",
			"32": "#f67c5f",
			"64": "#f65e3b",
			"128": "#edcf72",
			"256": "#edcc61",
			"512": "#edc850",
			"1024": "#edc53f",
			"2048": "#edc22e"
		},
		tileTextColor: {
			"2": "#776e65",
			"4": "#776e65",
			"8": "#f9f6f2",
			"16": "#f9f6f2",
			"32": "#f9f6f2",
			"64": "#f9f6f2",
			"128": "#f9f6f2",
			"256": "#f9f6f2",
			"512": "#f9f6f2",
			"1024": "#f9f6f2",
			"2048": "#f9f6f2"
		},
		score: {
			backgroundColor: "rgb(186, 173, 160)",
			titleColor: "rgb(237, 228, 218)",
			valueColor: "rgb(255, 255, 255)"
		},
		gameOver: {
			backgroundColor: "rgba(238, 228, 218, 0.5)",
			textColor: "#776e65"
		},
		gameWon: {
			backgroundColor: "rgba(237, 194, 46, 0.5)",
			textColor: "#f9f6f2"
		},
		restart: {
			backgroundColor: "rgb(143, 122, 102)",
			textColor: "rgb(255, 255, 255)"
		}
	};

	// Public interface
	return {
		getStandardPackage: function() {
			return StandardPackage;
		},
		getClassicPackage: function() {
			return ClassicPackage;
		}
	};
})();
