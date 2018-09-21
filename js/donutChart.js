var svg = d3.select("#donutChartA")
  .append("svg")
  .append("g")

svg.append("g")
    .attr("class", "slices");
svg.append("g")
    .attr("class", "labelName");
svg.append("g")
    .attr("class", "labelValue");
svg.append("g")
    .attr("class", "lines");

var width = 900,
    height = 400,
    radius = Math.min(width, height) / 2;

var pie = d3.pie()
    .sort(null)
    .value(function(d) {
        return d.value;
    });

var arc = d3.arc()
    .outerRadius(radius * 0.8)
    .innerRadius(radius * 0.4);

var outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

var legendRectSize = (radius * 0.05);
var legendSpacing = radius * 0.02;


var div = d3.select("body").append("div").attr("class", "toolTip");

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var colorRange = d3.scaleOrdinal(d3.schemeCategory20);
var color = d3.scaleOrdinal()
    .range(colorRange.range());

// Données obtenues avec le parser lib/parserTypesObjets.py 
// Graphique illisible si on garde toute les catégories,
// On va regrouper les dernières en une seule et même catégorie: "Autre"
data_Perrache = [31.18, 19.70, 17.19, 14.15, 5.06, 2.56, 2.56, 2.45, 1.31, 1.31, 0.82, 0.49, 0.49, 0.27, 0.22, 0.22, 0.05];
  
var valeur_autre = data_Perrache.slice(8);
console.log(valeur_autre);
var autre = valeur_autre.reduce((a, b) => a + b, 0);
var autre2 = (Math.floor(autre * 100) / 100).toFixed(2);

data_Perrache_light = [31.18, 19.70, 17.19, 14.15, 5.06, 2.56, 2.56, 2.45, autre2]
data_PartDieu = [40.97, 10.99, 5.18, 18.69, 7.65, 3.92, 1.94, 3.51, 1.17, 1.17, 1.71, 0.68, 0.68, 0.45, 0.23, 0.54, 0.54];
dataPartDieu_sort = [40.97, 18.69, 10.99, 7.65, 5.18, 3.92, 3.51, 1.94, 1.71, 1.17, 1.17, 0.68, 0.68, 0.54, 0.54, 0.45, 0.23]

var valeur_autre2 = dataPartDieu_sort.slice(6);
var autre_partdieu = valeur_autre2.reduce((a, b) => a + b, 0);
var autre_partdieu2 = (Math.floor(autre_partdieu * 100) / 100).toFixed(2);

dataPartDieu_sort_light = [40.97, 18.69, 10.99, 7.65, 5.18, 3.92, 3.51, autre_partdieu2];

//Types d'objets classés du plus présent au moins présent dans la gare perrache
type_objets_Perrache = ["Bagagerie", "Porte-monnaie","Pièces d'identités", "Appareils électroniques", "Vêtements, chaussures", "Optique", "Livres", "Clés", "Vélos, trotinettes", "Vélos, trottinette","Divers", "Articles d'enfants", "Articles de sport", "Articles médicaux","Instruments de musique", "Bijoux", "Parapluies"]
//Types d'objets classés du plus présent au moins présent dans la gare part-dieu
type_objets_PartDieu = ["Bagagerie", "Appareils électroniques", "Porte-monnaie", "Vêtements, chaussures", "Pièces d'identités", "Optique", "Clés", "Divers", "Vélos, trotinettes", "Vélos, trottinette", "Articles d'enfants", "Articles de sport", "Parapluies", "Bijoux","Articles médicaux", "Instruments de musique"]


type_objets_light = ["Front-end", "Back-end","Srucm Master", "UX-Design", "User Testing", "Video Editing", "Livres", "Animation", "Graphic Design"]

type_objets_PartDieu_light = ["Front-end", "UX-Design", "Back-end", "User Testing", "Srucm Master", "Video Editing", "Animation", "Graphic Design"]


datasetOption1 = [
        {label:type_objets_light[0], value:data_Perrache_light[0]}, 
        {label:type_objets_light[1], value:data_Perrache_light[1]}, 
        {label:type_objets_light[2], value:data_Perrache_light[2]},
        {label:type_objets_light[3], value:data_Perrache_light[3]},
        {label:type_objets_light[4], value:data_Perrache_light[4]},
        {label:type_objets_light[5], value:data_Perrache_light[5]},
        // Cette ligne qui affiche la valeur des livres pour Perrache
        // Ne fonctionne pas, nous n'arrivons pas à trouver l'erreur
        //{label:type_objets_light[6], value:data_Perrache_light[6]},
        {label:type_objets_light[7], value:data_Perrache_light[7]},
        {label:type_objets_light[8], value:data_Perrache_light[8]},
        ];

datasetOption2 = [
        {label:type_objets_PartDieu_light[0], value:dataPartDieu_sort_light[0]}, 
        {label:type_objets_PartDieu_light[1], value:dataPartDieu_sort_light[1]}, 
        {label:type_objets_PartDieu_light[2], value:dataPartDieu_sort_light[2]},
        {label:type_objets_PartDieu_light[3], value:dataPartDieu_sort_light[3]},
        {label:type_objets_PartDieu_light[4], value:dataPartDieu_sort_light[4]},
        {label:type_objets_PartDieu_light[5], value:dataPartDieu_sort_light[5]},
        {label:type_objets_PartDieu_light[6], value:dataPartDieu_sort_light[6]},
        {label:type_objets_PartDieu_light[7], value:dataPartDieu_sort_light[7]},
        ];

d3.selectAll("input")
  .on("change", selectDataset);
  
function selectDataset()
{
  change(datasetOption1);
  var value = this.value;
  //var value = d3.select('input[name="dataset"]:checked').node().value;
  
  if (value == "option1")
  {
    change(datasetOption1);
  }
  else if (value == "option2")
  {
    change(datasetOption2);
  }
}

function change(data) {

  /* ------- PIE SLICES -------*/
  var slice = svg.select(".slices").selectAll("path.slice")
        .data(pie(data), function(d){ return d.data.label });

    slice.enter()
        .insert("path")
        .style("fill", function(d) { return color(d.data.label); })
        .attr("class", "slice");

    slice
        .transition().duration(1000)
        .attrTween("d", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                return arc(interpolate(t));
            };
        })
    slice
        .on("mousemove", function(d){
            div.style("left", d3.event.pageX+10+"px");
            div.style("top", d3.event.pageY-25+"px");
            div.style("display", "inline-block");
            div.html((d.data.label)+"<br>"+(d.data.value)+"%");
        });
    slice
        .on("mouseout", function(d){
            div.style("display", "none");
        });

    slice.exit()
        .remove();

   
    /* ------- TEXT LABELS -------*/

    var text = svg.select(".labelName").selectAll("text")
        .data(pie(data), function(d){ return d.data.label });

    text.enter()
        .append("text")
        .attr("dy", ".35em")
        .text(function(d) {
            return (d.data.label+": "+d.value+"%");
        });

    function midAngle(d){
        return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    text
        .transition().duration(1000)
        .attrTween("transform", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                return "translate("+ pos +")";
            };
        })
        .styleTween("text-anchor", function(d){
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                return midAngle(d2) < Math.PI ? "start":"end";
            };
        })
        .text(function(d) {
            return (d.data.label+": "+d.value+"%");
        });


    text.exit()
        .remove();

    /* ------- SLICE TO TEXT POLYLINES -------*/

    var polyline = svg.select(".lines").selectAll("polyline")
        .data(pie(data), function(d){ return d.data.label });

    polyline.enter()
        .append("polyline");

    polyline.transition().duration(1000)
        .attrTween('points', function(d){
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                return [arc.centroid(d2), outerArc.centroid(d2), pos];
            };
        });

    polyline.exit()
        .remove();
};


// donut-chart
    var width = 300,
        height = 300,
        margin = 30;

    var titles = [
        {name:'Graphic Design',amount:6},
        {name:'Front-end',amount:8},
        {name:'Back-end',amount:5},
        {name:'Animation',amount:1}

    ];
    var pieDataGen = d3.pie()
                        .sort(null)// don't sort the data by some rules like from the highst to the lowest
                        .value(d => d.amount);

    var pieData = pieDataGen(titles);

    var radius = Math.min(width,height)/2; //common practise

    var arcGen = d3.arc()
                    .outerRadius(radius)
                    .innerRadius(radius/2)

    var colGen = d3.scaleOrdinal(['#1172B9','#4EC291','#1172B9','#F28B02']);

    var pieChart = d3.select('#donutChartB')
                .attr('viewBox','0 0 '+(width+margin*2)+' '+(height+margin*2))
                .append('g')
                .attr('transform','translate('+margin+','+margin+')');

    var arcGroup = pieChart.append('g')
                    .attr('transform','translate('+radius+','+radius+')');//move the pie from the topleft to the center

    arcGroup.selectAll('.arc')//
        .data(pieData)
        .enter()
        .append('path')
        .attr('id',d=>d.data.name)//give each arc an id
        .attr('class','arc')
        .attr('d',arcGen)
        .attr('fill',d =>colGen(d.data.name));


    arcGroup.selectAll('text')
        .data(pieData)
        .enter()
        .append('text')
        .style('font-size','0.5em')
        .attr('fill','white')
        .attr('text-anchor','middle')
        .attr('alignment-base','middle')
        .attr('transform',d => 'translate('+arcGen.centroid(d)+')')
        .text(d => d.data.name);

    d3.select('path#Wimbledon Open')
        .style("filter", "url(#drop-shadow)");




    // Titiles
    // shadow
    var defs = pieChart.append("defs");
    var filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "130%");
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation",8)
        .attr("result", "blur");
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0)
        .attr("dy", 0)
        .attr("result", "offsetBlur");
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    //circle
    var circleArc1 = d3.arc()
        .outerRadius(radius )
        .innerRadius(radius );

    pieChart.append('circle')
            .attr('r','75')
            .attr('cx', '150')
            .attr('cy', '150')
            .style("filter", "url(#drop-shadow)")
            .style('fill', 'white');


// donut-chart
    var width = 300,
        height = 300,
        margin = 30;

    var titles = [
        {name:'Graphic Design',amount:6},
        {name:'Front-end',amount:8},
        {name:'Back-end',amount:5},
        {name:'Animation',amount:1}

    ];
    var pieDataGen = d3.pie()
                        .sort(null)// don't sort the data by some rules like from the highst to the lowest
                        .value(d => d.amount);

    var pieData = pieDataGen(titles);

    var radius = Math.min(width,height)/2; //common practise

    var arcGen = d3.arc()
                    .outerRadius(radius)
                    .innerRadius(radius/2)

    var colGen = d3.scaleOrdinal(['#1172B9','#4EC291','#1172B9','#F28B02']);

    var pieChart = d3.select('#donutChartC')
                .attr('viewBox','0 0 '+(width+margin*2)+' '+(height+margin*2))
                .append('g')
                .attr('transform','translate('+margin+','+margin+')');

    var arcGroup = pieChart.append('g')
                    .attr('transform','translate('+radius+','+radius+')');//move the pie from the topleft to the center

    arcGroup.selectAll('.arc')//
        .data(pieData)
        .enter()
        .append('path')
        .attr('id',d=>d.data.name)//give each arc an id
        .attr('class','arc')
        .attr('d',arcGen)
        .attr('fill',d =>colGen(d.data.name));


    arcGroup.selectAll('text')
        .data(pieData)
        .enter()
        .append('text')
       .style('font-size','0.5em')
        .attr('fill','white')
        .attr('text-anchor','middle')
        .attr('alignment-base','middle')
        .attr('transform',d => 'translate('+arcGen.centroid(d)+')')
        .text(d => d.data.name);

    d3.select('path#Wimbledon Open')
        .style("filter", "url(#drop-shadow)");




    // Titiles
    // shadow
    var defs = pieChart.append("defs");
    var filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "130%");
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation",8)
        .attr("result", "blur");
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0)
        .attr("dy", 0)
        .attr("result", "offsetBlur");
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    //circle
    var circleArc1 = d3.arc()
        .outerRadius(radius )
        .innerRadius(radius );

    pieChart.append('circle')
            .attr('r','75')
            .attr('cx', '150')
            .attr('cy', '150')
            .style("filter", "url(#drop-shadow)")
            .style('fill', 'white');


// donut-chart
    var width = 300,
        height = 300,
        margin = 30;

    var titles = [
        {name:'Graphic Design',amount:6},
        {name:'Front-end',amount:8},
        {name:'Back-end',amount:5},
        {name:'Animation',amount:1}

    ];
    var pieDataGen = d3.pie()
                        .sort(null)// don't sort the data by some rules like from the highst to the lowest
                        .value(d => d.amount);

    var pieData = pieDataGen(titles);

    var radius = Math.min(width,height)/2; //common practise

    var arcGen = d3.arc()
                    .outerRadius(radius)
                    .innerRadius(radius/2)

    var colGen = d3.scaleOrdinal(['#1172B9','#4EC291','#1172B9','#F28B02']);

    var pieChart = d3.select('#donutChartD')
                .attr('viewBox','0 0 '+(width+margin*2)+' '+(height+margin*2))
                .append('g')
                .attr('transform','translate('+margin+','+margin+')');

    var arcGroup = pieChart.append('g')
                    .attr('transform','translate('+radius+','+radius+')');//move the pie from the topleft to the center

    arcGroup.selectAll('.arc')//
        .data(pieData)
        .enter()
        .append('path')
        .attr('id',d=>d.data.name)//give each arc an id
        .attr('class','arc')
        .attr('d',arcGen)
        .attr('fill',d =>colGen(d.data.name));


    arcGroup.selectAll('text')
        .data(pieData)
        .enter()
        .append('text')
        .style('font-size','0.5em')
        .attr('fill','white')
        .attr('text-anchor','middle')
        .attr('alignment-base','middle')
        .attr('transform',d => 'translate('+arcGen.centroid(d)+')')
        .text(d => d.data.name);

    d3.select('path#Wimbledon Open')
        .style("filter", "url(#drop-shadow)");




    // Titiles
    // shadow
    var defs = pieChart.append("defs");
    var filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "130%");
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation",8)
        .attr("result", "blur");
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0)
        .attr("dy", 0)
        .attr("result", "offsetBlur");
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    //circle
    var circleArc1 = d3.arc()
        .outerRadius(radius )
        .innerRadius(radius );

    pieChart.append('circle')
            .attr('r','75')
            .attr('cx', '150')
            .attr('cy', '150')
            .style("filter", "url(#drop-shadow)")
            .style('fill', 'white');