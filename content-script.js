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
  if (toolBar === undefined) {
    return
  }
  console.log(toolBar)

  const button = buttonCreator("image")
  toolBar.appendChild(button)

}

function openForm() {
  if (document.getElementById("imageForm") == null) {
    formFactory()
  }
  document.getElementById("imageForm").style.display = "block";
}

function closeForm() {
  document.getElementById("imageForm").style.display = "none";
}

function formFactory() {
  if (document.getElementById("imageForm")) {
    return
  }

  const popup = document.createElement("div")
  popup.innerHTML = `

<div class="form-popup" id="imageForm" style="display: none">
        <form onsubmit="alert(title); false" class="form-container">
          <h1>Add image</h1>
      
          <label for="title"><b>Title</b></label>
          <input id="titleInput" type="text" placeholder="The Scream" name="title" required>
      
          <label for="description"><b>Description</b></label>
          <input id="descInput" type="text" placeholder="created by Norwegian Edvard Munch" name="description" required>

          <label for="url"><b>URL</b></label>
          <input id="urlInput" type="url" placeholder="https://example.com/image.jpg" name="url" required>
          
          
          <button type="submit" class="btn">Copy to clipboard</button>
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

function addStyleSheet() {

  let head = document.getElementsByTagName('HEAD')[0];
  let cssLinkElem = document.createElement('link');

  cssLinkElem.type = 'text/css';
  cssLinkElem.rel = 'stylesheet';
  cssLinkElem.href = 'popupImage.css';

  head.appendChild(cssLinkElem);
}
