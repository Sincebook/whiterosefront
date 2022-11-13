export const calcAngle = ( midx, midy, xy) => {
  let clientx = 0
  let clienty = 0
  clientx = xy.x - midx
  clienty = midy - xy.y
  if (xy.y < midy && xy.x > midx) {
    return Math.atan(clientx / clienty) * 180 / Math.PI
  } else if (xy.y > midy && xy.x > midx){
    return 90 + (90 + Math.atan(clientx / clienty) * 180 / Math.PI) 
  } else if (xy.y > midy && xy.x < midx) {
    return 180 + Math.atan(clientx / clienty) * 180 / Math.PI
  } else {
    return 360 + Math.atan(clientx / clienty) * 180 / Math.PI
  }
}