interface PointLocation {
  x: number
  y: number
}
export interface PathInfo {
  id?: string
  type?: string
  stroke: string
  strokeWidth: number
  fill?: string
  d: string
  text?: string
}

export const locationToPath = (locations: PointLocation, d: string): string => {
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