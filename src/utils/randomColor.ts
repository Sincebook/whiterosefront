export function randomColor() {
  let r = Math.floor(Math.random()*256);
	let g = Math.floor(Math.random()*256);
	let b = Math.floor(Math.random()*256);
	let rgb = 'rgb(' + r + ',' + g + ',' + b + ',' + '0.8' + ')';
	return rgb;

}