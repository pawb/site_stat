// Enter data (this could have been imported)
// 1 px pour 1000 accidents, Blesses_legers, Blesses_graves, morts
const socialMedia = [
	{
		year: '2006',
		counts: { Accidents: 89612, Blesses_legers: 61362, Blesses_graves: 35962, Morts: 4641 }
	},
	{
		year: '2007',
		counts: { Accidents: 81472, Blesses_legers: 55860, Blesses_graves: 32690, Morts: 4191}
	},
	{
		year: '2008',
		counts: { Accidents: 76567, Blesses_legers: 52919, Blesses_graves: 30896, Morts: 3916 }
	}
];

// Add a total value for each year
const smTotal = socialMedia.map(d => {
	const counts = d3.entries(d.counts);
	const total = d3.sum(counts, c => c.value);
	return { year: d.year, counts, total };
});

// create a Y scale for the data
const scaleY = d3
	.scaleLinear()
	.range([0, 200])
	.domain([0, d3.max(smTotal, d => d.total)]);

// create a color scale for the data where Accidents is red
const scaleColor = d3
	.scaleOrdinal()
	.range(['#FE4A49', '#cccccc', '#dddddd', '#eeeeee'])
	.domain(['Accidents', 'Blesses_legers', 'Blesses_graves', 'Morts']);

// Select the figure element
const stack = d3.select('.stack');

// Add a div for each year
const group = stack
	.selectAll('.group')
	.data(smTotal)
	.enter()
	.append('div')
	.attr('class', 'group');

// Add a block for each social media type
const block = group
	.selectAll('.block')
	.data(d => d.counts)
	.enter()
	.append('div')
	.attr('class', 'block')
	// And scale the height of the box based on the value
	.style('height', d => `${scaleY(d.value)}px`)
	// Scale the color based on the social media type
	.style('background-color', d => scaleColor(d.key));

// Add a year label
const label = group
	.append('text')
	.text(d => d.year)
	.attr('class', 'label');

// Add a total count label
const count = group
	.append('text')
	.text(d => d3.format('0.2s')(d.total))
	.attr('class', 'count');




  // TEST PAW

// Add a year label
const label = group
.append('text')
.text(d => d.year)
.attr('class', 'label');
