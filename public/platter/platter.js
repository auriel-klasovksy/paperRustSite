window.ondragstart = function() {return false}
var platter = {hue: 100, lightness: 20, saturation: 100, changeHue:false, changeLight:false, changeSatu:false,
	get: _ =>	{
		return	`hsl( ${platter.hue}, ${platter.saturation}%, ${platter.lightness}%)`
	},
	current: _ =>	{
		return {hue: platter.hue, saturation: platter.saturation, lightness: platter.lightness}
	}
}
$('.hue').on('mousedown', event =>	{
	platter.changeHue = true;
	setHue(event)
})
$('.hue').on('mousemove', event =>	{
	if(platter.changeHue)
		setHue(event)
})
$('.hue').on('mouseup mouseleave', _=> platter.changeHue = false)
$('.hue').on('touchmove', event => {
	event.preventDefault()
	setHue(event.touches[0])
})
$('.lightness').on('mousedown', event =>	{
	platter.changeLight = true
	setLight(event)
})
$('.lightness').on('mousemove', event =>	{
	if(platter.changeLight)
		setLight(event)
})
$('.lightness').on('mouseup mouseleave', _=> platter.changeLight = false)
$('.lightness').on('touchmove', event =>	{
	event.preventDefault()
	setLight(event.touches[0])
})
$('.saturation').on('touchmove', event =>	{
	event.preventDefault()
	setSatu(event.touches[0])
})
$('.saturation').on('mousedown', event =>	{
	platter.changeSatu = true
	setSatu(event)
})
$('.saturation').on('mousemove', event =>	{
	if(platter.changeSatu)
		setSatu(event)
})
$('.saturation').on('mouseup mouseleave', _=> platter.changeSatu = false)

function setCurrentColor()	{
	$('.current_color').css('background-color', `hsl( ${platter.hue}, ${platter.saturation}%, ${platter.lightness}%)`)
	setLightSelector()
	setSatuSelector()
}
function setLightSelector()	{
	let hue = platter.hue
	$('.lightness').css('background-image', 
		`linear-gradient(to right, hsl(${hue}, 100%, 0%), hsl(${hue}, 100%, 50%), hsl(${hue}, 100%, 100%))`)
}
function setSatuSelector()	{
	let hue = platter.hue
	$('.saturation').css('background-image', 
		`linear-gradient(to right, hsl(${hue}, 100%, 50%), hsl(${hue}, 50%, 50%), hsl(${hue}, 0%, 50%))`)
}
function setHue(event)	{
	let centX = $('.hue').width()/2
	let centY = $('.hue').height()/2
	let locX = event.pageX - centX - $('.hue').offset().left
	let locY = event.pageY - centY - $('.hue').offset().top
	//cosin angle
	let cosAnd = locX/Math.sqrt(locX*locX + locY*locY)
	platter.hue = (locY < 0) ? 180 + (cosAnd + 1)*90 : 180 - (cosAnd + 1)*90
	setCurrentColor()
	setLightSelector()
	trayjs.change(platter.current())
}
function setHueAngle(angle)	{
	platter.hue = angle
	setCurrentColor()
}
function setLight(event) {
	platter.lightness = 100 * (event.pageX - $('.lightness').offset().left )/ $('.lightness').width()
	setCurrentColor()
	setLightPointer(event.pageX - $('.lightness').offset().left )
	trayjs.change(platter.current())
}
function setLightPrecent(precent)	{
	platter.lightness = precent
	setCurrentColor()
	setLightPointerPrecent(precent)
}
function setLightPointer(lightX)	{
	let p = $('.lightness').position()
	let h = $('.lightness').height()+$('.lightness_pointer').height()
	$('.lightness_pointer').css('top', 
		$('.lightness').offset().top - h/5)
	$('.lightness_pointer').css('left', p.left + lightX - $('.lightness_pointer').width())
}
function setLightPointerPrecent(precent)	{
	let p = $('.lightness').position()
	let h = $('.lightness').height()+$('.lightness_pointer').height()
	$('.lightness_pointer').css('top', 
		$('.lightness').offset().top - h/5)
	$('.lightness_pointer').css('left', p.left + precent * $('.lightness').width() / 100 - $('.lightness_pointer').width())
}
function setSaturationPrecent(precent)	{
	platter.saturation = precent
	setCurrentColor()
}
function setSatu(event) {
	platter.saturation = 100 - 100 * (event.pageX - $('.saturation').offset().left )/ $('.saturation').width()
	setCurrentColor()
	setSatuPointer(event.pageX - $('.saturation').offset().left )
	trayjs.change(platter.current())
}
function setSatuPrecent(precent)	{
	platter.saturation = precent
	setCurrentColor()
	setSatuPointerPrecent(precent)
}
function setSatuPointer(lightX)	{
	let p = $('.saturation').position()
	let h = $('.saturation').height()+$('.saturation_pointer').height()
	$('.saturation_pointer').css('top', 
		$('.saturation').offset().top - h/5)
	$('.saturation_pointer').css('left', p.left + lightX - $('.saturation_pointer').width())
}
function setSatuPointerPrecent(precent)	{
	let p = $('.saturation').position()
	let h = $('.saturation').height()+$('.saturation_pointer').height()
	$('.saturation_pointer').css('top', 
		$('.saturation').offset().top - h/5)
	$('.saturation_pointer').css('left', p.left + precent * $('.saturation').width() / 100 - $('.saturation_pointer').width())
}
