main()

function main(){
  const toolBars = document.getElementsByClassName("RichTextEditorToolbar")
  if (toolBars==null){
    return
  }else if (toolBars.length>1){
    return
  }
  const toolBar = toolBars[0]
  console.log(toolBar)

  const button = buttonCreator("image")
  toolBar.appendChild(button)
}

function buttonCreator(id){
  const button = document.createElement("button")
  button.id = "RichTextEditor--toolbar--toolbar-button--" + id
  button.tabIndex = -1
  button.textContent = "id"
  addButtonClass(button)
  button.onclick = function (){
    alert("click")
  }

  return button
}

function addButtonClass(button){
  const classList = ["ToolbarButton",
    "bx--btn",
    "bx--btn--sm",
    "bx--btn--ghost",
    "bx--btn--disabled",
    "bx--tooltip--hidden",
    "bx--btn--icon-only",
    "bx--tooltip__trigger",
    "bx--tooltip--a11y",
    "bx--btn--icon-only--top",
    "bx--tooltip--align-center"]
  for(let i=0 ; i<classList.length;i++){
    button.classList.add(classList[i])
  }
}
