var eyeofmetatron_config = {
	canvasId: "eyeofmetatron",
	params:
	[
  0.3146853146853147,
  0.7575757575757575,
  0.386946386946387,
  0.5058275058275058,
  0.5268065268065268,
  0.49417249417249415,
  0.4219114219114219,
  0.9207459207459208,
  0.9,
  0.9
],
	colors: [
'#000064',
'#0500a6',
'#4e70a6',
'#8baadc',
'#8bb8ff',
'#ffcf00',
'#ff2600',
'#ff9900',
'#ffba51',
'#ff7251',
'#ff2600',
'#ce1f00',
'#8f1500',
'#610f00',
'#4c0b00',
'#4c2f29',
'#330800',
],
	pathes: [],
	project: null,
	reset: null,
	init: null,
	set: null,
	create: null,
	toggleDisplay: null,
	marker: null,
	rotation: null,
} 

let e = eyeofmetatron_config

e.set = function() {
	let canvas = document.getElementById(e.canvasId)
	canvas.width = canvas.offsetWidth
	canvas.height = canvas.offsetHeight
}
e.create = function() {
	function fitView()	{
		return Math.min(e.project.view.viewSize.width, e.project.view.viewSize._height)/3
	}
	e.project = new paper.Project(document.getElementById(e.canvasId))
	let center = e.project.view.center 
	
	e.marker = new paper.Path()
	e.marker.add(center)
	e.marker.add( center.clone().add(new paper.Point(0,10000)))
	e.marker.visible = false
	
	let amount = get('shapeAmount')
	let seed = new paper.Path.RegularPolygon(center, get('seed') + 2, fitView())
	seed.strokeWidth = 4;
	for(let i = 0; i < amount ; i++) {
		let npath = seed.clone()
		if(e.rotation !== null)
			npath.rotate((i+1)*e.rotation,center)
		e.pathes.push(seed.clone())
	}
	for(let i = 0; i < e.pathes.length ; i++) {
		e.pathes[i].strokeColor = e.colors[getColor(i)]
		e.pathes[i].strokeWidth = get('width') 
		transform(e.pathes[i],get('angle'),get('radious'))
		if(e.rotation != null)	{
			if(e.pathes[i] === undefined)
				break;
			e.pathes[i].rotate((i+1)*e.rotation)
		}
	}

	e.set()
	e.project.view.on('frame', () =>	{
		let angle = get('angle')
		let speed = get('speed')
		let amount = get('shapeAmount')
		e.marker.rotate(speed/100,center)
		for(let i = 0; i < amount; i++) {
			if(e.pathes[i] === undefined)
				break;
			e.pathes[i].rotate((i+1)*(speed)/100)
		}
	})
	e.project.view.on('resize', e.set)
}
e.toggleDisplay = function() {
	let canvas = document.getElementById(e.canvasId)
	if($('.animation.eyeofmetatron').css('display') != 'none')	{
		e.create()
	}
	else	{
		e.rotation = markerAngle()
		if(e.project)
			e.project.remove()
		if(e.pathes.length != 0 )
			e.pathes = []
		e.project = null
	}
}
e.reset = function()	{
	e.rotation = markerAngle()
	if(e.project)
		e.project.remove()
	if(e.pathes.length != 0 )
		e.pathes = []
	e.project = null
	e.create()
}
function getColor(i)	{
	return (get('colorPointer') + (i % get('colorAmount'))) % (e.colors.length - 2)
}
function transform(path,angle,radius)	{
	let center = e.project.view.center 
	path.rotate(angle)
	path.position = path.position.add(radius)
	path.pivot = center
}
function markerAngle()	{
	if(e.marker == null)
		return 0
	var vector = e.marker.segments[1].point.subtract(e.center)
	var pi = Math.acos(1*vector.y/100000)
	var angle = 180*pi/Math.PI 
	if(vector.x < 0)
		return angle
	else
		return 360 - angle
}
function get(paramName)	{
	switch ( paramName )	{
		case 'speed':
			return Math.pow(e.params[0] - 0.5,3)*30
		case 'shapeAmount':
			return Math.pow(2,e.params[1]*9)	
		case 'angle':
			return e.params[2]*90
		case 'radious':
			return e.params[3]*130 -65
		case 'colorAmount':
			return Math.floor(e.params[4] * e.colors.length) + 1
		case 'colorPointer':
			return Math.floor(e.params[5] * e.colors.length) + 1
		case 'seed':
			return Math.floor(e.params[6]*11)
		case 'width':
			return e.params[7]*2 + 0.05
	}
}
