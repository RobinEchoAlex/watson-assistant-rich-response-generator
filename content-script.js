main()

function main() {
  formFactory()

  //Find the toolbar which response-type buttons appended to
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

  //Add button to the toolbar
  const button = buttonCreator("image")
  toolBar.appendChild(button)

}

/**
 * Open a form
 */
function openForm() {
  if (document.getElementById("imageForm") == null) {
    formFactory()
  }
  document.getElementById("imageForm").style.display = "block";
}

/**
 * Close a form
 */
function closeForm() {
  document.getElementById("imageForm").style.display = "none";
}

/**
 * Create form for user to enter the parameter for a response type
 */
function formFactory() {
  if (document.getElementById("imageForm")) {
    return
  }

  const popup = document.createElement("div")
  popup.innerHTML = `
<!--the form is initialised as hidden via style-->
<div class="form-popup" id="imageForm" style="display: none">
        <form onsubmit="alert(title); false" class="form-container">
          <h1>Add image</h1>
      
          <label for="title"><b>Title</b></label>
          <input id="titleInput" type="text" placeholder="The Scream" name="title" required>
      
          <label for="description"><b>Description</b></label>
          <input id="descInput" type="text" placeholder="created by Norwegian Edvard Munch" name="description" required>

          <label for="url"><b>URL</b></label>
          <input id="urlInput" type="url" placeholder="https://example.com/image.jpg" name="url" required>
          
     
          <button id="submitImageForm" type="button" class="btn">Copy to clipboard</button>
          <button id="closeImageForm" type="button" class="btn cancel">Close</button>
        </form>
      </div>`
  document.getElementsByClassName("RichTextEditorToolbar")[0].appendChild(popup)
  //If directly writing onclick=ass() in html, a method not found error will be thrown
  //Possibly the innerhtml is not linked to chrome extension vm
  //But declare the onclick logic in main js body below will be fine
  document.getElementById("submitImageForm").onclick = function () {
    assembleImageResponse()
  }

  document.getElementById("closeImageForm").onclick = function () {
    closeForm()
  }
}

/**
 * Create a button that is ready to be added to the toolbar
 * @param id id of the button
 * @returns {HTMLButtonElement} HTML of the button
 */
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

/**
 * Add class to the button to be added to the toolbar
 * so it looks identical to existing buttons.
 * each class represent a style carbon design system
 * @see https://github.com/carbon-design-system/carbon
 * @param button button to be added
 */
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

/**
 * @deprecated
 * Inject style sheet to the webpage
 */
function addStyleSheet() {

  let head = document.getElementsByTagName('HEAD')[0];
  let cssLinkElem = document.createElement('link');

  cssLinkElem.type = 'text/css';
  cssLinkElem.rel = 'stylesheet';
  cssLinkElem.href = 'popupImage.css';

  head.appendChild(cssLinkElem);
}

/**
 * Assemble JSON text that represents an image response
 */
function assembleImageResponse() {
  let title = document.getElementById("titleInput").value
  let description = document.getElementById("descInput").value
  let source = document.getElementById("urlInput").value

  if (title == null || title.length === 0 || description == null || description.length === 0 || source == null || source.length === 0) {
    console.error("When submit form, one or more field is not filled or the value cannot be fetched")
    return
  }

  let jsonObj = {
    "generic": [
      {
        "response_type": "image",
        "source": source,
        "title": title,
        "description": description
      }
    ]
  }

  let jsonStr = JSON.stringify(jsonObj)
  pasteToClipboard(jsonStr)
}

/**
 * Paste text to Clipboard
 * @param jsonStr string to be pasted
 */
function pasteToClipboard(jsonStr) {
  const type = "text/plain";
  const blob = new Blob([jsonStr], {type});
  const data = [new ClipboardItem({[type]: blob})];

  navigator.clipboard.write(data).then(function () {
    console.log("Pasted to clipboard successfully.");
    Swal.fire({
      position: 'bottom-start',
      icon: 'success',
      title: 'The content has been copied',
      showConfirmButton: false,
      timer: 1145
    })
  }, function () {
    console.error("Fail pasting to clipboard.");
  });
}

