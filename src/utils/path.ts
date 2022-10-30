interface pointLocation {
  x: number
  y: number
}
interface svgInfo {
  id: string
  type: string
  stroke: string
  strokeWidth: number
  fill: string
  location: pointLocation[]
  text?: string
}

export const locationToPath = (locations: pointLocation, d: string): string => {
  const { x, y } = locations
  console.log(x, y);
  if (d.length === 0) {
    d = `M ${x} ${y}`
  }
  else { 
    d += ` Q ${x} ${y} ${x} ${y}`
  } 
  return d
}