let today = new Date();
let currentMonth = today.getMonth(); // 8 (Jan is 0)
let currentYear = today.getFullYear(); //2019
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");
names = ["", "", "bob"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let monthAndYear = document.getElementById("monthAndYear");
let currentMonday = getMonday(); //Mon Sep 09 2019 18:01:51 GMT+0800 (Singapore Standard Time)
console.log(new Date(currentMonday));
let currentSunday = getSunday();
console.log(currentSunday.toString());
//shift schedule
routine = {
  g: {
    checkin: "0830",
    checkout: "1730"
  },
  d: {
    checkin: "0830",
    checkout: "2030"
  },
  n: {
    checkin: "2030",
    checkout: "0830"
  },
  o: {
    checkin: "off",
    checkout: "off"
  },
  l: {
    checkin: "leave",
    checkout: "leave"
  },
  h: {
    checkin: "ph",
    checkout: "ph"
  }
};
//Get current Monday
function getMonday() {
  var day = today.getDay(),
    diff = today.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday. diff = date of Mon
  var monday = today.setDate(diff);
  monday = new Date(monday);
  return monday;
}

function next() {
  var nextMonday = new Date(currentMonday).getDate() + 7; //Get date (in 30 days of monday) and add 7, for next monday
  currentMonday = today.setDate(nextMonday); //setting date to monday in 7 days
  currentMonday = new Date(currentMonday);
  currentSunday = getSunday();
  showCalendar(currentMonth, currentYear, currentMonday, currentSunday);
}

function previous() {
  var nextMonday = new Date(currentMonday).getDate() - 7; //Get date (in 30 days of monday) and add 7, for next monday
  currentMonday = today.setDate(nextMonday); //setting date to monday in 7 days
  currentMonday = new Date(currentMonday);
  currentSunday = getSunday();
  showCalendar(currentMonth, currentYear, currentMonday, currentSunday);
  //   //   showCalendar(currentMonth, currentYear);
}

function getSunday() {
  var sunday = new Date(currentMonday).getDate() + 6; //Get date (in 30 days of monday) and add 7, for next monday
  var currentSunday = today.setDate(sunday); //setting date to monday in 7 days
  currentSunday = new Date(currentSunday);
  return currentSunday;
}



function createButton() {
//  const divDrop = document.createElement("div");
 // divDrop.setAttribute("class", "dropdown");
 // const but = document.createElement("button");
 // but.setAttribute("class", "btn btn-default dropdown-toggle");
 // but.setAttribute("type", "button");
  //but.setAttribute("data-toggle", "dropdown");
  //but.setAttribute("aria-expanded", "false");
 // but.innerHTML = "helo";
 // but.setAttribute("onclick", "fillButton(this)");
	let spam = document.createElement("span");
  // spam.setAttribute("class", "caret");
 // but.appendChild(spam);
 // divDrop.appendChild(but);
	
//	let dropDown = createDropdown();
	let options = createOptions();
	spam.appendChild(options);
	return spam;
}

function createOptions () {
	sel = document.createElement("select");
	for (i in routine) {
		let menuItem = document.createElement("option");
		menuItem.setAttribute("role", "menuitem");
		menuItem.setAttribute("href", "#");
		menuItem.setAttribute("onclick", "hallo = aClickStorage(this)");
		let menuText = document.createTextNode(i);
		menuItem.appendChild(menuText);
		sel.appendChild(menuItem);
  }
	return sel;
}

function createMenuItems() {
	let lisp = document.createElement("li");
    lisp.setAttribute("role", "presentation");
	for (i in routine) {
		let menuItem = document.createElement("a");
		menuItem.setAttribute("role", "menuitem");
		menuItem.setAttribute("href", "#");
		menuItem.setAttribute("onclick", "hallo = aClickStorage(this)");
		let menuText = document.createTextNode(i);
		menuItem.appendChild(menuText);
		lisp.appendChild(menuItem);
  }
	return lisp
}

function createDropdown() {

  let lu = document.createElement("div");
  lu.setAttribute("class", "dropdown-menu");
  //lu.setAttribute("role", "menu");
  lu.setAttribute("aria-labelledby", "dropdownMenuButton");
  let menuItems = createMenuItems();
  
  lu.appendChild(menuItems); //FUCNTION WILL BE APPENDCHILD(VAR A LIST = CREATE SHIFTS GNODF)
  return lu;
}




function aClickStorage(elem) {
  let a_value = elem.innerHTML;
  console.log(elem.parentElement.parentElement);
  return a_value;
}


/*
function fillButton(elem) {
	let value = 
	elem.innerHTML;
	value = hallo;
	return value;
}
*/

/*
function chicken (elem) {
	elem.innerHTML = "chicken";
	console.log(elem.childNodes);
}
*/




//CREATE FUNCTION TO GENERATE LIST OF A REFS LIKE ABOVE

function showCalendar(month, year, monday, sunday) {
  let firstDay = new Date(year, month).getDay();
  console.log(firstDay);
  let daysInMonth = 32 - new Date(year, month, 32).getDate();
  console.log(daysInMonth);
  let tbl = document.getElementById("calendar-body"); // body of the calendar
  let munday = monday;
  munday = munday.toString();
  munday = munday.substring(0, 10);
  let sonday = sunday;
  sonday = sonday.toString();
  sonday = sonday.substring(0, 10);
  // clearing all previous cells
  tbl.innerHTML = "";
  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML =
    months[month] + " " + year + " " + munday + " - " + sonday;
  console.log(monthAndYear.innerHTML);
//  selectYear.value = year;
  //selectMonth.value = month;
  // creating all cells
  for (k in names) {
    //number of rows
    let row = document.createElement("tr");
    let header = document.createElement("th");
    let header_input = document.createElement("input");
    header_input.setAttribute("type", "text");
    header.appendChild(header_input);
    row.appendChild(header);
    //creating individual cells, filing them up with data.
    for (let j = 0; j < days.length; j++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", "cell");
      let shit = createButton();
      shit.setAttribute("id", "drop");
  //    let drop = createDropdown();
   //   shit.appendChild(drop);
      cell.appendChild(shit);
      //let shift_input = document.createElement("input");
      // shift_input.setAttribute("type", "text");
      // shift_input.setAttribute("class", "shift_input");
      //   shift_input.setAttribute("value", "hello");
      // shift_input.setAttribute("value","")
      // cell.appendChild(shift_input);
      /*
      let cellText = document.createTextNode("");
      let div = document.createElement("div");
      div.setAttribute("class", "dropdown");
      let but = document.createElement("button");
      but.setAttribute("class", "btn btn-secondary dropdown-toggle");
      but.setAttribute("id", "shifts");
      div.appendChild(but);
      cell.appendChild(cellText);
      cell.appendChild(div);
      let dropdownMenu = document.createElement("div");
      dropdownMenu.setAttribute("class", "dropdown-menu");
      let dropdownItem = document.createElement("a");
      dropdownItem.setAttribute("class", "dropdown-item");
      dropdownItem.setAttribute("href", "#");
      let dropdownItemText = document.createTextNode("ACtion");
      dropdownItem.appendChild(dropdownItemText);
      dropdownMenu.appendChild(dropdownItem);
      div.appendChild(dropdownMenu);

       */
      row.appendChild(cell);
    }
    // appending each row into calendar body.
    tbl.appendChild(row);
  }
}

function addRow() {
  names.push("");
  return showCalendar(currentMonth, currentYear, currentMonday, currentSunday);
}
showCalendar(currentMonth, currentYear, currentMonday, currentSunday);

function deleteRow() {
  names.pop();
  return showCalendar(currentMonth, currentYear, currentMonday, currentSunday);
}

function saveChanges(id) {
  var table = document.getElementById(id);
  var trs = table.getElementsByTagName("tr"); // list of all rows
  var values = []; // will be a (potentially jagged) 2D array of all values
  for (var i = 0; i < trs.length; i++) {
    // loop through all rows, each will be one entrie in values
    var trValues = [];
    var tds = trs[i].getElementsByTagName("input"); // list of all cells in this row
    for (var j = 0; j < tds.length; j++) {
      console.log("inner HTML");
      trValues[j] = tds[j].innerHTML;
      console.log(trValues[j]);
      // get the value of the cell (preserve newlines, if you don't want that use .textContent)
    }
    values[i] = trValues;
    console.log(values[i]);
  }
  // save values
}

/*
<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown" aria-expanded="true">Tutorials
    <span class="caret"></span></button>

<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
      <li role="presentation"><a role="menuitem" tabindex="-1" href="#">HTML</a></li>
      <li role="presentation"><a role="menuitem" tabindex="-1" href="#">CSS</a></li>
      <li role="presentation"><a role="menuitem" tabindex="-1" href="#">JavaScript</a></li>
      <li role="presentation" class="divider"></li>
      <li role="presentation"><a role="menuitem" tabindex="-1" href="#">About Us</a></li>
    </ul>
    
    */

/*
$(function() {
  $(".dropdown-menu li a").click(function() {
    $(".btn:first-child").text($(this).text());
    $(".btn:first-child").val($(this).text());
  });
});
*/

function MemberInfo(fName,lName,memberId){
  this.FirstName=fname;
  this.LastName=lName;
  this.MemberId=memberId;    
}

$('#save').click(function () {

     
      $("#calendar").find('calendar-body')
          .append($('<tr>')
          .append($('<td>')
          .text($('#fname').val()))

                  );
                   
      $('#cell').val('');
  //    $('#lName').val('');
   //   $('#mId').val('');

    var arr=[];    
    $("#calendar").find('tbody tr').each(function(index,item){
   
        var fName=$(item).find('td').eq(0).text();
        var lName=$(item).find('td').eq(1).text();
        var memberId=$(item).find('td').eq(2).text();
        arr.push(new MemberInfo(fName,lName,memberId))
    });
          
  localStorage.setItem("memberData",arr);
  })

var arr= [];
console.log($("#calendar").find('tbody tr')); //gets each row


console.log(
      $("#calendar").find('calendar-body')
          .append($('<tr>')
          .append($('<td>')
          .text($('#fname').val()))

                  )
);
