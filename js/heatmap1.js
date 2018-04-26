$(function () {
    $('#heatmap1').highcharts(	
	{
	    "title": {
		"text": "Differentially Expressed Genes Heatmap"
	    },
	    "yAxis": {
		"title": {
		    "text": ""
		},
		"categories": ["10", "9", "12", "11", "5", "7", "13", "6", "8", "2", "4", "1", "3"],
		"reversed": true
	    },
	    "credits": {
		"enabled": false
	    },
	    "exporting": {
		"enabled": false
	    },
	    "plotOptions": {
		"series": {
		    "label": {
			"enabled": false
		    },
		    "turboThreshold": 0,
		    "showInLegend": {
			"x": {},
			"y": {},
			"value": {}
		    },
		    "boderWidth": 0,
		    "dataLabels": {
			"enabled": false
		    }
		},
		"treemap": {
		    "layoutAlgorithm": "squarified"
		}
	    },
	    "series": [
		{
		    "data": [
			{
			    "x": 0,
			    "y": 0,
			    "value": 3.3275,
			    "name": "HES4 ~ 10"
			},
			{
			    "x": 0,
			    "y": 1,
			    "value": -0.2465,
			    "name": "HES4 ~ 9"
			},
			{
			    "x": 0,
			    "y": 2,
			    "value": -0.2885,
			    "name": "HES4 ~ 12"
			},
			{
			    "x": 0,
			    "y": 3,
			    "value": -0.2885,
			    "name": "HES4 ~ 11"
			},
			{
			    "x": 0,
			    "y": 4,
			    "value": -0.2885,
			    "name": "HES4 ~ 5"
			},
			{
			    "x": 0,
			    "y": 5,
			    "value": -0.2885,
			    "name": "HES4 ~ 7"
			},
			{
			    "x": 0,
			    "y": 6,
			    "value": -0.2885,
			    "name": "HES4 ~ 13"
			},
			{
			    "x": 0,
			    "y": 7,
			    "value": -0.2236,
			    "name": "HES4 ~ 6"
			},
			{
			    "x": 0,
			    "y": 8,
			    "value": -0.2885,
			    "name": "HES4 ~ 8"
			},
			{
			    "x": 0,
			    "y": 9,
			    "value": -0.2885,
			    "name": "HES4 ~ 2"
			},
			{
			    "x": 0,
			    "y": 10,
			    "value": -0.2609,
			    "name": "HES4 ~ 4"
			},
			{
			    "x": 0,
			    "y": 11,
			    "value": -0.2885,
			    "name": "HES4 ~ 1"
			},
			{
			    "x": 0,
			    "y": 12,
			    "value": -0.2885,
			    "name": "HES4 ~ 3"
			},
			{
			    "x": 1,
			    "y": 0,
			    "value": 2.1213,
			    "name": "ISG15 ~ 10"
			},
			{
			    "x": 1,
			    "y": 1,
			    "value": 0.9922,
			    "name": "ISG15 ~ 9"
			},
			{
			    "x": 1,
			    "y": 2,
			    "value": -0.6928,
			    "name": "ISG15 ~ 12"
			},
			{
			    "x": 1,
			    "y": 3,
			    "value": 0.7962,
			    "name": "ISG15 ~ 11"
			},
			{
			    "x": 1,
			    "y": 4,
			    "value": 0.4223,
			    "name": "ISG15 ~ 5"
			},
			{
			    "x": 1,
			    "y": 5,
			    "value": 0.4345,
			    "name": "ISG15 ~ 7"
			},
			{
			    "x": 1,
			    "y": 6,
			    "value": -1.9706,
			    "name": "ISG15 ~ 13"
			},
			{
			    "x": 1,
			    "y": 7,
			    "value": -0.7256,
			    "name": "ISG15 ~ 6"
			},
			{
			    "x": 1,
			    "y": 8,
			    "value": -0.2441,
			    "name": "ISG15 ~ 8"
			},
			{
			    "x": 1,
			    "y": 9,
			    "value": -0.5247,
			    "name": "ISG15 ~ 2"
			},
			{
			    "x": 1,
			    "y": 10,
			    "value": -0.5323,
			    "name": "ISG15 ~ 4"
			},
			{
			    "x": 1,
			    "y": 11,
			    "value": -0.0816,
			    "name": "ISG15 ~ 1"
			},
			{
			    "x": 1,
			    "y": 12,
			    "value": 0.0051,
			    "name": "ISG15 ~ 3"
			},
			{
			    "x": 2,
			    "y": 0,
			    "value": 2.3595,
			    "name": "RP3-395M20.12 ~ 10"
			},
			{
			    "x": 2,
			    "y": 1,
			    "value": -0.6296,
			    "name": "RP3-395M20.12 ~ 9"
			},
			{
			    "x": 2,
			    "y": 2,
			    "value": -0.9293,
			    "name": "RP3-395M20.12 ~ 12"
			},
			{
			    "x": 2,
			    "y": 3,
			    "value": 1.6352,
			    "name": "RP3-395M20.12 ~ 11"
			},
			{
			    "x": 2,
			    "y": 4,
			    "value": -0.0431,
			    "name": "RP3-395M20.12 ~ 5"
			},
			{
			    "x": 2,
			    "y": 5,
			    "value": -0.097,
			    "name": "RP3-395M20.12 ~ 7"
			},
			{
			    "x": 2,
			    "y": 6,
			    "value": 0.8144,
			    "name": "RP3-395M20.12 ~ 13"
			},
			{
			    "x": 2,
			    "y": 7,
			    "value": -0.7339,
			    "name": "RP3-395M20.12 ~ 6"
			},
			{
			    "x": 2,
			    "y": 8,
			    "value": -0.5711,
			    "name": "RP3-395M20.12 ~ 8"
			},
			{
			    "x": 2,
			    "y": 9,
			    "value": -0.3489,
			    "name": "RP3-395M20.12 ~ 2"
			},
			{
			    "x": 2,
			    "y": 10,
			    "value": -0.5638,
			    "name": "RP3-395M20.12 ~ 4"
			},
			{
			    "x": 2,
			    "y": 11,
			    "value": -0.693,
			    "name": "RP3-395M20.12 ~ 1"
			},
			{
			    "x": 2,
			    "y": 12,
			    "value": -0.1994,
			    "name": "RP3-395M20.12 ~ 3"
			},
			{
			    "x": 3,
			    "y": 0,
			    "value": 1.8404,
			    "name": "TNFRSF14 ~ 10"
			},
			{
			    "x": 3,
			    "y": 1,
			    "value": -0.3287,
			    "name": "TNFRSF14 ~ 9"
			},
			{
			    "x": 3,
			    "y": 2,
			    "value": -0.6761,
			    "name": "TNFRSF14 ~ 12"
			},
			{
			    "x": 3,
			    "y": 3,
			    "value": -0.8741,
			    "name": "TNFRSF14 ~ 11"
			},
			{
			    "x": 3,
			    "y": 4,
			    "value": 0.1599,
			    "name": "TNFRSF14 ~ 5"
			},
			{
			    "x": 3,
			    "y": 5,
			    "value": 0.3878,
			    "name": "TNFRSF14 ~ 7"
			},
			{
			    "x": 3,
			    "y": 6,
			    "value": -2.3997,
			    "name": "TNFRSF14 ~ 13"
			},
			{
			    "x": 3,
			    "y": 7,
			    "value": 0.5661,
			    "name": "TNFRSF14 ~ 6"
			},
			{
			    "x": 3,
			    "y": 8,
			    "value": 0.0598,
			    "name": "TNFRSF14 ~ 8"
			},
			{
			    "x": 3,
			    "y": 9,
			    "value": 0.1326,
			    "name": "TNFRSF14 ~ 2"
			},
			{
			    "x": 3,
			    "y": 10,
			    "value": -0.2438,
			    "name": "TNFRSF14 ~ 4"
			},
			{
			    "x": 3,
			    "y": 11,
			    "value": 0.7168,
			    "name": "TNFRSF14 ~ 1"
			},
			{
			    "x": 3,
			    "y": 12,
			    "value": 0.659,
			    "name": "TNFRSF14 ~ 3"
			},
			{
			    "x": 4,
			    "y": 0,
			    "value": 2.6722,
			    "name": "VAMP3 ~ 10"
			},
			{
			    "x": 4,
			    "y": 1,
			    "value": 0.7163,
			    "name": "VAMP3 ~ 9"
			},
			{
			    "x": 4,
			    "y": 2,
			    "value": 0.3809,
			    "name": "VAMP3 ~ 12"
			},
			{
			    "x": 4,
			    "y": 3,
			    "value": -0.1995,
			    "name": "VAMP3 ~ 11"
			},
			{
			    "x": 4,
			    "y": 4,
			    "value": -0.6973,
			    "name": "VAMP3 ~ 5"
			},
			{
			    "x": 4,
			    "y": 5,
			    "value": -0.5233,
			    "name": "VAMP3 ~ 7"
			},
			{
			    "x": 4,
			    "y": 6,
			    "value": 1.0555,
			    "name": "VAMP3 ~ 13"
			},
			{
			    "x": 4,
			    "y": 7,
			    "value": -0.4268,
			    "name": "VAMP3 ~ 6"
			},
			{
			    "x": 4,
			    "y": 8,
			    "value": -0.3504,
			    "name": "VAMP3 ~ 8"
			},
			{
			    "x": 4,
			    "y": 9,
			    "value": -0.4039,
			    "name": "VAMP3 ~ 2"
			},
			{
			    "x": 4,
			    "y": 10,
			    "value": -1.0062,
			    "name": "VAMP3 ~ 4"
			},
			{
			    "x": 4,
			    "y": 11,
			    "value": -0.4275,
			    "name": "VAMP3 ~ 1"
			},
			{
			    "x": 4,
			    "y": 12,
			    "value": -0.79,
			    "name": "VAMP3 ~ 3"
			},
			{
			    "x": 5,
			    "y": 0,
			    "value": 3.1823,
			    "name": "TNFRSF8 ~ 10"
			},
			{
			    "x": 5,
			    "y": 1,
			    "value": 0.5356,
			    "name": "TNFRSF8 ~ 9"
			},
			{
			    "x": 5,
			    "y": 2,
			    "value": 0.2062,
			    "name": "TNFRSF8 ~ 12"
			},
			{
			    "x": 5,
			    "y": 3,
			    "value": -0.4018,
			    "name": "TNFRSF8 ~ 11"
			},
			{
			    "x": 5,
			    "y": 4,
			    "value": -0.4018,
			    "name": "TNFRSF8 ~ 5"
			},
			{
			    "x": 5,
			    "y": 5,
			    "value": -0.4018,
			    "name": "TNFRSF8 ~ 7"
			},
			{
			    "x": 5,
			    "y": 6,
			    "value": -0.4018,
			    "name": "TNFRSF8 ~ 13"
			},
			{
			    "x": 5,
			    "y": 7,
			    "value": -0.3428,
			    "name": "TNFRSF8 ~ 6"
			},
			{
			    "x": 5,
			    "y": 8,
			    "value": -0.4018,
			    "name": "TNFRSF8 ~ 8"
			},
			{
			    "x": 5,
			    "y": 9,
			    "value": -0.4018,
			    "name": "TNFRSF8 ~ 2"
			},
			{
			    "x": 5,
			    "y": 10,
			    "value": -0.4018,
			    "name": "TNFRSF8 ~ 4"
			},
			{
			    "x": 5,
			    "y": 11,
			    "value": -0.3667,
			    "name": "TNFRSF8 ~ 1"
			},
			{
			    "x": 5,
			    "y": 12,
			    "value": -0.4018,
			    "name": "TNFRSF8 ~ 3"
			},
			{
			    "x": 6,
			    "y": 0,
			    "value": 0.5112,
			    "name": "RBP7 ~ 10"
			},
			{
			    "x": 6,
			    "y": 1,
			    "value": 3.2317,
			    "name": "RBP7 ~ 9"
			},
			{
			    "x": 6,
			    "y": 2,
			    "value": -0.2027,
			    "name": "RBP7 ~ 12"
			},
			{
			    "x": 6,
			    "y": 3,
			    "value": -0.3559,
			    "name": "RBP7 ~ 11"
			},
			{
			    "x": 6,
			    "y": 4,
			    "value": -0.3559,
			    "name": "RBP7 ~ 5"
			},
			{
			    "x": 6,
			    "y": 5,
			    "value": -0.3559,
			    "name": "RBP7 ~ 7"
			},
			{
			    "x": 6,
			    "y": 6,
			    "value": -0.3559,
			    "name": "RBP7 ~ 13"
			},
			{
			    "x": 6,
			    "y": 7,
			    "value": -0.3559,
			    "name": "RBP7 ~ 6"
			},
			{
			    "x": 6,
			    "y": 8,
			    "value": -0.3559,
			    "name": "RBP7 ~ 8"
			},
			{
			    "x": 6,
			    "y": 9,
			    "value": -0.3455,
			    "name": "RBP7 ~ 2"
			},
			{
			    "x": 6,
			    "y": 10,
			    "value": -0.3559,
			    "name": "RBP7 ~ 4"
			},
			{
			    "x": 6,
			    "y": 11,
			    "value": -0.3479,
			    "name": "RBP7 ~ 1"
			},
			{
			    "x": 6,
			    "y": 12,
			    "value": -0.3559,
			    "name": "RBP7 ~ 3"
			},
			{
			    "x": 7,
			    "y": 0,
			    "value": 0.4464,
			    "name": "PGD ~ 10"
			},
			{
			    "x": 7,
			    "y": 1,
			    "value": 2.727,
			    "name": "PGD ~ 9"
			},
			{
			    "x": 7,
			    "y": 2,
			    "value": 1.448,
			    "name": "PGD ~ 12"
			},
			{
			    "x": 7,
			    "y": 3,
			    "value": -0.5076,
			    "name": "PGD ~ 11"
			},
			{
			    "x": 7,
			    "y": 4,
			    "value": -0.4798,
			    "name": "PGD ~ 5"
			},
			{
			    "x": 7,
			    "y": 5,
			    "value": -0.504,
			    "name": "PGD ~ 7"
			},
			{
			    "x": 7,
			    "y": 6,
			    "value": -0.7068,
			    "name": "PGD ~ 13"
			},
			{
			    "x": 7,
			    "y": 7,
			    "value": -0.2602,
			    "name": "PGD ~ 6"
			},
			{
			    "x": 7,
			    "y": 8,
			    "value": -0.3137,
			    "name": "PGD ~ 8"
			},
			{
			    "x": 7,
			    "y": 9,
			    "value": -0.4107,
			    "name": "PGD ~ 2"
			},
			{
			    "x": 7,
			    "y": 10,
			    "value": -0.4988,
			    "name": "PGD ~ 4"
			},
			{
			    "x": 7,
			    "y": 11,
			    "value": -0.4879,
			    "name": "PGD ~ 1"
			},
			{
			    "x": 7,
			    "y": 12,
			    "value": -0.452,
			    "name": "PGD ~ 3"
			},
			{
			    "x": 8,
			    "y": 0,
			    "value": 1.14,
			    "name": "AGTRAP ~ 10"
			},
			{
			    "x": 8,
			    "y": 1,
			    "value": 2.5689,
			    "name": "AGTRAP ~ 9"
			},
			{
			    "x": 8,
			    "y": 2,
			    "value": 0.5254,
			    "name": "AGTRAP ~ 12"
			},
			{
			    "x": 8,
			    "y": 3,
			    "value": -0.8788,
			    "name": "AGTRAP ~ 11"
			},
			{
			    "x": 8,
			    "y": 4,
			    "value": 0.1117,
			    "name": "AGTRAP ~ 5"
			},
			{
			    "x": 8,
			    "y": 5,
			    "value": 0.6595,
			    "name": "AGTRAP ~ 7"
			},
			{
			    "x": 8,
			    "y": 6,
			    "value": -0.309,
			    "name": "AGTRAP ~ 13"
			},
			{
			    "x": 8,
			    "y": 7,
			    "value": -0.7402,
			    "name": "AGTRAP ~ 6"
			},
			{
			    "x": 8,
			    "y": 8,
			    "value": -0.7393,
			    "name": "AGTRAP ~ 8"
			},
			{
			    "x": 8,
			    "y": 9,
			    "value": -0.588,
			    "name": "AGTRAP ~ 2"
			},
			{
			    "x": 8,
			    "y": 10,
			    "value": -0.628,
			    "name": "AGTRAP ~ 4"
			},
			{
			    "x": 8,
			    "y": 11,
			    "value": -0.712,
			    "name": "AGTRAP ~ 1"
			},
			{
			    "x": 8,
			    "y": 12,
			    "value": -0.4103,
			    "name": "AGTRAP ~ 3"
			},
			{
			    "x": 9,
			    "y": 0,
			    "value": -0.1661,
			    "name": "UBR4 ~ 10"
			},
			{
			    "x": 9,
			    "y": 1,
			    "value": 3.0853,
			    "name": "UBR4 ~ 9"
			},
			{
			    "x": 9,
			    "y": 2,
			    "value": 0.862,
			    "name": "UBR4 ~ 12"
			},
			{
			    "x": 9,
			    "y": 3,
			    "value": -0.4531,
			    "name": "UBR4 ~ 11"
			},
			{
			    "x": 9,
			    "y": 4,
			    "value": -0.6537,
			    "name": "UBR4 ~ 5"
			},
			{
			    "x": 9,
			    "y": 5,
			    "value": -0.2641,
			    "name": "UBR4 ~ 7"
			},
			{
			    "x": 9,
			    "y": 6,
			    "value": 0.004,
			    "name": "UBR4 ~ 13"
			},
			{
			    "x": 9,
			    "y": 7,
			    "value": -0.4387,
			    "name": "UBR4 ~ 6"
			},
			{
			    "x": 9,
			    "y": 8,
			    "value": -0.2619,
			    "name": "UBR4 ~ 8"
			},
			{
			    "x": 9,
			    "y": 9,
			    "value": -0.449,
			    "name": "UBR4 ~ 2"
			},
			{
			    "x": 9,
			    "y": 10,
			    "value": -0.5114,
			    "name": "UBR4 ~ 4"
			},
			{
			    "x": 9,
			    "y": 11,
			    "value": -0.3669,
			    "name": "UBR4 ~ 1"
			},
			{
			    "x": 9,
			    "y": 12,
			    "value": -0.3862,
			    "name": "UBR4 ~ 3"
			},
			{
			    "x": 10,
			    "y": 0,
			    "value": 1.6063,
			    "name": "CDA ~ 10"
			},
			{
			    "x": 10,
			    "y": 1,
			    "value": 2.7709,
			    "name": "CDA ~ 9"
			},
			{
			    "x": 10,
			    "y": 2,
			    "value": -0.3979,
			    "name": "CDA ~ 12"
			},
			{
			    "x": 10,
			    "y": 3,
			    "value": -0.3979,
			    "name": "CDA ~ 11"
			},
			{
			    "x": 10,
			    "y": 4,
			    "value": -0.3979,
			    "name": "CDA ~ 5"
			},
			{
			    "x": 10,
			    "y": 5,
			    "value": -0.3979,
			    "name": "CDA ~ 7"
			},
			{
			    "x": 10,
			    "y": 6,
			    "value": -0.3979,
			    "name": "CDA ~ 13"
			},
			{
			    "x": 10,
			    "y": 7,
			    "value": -0.3979,
			    "name": "CDA ~ 6"
			},
			{
			    "x": 10,
			    "y": 8,
			    "value": -0.3979,
			    "name": "CDA ~ 8"
			},
			{
			    "x": 10,
			    "y": 9,
			    "value": -0.3979,
			    "name": "CDA ~ 2"
			},
			{
			    "x": 10,
			    "y": 10,
			    "value": -0.3979,
			    "name": "CDA ~ 4"
			},
			{
			    "x": 10,
			    "y": 11,
			    "value": -0.3979,
			    "name": "CDA ~ 1"
			},
			{
			    "x": 10,
			    "y": 12,
			    "value": -0.3979,
			    "name": "CDA ~ 3"
			},
			{
			    "x": 11,
			    "y": 0,
			    "value": 1.5157,
			    "name": "SH3BGRL3 ~ 10"
			},
			{
			    "x": 11,
			    "y": 1,
			    "value": 1.2731,
			    "name": "SH3BGRL3 ~ 9"
			},
			{
			    "x": 11,
			    "y": 2,
			    "value": 1.1329,
			    "name": "SH3BGRL3 ~ 12"
			},
			{
			    "x": 11,
			    "y": 3,
			    "value": -0.9918,
			    "name": "SH3BGRL3 ~ 11"
			},
			{
			    "x": 11,
			    "y": 4,
			    "value": 1.1626,
			    "name": "SH3BGRL3 ~ 5"
			},
			{
			    "x": 11,
			    "y": 5,
			    "value": 0.1838,
			    "name": "SH3BGRL3 ~ 7"
			},
			{
			    "x": 11,
			    "y": 6,
			    "value": -0.6872,
			    "name": "SH3BGRL3 ~ 13"
			},
			{
			    "x": 11,
			    "y": 7,
			    "value": -0.7126,
			    "name": "SH3BGRL3 ~ 6"
			},
			{
			    "x": 11,
			    "y": 8,
			    "value": -0.8788,
			    "name": "SH3BGRL3 ~ 8"
			},
			{
			    "x": 11,
			    "y": 9,
			    "value": -1.1448,
			    "name": "SH3BGRL3 ~ 2"
			},
			{
			    "x": 11,
			    "y": 10,
			    "value": -1.1401,
			    "name": "SH3BGRL3 ~ 4"
			},
			{
			    "x": 11,
			    "y": 11,
			    "value": 0.2561,
			    "name": "SH3BGRL3 ~ 1"
			},
			{
			    "x": 11,
			    "y": 12,
			    "value": 0.0311,
			    "name": "SH3BGRL3 ~ 3"
			},
			{
			    "x": 12,
			    "y": 0,
			    "value": -0.7514,
			    "name": "SDF4 ~ 10"
			},
			{
			    "x": 12,
			    "y": 1,
			    "value": 0.1465,
			    "name": "SDF4 ~ 9"
			},
			{
			    "x": 12,
			    "y": 2,
			    "value": 1.6525,
			    "name": "SDF4 ~ 12"
			},
			{
			    "x": 12,
			    "y": 3,
			    "value": 1.4545,
			    "name": "SDF4 ~ 11"
			},
			{
			    "x": 12,
			    "y": 4,
			    "value": 0.6055,
			    "name": "SDF4 ~ 5"
			},
			{
			    "x": 12,
			    "y": 5,
			    "value": 1.5756,
			    "name": "SDF4 ~ 7"
			},
			{
			    "x": 12,
			    "y": 6,
			    "value": -0.8878,
			    "name": "SDF4 ~ 13"
			},
			{
			    "x": 12,
			    "y": 7,
			    "value": -0.6731,
			    "name": "SDF4 ~ 6"
			},
			{
			    "x": 12,
			    "y": 8,
			    "value": -1.1246,
			    "name": "SDF4 ~ 8"
			},
			{
			    "x": 12,
			    "y": 9,
			    "value": -0.8169,
			    "name": "SDF4 ~ 2"
			},
			{
			    "x": 12,
			    "y": 10,
			    "value": -0.3547,
			    "name": "SDF4 ~ 4"
			},
			{
			    "x": 12,
			    "y": 11,
			    "value": -0.2152,
			    "name": "SDF4 ~ 1"
			},
			{
			    "x": 12,
			    "y": 12,
			    "value": -0.6109,
			    "name": "SDF4 ~ 3"
			},
			{
			    "x": 13,
			    "y": 0,
			    "value": 1.2315,
			    "name": "AURKAIP1 ~ 10"
			},
			{
			    "x": 13,
			    "y": 1,
			    "value": 1.7614,
			    "name": "AURKAIP1 ~ 9"
			},
			{
			    "x": 13,
			    "y": 2,
			    "value": 2.0308,
			    "name": "AURKAIP1 ~ 12"
			},
			{
			    "x": 13,
			    "y": 3,
			    "value": -0.4031,
			    "name": "AURKAIP1 ~ 11"
			},
			{
			    "x": 13,
			    "y": 4,
			    "value": 0.0151,
			    "name": "AURKAIP1 ~ 5"
			},
			{
			    "x": 13,
			    "y": 5,
			    "value": -0.5289,
			    "name": "AURKAIP1 ~ 7"
			},
			{
			    "x": 13,
			    "y": 6,
			    "value": -0.5585,
			    "name": "AURKAIP1 ~ 13"
			},
			{
			    "x": 13,
			    "y": 7,
			    "value": -0.6877,
			    "name": "AURKAIP1 ~ 6"
			},
			{
			    "x": 13,
			    "y": 8,
			    "value": -0.7623,
			    "name": "AURKAIP1 ~ 8"
			},
			{
			    "x": 13,
			    "y": 9,
			    "value": -0.8441,
			    "name": "AURKAIP1 ~ 2"
			},
			{
			    "x": 13,
			    "y": 10,
			    "value": -0.7645,
			    "name": "AURKAIP1 ~ 4"
			},
			{
			    "x": 13,
			    "y": 11,
			    "value": -0.12,
			    "name": "AURKAIP1 ~ 1"
			},
			{
			    "x": 13,
			    "y": 12,
			    "value": -0.3697,
			    "name": "AURKAIP1 ~ 3"
			},
			{
			    "x": 14,
			    "y": 0,
			    "value": 0.7915,
			    "name": "MRPL20 ~ 10"
			},
			{
			    "x": 14,
			    "y": 1,
			    "value": 1.8938,
			    "name": "MRPL20 ~ 9"
			},
			{
			    "x": 14,
			    "y": 2,
			    "value": 1.4483,
			    "name": "MRPL20 ~ 12"
			},
			{
			    "x": 14,
			    "y": 3,
			    "value": -0.2579,
			    "name": "MRPL20 ~ 11"
			},
			{
			    "x": 14,
			    "y": 4,
			    "value": -0.0543,
			    "name": "MRPL20 ~ 5"
			},
			{
			    "x": 14,
			    "y": 5,
			    "value": 0.5672,
			    "name": "MRPL20 ~ 7"
			},
			{
			    "x": 14,
			    "y": 6,
			    "value": -1.6672,
			    "name": "MRPL20 ~ 13"
			},
			{
			    "x": 14,
			    "y": 7,
			    "value": -1.2633,
			    "name": "MRPL20 ~ 6"
			},
			{
			    "x": 14,
			    "y": 8,
			    "value": -0.5811,
			    "name": "MRPL20 ~ 8"
			},
			{
			    "x": 14,
			    "y": 9,
			    "value": -0.5053,
			    "name": "MRPL20 ~ 2"
			},
			{
			    "x": 14,
			    "y": 10,
			    "value": -0.518,
			    "name": "MRPL20 ~ 4"
			},
			{
			    "x": 14,
			    "y": 11,
			    "value": -0.0862,
			    "name": "MRPL20 ~ 1"
			},
			{
			    "x": 14,
			    "y": 12,
			    "value": 0.2327,
			    "name": "MRPL20 ~ 3"
			},
			{
			    "x": 15,
			    "y": 0,
			    "value": 1.6646,
			    "name": "C1orf86 ~ 10"
			},
			{
			    "x": 15,
			    "y": 1,
			    "value": 0.5674,
			    "name": "C1orf86 ~ 9"
			},
			{
			    "x": 15,
			    "y": 2,
			    "value": 2.1123,
			    "name": "C1orf86 ~ 12"
			},
			{
			    "x": 15,
			    "y": 3,
			    "value": -0.8836,
			    "name": "C1orf86 ~ 11"
			},
			{
			    "x": 15,
			    "y": 4,
			    "value": -0.17,
			    "name": "C1orf86 ~ 5"
			},
			{
			    "x": 15,
			    "y": 5,
			    "value": -0.482,
			    "name": "C1orf86 ~ 7"
			},
			{
			    "x": 15,
			    "y": 6,
			    "value": 0.2246,
			    "name": "C1orf86 ~ 13"
			},
			{
			    "x": 15,
			    "y": 7,
			    "value": 0.5956,
			    "name": "C1orf86 ~ 6"
			},
			{
			    "x": 15,
			    "y": 8,
			    "value": -0.7505,
			    "name": "C1orf86 ~ 8"
			},
			{
			    "x": 15,
			    "y": 9,
			    "value": -0.8715,
			    "name": "C1orf86 ~ 2"
			},
			{
			    "x": 15,
			    "y": 10,
			    "value": -1.0867,
			    "name": "C1orf86 ~ 4"
			},
			{
			    "x": 15,
			    "y": 11,
			    "value": -0.6484,
			    "name": "C1orf86 ~ 1"
			},
			{
			    "x": 15,
			    "y": 12,
			    "value": -0.272,
			    "name": "C1orf86 ~ 3"
			},
			{
			    "x": 16,
			    "y": 0,
			    "value": 1.2512,
			    "name": "RER1 ~ 10"
			},
			{
			    "x": 16,
			    "y": 1,
			    "value": 1.1503,
			    "name": "RER1 ~ 9"
			},
			{
			    "x": 16,
			    "y": 2,
			    "value": 2.0309,
			    "name": "RER1 ~ 12"
			},
			{
			    "x": 16,
			    "y": 3,
			    "value": -0.6567,
			    "name": "RER1 ~ 11"
			},
			{
			    "x": 16,
			    "y": 4,
			    "value": 0.3825,
			    "name": "RER1 ~ 5"
			},
			{
			    "x": 16,
			    "y": 5,
			    "value": 0.1639,
			    "name": "RER1 ~ 7"
			},
			{
			    "x": 16,
			    "y": 6,
			    "value": -1.1454,
			    "name": "RER1 ~ 13"
			},
			{
			    "x": 16,
			    "y": 7,
			    "value": -0.231,
			    "name": "RER1 ~ 6"
			},
			{
			    "x": 16,
			    "y": 8,
			    "value": -1.2604,
			    "name": "RER1 ~ 8"
			},
			{
			    "x": 16,
			    "y": 9,
			    "value": -1.0982,
			    "name": "RER1 ~ 2"
			},
			{
			    "x": 16,
			    "y": 10,
			    "value": -0.4628,
			    "name": "RER1 ~ 4"
			},
			{
			    "x": 16,
			    "y": 11,
			    "value": -0.0475,
			    "name": "RER1 ~ 1"
			},
			{
			    "x": 16,
			    "y": 12,
			    "value": -0.0767,
			    "name": "RER1 ~ 3"
			},
			{
			    "x": 17,
			    "y": 0,
			    "value": -1.1321,
			    "name": "RPL22 ~ 10"
			},
			{
			    "x": 17,
			    "y": 1,
			    "value": -0.5837,
			    "name": "RPL22 ~ 9"
			},
			{
			    "x": 17,
			    "y": 2,
			    "value": 0.5236,
			    "name": "RPL22 ~ 12"
			},
			{
			    "x": 17,
			    "y": 3,
			    "value": -0.5382,
			    "name": "RPL22 ~ 11"
			},
			{
			    "x": 17,
			    "y": 4,
			    "value": -0.9764,
			    "name": "RPL22 ~ 5"
			},
			{
			    "x": 17,
			    "y": 5,
			    "value": -1.1615,
			    "name": "RPL22 ~ 7"
			},
			{
			    "x": 17,
			    "y": 6,
			    "value": -0.8193,
			    "name": "RPL22 ~ 13"
			},
			{
			    "x": 17,
			    "y": 7,
			    "value": -0.0977,
			    "name": "RPL22 ~ 6"
			},
			{
			    "x": 17,
			    "y": 8,
			    "value": 1.5671,
			    "name": "RPL22 ~ 8"
			},
			{
			    "x": 17,
			    "y": 9,
			    "value": 1.6982,
			    "name": "RPL22 ~ 2"
			},
			{
			    "x": 17,
			    "y": 10,
			    "value": 1.1649,
			    "name": "RPL22 ~ 4"
			},
			{
			    "x": 17,
			    "y": 11,
			    "value": 0.3657,
			    "name": "RPL22 ~ 1"
			},
			{
			    "x": 17,
			    "y": 12,
			    "value": -0.0107,
			    "name": "RPL22 ~ 3"
			},
			{
			    "x": 18,
			    "y": 0,
			    "value": -0.5287,
			    "name": "TNFRSF18 ~ 10"
			},
			{
			    "x": 18,
			    "y": 1,
			    "value": -0.4954,
			    "name": "TNFRSF18 ~ 9"
			},
			{
			    "x": 18,
			    "y": 2,
			    "value": -0.5287,
			    "name": "TNFRSF18 ~ 12"
			},
			{
			    "x": 18,
			    "y": 3,
			    "value": 3.1286,
			    "name": "TNFRSF18 ~ 11"
			},
			{
			    "x": 18,
			    "y": 4,
			    "value": -0.3805,
			    "name": "TNFRSF18 ~ 5"
			},
			{
			    "x": 18,
			    "y": 5,
			    "value": 0.5255,
			    "name": "TNFRSF18 ~ 7"
			},
			{
			    "x": 18,
			    "y": 6,
			    "value": 0.1995,
			    "name": "TNFRSF18 ~ 13"
			},
			{
			    "x": 18,
			    "y": 7,
			    "value": -0.2057,
			    "name": "TNFRSF18 ~ 6"
			},
			{
			    "x": 18,
			    "y": 8,
			    "value": -0.4785,
			    "name": "TNFRSF18 ~ 8"
			},
			{
			    "x": 18,
			    "y": 9,
			    "value": -0.5162,
			    "name": "TNFRSF18 ~ 2"
			},
			{
			    "x": 18,
			    "y": 10,
			    "value": -0.4907,
			    "name": "TNFRSF18 ~ 4"
			},
			{
			    "x": 18,
			    "y": 11,
			    "value": 0.1516,
			    "name": "TNFRSF18 ~ 1"
			},
			{
			    "x": 18,
			    "y": 12,
			    "value": -0.3807,
			    "name": "TNFRSF18 ~ 3"
			},
			{
			    "x": 19,
			    "y": 0,
			    "value": -0.1346,
			    "name": "JAK1 ~ 10"
			},
			{
			    "x": 19,
			    "y": 1,
			    "value": -0.7686,
			    "name": "JAK1 ~ 9"
			},
			{
			    "x": 19,
			    "y": 2,
			    "value": 0.1689,
			    "name": "JAK1 ~ 12"
			},
			{
			    "x": 19,
			    "y": 3,
			    "value": 2.3687,
			    "name": "JAK1 ~ 11"
			},
			{
			    "x": 19,
			    "y": 4,
			    "value": -0.0727,
			    "name": "JAK1 ~ 5"
			},
			{
			    "x": 19,
			    "y": 5,
			    "value": 1.6763,
			    "name": "JAK1 ~ 7"
			},
			{
			    "x": 19,
			    "y": 6,
			    "value": -1.366,
			    "name": "JAK1 ~ 13"
			},
			{
			    "x": 19,
			    "y": 7,
			    "value": -0.5503,
			    "name": "JAK1 ~ 6"
			},
			{
			    "x": 19,
			    "y": 8,
			    "value": -0.643,
			    "name": "JAK1 ~ 8"
			},
			{
			    "x": 19,
			    "y": 9,
			    "value": -0.1993,
			    "name": "JAK1 ~ 2"
			},
			{
			    "x": 19,
			    "y": 10,
			    "value": -0.5241,
			    "name": "JAK1 ~ 4"
			},
			{
			    "x": 19,
			    "y": 11,
			    "value": 0.162,
			    "name": "JAK1 ~ 1"
			},
			{
			    "x": 19,
			    "y": 12,
			    "value": -0.1174,
			    "name": "JAK1 ~ 3"
			},
			{
			    "x": 20,
			    "y": 0,
			    "value": -1.2372,
			    "name": "CD2 ~ 10"
			},
			{
			    "x": 20,
			    "y": 1,
			    "value": -1.2406,
			    "name": "CD2 ~ 9"
			},
			{
			    "x": 20,
			    "y": 2,
			    "value": -0.5181,
			    "name": "CD2 ~ 12"
			},
			{
			    "x": 20,
			    "y": 3,
			    "value": 2.1094,
			    "name": "CD2 ~ 11"
			},
			{
			    "x": 20,
			    "y": 4,
			    "value": 1.188,
			    "name": "CD2 ~ 5"
			},
			{
			    "x": 20,
			    "y": 5,
			    "value": 0.4769,
			    "name": "CD2 ~ 7"
			},
			{
			    "x": 20,
			    "y": 6,
			    "value": -0.4597,
			    "name": "CD2 ~ 13"
			},
			{
			    "x": 20,
			    "y": 7,
			    "value": -1.2333,
			    "name": "CD2 ~ 6"
			},
			{
			    "x": 20,
			    "y": 8,
			    "value": -0.1739,
			    "name": "CD2 ~ 8"
			},
			{
			    "x": 20,
			    "y": 9,
			    "value": -0.1521,
			    "name": "CD2 ~ 2"
			},
			{
			    "x": 20,
			    "y": 10,
			    "value": -0.0139,
			    "name": "CD2 ~ 4"
			},
			{
			    "x": 20,
			    "y": 11,
			    "value": 0.6444,
			    "name": "CD2 ~ 1"
			},
			{
			    "x": 20,
			    "y": 12,
			    "value": 0.6101,
			    "name": "CD2 ~ 3"
			},
			{
			    "x": 21,
			    "y": 0,
			    "value": -0.3705,
			    "name": "XCL2 ~ 10"
			},
			{
			    "x": 21,
			    "y": 1,
			    "value": -0.3571,
			    "name": "XCL2 ~ 9"
			},
			{
			    "x": 21,
			    "y": 2,
			    "value": -0.3705,
			    "name": "XCL2 ~ 12"
			},
			{
			    "x": 21,
			    "y": 3,
			    "value": 3.2576,
			    "name": "XCL2 ~ 11"
			},
			{
			    "x": 21,
			    "y": 4,
			    "value": -0.2192,
			    "name": "XCL2 ~ 5"
			},
			{
			    "x": 21,
			    "y": 5,
			    "value": 0.3555,
			    "name": "XCL2 ~ 7"
			},
			{
			    "x": 21,
			    "y": 6,
			    "value": -0.3705,
			    "name": "XCL2 ~ 13"
			},
			{
			    "x": 21,
			    "y": 7,
			    "value": -0.3705,
			    "name": "XCL2 ~ 6"
			},
			{
			    "x": 21,
			    "y": 8,
			    "value": -0.3567,
			    "name": "XCL2 ~ 8"
			},
			{
			    "x": 21,
			    "y": 9,
			    "value": -0.3705,
			    "name": "XCL2 ~ 2"
			},
			{
			    "x": 21,
			    "y": 10,
			    "value": -0.3705,
			    "name": "XCL2 ~ 4"
			},
			{
			    "x": 21,
			    "y": 11,
			    "value": -0.3527,
			    "name": "XCL2 ~ 1"
			},
			{
			    "x": 21,
			    "y": 12,
			    "value": -0.1041,
			    "name": "XCL2 ~ 3"
			},
			{
			    "x": 22,
			    "y": 0,
			    "value": -0.4002,
			    "name": "XCL1 ~ 10"
			},
			{
			    "x": 22,
			    "y": 1,
			    "value": -0.4359,
			    "name": "XCL1 ~ 9"
			},
			{
			    "x": 22,
			    "y": 2,
			    "value": -0.4359,
			    "name": "XCL1 ~ 12"
			},
			{
			    "x": 22,
			    "y": 3,
			    "value": 3.1581,
			    "name": "XCL1 ~ 11"
			},
			{
			    "x": 22,
			    "y": 4,
			    "value": 0.0364,
			    "name": "XCL1 ~ 5"
			},
			{
			    "x": 22,
			    "y": 5,
			    "value": 0.6272,
			    "name": "XCL1 ~ 7"
			},
			{
			    "x": 22,
			    "y": 6,
			    "value": -0.4359,
			    "name": "XCL1 ~ 13"
			},
			{
			    "x": 22,
			    "y": 7,
			    "value": -0.4359,
			    "name": "XCL1 ~ 6"
			},
			{
			    "x": 22,
			    "y": 8,
			    "value": -0.418,
			    "name": "XCL1 ~ 8"
			},
			{
			    "x": 22,
			    "y": 9,
			    "value": -0.4359,
			    "name": "XCL1 ~ 2"
			},
			{
			    "x": 22,
			    "y": 10,
			    "value": -0.4359,
			    "name": "XCL1 ~ 4"
			},
			{
			    "x": 22,
			    "y": 11,
			    "value": -0.3957,
			    "name": "XCL1 ~ 1"
			},
			{
			    "x": 22,
			    "y": 12,
			    "value": 0.0075,
			    "name": "XCL1 ~ 3"
			},
			{
			    "x": 23,
			    "y": 0,
			    "value": -1.0523,
			    "name": "SELL ~ 10"
			},
			{
			    "x": 23,
			    "y": 1,
			    "value": -0.4281,
			    "name": "SELL ~ 9"
			},
			{
			    "x": 23,
			    "y": 2,
			    "value": 0.1644,
			    "name": "SELL ~ 12"
			},
			{
			    "x": 23,
			    "y": 3,
			    "value": 2.5506,
			    "name": "SELL ~ 11"
			},
			{
			    "x": 23,
			    "y": 4,
			    "value": -0.8278,
			    "name": "SELL ~ 5"
			},
			{
			    "x": 23,
			    "y": 5,
			    "value": -0.8068,
			    "name": "SELL ~ 7"
			},
			{
			    "x": 23,
			    "y": 6,
			    "value": -0.971,
			    "name": "SELL ~ 13"
			},
			{
			    "x": 23,
			    "y": 7,
			    "value": 0.5443,
			    "name": "SELL ~ 6"
			},
			{
			    "x": 23,
			    "y": 8,
			    "value": 0.5061,
			    "name": "SELL ~ 8"
			},
			{
			    "x": 23,
			    "y": 9,
			    "value": 0.6652,
			    "name": "SELL ~ 2"
			},
			{
			    "x": 23,
			    "y": 10,
			    "value": 0.6433,
			    "name": "SELL ~ 4"
			},
			{
			    "x": 23,
			    "y": 11,
			    "value": -0.5205,
			    "name": "SELL ~ 1"
			},
			{
			    "x": 23,
			    "y": 12,
			    "value": -0.4675,
			    "name": "SELL ~ 3"
			},
			{
			    "x": 24,
			    "y": 0,
			    "value": -0.3737,
			    "name": "ZNF683 ~ 10"
			},
			{
			    "x": 24,
			    "y": 1,
			    "value": -0.2819,
			    "name": "ZNF683 ~ 9"
			},
			{
			    "x": 24,
			    "y": 2,
			    "value": -0.2592,
			    "name": "ZNF683 ~ 12"
			},
			{
			    "x": 24,
			    "y": 3,
			    "value": -0.3737,
			    "name": "ZNF683 ~ 11"
			},
			{
			    "x": 24,
			    "y": 4,
			    "value": 3.2838,
			    "name": "ZNF683 ~ 5"
			},
			{
			    "x": 24,
			    "y": 5,
			    "value": -0.3341,
			    "name": "ZNF683 ~ 7"
			},
			{
			    "x": 24,
			    "y": 6,
			    "value": -0.3737,
			    "name": "ZNF683 ~ 13"
			},
			{
			    "x": 24,
			    "y": 7,
			    "value": -0.3531,
			    "name": "ZNF683 ~ 6"
			},
			{
			    "x": 24,
			    "y": 8,
			    "value": -0.1905,
			    "name": "ZNF683 ~ 8"
			},
			{
			    "x": 24,
			    "y": 9,
			    "value": -0.3338,
			    "name": "ZNF683 ~ 2"
			},
			{
			    "x": 24,
			    "y": 10,
			    "value": -0.3462,
			    "name": "ZNF683 ~ 4"
			},
			{
			    "x": 24,
			    "y": 11,
			    "value": -0.3012,
			    "name": "ZNF683 ~ 1"
			},
			{
			    "x": 24,
			    "y": 12,
			    "value": 0.2373,
			    "name": "ZNF683 ~ 3"
			},
			{
			    "x": 25,
			    "y": 0,
			    "value": -0.4869,
			    "name": "FCRL6 ~ 10"
			},
			{
			    "x": 25,
			    "y": 1,
			    "value": -0.4869,
			    "name": "FCRL6 ~ 9"
			},
			{
			    "x": 25,
			    "y": 2,
			    "value": -0.2667,
			    "name": "FCRL6 ~ 12"
			},
			{
			    "x": 25,
			    "y": 3,
			    "value": -0.4869,
			    "name": "FCRL6 ~ 11"
			},
			{
			    "x": 25,
			    "y": 4,
			    "value": 2.6288,
			    "name": "FCRL6 ~ 5"
			},
			{
			    "x": 25,
			    "y": 5,
			    "value": 1.7159,
			    "name": "FCRL6 ~ 7"
			},
			{
			    "x": 25,
			    "y": 6,
			    "value": -0.4869,
			    "name": "FCRL6 ~ 13"
			},
			{
			    "x": 25,
			    "y": 7,
			    "value": -0.4494,
			    "name": "FCRL6 ~ 6"
			},
			{
			    "x": 25,
			    "y": 8,
			    "value": -0.4491,
			    "name": "FCRL6 ~ 8"
			},
			{
			    "x": 25,
			    "y": 9,
			    "value": -0.4701,
			    "name": "FCRL6 ~ 2"
			},
			{
			    "x": 25,
			    "y": 10,
			    "value": -0.4869,
			    "name": "FCRL6 ~ 4"
			},
			{
			    "x": 25,
			    "y": 11,
			    "value": -0.4737,
			    "name": "FCRL6 ~ 1"
			},
			{
			    "x": 25,
			    "y": 12,
			    "value": 0.1987,
			    "name": "FCRL6 ~ 3"
			},
			{
			    "x": 26,
			    "y": 0,
			    "value": -0.6696,
			    "name": "C1orf21 ~ 10"
			},
			{
			    "x": 26,
			    "y": 1,
			    "value": -0.5847,
			    "name": "C1orf21 ~ 9"
			},
			{
			    "x": 26,
			    "y": 2,
			    "value": -0.2021,
			    "name": "C1orf21 ~ 12"
			},
			{
			    "x": 26,
			    "y": 3,
			    "value": 1.5606,
			    "name": "C1orf21 ~ 11"
			},
			{
			    "x": 26,
			    "y": 4,
			    "value": 1.6926,
			    "name": "C1orf21 ~ 5"
			},
			{
			    "x": 26,
			    "y": 5,
			    "value": 1.7948,
			    "name": "C1orf21 ~ 7"
			},
			{
			    "x": 26,
			    "y": 6,
			    "value": -0.6696,
			    "name": "C1orf21 ~ 13"
			},
			{
			    "x": 26,
			    "y": 7,
			    "value": -0.571,
			    "name": "C1orf21 ~ 6"
			},
			{
			    "x": 26,
			    "y": 8,
			    "value": -0.6696,
			    "name": "C1orf21 ~ 8"
			},
			{
			    "x": 26,
			    "y": 9,
			    "value": -0.6696,
			    "name": "C1orf21 ~ 2"
			},
			{
			    "x": 26,
			    "y": 10,
			    "value": -0.6696,
			    "name": "C1orf21 ~ 4"
			},
			{
			    "x": 26,
			    "y": 11,
			    "value": -0.6555,
			    "name": "C1orf21 ~ 1"
			},
			{
			    "x": 26,
			    "y": 12,
			    "value": 0.3132,
			    "name": "C1orf21 ~ 3"
			},
			{
			    "x": 27,
			    "y": 0,
			    "value": -0.5405,
			    "name": "YWHAQ ~ 10"
			},
			{
			    "x": 27,
			    "y": 1,
			    "value": -1.2388,
			    "name": "YWHAQ ~ 9"
			},
			{
			    "x": 27,
			    "y": 2,
			    "value": -0.0684,
			    "name": "YWHAQ ~ 12"
			},
			{
			    "x": 27,
			    "y": 3,
			    "value": 0.9991,
			    "name": "YWHAQ ~ 11"
			},
			{
			    "x": 27,
			    "y": 4,
			    "value": 2.1681,
			    "name": "YWHAQ ~ 5"
			},
			{
			    "x": 27,
			    "y": 5,
			    "value": 0.8329,
			    "name": "YWHAQ ~ 7"
			},
			{
			    "x": 27,
			    "y": 6,
			    "value": -1.454,
			    "name": "YWHAQ ~ 13"
			},
			{
			    "x": 27,
			    "y": 7,
			    "value": 0.0615,
			    "name": "YWHAQ ~ 6"
			},
			{
			    "x": 27,
			    "y": 8,
			    "value": -0.2866,
			    "name": "YWHAQ ~ 8"
			},
			{
			    "x": 27,
			    "y": 9,
			    "value": -0.6761,
			    "name": "YWHAQ ~ 2"
			},
			{
			    "x": 27,
			    "y": 10,
			    "value": -0.7885,
			    "name": "YWHAQ ~ 4"
			},
			{
			    "x": 27,
			    "y": 11,
			    "value": 0.4426,
			    "name": "YWHAQ ~ 1"
			},
			{
			    "x": 27,
			    "y": 12,
			    "value": 0.5486,
			    "name": "YWHAQ ~ 3"
			},
			{
			    "x": 28,
			    "y": 0,
			    "value": -0.5553,
			    "name": "CD8A ~ 10"
			},
			{
			    "x": 28,
			    "y": 1,
			    "value": -0.5758,
			    "name": "CD8A ~ 9"
			},
			{
			    "x": 28,
			    "y": 2,
			    "value": -0.5933,
			    "name": "CD8A ~ 12"
			},
			{
			    "x": 28,
			    "y": 3,
			    "value": -0.3425,
			    "name": "CD8A ~ 11"
			},
			{
			    "x": 28,
			    "y": 4,
			    "value": 2.5844,
			    "name": "CD8A ~ 5"
			},
			{
			    "x": 28,
			    "y": 5,
			    "value": -0.3702,
			    "name": "CD8A ~ 7"
			},
			{
			    "x": 28,
			    "y": 6,
			    "value": -0.3121,
			    "name": "CD8A ~ 13"
			},
			{
			    "x": 28,
			    "y": 7,
			    "value": -0.5868,
			    "name": "CD8A ~ 6"
			},
			{
			    "x": 28,
			    "y": 8,
			    "value": 1.4499,
			    "name": "CD8A ~ 8"
			},
			{
			    "x": 28,
			    "y": 9,
			    "value": -0.5472,
			    "name": "CD8A ~ 2"
			},
			{
			    "x": 28,
			    "y": 10,
			    "value": -0.5561,
			    "name": "CD8A ~ 4"
			},
			{
			    "x": 28,
			    "y": 11,
			    "value": -0.4455,
			    "name": "CD8A ~ 1"
			},
			{
			    "x": 28,
			    "y": 12,
			    "value": 0.8505,
			    "name": "CD8A ~ 3"
			},
			{
			    "x": 29,
			    "y": 0,
			    "value": -0.4585,
			    "name": "FGFBP2 ~ 10"
			},
			{
			    "x": 29,
			    "y": 1,
			    "value": -0.4495,
			    "name": "FGFBP2 ~ 9"
			},
			{
			    "x": 29,
			    "y": 2,
			    "value": -0.3234,
			    "name": "FGFBP2 ~ 12"
			},
			{
			    "x": 29,
			    "y": 3,
			    "value": -0.4079,
			    "name": "FGFBP2 ~ 11"
			},
			{
			    "x": 29,
			    "y": 4,
			    "value": 2.2665,
			    "name": "FGFBP2 ~ 5"
			},
			{
			    "x": 29,
			    "y": 5,
			    "value": 2.2227,
			    "name": "FGFBP2 ~ 7"
			},
			{
			    "x": 29,
			    "y": 6,
			    "value": -0.1892,
			    "name": "FGFBP2 ~ 13"
			},
			{
			    "x": 29,
			    "y": 7,
			    "value": -0.475,
			    "name": "FGFBP2 ~ 6"
			},
			{
			    "x": 29,
			    "y": 8,
			    "value": -0.4692,
			    "name": "FGFBP2 ~ 8"
			},
			{
			    "x": 29,
			    "y": 9,
			    "value": -0.4742,
			    "name": "FGFBP2 ~ 2"
			},
			{
			    "x": 29,
			    "y": 10,
			    "value": -0.4625,
			    "name": "FGFBP2 ~ 4"
			},
			{
			    "x": 29,
			    "y": 11,
			    "value": -0.4763,
			    "name": "FGFBP2 ~ 1"
			},
			{
			    "x": 29,
			    "y": 12,
			    "value": -0.3035,
			    "name": "FGFBP2 ~ 3"
			},
			{
			    "x": 30,
			    "y": 0,
			    "value": -0.7597,
			    "name": "MIB2 ~ 10"
			},
			{
			    "x": 30,
			    "y": 1,
			    "value": -0.8646,
			    "name": "MIB2 ~ 9"
			},
			{
			    "x": 30,
			    "y": 2,
			    "value": -1.0595,
			    "name": "MIB2 ~ 12"
			},
			{
			    "x": 30,
			    "y": 3,
			    "value": 1.4871,
			    "name": "MIB2 ~ 11"
			},
			{
			    "x": 30,
			    "y": 4,
			    "value": 0.9805,
			    "name": "MIB2 ~ 5"
			},
			{
			    "x": 30,
			    "y": 5,
			    "value": 1.8681,
			    "name": "MIB2 ~ 7"
			},
			{
			    "x": 30,
			    "y": 6,
			    "value": -1.3989,
			    "name": "MIB2 ~ 13"
			},
			{
			    "x": 30,
			    "y": 7,
			    "value": -0.5776,
			    "name": "MIB2 ~ 6"
			},
			{
			    "x": 30,
			    "y": 8,
			    "value": 0.6086,
			    "name": "MIB2 ~ 8"
			},
			{
			    "x": 30,
			    "y": 9,
			    "value": -0.1597,
			    "name": "MIB2 ~ 2"
			},
			{
			    "x": 30,
			    "y": 10,
			    "value": -0.2052,
			    "name": "MIB2 ~ 4"
			},
			{
			    "x": 30,
			    "y": 11,
			    "value": -0.2411,
			    "name": "MIB2 ~ 1"
			},
			{
			    "x": 30,
			    "y": 12,
			    "value": 0.322,
			    "name": "MIB2 ~ 3"
			},
			{
			    "x": 31,
			    "y": 0,
			    "value": -0.5271,
			    "name": "RUNX3 ~ 10"
			},
			{
			    "x": 31,
			    "y": 1,
			    "value": -0.8617,
			    "name": "RUNX3 ~ 9"
			},
			{
			    "x": 31,
			    "y": 2,
			    "value": -0.2962,
			    "name": "RUNX3 ~ 12"
			},
			{
			    "x": 31,
			    "y": 3,
			    "value": 0.9063,
			    "name": "RUNX3 ~ 11"
			},
			{
			    "x": 31,
			    "y": 4,
			    "value": 0.5061,
			    "name": "RUNX3 ~ 5"
			},
			{
			    "x": 31,
			    "y": 5,
			    "value": 2.3146,
			    "name": "RUNX3 ~ 7"
			},
			{
			    "x": 31,
			    "y": 6,
			    "value": 1.497,
			    "name": "RUNX3 ~ 13"
			},
			{
			    "x": 31,
			    "y": 7,
			    "value": -0.6059,
			    "name": "RUNX3 ~ 6"
			},
			{
			    "x": 31,
			    "y": 8,
			    "value": -0.586,
			    "name": "RUNX3 ~ 8"
			},
			{
			    "x": 31,
			    "y": 9,
			    "value": -0.6847,
			    "name": "RUNX3 ~ 2"
			},
			{
			    "x": 31,
			    "y": 10,
			    "value": -0.7749,
			    "name": "RUNX3 ~ 4"
			},
			{
			    "x": 31,
			    "y": 11,
			    "value": -0.5892,
			    "name": "RUNX3 ~ 1"
			},
			{
			    "x": 31,
			    "y": 12,
			    "value": -0.2984,
			    "name": "RUNX3 ~ 3"
			},
			{
			    "x": 32,
			    "y": 0,
			    "value": 0.1762,
			    "name": "FHL3 ~ 10"
			},
			{
			    "x": 32,
			    "y": 1,
			    "value": 1.0505,
			    "name": "FHL3 ~ 9"
			},
			{
			    "x": 32,
			    "y": 2,
			    "value": 0.489,
			    "name": "FHL3 ~ 12"
			},
			{
			    "x": 32,
			    "y": 3,
			    "value": 0.9182,
			    "name": "FHL3 ~ 11"
			},
			{
			    "x": 32,
			    "y": 4,
			    "value": -0.4434,
			    "name": "FHL3 ~ 5"
			},
			{
			    "x": 32,
			    "y": 5,
			    "value": 2.3956,
			    "name": "FHL3 ~ 7"
			},
			{
			    "x": 32,
			    "y": 6,
			    "value": -0.9356,
			    "name": "FHL3 ~ 13"
			},
			{
			    "x": 32,
			    "y": 7,
			    "value": -0.9356,
			    "name": "FHL3 ~ 6"
			},
			{
			    "x": 32,
			    "y": 8,
			    "value": -0.6914,
			    "name": "FHL3 ~ 8"
			},
			{
			    "x": 32,
			    "y": 9,
			    "value": -0.7331,
			    "name": "FHL3 ~ 2"
			},
			{
			    "x": 32,
			    "y": 10,
			    "value": -0.6705,
			    "name": "FHL3 ~ 4"
			},
			{
			    "x": 32,
			    "y": 11,
			    "value": -0.7787,
			    "name": "FHL3 ~ 1"
			},
			{
			    "x": 32,
			    "y": 12,
			    "value": 0.1588,
			    "name": "FHL3 ~ 3"
			},
			{
			    "x": 33,
			    "y": 0,
			    "value": -0.2743,
			    "name": "CD160 ~ 10"
			},
			{
			    "x": 33,
			    "y": 1,
			    "value": -0.4247,
			    "name": "CD160 ~ 9"
			},
			{
			    "x": 33,
			    "y": 2,
			    "value": -0.4247,
			    "name": "CD160 ~ 12"
			},
			{
			    "x": 33,
			    "y": 3,
			    "value": 0.0837,
			    "name": "CD160 ~ 11"
			},
			{
			    "x": 33,
			    "y": 4,
			    "value": 0.1329,
			    "name": "CD160 ~ 5"
			},
			{
			    "x": 33,
			    "y": 5,
			    "value": 3.2256,
			    "name": "CD160 ~ 7"
			},
			{
			    "x": 33,
			    "y": 6,
			    "value": -0.4247,
			    "name": "CD160 ~ 13"
			},
			{
			    "x": 33,
			    "y": 7,
			    "value": -0.4247,
			    "name": "CD160 ~ 6"
			},
			{
			    "x": 33,
			    "y": 8,
			    "value": -0.4247,
			    "name": "CD160 ~ 8"
			},
			{
			    "x": 33,
			    "y": 9,
			    "value": -0.4247,
			    "name": "CD160 ~ 2"
			},
			{
			    "x": 33,
			    "y": 10,
			    "value": -0.4247,
			    "name": "CD160 ~ 4"
			},
			{
			    "x": 33,
			    "y": 11,
			    "value": -0.4247,
			    "name": "CD160 ~ 1"
			},
			{
			    "x": 33,
			    "y": 12,
			    "value": 0.2298,
			    "name": "CD160 ~ 3"
			},
			{
			    "x": 34,
			    "y": 0,
			    "value": -0.8377,
			    "name": "SH2D2A ~ 10"
			},
			{
			    "x": 34,
			    "y": 1,
			    "value": -0.7929,
			    "name": "SH2D2A ~ 9"
			},
			{
			    "x": 34,
			    "y": 2,
			    "value": -0.6766,
			    "name": "SH2D2A ~ 12"
			},
			{
			    "x": 34,
			    "y": 3,
			    "value": 1.6309,
			    "name": "SH2D2A ~ 11"
			},
			{
			    "x": 34,
			    "y": 4,
			    "value": 0.8352,
			    "name": "SH2D2A ~ 5"
			},
			{
			    "x": 34,
			    "y": 5,
			    "value": 2.0778,
			    "name": "SH2D2A ~ 7"
			},
			{
			    "x": 34,
			    "y": 6,
			    "value": -0.8377,
			    "name": "SH2D2A ~ 13"
			},
			{
			    "x": 34,
			    "y": 7,
			    "value": -0.8377,
			    "name": "SH2D2A ~ 6"
			},
			{
			    "x": 34,
			    "y": 8,
			    "value": -0.1036,
			    "name": "SH2D2A ~ 8"
			},
			{
			    "x": 34,
			    "y": 9,
			    "value": -0.5773,
			    "name": "SH2D2A ~ 2"
			},
			{
			    "x": 34,
			    "y": 10,
			    "value": -0.6604,
			    "name": "SH2D2A ~ 4"
			},
			{
			    "x": 34,
			    "y": 11,
			    "value": 0.2335,
			    "name": "SH2D2A ~ 1"
			},
			{
			    "x": 34,
			    "y": 12,
			    "value": 0.5466,
			    "name": "SH2D2A ~ 3"
			},
			{
			    "x": 35,
			    "y": 0,
			    "value": -0.7522,
			    "name": "PYHIN1 ~ 10"
			},
			{
			    "x": 35,
			    "y": 1,
			    "value": -0.8861,
			    "name": "PYHIN1 ~ 9"
			},
			{
			    "x": 35,
			    "y": 2,
			    "value": -0.7785,
			    "name": "PYHIN1 ~ 12"
			},
			{
			    "x": 35,
			    "y": 3,
			    "value": 0.0729,
			    "name": "PYHIN1 ~ 11"
			},
			{
			    "x": 35,
			    "y": 4,
			    "value": 1.4326,
			    "name": "PYHIN1 ~ 5"
			},
			{
			    "x": 35,
			    "y": 5,
			    "value": 2.1465,
			    "name": "PYHIN1 ~ 7"
			},
			{
			    "x": 35,
			    "y": 6,
			    "value": 0.6656,
			    "name": "PYHIN1 ~ 13"
			},
			{
			    "x": 35,
			    "y": 7,
			    "value": -0.8505,
			    "name": "PYHIN1 ~ 6"
			},
			{
			    "x": 35,
			    "y": 8,
			    "value": -0.8777,
			    "name": "PYHIN1 ~ 8"
			},
			{
			    "x": 35,
			    "y": 9,
			    "value": -0.4591,
			    "name": "PYHIN1 ~ 2"
			},
			{
			    "x": 35,
			    "y": 10,
			    "value": -0.5606,
			    "name": "PYHIN1 ~ 4"
			},
			{
			    "x": 35,
			    "y": 11,
			    "value": -0.1041,
			    "name": "PYHIN1 ~ 1"
			},
			{
			    "x": 35,
			    "y": 12,
			    "value": 0.9513,
			    "name": "PYHIN1 ~ 3"
			},
			{
			    "x": 36,
			    "y": 0,
			    "value": -0.5664,
			    "name": "ID3 ~ 10"
			},
			{
			    "x": 36,
			    "y": 1,
			    "value": -0.7772,
			    "name": "ID3 ~ 9"
			},
			{
			    "x": 36,
			    "y": 2,
			    "value": -0.3539,
			    "name": "ID3 ~ 12"
			},
			{
			    "x": 36,
			    "y": 3,
			    "value": -0.8407,
			    "name": "ID3 ~ 11"
			},
			{
			    "x": 36,
			    "y": 4,
			    "value": -0.7433,
			    "name": "ID3 ~ 5"
			},
			{
			    "x": 36,
			    "y": 5,
			    "value": -0.7943,
			    "name": "ID3 ~ 7"
			},
			{
			    "x": 36,
			    "y": 6,
			    "value": -0.8407,
			    "name": "ID3 ~ 13"
			},
			{
			    "x": 36,
			    "y": 7,
			    "value": 2.0016,
			    "name": "ID3 ~ 6"
			},
			{
			    "x": 36,
			    "y": 8,
			    "value": 0.8253,
			    "name": "ID3 ~ 8"
			},
			{
			    "x": 36,
			    "y": 9,
			    "value": 0.9303,
			    "name": "ID3 ~ 2"
			},
			{
			    "x": 36,
			    "y": 10,
			    "value": 1.5375,
			    "name": "ID3 ~ 4"
			},
			{
			    "x": 36,
			    "y": 11,
			    "value": 0.2379,
			    "name": "ID3 ~ 1"
			},
			{
			    "x": 36,
			    "y": 12,
			    "value": -0.6162,
			    "name": "ID3 ~ 3"
			},
			{
			    "x": 37,
			    "y": 0,
			    "value": -0.2845,
			    "name": "RP5-887A10.1 ~ 10"
			},
			{
			    "x": 37,
			    "y": 1,
			    "value": -0.1981,
			    "name": "RP5-887A10.1 ~ 9"
			},
			{
			    "x": 37,
			    "y": 2,
			    "value": -0.2845,
			    "name": "RP5-887A10.1 ~ 12"
			},
			{
			    "x": 37,
			    "y": 3,
			    "value": -0.2845,
			    "name": "RP5-887A10.1 ~ 11"
			},
			{
			    "x": 37,
			    "y": 4,
			    "value": -0.2845,
			    "name": "RP5-887A10.1 ~ 5"
			},
			{
			    "x": 37,
			    "y": 5,
			    "value": -0.2845,
			    "name": "RP5-887A10.1 ~ 7"
			},
			{
			    "x": 37,
			    "y": 6,
			    "value": -0.2845,
			    "name": "RP5-887A10.1 ~ 13"
			},
			{
			    "x": 37,
			    "y": 7,
			    "value": 3.3273,
			    "name": "RP5-887A10.1 ~ 6"
			},
			{
			    "x": 37,
			    "y": 8,
			    "value": -0.2845,
			    "name": "RP5-887A10.1 ~ 8"
			},
			{
			    "x": 37,
			    "y": 9,
			    "value": -0.2845,
			    "name": "RP5-887A10.1 ~ 2"
			},
			{
			    "x": 37,
			    "y": 10,
			    "value": -0.2845,
			    "name": "RP5-887A10.1 ~ 4"
			},
			{
			    "x": 37,
			    "y": 11,
			    "value": -0.2845,
			    "name": "RP5-887A10.1 ~ 1"
			},
			{
			    "x": 37,
			    "y": 12,
			    "value": -0.2845,
			    "name": "RP5-887A10.1 ~ 3"
			},
			{
			    "x": 38,
			    "y": 0,
			    "value": 0.8842,
			    "name": "DRAM2 ~ 10"
			},
			{
			    "x": 38,
			    "y": 1,
			    "value": 0.868,
			    "name": "DRAM2 ~ 9"
			},
			{
			    "x": 38,
			    "y": 2,
			    "value": 0.607,
			    "name": "DRAM2 ~ 12"
			},
			{
			    "x": 38,
			    "y": 3,
			    "value": 1.1105,
			    "name": "DRAM2 ~ 11"
			},
			{
			    "x": 38,
			    "y": 4,
			    "value": -0.7303,
			    "name": "DRAM2 ~ 5"
			},
			{
			    "x": 38,
			    "y": 5,
			    "value": -0.8268,
			    "name": "DRAM2 ~ 7"
			},
			{
			    "x": 38,
			    "y": 6,
			    "value": -1.7211,
			    "name": "DRAM2 ~ 13"
			},
			{
			    "x": 38,
			    "y": 7,
			    "value": 1.8771,
			    "name": "DRAM2 ~ 6"
			},
			{
			    "x": 38,
			    "y": 8,
			    "value": -0.0633,
			    "name": "DRAM2 ~ 8"
			},
			{
			    "x": 38,
			    "y": 9,
			    "value": -0.3299,
			    "name": "DRAM2 ~ 2"
			},
			{
			    "x": 38,
			    "y": 10,
			    "value": -0.3501,
			    "name": "DRAM2 ~ 4"
			},
			{
			    "x": 38,
			    "y": 11,
			    "value": -0.816,
			    "name": "DRAM2 ~ 1"
			},
			{
			    "x": 38,
			    "y": 12,
			    "value": -0.5092,
			    "name": "DRAM2 ~ 3"
			},
			{
			    "x": 39,
			    "y": 0,
			    "value": -0.2774,
			    "name": "FCRL1 ~ 10"
			},
			{
			    "x": 39,
			    "y": 1,
			    "value": -0.2774,
			    "name": "FCRL1 ~ 9"
			},
			{
			    "x": 39,
			    "y": 2,
			    "value": -0.2774,
			    "name": "FCRL1 ~ 12"
			},
			{
			    "x": 39,
			    "y": 3,
			    "value": -0.2774,
			    "name": "FCRL1 ~ 11"
			},
			{
			    "x": 39,
			    "y": 4,
			    "value": -0.2774,
			    "name": "FCRL1 ~ 5"
			},
			{
			    "x": 39,
			    "y": 5,
			    "value": -0.2774,
			    "name": "FCRL1 ~ 7"
			},
			{
			    "x": 39,
			    "y": 6,
			    "value": -0.2774,
			    "name": "FCRL1 ~ 13"
			},
			{
			    "x": 39,
			    "y": 7,
			    "value": 3.3282,
			    "name": "FCRL1 ~ 6"
			},
			{
			    "x": 39,
			    "y": 8,
			    "value": -0.2774,
			    "name": "FCRL1 ~ 8"
			},
			{
			    "x": 39,
			    "y": 9,
			    "value": -0.2774,
			    "name": "FCRL1 ~ 2"
			},
			{
			    "x": 39,
			    "y": 10,
			    "value": -0.2774,
			    "name": "FCRL1 ~ 4"
			},
			{
			    "x": 39,
			    "y": 11,
			    "value": -0.2774,
			    "name": "FCRL1 ~ 1"
			},
			{
			    "x": 39,
			    "y": 12,
			    "value": -0.2774,
			    "name": "FCRL1 ~ 3"
			},
			{
			    "x": 40,
			    "y": 0,
			    "value": -0.2887,
			    "name": "FCRLA ~ 10"
			},
			{
			    "x": 40,
			    "y": 1,
			    "value": -0.2887,
			    "name": "FCRLA ~ 9"
			},
			{
			    "x": 40,
			    "y": 2,
			    "value": -0.2887,
			    "name": "FCRLA ~ 12"
			},
			{
			    "x": 40,
			    "y": 3,
			    "value": -0.2887,
			    "name": "FCRLA ~ 11"
			},
			{
			    "x": 40,
			    "y": 4,
			    "value": -0.2887,
			    "name": "FCRLA ~ 5"
			},
			{
			    "x": 40,
			    "y": 5,
			    "value": -0.2887,
			    "name": "FCRLA ~ 7"
			},
			{
			    "x": 40,
			    "y": 6,
			    "value": -0.2887,
			    "name": "FCRLA ~ 13"
			},
			{
			    "x": 40,
			    "y": 7,
			    "value": 3.3273,
			    "name": "FCRLA ~ 6"
			},
			{
			    "x": 40,
			    "y": 8,
			    "value": -0.2887,
			    "name": "FCRLA ~ 8"
			},
			{
			    "x": 40,
			    "y": 9,
			    "value": -0.2887,
			    "name": "FCRLA ~ 2"
			},
			{
			    "x": 40,
			    "y": 10,
			    "value": -0.2483,
			    "name": "FCRLA ~ 4"
			},
			{
			    "x": 40,
			    "y": 11,
			    "value": -0.2669,
			    "name": "FCRLA ~ 1"
			},
			{
			    "x": 40,
			    "y": 12,
			    "value": -0.2135,
			    "name": "FCRLA ~ 3"
			},
			{
			    "x": 41,
			    "y": 0,
			    "value": -0.2315,
			    "name": "RALGPS2 ~ 10"
			},
			{
			    "x": 41,
			    "y": 1,
			    "value": -0.3094,
			    "name": "RALGPS2 ~ 9"
			},
			{
			    "x": 41,
			    "y": 2,
			    "value": 0.1077,
			    "name": "RALGPS2 ~ 12"
			},
			{
			    "x": 41,
			    "y": 3,
			    "value": -0.3766,
			    "name": "RALGPS2 ~ 11"
			},
			{
			    "x": 41,
			    "y": 4,
			    "value": -0.3766,
			    "name": "RALGPS2 ~ 5"
			},
			{
			    "x": 41,
			    "y": 5,
			    "value": -0.3766,
			    "name": "RALGPS2 ~ 7"
			},
			{
			    "x": 41,
			    "y": 6,
			    "value": -0.3766,
			    "name": "RALGPS2 ~ 13"
			},
			{
			    "x": 41,
			    "y": 7,
			    "value": 3.2997,
			    "name": "RALGPS2 ~ 6"
			},
			{
			    "x": 41,
			    "y": 8,
			    "value": -0.2413,
			    "name": "RALGPS2 ~ 8"
			},
			{
			    "x": 41,
			    "y": 9,
			    "value": -0.1954,
			    "name": "RALGPS2 ~ 2"
			},
			{
			    "x": 41,
			    "y": 10,
			    "value": -0.2846,
			    "name": "RALGPS2 ~ 4"
			},
			{
			    "x": 41,
			    "y": 11,
			    "value": -0.352,
			    "name": "RALGPS2 ~ 1"
			},
			{
			    "x": 41,
			    "y": 12,
			    "value": -0.2866,
			    "name": "RALGPS2 ~ 3"
			},
			{
			    "x": 42,
			    "y": 0,
			    "value": -0.8926,
			    "name": "LDLRAP1 ~ 10"
			},
			{
			    "x": 42,
			    "y": 1,
			    "value": -0.9111,
			    "name": "LDLRAP1 ~ 9"
			},
			{
			    "x": 42,
			    "y": 2,
			    "value": -0.8512,
			    "name": "LDLRAP1 ~ 12"
			},
			{
			    "x": 42,
			    "y": 3,
			    "value": 0.4143,
			    "name": "LDLRAP1 ~ 11"
			},
			{
			    "x": 42,
			    "y": 4,
			    "value": -0.639,
			    "name": "LDLRAP1 ~ 5"
			},
			{
			    "x": 42,
			    "y": 5,
			    "value": -0.6697,
			    "name": "LDLRAP1 ~ 7"
			},
			{
			    "x": 42,
			    "y": 6,
			    "value": 0.5141,
			    "name": "LDLRAP1 ~ 13"
			},
			{
			    "x": 42,
			    "y": 7,
			    "value": -1.0211,
			    "name": "LDLRAP1 ~ 6"
			},
			{
			    "x": 42,
			    "y": 8,
			    "value": 2.2475,
			    "name": "LDLRAP1 ~ 8"
			},
			{
			    "x": 42,
			    "y": 9,
			    "value": 1.0609,
			    "name": "LDLRAP1 ~ 2"
			},
			{
			    "x": 42,
			    "y": 10,
			    "value": 1.0297,
			    "name": "LDLRAP1 ~ 4"
			},
			{
			    "x": 42,
			    "y": 11,
			    "value": -0.0061,
			    "name": "LDLRAP1 ~ 1"
			},
			{
			    "x": 42,
			    "y": 12,
			    "value": -0.2756,
			    "name": "LDLRAP1 ~ 3"
			},
			{
			    "x": 43,
			    "y": 0,
			    "value": -1.3712,
			    "name": "LCK ~ 10"
			},
			{
			    "x": 43,
			    "y": 1,
			    "value": -1.3114,
			    "name": "LCK ~ 9"
			},
			{
			    "x": 43,
			    "y": 2,
			    "value": -1.2076,
			    "name": "LCK ~ 12"
			},
			{
			    "x": 43,
			    "y": 3,
			    "value": -0.039,
			    "name": "LCK ~ 11"
			},
			{
			    "x": 43,
			    "y": 4,
			    "value": 0.9335,
			    "name": "LCK ~ 5"
			},
			{
			    "x": 43,
			    "y": 5,
			    "value": 0.4858,
			    "name": "LCK ~ 7"
			},
			{
			    "x": 43,
			    "y": 6,
			    "value": -0.5225,
			    "name": "LCK ~ 13"
			},
			{
			    "x": 43,
			    "y": 7,
			    "value": -1.2838,
			    "name": "LCK ~ 6"
			},
			{
			    "x": 43,
			    "y": 8,
			    "value": 1.1872,
			    "name": "LCK ~ 8"
			},
			{
			    "x": 43,
			    "y": 9,
			    "value": 0.7797,
			    "name": "LCK ~ 2"
			},
			{
			    "x": 43,
			    "y": 10,
			    "value": 0.7948,
			    "name": "LCK ~ 4"
			},
			{
			    "x": 43,
			    "y": 11,
			    "value": 0.6122,
			    "name": "LCK ~ 1"
			},
			{
			    "x": 43,
			    "y": 12,
			    "value": 0.9423,
			    "name": "LCK ~ 3"
			},
			{
			    "x": 44,
			    "y": 0,
			    "value": -0.9054,
			    "name": "C1orf228 ~ 10"
			},
			{
			    "x": 44,
			    "y": 1,
			    "value": 0.8001,
			    "name": "C1orf228 ~ 9"
			},
			{
			    "x": 44,
			    "y": 2,
			    "value": -0.3145,
			    "name": "C1orf228 ~ 12"
			},
			{
			    "x": 44,
			    "y": 3,
			    "value": -0.9054,
			    "name": "C1orf228 ~ 11"
			},
			{
			    "x": 44,
			    "y": 4,
			    "value": -0.8162,
			    "name": "C1orf228 ~ 5"
			},
			{
			    "x": 44,
			    "y": 5,
			    "value": -0.9054,
			    "name": "C1orf228 ~ 7"
			},
			{
			    "x": 44,
			    "y": 6,
			    "value": -0.9054,
			    "name": "C1orf228 ~ 13"
			},
			{
			    "x": 44,
			    "y": 7,
			    "value": -0.1539,
			    "name": "C1orf228 ~ 6"
			},
			{
			    "x": 44,
			    "y": 8,
			    "value": 2.1218,
			    "name": "C1orf228 ~ 8"
			},
			{
			    "x": 44,
			    "y": 9,
			    "value": 0.8809,
			    "name": "C1orf228 ~ 2"
			},
			{
			    "x": 44,
			    "y": 10,
			    "value": 1.2696,
			    "name": "C1orf228 ~ 4"
			},
			{
			    "x": 44,
			    "y": 11,
			    "value": 0.3576,
			    "name": "C1orf228 ~ 1"
			},
			{
			    "x": 44,
			    "y": 12,
			    "value": -0.5237,
			    "name": "C1orf228 ~ 3"
			},
			{
			    "x": 45,
			    "y": 0,
			    "value": -1.553,
			    "name": "LBH ~ 10"
			},
			{
			    "x": 45,
			    "y": 1,
			    "value": -1.6522,
			    "name": "LBH ~ 9"
			},
			{
			    "x": 45,
			    "y": 2,
			    "value": -1.339,
			    "name": "LBH ~ 12"
			},
			{
			    "x": 45,
			    "y": 3,
			    "value": -0.7753,
			    "name": "LBH ~ 11"
			},
			{
			    "x": 45,
			    "y": 4,
			    "value": 0.3985,
			    "name": "LBH ~ 5"
			},
			{
			    "x": 45,
			    "y": 5,
			    "value": 1.1167,
			    "name": "LBH ~ 7"
			},
			{
			    "x": 45,
			    "y": 6,
			    "value": 0.4424,
			    "name": "LBH ~ 13"
			},
			{
			    "x": 45,
			    "y": 7,
			    "value": 0.6118,
			    "name": "LBH ~ 6"
			},
			{
			    "x": 45,
			    "y": 8,
			    "value": 1.3481,
			    "name": "LBH ~ 8"
			},
			{
			    "x": 45,
			    "y": 9,
			    "value": 0.6533,
			    "name": "LBH ~ 2"
			},
			{
			    "x": 45,
			    "y": 10,
			    "value": 0.3232,
			    "name": "LBH ~ 4"
			},
			{
			    "x": 45,
			    "y": 11,
			    "value": 0.0551,
			    "name": "LBH ~ 1"
			},
			{
			    "x": 45,
			    "y": 12,
			    "value": 0.3705,
			    "name": "LBH ~ 3"
			},
			{
			    "x": 46,
			    "y": 0,
			    "value": -0.5486,
			    "name": "CD8B ~ 10"
			},
			{
			    "x": 46,
			    "y": 1,
			    "value": -0.5181,
			    "name": "CD8B ~ 9"
			},
			{
			    "x": 46,
			    "y": 2,
			    "value": -0.4909,
			    "name": "CD8B ~ 12"
			},
			{
			    "x": 46,
			    "y": 3,
			    "value": -0.5647,
			    "name": "CD8B ~ 11"
			},
			{
			    "x": 46,
			    "y": 4,
			    "value": 1.4825,
			    "name": "CD8B ~ 5"
			},
			{
			    "x": 46,
			    "y": 5,
			    "value": -0.5219,
			    "name": "CD8B ~ 7"
			},
			{
			    "x": 46,
			    "y": 6,
			    "value": -0.3605,
			    "name": "CD8B ~ 13"
			},
			{
			    "x": 46,
			    "y": 7,
			    "value": -0.5647,
			    "name": "CD8B ~ 6"
			},
			{
			    "x": 46,
			    "y": 8,
			    "value": 2.6569,
			    "name": "CD8B ~ 8"
			},
			{
			    "x": 46,
			    "y": 9,
			    "value": -0.4379,
			    "name": "CD8B ~ 2"
			},
			{
			    "x": 46,
			    "y": 10,
			    "value": -0.3831,
			    "name": "CD8B ~ 4"
			},
			{
			    "x": 46,
			    "y": 11,
			    "value": -0.3857,
			    "name": "CD8B ~ 1"
			},
			{
			    "x": 46,
			    "y": 12,
			    "value": 0.6367,
			    "name": "CD8B ~ 3"
			},
			{
			    "x": 47,
			    "y": 0,
			    "value": -1.6499,
			    "name": "GYPC ~ 10"
			},
			{
			    "x": 47,
			    "y": 1,
			    "value": -1.3781,
			    "name": "GYPC ~ 9"
			},
			{
			    "x": 47,
			    "y": 2,
			    "value": -0.8052,
			    "name": "GYPC ~ 12"
			},
			{
			    "x": 47,
			    "y": 3,
			    "value": -0.4458,
			    "name": "GYPC ~ 11"
			},
			{
			    "x": 47,
			    "y": 4,
			    "value": -0.0665,
			    "name": "GYPC ~ 5"
			},
			{
			    "x": 47,
			    "y": 5,
			    "value": 0.5106,
			    "name": "GYPC ~ 7"
			},
			{
			    "x": 47,
			    "y": 6,
			    "value": -0.0424,
			    "name": "GYPC ~ 13"
			},
			{
			    "x": 47,
			    "y": 7,
			    "value": -0.8342,
			    "name": "GYPC ~ 6"
			},
			{
			    "x": 47,
			    "y": 8,
			    "value": 1.515,
			    "name": "GYPC ~ 8"
			},
			{
			    "x": 47,
			    "y": 9,
			    "value": 1.1447,
			    "name": "GYPC ~ 2"
			},
			{
			    "x": 47,
			    "y": 10,
			    "value": 1.124,
			    "name": "GYPC ~ 4"
			},
			{
			    "x": 47,
			    "y": 11,
			    "value": 0.0971,
			    "name": "GYPC ~ 1"
			},
			{
			    "x": 47,
			    "y": 12,
			    "value": 0.8307,
			    "name": "GYPC ~ 3"
			},
			{
			    "x": 48,
			    "y": 0,
			    "value": -1.3274,
			    "name": "RPL11 ~ 10"
			},
			{
			    "x": 48,
			    "y": 1,
			    "value": -0.6949,
			    "name": "RPL11 ~ 9"
			},
			{
			    "x": 48,
			    "y": 2,
			    "value": -0.4757,
			    "name": "RPL11 ~ 12"
			},
			{
			    "x": 48,
			    "y": 3,
			    "value": -0.4425,
			    "name": "RPL11 ~ 11"
			},
			{
			    "x": 48,
			    "y": 4,
			    "value": -0.8343,
			    "name": "RPL11 ~ 5"
			},
			{
			    "x": 48,
			    "y": 5,
			    "value": -1.5742,
			    "name": "RPL11 ~ 7"
			},
			{
			    "x": 48,
			    "y": 6,
			    "value": 0.0417,
			    "name": "RPL11 ~ 13"
			},
			{
			    "x": 48,
			    "y": 7,
			    "value": 0.6228,
			    "name": "RPL11 ~ 6"
			},
			{
			    "x": 48,
			    "y": 8,
			    "value": 1.0844,
			    "name": "RPL11 ~ 8"
			},
			{
			    "x": 48,
			    "y": 9,
			    "value": 1.3613,
			    "name": "RPL11 ~ 2"
			},
			{
			    "x": 48,
			    "y": 10,
			    "value": 1.4528,
			    "name": "RPL11 ~ 4"
			},
			{
			    "x": 48,
			    "y": 11,
			    "value": 0.7932,
			    "name": "RPL11 ~ 1"
			},
			{
			    "x": 48,
			    "y": 12,
			    "value": -0.0074,
			    "name": "RPL11 ~ 3"
			},
			{
			    "x": 49,
			    "y": 0,
			    "value": -1.4394,
			    "name": "RPS8 ~ 10"
			},
			{
			    "x": 49,
			    "y": 1,
			    "value": -0.8838,
			    "name": "RPS8 ~ 9"
			},
			{
			    "x": 49,
			    "y": 2,
			    "value": -0.2614,
			    "name": "RPS8 ~ 12"
			},
			{
			    "x": 49,
			    "y": 3,
			    "value": -0.0339,
			    "name": "RPS8 ~ 11"
			},
			{
			    "x": 49,
			    "y": 4,
			    "value": -0.6953,
			    "name": "RPS8 ~ 5"
			},
			{
			    "x": 49,
			    "y": 5,
			    "value": -1.3243,
			    "name": "RPS8 ~ 7"
			},
			{
			    "x": 49,
			    "y": 6,
			    "value": -0.8014,
			    "name": "RPS8 ~ 13"
			},
			{
			    "x": 49,
			    "y": 7,
			    "value": 0.8797,
			    "name": "RPS8 ~ 6"
			},
			{
			    "x": 49,
			    "y": 8,
			    "value": 1.3695,
			    "name": "RPS8 ~ 8"
			},
			{
			    "x": 49,
			    "y": 9,
			    "value": 1.2416,
			    "name": "RPS8 ~ 2"
			},
			{
			    "x": 49,
			    "y": 10,
			    "value": 1.3246,
			    "name": "RPS8 ~ 4"
			},
			{
			    "x": 49,
			    "y": 11,
			    "value": 0.4815,
			    "name": "RPS8 ~ 1"
			},
			{
			    "x": 49,
			    "y": 12,
			    "value": 0.1426,
			    "name": "RPS8 ~ 3"
			},
			{
			    "x": 50,
			    "y": 0,
			    "value": -1.4027,
			    "name": "RPS27 ~ 10"
			},
			{
			    "x": 50,
			    "y": 1,
			    "value": -1.717,
			    "name": "RPS27 ~ 9"
			},
			{
			    "x": 50,
			    "y": 2,
			    "value": -1.4778,
			    "name": "RPS27 ~ 12"
			},
			{
			    "x": 50,
			    "y": 3,
			    "value": -0.0617,
			    "name": "RPS27 ~ 11"
			},
			{
			    "x": 50,
			    "y": 4,
			    "value": 0.3269,
			    "name": "RPS27 ~ 5"
			},
			{
			    "x": 50,
			    "y": 5,
			    "value": -0.7906,
			    "name": "RPS27 ~ 7"
			},
			{
			    "x": 50,
			    "y": 6,
			    "value": 0.376,
			    "name": "RPS27 ~ 13"
			},
			{
			    "x": 50,
			    "y": 7,
			    "value": 0.7065,
			    "name": "RPS27 ~ 6"
			},
			{
			    "x": 50,
			    "y": 8,
			    "value": 0.7521,
			    "name": "RPS27 ~ 8"
			},
			{
			    "x": 50,
			    "y": 9,
			    "value": 1.0381,
			    "name": "RPS27 ~ 2"
			},
			{
			    "x": 50,
			    "y": 10,
			    "value": 1.1037,
			    "name": "RPS27 ~ 4"
			},
			{
			    "x": 50,
			    "y": 11,
			    "value": 0.6261,
			    "name": "RPS27 ~ 1"
			},
			{
			    "x": 50,
			    "y": 12,
			    "value": 0.5204,
			    "name": "RPS27 ~ 3"
			},
			{
			    "x": 51,
			    "y": 0,
			    "value": -1.1129,
			    "name": "SH3YL1 ~ 10"
			},
			{
			    "x": 51,
			    "y": 1,
			    "value": -1.2916,
			    "name": "SH3YL1 ~ 9"
			},
			{
			    "x": 51,
			    "y": 2,
			    "value": -0.5063,
			    "name": "SH3YL1 ~ 12"
			},
			{
			    "x": 51,
			    "y": 3,
			    "value": 0.0154,
			    "name": "SH3YL1 ~ 11"
			},
			{
			    "x": 51,
			    "y": 4,
			    "value": -0.9797,
			    "name": "SH3YL1 ~ 5"
			},
			{
			    "x": 51,
			    "y": 5,
			    "value": -0.6535,
			    "name": "SH3YL1 ~ 7"
			},
			{
			    "x": 51,
			    "y": 6,
			    "value": -0.263,
			    "name": "SH3YL1 ~ 13"
			},
			{
			    "x": 51,
			    "y": 7,
			    "value": -0.2254,
			    "name": "SH3YL1 ~ 6"
			},
			{
			    "x": 51,
			    "y": 8,
			    "value": 1.188,
			    "name": "SH3YL1 ~ 8"
			},
			{
			    "x": 51,
			    "y": 9,
			    "value": 1.5472,
			    "name": "SH3YL1 ~ 2"
			},
			{
			    "x": 51,
			    "y": 10,
			    "value": 1.5987,
			    "name": "SH3YL1 ~ 4"
			},
			{
			    "x": 51,
			    "y": 11,
			    "value": 0.9479,
			    "name": "SH3YL1 ~ 1"
			},
			{
			    "x": 51,
			    "y": 12,
			    "value": -0.2647,
			    "name": "SH3YL1 ~ 3"
			},
			{
			    "x": 52,
			    "y": 0,
			    "value": -2.0163,
			    "name": "RPS7 ~ 10"
			},
			{
			    "x": 52,
			    "y": 1,
			    "value": -0.9877,
			    "name": "RPS7 ~ 9"
			},
			{
			    "x": 52,
			    "y": 2,
			    "value": -0.1677,
			    "name": "RPS7 ~ 12"
			},
			{
			    "x": 52,
			    "y": 3,
			    "value": 0.4924,
			    "name": "RPS7 ~ 11"
			},
			{
			    "x": 52,
			    "y": 4,
			    "value": -0.1617,
			    "name": "RPS7 ~ 5"
			},
			{
			    "x": 52,
			    "y": 5,
			    "value": -1.238,
			    "name": "RPS7 ~ 7"
			},
			{
			    "x": 52,
			    "y": 6,
			    "value": -0.8871,
			    "name": "RPS7 ~ 13"
			},
			{
			    "x": 52,
			    "y": 7,
			    "value": 0.5582,
			    "name": "RPS7 ~ 6"
			},
			{
			    "x": 52,
			    "y": 8,
			    "value": 1.0358,
			    "name": "RPS7 ~ 8"
			},
			{
			    "x": 52,
			    "y": 9,
			    "value": 0.9288,
			    "name": "RPS7 ~ 2"
			},
			{
			    "x": 52,
			    "y": 10,
			    "value": 1.0753,
			    "name": "RPS7 ~ 4"
			},
			{
			    "x": 52,
			    "y": 11,
			    "value": 0.7269,
			    "name": "RPS7 ~ 1"
			},
			{
			    "x": 52,
			    "y": 12,
			    "value": 0.6412,
			    "name": "RPS7 ~ 3"
			},
			{
			    "x": 53,
			    "y": 0,
			    "value": -1.4923,
			    "name": "RPS27A ~ 10"
			},
			{
			    "x": 53,
			    "y": 1,
			    "value": -1.7955,
			    "name": "RPS27A ~ 9"
			},
			{
			    "x": 53,
			    "y": 2,
			    "value": -1.6862,
			    "name": "RPS27A ~ 12"
			},
			{
			    "x": 53,
			    "y": 3,
			    "value": 0.3271,
			    "name": "RPS27A ~ 11"
			},
			{
			    "x": 53,
			    "y": 4,
			    "value": 0.1731,
			    "name": "RPS27A ~ 5"
			},
			{
			    "x": 53,
			    "y": 5,
			    "value": -0.1956,
			    "name": "RPS27A ~ 7"
			},
			{
			    "x": 53,
			    "y": 6,
			    "value": 0.8457,
			    "name": "RPS27A ~ 13"
			},
			{
			    "x": 53,
			    "y": 7,
			    "value": 0.38,
			    "name": "RPS27A ~ 6"
			},
			{
			    "x": 53,
			    "y": 8,
			    "value": 0.7743,
			    "name": "RPS27A ~ 8"
			},
			{
			    "x": 53,
			    "y": 9,
			    "value": 1.1113,
			    "name": "RPS27A ~ 2"
			},
			{
			    "x": 53,
			    "y": 10,
			    "value": 0.6235,
			    "name": "RPS27A ~ 4"
			},
			{
			    "x": 53,
			    "y": 11,
			    "value": 0.5419,
			    "name": "RPS27A ~ 1"
			},
			{
			    "x": 53,
			    "y": 12,
			    "value": 0.3928,
			    "name": "RPS27A ~ 3"
			},
			{
			    "x": 54,
			    "y": 0,
			    "value": -1.4118,
			    "name": "RPL5 ~ 10"
			},
			{
			    "x": 54,
			    "y": 1,
			    "value": -1.5563,
			    "name": "RPL5 ~ 9"
			},
			{
			    "x": 54,
			    "y": 2,
			    "value": -0.1812,
			    "name": "RPL5 ~ 12"
			},
			{
			    "x": 54,
			    "y": 3,
			    "value": 0.094,
			    "name": "RPL5 ~ 11"
			},
			{
			    "x": 54,
			    "y": 4,
			    "value": -0.739,
			    "name": "RPL5 ~ 5"
			},
			{
			    "x": 54,
			    "y": 5,
			    "value": -1.0313,
			    "name": "RPL5 ~ 7"
			},
			{
			    "x": 54,
			    "y": 6,
			    "value": -0.2377,
			    "name": "RPL5 ~ 13"
			},
			{
			    "x": 54,
			    "y": 7,
			    "value": 0.2269,
			    "name": "RPL5 ~ 6"
			},
			{
			    "x": 54,
			    "y": 8,
			    "value": 1.4688,
			    "name": "RPL5 ~ 8"
			},
			{
			    "x": 54,
			    "y": 9,
			    "value": 1.1704,
			    "name": "RPL5 ~ 2"
			},
			{
			    "x": 54,
			    "y": 10,
			    "value": 1.3321,
			    "name": "RPL5 ~ 4"
			},
			{
			    "x": 54,
			    "y": 11,
			    "value": 0.7063,
			    "name": "RPL5 ~ 1"
			},
			{
			    "x": 54,
			    "y": 12,
			    "value": 0.159,
			    "name": "RPL5 ~ 3"
			},
			{
			    "x": 55,
			    "y": 0,
			    "value": -0.7275,
			    "name": "TRABD2A ~ 10"
			},
			{
			    "x": 55,
			    "y": 1,
			    "value": -0.7668,
			    "name": "TRABD2A ~ 9"
			},
			{
			    "x": 55,
			    "y": 2,
			    "value": -0.6686,
			    "name": "TRABD2A ~ 12"
			},
			{
			    "x": 55,
			    "y": 3,
			    "value": -0.8362,
			    "name": "TRABD2A ~ 11"
			},
			{
			    "x": 55,
			    "y": 4,
			    "value": -0.6315,
			    "name": "TRABD2A ~ 5"
			},
			{
			    "x": 55,
			    "y": 5,
			    "value": -0.7778,
			    "name": "TRABD2A ~ 7"
			},
			{
			    "x": 55,
			    "y": 6,
			    "value": 1.3063,
			    "name": "TRABD2A ~ 13"
			},
			{
			    "x": 55,
			    "y": 7,
			    "value": -0.7044,
			    "name": "TRABD2A ~ 6"
			},
			{
			    "x": 55,
			    "y": 8,
			    "value": 1.1917,
			    "name": "TRABD2A ~ 8"
			},
			{
			    "x": 55,
			    "y": 9,
			    "value": 1.3164,
			    "name": "TRABD2A ~ 2"
			},
			{
			    "x": 55,
			    "y": 10,
			    "value": 1.7252,
			    "name": "TRABD2A ~ 4"
			},
			{
			    "x": 55,
			    "y": 11,
			    "value": 0.1802,
			    "name": "TRABD2A ~ 1"
			},
			{
			    "x": 55,
			    "y": 12,
			    "value": -0.6069,
			    "name": "TRABD2A ~ 3"
			},
			{
			    "x": 56,
			    "y": 0,
			    "value": -0.7396,
			    "name": "MAL ~ 10"
			},
			{
			    "x": 56,
			    "y": 1,
			    "value": -0.7396,
			    "name": "MAL ~ 9"
			},
			{
			    "x": 56,
			    "y": 2,
			    "value": -0.7396,
			    "name": "MAL ~ 12"
			},
			{
			    "x": 56,
			    "y": 3,
			    "value": -0.6676,
			    "name": "MAL ~ 11"
			},
			{
			    "x": 56,
			    "y": 4,
			    "value": -0.6726,
			    "name": "MAL ~ 5"
			},
			{
			    "x": 56,
			    "y": 5,
			    "value": -0.6912,
			    "name": "MAL ~ 7"
			},
			{
			    "x": 56,
			    "y": 6,
			    "value": -0.1038,
			    "name": "MAL ~ 13"
			},
			{
			    "x": 56,
			    "y": 7,
			    "value": -0.6036,
			    "name": "MAL ~ 6"
			},
			{
			    "x": 56,
			    "y": 8,
			    "value": 1.1314,
			    "name": "MAL ~ 8"
			},
			{
			    "x": 56,
			    "y": 9,
			    "value": 1.6357,
			    "name": "MAL ~ 2"
			},
			{
			    "x": 56,
			    "y": 10,
			    "value": 1.9065,
			    "name": "MAL ~ 4"
			},
			{
			    "x": 56,
			    "y": 11,
			    "value": 0.841,
			    "name": "MAL ~ 1"
			},
			{
			    "x": 56,
			    "y": 12,
			    "value": -0.5569,
			    "name": "MAL ~ 3"
			},
			{
			    "x": 57,
			    "y": 0,
			    "value": -2.0111,
			    "name": "RPL24 ~ 10"
			},
			{
			    "x": 57,
			    "y": 1,
			    "value": -0.8744,
			    "name": "RPL24 ~ 9"
			},
			{
			    "x": 57,
			    "y": 2,
			    "value": -0.2816,
			    "name": "RPL24 ~ 12"
			},
			{
			    "x": 57,
			    "y": 3,
			    "value": -0.1485,
			    "name": "RPL24 ~ 11"
			},
			{
			    "x": 57,
			    "y": 4,
			    "value": -0.562,
			    "name": "RPL24 ~ 5"
			},
			{
			    "x": 57,
			    "y": 5,
			    "value": -1.1769,
			    "name": "RPL24 ~ 7"
			},
			{
			    "x": 57,
			    "y": 6,
			    "value": 0.5934,
			    "name": "RPL24 ~ 13"
			},
			{
			    "x": 57,
			    "y": 7,
			    "value": 0.0998,
			    "name": "RPL24 ~ 6"
			},
			{
			    "x": 57,
			    "y": 8,
			    "value": 0.8467,
			    "name": "RPL24 ~ 8"
			},
			{
			    "x": 57,
			    "y": 9,
			    "value": 1.4516,
			    "name": "RPL24 ~ 2"
			},
			{
			    "x": 57,
			    "y": 10,
			    "value": 1.3717,
			    "name": "RPL24 ~ 4"
			},
			{
			    "x": 57,
			    "y": 11,
			    "value": 0.5483,
			    "name": "RPL24 ~ 1"
			},
			{
			    "x": 57,
			    "y": 12,
			    "value": 0.143,
			    "name": "RPL24 ~ 3"
			},
			{
			    "x": 58,
			    "y": 0,
			    "value": -0.8738,
			    "name": "LEF1 ~ 10"
			},
			{
			    "x": 58,
			    "y": 1,
			    "value": -0.8322,
			    "name": "LEF1 ~ 9"
			},
			{
			    "x": 58,
			    "y": 2,
			    "value": -0.5657,
			    "name": "LEF1 ~ 12"
			},
			{
			    "x": 58,
			    "y": 3,
			    "value": -0.1119,
			    "name": "LEF1 ~ 11"
			},
			{
			    "x": 58,
			    "y": 4,
			    "value": -0.5561,
			    "name": "LEF1 ~ 5"
			},
			{
			    "x": 58,
			    "y": 5,
			    "value": -0.7833,
			    "name": "LEF1 ~ 7"
			},
			{
			    "x": 58,
			    "y": 6,
			    "value": -0.2277,
			    "name": "LEF1 ~ 13"
			},
			{
			    "x": 58,
			    "y": 7,
			    "value": -0.8139,
			    "name": "LEF1 ~ 6"
			},
			{
			    "x": 58,
			    "y": 8,
			    "value": 1.4026,
			    "name": "LEF1 ~ 8"
			},
			{
			    "x": 58,
			    "y": 9,
			    "value": 1.6249,
			    "name": "LEF1 ~ 2"
			},
			{
			    "x": 58,
			    "y": 10,
			    "value": 1.8736,
			    "name": "LEF1 ~ 4"
			},
			{
			    "x": 58,
			    "y": 11,
			    "value": 0.4044,
			    "name": "LEF1 ~ 1"
			},
			{
			    "x": 58,
			    "y": 12,
			    "value": -0.5409,
			    "name": "LEF1 ~ 3"
			},
			{
			    "x": 59,
			    "y": 0,
			    "value": -0.0848,
			    "name": "FYB ~ 10"
			},
			{
			    "x": 59,
			    "y": 1,
			    "value": 0.2448,
			    "name": "FYB ~ 9"
			},
			{
			    "x": 59,
			    "y": 2,
			    "value": -0.3147,
			    "name": "FYB ~ 12"
			},
			{
			    "x": 59,
			    "y": 3,
			    "value": -0.5978,
			    "name": "FYB ~ 11"
			},
			{
			    "x": 59,
			    "y": 4,
			    "value": -0.3969,
			    "name": "FYB ~ 5"
			},
			{
			    "x": 59,
			    "y": 5,
			    "value": -0.6176,
			    "name": "FYB ~ 7"
			},
			{
			    "x": 59,
			    "y": 6,
			    "value": -0.5867,
			    "name": "FYB ~ 13"
			},
			{
			    "x": 59,
			    "y": 7,
			    "value": -1.9948,
			    "name": "FYB ~ 6"
			},
			{
			    "x": 59,
			    "y": 8,
			    "value": 0.739,
			    "name": "FYB ~ 8"
			},
			{
			    "x": 59,
			    "y": 9,
			    "value": 1.4938,
			    "name": "FYB ~ 2"
			},
			{
			    "x": 59,
			    "y": 10,
			    "value": 1.4628,
			    "name": "FYB ~ 4"
			},
			{
			    "x": 59,
			    "y": 11,
			    "value": 1.1878,
			    "name": "FYB ~ 1"
			},
			{
			    "x": 59,
			    "y": 12,
			    "value": -0.5348,
			    "name": "FYB ~ 3"
			},
			{
			    "x": 60,
			    "y": 0,
			    "value": -0.737,
			    "name": "TNFRSF4 ~ 10"
			},
			{
			    "x": 60,
			    "y": 1,
			    "value": -0.5567,
			    "name": "TNFRSF4 ~ 9"
			},
			{
			    "x": 60,
			    "y": 2,
			    "value": -0.737,
			    "name": "TNFRSF4 ~ 12"
			},
			{
			    "x": 60,
			    "y": 3,
			    "value": 0.5858,
			    "name": "TNFRSF4 ~ 11"
			},
			{
			    "x": 60,
			    "y": 4,
			    "value": -0.5216,
			    "name": "TNFRSF4 ~ 5"
			},
			{
			    "x": 60,
			    "y": 5,
			    "value": 0.4243,
			    "name": "TNFRSF4 ~ 7"
			},
			{
			    "x": 60,
			    "y": 6,
			    "value": 1.1622,
			    "name": "TNFRSF4 ~ 13"
			},
			{
			    "x": 60,
			    "y": 7,
			    "value": -0.624,
			    "name": "TNFRSF4 ~ 6"
			},
			{
			    "x": 60,
			    "y": 8,
			    "value": -0.6114,
			    "name": "TNFRSF4 ~ 8"
			},
			{
			    "x": 60,
			    "y": 9,
			    "value": -0.3667,
			    "name": "TNFRSF4 ~ 2"
			},
			{
			    "x": 60,
			    "y": 10,
			    "value": -0.4781,
			    "name": "TNFRSF4 ~ 4"
			},
			{
			    "x": 60,
			    "y": 11,
			    "value": 2.6973,
			    "name": "TNFRSF4 ~ 1"
			},
			{
			    "x": 60,
			    "y": 12,
			    "value": -0.237,
			    "name": "TNFRSF4 ~ 3"
			},
			{
			    "x": 61,
			    "y": 0,
			    "value": -0.2344,
			    "name": "CD52 ~ 10"
			},
			{
			    "x": 61,
			    "y": 1,
			    "value": -0.9303,
			    "name": "CD52 ~ 9"
			},
			{
			    "x": 61,
			    "y": 2,
			    "value": -1.2711,
			    "name": "CD52 ~ 12"
			},
			{
			    "x": 61,
			    "y": 3,
			    "value": -0.8262,
			    "name": "CD52 ~ 11"
			},
			{
			    "x": 61,
			    "y": 4,
			    "value": 1.5102,
			    "name": "CD52 ~ 5"
			},
			{
			    "x": 61,
			    "y": 5,
			    "value": -1.8362,
			    "name": "CD52 ~ 7"
			},
			{
			    "x": 61,
			    "y": 6,
			    "value": 0.2852,
			    "name": "CD52 ~ 13"
			},
			{
			    "x": 61,
			    "y": 7,
			    "value": 1.153,
			    "name": "CD52 ~ 6"
			},
			{
			    "x": 61,
			    "y": 8,
			    "value": 0.0721,
			    "name": "CD52 ~ 8"
			},
			{
			    "x": 61,
			    "y": 9,
			    "value": 0.3444,
			    "name": "CD52 ~ 2"
			},
			{
			    "x": 61,
			    "y": 10,
			    "value": 0.3361,
			    "name": "CD52 ~ 4"
			},
			{
			    "x": 61,
			    "y": 11,
			    "value": 1.2014,
			    "name": "CD52 ~ 1"
			},
			{
			    "x": 61,
			    "y": 12,
			    "value": 0.1957,
			    "name": "CD52 ~ 3"
			},
			{
			    "x": 62,
			    "y": 0,
			    "value": -1.2017,
			    "name": "ODF2L ~ 10"
			},
			{
			    "x": 62,
			    "y": 1,
			    "value": -1.3329,
			    "name": "ODF2L ~ 9"
			},
			{
			    "x": 62,
			    "y": 2,
			    "value": -0.9395,
			    "name": "ODF2L ~ 12"
			},
			{
			    "x": 62,
			    "y": 3,
			    "value": 1.27,
			    "name": "ODF2L ~ 11"
			},
			{
			    "x": 62,
			    "y": 4,
			    "value": -0.0124,
			    "name": "ODF2L ~ 5"
			},
			{
			    "x": 62,
			    "y": 5,
			    "value": -0.0505,
			    "name": "ODF2L ~ 7"
			},
			{
			    "x": 62,
			    "y": 6,
			    "value": 1.0965,
			    "name": "ODF2L ~ 13"
			},
			{
			    "x": 62,
			    "y": 7,
			    "value": -0.4165,
			    "name": "ODF2L ~ 6"
			},
			{
			    "x": 62,
			    "y": 8,
			    "value": -0.7529,
			    "name": "ODF2L ~ 8"
			},
			{
			    "x": 62,
			    "y": 9,
			    "value": -0.1231,
			    "name": "ODF2L ~ 2"
			},
			{
			    "x": 62,
			    "y": 10,
			    "value": -0.3638,
			    "name": "ODF2L ~ 4"
			},
			{
			    "x": 62,
			    "y": 11,
			    "value": 1.726,
			    "name": "ODF2L ~ 1"
			},
			{
			    "x": 62,
			    "y": 12,
			    "value": 1.1008,
			    "name": "ODF2L ~ 3"
			},
			{
			    "x": 63,
			    "y": 0,
			    "value": -0.9751,
			    "name": "PBXIP1 ~ 10"
			},
			{
			    "x": 63,
			    "y": 1,
			    "value": -0.6876,
			    "name": "PBXIP1 ~ 9"
			},
			{
			    "x": 63,
			    "y": 2,
			    "value": -0.9067,
			    "name": "PBXIP1 ~ 12"
			},
			{
			    "x": 63,
			    "y": 3,
			    "value": -1.08,
			    "name": "PBXIP1 ~ 11"
			},
			{
			    "x": 63,
			    "y": 4,
			    "value": -0.3297,
			    "name": "PBXIP1 ~ 5"
			},
			{
			    "x": 63,
			    "y": 5,
			    "value": -0.6517,
			    "name": "PBXIP1 ~ 7"
			},
			{
			    "x": 63,
			    "y": 6,
			    "value": 1.6181,
			    "name": "PBXIP1 ~ 13"
			},
			{
			    "x": 63,
			    "y": 7,
			    "value": -0.7962,
			    "name": "PBXIP1 ~ 6"
			},
			{
			    "x": 63,
			    "y": 8,
			    "value": 0.0262,
			    "name": "PBXIP1 ~ 8"
			},
			{
			    "x": 63,
			    "y": 9,
			    "value": 0.611,
			    "name": "PBXIP1 ~ 2"
			},
			{
			    "x": 63,
			    "y": 10,
			    "value": 0.7829,
			    "name": "PBXIP1 ~ 4"
			},
			{
			    "x": 63,
			    "y": 11,
			    "value": 1.8881,
			    "name": "PBXIP1 ~ 1"
			},
			{
			    "x": 63,
			    "y": 12,
			    "value": 0.5006,
			    "name": "PBXIP1 ~ 3"
			},
			{
			    "x": 64,
			    "y": 0,
			    "value": -1.2431,
			    "name": "ARHGAP15 ~ 10"
			},
			{
			    "x": 64,
			    "y": 1,
			    "value": -1.6986,
			    "name": "ARHGAP15 ~ 9"
			},
			{
			    "x": 64,
			    "y": 2,
			    "value": -0.9503,
			    "name": "ARHGAP15 ~ 12"
			},
			{
			    "x": 64,
			    "y": 3,
			    "value": 0.7267,
			    "name": "ARHGAP15 ~ 11"
			},
			{
			    "x": 64,
			    "y": 4,
			    "value": -0.6547,
			    "name": "ARHGAP15 ~ 5"
			},
			{
			    "x": 64,
			    "y": 5,
			    "value": -0.3452,
			    "name": "ARHGAP15 ~ 7"
			},
			{
			    "x": 64,
			    "y": 6,
			    "value": -0.1969,
			    "name": "ARHGAP15 ~ 13"
			},
			{
			    "x": 64,
			    "y": 7,
			    "value": 0.0005,
			    "name": "ARHGAP15 ~ 6"
			},
			{
			    "x": 64,
			    "y": 8,
			    "value": 1.1022,
			    "name": "ARHGAP15 ~ 8"
			},
			{
			    "x": 64,
			    "y": 9,
			    "value": 0.3871,
			    "name": "ARHGAP15 ~ 2"
			},
			{
			    "x": 64,
			    "y": 10,
			    "value": 0.1686,
			    "name": "ARHGAP15 ~ 4"
			},
			{
			    "x": 64,
			    "y": 11,
			    "value": 1.8539,
			    "name": "ARHGAP15 ~ 1"
			},
			{
			    "x": 64,
			    "y": 12,
			    "value": 0.8497,
			    "name": "ARHGAP15 ~ 3"
			},
			{
			    "x": 65,
			    "y": 0,
			    "value": -0.751,
			    "name": "CD28 ~ 10"
			},
			{
			    "x": 65,
			    "y": 1,
			    "value": -0.751,
			    "name": "CD28 ~ 9"
			},
			{
			    "x": 65,
			    "y": 2,
			    "value": -0.751,
			    "name": "CD28 ~ 12"
			},
			{
			    "x": 65,
			    "y": 3,
			    "value": 0.0149,
			    "name": "CD28 ~ 11"
			},
			{
			    "x": 65,
			    "y": 4,
			    "value": -0.751,
			    "name": "CD28 ~ 5"
			},
			{
			    "x": 65,
			    "y": 5,
			    "value": -0.502,
			    "name": "CD28 ~ 7"
			},
			{
			    "x": 65,
			    "y": 6,
			    "value": -0.751,
			    "name": "CD28 ~ 13"
			},
			{
			    "x": 65,
			    "y": 7,
			    "value": -0.751,
			    "name": "CD28 ~ 6"
			},
			{
			    "x": 65,
			    "y": 8,
			    "value": 0.3629,
			    "name": "CD28 ~ 8"
			},
			{
			    "x": 65,
			    "y": 9,
			    "value": 0.7149,
			    "name": "CD28 ~ 2"
			},
			{
			    "x": 65,
			    "y": 10,
			    "value": 1.2505,
			    "name": "CD28 ~ 4"
			},
			{
			    "x": 65,
			    "y": 11,
			    "value": 2.4741,
			    "name": "CD28 ~ 1"
			},
			{
			    "x": 65,
			    "y": 12,
			    "value": 0.1904,
			    "name": "CD28 ~ 3"
			},
			{
			    "x": 66,
			    "y": 0,
			    "value": -0.8379,
			    "name": "AC092580.4 ~ 10"
			},
			{
			    "x": 66,
			    "y": 1,
			    "value": -0.8379,
			    "name": "AC092580.4 ~ 9"
			},
			{
			    "x": 66,
			    "y": 2,
			    "value": -0.6745,
			    "name": "AC092580.4 ~ 12"
			},
			{
			    "x": 66,
			    "y": 3,
			    "value": 0.8228,
			    "name": "AC092580.4 ~ 11"
			},
			{
			    "x": 66,
			    "y": 4,
			    "value": 2.0033,
			    "name": "AC092580.4 ~ 5"
			},
			{
			    "x": 66,
			    "y": 5,
			    "value": -0.3689,
			    "name": "AC092580.4 ~ 7"
			},
			{
			    "x": 66,
			    "y": 6,
			    "value": 0.2428,
			    "name": "AC092580.4 ~ 13"
			},
			{
			    "x": 66,
			    "y": 7,
			    "value": -0.7256,
			    "name": "AC092580.4 ~ 6"
			},
			{
			    "x": 66,
			    "y": 8,
			    "value": -0.0751,
			    "name": "AC092580.4 ~ 8"
			},
			{
			    "x": 66,
			    "y": 9,
			    "value": -0.6908,
			    "name": "AC092580.4 ~ 2"
			},
			{
			    "x": 66,
			    "y": 10,
			    "value": -0.7267,
			    "name": "AC092580.4 ~ 4"
			},
			{
			    "x": 66,
			    "y": 11,
			    "value": -0.0591,
			    "name": "AC092580.4 ~ 1"
			},
			{
			    "x": 66,
			    "y": 12,
			    "value": 1.9274,
			    "name": "AC092580.4 ~ 3"
			},
			{
			    "x": 67,
			    "y": 0,
			    "value": -0.5881,
			    "name": "DUSP2 ~ 10"
			},
			{
			    "x": 67,
			    "y": 1,
			    "value": -0.6169,
			    "name": "DUSP2 ~ 9"
			},
			{
			    "x": 67,
			    "y": 2,
			    "value": -0.5859,
			    "name": "DUSP2 ~ 12"
			},
			{
			    "x": 67,
			    "y": 3,
			    "value": 1.8414,
			    "name": "DUSP2 ~ 11"
			},
			{
			    "x": 67,
			    "y": 4,
			    "value": -0.1711,
			    "name": "DUSP2 ~ 5"
			},
			{
			    "x": 67,
			    "y": 5,
			    "value": 0.1014,
			    "name": "DUSP2 ~ 7"
			},
			{
			    "x": 67,
			    "y": 6,
			    "value": 0.155,
			    "name": "DUSP2 ~ 13"
			},
			{
			    "x": 67,
			    "y": 7,
			    "value": -0.647,
			    "name": "DUSP2 ~ 6"
			},
			{
			    "x": 67,
			    "y": 8,
			    "value": -0.4295,
			    "name": "DUSP2 ~ 8"
			},
			{
			    "x": 67,
			    "y": 9,
			    "value": -0.5225,
			    "name": "DUSP2 ~ 2"
			},
			{
			    "x": 67,
			    "y": 10,
			    "value": -0.51,
			    "name": "DUSP2 ~ 4"
			},
			{
			    "x": 67,
			    "y": 11,
			    "value": -0.4956,
			    "name": "DUSP2 ~ 1"
			},
			{
			    "x": 67,
			    "y": 12,
			    "value": 2.4686,
			    "name": "DUSP2 ~ 3"
			},
			{
			    "x": 68,
			    "y": 0,
			    "value": -0.4817,
			    "name": "LYAR ~ 10"
			},
			{
			    "x": 68,
			    "y": 1,
			    "value": -0.4981,
			    "name": "LYAR ~ 9"
			},
			{
			    "x": 68,
			    "y": 2,
			    "value": -0.6768,
			    "name": "LYAR ~ 12"
			},
			{
			    "x": 68,
			    "y": 3,
			    "value": -0.582,
			    "name": "LYAR ~ 11"
			},
			{
			    "x": 68,
			    "y": 4,
			    "value": 1.5246,
			    "name": "LYAR ~ 5"
			},
			{
			    "x": 68,
			    "y": 5,
			    "value": 0.7998,
			    "name": "LYAR ~ 7"
			},
			{
			    "x": 68,
			    "y": 6,
			    "value": -0.2292,
			    "name": "LYAR ~ 13"
			},
			{
			    "x": 68,
			    "y": 7,
			    "value": -0.6996,
			    "name": "LYAR ~ 6"
			},
			{
			    "x": 68,
			    "y": 8,
			    "value": -0.5247,
			    "name": "LYAR ~ 8"
			},
			{
			    "x": 68,
			    "y": 9,
			    "value": -0.6032,
			    "name": "LYAR ~ 2"
			},
			{
			    "x": 68,
			    "y": 10,
			    "value": -0.6069,
			    "name": "LYAR ~ 4"
			},
			{
			    "x": 68,
			    "y": 11,
			    "value": 0.0875,
			    "name": "LYAR ~ 1"
			},
			{
			    "x": 68,
			    "y": 12,
			    "value": 2.4903,
			    "name": "LYAR ~ 3"
			},
			{
			    "x": 69,
			    "y": 0,
			    "value": 0.2027,
			    "name": "HLA-F ~ 10"
			},
			{
			    "x": 69,
			    "y": 1,
			    "value": -1.0851,
			    "name": "HLA-F ~ 9"
			},
			{
			    "x": 69,
			    "y": 2,
			    "value": -0.7696,
			    "name": "HLA-F ~ 12"
			},
			{
			    "x": 69,
			    "y": 3,
			    "value": -0.9359,
			    "name": "HLA-F ~ 11"
			},
			{
			    "x": 69,
			    "y": 4,
			    "value": 1.0065,
			    "name": "HLA-F ~ 5"
			},
			{
			    "x": 69,
			    "y": 5,
			    "value": 1.5031,
			    "name": "HLA-F ~ 7"
			},
			{
			    "x": 69,
			    "y": 6,
			    "value": 1.1474,
			    "name": "HLA-F ~ 13"
			},
			{
			    "x": 69,
			    "y": 7,
			    "value": -0.9741,
			    "name": "HLA-F ~ 6"
			},
			{
			    "x": 69,
			    "y": 8,
			    "value": -0.5193,
			    "name": "HLA-F ~ 8"
			},
			{
			    "x": 69,
			    "y": 9,
			    "value": -0.725,
			    "name": "HLA-F ~ 2"
			},
			{
			    "x": 69,
			    "y": 10,
			    "value": -0.6113,
			    "name": "HLA-F ~ 4"
			},
			{
			    "x": 69,
			    "y": 11,
			    "value": 0.1534,
			    "name": "HLA-F ~ 1"
			},
			{
			    "x": 69,
			    "y": 12,
			    "value": 1.6072,
			    "name": "HLA-F ~ 3"
			},
			{
			    "x": 70,
			    "y": 0,
			    "value": -0.9303,
			    "name": "HLA-A ~ 10"
			},
			{
			    "x": 70,
			    "y": 1,
			    "value": -0.3506,
			    "name": "HLA-A ~ 9"
			},
			{
			    "x": 70,
			    "y": 2,
			    "value": -0.7499,
			    "name": "HLA-A ~ 12"
			},
			{
			    "x": 70,
			    "y": 3,
			    "value": 1.0417,
			    "name": "HLA-A ~ 11"
			},
			{
			    "x": 70,
			    "y": 4,
			    "value": 1.6743,
			    "name": "HLA-A ~ 5"
			},
			{
			    "x": 70,
			    "y": 5,
			    "value": 1.596,
			    "name": "HLA-A ~ 7"
			},
			{
			    "x": 70,
			    "y": 6,
			    "value": -0.2262,
			    "name": "HLA-A ~ 13"
			},
			{
			    "x": 70,
			    "y": 7,
			    "value": -1.0116,
			    "name": "HLA-A ~ 6"
			},
			{
			    "x": 70,
			    "y": 8,
			    "value": -0.4702,
			    "name": "HLA-A ~ 8"
			},
			{
			    "x": 70,
			    "y": 9,
			    "value": -0.9073,
			    "name": "HLA-A ~ 2"
			},
			{
			    "x": 70,
			    "y": 10,
			    "value": -0.9238,
			    "name": "HLA-A ~ 4"
			},
			{
			    "x": 70,
			    "y": 11,
			    "value": 0.275,
			    "name": "HLA-A ~ 1"
			},
			{
			    "x": 70,
			    "y": 12,
			    "value": 0.9828,
			    "name": "HLA-A ~ 3"
			},
			{
			    "x": 71,
			    "y": 0,
			    "value": 0.2311,
			    "name": "HLA-B ~ 10"
			},
			{
			    "x": 71,
			    "y": 1,
			    "value": -0.1245,
			    "name": "HLA-B ~ 9"
			},
			{
			    "x": 71,
			    "y": 2,
			    "value": -0.955,
			    "name": "HLA-B ~ 12"
			},
			{
			    "x": 71,
			    "y": 3,
			    "value": 0.7971,
			    "name": "HLA-B ~ 11"
			},
			{
			    "x": 71,
			    "y": 4,
			    "value": 1.9239,
			    "name": "HLA-B ~ 5"
			},
			{
			    "x": 71,
			    "y": 5,
			    "value": 1.3837,
			    "name": "HLA-B ~ 7"
			},
			{
			    "x": 71,
			    "y": 6,
			    "value": -0.2297,
			    "name": "HLA-B ~ 13"
			},
			{
			    "x": 71,
			    "y": 7,
			    "value": -0.9537,
			    "name": "HLA-B ~ 6"
			},
			{
			    "x": 71,
			    "y": 8,
			    "value": -0.6994,
			    "name": "HLA-B ~ 8"
			},
			{
			    "x": 71,
			    "y": 9,
			    "value": -1.1683,
			    "name": "HLA-B ~ 2"
			},
			{
			    "x": 71,
			    "y": 10,
			    "value": -1.0826,
			    "name": "HLA-B ~ 4"
			},
			{
			    "x": 71,
			    "y": 11,
			    "value": -0.0051,
			    "name": "HLA-B ~ 1"
			},
			{
			    "x": 71,
			    "y": 12,
			    "value": 0.8827,
			    "name": "HLA-B ~ 3"
			}
		    ],
		    "type": "heatmap"
		}
	    ],
	    "tooltip": {
		"formatter": function(){
                    return this.point.name + ': ' +
			Highcharts.numberFormat(this.point.value, 2)
		}
	    },
	    "legend": {
		"enabled": true
	    },
	    "colorAxis": {
		"auxarg": true,
		"stops": [
		    [
			0,
			"#4681B3"
		    ],
		    [
			0.1111,
			"#749CC4"
		    ],
		    [
			0.2222,
			"#9DB7D5"
		    ],
		    [
			0.3333,
			"#C4D3E5"
		    ],
		    [
			0.4444,
			"#EBF0F6"
		    ],
		    [
			0.5556,
			"#FFE9E2"
		    ],
		    [
			0.6667,
			"#FFBFA9"
		    ],
		    [
			0.7778,
			"#FF9274"
		    ],
		    [
			0.8889,
			"#FF603F"
		    ],
		    [
			1,
			"#FF0000"
		    ]
		]
	    },
	    "xAxis": {
		"categories": ["HES4", "ISG15", "RP3-395M20.12", "TNFRSF14", "VAMP3", "TNFRSF8", "RBP7", "PGD", "AGTRAP", "UBR4", "CDA", "SH3BGRL3", "SDF4", "AURKAIP1", "MRPL20", "C1orf86", "RER1", "RPL22", "TNFRSF18", "JAK1", "CD2", "XCL2", "XCL1", "SELL", "ZNF683", "FCRL6", "C1orf21", "YWHAQ", "CD8A", "FGFBP2", "MIB2", "RUNX3", "FHL3", "CD160", "SH2D2A", "PYHIN1", "ID3", "RP5-887A10.1", "DRAM2", "FCRL1", "FCRLA", "RALGPS2", "LDLRAP1", "LCK", "C1orf228", "LBH", "CD8B", "GYPC", "RPL11", "RPS8", "RPS27", "SH3YL1", "RPS7", "RPS27A", "RPL5", "TRABD2A", "MAL", "RPL24", "LEF1", "FYB", "TNFRSF4", "CD52", "ODF2L", "PBXIP1", "ARHGAP15", "CD28", "AC092580.4", "DUSP2", "LYAR", "HLA-F", "HLA-A", "HLA-B"],
		"title": {
		    "text": ""
		},
		"opposite": true
	    }
	}
    )
});
