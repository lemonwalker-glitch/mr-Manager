let today = new Date();
let currentMonth = today.getMonth(); // 8 (Jan is 0)
let currentYear = today.getFullYear(); //2019
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");
names = [];
creampie = [":)"];
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
let currentSunday = getSunday();
//shift schedule
routine = {
  g: {
    checkin: "0830",
    checkout: "1730",
    hoursWorked: 9
  },
  d: {
    checkin: "0830",
    checkout: "2030",
    hoursWorked: 12
  },
  n: {
    checkin: "2030",
    checkout: "0830",
    hoursWorked: 12
  },
  o: {
    checkin: "off",
    checkout: "off",
    hoursWorked: 0
  },
  l: {
    checkin: "leave",
    checkout: "leave",
    hoursWorked: 0
  },
  h: {
    checkin: "ph",
    checkout: "ph",
    hoursWorked: 0
  },
  c: {
    checkin: "",
    checkout: ""
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
  var nextSunday = currentSunday.getDate() + 7;
  var sunday_month = currentSunday.getMonth();
  var sunday_year = currentSunday.getFullYear();
  var nextMonday = currentMonday.getDate() + 7;
  let daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();

  if (nextMonday > daysInMonth) {
    nextMonday = nextMonday - daysInMonth;
    if (currentMonth == 11) {
      currentMonth = 0;
      currentYear = currentYear + 1;
    } else {
      currentMonth = currentMonth + 1;
    }
  }

  currentMonday = new Date(currentYear, currentMonth, nextMonday);

  if (nextSunday > daysInMonth) {
    nextSunday = nextSunday - daysInMonth;
    if (sunday_month == 11) {
      sunday_month = 0;
      sunday_year = sunday_year + 1;
    } else {
      sunday_month = sunday_month + 1;
    }
  }

  currentSunday = new Date(sunday_year, sunday_month, nextSunday);
  //showCalendar(currentMonth, currentYear, currentMonday, currentSunday);
  load_function();
}

function previous() {
  var nextSunday = currentSunday.getDate() - 7;
  var sunday_month = currentSunday.getMonth();
  var sunday_year = currentSunday.getFullYear();
  var nextMonday = currentMonday.getDate() - 7;

  if (nextMonday < 1) {
    if (currentMonth == 0) {
      currentYear = currentYear - 1;
      currentMonth = 11;
    } else {
      currentMonth = currentMonth - 1;
    }

    let daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
    nextMonday = nextMonday + daysInMonth;
  }

  currentMonday = new Date(currentYear, currentMonth, nextMonday);

  if (nextSunday < 1) {
    if (sunday_month == 0) {
      sunday_year = sunday_year - 1;
      sunday_month = 11;
    } else {
      sunday_month = sunday_month - 1;
    }

    let daysInMonth = 32 - new Date(sunday_year, sunday_month, 32).getDate();
    nextSunday = nextSunday + daysInMonth;
  }

  currentSunday = new Date(sunday_year, sunday_month, nextSunday);
  //showCalendar(currentMonth, currentYear, currentMonday, currentSunday);
  load_function();
}

function getSunday() {
  var sunday = new Date(currentMonday).getDate() + 6; //Get date (in 30 days of monday) and add 7, for next monday
  var currentSunday = today.setDate(sunday); //setting date to monday in 7 days
  currentSunday = new Date(currentSunday);
  currentYear = currentMonday.getFullYear();
  return currentSunday;
}

function createButton(k, j) {
  let spam = document.createElement("span");
  let hidden_checkin = document.createElement("input");
  hidden_checkin.setAttribute("class", "hide");
  hidden_checkin.setAttribute("style", "width: 50px");
  spam.appendChild(hidden_checkin);
  let hidden_checkout = document.createElement("input");
  hidden_checkout.setAttribute("class", "hide");
  hidden_checkout.setAttribute("style", "width: 50px");
  spam.appendChild(hidden_checkout);
  let options = createOptions(k, j);
  spam.appendChild(options);
  return spam;
}
function creamPieMe() {
  //if 1 i.e nothing in local storage, fill with creampie,
  if (creampie.length == 1) {
    return creampie[0];
  } //else we should take each value in here and loop through
}

function createOptions(k, j) {
  sel = document.createElement("select");
  sel.setAttribute("name", "dropdown_value");
  sel.setAttribute("id", names[k] + j.toString());
  sel.setAttribute("onchange", "promptC(this)");
  sel.setAttribute("class", "show");

  /* value of dropdown-----
var dropdown_value = document.getElementById("droptest");
    var value_string = dropdown_value.options[dropdown_value.selectedIndex].value;
*/

  let firstOption = document.createElement("option");
  firstOption.setAttribute("name", "firstOption");
  let firstOptionText = document.createTextNode(creamPieMe());
  firstOption.appendChild(firstOptionText);
  sel.appendChild(firstOption);
  for (i in routine) {
    let menuItem = document.createElement("option");
    menuItem.setAttribute("role", "menuitem");
    menuItem.setAttribute("href", "#");
    //   menuItem.setAttribute("onclick", "promptC()");
    menuItem.setAttribute("id", i.toString());
    let menuText = document.createTextNode(i);
    menuItem.appendChild(menuText);
    sel.appendChild(menuItem);
  }
  if (schedule && schedule.length) {
    sel.value = schedule[k][j]; //selects the default cell value
  }
  return sel;
}

function promptC(x) {
  var cValue = x.value;

  if (cValue == "c") {
    // c_checkout = prompt("Please enter a value");
    //x.className = "hide";
    console.log("hello", x.parentElement.childNodes[0]);
    x.parentElement.childNodes[0].className = "show";
    // x.parentElement.childNodes[0].value = c_checkout;
    x.parentElement.childNodes[1].className = "show";

    // checkin = prompt("Please enter your desired checkin time:");
    // checkout = prompt("Please enter your desired check-out time:");
    // var checkin_button = document.createElement("input");
    // checkin_button.setAttribute("type", "text");
    // var checkin_text = document.createTextNode(checkin);
    // checkin_button.appendChild(checkin_text);
    // var checkout_button = document.createElement("input");
    // checkin_button.setAttribute("type", "text");
    // var checkout_text = document.createTextNode(checkout);
    // checkout_button.appendChild(checkin_text);
    // x = x.appendChild(checkin_button);
    // x = x.appendChild(checkout_button);
    // return x;
  }
}

// var f = document.getElementById("dN[" + fieldsd + "]"); // create/insert new
// el = document.createElement("input");
// el = f.appendChild(el);
// el.name = "dName[" + fieldsd + "]";
// el.id = "dName[" + fieldsd + "]";
// el.onchange = validation;

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
  return lisp;
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
  return a_value;
}

//CREATE FUNCTION TO GENERATE LIST OF A REFS LIKE ABOVE
function showCalendar(month, year, monday, sunday) {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();
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
  //  selectYear.value = year;
  //selectMonth.value = month;
  // creating all cells
  for (k in names) {
    //number of rows
    //console.log("Number in the loop: " + k);
    let row = document.createElement("tr");
    row.setAttribute("id", "employeeRow" + k);
    let header = document.createElement("th");
    let header_input = document.createElement("input"); //input for name
    header_input.setAttribute("type", "text");
    header_input.setAttribute("name", "employeeName"); // value = document.getElementsByNames("employeeName")[0].value for the first employee etc.
    header_input.setAttribute("value", names[k]); //filling the name input
    header.appendChild(header_input);
    row.appendChild(header);
    //creating individual cells, filing them up with data.
    for (let j = 0; j < days.length; j++) {
      let cell = document.createElement("td");
      //     cell.setAttribute("id", "cell_" + names[k] + "_" + j.toString());
      let shit = createButton(k, j);
      // console.log("button number" + j.toString());
      shit.setAttribute("id", "drop");
      cell.appendChild(shit);
      row.appendChild(cell);
    }
    let hourCell = document.createElement("td"); //creating hour worked cell
    hourCell.setAttribute("id", names[k]);
    hourCell.innerText = "calculateHoursWorked(names[k])";
    //hourCell.appendChild(hourCellValue);
    row.appendChild(hourCell);
    // appending each row into calendar body.
    tbl.appendChild(row);
  }
}
function calculateHoursWorked(e) {
  var x = document.getElementById(e);
  x = x.parentElement;
  console.log(x);
  return "goat";
}
//   console.log("calculating hours worked...");
//   if (e.innerText == "undefined") {
//     e.innerText = "goat";
//   }
//   var x = e.parentElement;
//   console.log(x);
//   x = x.getElementsByTagName("select");
//   console.log(x);
//   var hour = 0;
//   for (let i = 0; i < x.getElementsByTagName("select").length; i++) {
//     hour =
//       hour + routine[x.getElementsByTagName("select")[i].value].hoursWorked;
//   }
//   console.log(hour);
//   return hour;
// }

function addRow() {
  names.push("");
  schedule_array = [":)", ":)", ":)", ":)", ":)", ":)", ":)"];
  schedule.push(schedule_array);
  return showCalendar(currentMonth, currentYear, currentMonday, currentSunday);
}
showCalendar(currentMonth, currentYear, currentMonday, currentSunday);

function deleteRow() {
  names.pop();
  schedule.pop();
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
      trValues[j] = tds[j].innerHTML;
      // get the value of the cell (preserve newlines, if you don't want that use .textContent)
    }
    values[i] = trValues;
  }
}

function copyForRestOfWeek() {
  for (let i = 0; i < names.length; i++) {
    var x = document.getElementById("employeeRow" + i);
    x_value = x.getElementsByTagName("select")[0].value;
    //  console.log(x_value);
    x.getElementsByTagName("select")[1].value = x_value;
    x.getElementsByTagName("select")[2].value = x_value;
    x.getElementsByTagName("select")[3].value = x_value;
    x.getElementsByTagName("select")[4].value = x_value;
    x.getElementsByTagName("select")[5].value = x_value;
    x.getElementsByTagName("select")[6].value = x_value;
  }
}

/*
    <span class="caret"></span></button
    */

/*

function MemberInfo(fName, lName, memberId) {
  this.FirstName = fname;
  this.LastName = lName;
  this.MemberId = memberId;
}
$("#save").click(function() {
  $("#calendar")
    .find("calendar-body")
    .append($("<tr>").append($("<td>").text($("#fname").val())));
  $("#cell").val("");
  //    $('#lName').val('');
  //   $('#mId').val('');
  var arr = [];
  $("#calendar")
    .find("tbody tr") 
    .each(function(index, item) {
      var fName = $(item)
        .find("td")
        .eq(0)
        .text();
      var lName = $(item)
        .find("td")
        .eq(1)
        .text();
      var memberId = $(item)
        .find("td")
        .eq(2)
        .text();
      arr.push(new MemberInfo(fName, lName, memberId));
    });
  localStorage.setItem("memberData",arr );
});
var arr = [];
console.log($("#calendar").find("tbody tr")); //gets each row
console.log(
  $("#calendar")
    .find("calendar-body")
    .append($("<tr>").append($("<td>").text($("#cell").val())))
);
*/

var datelog = new Array(); //this will contain date and string in local cache.

function saveTable() {
  //console.log("save button clicked");
  var employeeNames = document.getElementsByName("employeeName");
  var cell_values = document.getElementsByName("dropdown_value");
  var cell_Value_String = [];
  for (let idx = 0; idx < cell_values.length; idx++) {
    cell_Value_String.push(cell_values[idx].value);
  }
  var jsonToSave = [];
  let cv = 0;
  var item = {};
  for (let nom = 0; nom < employeeNames.length; nom++) {
    console.log(employeeNames[nom].value);
    console.log(cell_Value_String.slice(cv, cv + 7));
    item = {
      name: employeeNames[nom].value,
      schedule: cell_Value_String.slice(cv, cv + 7)
    };
    //item["name"] = item[employeeNames[nom].value];
    //item["schedule"] = cell_Value_String.slice(cv, cv + 7);
    //item[employeeNames[nom].value] = cell_Value_String.slice(cv, cv + 7);
    jsonToSave.push(item);
    item = {};
    cv += 7;
  }

  datelog.push(monthAndYear.innerHTML, JSON.stringify(jsonToSave));
  window.localStorage.setItem(
    monthAndYear.innerHTML,
    JSON.stringify(jsonToSave)
  );
}
var schedule = [];
function parseLocalStorage(text) {
  //converting string into json
  var obj = JSON.parse(text); //obj[0] will load
  //get names in local storage
  console.log(obj.value);
  for (i in obj) {
    // console.log(obj[i]);
    console.log(obj[i].name);
    console.log(obj[i].schedule);
    names.push(obj[i].name);
    schedule.push(obj[i].schedule);
    //   console.log(obj[i].schedule[1]);
  }
  return names;
}

function load_function() {
  if (localStorage.getItem(monthAndYear.innerHTML) != null) {
    var localStorageString = localStorage.getItem(monthAndYear.innerHTML); //saving as a string
    names = parseLocalStorage(localStorageString);
    console.log("I am insinde the first if");
    showCalendar(currentMonth, currentYear, currentMonday, currentSunday);
  } else {
    names = [];
    schedule = [];
    names.push("");
    schedule_array = [":)", ":)", ":)", ":)", ":)", ":)", ":)"];
    schedule.push(schedule_array);
    showCalendar(currentMonth, currentYear, currentMonday, currentSunday);
  }
}

/*



    for (let cv = 0; cv < cell_values.length; cv = cv + 7) {
      console.log(
        "{ " +
          employeeNames[nom].value +
          " " +
          ": [ " +
          cell_Value_String.slice(cv, cv + 7) +
          " ],"
      );
      console.log("loop number" + cv.toString());
      console.log(employeeNames[nom]);
      jsonToSave.push(
        "{ " +
          employeeNames[nom].value +
          " " +
          ": [ " +
          cell_Value_String.slice(cv, cv + 7) +
          " ],"
      );
    }
  }
  return jsonToSave;
}
/*
$("#calender").find


$('.calendar').each(function(i, obj) {
  //test
});

$("#calendar").find("calendar-body").append($("<thead>")).append($("<th>")[3]).val()


*/
