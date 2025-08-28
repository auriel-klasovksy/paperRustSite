var trayjs = { 
	colors: [ "#6bddd9", "#e898ad", "#e898ad", "#d33c64", "#4f1222", "#62c02c", "#22430f", "#468a1f", "#6bddd9"],
	elements: [],
	current:0,
	select:	function(index = 0)	{
		if (trayjs.colors.length == 0) return
		(index < 0) ? (trayjs.current = 0) :
			(index >= trayjs.colors.length) ? (trayjs.current = trayjs.colors.length - 1) :
				(trayjs.current = index)
		$('.selected').removeClass('selected')
		trayjs.elements[trayjs.current].addClass('selected')
		let hsl = rgbTohsl(hexToRgb(trayjs.colors[index]))
		setSatuPrecent(hsl.s * 100)
		setLightPrecent(hsl.l * 100)
		setHueAngle(hsl.h)
	},
	remove: _ =>	{
		trayjs.color = trayjs.colors.splice(trayjs.current,1)
		trayjs.elements[trayjs.current].remove()
		trayjs.element = trayjs.elements.splice(trayjs.current,1)
		if(trayjs.current >= trayjs.colors.length)
			trayjs.current = 0
		trayjs.select(trayjs.current)
		trayjs.accept()
		trayjs.show()
	},
	insert: color =>	{
		if(color == undefined)
			return
		trayjs.colors.splice(trayjs.current,0,objToCss(color))
		trayjs.accept()
		trayjs.show(false)
	},
	show:	(select = true) =>	{
		$('.tray_color').remove()
		trayjs.colors.forEach( (color, index) =>	{
			let d = $('<div class="tray_color"></div>')
			d.css('background-color', color)
			trayjs.elements[index] = d
			d.on('click', _=> trayjs.select(index))
			$('.trayjs').append(d)
		})
		if(select)
			trayjs.select()
	},
	accept:	_ =>	{
		if(!window.hasOwnProperty("mandaloop_config"))
			return
		mandaloop_config.colors = []
		trayjs.colors.forEach( color => {
			mandaloop_config.colors.push(color)
		})
		mandaloop_config.reset()
	},
	change: color =>	{
		trayjs.colors[trayjs.current] = objToCss(color)
		trayjs.accept()
		trayjs.show(false)
	}
}
$(document).ready( trayjs.show )
function tray_init() {
	let pa = 0.2, pb = 0.27, pc = 0.7
	//	e is the DOM elements
	let e = {}
	e.container = document.getElementsByClassName('container')[0]
	e.hue = document.getElementsByClassName('hue')[0]
	e.white = document.getElementsByClassName('white_fill')[0]
	e.center = document.getElementsByClassName('current_color')[0]
	e.light = document.getElementsByClassName('lightness')[0]
	e.sat	= document.getElementsByClassName('saturation')[0]
//this is borderbox land, if you dont want the border try clientWidth
	//	w is the width of the container element
	let w = e.container.offsetWidth 
	//	so we make sure that the circle have its space
	e.container.style.height = `${w}px`
	//	now we assign the widths of our elements
	e.w = {
		hue:	Math.round(w*(1-pa)),
		white:	Math.round(w*(1-pb)),
		center:	Math.round(w*(1-pc)),
		parameters: w
	}
	// 	and the left / top margin
	e.m = {
		hue:	w*pa/2,
		white:	w*pb/2,
		center: w*pc/2
	}
	e.hue.style.width =	`${e.w.hue}px`
	e.white.style.width =	`${e.w.white}px`
	e.center.style.width =	`${e.w.center}px`
	e.hue.style.height =	`${e.w.hue}px`
	e.white.style.height =	`${e.w.white}px`
	e.center.style.height =	`${e.w.center}px`
	e.hue.style.borderRadius =	`${e.w.hue}px`
	e.white.style.borderRadius =	`${e.w.white}px`
	e.center.style.borderRadius =	`${e.w.center}px`

	e.hue.style.top = `${e.m.hue}px`
	e.hue.style.left = `${e.m.hue}px`
	e.white.style.top = `${e.m.white}px`
	e.white.style.left = `${e.m.white}px`
	e.center.style.top = `${e.m.center}px`
	e.center.style.left = `${e.m.center}px`

	e.light.style.width	= `${e.w.parameters}px`
	e.sat.style.width	= `${e.w.parameters}px`
	e.light.style.height	= `16px`
	e.sat.style.height	= `16px`
	trayjs.select()
}
$(window).resize(_=>{setTimeout(tray_init,50);setTimeout(tray_init,60);})
