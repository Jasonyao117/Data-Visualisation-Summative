function makeBarChart(data,options){
	var config = {	
		width:600,
		height: 400,
		margin: 50,	
		selector:'#barChartA',
	};

	_(config).extend(options);
	
	var spacing = config.width/(data.length*1.5);

	var xScale = d3.scaleLinear()
					.domain([100,0])
					.range([config.width,0]);

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
			.attr('fill','url(#grad1)')
			.transition()
			.duration(2000)
			.attr('width',(d) => xScale(d.y))
			.attr('x',config.margin);

	barGroups.append('text')
			.text((d) => d.x)
			.attr('y',spacing/2)
			.attr('x',-50)
			.attr('text-anchor','middle');

	//tooltip
	var tooltip = barChart.append('g')
						.attr('opacity',0);

	tooltip.append('rect')
			.attr('pointer-events','none')
			.attr('width',150)
			.attr('height',40)
			.attr('fill','rgba(0,0,0,0.3)');

	var tooltipText = tooltip.append('text')
							.text('bla')
							.attr('x',70)
							.attr('y',22)
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

