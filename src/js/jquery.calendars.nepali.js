/* http://keith-wood.name/calendars.html
   Nepali calendar for jQuery v2.2.0.
   Written by Artur Neumann (ict.projects{at}nepal.inf.org) April 2013.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict
	'use strict';

	/** Implementation of the Nepali civil calendar.
		Based on the ideas from 
		<a href="http://codeissue.com/articles/a04e050dea7468f/algorithm-to-convert-english-date-to-nepali-date-using-c-net">http://codeissue.com/articles/a04e050dea7468f/algorithm-to-convert-english-date-to-nepali-date-using-c-net</a>
		and <a href="http://birenj2ee.blogspot.com/2011/04/nepali-calendar-in-java.html">http://birenj2ee.blogspot.com/2011/04/nepali-calendar-in-java.html</a>
		See also <a href="http://en.wikipedia.org/wiki/Nepali_calendar">http://en.wikipedia.org/wiki/Nepali_calendar</a>
		and <a href="https://en.wikipedia.org/wiki/Bikram_Samwat">https://en.wikipedia.org/wiki/Bikram_Samwat</a>.
		@class NepaliCalendar
		@param {string} [language=''] The language code (default English) for localisation. */
	function NepaliCalendar(language) {
		this.local = this.regionalOptions[language || ''] || this.regionalOptions[''];
	}

	NepaliCalendar.prototype = new $.calendars.baseCalendar();

	var MAX_YEAR = 2100;
	var MIN_YEAR = 1659;

	$.extend(NepaliCalendar.prototype, {
		/** The calendar name.
			@memberof NepaliCalendar */
		name: 'Nepali',
		/** Julian date of start of Nepali epoch: 14 April 57 BCE.
			@memberof NepaliCalendar */
		jdEpoch: 1700709.5,
		/** Days per month in a common year.
			@memberof NepaliCalendar */
		daysPerMonth: [], // See NEPALI_CALENDAR_DATA below
		/** <code>true</code> if has a year zero, <code>false</code> if not.
			@memberof NepaliCalendar */
		hasYearZero: false,
		/** The minimum month number.
			@memberof NepaliCalendar */
		minMonth: 1,
		/** The first month in the year.
			@memberof NepaliCalendar */
		firstMonth: 1,
		/** The minimum day number.
			@memberof NepaliCalendar */
		minDay: 1, 
		/** The number of days in the year.
			@memberof NepaliCalendar */
		daysPerYear: 365,

		/** Localisations for the plugin.
			Entries are objects indexed by the language code ('' being the default US/English).
			Each object has the following attributes.
			@memberof NepaliCalendar
			@property {string} name The calendar name.
			@property {string[]} epochs The epoch names (before/after year 0).
			@property {string[]} monthNames The long names of the months of the year.
			@property {string[]} monthNamesShort The short names of the months of the year.
			@property {string[]} dayNames The long names of the days of the week.
			@property {string[]} dayNamesShort The short names of the days of the week.
			@property {string[]} dayNamesMin The minimal names of the days of the week.
			@property {string} dateFormat The date format for this calendar.
					See the options on <a href="BaseCalendar.html#formatDate"><code>formatDate</code></a> for details.
			@property {number} firstDay The number of the first day of the week, starting at 0.
			@property {boolean} isRTL <code>true</code> if this localisation reads right-to-left. */
		regionalOptions: { // Localisations
			'': {
				name: 'Nepali',
				epochs: ['BBS', 'ABS'],
				monthNames: ['Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
				'Kartik', 'Mangsir', 'Paush', 'Mangh', 'Falgun', 'Chaitra'],
				monthNamesShort: ['Bai', 'Je', 'As', 'Shra', 'Bha', 'Ash', 'Kar', 'Mang', 'Pau', 'Ma', 'Fal', 'Chai'],
				dayNames: ['Aaitabaar', 'Sombaar', 'Manglbaar', 'Budhabaar', 'Bihibaar', 'Shukrabaar', 'Shanibaar'],
				dayNamesShort: ['Aaita', 'Som', 'Mangl', 'Budha', 'Bihi', 'Shukra', 'Shani'],
				dayNamesMin: ['Aai', 'So', 'Man', 'Bu', 'Bi', 'Shu', 'Sha'],
				digits: null,
				dateFormat: 'dd/mm/yyyy',
				firstDay: 1,
				isRTL: false
			}
		},

		/** Determine whether this date is in a leap year.
			@memberof NepaliCalendar
			@param {CDate|number} year The date to examine or the year to examine.
			@return {boolean} <code>true</code> if this is a leap year, <code>false</code> if not.
			@throws Error if an invalid year or a different calendar used. */
		leapYear: function(year) {
			return this.daysInYear(year) !== this.daysPerYear;
		},

		/** Determine the week of the year for a date.
			@memberof NepaliCalendar
			@param {CDate|number} year The date to examine or the year to examine.
			@param {number} [month] The month to examine (if only <code>year</code> specified above).
			@param {number} [day] The day to examine (if only <code>year</code> specified above).
			@return {number} The week of the year.
			@throws Error if an invalid date or a different calendar used. */
		weekOfYear: function(year, month, day) {
			// Find Sunday of this week starting on Sunday
			var checkDate = this.newDate(year, month, day);
			checkDate.add(-checkDate.dayOfWeek(), 'd');
			return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
		},

		/** Retrieve the number of days in a year.
			@memberof NepaliCalendar
			@param {CDate|number} year The date to examine or the year to examine.
			@return {number} The number of days.
			@throws Error if an invalid year or a different calendar used. */
		daysInYear: function(year) {
			var date = this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear);
			year = date.year();
			if (typeof this.NEPALI_CALENDAR_DATA[year] === 'undefined') {
				return this.daysPerYear;
			}
			var daysPerYear = 0;
			for (var month = this.minMonth; month <= 12; month++) {
				daysPerYear += this.NEPALI_CALENDAR_DATA[year][month];
			}
			return daysPerYear;
		},

		/** Retrieve the number of days in a month.
			@memberof NepaliCalendar
			@param {CDate|number| year The date to examine or the year of the month.
			@param {number} [month] The month (if only <code>year</code> specified above).
			@return {number} The number of days in this month.
			@throws Error if an invalid month/year or a different calendar used. */
		daysInMonth: function(year, month) {
			if (year.year) {
				month = year.month();
				year = year.year();
			}
			this._validate(year, month, this.minDay, $.calendars.local.invalidMonth);
			return this.NEPALI_CALENDAR_DATA[year][month];
		},

		/** Determine whether this date is a week day.
			@memberof NepaliCalendar
			@param {CDate|number} year The date to examine or the year to examine.
			@param {number} [month] The month to examine (if only <code>year</code> specified above).
			@param {number} [day] The day to examine (if only <code>year</code> specified above).
			@return {boolean} <code>true</code> if a week day, <code>false</code> if not.
			@throws Error if an invalid date or a different calendar used. */
		weekDay: function(year, month, day) {
			return this.dayOfWeek(year, month, day) !== 6;
		},

		/** Retrieve the Julian date equivalent for this date,
			i.e. days since January 1, 4713 BCE Greenwich noon.
			@memberof NepaliCalendar
			@param {CDate|number} year The date to convert or the year to convert.
			@param {number} [month] The month to convert (if only <code>year</code> specified above).
			@param {number} [day] The day to convert (if only <code>year</code> specified above).
			@return {number} The equivalent Julian date.
			@throws Error if an invalid date or a different calendar used. */
		toJD: function(nepaliYear, nepaliMonth, nepaliDay) {
			var date = this._validate(nepaliYear, nepaliMonth, nepaliDay, $.calendars.local.invalidDate);
			nepaliYear = date.year();
			nepaliMonth = date.month();
			nepaliDay = date.day();
			var gregorianCalendar = $.calendars.instance();
			var gregorianDayOfYear = 0; // We will add all the days that went by since
			// the 1st. January and then we can get the Gregorian Date
			var nepaliMonthToCheck = nepaliMonth;
			var nepaliYearToCheck = nepaliYear;
			// Get the correct year
			var gregorianYear = nepaliYear - (nepaliMonthToCheck > 9 || (nepaliMonthToCheck === 9 &&
				nepaliDay >= this.NEPALI_CALENDAR_DATA[nepaliYearToCheck][0]) ? 56 : 57);
			// First we add the amount of days in the actual Nepali month as the day of year in the
			// Gregorian one because at least this days are gone since the 1st. Jan. 
			if (nepaliMonth !== 9) {
				gregorianDayOfYear = nepaliDay;
				nepaliMonthToCheck--;
			}
			// Now we loop throw all Nepali month and add the amount of days to gregorianDayOfYear 
			// we do this till we reach Paush (9th month). 1st. January always falls in this month  
			while (nepaliMonthToCheck !== 9) {
				if (nepaliMonthToCheck <= 0) {
					nepaliMonthToCheck = 12;
					nepaliYearToCheck--;
				}				
				gregorianDayOfYear += this.NEPALI_CALENDAR_DATA[nepaliYearToCheck][nepaliMonthToCheck];
				nepaliMonthToCheck--;
			}		
			// If the date that has to be converted is in Paush (month no. 9) we have to do some other calculation
			if (nepaliMonth === 9) {
				// Add the days that are passed since the first day of Paush and substract the
				// amount of days that lie between 1st. Jan and 1st Paush
				gregorianDayOfYear += nepaliDay - this.NEPALI_CALENDAR_DATA[nepaliYearToCheck][0];
				// For the first days of Paush we are now in negative values,
				// because in the end of the gregorian year we substract
				// 365 / 366 days (P.S. remember math in school + - gives -)
				if (gregorianDayOfYear < 0) {
					gregorianDayOfYear += gregorianCalendar.daysInYear(gregorianYear);
				}
			}
			else {
				gregorianDayOfYear += this.NEPALI_CALENDAR_DATA[nepaliYearToCheck][9] -
					this.NEPALI_CALENDAR_DATA[nepaliYearToCheck][0];
			}
			return gregorianCalendar.newDate(gregorianYear, 1 ,1).add(gregorianDayOfYear, 'd').toJD();
		},
		
		/** Create a new date from a Julian date.
			@memberof NepaliCalendar
			@param {number} jd The Julian date to convert.
			@return {CDate} The equivalent date. */
		fromJD: function(jd) {
			var gregorianCalendar =  $.calendars.instance();
			var gregorianDate = gregorianCalendar.fromJD(jd);
			var gregorianYear = gregorianDate.year();
			var gregorianDayOfYear = gregorianDate.dayOfYear();
			var nepaliYear = gregorianYear + 56; //this is not final, it could be also +57 but +56 is always true for 1st Jan.
			var nepaliMonth = 9; // Jan 1 always fall in Nepali month Paush which is the 9th month of Nepali calendar.
			if (nepaliYear < MIN_YEAR - 1 || nepaliYear > MAX_YEAR) {
				throw $.calendars.local.invalidYear.replace(/\{0\}/, this.local.name);
			}
			// Get the Nepali day in Paush (month 9) of 1st January 
			var dayOfFirstJanInPaush = this.NEPALI_CALENDAR_DATA[nepaliYear][0];
			// Check how many days are left of Paush.
			// Days calculated from 1st Jan till the end of the actual Nepali month, 
			// we use this value to check if the gregorian Date is in the actual Nepali month.
			var daysSinceJanFirstToEndOfNepaliMonth =
				this.NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth] - dayOfFirstJanInPaush + 1;
			// If the gregorian day-of-year is smaller o equal than the sum of days between the 1st January and 
			// the end of the actual nepali month we found the correct nepali month.
			// Example: 
			// The 4th February 2011 is the gregorianDayOfYear 35 (31 days of January + 4)
			// 1st January 2011 is in the nepali year 2067, where 1st. January is in the 17th day of Paush (9th month)
			// In 2067 Paush has 30days, This means (30-17+1=14) there are 14days between 1st January and end of Paush 
			// (including 17th January)
			// The gregorianDayOfYear (35) is bigger than 14, so we check the next month
			// The next nepali month (Mangh) has 29 days 
			// 29+14=43, this is bigger than gregorianDayOfYear(35) so, we found the correct nepali month
			while (gregorianDayOfYear > daysSinceJanFirstToEndOfNepaliMonth) {
				nepaliMonth++;
				if (nepaliMonth > 12) {
					nepaliMonth = 1;
					nepaliYear++;
				}
				if (nepaliYear > MAX_YEAR) {
					throw $.calendars.local.invalidYear.replace(/\{0\}/, this.local.name);
				}
				daysSinceJanFirstToEndOfNepaliMonth += this.NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth];
			}
			// The last step is to calculate the nepali day-of-month
			// to continue our example from before:
			// we calculated there are 43 days from 1st. January (17 Paush) till end of Mangh (29 days)
			// when we subtract from this 43 days the day-of-year of the the Gregorian date (35),
			// we know how far the searched day is away from the end of the Nepali month.
			// So we simply subtract this number from the amount of days in this month (30) 
			var nepaliDayOfMonth = this.NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth] -
				(daysSinceJanFirstToEndOfNepaliMonth - gregorianDayOfYear);		
			return this.newDate(nepaliYear, nepaliMonth, nepaliDayOfMonth);
		},

		/** Determine whether a date is valid for this calendar.
			@memberof UmmAlQuraCalendar
			@param {number} year The year to examine.
			@param {number} month The month to examine.
			@param {number} day The day to examine.
			@return {boolean} <code>true</code> if a valid date, <code>false</code> if not. */
		isValid: function(year, month, day) { // jshint unused:false
			try {
				var valid = $.calendars.baseCalendar.prototype.isValid.apply(this, arguments);
				if (valid) {
					year = (typeof year.year === 'function' ? year.year() : year);
					valid = (year >= MIN_YEAR && year <= MAX_YEAR);
				}
				return valid;
			} catch (e) {
				return false;
			}
		},

		/** Check that a candidate date is from the same calendar and is valid.
			@memberof UmmAlQuraCalendar
			@private
			@param {CDate|number} year The date to validate or the year to validate.
			@param {number} month The month to validate (if only <code>year</code> specified above).
			@param {number} day The day to validate (if only <code>year</code> specified above).
			@param {string} error Error message if invalid.
			@return {CDate} The validated date.
			@throws Error if different calendars used or invalid date. */
		_validate: function(year, month, day, error) {
			var date = $.calendars.baseCalendar.prototype._validate.apply(this, arguments);
			if (date.year() < MIN_YEAR || date.year() > MAX_YEAR) {
				throw error.replace(/\{0\}/, this.local.name);
			}
			return date;
		},
		
		NEPALI_CALENDAR_DATA:  {
			// These data are from https://www.ashesh.com.np/nepali-calendar/
			1658: [24, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1659: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1660: [23, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1661: [24, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1662: [24, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1663: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1664: [23, 31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
			1665: [24, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1666: [24, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1667: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1668: [23, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1669: [24, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1670: [24, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1671: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1672: [23, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1673: [24, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1674: [24, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1675: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1676: [23, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1677: [24, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1678: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1679: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1680: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1681: [24, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1682: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1683: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1684: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1685: [24, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
			1686: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1687: [23, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1688: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1689: [24, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1690: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1691: [23, 31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
			1692: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1693: [24, 31, 31, 32, 32, 31, 30, 30, 29, 30, 30, 29, 30],
			1694: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1695: [23, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1696: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1697: [24, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1698: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1699: [23, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1700: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1701: [24, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1702: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1703: [23, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1704: [23, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
			1705: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1706: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1707: [23, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1708: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1709: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1710: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1711: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1712: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1713: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1714: [23, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1715: [23, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1716: [23, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1717: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1718: [23, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1719: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1720: [23, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1721: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1722: [23, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
			1723: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1724: [23, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1725: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1726: [23, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1727: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1728: [23, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1729: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1730: [23, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1731: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1732: [22, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1733: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1734: [23, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1735: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1736: [22, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1737: [23, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1738: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
			1739: [23, 30, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1740: [22, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1741: [23, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1742: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1743: [23, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
			1744: [22, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1745: [23, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1746: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1747: [23, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1748: [22, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1749: [23, 31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
			1750: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1751: [23, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1752: [22, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1753: [23, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1754: [23, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1755: [23, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1756: [22, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1757: [22, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1758: [22, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1759: [22, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1760: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1761: [22, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1762: [22, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1763: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1764: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1765: [22, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1766: [22, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1767: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1768: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1769: [22, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1770: [22, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
			1771: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1772: [21, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1773: [22, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1774: [22, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1775: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1776: [21, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
			1777: [22, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1778: [22, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1779: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1780: [21, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
			1781: [22, 31, 31, 32, 31, 31, 30, 31, 29, 30, 29, 30, 30],
			1782: [22, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1783: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1784: [21, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1785: [22, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1786: [22, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1787: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1788: [21, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1789: [22, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1790: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1791: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1792: [21, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1793: [22, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1794: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1795: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1796: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1797: [22, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1798: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1799: [21, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1800: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1801: [22, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1802: [21, 31, 31, 31, 33, 31, 30, 30, 30, 29, 29, 30, 31],
			1803: [21, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1804: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1805: [22, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1806: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1807: [21, 31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
			1808: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1809: [22, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1810: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1811: [21, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1812: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1813: [22, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1814: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1815: [21, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1816: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1817: [22, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1818: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1819: [21, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1820: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1821: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1822: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1823: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1824: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1825: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1826: [21, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1827: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1828: [21, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
			1829: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1830: [21, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1831: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1832: [21, 31, 31, 32, 32, 31, 30, 30, 29, 30, 31, 28, 30],
			1833: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1834: [21, 31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
			1835: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1836: [21, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1837: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1838: [21, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1839: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1840: [21, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1841: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1842: [21, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1843: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1844: [21, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1845: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1846: [21, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1847: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1848: [20, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1849: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1850: [21, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1851: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1852: [20, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1853: [21, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1854: [21, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1855: [21, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
			1856: [20, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1857: [20, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1858: [20, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1859: [20, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1860: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1861: [20, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
			1862: [20, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1863: [20, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1864: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1865: [20, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
			1866: [20, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1867: [20, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1868: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1869: [20, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1870: [20, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1871: [20, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1872: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1873: [20, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1874: [20, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1875: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1876: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1877: [20, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1878: [20, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1879: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1880: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1881: [20, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1882: [20, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1883: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1884: [19, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1885: [20, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1886: [20, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
			1887: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1888: [19, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1889: [20, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1890: [20, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1891: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1892: [19, 31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
			1893: [20, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1894: [20, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1895: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1896: [19, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1897: [20, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1898: [20, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1899: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1900: [19, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1901: [20, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1902: [20, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1903: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1904: [19, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1905: [20, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1906: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1907: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1908: [19, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1909: [20, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1910: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1911: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1912: [19, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1913: [20, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
			1914: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1915: [19, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1916: [19, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1917: [20, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1918: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1919: [19, 31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
			1920: [19, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1921: [20, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1922: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1923: [19, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
			1924: [19, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1925: [20, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1926: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1927: [19, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1928: [19, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1929: [20, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1930: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1931: [19, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1932: [19, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1933: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1934: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1935: [19, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1936: [19, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1937: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1938: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1939: [19, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1940: [19, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1941: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1942: [19, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1943: [19, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1944: [19, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1945: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1946: [19, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1947: [19, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1948: [19, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1949: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1950: [19, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
			1951: [19, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1952: [19, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1953: [19, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1954: [19, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1955: [19, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1956: [19, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1957: [18, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1958: [18, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1959: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1960: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1961: [18, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1962: [18, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1963: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1964: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1965: [18, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1966: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1967: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1968: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1969: [18, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1970: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1971: [18, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
			1972: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1973: [18, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1974: [18, 30, 32, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1975: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1976: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1977: [18, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
			1978: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1979: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1980: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1981: [18, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1982: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1983: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1984: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1985: [18, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			1986: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1987: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			1988: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			1989: [18, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1990: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1991: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1992: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1993: [18, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			1994: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1995: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			1996: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			1997: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1998: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			1999: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2000: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			2001: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2002: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2003: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2004: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			2005: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 29, 30],
			2006: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 30, 29, 30],
			2007: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			2008: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
			2009: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2010: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2011: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2012: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			2013: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2014: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2015: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2016: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			2017: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2018: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2019: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			2020: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			2021: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2022: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			2023: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			2024: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			2025: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2026: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2027: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			2028: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2029: [18, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
			2030: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2031: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			2032: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2033: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2034: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2035: [17, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
			2036: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2037: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2038: [17, 32, 31, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2039: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			2040: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2041: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2042: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2043: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			2044: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2045: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2046: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2047: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			2048: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2049: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			2050: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			2051: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			2052: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2053: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			2054: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			2055: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2056: [17, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
			2057: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2058: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			2059: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2060: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2061: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2062: [17, 31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
			2063: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2064: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2065: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2066: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
			2067: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2068: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2069: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2070: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			2071: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2072: [17, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2073: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2074: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			2075: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2076: [16, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			2077: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			2078: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			2079: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2080: [16, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
			2081: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			2082: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2083: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2084: [16, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2085: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			2086: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2087: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2088: [16, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2089: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
			2090: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
			2091: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2092: [16, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2093: [17, 31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
			2094: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2095: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2096: [16, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
			2097: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
			2098: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
			2099: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
			2100: [16, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
		}
	});	

	// Nepali calendar implementation
	$.calendars.calendars.nepali = NepaliCalendar;

})(jQuery);
