function page( name, history = true )	{
	$('.grid').removeClass('main mandaloop eyeofmetatron about color')
	$('.grid').addClass(name)
	window.scrollTo({top:0})	
	if(history)
		window.history.pushState( name, '', name)
	Array.from($('.ranger')).forEach( r => {if(r.setup != undefined) r.setup()} )
	if(name == 'color')
		tray_init()
	setTimeout(window.mandaloop_config.restart,0)
	setTimeout(window.eyeofmetatron_config.restart,0)
}

window.onload = _ =>	{
	let name = window.location.pathname.substr(1)
	setTimeout( _=>	page(name, false),0)
}
window.onpopstate = state =>	{
	page(state.state, false)
}
