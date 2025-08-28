//for bat-ela
//the shamanic spiral woman
window.mandaloop_config = {
	canvasId: 'mandaloop',
	colors: [ "#6bddd9", "#e898ad", "#e898ad", "#d33c64", "#4f1222", "#62c02c", "#22430f", "#468a1f", "#6bddd9"],
	depth: 20,
	speed: 1,
	buffer: 0.1,
	sides: 5,
	reseting: false,
	
	project: null,
	center: null,
	pathes: [],
	init: null,
	clear: null,
	reset: null,
	set: null,
	create: null,
	toggleDisplay: null
}
let c = mandaloop_config
$(document).ready(_ => 	{
	c.create()
})
c.create = function()	{
	let canvas = document.getElementById(c.canvasId)
	c.project = new paper.Project(canvas)
	c.project.activate()
	c.pathes[0] = new paper.Path.RegularPolygon(c.center, c.sides, fitView())
	for(let i = 0; i < c.depth; i++)	{
		let p = new paper.Path({
			segments: segmentsRatioCut(c.pathes[i],0.5),
			fillColor: c.colors[i%c.colors.length],
			closed: true
		})
		c.pathes.push(p)
	}
	let counter = 0
	c.project.view.on('frame', (event) =>	{
		if(counter++ > 100)	{
			counter = 0
		}
		for(let i = 2; i < c.pathes.length ; i++)	{
		for(let j = 0; j < c.pathes[i - 2].segments.length; j++)	{
			c.pathes[i].segments[j].point = pointRatioCut(c.pathes[i-2].segments[(j+1)%c.pathes[i-2].segments.length].point,
			c.pathes[i-2].segments[j].point, foo[i%2](event.time*c.speed,c.buffer))
		}
		}
	})
	c.set()
	c.project.view.on('resize', c.set)
}
c.set	= function()	{
	let canvas = document.getElementById(c.canvasId)
	canvas.width = canvas.offsetWidth
	canvas.height = canvas.offsetHeight
	c.project.view.translate( c.project.view.center )
}

c.toggleDisplay = function()	{
	let canvas = document.getElementById(c.canvasId)
	if($('.animation.mandaloop').css('display') != 'none')	{
		c.create()
	}
	else	{
		if(c.project)
			c.project.remove()
		if(c.pathes.length != 0 )
			c.pathes = []
		c.project = null
	}
}
c.reset = function()	{
	if(c.project)
		c.project.remove()
	if(c.pathes.length != 0 )
		c.pathes = []
	c.project = null
	c.create()
}

//flow function
function foo1(t,buffer)  {
	return ((Math.sin(t) + 1) / 2) * (1 - 2*buffer) + buffer
}
function foo2(t, buffer)  {
  return 1 - foo1(t,buffer) 
}
const foo = [foo1,foo2]

//takes a paper.Path and a ration
//returns an array of points cutting each segment of the path by the ratio.
function segmentsRatioCut(path,ratio)	{
	var result = [];
	for(let i = 0; i < path.segments.length; i++)	{
		result.push( new paper.Point( pointRatioCut(
			path.segments[(i+1)%path.segments.length].point,
			path.segments[i].point,
			ratio)))
	}
	return result;
}
//takes 2 points and returns a point in between them.
function pointRatioCut(point1,point2,ratio)	{
	return new paper.Point(point1.subtract(point2).multiply(ratio).add(point2));
}
function fitView()	{
	return Math.min(c.project.view.viewSize._width, c.project.view.viewSize._height)/1.9
}
