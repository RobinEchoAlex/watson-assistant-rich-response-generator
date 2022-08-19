main()

function main() {
  formFactory()
  const toolBars = document.getElementsByClassName("RichTextEditorToolbar")
  if (toolBars == null) {
    return
  } else if (toolBars.length > 1) {
    return
  }
  const toolBar = toolBars[0]
  if (toolBar===undefined){
    return
  }
  console.log(toolBar)

  const button = buttonCreator("image")
  toolBar.appendChild(button)

}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function formFactory() {
  if (document.getElementById("myForm")){
    return
  }

  const popup = document.createElement("div")
  popup.innerHTML = `<div class="form-popup" id="myForm" style="display: none">
        <form action="/action_page.php" class="form-container">
          <h1>Login</h1>
      
          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required>
      
          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required>
      
          <button type="submit" class="btn">Login</button>
          <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
        </form>
      </div>`
  document.getElementsByClassName("RichTextEditorToolbar")[0].appendChild(popup)
}

function buttonCreator(id) {
  const button = document.createElement("button")
  button.id = "RichTextEditor--toolbar--toolbar-button--" + id
  button.tabIndex = -1
  button.textContent = "id"
  addButtonClass(button)
  button.onclick = function () {
    openForm()
  }

  return button
}

function addButtonClass(button) {
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
  for (let i = 0; i < classList.length; i++) {
    button.classList.add(classList[i])
  }
}

function addStyleSheet(){

  let head = document.getElementsByTagName('HEAD')[0];
  let cssLinkElem = document.createElement('link');

  cssLinkElem.type = 'text/css';
  cssLinkElem.rel = 'stylesheet';
  cssLinkElem.href = 'popupImage.css';

  head.appendChild(cssLinkElem);
}
