(function(){
	if (!window.indexedDB) { 
		window.alert("Your browser doesn't support a stable version of IndexedDB. SmartNote will not be available."); 
	}

	//upgrade check
	indexedDB.open("smartnote",2).onupgradeneeded = function(e){
		console.log('upgrading...');
		var thisDB = e.target.result;
		if(!thisDB.objectStoreNames.contains("notelist")) {
			thisDB.createObjectStore("notelist", { autoIncrement: true });
		}
	};

	//open indexedDB request success
	indexedDB.open("smartnote",2).onsuccess = function(e){
		var form = document.getElementById("noteForm");
		var formContain = document.getElementById("form-container");
		console.log('success!');
		db = e.target.result;
		displayNotes();
		form.style.display = "none";
		formContain.style.display = "none";
		document.getElementById('btn_new').addEventListener('click', addNote);
		document.getElementById('btn_save').addEventListener('click', saveNote);
		document.getElementById('collapse').addEventListener('click', collapse);
		document.getElementById('btn_clear').addEventListener('click', clearAll);
	};

	//open indexedDB request fail
	indexedDB.open("smartnote",2).onerror = function(e){
		alert("Error", e.target.error.name);
	};
})();

//claar all data in indexedDB
function clearAll(){
	var clear = document.getElementById('btn_clear');
	var transaction = db.transaction(['notelist'], 'readwrite');
	var clearRequest = transaction.objectStore('notelist');
	if (confirm('Are you sure you want to clear ALL data?')) {
		clearRequest.onerror = function(e){
			alert("Error", e.target.error.name)
		};
		clearRequest.clear();	
		displayNotes();
	};	
}

//click "add a note" button and display the input form; 
//click again ("cancel") will cancel the input
function addNote(){
	var btnAdd = document.getElementById('btn_new');
	var btnCan = document.getElementById('btn_can');
	var btnSave = document.getElementById('btn_save');
	var form = document.getElementById("noteForm");
	var formContain = document.getElementById("form-container");
	if(form.style.display == "none"){
		formContain.style.display="";
		btnAdd.style.backgroundColor = "#CCCECB";
		btnAdd.innerHTML = "CANCEL";
		form.style.display = "block";
		window.scrollTo(0,document.body.scrollHeight);
	}else{
		formContain.style.display = "none";
		form.style.display = "none";
		btnAdd.innerHTML = "Add a Note";
		btnAdd.style.backgroundColor = "#6CBF24";
	}
};

//save the input form to indexedDB and display the indexedDB
function saveNote(nameInput, subjectInput, messageInput){
	var btnAdd = document.getElementById('btn_new');
	var form = document.getElementById("noteForm");
	this.nameInput = document.getElementById("NameText").value;
	this.subjectInput = document.getElementById("Sub").value;
	this.messageInput = document.getElementById("Msg").value;
	var note = {name: this.nameInput, subject: this.subjectInput, message: this.messageInput, created: new Date()};
	var transaction = db.transaction(['notelist'], 'readwrite');
	var store = transaction.objectStore('notelist');
	var request = store.add(note);
	request.onerror = function(e){
		alert("Error", e.target.error.name);
	};
	request.onsuccess = function(e){
		console.log('Done');
		displayNotes();
		form.style.display = "none";
		btnAdd.innerHTML = "Add a Note";
		btnAdd.style.backgroundColor = "#6CBF24";
	};
};	

//remove a note from list and indexedDB
function removeNote(thisId){    //thisId	    	
	var transId = parseInt(thisId);
	var transaction = db.transaction(["notelist"], "readwrite");
	var request = transaction.objectStore("notelist").delete(transId);
    request.onsuccess = function(e) {
    	//document.getElementById(transId).disabled = true;
    	displayNotes();
    };
    request.onerror = function(e){
		alert("Error", e.target.error.name);
	};
};

//collapse all notes
function collapse(){
    displayNotes();
}

// Display all notes that stored in indexedDB with a list view
// Display a characters count number after every note subject
function displayNotes() {
	var content = document.getElementById('noteList')
    var transaction = db.transaction(["notelist"], "readonly");
	var objectStore = transaction.objectStore("notelist");

    content.innerHTML= "<thead>" + "<tr id='throw'>" + "<th id='thname'>Subject (Characters in message)</th>" + "<th id='thsub'>Updated Time</th>" + "<th id ='thdel'><button onclick='collapse()' id='collapse'>Collapse All</button></th>" + "</tr>" + "</thead>";
 
    objectStore.openCursor().onsuccess = function(e) {  
    	var cursor = e.target.result;  
		    if (cursor) { 
		    	var count = cursor.value.message.length;
		        content.innerHTML += "<tbody id = 'tbody_tr" + cursor.key + "'>" 
		        	 				+ "<tr class = 'briefMsg' id = 'tr" + cursor.key + "'onclick = 'noteDetail(this.id)'>" //+ "'onclick = 'noteDetail(this.id)'>"
		        					+ "<td class='nameValue'>" + cursor.value.subject + " (" + count + " characters)" + "</td>" 
		        					+ "<td>" + cursor.value.created + "</td>" 
		        					+ "<td id='del_tr" + cursor.key +"'>" 
		        					+ "<button class='btn_del' id='" + cursor.key + "'onclick = 'removeNote(this.id)'>"//+ "'onclick = 'removeNote(this.id)'>"
		        					+ "<span>Delete</span>"
		        					+ "<img src = 'Image_Project1/del_btn.png' class='icon'></button>" + "</td>" + "</tr>"
		        					+ "<tr>" + "<td  style='display:none' class = 'time' id ='time_tr" + cursor.key + "'>" + "Name: " + cursor.value.name + "</td>" + "</tr>"
		        					+ "<tr>" + "<td  style='display:none' class = 'msg' id ='msg_tr" + cursor.key + "'>"  + cursor.value.message + "</td>" + "</tr>" + "</tbody>";      
		        cursor.continue();  
    		}  
    		else {  
        		console.log("no more data found");
    		}
    	countRow(); 
    };
};

//click a note, then display the detail of this note
//click again, collapse this note
function noteDetail(thisId){ //
	var transId = thisId.toString();

	var timeStamp = document.getElementById("time_" + transId);
	var msg = document.getElementById("msg_" + transId);
	var tbody = document.getElementById("tbody_" + transId);
	var state = timeStamp.style.display;

	if(state == "none"){
		timeStamp.colSpan = "3";
		msg.colSpan = "3";
		tbody.style.backgroundColor = "#FFF";
		tbody.style.fontWeight = "700";
		msg.style.fontWeight = "400";
		timeStamp.style.display = "";
		msg.style.display = "";
		tbody.style.border = "2px solid #7F7F7F";
	}else{
		tbody.style.backgroundColor = "";
		tbody.style.fontWeight = "";
		timeStamp.style.display = "none";
		msg.style.display = "none";
		tbody.style.border = "";
	}
};

//count the notes and show on the header
function countRow(){
	var Num = document.getElementById("count");
	var rows = document.getElementById("noteList").getElementsByClassName("btn_del").length;
	Num.innerHTML = "(" + rows + " Notes Total)";
};

//display the real time results which match the input
(function(document) {
	'use strict';

	var LightTableFilter = (function(Arr) {
		var _input;
		function _onInputEvent(e) {
			_input = e.target;
			var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
			Arr.forEach.call(tables, function(table) {
				Arr.forEach.call(table.tBodies, function(tbody) {
					Arr.forEach.call(tbody.rows, _filter);
				});
			});
		}

		function _filter(row) {
			var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
			row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
		}

		return {
			init: function() {
				var inputs = document.getElementsByClassName('light-table-filter');
				Arr.forEach.call(inputs, function(input) {
					input.oninput = _onInputEvent;
				});
			}
		};
	})(Array.prototype);

	document.addEventListener('readystatechange', function() {
		if (document.readyState === 'complete') {
			LightTableFilter.init();
		}
	});
})(document);


