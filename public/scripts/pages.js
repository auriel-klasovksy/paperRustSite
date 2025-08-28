function isMobile() {
	var width = screen.width
	return width < 550
};

//show and hide controllers
function mainMode(history = true)	{
	$('.container > :not(.handle)').css('display', 'block')
	if(isMobile())	{
		$('.text.head').css('display', 'none')
	}

	$('.handle').css('display', 'none')
	$('#return').css('display', 'none')
	$('.platter_container').css('display', 'none')
	$('#fullscreen').css('display', 'none')
	$('.gridControls').css('display', 'none')
	$('.colors').css('display', 'none')
	$('.colorButtons').css('display','none')
	$('.arrow').css('display', 'none')

	$('.container').removeClass('mandMod')
	$('.container').removeClass('eyeoMod')
	$('.container').addClass('mainMod')

	fixCanvasDimentions()

	if(history)
		window.history.pushState({pathname:'mainpage'}, '', 'main')
	else
		window.history.replaceState({pathname:'mainpage'}, '', 'main')
}	
function aboutMode()	{
	$('.container > :not(header)').css('display', 'none')
	$('.text.head').css('display','block')
	$('.about').css('display','block')
	$('.arrow.handle').css('display','block')
	
}
function mandaloopMode(history = true)	{
	//switch the display around
	$('.container > :not(.mandaloop').css('display', 'none')
	$('.container > .mandaloop').css('display', 'block')
	$('.formControlls > .handle').css('display', 'block')
	$('.colorButtons').css('display','block')
	$('.arrow.handle').css('display', 'block')
	$('.colors').css('display', 'none')

	$('.container').removeClass('mainMod')
	$('.container').removeClass('eyeoMod')
	$('.container').addClass('mandMod')
	if(isMobile())	{
		$('#return').css('display', 'none')
		$('#fullscreen').css('display', 'none')
	}
	else	{
		$('#return').css('display', 'block')
		$('#fullscreen').css('display', 'block')
	}
		
	
	fixCanvasDimentions()

	if(history)
		window.history.pushState({pathname:'mand'}, '', 'mand')
	else
		window.history.replaceState({pathname:'mand'}, '', 'mand')
}
function eyeofmetatronMode(history = true)	{
	$('.container > .eye_of_metatron').css('display','block')
	$('.container > :not(.eye_of_metatron)').css('display', 'none')
	$('#gridControls').css('display', 'none')
	$('.arrow.handle').css('display', 'block')
	$('.colors').css('display', 'none')

	$('.container').removeClass('mainMod')
	$('.container').removeClass('mandMod')
	$('.container').addClass('eyeoMod')

	if(isMobile())	{
		$('#return').css('display', 'none')
		$('#fullscreen').css('display', 'none')
	}
	else	{
		$('#return').css('display', 'block')
		$('#fullscreen').css('display', 'block')
	}
	fixCanvasDimentions()
	if(history)
		window.history.pushState({pathname:'eom'}, '', 'eom')
	else
		window.history.replaceState({pathname:'eom'}, '', 'eom')
}	

function fullMode()	{
	if($('.container').hasClass('eyeoMod'))	{
		$('#eyeOfMetatron').addClass('fullscreen')
	}
	else if($('.container').hasClass('mandMod')){
		$('#rsv').addClass('fullscreen')
	}
	fixCanvasDimentions()
	$('canvas').on('click', exitFullMode)
}
function exitFullMode()	{
	$('canvas').removeClass('fullscreen')
	fixCanvasDimentions()
	$('canvas').unbind(exitFullMode)
}

function colorMode()	{
	$('.container > *').css('display', 'none')
	$('.colors').css('display', 'grid')
	$('.arrow.color').css('display', 'block')
	$('.mandaloop > h3').css('display', 'block')
	$('.colorButtons').css('display','none')
	if(isMobile())	{
		$('.mandaloop.animation').css('display', 'block')
	}
	setLightPointer(50)
	trayjs.show()
}

window.addEventListener('resize', fixCanvasDimentions)

function fixCanvasDimentions()	{
	$('#rsv')[0].width =  $('#rsv').width()
	$('#rsv')[0].height =  $('#rsv').height()
	window.mandaloop.clear()
	window.mandaloop.init()
	$('#eyeOfMetatron')[0].width = $('#eyeOfMetatron').width()
	$('#eyeOfMetatron')[0].height = $('#eyeOfMetatron').height()

	if(window.eyeofmetatron.clear !== undefined && window.eyeofmetatron.init !== undefined )	{
		window.eyeofmetatron.clear()
		window.eyeofmetatron.init()
	}
}
