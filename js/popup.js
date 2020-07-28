let onBtn = document.getElementById("onBtn");
let offBtn = document.getElementById("offBtn");
onBtn.addEventListener('click', callback, true);
offBtn.addEventListener('click', callback, true);

function callback (e) {
	let isOpen = "true";
	if (e.target.id == "onBtn") {
		chrome.tabs.getSelected(null, function(tab){
				chrome.tabs.executeScript(
						tab.id,
						{file : "js/inject.js"});
		});
	}
	if (e.target.id == "offBtn") {
		isOpen = "false";
	}
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, {isOpen: isOpen}, (response) => {
					
			})
	})
	// 关闭popup
	window.close();
}