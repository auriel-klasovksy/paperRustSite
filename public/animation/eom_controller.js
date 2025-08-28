
$(document).ready( _=>	{
///////////////////////////////////////////////////////
$('#speed')[0].conf = function(v)	{
	eyeofmetatron_config.params[0] = v
	eyeofmetatron_config.reset()
	$('#speed')[0].val = v
}
$('#shapeAmount')[0].conf = function(v)	{
	eyeofmetatron_config.params[1] = v
	eyeofmetatron_config.reset()
	$('#shapeAmount')[0].val = v
}
$('#angle')[0].conf = function(v)	{
	eyeofmetatron_config.params[2] = v
	eyeofmetatron_config.reset()
	$('#angle')[0].val = v
}
$('#radious')[0].conf = function(v)	{
	eyeofmetatron_config.params[3] = v
	eyeofmetatron_config.reset()
	$('#radious')[0].val = v
}
$('#colorAmount')[0].conf = function(v)	{
	eyeofmetatron_config.params[4] = v
	eyeofmetatron_config.reset()
	$('#colorAmount')[0].val = v
}
$('#colorPointer')[0].conf = function(v)	{
	eyeofmetatron_config.params[5] = v
	eyeofmetatron_config.reset()
	$('#colorPointer')[0].val = v
}
$('#seed')[0].conf = function(v)	{
	eyeofmetatron_config.params[6] = v
	eyeofmetatron_config.reset()
	$('#seed')[0].val = v
}
$('#width')[0].conf = function(v)	{
	eyeofmetatron_config.params[7] = v
	eyeofmetatron_config.reset()
	$('#width')[0].val = v
}

///////////////////////////////////////////////////////
})
