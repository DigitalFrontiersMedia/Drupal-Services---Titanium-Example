//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();

	var nodeTitle = Ti.UI.createTextArea({
		top : 0,
		height : 30,
		font:{
			fontSize : 16
		}
	});
	
	var nodeBody = Ti.UI.createTextArea({
		top : 32,
		height : 100,
		font:{
			fontSize : 16
		}
	});

	var nodeNid = Ti.UI.createTextArea({
		top : 182,
		height : 30,
		font:{
			fontSize : 16
		}
	});

	self.add(nodeTitle);
	self.add(nodeBody);
	self.add(nodeNid);

	//button using localization-ready strings from <app dir>/i18n/en/strings.xml
	var sendButton = Ti.UI.createButton({
		title : 'send',
		bottom : 52,
		height : 50
	});
	self.add(sendButton);

	//Add behavior for UI
	sendButton.addEventListener('click', function(e) {
		var xhr = Ti.Network.createHTTPClient();
		xhr.open('POST', 'http://sts.dev4.webenabled.net/my-service-point');

		var xml_input;
		xml_input = "<methodCall>";
		xml_input += "  <methodName>node.create</methodName>";
		xml_input += "  <params>";
		xml_input += "    <param>";
		xml_input += "      <value>";
		xml_input += "        <struct>";
		
		xml_input += "          <member>";
		xml_input += "            <name>type</name>";
		xml_input += "            <value>";
		xml_input += "              <string>article</string>"; //content type
		xml_input += "            </value>";
		xml_input += "          </member>";
		
		xml_input += "          <member>";
		xml_input += "            <name>body</name>";
		xml_input += "            <value>";
		xml_input += "              <struct>";
		xml_input += "                <member>";
		xml_input += "                  <name>und</name>";
		xml_input += "                  <value>";
		xml_input += "                    <array>";
		xml_input += "                      <data>";
		xml_input += "                        <value>";
		xml_input += "                          <struct>";
		xml_input += "                            <member>";
		xml_input += "                              <name>value</name>";
		xml_input += "                              <value>";
		xml_input += "                                <string>" + nodeBody.value + "</string>";
		xml_input += "                              </value>";
		xml_input += "                            </member>";
		xml_input += "                          </struct>";
		xml_input += "                        </value>";
		xml_input += "                      </data>";
		xml_input += "                    </array>";
		xml_input += "                  </value>";
		xml_input += "                </member>";
		xml_input += "              </struct>";
		xml_input += "            </value>";
		xml_input += "          </member>";
		
		xml_input += "          <member>";
		xml_input += "            <name>title</name>";
		xml_input += "            <value>";
		xml_input += "              <string>" + nodeTitle.value + "</string>";
		xml_input += "            </value>";
		xml_input += "          </member>";
		
		xml_input += "        </struct>";
		xml_input += "      </value>";
		xml_input += "    </param>";
		xml_input += "  </params>";
		xml_input += "</methodCall>";

		xhr.onload = function() {
			Ti.API.info('XML: ' + this.responseXML + ' Text: ' + this.responseText);
			alert('Message sent!');
		}
		xhr.send(xml_input);
	});
	
	var getButton = Ti.UI.createButton({
		title : 'get',
		bottom : 0,
		height : 50
	});
	self.add(getButton);

	//Add behavior for UI
	getButton.addEventListener('click', function(e) {
		var xhr = Ti.Network.createHTTPClient();
		xhr.open('POST', 'http://sts.dev4.webenabled.net/my-service-point');

		var xml_input;
		xml_input = "<methodCall>";
		xml_input += "  <methodName>node.retrieve</methodName>";
		xml_input += "  <params>";
		xml_input += "    <param>";
		xml_input += "      <value>";
		xml_input += "        <struct>";
		xml_input += "          <member>";
		xml_input += "            <name>nid</name>";
		xml_input += "            <value>";
		xml_input += "              <string>"+ nodeNid.value +"</string>";
		xml_input += "            </value>";
		xml_input += "          </member>";
		xml_input += "        </struct>";
		xml_input += "      </value>";
		xml_input += "    </param>";
		xml_input += "  </params>";
		xml_input += "</methodCall>";

		xhr.onload = function() {
			var result = this.responseText;
			var xml = Ti.XML.parseString(result);

			var params = xml.documentElement.getElementsByTagName("member");
			var name = xml.documentElement.getElementsByTagName("name");
			var value = xml.documentElement.getElementsByTagName("string");
			var nodeData;

			for(var i = 0; i < params.item.length; i++) {
				Ti.API.info('Param ' + i + ': Value: ' + name.item(i).text);
				Ti.API.info('Param ' + i + ': Value: ' + value.item(i).text);
				if(name.item(i).text=='body') {
					nodeData = value.item(i).text;
					alert(nodeData);
					exit;
				}
				
			}
			
		}
		xhr.send(xml_input);
	});
	
	return self;
}

module.exports = FirstView;
