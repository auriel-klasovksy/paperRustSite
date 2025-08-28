$(document).ready( _=>	{
$('#mandaspeed')[0].conf = function(v)	{
	mandaloop_config.speed = Math.pow(v - 0.5,3)*6
	$('#mandaspeed')[0].val = v
}
$('#buffer')[0].conf = function(v)	{
	mandaloop_config.buffer = v
	$('#buffer')[0].val = v
}
$('#sides')[0].conf = function(v)	{
	mandaloop_config.sides = Math.round(v*9) + 3
	mandaloop_config.reset()
	$('#sides')[0].val = v
}
$('#depth')[0].conf = function(v)	{
	mandaloop_config.depth = Math.round(150*v)
	mandaloop_config.reset()
	$('#depth')[0].val = v
}
})
