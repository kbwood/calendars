﻿/* http://keith-wood.name/calendars.html
   Nepali calendar for jQuery v0.9
   Written by Artur Neumann (ict.projects{at}nepal.inf.org) April 2013.
   Available under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

/* Implementation of the Nepali civil calendar.
   Based on the ideas from 
   http://codeissue.com/articles/a04e050dea7468f/algorithm-to-convert-english-date-to-nepali-date-using-c-net
   AND
   http://birenj2ee.blogspot.com/2011/04/nepali-calendar-in-java.html
   See also http://en.wikipedia.org/wiki/Nepali_calendar and https://en.wikipedia.org/wiki/Bikram_Samwat.
   @param  language  (string) the language code (default English) for localisation (optional) */
function NepaliCalendar(language) {
	this.local = this.regional[language || ''] || this.regional[''];
}

NepaliCalendar.prototype = new $.calendars.baseCalendar;


$.extend(NepaliCalendar.prototype, {
	name: 'Nepali', // The calendar name
	jdEpoch: 1700709.5, // Julian date of start of Nepali epoch: 7 October 3761 BCE
	daysPerMonth: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // Days per month in a common year
	hasYearZero: false, // True if has a year zero, false if not
	minMonth: 1, // The minimum month number
	firstMonth: 1, // The first month in the year
	minDay: 1, // The minimum day number
	daysPerYear: 365,
	'': function (){
		console.log ("a");
	},
	
	regional: { // Localisations
		'': {
			name: 'Nepali', // The calendar name
			epochs: ['BBS', 'ABS'],
			monthNames: ["Baisakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin", "Kartik", 
						 "Mangsir", "Paush", "Mangh", "Falgun", "Chaitra"],
			monthNamesShort: ["Bai", "Je", "As", "Shra", "Bha", "Ash", "Kar", 
								"Mang", "Pau", "Ma", "Fal", "Chai"],
			dayNames: ['Aaitabaar', 'Sombaar', 'Manglbaar', 'Budhabaar', 'Bihibaar', 'Shukrabaar', 'Shanibaar'],
			//dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

			dayNamesShort: ['Aaita', 'Som', 'Mangl', 'Budha', 'Bihi', 'Shukra', 'Shani'],
			dayNamesMin: ['Aai', 'So', 'Man', 'Bu', 'Bi', 'Shu', 'Sha'],
			dateFormat: 'dd/mm/yyyy', // See format options on BaseCalendar.formatDate
			firstDay: 1, // The first day of the week, Sun = 0, Mon = 1, ...
			isRTL: false, // True if right-to-left language, false if left-to-right
			showMonthAfterYear: false, // True if the year select precedes month, false for month then year
			yearSuffix: '' // Additional text to append to the year in the month headers
		}
	},



	/* Determine the week of the year for a date.
	   @param  year   (CDate) the date to examine or
	                  (number) the year to examine
	   @param  month  (number) the month to examine
	   @param  day    (number) the day to examine
	   @return  (number) the week of the year
	   @throws  error if an invalid date or a different calendar used */
	//TODO test
	weekOfYear: function(year, month, day) {
		// Find Sunday of this week starting on Sunday
		var checkDate = this.newDate(year, month, day);
		checkDate.add(-checkDate.dayOfWeek(), 'd');
		return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
	},

	/* Retrieve the number of days in a year.
	   @param  year   (CDate) the date to examine or
	                  (number) the year to examine
	   @return  (number) the number of days
	   @throws  error if an invalid year or a different calendar used */
	daysInYear: function(year) {
		var date = this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear);
		year = date.year();
		var daysPerYear = 0;
		if (typeof this.NEPALI_CALENDAR_DATA[year] == 'undefined') {
			return this.daysPerYear;
		}
		for (var month_number=this.minMonth; month_number <= 12; month_number ++) {
			daysPerYear = daysPerYear + this.NEPALI_CALENDAR_DATA[year][month_number];
			}
		return daysPerYear;
	},

	/* Retrieve the number of days in a month.
	   @param  year   (CDate) the date to examine or
	                  (number) the year of the month
	   @param  month  (number) the month
	   @return  (number) the number of days in this month
	   @throws  error if an invalid month/year or a different calendar used */
	daysInMonth: function(year, month) {
		if (year.year) {
			month = year.month();
			year = year.year();
		}
		this._validate(year, month, this.minDay, $.calendars.local.invalidMonth);
		
		if (typeof this.NEPALI_CALENDAR_DATA[year] == 'undefined')
			{
			return this.daysPerMonth[month-1];
			}
		return this.NEPALI_CALENDAR_DATA[year][month];
	},

	/* Determine whether this date is a week day.
	   @param  year   (CDate) the date to examine or
	                  (number) the year to examine
	   @param  month  (number) the month to examine
	   @param  day    (number) the day to examine
	   @return  (boolean) true if a week day, false if not
	   @throws  error if an invalid date or a different calendar used */
	//TODO test
	weekDay: function(year, month, day) {
		return this.dayOfWeek(year, month, day) != 6;
	},


	/* Retrieve the Julian date equivalent for this date,
	   i.e. days since January 1, 4713 BCE Greenwich noon.
	   @param  year   (CDate) the date to convert or
	                  (number) the year to convert
	   @param  month  (number) the month to convert
	   @param  day    (number) the day to convert
	   @return  (number) the equivalent Julian date
	   @throws  error if an invalid date or a different calendar used */
	toJD: function(nepaliYear, nepaliMonth, nepaliDay) {
		var date = this._validate(nepaliYear, nepaliMonth, nepaliDay, $.calendars.local.invalidDate);
		nepaliYear = date.year();
		nepaliMonth = date.month();
		nepaliDay = date.day();
		var gregorianCalendar = $.calendars.instance();
		var gregorianDayOfYear = 0; //we will add all the days that went by since the 1st. January and then we can get the gregorian Date
		var gregorianYear;
		var nepaliMonthToCheck = nepaliMonth;
		var nepaliYearToCheck = nepaliYear;
		
		this._createMissingCalendarData(nepaliYear);
		
		//get the correct year
		if (nepaliMonthToCheck > 9
				|| (nepaliMonthToCheck == 9 && nepaliDay >= this.NEPALI_CALENDAR_DATA[nepaliYearToCheck][0])) {
			gregorianYear = nepaliYear - 56;
		} else {
			gregorianYear = nepaliYear - 57;
		}
		

		//first we add the amount of days in the actual Nepali month as the day of year in the gregorian one
		//because at least this days are gone since the 1st. Jan. 
		if (nepaliMonth != 9) {
			gregorianDayOfYear =  nepaliDay;
			nepaliMonthToCheck--;
		}

		//now we loop throw all Nepali month and add the amount of days to gregorianDayOfYear 
		//we do this till we reach Paush (9th month). 1st. January always falls in this month  
		while (nepaliMonthToCheck != 9) {

			if (nepaliMonthToCheck <= 0) {
				nepaliMonthToCheck = 12;
				nepaliYearToCheck--;
			}				
			
			gregorianDayOfYear += this.NEPALI_CALENDAR_DATA[nepaliYearToCheck][nepaliMonthToCheck];
			nepaliMonthToCheck--;

		}		
		
		//If the date that has to be converted is in Paush (month no. 9) we have to do some other calculation
		if (nepaliMonth == 9) {
			
			//add the days that are passed since the first day of Paush and substract the amount of days that lie between
			//1st. Jan and 1st Paush
			gregorianDayOfYear += nepaliDay - this.NEPALI_CALENDAR_DATA[nepaliYearToCheck][0];
			
			
			//for the first days of Paush we are now in negative values, because in the end of the gregorian year we substract
			//365 / 366 days (P.S. remember math in school + - gives -)
			if (gregorianDayOfYear <= 0) {
				if (gregorianCalendar.leapYear(gregorianYear)) {
					gregorianDayOfYear = 366 + gregorianDayOfYear;
				} else {
					gregorianDayOfYear = 365 + gregorianDayOfYear;			
				}
			}
			
			
		} else {
			gregorianDayOfYear += this.NEPALI_CALENDAR_DATA[nepaliYearToCheck][9] 
					- this.NEPALI_CALENDAR_DATA[nepaliYearToCheck][0];
		}		
		
		
		return gregorianCalendar.newDate(gregorianYear,1,1).add(gregorianDayOfYear,'d').toJD();
	},
	

	/* Create a new date from a Julian date.
	   @param  jd  (number) the Julian date to convert
	   @return  (CDate) the equivalent date */
	fromJD: function(jd) {
		
		var gregorianCalendar =  $.calendars.instance();
		var gregorianYear;
		var gregorianDayOfYear;
		var dayOfFirstJanInPaush;
		var nepaliMonth = 9; //Jan 1 always fall in Nepali month Paush which is the 9th month of Nepali calendar.
		var daysSinceJanFirstToEndOfNepaliMonth; //days calculated from 1st Jan till the end of the actual Nepali month, 
		//we use this value to check if the gregorian Date is in the actual Nepali month.
		var nepaliYear;
		var nepaliDayOfMonth;
		var gregorianDate = gregorianCalendar.fromJD(jd);
		
		gregorianYear = gregorianDate.year();

		
		gregorianDayOfYear = gregorianDate.dayOfYear();
		nepaliYear = gregorianYear + 56; //this is not final, it could be also +57 but +56 is always true for 1st Jan.

		this._createMissingCalendarData(nepaliYear);
		
		//get the nepali day in Paush (month 9) of 1st January 
		dayOfFirstJanInPaush = this.NEPALI_CALENDAR_DATA[nepaliYear][0];

		//check how many days are left of Paush 
		daysSinceJanFirstToEndOfNepaliMonth = this.NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth] - dayOfFirstJanInPaush + 1;

		//If the gregorian day-of-year is smaller o equal than the sum of days between the 1st January and 
		//the end of the actual nepali month we found the correct nepali month.
		//Example: 
		//The 4th February 2011 is the gregorianDayOfYear 35 (31 days of January + 4)
		//1st January 2011 is in the nepali year 2067, where 1st. January is in the 17th day of Paush (9th month)
		//In 2067 Paush has 30days, This means (30-17+1=14) there are 14days between 1st January and end of Paush 
		//(including 17th January)
		//The gregorianDayOfYear (35) is bigger than 14, so we check the next month
		//The next nepali month (Mangh) has 29 days 
		//29+14=43, this is bigger than gregorianDayOfYear(35) so, we found the correct nepali month
		while (gregorianDayOfYear > daysSinceJanFirstToEndOfNepaliMonth) {
			nepaliMonth++;
			if (nepaliMonth > 12) {
				nepaliMonth = 1;
				nepaliYear++;
			}	

			daysSinceJanFirstToEndOfNepaliMonth += this.NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth];



		}

		//the last step is to calculate the nepali day-of-month
		//to continue our example from before:
		//we calculated there are 43 days from 1st. January (17 Paush) till end of Mangh (29 days)
		//when we subtract from this 43days the day-of-year of the the gregorian date (35), we know how far the searched day is away
		//from the end of the nepali month. So we simply subtract this number from the amount of days in this month (30) 
		nepaliDayOfMonth = this.NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth]
				- (daysSinceJanFirstToEndOfNepaliMonth - gregorianDayOfYear);		
		
		return this.newDate(nepaliYear, nepaliMonth, nepaliDayOfMonth);
	},
	
	/* Creates missing data in the NEPALI_CALENDAR_DATA table. This data will not be correct but just give an estimated result. Mostly -/+ 1 day
	   @param  nepaliYear (number) the missing year numebr 
	 */
	_createMissingCalendarData: function (nepaliYear) {

		var tmp_calendar_data = this.daysPerMonth.slice(0);
		tmp_calendar_data.unshift(17);

		var nepaliYearToCreate;
		for (nepaliYearToCreate = (nepaliYear-1); nepaliYearToCreate < (nepaliYear + 2); nepaliYearToCreate++ )
		{
			if (typeof this.NEPALI_CALENDAR_DATA[nepaliYearToCreate] == 'undefined') 
			{
				console.log(nepaliYearToCreate);
				this.NEPALI_CALENDAR_DATA[nepaliYearToCreate] = tmp_calendar_data;

			}
		}

	},
	
	NEPALI_CALENDAR_DATA:  {
		
		//this data are from http://www.ashesh.com.np
		"1970" : new Array(18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"1971" : new Array(18, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30),
		"1972" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30),
		"1973" : new Array(19, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31),
		"1974" : new Array(19, 31, 31, 32, 30, 31, 31, 30, 29, 30, 29, 30, 30),
		"1975" : new Array(18, 31, 31, 32, 32, 30, 31, 30, 29, 30, 29, 30, 30),
		"1976" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"1977" : new Array(18, 31, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31),
		"1978" : new Array(18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"1979" : new Array(18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"1980" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"1981" : new Array(18, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30),
		"1982" : new Array(18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"1983" : new Array(18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"1984" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"1985" : new Array(18, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30),
		"1986" : new Array(18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"1987" : new Array(18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"1988" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"1989" : new Array(18, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30),
		"1990" : new Array(18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"1991" : new Array(18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30),	

		//this data are from http://nepalicalendar.rat32.com/index.php
		"1992" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31),
		"1993" : new Array(18, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30),
		"1994" : new Array(18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"1995" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30),
		"1996" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31),
		"1997" : new Array(18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"1998" : new Array(18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"1999" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"2000" : new Array(17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31),
		"2001" : new Array(18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2002" : new Array(18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"2003" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"2004" : new Array(17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31),
		"2005" : new Array(18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2006" : new Array(18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"2007" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"2008" : new Array(17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31),
		"2009" : new Array(18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2010" : new Array(18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"2011" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"2012" : new Array(17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30),
		"2013" : new Array(18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2014" : new Array(18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"2015" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"2016" : new Array(17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30),
		"2017" : new Array(18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2018" : new Array(18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"2019" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31),
		"2020" : new Array(17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30),
		"2021" : new Array(18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2022" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30),
		"2023" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31),
		"2024" : new Array(17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30),
		"2025" : new Array(18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2026" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"2027" : new Array(17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31),
		"2028" : new Array(17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2029" : new Array(18, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30),
		"2030" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 30, 30, 30, 31),
		"2031" : new Array(17, 31, 32, 31, 32, 31, 31, 31, 31, 31, 31, 31, 31),
		"2032" : new Array(17, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32),
		"2033" : new Array(18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"2034" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"2035" : new Array(17, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31),
		"2036" : new Array(17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2037" : new Array(18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"2038" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"2039" : new Array(17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30),
		"2040" : new Array(17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2041" : new Array(18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"2042" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"2043" : new Array(17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30),
		"2044" : new Array(17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2045" : new Array(18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"2046" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"2047" : new Array(17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30),
		"2048" : new Array(17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2049" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30),
		"2050" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31),
		"2051" : new Array(17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30),
		"2052" : new Array(17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2053" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30),
		"2054" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31),
		"2055" : new Array(17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 29, 30),
		"2056" : new Array(17, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30),
		"2057" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"2058" : new Array(17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31),
		"2059" : new Array(17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2060" : new Array(17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"2061" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"2062" : new Array(17, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31),
		"2063" : new Array(17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2064" : new Array(17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"2065" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"2066" : new Array(17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31),
		"2067" : new Array(17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2068" : new Array(17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"2069" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"2070" : new Array(17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30),
		"2071" : new Array(17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2072" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"2073" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31),
		"2074" : new Array(17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30),
		"2075" : new Array(17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2076" : new Array(16, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30),
		"2077" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31),
		"2078" : new Array(17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30),
		"2079" : new Array(17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30),
		"2080" : new Array(16, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30),

		//this data are from http://www.ashesh.com.np/nepali-calendar/
		"2081" : new Array(17, 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30),
		"2082" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30),
		"2083" : new Array(17, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30),
		"2084" : new Array(17, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30),
		"2085" : new Array(17, 31, 32, 31, 32, 31, 31, 30, 30, 29, 30, 30, 30),
		"2086" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30),
		"2087" : new Array(16, 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30),
		"2088" : new Array(16, 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30),
		"2089" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30),
		"2090" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30),
		"2091" : new Array(16, 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30),
		"2092" : new Array(16, 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30),
		"2093" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30),
		"2094" : new Array(17, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30),
		"2095" : new Array(17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30),
		"2096" : new Array(17, 30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30),
		"2097" : new Array(17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30),
		"2098" : new Array(17, 31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 30, 31),
		"2099" : new Array(17, 31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30),
		"2100" : new Array(17, 31, 32, 31, 32, 30, 31, 30, 29, 30, 29, 30, 30),		
	}
});	



//Modulus function which works for non-integers.
function mod(a, b) {
	return a - (b * Math.floor(a / b));
}

// Nepali calendar implementation
$.calendars.calendars.nepali = NepaliCalendar;

})(jQuery);