function inputPayroll() {
	document.getElementById('payroll').style.display = 'none';
	document.getElementById('total').style.display = 'none';
	
	var enter = true;
	
	var hoursIndex = 0;
	var allHours = [];
	
	while (enter) {
		var hours = prompt("Please enter the number of hours worked by employee "+(hoursIndex+1)+". Enter -1 to finish.");	
		if (hours == -1) {
			enter = false;
		} else {
			allHours[hoursIndex] = hours;
			hoursIndex++;
		}
	}
	
	var wagesIndex = 0;
	var allWages = [];
	
	for (i = 0; i < allHours.length; i++) {
		var h = allHours[i];
		if (h > 40) {
			allWages[i] = (15*1.5*(h-40))+(15*40);
		} else {
			allWages[i] = 15*h;
		}
		wagesIndex++;
	}
		
	var totalPay = 0;
	
	for (i = 0; i < allHours.length; i++) {
		var tr = document.createElement('tr');
		
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');
		
		totalPay += allWages[i];
		
		td1.innerHTML = i+1;
		td2.innerHTML = allHours[i];
		td3.innerHTML = allWages[i];
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		
		document.getElementById('payroll').appendChild(tr);
	}
	
	document.getElementById('total').innerHTML = "Total Pay: "+totalPay;
	
	if (hoursIndex > 0) {
		document.getElementById('payroll').style.display = 'block';
		document.getElementById('total').style.display = 'block';	
	}
}