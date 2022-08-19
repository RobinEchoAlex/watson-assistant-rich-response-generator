//https://developer.chrome.com/docs/extensions/mv3/content_scripts/
//this article needed to be improved to include necessary scripting permission for its example in "inject programmatically" section to work
//also, a "host permission" in manifest is needed to be added

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    console.log(tab)
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['sweetalert2.all.min.js']
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content-script.js']
    });
  }
})


function isWatsonWebsite(url){
  if (typeof url !== "string"){

  }
}
