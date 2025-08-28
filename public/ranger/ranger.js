var clicking = false
function ranger( div )	{
	if(this.follow == undefined) 
		this.follow = false 
	var range = document.createElement('div')
	range.className = "range_container"
	div.appendChild( range )
	var track = document.createElement('div')
	track.className = "range_track"
	range.appendChild( track )
	var thumb = document.createElement('div')
	thumb.className = `range_thumb ${div.className.split(' ')[0]}`
	$('.grid')[0].appendChild( thumb )
	div.cVal = null
	div.set = x =>	{
		if(x == undefined)	{
			if(div.cVal == null)	{
				div.cVal == div.getAttribute('val')
			}
			x = div.cVal
		}
		x = minmax(0,1,x)
		div.cVal = x;
		$(thumb).css('top', $(range).offset().top)
		$(thumb).css('left', $(range).offset().left + x * $(range).width()  - $(thumb).width()/2)
		div.setAttribute('val', x * 100)
		if(div.conf != undefined)
			div.conf(x)
	}
	range.onmousedown = event	=>	{
		ranger.follow = true
		div.set((event.pageX - $(range).offset().left)/$(range).width())
	}
	thumb.onmousedown = event	=>	{
		range.onmousedown(event)
	}
	thumb.addEventListener('touchmove', event => {
		event.preventDefault()
		div.set((event.touches[0].pageX-$(range).offset().left)/$(range).width())
	})
	range.onmousemove = event =>	{
		if(ranger.follow)	{
			div.set((event.pageX-$(range).offset().left)/$(range).width())
		}
	}
	thumb.onmousemove = event =>	{
		if(ranger.follow)
		range.onmousedown(event)
	}
	document.body.onmouseup = _ =>	{
		ranger.follow = false
	}
	div.setup = _ => {
		setTimeout(div.set(Number(div.getAttribute('val'))/100),0)
	}
}
function minmax(min, max, val)	{
	return	(val < min) ? (min) : 
		((val > max) ? (max) : 
		val)
}
$(document).ready( _ => {
	Array.from($('.ranger'))
		.forEach( ranger )
})
$(window).resize( _ =>	{
	Array.from($('.range_container'))
		.forEach( r => r.remove() )
	Array.from($('.range_thumb'))
		.forEach( r => r.remove() )
	Array.from($('.ranger'))
		.forEach( ranger )
	Array.from($('.ranger'))
		.forEach( d => d.set(d.getAttribute('val')/100) )
})
