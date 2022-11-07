import html2canvas from 'html2canvas'

export const exportToPng = () => {
  const ops = { 
    backgroundColor: 'null',
    useCORS: true,
    allowTaint: true,
  }
  html2canvas(document.body, ops).then(canvas => { 
    const dataImg = new Image()
    dataImg.src = canvas.toDataURL('image/png')
    const alink = document.createElement("a");
    alink.href = dataImg.src;
    alink.download = "whiteBoard.jpg";
    alink.click();
  })
}