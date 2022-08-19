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
          
     
          <button id="submitImageForm" type="button" class="btn">Copy to clipboard</button>
          <button id="closeImageForm" type="button" class="btn cancel">Close</button>
        </form>
      </div>`
  document.getElementsByClassName("RichTextEditorToolbar")[0].appendChild(popup)
  //If directly writing onclick=ass() in html, a method not found error will be thrown
  //Possibly the innerhtml is not linked to chrome extension vm
  //But declare the onclick logic in main js body below will be fine
  document.getElementById("submitImageForm").onclick = function (){
    assembleImageResponse()
  }

  document.getElementById("closeImageForm").onclick = function (){
    closeForm()
  }
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

function assembleImageResponse(){
  let title = document.getElementById("titleInput").value
  let description = document.getElementById("descInput").value
  let source = document.getElementById("urlInput").value

  if (title==null || title.length===0 || description==null || description.length===0 || source==null || source.length===0){
    console.error("When submit form, one or more field is not filled or the value cannot be fetched")
    return
  }

  let jsonObj = {
    "generic":[
      {
        "response_type": "image",
        "source":  source,
        "title": title,
        "description": description
      }
    ]
  }

  let jsonStr = JSON.stringify(jsonObj)
  copyToClipboard(jsonStr)
}

function copyToClipboard(jsonStr){
  const type = "text/plain";
  const blob = new Blob([jsonStr], { type });
  const data = [new ClipboardItem({ [type]: blob })];

  navigator.clipboard.write(data).then(function() {
    console.log("Pasted to clipboard successfully.");
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }, function() {
    console.error("Fail pasting to clipboard.");
  });
}

