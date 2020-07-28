(
	function () {
		if (!document.getElementById("news-xpath-record")) {
			let panel = document.createElement("div");
			panel.id = "news-xpath-record";
			let html = document.getElementsByTagName("html");
			html[0].appendChild(panel);
			document.getElementById("news-xpath-record").innerHTML = "" + 
				"<div class='news-xpath-block'>" +
					"<div id='news-xpath-list'>" +
						"<div class='news-xpath-item'>" +
							"<span class='news-xpath-label'> <strong>列表 xpath</strong> </span>" +
							"<textarea class='news-xpath-textarea' id='newsList'></textarea><br />" +
							"<button class='news-xpath-copyXpath'>复制</button>" +
							"<button class='news-xpath-markXpath'>选中</button>" +
							"<button class='news-xpath-parentXpath'>父级</button>" +
						"</div>" +
						"<div class='news-xpath-item'>" +
							"<span class='news-xpath-label'> <strong>列表内容 xpath</strong> </span><br/>" +
							"<span id='news-xpath-article-tip'>未在列表块中，请重新选择！</span>" +
							"<textarea class='news-xpath-textarea' id='newsContent'  placeholder='先填写列表块 xpath' disabled ></textarea><br />" +
							"<button class='news-xpath-copyXpath'>复制</button>" +
							"<button class='news-xpath-markXpath'>选中</button>" +
							"<button class='news-xpath-parentXpath'>父级</button>" +
						"</div>" +
					"</div>" +
				"</div>" +
				"";
		}
	
		document.getElementById("newsList").focus();
		
		if (!document.getElementById('news-xpath-stylesheet')) {
				let elem = document.createElement("style");
				elem.id = "news-xpath-stylesheet";
				document.head.appendChild(elem);
				let orientation = "right";
				setStylesheet(orientation);
		}
		
		 function setStylesheet(orientation) {
				document.getElementById('news-xpath-stylesheet').innerHTML = "" +
						"#news-xpath-record{padding:15px;position:fixed;top:0;" + orientation + ":0;width:300px;z-index:9999999;background-color:#18191c;font-family:monospace;font-size:13px;color:#d0d0d0;box-shadow:none !important;}" +
						"#news-xpath-record div.news-xpath-block{background-color:#202226;border:1px #26282c solid;padding:10px 20px;box-shadow:none !important;position:relative;}" +
						"#news-xpath-record span.news-xpath-label{line-height:1.3;color:#d0d0d0;font-family:monospace;font-size:13px;box-shadow:none !important;}" +
						"#news-xpath-record span.news-xpath-label strong{font-weight:normal;color:#66CCFF;cursor:help;box-shadow:none !important;position:relative;}" +
						"#news-xpath-record textarea.news-xpath-textarea{box-sizing:border-box;overflow:hidden;background-color:#202226;border:1px #66CCFF solid;font-family:monospace;font-size:10px;color:#d0d0d0 !important;width:250px;height:100px;box-shadow:none !important;padding:5px;}" +
						"#news-xpath-record div.news-xpath-item {margin: 10px;text-align: center;display: inline-block;} " + 
						"#news-xpath-record .news-xpath-markXpath {float: left;}" +
						"#news-xpath-record .news-xpath-copyXpath {float: right;}" +
						"#news-xpath-record button {margin-top: 5px;background-color: #66CCFF;color:#18191c;}" +
						"#news-xpath-record #news-xpath-article-tip {display:none;color:red;}" +
						"";
		}

		document.getElementById("newsList").addEventListener("change",function(e){
		  if (e.target.value) {
				document.getElementById("newsContent").disabled = "";
			}
		});
		
		let copys = document.getElementsByClassName("news-xpath-copyXpath");
		for (let copy of copys) {
			copy.addEventListener("click", function(e){
				e.target.previousElementSibling.previousElementSibling.select()
				document.execCommand("Copy");
			})
		}
		
		let parents = document.getElementsByClassName("news-xpath-parentXpath");
		for (let parent of parents) {
			parent.addEventListener("click", function(e){
				let propName = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.id;
				let value = document.getElementById(propName).value;
				if (value.lastIndexOf("/") != 1 && value.lastIndexOf("/") != 0 ) {
				  parentValue = value.substring(0, value.lastIndexOf("/"));
				  document.getElementById(propName).value = parentValue;
					if (propName === "newsContent") {
						parentValue = document.getElementById("newsList").value + parentValue;
					}
					addStyleByXpath(parentValue);
				}
			})
		}
		
		let marks = document.getElementsByClassName("news-xpath-markXpath");
		for (let mark of marks) {
			mark.addEventListener("click", function(e){
				let ele = e.target.previousElementSibling.previousElementSibling.previousElementSibling;
				let xpathValue = ele.value;
				if (ele.id === "newsContent") {
					xpathValue = document.getElementById("newsList").value + xpathValue;
				}
				addStyleByXpath(xpathValue);
			})
		}
	}
)();