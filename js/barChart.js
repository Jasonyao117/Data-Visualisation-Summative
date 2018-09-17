function makeBarChart(data,options){

	var config = {
		height : 350,
		margin : 50,
		selector:'.barChart',
		colors:['olive','salmon'],
	};

	_(config).extend(options);
	// console.log(config);
	

	var spacing = config.width/(data.length*1.5);

	// var colGen = d3.scaleOrdinal(['olive','peachpuff','purple']);
	var colGen = d3.scaleOrdinal(['olive']);
					

	var xScale = d3.scaleLinear()
					.domain([100,0])
					.range([config.width,0]);

	var xAxisGen = d3.axisTop(xScale).ticks(4);


	var barChart = d3.select(config.selector)
				.attr('viewBox','0 0 '+(config.width+config.margin*2)+' '+(config.height+config.margin*2))
				.append('g')
				.attr('transform','translate('+config.margin/1.5+','+config.margin+')');

	var barGroups = barChart.selectAll('g')
						.data(data)
						.enter()
						.append('g')
						.attr('transform',(d,i)=>'translate(0,'+i*spacing+')');

	barGroups.append('rect')
			.attr('class','data-bar')
			.attr('height',spacing/2)
			.attr('width',0)
			.attr('x',config.margin)
			.attr('y',spacing/8)
			.attr('fill',(d,i)=>colGen(i))
			.transition()
			.duration(2000)
			.attr('width',(d) => xScale(d.y))
			.attr('x',config.margin);

	barGroups.append('text')
			.text((d) => d.x)
			.attr('y',spacing/2)
			.attr('x',0)
			.attr('text-anchor','middle');

	//axis
	barChart.append('g')
		.call(xAxisGen)
		.attr('transform','translate('+config.margin+',0)');

	//tooltip
	var tooltip = barChart.append('g')
						.attr('opacity',0);

	tooltip.append('rect')
			.attr('pointer-events','none')
			.attr('width',200)
			.attr('height',30)
			.attr('fill','rgba(0,0,0,0.3)');

	var tooltipText = tooltip.append('text')
							.text('bla')
							.attr('x',100)
							.attr('y',15)
							.attr('text-anchor','middle')
							.attr('alignment-baseline','middle');

	var dataBars = barChart.selectAll('.data-bar');

	dataBars.on('mouseover',function(d){
		tooltipText.text(d.x + ' : '+ d.y);
		tooltip.attr('opacity',1);
	});

	dataBars.on('mouseout',function(d){

		tooltip.attr('opacity',0);
	});

	dataBars.on('mousemove',function(){
		var mousePos = d3.mouse(this.parentNode.parentNode);

		var xPos = mousePos[0];
		var yPos = mousePos[1];
		tooltip.attr('transform','translate('+xPos+','+yPos+')');
	});
}