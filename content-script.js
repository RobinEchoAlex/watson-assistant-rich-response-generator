main()

function main(){
  const toolBars = document.getElementsByClassName("RichTextEditorToolbar")
  if (toolBars==null){
    return
  }else if (toolBars.length>1){
    return
  }
  const toolBar = toolBars[0]
  toolBar.style.backgroundColor = "#ff0000"
}
