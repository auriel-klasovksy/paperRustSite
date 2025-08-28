
		
function pjc(h = 170,s = 1,l = 0.5)	{
	return {hue:h, saturation:s, lightness:l}
}
function objToCss( obj )	{
	if(obj.hue != undefined)
		return '#' + hsl2hex(Math.round(obj.hue), Math.round(obj.saturation), Math.round(obj.lightness))
	else
		return obj
}

function rgbToHex(rgb) { 
  var hex = Number(Math.round(rgb)).toString(16)
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};
function fullColorHex (rgb) {   
  var red = rgbToHex(rgb[0]);
  var green = rgbToHex(rgb[1]);
  var blue = rgbToHex(rgb[2]);
  return red+green+blue;
};

function hsl2hex(h,s,l)	{
	return fullColorHex(hsl2rgb(h/360,s/100,l/100))	
}

function hsl2rgb(h,s,l)	{
    var r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hueToRgb(p, q, h + 1/3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1/3);
    }
    return [to255(r), to255(g), to255(b)]
}
function to255(v) { return Math.min(255,256*v) }
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
/** Helper method that converts hue to rgb */
function hueToRgb(p, q, t) {
    if (t < 0)
        t += 1;
    if (t > 1)
        t -= 1;
    if (t < 1/6)
        return p + (q - p) * 6 * t;
    if (t < 1/2)
        return q;
    if (t < 2/3)
        return p + (q - p) * (2/3 - t) * 6;
    return p;
}
//thenx Nikolai
function rgbTohsl(rgb)	{
	if(rgb == null || rgb == undefined)
		return {l:1,s:0,h:0} 
	let r = rgb.r/255
	let g = rgb.g/255
	let b = rgb.b/255
	let min = Math.min(r,g,b)
	let max = Math.max(r,g,b)
	var l = (min + max)/2
	var s = (r == g && r == b) ? (0) : 
		((l < 0.5) ? ((max - min) / (max + min)) : 
		(( max - min) / (2 - max - min)))
	var h = (max == r) ? ((g - b) / (max - min)) :
		((max == g) ? (2 + (b - r) / (max - min)) : 
		/*max = b ! */(4 + (r - g) / (max - min)))
	h *= 60
	for (h; h < 0; h += 360)
	{}
	for (h; h > 360; h -= 360)
	{}
	return {l:l,s:s,h:h}
}

//all h, w and b are given in [0,1]
function HWBtoRGB(hwb)	{
	let v = 1 - hwb.b
	if(hwb.h === undefined)
		return {r:v,g:v,b:v}
	let i = Math.floor(hwb.h*6)
	let f = hwb.h*6-i
	if(i%2 == 1)
		f = 1-f
	let n = hwb.w + f*(v - hwb.w)
	let w = hwb.w
	switch(i)	{
		case 6:
		case 0:	return {r:v,g:n,b:w}
		case 1:	return {r:n,g:v,b:w}
		case 2:	return {r:w,g:v,b:n}
		case 3:	return {r:w,g:n,b:v}
		case 4:	return {r:n,g:w,b:v}
		case 5:	return {r:v,g:w,b:n}
	}
}
