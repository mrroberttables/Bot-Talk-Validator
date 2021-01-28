let output;

function checkVariablesExist(input) {
	//match text that is in the format #text# (what should be variables)
	let matches = input.match(/#[\w\s]*#/g)||[];
	let allMatch = true;
	let incorrect = [];
	variableCounts = {};


	//loop through all potential variables
	for (var i = matches.length - 1; i >= 0; i--) {
		let isMatch = false;
		//Strip out the '#'
		let variable = matches[i].replaceAll('#','');
		//verify variable matches format variable[integer], or reject it
		if(!variable.match(/[a-zA-Z_]*\d*/g)) {
			allMatch = false;
			incorrect.push(matches[i]);
			continue;
		}
		else {
			//this matches the appropriate variable format, strip off any digits if present
			parts = variable.match(/[a-zA-Z_]+|[0-9]+/g);
			if(!variableCounts.hasOwnProperty(parts[0])) {
				variableCounts[parts[0]] = [];
			}
			//Only add if there is a number associated with it
			if(parts[1] !== undefined) {
				variableCounts[parts[0]].push(parts[1]);
			}
			
			variable = variable.replace(/\d*$/,'');
		}
		//loop through all known variables to compare
		for(var j = data['variables'].length - 1; j >= 0; j--) {
			//check to see if the current potential variable matches the know variable
			if(variable.toLowerCase() === data['variables'][j]['name'].toLowerCase()) {
				//This is a valid variable
				isMatch = true;
				break;
			}
		}

		//We have looped through all potential variables
		//If it isn't matched at this point its not a valid variable
		if(!isMatch) {
			allMatch = false;
			incorrect.push(matches[i]);
		}		
	}

	if(allMatch) {
		output.innerHTML += `<span class='correct'>&#10004; All variables appear correct.</span><br>`;
	}
	else {
		output.innerHTML += `<span class='error'>&#10006; Sorry, the following are not valid variables: ${incorrect}</span><br>`;
	}

	//Check for numbers in variables that aren't repeated
	let nonUnique = true;
	for(const vars in variableCounts) {
		if(variableCounts[vars].length > 0) {
			uniques = [...new Set(variableCounts[vars])];

			for(const uniqueValue in uniques) {
				if(variableCounts[vars].filter(x => x === uniques[uniqueValue]).length === 1) {
					nonUnique = false;
					break;
				}
			}
			if(!nonUnique) {
				output.innerHTML += `<span class='warning'>&#10148;There is a variable with an integer that is not repeated. While ToBeOrNotToBot will process the message, it is unnecessary.</span><br>`;
				break;
			}
		}
	}
}

function check_hashtag_count(input) {
	//Check to see if the number of #'s is even
	//If its not it might not necessarily be an error if the message sould just contain a '#'
	if( (input.match(/#/g)||[]).length % 2 === 0) {
		output.innerHTML += "<span class='correct'>&#10004; There are an even number of '#' characters</span><br>";
	}
	else {
		output.innerHTML += "<span class='error'>&#10006; There are an odd number of '#' characters. If you are only using them for variables something might be wrong</span><br>";
	}
}

function checkCommandsValid(input) {
	//Look for opening and closing tags
	let tags = input.match(/<\/?[a-zA-Z0-9]+>/g) ||[];
	let incorrect = [];
	
	//check to see if all tags have a proper open and closing and are nested appropriately
	let stack = [];
	let areMatched = true;
	for(var i = 0; i < tags.length; i++) {	
		if(tags[i].startsWith("</")) {
			//This is a closing tag
			//strip the '<', '>', and convert it to lowercase
			let tagName = tags[i].replace('</','').replace('>','').toLowerCase();

			//check if the current tag matches the last element in the stack
			if(stack.length > 0 && tagName === stack[stack.length - 1]) {
				stack.pop();
				continue;
			}
			else {
				areMatched = false;
				break;
			}

		} else {
			//This is an opening tag, add it to the stack
			//strip the '<', '>', and convert it to lowercase
			let tagName = tags[i].replace('<','').replace('>','').toLowerCase();

			//verify it is a proper command from the list
			if(data['commands'].filter(obj => { return obj['name'].toLowerCase() === tagName}).length !== 1)
			{
				incorrect.push(tagName);
			}
			stack.push(tagName);
		}
	}

	if(incorrect.length > 0) {
		output.innerHTML += `<span class='error'>&#10006; Sorry, the following are not valid variables: ${incorrect}</span><br>`;
	}
	else {
		output.innerHTML += `<span class='correct'>&#10004; All commands appear correct.</span><br>`;
	}

				
	if(stack.length === 0 && areMatched) {
		output.innerHTML += "<span class='correct'>&#10004; The commands are correctly formatted.</span><br>";		
	}
	else {
		output.innerHTML += "<span class='error'>&#10006; Sorry the commands are not correctly formatted.</span><br>";
	}
}

function checkOptionSetsValid(input) {
	let braces = input.match(/[\{\}]/g)||[];
	let braceCount = 0;
	let matching = true;

	//loop through all the braces in order.
	//+1 to the count for each opening brace
	//-1 to the count for each closing brace
	//if we ever drop below 0 than there is a closing brace without a prior opening brace
	for(var i = 0; i < braces.length; i++) {
		if(braces[i] === '{') {
			braceCount++;
		}
		else {
			braceCount--;
		}

		if(braceCount < 0) {
			matching = false;
		}
	}

	//if we finish with a count that is not zero, then we have an opening brace without a subsequent closing brace
	if(braceCount !== 0 || !matching) {
		output.innerHTML += "<span class='error'>&#10006; Sorry the option set, pause, or delay braces are not correctly formatted.</span><br>";
	}
	else {
		output.innerHTML += "<span class='correct'>&#10004; The option set, pause, and delay braces appear to be correctly formatted.</span><br>";
	}
}

//Check to make sure there are no empty options
function checkValidOptions(input) {
	//match any input that is '{ |', '| |', or '| }' indicating an empty option
	let options = input.match(/\{\s*\||\|\s*\||\|\s*\}/g)||[];

	if(options.length > 0) {
		output.innerHTML += "<span class='error'>&#10006; Sorry it appears you hane an empty option in an option set.</span><br>";
	}
	else {
		output.innerHTML += "<span class='correct'>&#10004; All options have a value</span><br>";
	}
}

function validatePauseAndDelay(input) {
	//match any input that is '{D=x}' or '{P=x}' with possible whitespace in between
  	let pauses = input.match(/\{\s*[DP]\s*\=\s*[^}]*\}/g)||[]; //  /\{\s*[DP]\s*\=\s*-?\w*\s*\}/g
  	let allValid = true;
  	if (pauses.length > 0) {

	  	for (var i = 0; i < pauses.length; i++ ) {
	  		let value = pauses[i].replace('{','').replace('P','').replace('D','').replace('=','').replace('}','').trim();

	  		const parsedValue = parseInt(value);

	  		if( !value.match(/[\-\w0-9]*/g) ||isNaN(parsedValue) || parsedValue <= 0) {
	  			allValid = false;
				output.innerHTML += "<span class='error'>&#10006; Sorry pauses and delays must be a valid positive integer value.</span><br>";
				break; //Break out so only 1 message is ever printed
	  		}
	  		if(pauses[i].includes('P') & parsedValue > 8) {
	  			allValid = false;
				output.innerHTML += "<span class='error'>&#10006; Sorry pauses must be a maximum of 8 seconds.</span><br>";
				break; //Break out so only 1 message is ever printed
	  		}
	  		
	  	}
  	}

  	if(allValid) {
		output.innerHTML += "<span class='correct'>&#10004; The pauses and delays appear to be correctly formatted.</span><br>";
  	}
  }

function characterCounter() {
	let count = document.getElementById('bottalktest').value.length;
	document.getElementById('info_div').innerHTML = count + '/200';
}

function insertCommand(areaId, command) {
    var txtarea = document.getElementById(areaId);
    var scrollPos = txtarea.scrollTop;
    var caretPos = txtarea.selectionStart;
    var selectionStart = txtarea.selectionStart;
    var selectionEnd = txtarea.selectionEnd;
    var textSelected = (txtarea.value).substring(selectionStart, selectionEnd);
    text = '<' + command + '>' + textSelected + '</' + command + '>';
    var front = (txtarea.value).substring(0, caretPos);
    var back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
    txtarea.value = front + text + back;
    if (textSelected) {
     	caretPos = caretPos + text.length;
    } else {
     	caretPos = caretPos + command.length + 2
    }
    txtarea.selectionStart = caretPos;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
    txtarea.scrollTop = scrollPos;

    characterCounter();
 }

function insertAtCaret(areaId, text) {
	text = '#' + text + '#';
	var txtarea = document.getElementById(areaId);
	var scrollPos = txtarea.scrollTop;
	var caretPos = txtarea.selectionStart;
	var front = (txtarea.value).substring(0, caretPos);
	var back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
	txtarea.value = front + text + back;
	caretPos = caretPos + text.length;
	txtarea.selectionStart = caretPos;
	txtarea.selectionEnd = caretPos;
	txtarea.focus();
	txtarea.scrollTop = scrollPos;

	characterCounter();
}

function insertPause(areaId, text) {
	text = '{' + text;
	//Don't add the equal sign if its a option set
	if(text !== '{|')
		text += '=';
	text += "}"
	var txtarea = document.getElementById(areaId);
	var scrollPos = txtarea.scrollTop;
	var caretPos = txtarea.selectionStart;
	var front = (txtarea.value).substring(0, caretPos);
	var back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
	txtarea.value = front + text + back;
	if(!text.includes('|'))
	{
		caretPos = caretPos + 3;
	}
	else
	{
		caretPos = caretPos + 1;
	}
	
	txtarea.selectionStart = caretPos;
	txtarea.selectionEnd = caretPos;
	txtarea.focus();
	txtarea.scrollTop = scrollPos;

	characterCounter();
}

function snippetFilter(inputId, listId) {
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById(inputId);
	filter = input.value.toUpperCase();
	ul = document.getElementById(listId);
	li = ul.getElementsByTagName("li");
	for (i = 0; i < li.length; i++) {
	 	a = li[i].getElementsByTagName("a")[0];
	 	txtValue = a.textContent || a.innerText;
	 	if (txtValue.toUpperCase().indexOf(filter) > -1) {
	    	li[i].style.display = "";
	  	} else {
	    	li[i].style.display = "none";
	  	}
	}
}

function showHelp(areaId, dataArray, field) {
	document.getElementById(areaId).innerHTML = data[dataArray].filter(obj => { return obj['name'] === field})[0]['helpText'];
}

function hideHelp(areaId) {
	document.getElementById(areaId).innerHTML = '';
}

function populateLists() {
	let list = document.getElementById('variableUL');
	for(var i = 0; i < data['variables'].length; i++) {
		list.innerHTML+= `<li><a href="#" onmouseover="showHelp('helpBox','variables','${data['variables'][i]['name']}');" onmouseout="hideHelp('helpBox')" onclick="insertAtCaret('bottalktest', '${data['variables'][i]['name']}');return false;">${data['variables'][i]['name']}<span class='hide'>${data['variables'][i]['tags']}</span></a></li>`;
	}

	let snippetList = document.getElementById('commandUL');

	for(var k = 0; k < data['multiparts'].length; k++) {
		snippetList.innerHTML += `<li><a href="#" onmouseover="showHelp('helpBox','multiparts', '${data['multiparts'][k]['name']}')" onmouseout="hideHelp('helpBox')" onclick="insertPause('bottalktest', '${data['multiparts'][k]['tags']}');return false;">${data['multiparts'][k]['name']}</a></li>`;
	}

	for(var j = 0; j < data['commands'].length; j++) {
		snippetList.innerHTML += `<li><a href="#" onmouseover="showHelp('helpBox','commands', '${data['commands'][j]['name']}')" onmouseout="hideHelp('helpBox')" onclick="insertCommand('bottalktest', '${data['commands'][j]['name']}');return false;">${data['commands'][j]['name']}<span class='hide'>${data['commands'][j]['tags']}</span></a></li>`;
	}

	//let delayList = document.getElementById('multipartUL');
	

	//check in case a refresh keeps text in the box
	characterCounter(); 	
}

function testString() {
	let testValue = document.getElementById('bottalktest').value;
	output = document.getElementById('outputDiv');
	output.innerHTML = "";

	checkVariablesExist(testValue);
	check_hashtag_count(testValue);
	checkCommandsValid(testValue);
	checkOptionSetsValid(testValue);
	validatePauseAndDelay(testValue);
	checkValidOptions(testValue);

}