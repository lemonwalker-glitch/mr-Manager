// -------- GLOBAL INITIALISATIONS ---------
//all date related initialisations
let today = new Date();

let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");
let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let monthAndYear = document.getElementById("monthAndYear");
let currentMonday = getMonday(); //Mon Sep 09 2019 18:01:51 GMT+0800 (Singapore Standard Time)
let currentMonth = currentMonday.getMonth(); // 8 (Jan is 0)
let currentYear = currentMonday.getFullYear(); //2019 
let currentSunday = getSunday();

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//All table generation related initialisations
names = [];
creampie = [":)"];
var schedule = [];
var checkin_time = [];
var checkout_time = [];
var datelog = new Array(); //this will contain date and string in local cache.

//Shift Schedule
routine = {
  g: {
    checkin: "08:30",
    checkout: "17:30",
    hoursWorked: 9
  },
  d: {
    checkin: "08:30",
    checkout: "20:30",
    hoursWorked: 12
  },
  n: {
    checkin: "20:30",
    checkout: "08:30",
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

//Misc
creampie = [":)"];

// -------- GLOBAL INITIALISATIONS END ---------

// ------------ DATE MODIFICATION RELATED FUNCTIONS -------------

function getMonday() {
  var day = today.getDay(),
    diff = today.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday. diff = date of Mon
  var monday = today.setDate(diff);
  monday = new Date(monday);
  return monday;
}

function getSunday() {
  var sunday = new Date(currentMonday).getDate() + 6; 
  var currentSunday = today.setDate(sunday); 
  currentSunday = new Date(currentSunday);
  currentYear = currentMonday.getFullYear();
  return currentSunday;
}

function next(){
  if (confirm("All unsaved progress will be lost!"))  {
    var date_Master = getSundayAndMondayDetails(1);
    var newMonday = checkOverflow(date_Master.Monday.next_Monday, currentMonth, currentYear, date_Master.daysInMonth);
    var newSunday = checkOverflow(date_Master.Sunday.next_Sunday, date_Master.Sunday.month, date_Master.Sunday.year, date_Master.daysInMonth);
    
    currentYear = newMonday.year;//month and year are decided by the monday and not the sunday
    currentMonth = newMonday.month;
    currentMonday = new Date(newMonday.year, newMonday.month, newMonday.nextDay);
    currentSunday = new Date(newSunday.year, newSunday.month, newSunday.nextDay);
    var monthAndYear2 = setNext_monthAndYear(currentMonday, currentSunday, currentMonth, currentYear);  
  
    if (check_if_LocalStorage_exists(monthAndYear2) == false)    {
      if (confirm("Do you want to copy this week's schedule into the next week?")) {
        updateThisWeekWithLastWeekDataInLocalStorage(monthAndYear2);
      }   
    }

    load_function();//the load_function has to be called to update the table with the new month and year if they confirm the first if statement with confirm
  }
}

function previous() {
  if (confirm("All unsaved progress will be lost!")) {
    var date_Master = getSundayAndMondayDetails(2);
    var newMonday = checkUnderFlow(date_Master.Monday.next_Monday, currentMonth, currentYear);
    var newSunday = checkUnderFlow(date_Master.Sunday.next_Sunday, date_Master.Sunday.month, date_Master.Sunday.year)
    
    currentYear = newMonday.year;//month and year are decided by the monday and not the sunday
    currentMonth = newMonday.month;
    currentMonday = new Date(newMonday.year, newMonday.month, newMonday.nextDay);
    currentSunday = new Date(newSunday.year, newSunday.month, newSunday.nextDay);
    
    load_function();    
  }
}

// ------------ DATE MOFIFICATION FUNCTIONS END ------------------

// ------------ CALENDAR/TABLE FUNCTIONS -------------------

//CREATE FUNCTION TO GENERATE LIST OF A REFS LIKE ABOVE
function showCalendar(month, year, monday, sunday) { //NEED TO CHANGE ALL CALLS AS PARAMETERS NOT REQUIRED ANYMORE
  let tbl = document.getElementById("calendar-body"); // body of the calendar
  tbl.innerHTML = "";

  for (k in names) {
    let row = create_Row();
    let header = document.createElement("th");
    let header_input = create_NameTextbox(names[k]);
    header.appendChild(header_input);
    row.appendChild(header);

    //creating individual cells, filing them up with data.
    for (let j = 0; j < days.length; j++) {
      let cell = create_Cell(k, j);
      row.appendChild(cell);
    }
    let hourCell = create_HoursWorkedCell();
    row.appendChild(hourCell);
    tbl.appendChild(row);
  }
}

function createButton(k, j) {
  let spam = document.createElement("span");
  let options = createOptions(k, j);
  let hidden_checkin = create_HiddenTextBoxes_For_Checkout_Checkin(schedule[k][j], k, j, 1);
  let hidden_checkout = create_HiddenTextBoxes_For_Checkout_Checkin(schedule[k][j], k, j, 2);
  spam.appendChild(options);
  spam.appendChild(hidden_checkin);
  spam.appendChild(hidden_checkout);
  return spam;
}

function creamPieMe() {
  //if 1 i.e nothing in local storage, fill with creampie,
  if (creampie.length == 1) {
    return creampie[0];
  } //else we should take each value in here and loop through
}

function createOptions(k, j) {
  let sel = create_DropDown(k, j);
  sel = populate_DropDown(sel);
  sel = select_Default_CellValue(sel, k, j);
  return sel;
}

function promptC(x) {
  get_NewScheduleValue(x, x.value);
  display_Checkin_Or_CheckoutTextBox(x.value, x);
}
//FOLLOWING FUNCTIONS NOT CALLED ANYWHERE NEED TO CHECK
/*
function createMenuItems() { //FUNCTION NOT CALLED ANYWHERE
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

function createDropdown() { // FUNCTION NOT CALLED ANYWHERE
  let lu = document.createElement("div");
  lu.setAttribute("class", "dropdown-menu");
  //lu.setAttribute("role", "menu");
  lu.setAttribute("aria-labelledby", "dropdownMenuButton");
  let menuItems = createMenuItems();
  lu.appendChild(menuItems); //FUCNTION WILL BE APPENDCHILD(VAR A LIST = CREATE SHIFTS GNODF)
  return lu;
}

function aClickStorage(elem) { //NOT CALLED ANYWHERE
  let a_value = elem.innerHTML;
  return a_value;
}
*/

function dyn_name(){
  let x = document.getElementsByName("employeeName");
  for (let i = 0; i < x.length; i++){
    names[i] = x[i].value;
  }
}

function calculateHoursWorked(e) { //NEEED TO FINISH UP
  var x = document.getElementById(e);
  x = x.parentElement;
  console.log(x);
  return "goat";
}

function addRow() {
  names.push("");
  schedule_array = [":)", ":)", ":)", ":)", ":)", ":)", ":)"];
  checkin_time_array = ["","","","","","",""];
  checkout_time_array = ["","","","","","",""];
  schedule.push(schedule_array);
  checkin_time.push(checkin_time_array);
  checkout_time.push(checkout_time_array);
  return showCalendar(currentMonth, currentYear, currentMonday, currentSunday);
}

//showCalendar(currentMonth, currentYear, currentMonday, currentSunday);//CALLED GLOBALLY MIGHT NOT BE REQUIRED ANYMORE

function deleteRow() {
  names.pop();
  schedule.pop();
  checkin_time.pop();
  checkout_time.pop();
  return showCalendar(currentMonth, currentYear, currentMonday, currentSunday);
}

/*
function saveChanges(id) { // NOT CALLED ANYWHERE
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
*/

function copyForRestOfWeek() {
  for (let i = 0; i < names.length; i++) {
    var x = document.getElementById("employeeRow" + i);
    x_value = x.getElementsByTagName("select")[0].value;
    for (let j = 1; j <= 6; j++){
      x.getElementsByTagName("select")[j].value = x_value;
    }     
  }
}

function checkin_check_value(cell_value){
  if (cell_value.value == "g"){
    return routine.g.checkin;
  } 
  else if (cell_value.value == "d"){
    return routine.d.checkin;
  }
  else if (cell_value.value == "n"){
    return routine.n.checkin;
  }
  else if (cell_value.value == "c"){
    return cell_value.parentElement.childNodes[1].value
  }
}
  
function checkout_check_value(cell_value){
  if (cell_value.value == "g"){
    return routine.g.checkout;
  } 
  else if (cell_value.value == "d"){
    return routine.d.checkout;
  }
  else if (cell_value.value == "n"){
    return routine.n.checkout;
  }
  else if (cell_value.value == "c"){
    return cell_value.parentElement.childNodes[2].value
  }
}

function saveTable() {
  console.log("save button clicked");
  var employeeNames = document.getElementsByName("employeeName");
  var cell_values = document.getElementsByName("dropdown_value");
  var cell_Value_String = [];
  var call_checkin = [];
  var call_checkout = [];
  
  for (let idx = 0; idx < cell_values.length; idx++) {
    var check_in = "";
    var check_out = "";
    cell_Value_String.push(cell_values[idx].value);
    console.log(cell_values[idx].value);
    check_in = checkin_check_value(cell_values[idx]);
    check_out = checkout_check_value(cell_values[idx]);
    console.log(check_in + " " + " " + check_out);
    call_checkin.push(check_in);
    call_checkout.push(check_out);
   
  }
  var jsonToSave = [];
  let cv = 0;
  var item = {};
  for (let nom = 0; nom < employeeNames.length; nom++) {
    console.log(employeeNames[nom].value);
    console.log(cell_Value_String.slice(cv, cv + 7));
    item = {
      name: employeeNames[nom].value,
      schedule: cell_Value_String.slice(cv, cv + 7),
      checkin: call_checkin.slice(cv, cv + 7),
      checkout: call_checkout.slice(cv, cv + 7)
    };
    jsonToSave.push(item);
    item = {};
    cv += 7;
  }
  console.log("perform ajax1");
  datelog.push(monthAndYear.innerHTML, JSON.stringify(jsonToSave));
  window.localStorage.setItem(
    monthAndYear.innerHTML,
    JSON.stringify(jsonToSave)
  );
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "/shiftschedule");
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(datelog));
  alert("The Data for this week has been successfully updated on the server");
}

// ------------ CALENDAR/TABLE FUNCTIONS END -------------------

// ------------ LOCAL STORAGE FUNCTIONS -------------------

function parseLocalStorage(text) {
  //converting string into json
  var obj = JSON.parse(text); //obj[0] will load
  //get names in local storage
  console.log(obj.value);
  for (i in obj) {
    console.log(obj[i].name);
    console.log(obj[i].schedule);
    names.push(obj[i].name);
    schedule.push(obj[i].schedule);
    checkin_time.push(obj[i].checkin);
    checkout_time.push(obj[i].checkout);
  }
  return names;
}

function load_function() {
  names = [];
  schedule = [];
  checkin_time = [];
  checkout_time = [];
  let munday = currentMonday;
  let sonday = currentSunday;
  let month = currentMonth;
  let year = currentYear;
  munday = munday.toString();
  munday = munday.substring(0, 10);
  sonday = sonday.toString();
  sonday = sonday.substring(0, 10);
  monthAndYear.innerHTML =
    months[month] + " " + year + " " + munday + " - " + sonday;
  if (localStorage.getItem(monthAndYear.innerHTML) != null) 
  {
    var localStorageString = localStorage.getItem(monthAndYear.innerHTML); //saving as a string
    names = parseLocalStorage(localStorageString);
    console.log("I am insinde the first if");
    showCalendar(currentMonth, currentYear, currentMonday, currentSunday);
  } 
  else 
  {
    names.push("");
    schedule_array = [":)", ":)", ":)", ":)", ":)", ":)", ":)"];
    checkin_time_array = ["","","","","","",""];
    checkout_time_array = ["","","","","","",""];
    schedule.push(schedule_array);
    checkin_time.push(checkin_time_array);
    checkout_time.push(checkout_time_array);
    showCalendar(currentMonth, currentYear, currentMonday, currentSunday);
  }
}

// ------------ LOCAL STORAGE FUNCTIONS END -------------------

function getNames(){

}

function createExcel(){
  // get all september keys
  var curMonthKeyValues = [];
  var schedule_month = [];
  var names_month = [];
  var doesNameExist = false;
  for (i = 0 ; i < names.length; i++){
    schedule_month[i] = new Array(32 - new Date(currentYear, currentMonth, 32).getDate());
  }
  var i_track = 0;
  for (let i = 0; i < localStorage.length; i++){
    //console.log(localStorage.getItem(localStorage.key(i)));
    if (localStorage.key(i).includes(months[currentMonth])){
      curMonthKeyValues.push(localStorage.key(i));
      let names_check = localStorage.getItem(localStorage.key(i));
      names_check = JSON.parse(names_check);
      
      for (let q = 0; q < names_check.length; q++){
        for (p in names_month){
          if (names_month[p].includes(names_check[q].name)){
            doesNameExist = true;
            break;
          }else{
            doesNameExist = false;
          }
        }
        if (doesNameExist == false){
          names_month.push(names_check[q].name);
        }
      
    }
  }
}
  console.log(names_month);
  var orderedKeys = new Array(curMonthKeyValues.length);
  var firstWeek = 0;
  for (k =0; k< curMonthKeyValues.length; k++){
    var res = curMonthKeyValues[k].split(" ");
    if (res[0] == months[currentMonth - 1]){
      firstWeek = parseInt(res[8], 10);
      orderedKeys[0] = curMonthKeyValues[k];
    }
  }
  console.log(firstWeek);
  var daysInMonth2 =  32 - new Date(currentYear, currentMonth, 32).getDate();

  for (let j = 0; j < curMonthKeyValues.length; j++){
    var res = curMonthKeyValues[j].split(" ");
    res[8] = parseInt(res[8], 10);
    if (res[7] == months[currentMonth]){
      if (res[8] <= daysInMonth2){
        if (res[8] == firstWeek + 7){
          orderedKeys[1] = curMonthKeyValues[j];
        }
        else if (res[8] == firstWeek + 14){
          orderedKeys[2] = curMonthKeyValues[j];
        }
        else if (res[8] == firstWeek + 21){
          orderedKeys[3] = curMonthKeyValues[j];
        }
        else if (res[8] == firstWeek + 28){
          orderedKeys[4] = curMonthKeyValues[j];
        }
      }
    }
    else{
      orderedKeys[curMonthKeyValues.length - 1] = curMonthKeyValues[j]
    }
  }
  console.log(orderedKeys);

  var fullList = [];
  var obj = {};

  for (name in names_month){
    obj = {
      name: names_month[name],
      schedule: [],
      checkin: [],
      checkout: []
    }

    fullList.push(obj);
    obj = {};
  }

  
  //console.log(fullList);

  //Get information from the first day

  let firstWeekNum = orderedKeys[0].split(" ");
  firstWeekNum[8] = parseInt(firstWeekNum[8], 10);
  dayStart = 7 - firstWeekNum[8];
  var firstWeekData = localStorage.getItem(orderedKeys[0]);
  firstWeekData = JSON.parse(firstWeekData);
  doesNameExist = false;
  for (name in names_month){
    for (let q = 0; q < firstWeekData.length; q++){
      if (firstWeekData[q].name.match(/^\s*$/) == null && names_month[name].includes(firstWeekData[q].name)){
        for (let i = dayStart; i < 7; i++){
          fullList[name].schedule.push(firstWeekData[q].schedule[i]);
          fullList[name].checkin.push(firstWeekData[q].checkin[i]);
          fullList[name].checkout.push(firstWeekData[q].checkout[i]);
        }
        doesNameExist = true;
        break;    
      }
      else {
        doesNameExist = false;
      }
    }
    if (doesNameExist == false){
      for (let j = dayStart; j < 7; j++){
        fullList[name].schedule.push("NA");
        fullList[name].checkin.push("NA");
        fullList[name].checkout.push("NA");
      }
    }
    
  }
  console.log(fullList);

  // get the middle part of the data
  doesNameExist = false;
  for (name in names_month){
    for (let key = 1; key < orderedKeys.length - 1; key++){
      var weekData = localStorage.getItem(orderedKeys[key]);
      //console.log(orderedKeys[key]);
      weekData = JSON.parse(weekData);
      for (let q = 0; q < weekData.length; q++){
        console.log(weekData[q].name);
        if (names_month[name].includes(weekData[q].name)){
          for (let i = 0; i < 7; i++){
            fullList[name].schedule.push(weekData[q].schedule[i]);
            fullList[name].checkin.push(weekData[q].checkin[i]);
            fullList[name].checkout.push(weekData[q].checkout[i]);
          }
          doesNameExist = true;
          break;
        }
        else {
          doesNameExist = false;
        }
      }
      if (doesNameExist == false){
        for (let j = 0; j < 7; j++){
          fullList[name].schedule.push("NA");
          fullList[name].checkin.push("NA");
          fullList[name].checkout.push("NA");
        }
        
      }
    }   
        
  }

  console.log(fullList);

  //Get the data from the last week
  let lastWeekNum = orderedKeys[orderedKeys.length - 1].split(" ");
  lastWeekNum[4] = parseInt(lastWeekNum[4], 10);
  let daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
  var dayEnd = daysInMonth - lastWeekNum[4];
  var lastWeekData = localStorage.getItem(orderedKeys[orderedKeys.length - 1]);
  lastWeekData = JSON.parse(lastWeekData);
  doesNameExist = false;

  for (name in names_month){
    for (let q = 0; q < lastWeekData.length; q++){
      if (lastWeekData[q].name.match[/^\s*$/] == null && names_month[name].includes(lastWeekData[q].name)){
        for (let i = 0; i <= dayEnd; i++){
          fullList[name].schedule.push(lastWeekData[q].schedule[i]);
          fullList[name].checkin.push(lastWeekData[q].checkin[i]);
          fullList[name].checkout.push(lastWeekData[q].checkout[i]);
        }
        doesNameExist = true;
        break;
      }
      else {
        doesNameExist = false;
      }
    }
    if (doesNameExist == false){
      for (let j = 0; j <= dayEnd; j++){
        fullList[name].schedule.push("NA");
        fullList[name].checkin.push("NA");
        fullList[name].checkout.push("NA");
      }
    }
  }
  console.log(fullList);
  /*
  var workbook = XLSX.utils.book_new(); //creating new excel book
	workbook.Props = {		//excel file properties
		Title: "Shift Schedhule",
		Subject: "Test file",
		Author: "Lemon Walker",
		CreatedDate: new Date()
	};
	
	workbook.SheetNames.push("Test Sheet"); //array of sheet names
	var wsData = [["herro","world"], ["herro", "again"]]		//create new spreadsheet. each element is a cell
	var ws = XLSX.utils.aoa_to_sheet(fullList); //adding to sheet
	workbook.Sheets["Test Sheet"] = ws;	//refering the sheetname and adding the values

	var wbout = XLSX.write(workbook, {bookType:"xlsx", type:"binary"});
  saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "test.xlsx");*/
  
        /* File Name */
  var filename = "FreakyJSON_To_XLS.xlsx";

  /* Sheet Name */
  var ws_name = "FreakySheet";

  finalList = fullList;
  //var animalWS = XLSX.utils.json_to_sheet(fullList);
  //console.log(animalWS); 
  
  //var onerow = [["herro world", "herro world!"]];
  let excelData = [];
  let firstRow = [];
  firstRow.push("Name");
  //add header info, date in the format 1-Sep-2019
  for (let i = 1; i <= daysInMonth; i++){
    firstRow.push(i + "-" + months[currentMonth] + "-" + currentYear);
    firstRow.push("Check in - Check Out");
  }

  excelData.push(firstRow);
  for (let i = 0; i < fullList.length; i++){
    let rowData = [];
    rowData.push(fullList[i].name);

    for (let j = 0; j < daysInMonth; j++){
      rowData.push(fullList[i].schedule[j]);
      rowData.push(fullList[i].checkin[j] + " - " + fullList[i].checkout[j]);
    }
    excelData.push(rowData);
  }


/*
  var onerow = [];
  onerow.push(finalList[1].name);
  onerow.push(finalList[1].schedule[1]);

  var secondrow = [];
  secondrow.push(finalList[0].name);
  secondrow.push(finalList[0].schedule[1]);
  var onerow2 = [];
  onerow2.push(onerow);
  onerow2.push(secondrow);
*/
  
 // var wscols = [//define seperately for each column the more lines you add, the more columns are effected
     // the column width for name should adjust according to which name is the longest and the ones for date should just be standard
 //   {wch: 3}, // characters: need to get length of each name and then dedcide on the length of longest name
  //  {wpx: 200} //pixels
  //];

  let maxNamesLength = 0;
  for (name in names_month){
    if (names_month[name].length >= maxNamesLength){
      maxNamesLength = names_month[name].length;
    }
  }
  
  let wscols = [];
  console.log(maxNamesLength);
  wscols.push({wch: maxNamesLength}); //you could just push like this instead 10 for date and 11 for checkin and checkout time

  for (let i = 0; i < daysInMonth; i++){
    wscols.push({wch: '10'});
    wscols.push({wch: '19'});
  }

  var wb = XLSX.utils.book_new(),
  ws = XLSX.utils.aoa_to_sheet(excelData); 
  ws['!cols'] = wscols;
  /* Add worksheet to workbook */
  XLSX.utils.book_append_sheet(wb, ws, ws_name);

  /* Write workbook and Download */
  
  XLSX.writeFile(wb, filename);
}


var finalList = [];

/*
get the first name in the localstorage, then check wh;ere in fullList it exists and update schedule, checkin and checkut, if localstorage for that day is empty then update with blank values



  console.log(curMonthKeyValues);
  for (k =0; k< curMonthKeyValues.length; k++){
    var res = curMonthKeyValues[i].split(" ");
    if (res[0] == months[currentMonth - 1]){
      if(res[7] == months[currentMonth]){
           let req_data = localStorage.getItem(curMonthKeyValues[k]);//7-1
           console.log(req_data);
           req_data = JSON.parse(req_data);
           var day = parseInt(res[8], 10);
           day_start = 7 - day;
           for (let j = 0; j < names.length; j++){
            let loop_day = day_start;
            while(loop_day < 7){
              schedule_month[j][i_track] = req_data[j].schedule[loop_day];
              i_track += 1;
              loop_day += 1
            }
            
           }

           }
      }
    }
    console.log(schedule_month);
  }


*/
   

  /*
  var workbook = XLSX.utils.book_new(); //creating new excel book
	workbook.Props = {		//excel file properties
		Title: "Shift Schedhule",
		Subject: "Test file",
		Author: "Lemon Walker",
		CreatedDate: new Date()
	};
	
	workbook.SheetNames.push("Test Sheet"); //array of sheet names
	var wsData = [["herro","world"], ["herro", "again"]]		//create new spreadsheet. each element is a cell
	var ws = XLSX.utils.aoa_to_sheet(wsData); //adding to sheet
	workbook.Sheets["Test Sheet"] = ws;	//refering the sheetname and adding the values

	var wbout = XLSX.write(workbook, {bookType:"xlsx", type:"binary"});
  saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "test.xlsx");*/

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
  return buf
}

// ------- DATE MODIFICATION SUPPORTING FUNCTIONS ---------

function getSundayAndMondayDetails(next_or_prev){
  if (next_or_prev == 1) {
    return {
      Sunday:{
      next_Sunday: currentSunday.getDate() + 7,
      month: currentSunday.getMonth(),
      year: currentSunday.getFullYear()
    },
    Monday:{
      next_Monday: currentMonday.getDate() + 7
    },
    daysInMonth: 32 - new Date(currentYear, currentMonth, 32).getDate()  
    };
  } 
  else if (next_or_prev == 2) {
    return {
      Sunday:{
        next_Sunday: currentSunday.getDate() - 7,
        month: currentSunday.getMonth(),
        year: currentSunday.getFullYear()
      },
      Monday:{
        next_Monday: currentMonday.getDate() - 7
      }
    };
  }
}

function setNext_monthAndYear(munday, sonday, month, year){
  munday = munday.toString();
  munday = munday.substring(0, 10);
  sonday = sonday.toString();
  sonday = sonday.substring(0, 10);
  next_monthandyear = months[month] + " " + year + " " + munday + " - " + sonday;
  return next_monthandyear;
}

function checkOverflow(nextDay, month, year, daysInMonth){
  if (nextDay > daysInMonth){
    nextDay = nextDay - daysInMonth;
    if (month == 11){
      month = 0;
      year = year + 1;
    } else {
      month = month + 1;
    }
  }
  return {
    nextDay: nextDay,
    month: month,
    year: year
  };
}

function checkUnderFlow(nextDay, month, year){
  if (nextDay < 1){
    if (month == 0){
      year = year - 1;
      month = 11;
    } 
    else {
      month = month - 1;
    }
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    nextDay = nextDay + daysInMonth;
  }
  return {
    nextDay: nextDay,
    month: month,
    year: year
  };
}


// ------- DATE MODIFICATION SUPPORTING FUNCTIONS END ---------

// ------------ CALENDAR/TABLE SUPPORTING FUNCTIONS -------------------

function create_Row() {
  let row = document.createElement("tr");
  row.setAttribute("id", "employeeRow" + k);
  return row;
}

function create_NameTextbox(name){
  let header_input = document.createElement("input"); //input for name
  header_input.setAttribute("type", "text");
  header_input.setAttribute("name", "employeeName"); // value = document.getElementsByNames("employeeName")[0].value for the first employee etc.
  header_input.setAttribute("onblur", "dyn_name()")
  header_input.setAttribute("value", name);
  return header_input;
}

function create_Cell(k, j){
  let cell = document.createElement("td");
  let shit = createButton(k, j);
  shit.setAttribute("id", "drop");
  cell.appendChild(shit);
  return cell;
}

function create_HoursWorkedCell(){
  let hourCell = document.createElement("td"); //creating hour worked cell
  hourCell.setAttribute("id", names[k]);
  hourCell.innerText = "calculateHoursWorked(names[k])";//need to replace with logic of calculating the number of hours worked from checkin and checkout time list
  return hourCell;
}

function create_HiddenTextBoxes_For_Checkout_Checkin(schedule_Value, k, j, checkin_Or_Checkout){
  if (checkin_Or_Checkout == 1){
    let hidden_checkin = document.createElement("input");
    if (schedule_Value == "c"){
      hidden_checkin.setAttribute("class", "show");
      hidden_checkin.setAttribute("style", "width: 50px");
      hidden_checkin.value = checkin_time[k][j]
    }
    else{
      hidden_checkin.setAttribute("class", "hide"); 
      hidden_checkin.setAttribute("style", "width: 50px");
      hidden_checkin.value = checkin_time[k][j];
    }
    return hidden_checkin;
  }
  else if (checkin_Or_Checkout == 2){
    let hidden_checkout = document.createElement("input");
    if (schedule[k][j] == "c"){
      hidden_checkout.setAttribute("class", "show");
      hidden_checkout.setAttribute("style", "width: 50px");
      hidden_checkout.value = checkout_time[k][j];
      }
    else {
      hidden_checkout.setAttribute("class", "hide"); 
      hidden_checkout.setAttribute("style", "width: 50px");
      hidden_checkout.value = checkout_time[k][j];
    }
    return hidden_checkout;
  }
}

function create_DropDown(k, j){
  let sel = document.createElement("select");
  sel.setAttribute("name", "dropdown_value");
  sel.setAttribute("id", names[k] + j.toString());
  sel.setAttribute("onchange", "promptC(this)");
  sel.setAttribute("class", "show");
  let firstOption = document.createElement("option");
  firstOption.setAttribute("name", "firstOption");
  let firstOptionText = document.createTextNode(creamPieMe());
  firstOption.appendChild(firstOptionText);
  sel.appendChild(firstOption);
  return sel;
}

function populate_DropDown(sel){
  for (i in routine) {
    let menuItem = document.createElement("option");
    menuItem.setAttribute("role", "menuitem");
    menuItem.setAttribute("href", "#");
    menuItem.setAttribute("id", i.toString());
    let menuText = document.createTextNode(i);
    menuItem.appendChild(menuText);
    sel.appendChild(menuItem);
  }
  return sel;
}

function select_Default_CellValue(sel, k, j){
  if (schedule && schedule.length) {
    sel.value = schedule[k][j]; //selects the default cell value
  }
  return sel
}

function get_NewScheduleValue(cell){
  let thenum = cell.id.match(/\d+/)[0];
  let therow = $(cell).closest('tr').attr('id');
  therow = therow.match(/\d+/)[0];
  schedule[therow][thenum] = cell.value;
}

function display_Checkin_Or_CheckoutTextBox(cValue, x){
  if (cValue == "c") {
    //x.parentElement.childNodes[0].value = "10:00"; Change and ensure that these values are being updated somewhere else
    x.parentElement.childNodes[1].className = "show";
    x.parentElement.childNodes[2].className = "show";
  }
  else if (cValue != "c"){
    x.parentElement.childNodes[1].className = "hide";
    //x.parentElement.childNodes[0].value = "10:00";Change and ensure that these values are being updated somewhere else
    x.parentElement.childNodes[2].className = "hide";
  }
}

// ------------ CALENDAR/TABLE SUPPORTING FUNCTIONS END -------------------

// ------------ LOCAL STORAGE MODIFICATION SUPPORTING FUNCTIONS ------------

function check_if_LocalStorage_exists(key) {
  if (localStorage.getItem(key) == null){
    return false;
  }else{
    return true;
  }
}

function updateThisWeekWithLastWeekDataInLocalStorage(new_MonthAndYear)
{
  var employeeNames = document.getElementsByName("employeeName");
  var cell_values = document.getElementsByName("dropdown_value");
  var cell_Value_String = [];
  var call_checkin = [];
  var call_checkout = [];
  var jsonToSave = [];
  let cv = 0;
  var item = {};
  
  for (let idx = 0; idx < cell_values.length; idx++) 
  {
    var check_in = "";
    var check_out = "";
    cell_Value_String.push(cell_values[idx].value);
    check_in = checkin_check_value(cell_values[idx]);
    check_out = checkout_check_value(cell_values[idx]);
    call_checkin.push(check_in);
    call_checkout.push(check_out);
  }

  for (let nom = 0; nom < employeeNames.length; nom++) 
  {
    console.log(employeeNames[nom].value);
    console.log(cell_Value_String.slice(cv, cv + 7));
    item = {
      name: employeeNames[nom].value,
      schedule: cell_Value_String.slice(cv, cv + 7),
      checkin: call_checkin.slice(cv, cv + 7),
      checkout: call_checkout.slice(cv, cv + 7)
    };
    jsonToSave.push(item);
    item = {};
    cv += 7;
  }

  window.localStorage.setItem(
    new_MonthAndYear,
    JSON.stringify(jsonToSave)
  );
}

// ------- LOCAL STORAGE MODIFICATION SUPPORTING FUNCTIONS END ----------