let lables = document.body.getElementsByTagName("*");

// 侧边栏是否打开，isOpen，true：打开，false：关闭
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	let interface = document.getElementById('news-xpath-record');
	if (request.isOpen === "true") {
		if (interface) {
			interface.style.display = "block";
		}
		addEventByXpath();
	}
	if (request.isOpen === "false") {
		if (interface) {
		 interface.style.display = "none";
		}
		removeAllStyle();
	}
})

// 移入时生成边框，点击时输入xpath
function addEventByXpath () {
	let activeElementId = "";
	for (let lable of lables) {
		lable.onmouseover = function (e) {
			e.preventDefault();
			e.stopPropagation();
			// 获取当前输入框id
			activeElementId = document.activeElement.id
			let xpath = getXpath(e.target);
			addStyleByXpath(xpath);
		};
		lable.onclick = function (e) {
			e.preventDefault();
			e.stopPropagation();
			let xpath = getXpath(e.target);
			handleXpath(activeElementId, xpath);
		};
	}
}

// 处理xpath，newsList：列表，newsContent：列表的内容
function handleXpath (prop, value) {
	if (prop == 'newsList') {
		let str = value.match(/\/li(\[\d\])*/);
		if (str) {
			str = str[0];
			value = value.slice(0, value.indexOf('/li') + str.length);
		}
		if (value) {
			document.getElementById("newsContent").disabled = "";
		}
	}
	if (prop == 'newsContent') {
		if (!value.startsWith(document.getElementById('newsList').value)) {
			document.getElementById("news-xpath-article-tip").style.display = "inline";
			document.getElementById("newsContent").value = "";
			document.getElementById("newsContent").focus();
			return;
		}else {
			document.getElementById("news-xpath-article-tip").style.display = "none";
		}
		value = value.replace(document.getElementById('newsList').value, '');
		let str = value.match(/\/a(\[\d\])*/);
		if (str) {
			str = str[0];
			value = value.slice(0, value.indexOf('/a') + str.length);
		}
	}
	let result = document.getElementById(prop);
	if (result) {
		result.value = value;
	}
}

function removeAllStyle () {
	for (let lable of lables) {
		lable.style.border = "";
		lable.onmouseover = null;
		lable.onclick = null;
	}
}

function getXpath(element) {
	if (!element) {
		return "";
	}
	let attrs = element.attributes;
	let tagname = element.tagName.toLowerCase();
	if (tagname == "body") {
		return '/html/' + tagname;
	}
	for (let attr of attrs) {
		if (attr.nodeName == 'id' && tagname != "a") {
			return "//" + tagname + `[@id="` + attr.nodeValue + '"]';
		}
	}
	let ix = 1;
	let num = 0;
	let siblings = element.parentNode.children;
	for (let sibElement of siblings) {
		if (sibElement.nodeType == 1 && sibElement.tagName == element.tagName) {
			num++;
			if (num >= 3) {
				for (let attr of attrs) {
					if (attr.nodeName == 'class' && element.tagName == "DIV") {
						return getXpath(element.parentElement) + "/" + tagname + `[@class="` + attr.nodeValue + '"]';
					}
				}
				return getXpath(element.parentElement) + '/' + tagname;
			}
		}
	}
	for (let sibElement of siblings) {
		if (sibElement == element) {
				if (siblings.length == 1) {
					return getXpath(element.parentElement) + '/' + tagname;
				}
				return getXpath(element.parentElement) + '/' + tagname + '[' + (ix) + ']';
		} else if (sibElement.nodeType == 1 && sibElement.tagName == element.tagName) {
				ix++;
		}
	}
}


function addStyleByXpath (xpath) {
		let xnodes = [];
		for (let lable of lables) {
			lable.style.border = "";
		}
		try{
			let xresult = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
			let xres;
			while (xres = xresult.iterateNext()) {
					xnodes.push(xres);
			}
		}catch(e) {
			
		}
		xnodes.forEach((e) => {
			if (e) {
				e.style.border = "medium solid	#66CCFF";
			}
		})
}