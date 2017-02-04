$(function() {
	module('Core');

	test('Calendars', function() {
		expect(24);
		var d = $.calendars.newDate();
		var jsd = new Date();
		equal(d.year(), jsd.getFullYear(), 'Calendars - null - year');
		equal(d.month(), jsd.getMonth() + 1, 'Calendars - null - month');
		equal(d.day(), jsd.getDate(), 'Calendars - null - day');
		d = $.calendars.newDate(2009, 1, 2);
		equal(d.year(), 2009, 'Calendars - default - year');
		equal(d.month(), 1, 'Calendars - default - month');
		equal(d.day(), 2, 'Calendars - default - day');
		var gc = $.calendars.instance();
		ok(d.calendar() == gc, 'Calendars - default - calendar');
		var d2 = $.calendars.newDate(2008, 11, 12, 'Gregorian', 'fr');
		equal(d2.year(), 2008, 'Calendars - Gregorian/fr - year');
		equal(d2.month(), 11, 'Calendars - Gregorian/fr - month');
		equal(d2.day(), 12, 'Calendars - Gregorian/fr - day');
		ok(d2.calendar() != gc, 'Calendars - Gregorian/fr - calendar');
		var gc_fr = $.calendars.instance('Gregorian', 'fr');
		ok(d2.calendar() == gc_fr, 'Calendars - Gregorian/fr - calendar');
		ok(d.compareTo(d2) == +1, 'Calendars - localisation compare');
		var pc = $.calendars.instance('Persian');
		d = $.calendars.newDate(1388, 3, 4, pc);
		equal(d.year(), 1388, 'Calendars - Persian - year');
		equal(d.month(), 3, 'Calendars - Persian - month');
		equal(d.day(), 4, 'Calendars - Persian - day');
		ok(d.calendar() == pc, 'Calendars - Persian - calendar');
		var ic = $.calendars.instance('Islamic');
		d = $.calendars.newDate(1430, 5, 6, 'Islamic');
		equal(d.year(), 1430, 'Calendars - Islamic - year');
		equal(d.month(), 5, 'Calendars - Islamic - month');
		equal(d.day(), 6, 'Calendars - Islamic - day');
		ok(d.calendar() == ic, 'Calendars - Islamic - calendar');
		d2 = $.calendars.newDate(d);
		ok(d.compareTo(d2) == 0, 'Calendars - clone compare');
		ok(d != d2, 'Calendars - clone not same');
		try {
			$.calendars.newDate(2009, 1, 2).compareTo(d);
			fail('Calendar - cross compare succeeded');
		}
		catch (e) {
			equal(e, 'Cannot mix Gregorian and Islamic dates', 'Calendar - cross compare');
		}
	});

	test('CDate', function() {
		expect(36);
		var d = $.calendars.instance().newDate(2008, 1, 2);
		equal(d.year(), 2008, 'CDate - 02/01/2008 - year');
		equal(d.formatYear(), '2008', 'CDate - 02/01/2008 - format year');
		equal(d.leapYear(), true, 'CDate - 02/01/2008 - leap year');
		equal(d.epoch(), 'CE', 'CDate - 02/01/2008 - epoch');
		equal(d.month(), 1, 'CDate - 02/01/2008 - month');
		equal(d.day(), 2, 'CDate - 02/01/2008 - day');
		equal(d.dayOfWeek(), 3, 'CDate - 02/01/2008 - day of week');
		equal(d.weekOfYear(), 1, 'CDate - 02/01/2008 - week of year');
		equal(d.monthOfYear(), 1, 'CDate - 02/01/2008 - month of year');
		equal(d.toString(), '2008-01-02', 'CDate - 02/01/2008 - toString');
		d.date(2009, 3, 4);
		equal(d.year(), 2009, 'CDate - 04/03/2009 - year');
		equal(d.formatYear(), '2009', 'CDate - 04/03/2009 - format year');
		equal(d.leapYear(), false, 'CDate - 04/03/2009 - leap year');
		equal(d.epoch(), 'CE', 'CDate - 04/03/2009 - epoch');
		equal(d.month(), 3, 'CDate - 04/03/2009 - month');
		equal(d.day(), 4, 'CDate - 04/03/2009 - day');
		equal(d.dayOfWeek(), 3, 'CDate - 04/03/2009 - day of week');
		equal(d.weekOfYear(), 10, 'CDate - 04/03/2009 - week of year');
		equal(d.monthOfYear(), 3, 'CDate - 04/03/2009 - month of year');
		equal(d.toString(), '2009-03-04', 'CDate - 04/03/2009 - toString');
		d.year(2010).month(5).day(6);
		equal(d.year(), 2010, 'CDate - 06/05/2010 - year');
		equal(d.formatYear(), '2010', 'CDate - 06/05/2010 - format year');
		equal(d.leapYear(), false, 'CDate - 06/05/2010 - leap year');
		equal(d.epoch(), 'CE', 'CDate - 06/05/2010 - epoch');
		equal(d.month(), 5, 'CDate - 06/05/2010 - month');
		equal(d.day(), 6, 'CDate - 06/05/2010 - day');
		equal(d.dayOfWeek(), 4, 'CDate - 06/05/2010 - day of week');
		equal(d.weekOfYear(), 18, 'CDate - 06/05/2010 - week of year');
		equal(d.monthOfYear(), 5, 'CDate - 06/05/2010 - month of year');
		equal(d.toString(), '2010-05-06', 'CDate - 06/05/2010 - toString');
		var d2 = d.newDate();
		ok(d.compareTo(d2) == 0, 'CDate - clone compare');
		ok(d != d2, 'CDate - clone equals');
		var d3 = d.newDate(d2);
		ok(d2.compareTo(d3) == 0, 'CDate - clone other compare');
		ok(d2 != d3, 'CDate - clone other equals');
		d3 = d.newDate(2011, 7, 8);
		ok(d2.compareTo(d3) == -1, 'CDate - new date compare');
		ok(d2 != d3, 'CDate - new date equals');
	});

	test('Gregorian calendar', function() {
		expect(95);
		var gc = $.calendars.instance('Gregorian');
		equal(gc.monthsInYear(1900), 12, 'Gregorian - months in year 1900');
		equal(gc.monthsInYear(1996), 12, 'Gregorian - months in year 1996');
		equal(gc.monthsInYear(1999), 12, 'Gregorian - months in year 1999');
		equal(gc.monthsInYear(2000), 12, 'Gregorian - months in year 2000');
		equal(gc.monthsInYear(2001), 12, 'Gregorian - months in year 2001');
		equal(gc.monthsInYear(gc.newDate(1900, 1, 1)), 12, 'Gregorian - months in year 1900');
		equal(gc.monthsInYear(gc.newDate(1996, 2, 2)), 12, 'Gregorian - months in year 1996');
		equal(gc.monthsInYear(gc.newDate(1999, 3, 3)), 12, 'Gregorian - months in year 1999');
		equal(gc.monthsInYear(gc.newDate(2000, 4, 5)), 12, 'Gregorian - months in year 2000');
		equal(gc.monthsInYear(gc.newDate(2001, 6, 6)), 12, 'Gregorian - months in year 2001');
		equal(gc.leapYear(-2), false, 'Gregorian - leap year -2');
		equal(gc.leapYear(-1), true, 'Gregorian - leap year -1');
		equal(gc.leapYear(1900), false, 'Gregorian - leap year 1900');
		equal(gc.leapYear(1996), true, 'Gregorian - leap year 1996');
		equal(gc.leapYear(1999), false, 'Gregorian - leap year 1999');
		equal(gc.leapYear(2000), true, 'Gregorian - leap year 2000');
		equal(gc.leapYear(2001), false, 'Gregorian - leap year 2001');
		equal(gc.leapYear(gc.newDate(1900, 1, 1)), false, 'Gregorian - leap year 1900');
		equal(gc.leapYear(gc.newDate(1996, 2, 2)), true, 'Gregorian - leap year 1996');
		equal(gc.leapYear(gc.newDate(1999, 3, 3)), false, 'Gregorian - leap year 1999');
		equal(gc.leapYear(gc.newDate(2000, 4, 4)), true, 'Gregorian - leap year 2000');
		equal(gc.leapYear(gc.newDate(2001, 5, 5)), false, 'Gregorian - leap year 2001');
		equal(gc.daysInYear(1900), 365, 'Gregorian - days in year 1900');
		equal(gc.daysInYear(1996), 366, 'Gregorian - days in year 1996');
		equal(gc.daysInYear(1999), 365, 'Gregorian - days in year 1999');
		equal(gc.daysInYear(2000), 366, 'Gregorian - days in year 2000');
		equal(gc.daysInYear(2001), 365, 'Gregorian - days in year 2001');
		equal(gc.daysInYear(gc.newDate(1900, 1, 1)), 365, 'Gregorian - days in year 1900');
		equal(gc.daysInYear(gc.newDate(1996, 2, 2)), 366, 'Gregorian - days in year 1996');
		equal(gc.daysInYear(gc.newDate(1999, 3, 3)), 365, 'Gregorian - days in year 1999');
		equal(gc.daysInYear(gc.newDate(2000, 4, 4)), 366, 'Gregorian - days in year 2000');
		equal(gc.daysInYear(gc.newDate(2001, 5, 5)), 365, 'Gregorian - days in year 2001');
		equal(gc.daysInMonth(2001, 1), 31, 'Gregorian - days in month Jan 2001');
		equal(gc.daysInMonth(2001, 2), 28, 'Gregorian - days in month Feb 2001');
		equal(gc.daysInMonth(2001, 3), 31, 'Gregorian - days in month Mar 2001');
		equal(gc.daysInMonth(2001, 4), 30, 'Gregorian - days in month Apr 2001');
		equal(gc.daysInMonth(2001, 5), 31, 'Gregorian - days in month May 2001');
		equal(gc.daysInMonth(2001, 6), 30, 'Gregorian - days in month Jun 2001');
		equal(gc.daysInMonth(2001, 7), 31, 'Gregorian - days in month Jul 2001');
		equal(gc.daysInMonth(2001, 8), 31, 'Gregorian - days in month Aug 2001');
		equal(gc.daysInMonth(2001, 9), 30, 'Gregorian - days in month Sep 2001');
		equal(gc.daysInMonth(2001, 10), 31, 'Gregorian - days in month Oct 2001');
		equal(gc.daysInMonth(2001, 11), 30, 'Gregorian - days in month Nov 2001');
		equal(gc.daysInMonth(2001, 12), 31, 'Gregorian - days in month Dec 2001');
		equal(gc.daysInMonth(2004, 1), 31, 'Gregorian - days in month Jan 2004');
		equal(gc.daysInMonth(2004, 2), 29, 'Gregorian - days in month Feb 2004');
		equal(gc.daysInMonth(2004, 3), 31, 'Gregorian - days in month Mar 2004');
		equal(gc.daysInMonth(2004, 4), 30, 'Gregorian - days in month Apr 2004');
		equal(gc.daysInMonth(2004, 5), 31, 'Gregorian - days in month May 2004');
		equal(gc.daysInMonth(2004, 6), 30, 'Gregorian - days in month Jun 2004');
		equal(gc.daysInMonth(2004, 7), 31, 'Gregorian - days in month Jul 2004');
		equal(gc.daysInMonth(2004, 8), 31, 'Gregorian - days in month Aug 2004');
		equal(gc.daysInMonth(2004, 9), 30, 'Gregorian - days in month Sep 2004');
		equal(gc.daysInMonth(2004, 10), 31, 'Gregorian - days in month Oct 2004');
		equal(gc.daysInMonth(2004, 11), 30, 'Gregorian - days in month Nov 2004');
		equal(gc.daysInMonth(2004, 12), 31, 'Gregorian - days in month Dec 2004');
		equal(gc.daysInMonth(gc.newDate(2001, 1, 1)), 31, 'Gregorian - days in month Jan 2001');
		equal(gc.daysInMonth(gc.newDate(2001, 2, 2)), 28, 'Gregorian - days in month Feb 2001');
		equal(gc.daysInMonth(gc.newDate(2001, 3, 3)), 31, 'Gregorian - days in month Mar 2001');
		equal(gc.daysInMonth(gc.newDate(2001, 4, 4)), 30, 'Gregorian - days in month Apr 2001');
		equal(gc.daysInMonth(gc.newDate(2001, 5, 5)), 31, 'Gregorian - days in month May 2001');
		equal(gc.daysInMonth(gc.newDate(2001, 6, 6)), 30, 'Gregorian - days in month Jun 2001');
		equal(gc.daysInMonth(gc.newDate(2001, 7, 7)), 31, 'Gregorian - days in month Jul 2001');
		equal(gc.daysInMonth(gc.newDate(2001, 8, 8)), 31, 'Gregorian - days in month Aug 2001');
		equal(gc.daysInMonth(gc.newDate(2001, 9, 9)), 30, 'Gregorian - days in month Sep 2001');
		equal(gc.daysInMonth(gc.newDate(2001, 10, 10)), 31, 'Gregorian - days in month Oct 2001');
		equal(gc.daysInMonth(gc.newDate(2001, 11, 11)), 30, 'Gregorian - days in month Nov 2001');
		equal(gc.daysInMonth(gc.newDate(2001, 12, 12)), 31, 'Gregorian - days in month Dec 2001');
		equal(gc.daysInMonth(gc.newDate(2004, 1, 1)), 31, 'Gregorian - days in month Jan 2004');
		equal(gc.daysInMonth(gc.newDate(2004, 2, 2)), 29, 'Gregorian - days in month Feb 2004');
		equal(gc.daysInMonth(gc.newDate(2004, 3, 3)), 31, 'Gregorian - days in month Mar 2004');
		equal(gc.daysInMonth(gc.newDate(2004, 4, 4)), 30, 'Gregorian - days in month Apr 2004');
		equal(gc.daysInMonth(gc.newDate(2004, 5, 5)), 31, 'Gregorian - days in month May 2004');
		equal(gc.daysInMonth(gc.newDate(2004, 6, 6)), 30, 'Gregorian - days in month Jun 2004');
		equal(gc.daysInMonth(gc.newDate(2004, 7, 7)), 31, 'Gregorian - days in month Jul 2004');
		equal(gc.daysInMonth(gc.newDate(2004, 8, 8)), 31, 'Gregorian - days in month Aug 2004');
		equal(gc.daysInMonth(gc.newDate(2004, 9, 9)), 30, 'Gregorian - days in month Sep 2004');
		equal(gc.daysInMonth(gc.newDate(2004, 10, 10)), 31, 'Gregorian - days in month Oct 2004');
		equal(gc.daysInMonth(gc.newDate(2004, 11, 11)), 30, 'Gregorian - days in month Nov 2004');
		equal(gc.daysInMonth(gc.newDate(2004, 12, 12)), 31, 'Gregorian - days in month Dec 2004');
		equal(gc.daysInWeek(), 7, 'Gregorian - days in week');
		equal(gc.epoch(2000), 'CE', 'Gregorian - epoch 2000');
		equal(gc.epoch(-2000), 'BCE', 'Gregorian - epoch -2000');
		var date = gc.newDate(2000, 12, 31);
		equal(gc.weekOfYear(date), 52, 'Gregorian - week ' + date);
		date = gc.newDate(2001, 1, 1);
		equal(gc.weekOfYear(date), 1, 'Gregorian - week ' + date);
		date = gc.newDate(2001, 1, 7);
		equal(gc.weekOfYear(date), 1, 'Gregorian - week ' + date);
		date = gc.newDate(2001, 1, 8);
		equal(gc.weekOfYear(date), 2, 'Gregorian - week ' + date);
		date = gc.newDate(2003, 12, 28);
		equal(gc.weekOfYear(date), 52, 'Gregorian - week ' + date);
		date = gc.newDate(2003, 12, 29);
		equal(gc.weekOfYear(date), 1, 'Gregorian - week ' + date);
		date = gc.newDate(2004, 1, 4);
		equal(gc.weekOfYear(date), 1, 'Gregorian - week ' + date);
		date = gc.newDate(2004, 1, 5);
		equal(gc.weekOfYear(date), 2, 'Gregorian - week ' + date);
		date = gc.newDate(2009, 12, 28);
		equal(gc.weekOfYear(date), 53, 'Gregorian - week ' + date);
		date = gc.newDate(2010, 1, 3);
		equal(gc.weekOfYear(date), 53, 'Gregorian - week ' + date);
		date = gc.newDate(2010, 1, 4);
		equal(gc.weekOfYear(date), 1, 'Gregorian - week ' + date);
		date = gc.newDate(2010, 1, 10);
		equal(gc.weekOfYear(date), 1, 'Gregorian - week ' + date);
	});

	test('Gregorian vs Julian Date', function() {
		expect(42);
		var gc = $.calendars.instance('Gregorian');
		var tests = [[-4713, 1, 1, 37.5], [-4000, 1, 1, 260455.5],
			[-3500, 1, 1, 443076.5], [-3000, 1, 1, 625697.5],
			[-2500, 1, 1, 808318.5], [-2000, 1, 1, 990940.5],
			[-1500, 1, 1, 1173561.5], [-1000, 1, 1, 1356182.5],
			[-500, 1, 1, 1538803.5], [-1, 12, 31, 1721424.5],
			[1, 1, 1, 1721425.5], [500, 1, 1, 1903681.5],
			[1000, 1, 1, 2086302.5], [1500, 1, 1, 2268923.5],
			[1582, 10, 4, 2299149.5], [1582, 10, 15, 2299160.5],
			[1600, 1, 1, 2305447.5], [1700, 1, 1, 2341972.5],
			[1800, 1, 1, 2378496.5], [1900, 1, 1, 2415020.5],
			[2009, 2, 1, 2454863.5]];
		// http://www.onlineconversion.com/julian_date.htm
		for (var i = 0; i < tests.length; i++) {
			date = gc.newDate(tests[i][0], tests[i][1], tests[i][2]);
			equal(date.toJD(), tests[i][3], 'Gregorian - to Julian ' + date);
			equalCDate(gc.fromJD(tests[i][3]), date, 'Gregorian - from Julian ' + date);
		}
	});

	test('Gregorian days', function() {
		expect(43);
		var gc = $.calendars.instance('Gregorian');
		var d = gc.newDate(2009, 1, 2);
		equal(d.year(), 2009, 'Gregorian - year');
		equal(d.month(), 1, 'Gregorian - month');
		equal(d.day(), 2, 'Gregorian - day');
		equal(d.leapYear(), false, 'Gregorian - leap year');
		equal(d.formatYear(), '2009', 'Gregorian - format year');
		equal(d.dayOfWeek(), 5, 'Gregorian - day of week');
		equal(d.weekDay(), true, 'Gregorian - week day');
		equal(d.dayOfYear(), 2, 'Gregorian - day of year');
		equal(d.toJD(), 2454833.5, 'Gregorian - Julian date');
		equalDate(d.toJSDate(), new Date(2009, 1 - 1, 2), 'Gregorian - JS Date');
		d.date(2004, 2, 29);
		equal(d.year(), 2004, 'Gregorian - year');
		equal(d.month(), 2, 'Gregorian - month');
		equal(d.day(), 29, 'Gregorian - day');
		equal(d.leapYear(), true, 'Gregorian - leap year');
		equal(d.formatYear(), '2004', 'Gregorian - format year');
		equal(d.dayOfWeek(), 0, 'Gregorian - day of week');
		equal(d.weekDay(), false, 'Gregorian - week day');
		equal(d.dayOfYear(), 60, 'Gregorian - day of year');
		equal(d.toJD(), 2453064.5, 'Gregorian - Julian date');
		equalDate(d.toJSDate(), new Date(2004, 2 - 1, 29), 'Gregorian - JS Date');
		d = gc.today();
		var today = new Date();
		equal(d.year(), today.getFullYear(), 'Gregorian - year');
		equal(d.month(), today.getMonth() + 1, 'Gregorian - month');
		equal(d.day(), today.getDate(), 'Gregorian - day');
		equal(d.dayOfWeek(), today.getDay(), 'Gregorian - day of week');
		equal(d.weekDay(), (today.getDay() || 7) < 6, 'Gregorian - week day');
		equalDate(d.toJSDate(), today, 'Gregorian - JS Date');
		equal(gc.isValid(1582, 10, 4), true, 'Gregorian - valid 04/10/1582');
		equal(gc.isValid(1582, 10, 5), true, 'Gregorian - valid 05/10/1582');
		equal(gc.isValid(1582, 10, 14), true, 'Gregorian - valid 14/10/1582');
		equal(gc.isValid(1582, 10, 15), true, 'Gregorian - valid 15/10/1582');
		equal(gc.isValid(2001, 2, 28), true, 'Gregorian - valid 28/02/2001');
		equal(gc.isValid(2001, 2, 29), false, 'Gregorian - valid 29/02/2001');
		equal(gc.isValid(2000, 2, 28), true, 'Gregorian - valid 28/02/2000');
		equal(gc.isValid(2000, 2, 29), true, 'Gregorian - valid 29/02/2000');
		equal(gc.isValid(-1, 10, 4), true, 'Gregorian - valid 04/10/-0001');
		equal(gc.isValid(0, 10, 4), false, 'Gregorian - valid 04/10/0000');
		equal(gc.isValid(2000, -1, 28), false, 'Gregorian - valid 28/-1/2000');
		equal(gc.isValid(2000, 14, 28), false, 'Gregorian - valid 28/14/2000');
		equal(gc.isValid(2000, 2, -1), false, 'Gregorian - valid -1/02/2000');
		equal(gc.isValid(2000, 2, 88), false, 'Gregorian - valid 88/02/2000');
		try {
			d = gc.newDate(2001, 2, 29);
			ok(false, 'Gregorian - invalid date - non-leap');
		}
		catch (e) {
			equal(e, 'Invalid Gregorian date', 'Gregorian - invalid date - non-leap');
		}
		try {
			d = gc.newDate(0, 2, 1);
			ok(false, 'Gregorian - invalid date - year zero');
		}
		catch (e) {
			equal(e, 'Invalid Gregorian date', 'Gregorian - invalid date - year zero');
		}
		try {
			$.calendars.local = {invalidDate: 'Wrong date', invalidMonth: 'Wrong month'};
			d = gc.newDate(2001, 2, 29);
			ok(false, 'Gregorian - invalid date - custom');
		}
		catch (e) {
			equal(e, 'Wrong date', 'Gregorian - invalid date - custom');
		}
		$.calendars.local = $.calendars.regionalOptions[''];
	});

	test('Gregorian add', function() {
		expect(36);
		var gc = $.calendars.instance('Gregorian');
		var d = gc.newDate(2009, 1, 2);
		d.add(1, 'y');
		equalCDate(d, gc.newDate(2010, 1, 2), 'Gregorian - add 1 y');
		d.add(-2, 'y');
		equalCDate(d, gc.newDate(2008, 1, 2), 'Gregorian - add -2 y');
		d.add(1, 'm');
		equalCDate(d, gc.newDate(2008, 2, 2), 'Gregorian - add 1 m');
		d.add(-2, 'm');
		equalCDate(d, gc.newDate(2007, 12, 2), 'Gregorian - add -2 m');
		d.add(1, 'w');
		equalCDate(d, gc.newDate(2007, 12, 9), 'Gregorian - add 1 w');
		d.add(-2, 'w');
		equalCDate(d, gc.newDate(2007, 11, 25), 'Gregorian - add -2 w');
		d.add(1, 'd');
		equalCDate(d, gc.newDate(2007, 11, 26), 'Gregorian - add 1 d');
		d.add(-2, 'd');
		equalCDate(d, gc.newDate(2007, 11, 24), 'Gregorian - add -2 d');
		d.add(1, 'd').add(1, 'w').add(1, 'm').add(1, 'y');
		equalCDate(d, gc.newDate(2009, 1, 2), 'Gregorian - add 1 d, 1 w, 1 m, 1 y');
		d.date(2008, 2, 20).add(2, 'w');
		equalCDate(d, gc.newDate(2008, 3, 5), 'Gregorian - add 2 w over leap day');
		d.date(2008, 1, 31).add(1, 'm');
		equalCDate(d, gc.newDate(2008, 2, 29), 'Gregorian - add 1 m for leap day');
		d.date(2008, 2, 29).add(1, 'y');
		equalCDate(d, gc.newDate(2009, 2, 28), 'Gregorian - add 1 y to leap day');
		d.date(2, 2, 1).add(-2, 'y');
		equalCDate(d, gc.newDate(-1, 2, 1), 'Gregorian - add -2 y into year 0');
		d.date(-2, 2, 1).add(2, 'y');
		equalCDate(d, gc.newDate(1, 2, 1), 'Gregorian - add 2 y into year 0');
		d.date(2, 2, 1).add(-4, 'y');
		equalCDate(d, gc.newDate(-3, 2, 1), 'Gregorian - add -4 y over year 0');
		d.date(-2, 2, 1).add(4, 'y');
		equalCDate(d, gc.newDate(3, 2, 1), 'Gregorian - add 4 y over year 0');
		d.date(1, 2, 1).add(-6, 'm');
		equalCDate(d, gc.newDate(-1, 8, 1), 'Gregorian - add -6 m into year 0');
		d.date(-1, 10, 1).add(6, 'm');
		equalCDate(d, gc.newDate(1, 4, 1), 'Gregorian - add 6 m into year 0');
		d.date(1, 2, 1).add(-26, 'm');
		equalCDate(d, gc.newDate(-3, 12, 1), 'Gregorian - add -26 m over year 0');
		d.date(-1, 10, 1).add(26, 'm');
		equalCDate(d, gc.newDate(2, 12, 1), 'Gregorian - add 26 m over year 0');
		d.date(1, 2, 1).add(-15, 'w');
		equalCDate(d, gc.newDate(-1, 10, 19), 'Gregorian - add -15 w into year 0');
		d.date(-1, 10, 1).add(15, 'w');
		equalCDate(d, gc.newDate(1, 1, 14), 'Gregorian - add 15 w into year 0');
		d.date(1, 2, 1).add(-100, 'w');
		equalCDate(d, gc.newDate(-2, 3, 4), 'Gregorian - add -100 w over year 0');
		d.date(-1, 10, 1).add(100, 'w');
		equalCDate(d, gc.newDate(2, 9, 1), 'Gregorian - add 100 w over year 0');
		d.date(1, 2, 1).add(-105, 'd');
		equalCDate(d, gc.newDate(-1, 10, 19), 'Gregorian - add -105 d into year 0');
		d.date(-1, 10, 1).add(105, 'd');
		equalCDate(d, gc.newDate(1, 1, 14), 'Gregorian - add 105 d into year 0');
		d.date(1, 2, 1).add(-700, 'd');
		equalCDate(d, gc.newDate(-2, 3, 4), 'Gregorian - add -700 d over year 0');
		d.date(-1, 10, 1).add(700, 'd');
		equalCDate(d, gc.newDate(2, 9, 1), 'Gregorian - add 700 d over year 0');
		d.date(1582, 10, 4).add(1, 'd');
		equalCDate(d, gc.newDate(1582, 10, 5), 'Gregorian - add 1 d into Gregorian start');
		d.date(1582, 10, 4).add(1, 'w');
		equalCDate(d, gc.newDate(1582, 10, 11), 'Gregorian - add 1 w into Gregorian start');
		d.date(1582, 11, 6).add(-1, 'm');
		equalCDate(d, gc.newDate(1582, 10, 6), 'Gregorian - add -1 m into Gregorian start');
		d.date(1583, 10, 12).add(-1, 'y');
		equalCDate(d, gc.newDate(1582, 10, 12), 'Gregorian - add -1 y into Gregorian start');
		d.date(1582, 10, 1).add(20, 'd');
		equalCDate(d, gc.newDate(1582, 10, 21), 'Gregorian - add 20 d over Gregorian start');
		d.date(1582, 10, 1).add(3, 'w');
		equalCDate(d, gc.newDate(1582, 10, 22), 'Gregorian - add 3 w over Gregorian start');
		d.date(1582, 11, 6).add(-2, 'm');
		equalCDate(d, gc.newDate(1582, 9, 6), 'Gregorian - add -2 m over Gregorian start');
		d.date(1583, 10, 12).add(-2, 'y');
		equalCDate(d, gc.newDate(1581, 10, 12), 'Gregorian - add -2 y over Gregorian start');
	});

	test('Gregorian compare', function() {
		expect(7);
		var gc = $.calendars.instance('Gregorian');
		var d1 = gc.newDate(2009, 1, 2);
		var d2 = gc.newDate(2009, 1, 5);
		equal(d1.compareTo(d2), -1, 'Gregorian compare - 02/01/2009 - 05/01/2009');
		equal(d2.compareTo(d1), +1, 'Gregorian compare - 05/01/2009 - 02/01/2009');
		equal(d1.compareTo(d1), 0, 'Gregorian compare - 02/01/2009 - 02/01/2009');
		d2 = gc.newDate(2009, 2, 2);
		equal(d1.compareTo(d2), -1, 'Gregorian compare - 02/01/2009 - 02/02/2009');
		equal(d2.compareTo(d1), +1, 'Gregorian compare - 02/02/2009 - 02/01/2009');
		d2 = gc.newDate(2010, 1, 2);
		equal(d1.compareTo(d2), -1, 'Gregorian compare - 02/01/2009 - 02/01/2010');
		equal(d2.compareTo(d1), +1, 'Gregorian compare - 02/01/2010 - 02/01/2009');
	});

	test('Gregorian format', function() {
		expect(14);
		var gc = $.calendars.instance('Gregorian');
		var d = gc.newDate(2001, 2, 3);
		equal(gc.formatDate(d), '02/03/2001', 'Gregorian format - default');
		equal(gc.formatDate('dd/mm/yyyy', d), '03/02/2001', 'Gregorian format - dd/mm/yyyy');
		equal(gc.formatDate('d/m/yy', d), '3/2/01', 'Gregorian format - d/m/yy');
		equal(gc.formatDate('yyyy-mm-dd', d), '2001-02-03', 'Gregorian format - yyyy-mm-dd');
		equal(gc.formatDate('yy-o', d), '01-34', 'Gregorian format - yy-o');
		equal(gc.formatDate('yyyy-oo', d), '2001-034', 'Gregorian format - yyyy-oo');
		equal(gc.formatDate('D, M d, yyyy', d), 'Sat, Feb 3, 2001', 'Gregorian format - D, M d, yyyy');
		equal(gc.formatDate('DD, MM d, yyyy', d), 'Saturday, February 3, 2001',
			'Gregorian format - DD, MM d, yyyy');
		equal(gc.formatDate('\'day\' d \'of\' MM \'in the year\' YYYY', d),
			'day 3 of February in the year 2001',
			'Gregorian format - \'day\' d \'of\' MM \'in the year\' YYYY');
		equal(gc.formatDate('@', d), '981158400', 'Gregorian format - @');
		equal(gc.formatDate('!', d), '631167552000000000', 'Gregorian format - !');
		equal(gc.formatDate('J', d), '2451943.5', 'Gregorian format - J');
		equal(d.formatDate(), '02/03/2001', 'Gregorian date format - default');
		equal(d.formatDate('dd/mm/yyyy'), '03/02/2001', 'Gregorian date format - dd/mm/yyyy');
	});

	test('Gregorian format - localised', function() {
		expect(10);
		var gc = $.calendars.instance('Gregorian', 'gu');
		var local = {localNumbers: true}; // '૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'
		var d = gc.newDate(2001, 2, 3);
		equal(gc.formatDate(d), '03-ફેબ્રુ-2001', 'Gregorian format - default');
		equal(gc.formatDate(d, local), '૦૩-ફેબ્રુ-૨૦૦૧', 'Gregorian format localised - default');
		equal(gc.formatDate('dd/mm/yyyy', d), '03/02/2001', 'Gregorian format - dd/mm/yyyy');
		equal(gc.formatDate('dd/mm/yyyy', d, local), '૦૩/૦૨/૨૦૦૧', 'Gregorian format localised - dd/mm/yyyy');
		equal(gc.formatDate('J', d), '2451943.5', 'Gregorian format - J');
		equal(gc.formatDate('J', d, local), '2451943.5', 'Gregorian format localised - J');
		equal(d.formatDate(), '03-ફેબ્રુ-2001', 'Gregorian date format - default');
		equal(d.formatDate(local), '૦૩-ફેબ્રુ-૨૦૦૧', 'Gregorian date format localised - default');
		equal(d.formatDate('dd/mm/yyyy'), '03/02/2001', 'Gregorian date format - dd/mm/yyyy');
		equal(d.formatDate('dd/mm/yyyy', local), '૦૩/૦૨/૨૦૦૧', 'Gregorian date format localised - dd/mm/yyyy');
	});

	test('Gregorian parse', function() {
		expect(16);
		var gc = $.calendars.instance('Gregorian');
		var d = gc.newDate(2001, 2, 3);
		equal(gc.parseDate('', ''), null, 'Gregorian parse - empty');
		equalCDate(gc.parseDate('', '02/03/2001'), d, 'Gregorian parse - default');
		equalCDate(gc.parseDate('dd/mm/yyyy', '3/2/2001'), d, 'Gregorian parse - dd/mm/yyyy');
		equalCDate(gc.parseDate('dd/mm/yyyy', '03/02/2001'), d, 'Gregorian parse - dd/mm/yyyy');
		equalCDate(gc.parseDate('d/m/yy', '3/2/01'), d, 'Gregorian parse - d/m/yy');
		equalCDate(gc.parseDate('yyyy-mm-dd', '2001-02-03'), d, 'Gregorian parse - yyyy-mm-dd');
		equalCDate(gc.parseDate('yy-o', '01-34'), d, 'Gregorian parse - yy-o');
		equalCDate(gc.parseDate('yyyy-oo', '2001-034'), d, 'Gregorian parse - yyyy-oo');
		equalCDate(gc.parseDate('D, M d, yyyy', 'Sat, Feb 3, 2001'), d,
			'Gregorian parse - D, M d, yyyy');
		equalCDate(gc.parseDate('DD, MM d, yyyy', 'Saturday, February 3, 2001'), d,
			'Gregorian parse - DD, MM d, yyyy');
		equalCDate(gc.parseDate('\'day\' d \'of\' MM \'in the year\' YYYY',
			'day 3 of February in the year 2001'), d,
			'Gregorian parse - \'day\' d \'of\' MM \'in the year\' YYYY');
		equalCDate(gc.parseDate('@', '981158400'), d, 'Gregorian parse - @');
		equalCDate(gc.parseDate('!', '631167552000000000'), d, 'Gregorian parse - !');
		equalCDate(gc.parseDate('J', '2451943.5'), d, 'Gregorian parse - J');
		equalCDate(gc.parseDate('J', 2451943.5), d, 'Gregorian parse - J numeric');
		equalCDate(gc.parseDate('D M dd yyyy*', new Date(2001, 2 - 1, 3).toString()), d,
			'Gregorian parse - JS Date');
	});

	test('Gregorian parse errors', function() {
		expect(18);
		var gc = $.calendars.instance('Gregorian');
		var expectError = function(expr, value, error) {
			try {
				expr();
				ok(false, 'Parsed error ' + value);
			}
			catch (e) {
				equal(e, error, 'Parsed error ' + value);
			}
		};
		expectError(function() { gc.parseDate('d m yy', null); },
			'null', 'Invalid arguments');
		expectError(function() { gc.parseDate(null, 'Sat 2 01'); },
			'Sat 2 01', 'Missing number at position 0');
		expectError(function() { gc.parseDate('dd/mm/yyyy', '01/02/20087'); },
			'01/02/20087', 'Additional text found at end');
		expectError(function() { gc.parseDate('d m yy', 'Sat 2 01'); },
			'Sat 2 01 - d m yy', 'Missing number at position 0');
		expectError(function() { gc.parseDate('dd mm yyyy', 'Sat 2 01'); },
			'Sat 2 01 - dd mm yyyy', 'Missing number at position 0');
		expectError(function() { gc.parseDate('d m yy', '3 Feb 01'); },
			'3 Feb 01 - d m yy', 'Missing number at position 2');
		expectError(function() { gc.parseDate('dd mm yyyy', '3 Feb 01'); },
			'3 Feb 01 - dd mm yyyy', 'Missing number at position 2');
		expectError(function() { gc.parseDate('d m yy', '3 2 AD01'); },
			'3 2 AD01 - d m yy', 'Missing number at position 4');
		expectError(function() { gc.parseDate('d m yyyy', '3 2 AD01'); },
			'3 2 AD01 - dd mm yyyy', 'Missing number at position 4');
		expectError(function() { gc.parseDate('yy-o', '2001-D01'); },
			'2001-D01 - yy-o', 'Unexpected literal at position 2');
		expectError(function() { gc.parseDate('yyyy-oo', '2001-D01'); },
			'2001-D01 - yyyy-oo', 'Missing number at position 5');
		expectError(function() { gc.parseDate('D d M yy', 'D7 3 Feb 01'); },
			'D7 3 Feb 01 - D d M yy', 'Unknown name at position 0');
		expectError(function() { gc.parseDate('D d M yy', 'Sat 3 M2 01'); },
			'Sat 3 M2 01 - D d M yy', 'Unknown name at position 6');
		expectError(function() { gc.parseDate('DD, MM d, yyyy', 'Saturday- Feb 3, 2001'); },
			'Saturday- Feb 3, 2001 - DD, MM d, yyyy', 'Unexpected literal at position 8');
		expectError(function() { gc.parseDate('\'day\' d \'of\' MM (\'\'DD\'\'), yyyy',
			'day 3 of February ("Saturday"), 2001'); },
			'day 3 of Mon2 ("Day7"), 2001', 'Unexpected literal at position 19');
		expectError(function() { gc.parseDate('d m yy', '29 2 01'); },
			'29 2 01 - d m yy', 'Invalid Gregorian date');
		gc = $.calendars.instance('gregorian', 'fr');
		var settings = {dayNamesShort: gc.local.dayNamesShort, dayNames: gc.local.dayNames,
			monthNamesShort: gc.local.monthNamesShort, monthNames: gc.local.monthNames};
		expectError(function() { gc.parseDate('D d M yy', 'Mon 9 Avr 01', settings); },
			'Mon 9 Avr 01 - D d M yy', 'Unknown name at position 0');
		expectError(function() { gc.parseDate('D d M yy', 'Lun 9 Apr 01', settings); },
			'Lun 9 Apr 01 - D d M yy', 'Unknown name at position 6');
	});

	test('Gregorian localisations', function() {
		expect(10);
		var gc = $.calendars.instance('Gregorian');
		equal(gc.local.monthNames[0], 'January', 'Gregorian default - month 1');
		var gc_fr = $.calendars.instance('Gregorian', 'fr');
		equal(gc_fr.local.monthNames[0], 'Janvier', 'Gregorian French - month 1');
		var d = gc_fr.newDate(2001, 2, 3);
		equal(d.formatDate(), '03/02/2001', 'Gregorian French - format default');
		equal(d.formatDate('yyyy-mm-dd'), '2001-02-03', 'Gregorian French - format yyyy-mm-dd');
		equal(d.formatDate('D, M d, yyyy'), 'Sam, Fév 3, 2001',
			'Gregorian French - format D, M d, yyyy');
		equal(d.formatDate('DD, MM d, yyyy'), 'Samedi, Février 3, 2001',
			'Gregorian French - format DD, MM d, yyyy');
		equalCDate(gc_fr.parseDate('', '03/02/2001'), d, 'Gregorian French - parse default');
		equalCDate(gc_fr.parseDate('yyyy-mm-dd', '2001-02-03'), d,
			'Gregorian French - parse yyyy-mm-dd');
		equalCDate(gc_fr.parseDate('D, M d, yyyy', 'Sam, Fév 3, 2001'), d,
			'Gregorian French - parse D, M d, yyyy');
		equalCDate(gc_fr.parseDate('DD, MM d, yyyy', 'Samedi, Février 3, 2001'), d,
			'Gregorian French - parse DD, MM d, yyyy');
	});

	module('Taiwan');

	test('Taiwan calendar', function() {
		expect(54);
		var tc = $.calendars.instance('Taiwan');
		equal(tc.monthsInYear(-11), 12, 'Taiwan - months in year -11');
		equal(tc.monthsInYear(85), 12, 'Taiwan - months in year 85');
		equal(tc.monthsInYear(88), 12, 'Taiwan - months in year 88');
		equal(tc.monthsInYear(89), 12, 'Taiwan - months in year 89');
		equal(tc.monthsInYear(90), 12, 'Taiwan - months in year 90');
		equal(tc.leapYear(-11), false, 'Taiwan - leap year -11');
		equal(tc.leapYear(85), true, 'Taiwan - leap year 85');
		equal(tc.leapYear(88), false, 'Taiwan - leap year 88');
		equal(tc.leapYear(89), true, 'Taiwan - leap year 89');
		equal(tc.leapYear(90), false, 'Taiwan - leap year 90');
		equal(tc.daysInYear(-11), 365, 'Taiwan - days in year -11');
		equal(tc.daysInYear(85), 366, 'Taiwan - days in year 85');
		equal(tc.daysInYear(88), 365, 'Taiwan - days in year 88');
		equal(tc.daysInYear(89), 366, 'Taiwan - days in year 89');
		equal(tc.daysInYear(90), 365, 'Taiwan - days in year 90');
		equal(tc.daysInMonth(90, 1), 31, 'Taiwan - days in month Jan 90');
		equal(tc.daysInMonth(90, 2), 28, 'Taiwan - days in month Feb 90');
		equal(tc.daysInMonth(90, 3), 31, 'Taiwan - days in month Mar 90');
		equal(tc.daysInMonth(90, 4), 30, 'Taiwan - days in month Apr 90');
		equal(tc.daysInMonth(90, 5), 31, 'Taiwan - days in month May 90');
		equal(tc.daysInMonth(90, 6), 30, 'Taiwan - days in month Jun 90');
		equal(tc.daysInMonth(90, 7), 31, 'Taiwan - days in month Jul 90');
		equal(tc.daysInMonth(90, 8), 31, 'Taiwan - days in month Aug 90');
		equal(tc.daysInMonth(90, 9), 30, 'Taiwan - days in month Sep 90');
		equal(tc.daysInMonth(90, 10), 31, 'Taiwan - days in month Oct 90');
		equal(tc.daysInMonth(90, 11), 30, 'Taiwan - days in month Nov 90');
		equal(tc.daysInMonth(90, 12), 31, 'Taiwan - days in month Dec 90');
		equal(tc.daysInMonth(93, 1), 31, 'Taiwan - days in month Jan 93');
		equal(tc.daysInMonth(93, 2), 29, 'Taiwan - days in month Feb 93');
		equal(tc.daysInMonth(93, 3), 31, 'Taiwan - days in month Mar 93');
		equal(tc.daysInMonth(93, 4), 30, 'Taiwan - days in month Apr 93');
		equal(tc.daysInMonth(93, 5), 31, 'Taiwan - days in month May 93');
		equal(tc.daysInMonth(93, 6), 30, 'Taiwan - days in month Jun 93');
		equal(tc.daysInMonth(93, 7), 31, 'Taiwan - days in month Jul 93');
		equal(tc.daysInMonth(93, 8), 31, 'Taiwan - days in month Aug 93');
		equal(tc.daysInMonth(93, 9), 30, 'Taiwan - days in month Sep 93');
		equal(tc.daysInMonth(93, 10), 31, 'Taiwan - days in month Oct 93');
		equal(tc.daysInMonth(93, 11), 30, 'Taiwan - days in month Nov 93');
		equal(tc.daysInMonth(93, 12), 31, 'Taiwan - days in month Dec 93');
		equal(tc.daysInWeek(), 7, 'Taiwan - days in week');
		equal(tc.epoch(2000), 'ROC', 'Taiwan - epoch 2000');
		equal(tc.epoch(-2000), 'BROC', 'Taiwan - epoch -2000');
		var date = tc.newDate(89, 12, 31);
		equal(tc.weekOfYear(date), 52, 'Taiwan - week ' + date);
		date = tc.newDate(90, 1, 1);
		equal(tc.weekOfYear(date), 1, 'Taiwan - week ' + date);
		date = tc.newDate(90, 1, 7);
		equal(tc.weekOfYear(date), 1, 'Taiwan - week ' + date);
		date = tc.newDate(90, 1, 8);
		equal(tc.weekOfYear(date), 2, 'Taiwan - week ' + date);
		date = tc.newDate(92, 12, 28);
		equal(tc.weekOfYear(date), 52, 'Taiwan - week ' + date);
		date = tc.newDate(92, 12, 29);
		equal(tc.weekOfYear(date), 1, 'Taiwan - week ' + date);
		date = tc.newDate(93, 1, 4);
		equal(tc.weekOfYear(date), 1, 'Taiwan - week ' + date);
		date = tc.newDate(93, 1, 5);
		equal(tc.weekOfYear(date), 2, 'Taiwan - week ' + date);
		date = tc.newDate(98, 12, 28);
		equal(tc.weekOfYear(date), 53, 'Taiwan - week ' + date);
		date = tc.newDate(99, 1, 3);
		equal(tc.weekOfYear(date), 53, 'Taiwan - week ' + date);
		date = tc.newDate(99, 1, 4);
		equal(tc.weekOfYear(date), 1, 'Taiwan - week ' + date);
		date = tc.newDate(99, 1, 10);
		equal(tc.weekOfYear(date), 1, 'Taiwan - week ' + date);
	});

	test('Taiwan vs Julian Date', function() {
		expect(34);
		var tc = $.calendars.instance('Taiwan');
		var years = [[-2011, -100], [-1912, -1], [-1911, 1], [-1, 1911], [1, 1912], [99, 2010]];
		for (var i = 0; i < years.length; i++) {
			equal(tc._t2gYear(years[i][0]), years[i][1], 'Taiwan - T2G ' + years[i][0]);
			equal(tc._g2tYear(years[i][1]), years[i][0], 'Taiwan - G2T ' + years[i][1]);
		}
		var tests = [[-5911, 1, 1, 260455.5], [-4911, 1, 1, 625697.5],
			[-3911, 1, 1, 990940.5], [-2911, 1, 1, 1356182.5],
			[-1912, 12, 31, 1721424.5],
			[-1911, 1, 1, 1721425.5], [-911, 1, 1, 2086667.5],
			[-1, 12, 31, 2419401.5], [1, 1, 1, 2419402.5],
			[98, 1, 1, 2454832.5], [100, 1, 1, 2455562.5]];
		for (var i = 0; i < tests.length; i++) {
			date = tc.newDate(tests[i][0], tests[i][1], tests[i][2]);
			equal(date.toJD(), tests[i][3], 'Taiwan - to Julian ' + date);
			equalCDate(tc.fromJD(tests[i][3]), date, 'Taiwan - from Julian ' + date);
		}
	});

	test('Taiwan days', function() {
		expect(30);
		var tc = $.calendars.instance('Taiwan');
		var d = tc.newDate(98, 1, 2);
		equal(d.year(), 98, 'Taiwan - year');
		equal(d.month(), 1, 'Taiwan - month');
		equal(d.day(), 2, 'Taiwan - day');
		equal(d.leapYear(), false, 'Taiwan - leap year');
		equal(d.formatYear(), '0098', 'Taiwan - format year');
		equal(d.dayOfWeek(), 5, 'Taiwan - day of week');
		equal(d.weekDay(), true, 'Taiwan - week day');
		equal(d.dayOfYear(), 2, 'Taiwan - day of year');
		equal(d.toJD(), 2454833.5, 'Taiwan - Taiwan date');
		equalDate(d.toJSDate(), new Date(2009, 1 - 1, 2), 'Taiwan - JS Date');
		d.date(93, 2, 29);
		equal(d.year(), 93, 'Taiwan - year');
		equal(d.month(), 2, 'Taiwan - month');
		equal(d.day(), 29, 'Taiwan - day');
		equal(d.leapYear(), true, 'Taiwan - leap year');
		equal(d.formatYear(), '0093', 'Taiwan - format year');
		equal(d.dayOfWeek(), 0, 'Taiwan - day of week');
		equal(d.weekDay(), false, 'Taiwan - week day');
		equal(d.dayOfYear(), 60, 'Taiwan - day of year');
		equal(d.toJD(), 2453064.5, 'Taiwan - Taiwan date');
		equalDate(d.toJSDate(), new Date(2004, 2 - 1, 29), 'Taiwan - JS Date');
		equal(tc.isValid(90, 2, 28), true, 'Taiwan - valid 28/02/0090');
		equal(tc.isValid(90, 2, 29), false, 'Taiwan - valid 29/02/0090');
		equal(tc.isValid(89, 2, 28), true, 'Taiwan - valid 28/02/0089');
		equal(tc.isValid(89, 2, 29), true, 'Taiwan - valid 29/02/0089');
		equal(tc.isValid(-1, 2, 28), true, 'Taiwan - valid 28/02/-0001');
		equal(tc.isValid(0, 2, 28), false, 'Taiwan - valid 28/02/0000');
		equal(tc.isValid(89, -1, 28), false, 'Taiwan - valid 28/-1/0089');
		equal(tc.isValid(89, 14, 28), false, 'Taiwan - valid 28/14/0089');
		equal(tc.isValid(89, 2, -1), false, 'Taiwan - valid -1/02/0089');
		equal(tc.isValid(89, 2, 88), false, 'Taiwan - valid 88/02/0089');
	});

	test('Taiwan add', function() {
		expect(28);
		var tc = $.calendars.instance('Taiwan');
		var d = tc.newDate(98, 1, 2);
		d.add(1, 'y');
		equalCDate(d, tc.newDate(99, 1, 2), 'Taiwan - add 1 y');
		d.add(-2, 'y');
		equalCDate(d, tc.newDate(97, 1, 2), 'Taiwan - add -2 y');
		d.add(1, 'm');
		equalCDate(d, tc.newDate(97, 2, 2), 'Taiwan - add 1 m');
		d.add(-2, 'm');
		equalCDate(d, tc.newDate(96, 12, 2), 'Taiwan - add -2 m');
		d.add(1, 'w');
		equalCDate(d, tc.newDate(96, 12, 9), 'Taiwan - add 1 w');
		d.add(-2, 'w');
		equalCDate(d, tc.newDate(96, 11, 25), 'Taiwan - add -2 w');
		d.add(1, 'd');
		equalCDate(d, tc.newDate(96, 11, 26), 'Taiwan - add 1 d');
		d.add(-2, 'd');
		equalCDate(d, tc.newDate(96, 11, 24), 'Taiwan - add -2 d');
		d.add(1, 'd').add(1, 'w').add(1, 'm').add(1, 'y');
		equalCDate(d, tc.newDate(98, 1, 2), 'Taiwan - add 1 d, 1 w, 1 m, 1 y');
		d.date(97, 2, 20).add(2, 'w');
		equalCDate(d, tc.newDate(97, 3, 5), 'Taiwan - add 2 w over leap day');
		d.date(97, 1, 31).add(1, 'm');
		equalCDate(d, tc.newDate(97, 2, 29), 'Taiwan - add 1 m for leap day');
		d.date(97, 2, 29).add(1, 'y');
		equalCDate(d, tc.newDate(98, 2, 28), 'Taiwan - add 1 y to leap day');
		d.date(2, 2, 1).add(-2, 'y');
		equalCDate(d, tc.newDate(-1, 2, 1), 'Taiwan - add -2 y into year 0');
		d.date(-2, 2, 1).add(2, 'y');
		equalCDate(d, tc.newDate(1, 2, 1), 'Taiwan - add 2 y into year 0');
		d.date(2, 2, 1).add(-4, 'y');
		equalCDate(d, tc.newDate(-3, 2, 1), 'Taiwan - add -4 y over year 0');
		d.date(-2, 2, 1).add(4, 'y');
		equalCDate(d, tc.newDate(3, 2, 1), 'Taiwan - add 4 y over year 0');
		d.date(1, 2, 1).add(-6, 'm');
		equalCDate(d, tc.newDate(-1, 8, 1), 'Taiwan - add -6 m into year 0');
		d.date(-1, 10, 1).add(6, 'm');
		equalCDate(d, tc.newDate(1, 4, 1), 'Taiwan - add 6 m into year 0');
		d.date(1, 2, 1).add(-26, 'm');
		equalCDate(d, tc.newDate(-3, 12, 1), 'Taiwan - add -26 m over year 0');
		d.date(-1, 10, 1).add(26, 'm');
		equalCDate(d, tc.newDate(2, 12, 1), 'Taiwan - add 26 m over year 0');
		d.date(1, 2, 1).add(-15, 'w');
		equalCDate(d, tc.newDate(-1, 10, 19), 'Taiwan - add -15 w into year 0');
		d.date(-1, 10, 1).add(15, 'w');
		equalCDate(d, tc.newDate(1, 1, 14), 'Taiwan - add 15 w into year 0');
		d.date(1, 2, 1).add(-100, 'w');
		equalCDate(d, tc.newDate(-2, 3, 3), 'Taiwan - add -100 w over year 0');
		d.date(-1, 10, 1).add(100, 'w');
		equalCDate(d, tc.newDate(2, 8, 31), 'Taiwan - add 100 w over year 0');
		d.date(1, 2, 1).add(-105, 'd');
		equalCDate(d, tc.newDate(-1, 10, 19), 'Taiwan - add -105 d into year 0');
		d.date(-1, 10, 1).add(105, 'd');
		equalCDate(d, tc.newDate(1, 1, 14), 'Taiwan - add 105 d into year 0');
		d.date(1, 2, 1).add(-700, 'd');
		equalCDate(d, tc.newDate(-2, 3, 3), 'Taiwan - add -700 d over year 0');
		d.date(-1, 10, 1).add(700, 'd');
		equalCDate(d, tc.newDate(2, 8, 31), 'Taiwan - add 700 d over year 0');
	});

	test('Taiwan compare', function() {
		expect(7);
		var tc = $.calendars.instance('Taiwan');
		var d1 = tc.newDate(95, 1, 2);
		var d2 = tc.newDate(95, 1, 5);
		equal(d1.compareTo(d2), -1, 'Taiwan compare - 02/01/95 - 05/01/95');
		equal(d2.compareTo(d1), +1, 'Taiwan compare - 05/01/95 - 02/01/95');
		equal(d1.compareTo(d1), 0, 'Taiwan compare - 02/01/95 - 02/01/95');
		d2 = tc.newDate(95, 2, 2);
		equal(d1.compareTo(d2), -1, 'Taiwan compare - 02/01/95 - 02/02/95');
		equal(d2.compareTo(d1), +1, 'Taiwan compare - 02/02/95 - 02/01/95');
		d2 = tc.newDate(96, 1, 2);
		equal(d1.compareTo(d2), -1, 'Taiwan compare - 02/01/95 - 02/01/96');
		equal(d2.compareTo(d1), +1, 'Taiwan compare - 02/01/96 - 02/01/95');
	});

	module('Thai');

	test('Thai calendar', function() {
		expect(54);
		var tc = $.calendars.instance('Thai');
		equal(tc.monthsInYear(2443), 12, 'Thai - months in year 2443');
		equal(tc.monthsInYear(2539), 12, 'Thai - months in year 2539');
		equal(tc.monthsInYear(2542), 12, 'Thai - months in year 2542');
		equal(tc.monthsInYear(2543), 12, 'Thai - months in year 2543');
		equal(tc.monthsInYear(2544), 12, 'Thai - months in year 2544');
		equal(tc.leapYear(2443), false, 'Thai - leap year 2443');
		equal(tc.leapYear(2539), true, 'Thai - leap year 2539');
		equal(tc.leapYear(2542), false, 'Thai - leap year 2542');
		equal(tc.leapYear(2543), true, 'Thai - leap year 2543');
		equal(tc.leapYear(2544), false, 'Thai - leap year 2544');
		equal(tc.daysInYear(2443), 365, 'Thai - days in year 2443');
		equal(tc.daysInYear(2539), 366, 'Thai - days in year 2539');
		equal(tc.daysInYear(2542), 365, 'Thai - days in year 2542');
		equal(tc.daysInYear(2543), 366, 'Thai - days in year 2543');
		equal(tc.daysInYear(2544), 365, 'Thai - days in year 2544');
		equal(tc.daysInMonth(2544, 1), 31, 'Thai - days in month Jan 2544');
		equal(tc.daysInMonth(2544, 2), 28, 'Thai - days in month Feb 2544');
		equal(tc.daysInMonth(2544, 3), 31, 'Thai - days in month Mar 2544');
		equal(tc.daysInMonth(2544, 4), 30, 'Thai - days in month Apr 2544');
		equal(tc.daysInMonth(2544, 5), 31, 'Thai - days in month May 2544');
		equal(tc.daysInMonth(2544, 6), 30, 'Thai - days in month Jun 2544');
		equal(tc.daysInMonth(2544, 7), 31, 'Thai - days in month Jul 2544');
		equal(tc.daysInMonth(2544, 8), 31, 'Thai - days in month Aug 2544');
		equal(tc.daysInMonth(2544, 9), 30, 'Thai - days in month Sep 2544');
		equal(tc.daysInMonth(2544, 10), 31, 'Thai - days in month Oct 2544');
		equal(tc.daysInMonth(2544, 11), 30, 'Thai - days in month Nov 2544');
		equal(tc.daysInMonth(2544, 12), 31, 'Thai - days in month Dec 2544');
		equal(tc.daysInMonth(2547, 1), 31, 'Thai - days in month Jan 2547');
		equal(tc.daysInMonth(2547, 2), 29, 'Thai - days in month Feb 2547');
		equal(tc.daysInMonth(2547, 3), 31, 'Thai - days in month Mar 2547');
		equal(tc.daysInMonth(2547, 4), 30, 'Thai - days in month Apr 2547');
		equal(tc.daysInMonth(2547, 5), 31, 'Thai - days in month May 2547');
		equal(tc.daysInMonth(2547, 6), 30, 'Thai - days in month Jun 2547');
		equal(tc.daysInMonth(2547, 7), 31, 'Thai - days in month Jul 2547');
		equal(tc.daysInMonth(2547, 8), 31, 'Thai - days in month Aug 2547');
		equal(tc.daysInMonth(2547, 9), 30, 'Thai - days in month Sep 2547');
		equal(tc.daysInMonth(2547, 10), 31, 'Thai - days in month Oct 2547');
		equal(tc.daysInMonth(2547, 11), 30, 'Thai - days in month Nov 2547');
		equal(tc.daysInMonth(2547, 12), 31, 'Thai - days in month Dec 2547');
		equal(tc.daysInWeek(), 7, 'Thai - days in week');
		equal(tc.epoch(2000), 'BE', 'Thai - epoch 2000');
		equal(tc.epoch(-2000), 'BBE', 'Thai - epoch -2000');
		var date = tc.newDate(2543, 12, 31);
		equal(tc.weekOfYear(date), 52, 'Thai - week ' + date);
		date = tc.newDate(2544, 1, 1);
		equal(tc.weekOfYear(date), 1, 'Thai - week ' + date);
		date = tc.newDate(2544, 1, 7);
		equal(tc.weekOfYear(date), 1, 'Thai - week ' + date);
		date = tc.newDate(2544, 1, 8);
		equal(tc.weekOfYear(date), 2, 'Thai - week ' + date);
		date = tc.newDate(2546, 12, 28);
		equal(tc.weekOfYear(date), 52, 'Thai - week ' + date);
		date = tc.newDate(2546, 12, 29);
		equal(tc.weekOfYear(date), 1, 'Thai - week ' + date);
		date = tc.newDate(2547, 1, 4);
		equal(tc.weekOfYear(date), 1, 'Thai - week ' + date);
		date = tc.newDate(2547, 1, 5);
		equal(tc.weekOfYear(date), 2, 'Thai - week ' + date);
		date = tc.newDate(2552, 12, 28);
		equal(tc.weekOfYear(date), 53, 'Thai - week ' + date);
		date = tc.newDate(2553, 1, 3);
		equal(tc.weekOfYear(date), 53, 'Thai - week ' + date);
		date = tc.newDate(2553, 1, 4);
		equal(tc.weekOfYear(date), 1, 'Thai - week ' + date);
		date = tc.newDate(2553, 1, 10);
		equal(tc.weekOfYear(date), 1, 'Thai - week ' + date);
	});

	test('Thai vs Julian Date', function() {
		expect(44);
		var tc = $.calendars.instance('Thai');
		var years = [[-1000, -1543], [-1, -544], [1, -543], [543, -1], [544, 1], [2553, 2010]];
		for (var i = 0; i < years.length; i++) {
			equal(tc._t2gYear(years[i][0]), years[i][1], 'Thai - T2G ' + years[i][0]);
			equal(tc._g2tYear(years[i][1]), years[i][0], 'Thai - G2T ' + years[i][1]);
		}
		var tests = [[-4170, 1, 1, 37.5], [-4000, 1, 1, 62128.5],
			[-3500, 1, 1, 244749.5], [-3000, 1, 1, 427371.5],
			[-2500, 1, 1, 609992.5], [-2000, 1, 1, 792613.5],
			[-1500, 1, 1, 975234.5], [-1000, 1, 1, 1157856.5],
			[-500, 1, 1, 1340477.5], [-1, 12, 31, 1523097.5],
			[1, 1, 1, 1523098.5], [500, 1, 1, 1705354.5],
			[1000, 1, 1, 1887976.5], [1500, 1, 1, 2070597.5],
			[2000, 1, 1, 2253218.5], [2552, 2, 1, 2454863.5]];
		for (var i = 0; i < tests.length; i++) {
			date = tc.newDate(tests[i][0], tests[i][1], tests[i][2]);
			equal(date.toJD(), tests[i][3], 'Thai - to Julian ' + date);
			equalCDate(tc.fromJD(tests[i][3]), date, 'Thai - from Julian ' + date);
		}
	});

	test('Thai days', function() {
		expect(30);
		var tc = $.calendars.instance('Thai');
		var d = tc.newDate(2552, 1, 2);
		equal(d.year(), 2552, 'Thai - year');
		equal(d.month(), 1, 'Thai - month');
		equal(d.day(), 2, 'Thai - day');
		equal(d.leapYear(), false, 'Thai - leap year');
		equal(d.formatYear(), '2552', 'Thai - format year');
		equal(d.dayOfWeek(), 5, 'Thai - day of week');
		equal(d.weekDay(), true, 'Thai - week day');
		equal(d.dayOfYear(), 2, 'Thai - day of year');
		equal(d.toJD(), 2454833.5, 'Thai - Thai date');
		equalDate(d.toJSDate(), new Date(2009, 1 - 1, 2), 'Thai - JS Date');
		d.date(2547, 2, 29);
		equal(d.year(), 2547, 'Thai - year');
		equal(d.month(), 2, 'Thai - month');
		equal(d.day(), 29, 'Thai - day');
		equal(d.leapYear(), true, 'Thai - leap year');
		equal(d.formatYear(), '2547', 'Thai - format year');
		equal(d.dayOfWeek(), 0, 'Thai - day of week');
		equal(d.weekDay(), false, 'Thai - week day');
		equal(d.dayOfYear(), 60, 'Thai - day of year');
		equal(d.toJD(), 2453064.5, 'Thai - Thai date');
		equalDate(d.toJSDate(), new Date(2004, 2 - 1, 29), 'Thai - JS Date');
		equal(tc.isValid(2544, 2, 28), true, 'Thai - valid 28/02/2544');
		equal(tc.isValid(2544, 2, 29), false, 'Thai - valid 29/02/2544');
		equal(tc.isValid(2543, 2, 28), true, 'Thai - valid 28/02/2543');
		equal(tc.isValid(2543, 2, 29), true, 'Thai - valid 29/02/2543');
		equal(tc.isValid(-1, 2, 28), true, 'Thai - valid 28/02/-0001');
		equal(tc.isValid(0, 2, 28), false, 'Thai - valid 28/02/0000');
		equal(tc.isValid(2543, -1, 28), false, 'Thai - valid 28/-1/2543');
		equal(tc.isValid(2543, 14, 28), false, 'Thai - valid 28/14/2543');
		equal(tc.isValid(2543, 2, -1), false, 'Thai - valid -1/02/2543');
		equal(tc.isValid(2543, 2, 88), false, 'Thai - valid 88/02/2543');
	});

	test('Thai add', function() {
		expect(28);
		var tc = $.calendars.instance('Thai');
		var d = tc.newDate(2552, 1, 2);
		d.add(1, 'y');
		equalCDate(d, tc.newDate(2553, 1, 2), 'Thai - add 1 y');
		d.add(-2, 'y');
		equalCDate(d, tc.newDate(2551, 1, 2), 'Thai - add -2 y');
		d.add(1, 'm');
		equalCDate(d, tc.newDate(2551, 2, 2), 'Thai - add 1 m');
		d.add(-2, 'm');
		equalCDate(d, tc.newDate(2550, 12, 2), 'Thai - add -2 m');
		d.add(1, 'w');
		equalCDate(d, tc.newDate(2550, 12, 9), 'Thai - add 1 w');
		d.add(-2, 'w');
		equalCDate(d, tc.newDate(2550, 11, 25), 'Thai - add -2 w');
		d.add(1, 'd');
		equalCDate(d, tc.newDate(2550, 11, 26), 'Thai - add 1 d');
		d.add(-2, 'd');
		equalCDate(d, tc.newDate(2550, 11, 24), 'Thai - add -2 d');
		d.add(1, 'd').add(1, 'w').add(1, 'm').add(1, 'y');
		equalCDate(d, tc.newDate(2552, 1, 2), 'Thai - add 1 d, 1 w, 1 m, 1 y');
		d.date(2551, 2, 20).add(2, 'w');
		equalCDate(d, tc.newDate(2551, 3, 5), 'Thai - add 2 w over leap day');
		d.date(2551, 1, 31).add(1, 'm');
		equalCDate(d, tc.newDate(2551, 2, 29), 'Thai - add 1 m for leap day');
		d.date(2551, 2, 29).add(1, 'y');
		equalCDate(d, tc.newDate(2552, 2, 28), 'Thai - add 1 y to leap day');
		d.date(2, 2, 1).add(-2, 'y');
		equalCDate(d, tc.newDate(-1, 2, 1), 'Thai - add -2 y into year 0');
		d.date(-2, 2, 1).add(2, 'y');
		equalCDate(d, tc.newDate(1, 2, 1), 'Thai - add 2 y into year 0');
		d.date(2, 2, 1).add(-4, 'y');
		equalCDate(d, tc.newDate(-3, 2, 1), 'Thai - add -4 y over year 0');
		d.date(-2, 2, 1).add(4, 'y');
		equalCDate(d, tc.newDate(3, 2, 1), 'Thai - add 4 y over year 0');
		d.date(1, 2, 1).add(-6, 'm');
		equalCDate(d, tc.newDate(-1, 8, 1), 'Thai - add -6 m into year 0');
		d.date(-1, 10, 1).add(6, 'm');
		equalCDate(d, tc.newDate(1, 4, 1), 'Thai - add 6 m into year 0');
		d.date(1, 2, 1).add(-26, 'm');
		equalCDate(d, tc.newDate(-3, 12, 1), 'Thai - add -26 m over year 0');
		d.date(-1, 10, 1).add(26, 'm');
		equalCDate(d, tc.newDate(2, 12, 1), 'Thai - add 26 m over year 0');
		d.date(1, 2, 1).add(-15, 'w');
		equalCDate(d, tc.newDate(-1, 10, 19), 'Thai - add -15 w into year 0');
		d.date(-1, 10, 1).add(15, 'w');
		equalCDate(d, tc.newDate(1, 1, 14), 'Thai - add 15 w into year 0');
		d.date(1, 2, 1).add(-100, 'w');
		equalCDate(d, tc.newDate(-2, 3, 3), 'Thai - add -100 w over year 0');
		d.date(-1, 10, 1).add(100, 'w');
		equalCDate(d, tc.newDate(2, 9, 1), 'Thai - add 100 w over year 0');
		d.date(1, 2, 1).add(-105, 'd');
		equalCDate(d, tc.newDate(-1, 10, 19), 'Thai - add -105 d into year 0');
		d.date(-1, 10, 1).add(105, 'd');
		equalCDate(d, tc.newDate(1, 1, 14), 'Thai - add 105 d into year 0');
		d.date(1, 2, 1).add(-700, 'd');
		equalCDate(d, tc.newDate(-2, 3, 3), 'Thai - add -700 d over year 0');
		d.date(-1, 10, 1).add(700, 'd');
		equalCDate(d, tc.newDate(2, 9, 1), 'Thai - add 700 d over year 0');
	});

	test('Thai compare', function() {
		expect(7);
		var tc = $.calendars.instance('Thai');
		var d1 = tc.newDate(2549, 1, 2);
		var d2 = tc.newDate(2549, 1, 5);
		equal(d1.compareTo(d2), -1, 'Thai compare - 02/01/2549 - 05/01/2549');
		equal(d2.compareTo(d1), +1, 'Thai compare - 05/01/2549 - 02/01/2549');
		equal(d1.compareTo(d1), 0, 'Thai compare - 02/01/2549 - 02/01/2549');
		d2 = tc.newDate(2549, 2, 2);
		equal(d1.compareTo(d2), -1, 'Thai compare - 02/01/2549 - 02/02/2549');
		equal(d2.compareTo(d1), +1, 'Thai compare - 02/02/2549 - 02/01/2549');
		d2 = tc.newDate(2550, 1, 2);
		equal(d1.compareTo(d2), -1, 'Thai compare - 02/01/2549 - 02/01/2550');
		equal(d2.compareTo(d1), +1, 'Thai compare - 02/01/2550 - 02/01/2549');
	});

	module('Julian');

	test('Julian calendar', function() {
		expect(54);
		var jc = $.calendars.instance('Julian');
		equal(jc.monthsInYear(1900), 12, 'Julian - months in year 1900');
		equal(jc.monthsInYear(1996), 12, 'Julian - months in year 1996');
		equal(jc.monthsInYear(1999), 12, 'Julian - months in year 1999');
		equal(jc.monthsInYear(2000), 12, 'Julian - months in year 2000');
		equal(jc.monthsInYear(2001), 12, 'Julian - months in year 2001');
		equal(jc.leapYear(1900), true, 'Julian - leap year 1900');
		equal(jc.leapYear(1996), true, 'Julian - leap year 1996');
		equal(jc.leapYear(1999), false, 'Julian - leap year 1999');
		equal(jc.leapYear(2000), true, 'Julian - leap year 2000');
		equal(jc.leapYear(2001), false, 'Julian - leap year 2001');
		equal(jc.daysInYear(1900), 366, 'Julian - days in year 1900');
		equal(jc.daysInYear(1996), 366, 'Julian - days in year 1996');
		equal(jc.daysInYear(1999), 365, 'Julian - days in year 1999');
		equal(jc.daysInYear(2000), 366, 'Julian - days in year 2000');
		equal(jc.daysInYear(2001), 365, 'Julian - days in year 2001');
		equal(jc.daysInMonth(2001, 1), 31, 'Julian - days in month Jan 2001');
		equal(jc.daysInMonth(2001, 2), 28, 'Julian - days in month Feb 2001');
		equal(jc.daysInMonth(2001, 3), 31, 'Julian - days in month Mar 2001');
		equal(jc.daysInMonth(2001, 4), 30, 'Julian - days in month Apr 2001');
		equal(jc.daysInMonth(2001, 5), 31, 'Julian - days in month May 2001');
		equal(jc.daysInMonth(2001, 6), 30, 'Julian - days in month Jun 2001');
		equal(jc.daysInMonth(2001, 7), 31, 'Julian - days in month Jul 2001');
		equal(jc.daysInMonth(2001, 8), 31, 'Julian - days in month Aug 2001');
		equal(jc.daysInMonth(2001, 9), 30, 'Julian - days in month Sep 2001');
		equal(jc.daysInMonth(2001, 10), 31, 'Julian - days in month Oct 2001');
		equal(jc.daysInMonth(2001, 11), 30, 'Julian - days in month Nov 2001');
		equal(jc.daysInMonth(2001, 12), 31, 'Julian - days in month Dec 2001');
		equal(jc.daysInMonth(2004, 1), 31, 'Julian - days in month Jan 2004');
		equal(jc.daysInMonth(2004, 2), 29, 'Julian - days in month Feb 2004');
		equal(jc.daysInMonth(2004, 3), 31, 'Julian - days in month Mar 2004');
		equal(jc.daysInMonth(2004, 4), 30, 'Julian - days in month Apr 2004');
		equal(jc.daysInMonth(2004, 5), 31, 'Julian - days in month May 2004');
		equal(jc.daysInMonth(2004, 6), 30, 'Julian - days in month Jun 2004');
		equal(jc.daysInMonth(2004, 7), 31, 'Julian - days in month Jul 2004');
		equal(jc.daysInMonth(2004, 8), 31, 'Julian - days in month Aug 2004');
		equal(jc.daysInMonth(2004, 9), 30, 'Julian - days in month Sep 2004');
		equal(jc.daysInMonth(2004, 10), 31, 'Julian - days in month Oct 2004');
		equal(jc.daysInMonth(2004, 11), 30, 'Julian - days in month Nov 2004');
		equal(jc.daysInMonth(2004, 12), 31, 'Julian - days in month Dec 2004');
		equal(jc.daysInWeek(), 7, 'Julian - days in week');
		equal(jc.epoch(2000), 'AD', 'Julian - epoch 2000');
		equal(jc.epoch(-2000), 'BC', 'Julian - epoch -2000');
		var date = jc.newDate(2000, 12, 31);
		equal(jc.weekOfYear(date), 52, 'Julian - week ' + date);
		date = jc.newDate(2001, 1, 1);
		equal(jc.weekOfYear(date), 52, 'Julian - week ' + date);
		date = jc.newDate(2001, 1, 2);
		equal(jc.weekOfYear(date), 1, 'Julian - week ' + date);
		date = jc.newDate(2001, 1, 8);
		equal(jc.weekOfYear(date), 1, 'Julian - week ' + date);
		date = jc.newDate(2003, 12, 29);
		equal(jc.weekOfYear(date), 52, 'Julian - week ' + date);
		date = jc.newDate(2003, 12, 30);
		equal(jc.weekOfYear(date), 1, 'Julian - week ' + date);
		date = jc.newDate(2004, 1, 5);
		equal(jc.weekOfYear(date), 1, 'Julian - week ' + date);
		date = jc.newDate(2004, 1, 6);
		equal(jc.weekOfYear(date), 2, 'Julian - week ' + date);
		date = jc.newDate(2009, 12, 28);
		equal(jc.weekOfYear(date), 52, 'Julian - week ' + date);
		date = jc.newDate(2009, 12, 29);
		equal(jc.weekOfYear(date), 1, 'Julian - week ' + date);
		date = jc.newDate(2010, 1, 4);
		equal(jc.weekOfYear(date), 1, 'Julian - week ' + date);
		date = jc.newDate(2010, 1, 5);
		equal(jc.weekOfYear(date), 2, 'Julian - week ' + date);
	});

	test('Julian vs Julian Date', function() {
		expect(42);
		var jc = $.calendars.instance('Julian');
		var tests = [[-4713, 1, 1, -0.5], [-4000, 1, 1, 260423.5],
			[-3500, 1, 1, 443048.5], [-3000, 1, 1, 625673.5],
			[-2500, 1, 1, 808298.5], [-2000, 1, 1, 990923.5],
			[-1500, 1, 1, 1173548.5], [-1000, 1, 1, 1356173.5],
			[-500, 1, 1, 1538798.5], [-1, 12, 31, 1721422.5],
			[1, 1, 1, 1721423.5], [500, 1, 1, 1903682.5],
			[1000, 1, 1, 2086307.5], [1500, 1, 1, 2268932.5],
			[1582, 10, 4, 2299159.5], [1582, 10, 15, 2299170.5],
			[1600, 1, 1, 2305457.5], [1700, 1, 1, 2341982.5],
			[1800, 1, 1, 2378507.5], [1900, 1, 1, 2415032.5],
			[2009, 2, 1, 2454876.5]];
		// http://www.onlineconversion.com/julian_date.htm
		for (var i = 0; i < tests.length; i++) {
			date = jc.newDate(tests[i][0], tests[i][1], tests[i][2]);
			equal(date.toJD(), tests[i][3], 'Julian - to Julian ' + date);
			equalCDate(jc.fromJD(tests[i][3]), date, 'Julian - from Julian ' + date);
		}
	});

	test('Julian days', function() {
		expect(34);
		var jc = $.calendars.instance('Julian');
		var d = jc.newDate(2009, 1, 2);
		equal(d.year(), 2009, 'Julian - year');
		equal(d.month(), 1, 'Julian - month');
		equal(d.day(), 2, 'Julian - day');
		equal(d.leapYear(), false, 'Julian - leap year');
		equal(d.dayOfWeek(), 4, 'Julian - day of week');
		equal(d.weekDay(), true, 'Julian - week day');
		equal(d.dayOfYear(), 2, 'Julian - day of year');
		equal(d.toJD(), 2454846.5, 'Julian - Julian date');
		equalDate(d.toJSDate(), new Date(2009, 1 - 1, 15), 'Julian - JS Date');
		d.date(2004, 2, 29);
		equal(d.year(), 2004, 'Julian - year');
		equal(d.month(), 2, 'Julian - month');
		equal(d.day(), 29, 'Julian - day');
		equal(d.leapYear(), true, 'Julian - leap year');
		equal(d.dayOfWeek(), 6, 'Julian - day of week');
		equal(d.weekDay(), false, 'Julian - week day');
		equal(d.dayOfYear(), 60, 'Julian - day of year');
		equal(d.toJD(), 2453077.5, 'Julian - Julian date');
		equalDate(d.toJSDate(), new Date(2004, 3 - 1, 13), 'Julian - JS Date');
		equal(jc.isValid(1582, 10, 4), true, 'Julian - valid 04/10/1582');
		equal(jc.isValid(1582, 10, 5), true, 'Julian - valid 05/10/1582');
		equal(jc.isValid(1582, 10, 14), true, 'Julian - valid 14/10/1582');
		equal(jc.isValid(1582, 10, 15), true, 'Julian - valid 15/10/1582');
		equal(jc.isValid(2001, 2, 28), true, 'Julian - valid 28/02/2001');
		equal(jc.isValid(2001, 2, 29), false, 'Julian - valid 29/02/2001');
		equal(jc.isValid(2000, 2, 28), true, 'Julian - valid 28/02/2000');
		equal(jc.isValid(2000, 2, 29), true, 'Julian - valid 29/02/2000');
		equal(jc.isValid(-1, 2, 28), true, 'Julian - valid 28/02/-0001');
		equal(jc.isValid(0, 2, 28), false, 'Julian - valid 28/02/0000');
		equal(jc.isValid(2000, -1, 28), false, 'Julian - valid 28/-1/2000');
		equal(jc.isValid(2000, 14, 28), false, 'Julian - valid 28/14/2000');
		equal(jc.isValid(2000, 2, -1), false, 'Julian - valid -1/02/2000');
		equal(jc.isValid(2000, 2, 88), false, 'Julian - valid 88/02/2000');
		try {
			d = jc.newDate(2001, 2, 29);
			ok(false, 'Julian - invalid date - non-leap');
		}
		catch (e) {
			equal(e, 'Invalid Julian date', 'Julian - invalid date - non-leap');
		}
		try {
			d = jc.newDate(0, 2, 1);
			ok(false, 'Julian - invalid date - year zero');
		}
		catch (e) {
			equal(e, 'Invalid Julian date', 'Julian - invalid date - year zero');
		}
	});

	test('Julian add', function() {
		expect(28);
		var jc = $.calendars.instance('Julian');
		var d = jc.newDate(2009, 1, 2);
		d.add(1, 'y');
		equalCDate(d, jc.newDate(2010, 1, 2), 'Julian - add 1 y');
		d.add(-2, 'y');
		equalCDate(d, jc.newDate(2008, 1, 2), 'Julian - add -2 y');
		d.add(1, 'm');
		equalCDate(d, jc.newDate(2008, 2, 2), 'Julian - add 1 m');
		d.add(-2, 'm');
		equalCDate(d, jc.newDate(2007, 12, 2), 'Julian - add -2 m');
		d.add(1, 'w');
		equalCDate(d, jc.newDate(2007, 12, 9), 'Julian - add 1 w');
		d.add(-2, 'w');
		equalCDate(d, jc.newDate(2007, 11, 25), 'Julian - add -2 w');
		d.add(1, 'd');
		equalCDate(d, jc.newDate(2007, 11, 26), 'Julian - add 1 d');
		d.add(-2, 'd');
		equalCDate(d, jc.newDate(2007, 11, 24), 'Julian - add -2 d');
		d.add(1, 'd').add(1, 'w').add(1, 'm').add(1, 'y');
		equalCDate(d, jc.newDate(2009, 1, 2), 'Julian - add 1 d, 1 w, 1 m, 1 y');
		d.date(2008, 2, 20).add(2, 'w');
		equalCDate(d, jc.newDate(2008, 3, 5), 'Julian - add 2 w over leap day');
		d.date(2008, 1, 31).add(1, 'm');
		equalCDate(d, jc.newDate(2008, 2, 29), 'Julian - add 1 m for leap day');
		d.date(2008, 2, 29).add(1, 'y');
		equalCDate(d, jc.newDate(2009, 2, 28), 'Julian - add 1 y to leap day');
		d.date(2, 2, 1).add(-2, 'y');
		equalCDate(d, jc.newDate(-1, 2, 1), 'Julian - add -2 y into year 0');
		d.date(-2, 2, 1).add(2, 'y');
		equalCDate(d, jc.newDate(1, 2, 1), 'Julian - add 2 y into year 0');
		d.date(2, 2, 1).add(-4, 'y');
		equalCDate(d, jc.newDate(-3, 2, 1), 'Julian - add -4 y over year 0');
		d.date(-2, 2, 1).add(4, 'y');
		equalCDate(d, jc.newDate(3, 2, 1), 'Julian - add 4 y over year 0');
		d.date(1, 2, 1).add(-6, 'm');
		equalCDate(d, jc.newDate(-1, 8, 1), 'Julian - add -6 m into year 0');
		d.date(-1, 10, 1).add(6, 'm');
		equalCDate(d, jc.newDate(1, 4, 1), 'Julian - add 6 m into year 0');
		d.date(1, 2, 1).add(-26, 'm');
		equalCDate(d, jc.newDate(-3, 12, 1), 'Julian - add -26 m over year 0');
		d.date(-1, 10, 1).add(26, 'm');
		equalCDate(d, jc.newDate(2, 12, 1), 'Julian - add 26 m over year 0');
		d.date(1, 2, 1).add(-15, 'w');
		equalCDate(d, jc.newDate(-1, 10, 19), 'Julian - add -15 w into year 0');
		d.date(-1, 10, 1).add(15, 'w');
		equalCDate(d, jc.newDate(1, 1, 14), 'Julian - add 15 w into year 0');
		d.date(1, 2, 1).add(-100, 'w');
		equalCDate(d, jc.newDate(-2, 3, 4), 'Julian - add -100 w over year 0');
		d.date(-1, 10, 1).add(100, 'w');
		equalCDate(d, jc.newDate(2, 9, 1), 'Julian - add 100 w over year 0');
		d.date(1, 2, 1).add(-105, 'd');
		equalCDate(d, jc.newDate(-1, 10, 19), 'Julian - add -105 d into year 0');
		d.date(-1, 10, 1).add(105, 'd');
		equalCDate(d, jc.newDate(1, 1, 14), 'Julian - add 105 d into year 0');
		d.date(1, 2, 1).add(-700, 'd');
		equalCDate(d, jc.newDate(-2, 3, 4), 'Julian - add -700 d over year 0');
		d.date(-1, 10, 1).add(700, 'd');
		equalCDate(d, jc.newDate(2, 9, 1), 'Julian - add 700 d over year 0');
	});

	test('Julian compare', function() {
		expect(7);
		var jc = $.calendars.instance('Julian');
		var d1 = jc.newDate(2009, 1, 2);
		var d2 = jc.newDate(2009, 1, 5);
		equal(d1.compareTo(d2), -1, 'Julian compare - 02/01/2009 - 05/01/2009');
		equal(d2.compareTo(d1), +1, 'Julian compare - 05/01/2009 - 02/01/2009');
		equal(d1.compareTo(d1), 0, 'Julian compare - 02/01/2009 - 02/01/2009');
		d2 = jc.newDate(2009, 2, 2);
		equal(d1.compareTo(d2), -1, 'Julian compare - 02/01/2009 - 02/02/2009');
		equal(d2.compareTo(d1), +1, 'Julian compare - 02/02/2009 - 02/01/2009');
		d2 = jc.newDate(2010, 1, 2);
		equal(d1.compareTo(d2), -1, 'Julian compare - 02/01/2009 - 02/01/2010');
		equal(d2.compareTo(d1), +1, 'Julian compare - 02/01/2010 - 02/01/2009');
	});

	test('Julian format', function() {
		expect(12);
		var jc = $.calendars.instance('Julian');
		var d = jc.newDate(2001, 2, 3);
		equal(d.formatDate(), '02/03/2001', 'Julian format - default');
		equal(d.formatDate('dd/mm/yyyy'), '03/02/2001', 'Julian format - dd/mm/yyyy');
		equal(d.formatDate('d/m/yy'), '3/2/01', 'Julian format - d/m/yy');
		equal(d.formatDate('yyyy-mm-dd'), '2001-02-03', 'Julian format - yyyy-mm-dd');
		equal(d.formatDate('yy-o'), '01-34', 'Julian format - yy-o');
		equal(d.formatDate('yyyy-oo'), '2001-034', 'Julian format - yyyy-oo');
		equal(d.formatDate('D, M d, yyyy'), 'Fri, Feb 3, 2001', 'Julian format - D, M d, yyyy');
		equal(d.formatDate('DD, MM d, yyyy'), 'Friday, February 3, 2001', 'Julian format - DD, MM d, yyyy');
		equal(d.formatDate('\'day\' d \'of\' MM \'in the year\' yyyy'), 'day 3 of February in the year 2001',
			'Julian format - \'day\' d \'of\' MM \'in the year\' yyyy');
		equal(d.formatDate('@'), '982281600', 'Julian format - @');
		equal(d.formatDate('!'), '631178784000000000', 'Julian format - !');
		equal(d.formatDate('J'), '2451956.5', 'Julian format - J');
	});

	test('Julian parse', function() {
		expect(11);
		var jc = $.calendars.instance('Julian');
		var d = jc.newDate(2001, 2, 3);
		equalCDate(jc.parseDate('dd/mm/yyyy', '03/02/2001'), d, 'Julian parse - dd/mm/yyyy');
		equalCDate(jc.parseDate('d/m/yy', '3/2/01'), d, 'Julian parse - d/m/yy');
		equalCDate(jc.parseDate('yyyy-mm-dd', '2001-02-03'), d, 'Julian parse - yyyy-mm-dd');
		equalCDate(jc.parseDate('yy-o', '01-34'), d, 'Julian parse - yy-o');
		equalCDate(jc.parseDate('yyyy-oo', '2001-034'), d, 'Julian parse - yyyy-oo');
		equalCDate(jc.parseDate('D, M d, yyyy', 'Fri, Feb 3, 2001'), d, 'Julian parse - D, M d, yyyy');
		equalCDate(jc.parseDate('DD, MM d, yyyy', 'Friday, February 3, 2001'), d, 'Julian parse - DD, MM d, yyyy');
		equalCDate(jc.parseDate('\'day\' d \'of\' MM \'in the year\' yyyy', 'day 3 of February in the year 2001'), d,
			'Julian parse - \'day\' d \'of\' MM \'in the year\' yyyy');
		equalCDate(jc.parseDate('@', '982281600'), d, 'Julian parse - @');
		equalCDate(jc.parseDate('!', '631178784000000000'), d, 'Julian parse - !');
		equalCDate(jc.parseDate('J', '2451956.5'), d, 'Julian parse - J');
	});

	module('Persian');

	test('Persian calendar', function() {
		expect(54);
		var pc = $.calendars.instance('Persian');
		equal(pc.monthsInYear(1386), 12, 'Persian - months in year 1386');
		equal(pc.monthsInYear(1387), 12, 'Persian - months in year 1387');
		equal(pc.monthsInYear(1388), 12, 'Persian - months in year 1388');
		equal(pc.monthsInYear(1390), 12, 'Persian - months in year 1390');
		equal(pc.monthsInYear(1391), 12, 'Persian - months in year 1391');
		equal(pc.leapYear(1386), false, 'Persian - leap year 1386');
		equal(pc.leapYear(1387), true, 'Persian - leap year 1387');
		equal(pc.leapYear(1388), false, 'Persian - leap year 1388');
		equal(pc.leapYear(1390), false, 'Persian - leap year 1390');
		equal(pc.leapYear(1391), true, 'Persian - leap year 1391');
		equal(pc.daysInYear(1386), 365, 'Persian - days in year 1386');
		equal(pc.daysInYear(1387), 366, 'Persian - days in year 1387');
		equal(pc.daysInYear(1388), 365, 'Persian - days in year 1388');
		equal(pc.daysInYear(1390), 365, 'Persian - days in year 1390');
		equal(pc.daysInYear(1391), 366, 'Persian - days in year 1391');
		equal(pc.daysInMonth(1386, 1), 31, 'Persian - days in month Far 1386');
		equal(pc.daysInMonth(1386, 2), 31, 'Persian - days in month Ord 1386');
		equal(pc.daysInMonth(1386, 3), 31, 'Persian - days in month Kho 1386');
		equal(pc.daysInMonth(1386, 4), 31, 'Persian - days in month Tir 1386');
		equal(pc.daysInMonth(1386, 5), 31, 'Persian - days in month Mor 1386');
		equal(pc.daysInMonth(1386, 6), 31, 'Persian - days in month Sha 1386');
		equal(pc.daysInMonth(1386, 7), 30, 'Persian - days in month Meh 1386');
		equal(pc.daysInMonth(1386, 8), 30, 'Persian - days in month Aba 1386');
		equal(pc.daysInMonth(1386, 9), 30, 'Persian - days in month Aza 1386');
		equal(pc.daysInMonth(1386, 10), 30, 'Persian - days in month Dey 1386');
		equal(pc.daysInMonth(1386, 11), 30, 'Persian - days in month Bah 1386');
		equal(pc.daysInMonth(1386, 12), 29, 'Persian - days in month Esf 1386');
		equal(pc.daysInMonth(1387, 1), 31, 'Persian - days in month Far 1387');
		equal(pc.daysInMonth(1387, 2), 31, 'Persian - days in month Ord 1387');
		equal(pc.daysInMonth(1387, 3), 31, 'Persian - days in month Kho 1387');
		equal(pc.daysInMonth(1387, 4), 31, 'Persian - days in month Tir 1387');
		equal(pc.daysInMonth(1387, 5), 31, 'Persian - days in month Mor 1387');
		equal(pc.daysInMonth(1387, 6), 31, 'Persian - days in month Sha 1387');
		equal(pc.daysInMonth(1387, 7), 30, 'Persian - days in month Meh 1387');
		equal(pc.daysInMonth(1387, 8), 30, 'Persian - days in month Aba 1387');
		equal(pc.daysInMonth(1387, 9), 30, 'Persian - days in month Aza 1387');
		equal(pc.daysInMonth(1387, 10), 30, 'Persian - days in month Dey 1387');
		equal(pc.daysInMonth(1387, 11), 30, 'Persian - days in month Bah 1387');
		equal(pc.daysInMonth(1387, 12), 30, 'Persian - days in month Esf 1387');
		equal(pc.daysInWeek(), 7, 'Persian - days in week');
		equal(pc.epoch(2000), 'AP', 'Persian - epoch 2000');
		equal(pc.epoch(-2000), 'BP', 'Persian - epoch -2000');
		var date = pc.newDate(1387, 12, 30);
		equal(pc.weekOfYear(date), 52, 'Persian - week ' + date);
		date = pc.newDate(1388, 1, 1);
		equal(pc.weekOfYear(date), 1, 'Persian - week ' + date);
		date = pc.newDate(1388, 1, 7);
		equal(pc.weekOfYear(date), 1, 'Persian - week ' + date);
		date = pc.newDate(1388, 1, 8);
		equal(pc.weekOfYear(date), 2, 'Persian - week ' + date);
		date = pc.newDate(1388, 12, 28);
		equal(pc.weekOfYear(date), 52, 'Persian - week ' + date);
		date = pc.newDate(1388, 12, 29);
		equal(pc.weekOfYear(date), 53, 'Persian - week ' + date);
		date = pc.newDate(1389, 1, 6);
		equal(pc.weekOfYear(date), 53, 'Persian - week ' + date);
		date = pc.newDate(1389, 1, 7);
		equal(pc.weekOfYear(date), 1, 'Persian - week ' + date);
		date = pc.newDate(1391, 12, 29);
		equal(pc.weekOfYear(date), 52, 'Persian - week ' + date);
		date = pc.newDate(1392, 1, 2);
		equal(pc.weekOfYear(date), 52, 'Persian - week ' + date);
		date = pc.newDate(1392, 1, 3);
		equal(pc.weekOfYear(date), 1, 'Persian - week ' + date);
		date = pc.newDate(1392, 1, 9);
		equal(pc.weekOfYear(date), 1, 'Persian - week ' + date);
	});

	test('Persian days', function() {
		expect(29);
		var pc = $.calendars.instance('Persian');
		var d = pc.newDate(1387, 10, 13);
		equal(d.year(), 1387, 'Persian - year');
		equal(d.month(), 10, 'Persian - month');
		equal(d.day(), 13, 'Persian - day');
		equal(d.leapYear(), true, 'Persian - leap year');
		equal(d.dayOfWeek(), 5, 'Persian - day of week');
		equal(d.weekDay(), false, 'Persian - week day');
		equal(d.dayOfYear(), 289, 'Persian - day of year');
		equal(d.toJD(), 2454833.5, 'Persian - Julian date');
		equalDate(d.toJSDate(), new Date(2009, 1 - 1, 2), 'Persian - JS Date');
		d.date(1382, 12, 10);
		equal(d.year(), 1382, 'Persian - year');
		equal(d.month(), 12, 'Persian - month');
		equal(d.day(), 10, 'Persian - day');
		equal(d.leapYear(), false, 'Persian - leap year');
		equal(d.dayOfWeek(), 0, 'Persian - day of week');
		equal(d.weekDay(), true, 'Persian - week day');
		equal(d.dayOfYear(), 346, 'Persian - day of year');
		equal(d.toJD(), 2453064.5, 'Persian - Julian date');
		equalDate(d.toJSDate(), new Date(2004, 2 - 1, 29), 'Persian - JS Date');
		d = pc.today();
		var today = new Date();
		equalDate(d.toJSDate(), today, 'Persian - today');
		equal(pc.isValid(1388, 12, 29), true, 'Persian - valid 29/12/1388');
		equal(pc.isValid(1388, 12, 30), false, 'Persian - valid 30/12/1388');
		equal(pc.isValid(1387, 12, 29), true, 'Persian - valid 29/12/1387');
		equal(pc.isValid(1387, 12, 30), true, 'Persian - valid 30/12/1387');
		equal(pc.isValid(-1, 12, 29), true, 'Persian - valid 29/12/-0001');
		equal(pc.isValid(0, 12, 29), false, 'Persian - valid 29/12/0000');
		equal(pc.isValid(1387, -1, 28), false, 'Persian - valid 28/-1/1387');
		equal(pc.isValid(1387, 14, 28), false, 'Persian - valid 28/14/1387');
		equal(pc.isValid(1387, 2, -1), false, 'Persian - valid -1/02/1387');
		equal(pc.isValid(1387, 2, 88), false, 'Persian - valid 88/02/1387');
	});

	test('Persian vs Julian Date', function() {
		expect(20);
		var pc = $.calendars.instance('Persian');
		var tests = [[-4000, 1, 1, 487351.5], [-3000, 1, 1, 852593.5],
			[-2000, 1, 1, 1217835.5], [-1000, 1, 1, 1583077.5],
			[-500, 1, 1, 1765699.5], [-1, 12, 30, 1948319.5],
			[1, 1, 1, 1948320.5], [500, 1, 1, 2130576.5],
			[1000, 1, 1, 2313197.5], [1387, 1, 1, 2454545.5]];
		// http://www.fourmilab.ch/documents/calendar/
		for (var i = 0; i < tests.length; i++) {
			date = pc.newDate(tests[i][0], tests[i][1], tests[i][2]);
			equal(date.toJD(), tests[i][3], 'Persian - to Julian ' + date);
			equalCDate(pc.fromJD(tests[i][3]), date, 'Persian - from Julian ' + date);
		}
	});

	test('Persian add', function() {
		expect(12);
		var pc = $.calendars.instance('Persian');
		var d = pc.newDate(1388, 1, 2);
		d.add(1, 'y');
		equalCDate(d, pc.newDate(1389, 1, 2), 'Persian - add 1 y');
		d.add(-2, 'y');
		equalCDate(d, pc.newDate(1387, 1, 2), 'Persian - add -2 y');
		d.add(1, 'm');
		equalCDate(d, pc.newDate(1387, 2, 2), 'Persian - add 1 m');
		d.add(-2, 'm');
		equalCDate(d, pc.newDate(1386, 12, 2), 'Persian - add -2 m');
		d.add(1, 'w');
		equalCDate(d, pc.newDate(1386, 12, 9), 'Persian - add 1 w');
		d.add(-2, 'w');
		equalCDate(d, pc.newDate(1386, 11, 25), 'Persian - add -2 w');
		d.add(1, 'd');
		equalCDate(d, pc.newDate(1386, 11, 26), 'Persian - add 1 d');
		d.add(-2, 'd');
		equalCDate(d, pc.newDate(1386, 11, 24), 'Persian - add -2 d');
		d.add(1, 'd').add(1, 'w').add(1, 'm').add(1, 'y');
		equalCDate(d, pc.newDate(1388, 1, 2), 'Persian - add 1 d, 1 w, 1 m, 1 y');
		d.date(1387, 12, 20).add(2, 'w');
		equalCDate(d, pc.newDate(1388, 1, 4), 'Persian - add 2 w over leap day');
		d.date(1387, 11, 30).add(1, 'm');
		equalCDate(d, pc.newDate(1387, 12, 30), 'Persian - add 1 m for leap day');
		d.date(1387, 12, 30).add(1, 'y');
		equalCDate(d, pc.newDate(1388, 12, 29), 'Persian - add 1 y to leap day');
	});

	test('Persian compare', function() {
		expect(7);
		var pc = $.calendars.instance('Persian');
		var d1 = pc.newDate(1388, 5, 8);
		var d2 = pc.newDate(1388, 5, 14);
		equal(d1.compareTo(d2), -1, 'Persian compare - 08/05/1388 - 14/05/1388');
		equal(d2.compareTo(d1), +1, 'Persian compare - 14/05/1388 - 08/05/1388');
		equal(d1.compareTo(d1), 0, 'Persian compare - 08/05/1388 - 08/05/1388');
		d2 = pc.newDate(1388, 7, 8);
		equal(d1.compareTo(d2), -1, 'Persian compare - 08/05/1388 - 08/07/1388');
		equal(d2.compareTo(d1), +1, 'Persian compare - 08/07/1388 - 08/05/1388');
		d2 = pc.newDate(1390, 5, 8);
		equal(d1.compareTo(d2), -1, 'Persian compare - 08/05/1388 - 08/05/1390');
		equal(d2.compareTo(d1), +1, 'Persian compare - 08/05/1390 - 08/05/1388');
	});

	test('Persian format', function() {
		expect(14);
		var pc = $.calendars.instance('Persian');
		var d = pc.newDate(1388, 2, 3);
		equal(pc.formatDate(d), '1388/02/03', 'Persian format - default');
		equal(pc.formatDate('dd/mm/yyyy', d), '03/02/1388', 'Persian format - dd/mm/yyyy');
		equal(pc.formatDate('d/m/yy', d), '3/2/88', 'Persian format - d/m/yy');
		equal(pc.formatDate('yyyy-mm-dd', d), '1388-02-03', 'Persian format - yyyy-mm-dd');
		equal(pc.formatDate('yy-o', d), '88-34', 'Persian format - yy-o');
		equal(pc.formatDate('yyyy-oo', d), '1388-034', 'Persian format - yyyy-oo');
		equal(pc.formatDate('D, M d, yyyy', d), 'Panj, Ord 3, 1388', 'Persian format - D, M d, yyyy');
		equal(pc.formatDate('DD, MM d, yyyy', d), 'Panjshanbe, Ordibehesht 3, 1388',
			'Persian format - DD, MM d, yyyy');
		equal(pc.formatDate('\'day\' d \'of\' MM \'in the year\' YYYY', d),
			'day 3 of Ordibehesht in the year 1388',
			'Persian format - \'day\' d \'of\' MM \'in the year\' YYYY');
		equal(pc.formatDate('@', d), '1240444800', 'Persian format - @');
		equal(pc.formatDate('!', d), '633760416000000000', 'Persian format - !');
		equal(pc.formatDate('J', d), '2454944.5', 'Persian format - J');
		equal(d.formatDate(), '1388/02/03', 'Persian date format - default');
		equal(d.formatDate('dd/mm/yyyy'), '03/02/1388', 'Persian date format - dd/mm/yyyy');
	});

	test('Persian parse', function() {
		expect(15);
		var pc = $.calendars.instance('Persian');
		var d = pc.newDate(1388, 2, 3);
		equal(pc.parseDate('', ''), null, 'Persian parse - empty');
		equalCDate(pc.parseDate('', '1388/02/03'), d, 'Persian parse - default');
		equalCDate(pc.parseDate('dd/mm/yyyy', '3/2/1388'), d, 'Persian parse - dd/mm/yyyy');
		equalCDate(pc.parseDate('dd/mm/yyyy', '03/02/1388'), d, 'Persian parse - dd/mm/yyyy');
		equalCDate(pc.parseDate('d/m/yy', '3/2/88'), d, 'Persian parse - d/m/yy');
		equalCDate(pc.parseDate('yyyy-mm-dd', '1388-02-03'), d, 'Persian parse - yyyy-mm-dd');
		equalCDate(pc.parseDate('yy-o', '88-34'), d, 'Persian parse - yy-o');
		equalCDate(pc.parseDate('yyyy-oo', '1388-034'), d, 'Persian parse - yyyy-oo');
		equalCDate(pc.parseDate('D, M d, yyyy', 'Panj, Ord 3, 1388'), d,
			'Persian parse - D, M d, yyyy');
		equalCDate(pc.parseDate('DD, MM d, yyyy', 'Panjshanbe, Ordibehesht 3, 1388'), d,
			'Persian parse - DD, MM d, yyyy');
		equalCDate(pc.parseDate('\'day\' d \'of\' MM \'in the year\' YYYY',
			'day 3 of Ordibehesht in the year 1388'), d,
			'Persian parse - \'day\' d \'of\' MM \'in the year\' YYYY');
		equalCDate(pc.parseDate('@', '1240444800'), d, 'Persian parse - @');
		equalCDate(pc.parseDate('!', '633760416000000000'), d, 'Persian parse - !');
		equalCDate(pc.parseDate('J', '2454944.5'), d, 'Persian parse - J');
		equalCDate(pc.parseDate('J', 2454944.5), d, 'Persian parse - J numeric');
	});

	module('Islamic');

	test('Islamic calendar', function() {
		expect(42);
		var ic = $.calendars.instance('Islamic');
		equal(ic.monthsInYear(1425), 12, 'Islamic - months in year 1425');
		equal(ic.monthsInYear(1426), 12, 'Islamic - months in year 1426');
		equal(ic.monthsInYear(1427), 12, 'Islamic - months in year 1427');
		equal(ic.monthsInYear(1428), 12, 'Islamic - months in year 1428');
		equal(ic.monthsInYear(1429), 12, 'Islamic - months in year 1429');
		equal(ic.leapYear(1425), false, 'Islamic - leap year 1425');
		equal(ic.leapYear(1426), true, 'Islamic - leap year 1426');
		equal(ic.leapYear(1427), false, 'Islamic - leap year 1427');
		equal(ic.leapYear(1428), true, 'Islamic - leap year 1428');
		equal(ic.leapYear(1429), false, 'Islamic - leap year 1429');
		equal(ic.daysInYear(1425), 354, 'Islamic - days in year 1425');
		equal(ic.daysInYear(1426), 355, 'Islamic - days in year 1426');
		equal(ic.daysInYear(1427), 354, 'Islamic - days in year 1427');
		equal(ic.daysInYear(1428), 355, 'Islamic - days in year 1428');
		equal(ic.daysInYear(1429), 354, 'Islamic - days in year 1429');
		equal(ic.daysInMonth(1425, 1), 30, 'Islamic - days in month Muh 1425');
		equal(ic.daysInMonth(1425, 2), 29, 'Islamic - days in month Saf 1425');
		equal(ic.daysInMonth(1425, 3), 30, 'Islamic - days in month Rab1 1425');
		equal(ic.daysInMonth(1425, 4), 29, 'Islamic - days in month Rab2 1425');
		equal(ic.daysInMonth(1425, 5), 30, 'Islamic - days in month Jum1 1425');
		equal(ic.daysInMonth(1425, 6), 29, 'Islamic - days in month Jum2 1425');
		equal(ic.daysInMonth(1425, 7), 30, 'Islamic - days in month Raj 1425');
		equal(ic.daysInMonth(1425, 8), 29, 'Islamic - days in month Sha\' 1425');
		equal(ic.daysInMonth(1425, 9), 30, 'Islamic - days in month Ram 1425');
		equal(ic.daysInMonth(1425, 10), 29, 'Islamic - days in month Shaw 1425');
		equal(ic.daysInMonth(1425, 11), 30, 'Islamic - days in month Dhu1 1425');
		equal(ic.daysInMonth(1425, 12), 29, 'Islamic - days in month Dhu2 1425');
		equal(ic.daysInMonth(1426, 1), 30, 'Islamic - days in month Muh 1426');
		equal(ic.daysInMonth(1426, 2), 29, 'Islamic - days in month Saf 1426');
		equal(ic.daysInMonth(1426, 3), 30, 'Islamic - days in month Rab1 1426');
		equal(ic.daysInMonth(1426, 4), 29, 'Islamic - days in month Rab2 1426');
		equal(ic.daysInMonth(1426, 5), 30, 'Islamic - days in month Jum1 1426');
		equal(ic.daysInMonth(1426, 6), 29, 'Islamic - days in month Jum2 1426');
		equal(ic.daysInMonth(1426, 7), 30, 'Islamic - days in month Raj 1426');
		equal(ic.daysInMonth(1426, 8), 29, 'Islamic - days in month Sha\' 1426');
		equal(ic.daysInMonth(1426, 9), 30, 'Islamic - days in month Ram 1426');
		equal(ic.daysInMonth(1426, 10), 29, 'Islamic - days in month Shaw 1426');
		equal(ic.daysInMonth(1426, 11), 30, 'Islamic - days in month Dhu1 1426');
		equal(ic.daysInMonth(1426, 12), 30, 'Islamic - days in month Dhu2 1426');
		equal(ic.daysInWeek(), 7, 'Islamic - days in week');
		equal(ic.epoch(2000), 'AH', 'Islamic - epoch 2000');
		equal(ic.epoch(-2000), 'BH', 'Islamic - epoch -2000');
	});

	test('Islamic days', function() {
		expect(29);
		var ic = $.calendars.instance('Islamic');
		var d = ic.newDate(1430, 1, 5);
		equal(d.year(), 1430, 'Islamic - year');
		equal(d.month(), 1, 'Islamic - month');
		equal(d.day(), 5, 'Islamic - day');
		equal(d.leapYear(), false, 'Islamic - leap year');
		equal(d.dayOfWeek(), 5, 'Islamic - day of week');
		equal(d.weekDay(), false, 'Islamic - week day');
		equal(d.dayOfYear(), 5, 'Islamic - day of year');
		equal(d.toJD(), 2454833.5, 'Islamic - Julian date');
		equalDate(d.toJSDate(), new Date(2009, 1 - 1, 2), 'Islamic - JS Date');
		d.date(1426, 10, 19);
		equal(d.year(), 1426, 'Islamic - year');
		equal(d.month(), 10, 'Islamic - month');
		equal(d.day(), 19, 'Islamic - day');
		equal(d.leapYear(), true, 'Islamic - leap year');
		equal(d.dayOfWeek(), 1, 'Islamic - day of week');
		equal(d.weekDay(), true, 'Islamic - week day');
		equal(d.dayOfYear(), 285, 'Islamic - day of year');
		equal(d.toJD(), 2453695.5, 'Islamic - Julian date');
		equalDate(d.toJSDate(), new Date(2005, 11 - 1, 21), 'Islamic - JS Date');
		d = ic.today();
		var today = new Date();
		equalDate(d.toJSDate(), today, 'Islamic - today');
		equal(ic.isValid(1430, 12, 29), true, 'Islamic - valid 29/12/1430');
		equal(ic.isValid(1430, 12, 30), false, 'Islamic - valid 30/12/1430');
		equal(ic.isValid(1426, 12, 29), true, 'Islamic - valid 29/12/1426');
		equal(ic.isValid(1426, 12, 30), true, 'Islamic - valid 30/12/1426');
		equal(ic.isValid(-1, 12, 29), true, 'Islamic - valid 29/12/-0001');
		equal(ic.isValid(0, 12, 29), false, 'Islamic - valid 29/12/0000');
		equal(ic.isValid(1426, -1, 28), false, 'Islamic - valid 28/-1/1426');
		equal(ic.isValid(1426, 14, 28), false, 'Islamic - valid 28/14/1426');
		equal(ic.isValid(1426, 2, -1), false, 'Islamic - valid -1/02/1426');
		equal(ic.isValid(1426, 2, 88), false, 'Islamic - valid 88/02/1426');
	});

	test('Islamic add', function() {
		expect(12);
		var ic = $.calendars.instance('Islamic');
		var d = ic.newDate(1430, 1, 2);
		d.add(1, 'y');
		equalCDate(d, ic.newDate(1431, 1, 2), 'Islamic - add 1 y');
		d.add(-2, 'y');
		equalCDate(d, ic.newDate(1429, 1, 2), 'Islamic - add -2 y');
		d.add(1, 'm');
		equalCDate(d, ic.newDate(1429, 2, 2), 'Islamic - add 1 m');
		d.add(-2, 'm');
		equalCDate(d, ic.newDate(1428, 12, 2), 'Islamic - add -2 m');
		d.add(1, 'w');
		equalCDate(d, ic.newDate(1428, 12, 9), 'Islamic - add 1 w');
		d.add(-2, 'w');
		equalCDate(d, ic.newDate(1428, 11, 25), 'Islamic - add -2 w');
		d.add(1, 'd');
		equalCDate(d, ic.newDate(1428, 11, 26), 'Islamic - add 1 d');
		d.add(-2, 'd');
		equalCDate(d, ic.newDate(1428, 11, 24), 'Islamic - add -2 d');
		d.add(1, 'd').add(1, 'w').add(1, 'm').add(1, 'y');
		equalCDate(d, ic.newDate(1430, 1, 2), 'Islamic - add 1 d, 1 w, 1 m, 1 y');
		d.date(1426, 12, 20).add(2, 'w');
		equalCDate(d, ic.newDate(1427, 1, 4), 'Islamic - add 2 w over leap day');
		d.date(1426, 11, 30).add(1, 'm');
		equalCDate(d, ic.newDate(1426, 12, 30), 'Islamic - add 1 m for leap day');
		d.date(1426, 12, 30).add(1, 'y');
		equalCDate(d, ic.newDate(1427, 12, 29), 'Islamic - add 1 y to leap day');
	});

	test('Islamic compare', function() {
		expect(7);
		var ic = $.calendars.instance('Islamic');
		var d1 = ic.newDate(1430, 1, 2);
		var d2 = ic.newDate(1430, 1, 5);
		equal(d1.compareTo(d2), -1, 'Islamic compare - 02/01/1430 - 05/01/1430');
		equal(d2.compareTo(d1), +1, 'Islamic compare - 05/01/1430 - 02/01/1430');
		equal(d1.compareTo(d1), 0, 'Islamic compare - 02/01/1430 - 02/01/1430');
		d2 = ic.newDate(1430, 2, 2);
		equal(d1.compareTo(d2), -1, 'Islamic compare - 02/01/1430 - 02/02/1430');
		equal(d2.compareTo(d1), +1, 'Islamic compare - 02/02/1430 - 02/01/1430');
		d2 = ic.newDate(1431, 1, 2);
		equal(d1.compareTo(d2), -1, 'Islamic compare - 02/01/1430 - 02/01/1431');
		equal(d2.compareTo(d1), +1, 'Islamic compare - 02/01/1431 - 02/01/1430');
	});

	module('Umm al-Qura');

	test('Umm al-Qura calendar', function() {
		expect(41);
		var uc = $.calendars.instance('ummalqura');
		equal(uc.monthsInYear(1425), 12, 'Umm al-Qura - months in year 1425');
		equal(uc.monthsInYear(1426), 12, 'Umm al-Qura - months in year 1426');
		equal(uc.monthsInYear(1427), 12, 'Umm al-Qura - months in year 1427');
		equal(uc.monthsInYear(1428), 12, 'Umm al-Qura - months in year 1428');
		equal(uc.monthsInYear(1429), 12, 'Umm al-Qura - months in year 1429');
		equal(uc.leapYear(1425), true, 'Umm al-Qura - leap year 1425');
		equal(uc.leapYear(1426), true, 'Umm al-Qura - leap year 1426');
		equal(uc.leapYear(1427), false, 'Umm al-Qura - leap year 1427');
		equal(uc.leapYear(1428), true, 'Umm al-Qura - leap year 1428');
		equal(uc.leapYear(1429), false, 'Umm al-Qura - leap year 1429');
		equal(uc.daysInYear(1425), 355, 'Umm al-Qura - days in year 1425');
		equal(uc.daysInYear(1426), 355, 'Umm al-Qura - days in year 1426');
		equal(uc.daysInYear(1427), 354, 'Umm al-Qura - days in year 1427');
		equal(uc.daysInYear(1428), 355, 'Umm al-Qura - days in year 1428');
		equal(uc.daysInYear(1429), 354, 'Umm al-Qura - days in year 1429');
		equal(uc.daysInMonth(1425, 1), 30, 'Umm al-Qura - days in month Muh 1425');
		equal(uc.daysInMonth(1425, 2), 29, 'Umm al-Qura - days in month Saf 1425');
		equal(uc.daysInMonth(1425, 3), 30, 'Umm al-Qura - days in month Rab1 1425');
		equal(uc.daysInMonth(1425, 4), 30, 'Umm al-Qura - days in month Rab2 1425');
		equal(uc.daysInMonth(1425, 5), 29, 'Umm al-Qura - days in month Jum1 1425');
		equal(uc.daysInMonth(1425, 6), 30, 'Umm al-Qura - days in month Jum2 1425');
		equal(uc.daysInMonth(1425, 7), 29, 'Umm al-Qura - days in month Raj 1425');
		equal(uc.daysInMonth(1425, 8), 30, 'Umm al-Qura - days in month Sha\' 1425');
		equal(uc.daysInMonth(1425, 9), 30, 'Umm al-Qura - days in month Ram 1425');
		equal(uc.daysInMonth(1425, 10), 29, 'Umm al-Qura - days in month Shaw 1425');
		equal(uc.daysInMonth(1425, 11), 30, 'Umm al-Qura - days in month DhuQ 1425');
		equal(uc.daysInMonth(1425, 12), 29, 'Umm al-Qura - days in month DhuH 1425');
		equal(uc.daysInMonth(1426, 1), 29, 'Umm al-Qura - days in month Muh 1426');
		equal(uc.daysInMonth(1426, 2), 30, 'Umm al-Qura - days in month Saf 1426');
		equal(uc.daysInMonth(1426, 3), 29, 'Umm al-Qura - days in month Rab1 1426');
		equal(uc.daysInMonth(1426, 4), 30, 'Umm al-Qura - days in month Rab2 1426');
		equal(uc.daysInMonth(1426, 5), 29, 'Umm al-Qura - days in month Jum1 1426');
		equal(uc.daysInMonth(1426, 6), 30, 'Umm al-Qura - days in month Jum2 1426');
		equal(uc.daysInMonth(1426, 7), 30, 'Umm al-Qura - days in month Raj 1426');
		equal(uc.daysInMonth(1426, 8), 29, 'Umm al-Qura - days in month Sha\' 1426');
		equal(uc.daysInMonth(1426, 9), 30, 'Umm al-Qura - days in month Ram 1426');
		equal(uc.daysInMonth(1426, 10), 30, 'Umm al-Qura - days in month Shaw 1426');
		equal(uc.daysInMonth(1426, 11), 29, 'Umm al-Qura - days in month DhuQ 1426');
		equal(uc.daysInMonth(1426, 12), 30, 'Umm al-Qura - days in month DhuH 1426');
		equal(uc.daysInWeek(), 7, 'Umm al-Qura - days in week');
		equal(uc.epoch(1400), 'AH', 'Umm al-Qura - epoch 1400');
	});

	test('Umm al-Qura days', function() {
		expect(29);
		var uc = $.calendars.instance('ummalqura');
		var d = uc.newDate(1430, 1, 5);
		equal(d.year(), 1430, 'Umm al-Qura - year');
		equal(d.month(), 1, 'Umm al-Qura - month');
		equal(d.day(), 5, 'Umm al-Qura - day');
		equal(d.leapYear(), false, 'Umm al-Qura - leap year');
		equal(d.dayOfWeek(), 5, 'Umm al-Qura - day of week');
		equal(d.weekDay(), false, 'Umm al-Qura - week day');
		equal(d.dayOfYear(), 5, 'Umm al-Qura - day of year');
		equal(d.toJD(), 2454833.5, 'Umm al-Qura - Julian date');
		equalDate(d.toJSDate(), new Date(2009, 1 - 1, 2), 'Umm al-Qura - JS Date');
		d.date(1426, 10, 19);
		equal(d.year(), 1426, 'Umm al-Qura - year');
		equal(d.month(), 10, 'Umm al-Qura - month');
		equal(d.day(), 19, 'Umm al-Qura - day');
		equal(d.leapYear(), true, 'Umm al-Qura - leap year');
		equal(d.dayOfWeek(), 1, 'Umm al-Qura - day of week');
		equal(d.weekDay(), true, 'Umm al-Qura - week day');
		equal(d.dayOfYear(), 285, 'Umm al-Qura - day of year');
		equal(d.toJD(), 2453695.5, 'Umm al-Qura - Julian date');
		equalDate(d.toJSDate(), new Date(2005, 11 - 1, 21), 'Umm al-Qura - JS Date');
		d = uc.today();
		var today = new Date();
		equalDate(d.toJSDate(), today, 'Umm al-Qura - today');
		equal(uc.isValid(1430, 12, 30), true, 'Umm al-Qura - valid 30/12/1430');
		equal(uc.isValid(1430, 12, 31), false, 'Umm al-Qura - valid 31/12/1430');
		equal(uc.isValid(1425, 12, 29), true, 'Umm al-Qura - valid 29/12/1425');
		equal(uc.isValid(1425, 12, 30), false, 'Umm al-Qura - valid 30/12/1425');
		equal(uc.isValid(-1, 12, 29), false, 'Umm al-Qura - valid 29/12/-0001');
		equal(uc.isValid(0, 12, 29), false, 'Umm al-Qura - valid 29/12/0000');
		equal(uc.isValid(1426, -1, 28), false, 'Umm al-Qura - valid 28/-1/1426');
		equal(uc.isValid(1426, 14, 28), false, 'Umm al-Qura - valid 28/14/1426');
		equal(uc.isValid(1426, 2, -1), false, 'Umm al-Qura - valid -1/02/1426');
		equal(uc.isValid(1426, 2, 88), false, 'Umm al-Qura - valid 88/02/1426');
	});

	test('Umm al-Qura add', function() {
		expect(12);
		var uc = $.calendars.instance('ummalqura');
		var d = uc.newDate(1430, 1, 2);
		d.add(1, 'y');
		equalCDate(d, uc.newDate(1431, 1, 2), 'Umm al-Qura - add 1 y');
		d.add(-2, 'y');
		equalCDate(d, uc.newDate(1429, 1, 2), 'Umm al-Qura - add -2 y');
		d.add(1, 'm');
		equalCDate(d, uc.newDate(1429, 2, 2), 'Umm al-Qura - add 1 m');
		d.add(-2, 'm');
		equalCDate(d, uc.newDate(1428, 12, 2), 'Umm al-Qura - add -2 m');
		d.add(1, 'w');
		equalCDate(d, uc.newDate(1428, 12, 9), 'Umm al-Qura - add 1 w');
		d.add(-2, 'w');
		equalCDate(d, uc.newDate(1428, 11, 25), 'Umm al-Qura - add -2 w');
		d.add(1, 'd');
		equalCDate(d, uc.newDate(1428, 11, 26), 'Umm al-Qura - add 1 d');
		d.add(-2, 'd');
		equalCDate(d, uc.newDate(1428, 11, 24), 'Umm al-Qura - add -2 d');
		d.add(1, 'd').add(1, 'w').add(1, 'm').add(1, 'y');
		equalCDate(d, uc.newDate(1430, 1, 2), 'Umm al-Qura - add 1 d, 1 w, 1 m, 1 y');
		d.date(1426, 12, 20).add(2, 'w');
		equalCDate(d, uc.newDate(1427, 1, 4), 'Umm al-Qura - add 2 w over leap day');
		d.date(1426, 12, 30).add(1, 'm');
		equalCDate(d, uc.newDate(1427, 1, 29), 'Umm al-Qura - add 1 m for leap day');
		d.date(1426, 12, 30).add(1, 'y');
		equalCDate(d, uc.newDate(1427, 12, 29), 'Umm al-Qura - add 1 y to leap day');
	});

	test('Umm al-Qura compare', function() {
		expect(7);
		var uc = $.calendars.instance('ummalqura');
		var d1 = uc.newDate(1430, 1, 2);
		var d2 = uc.newDate(1430, 1, 5);
		equal(d1.compareTo(d2), -1, 'Umm al-Qura compare - 02/01/1430 - 05/01/1430');
		equal(d2.compareTo(d1), +1, 'Umm al-Qura compare - 05/01/1430 - 02/01/1430');
		equal(d1.compareTo(d1), 0, 'Umm al-Qura compare - 02/01/1430 - 02/01/1430');
		d2 = uc.newDate(1430, 2, 2);
		equal(d1.compareTo(d2), -1, 'Umm al-Qura compare - 02/01/1430 - 02/02/1430');
		equal(d2.compareTo(d1), +1, 'Umm al-Qura compare - 02/02/1430 - 02/01/1430');
		d2 = uc.newDate(1431, 1, 2);
		equal(d1.compareTo(d2), -1, 'Umm al-Qura compare - 02/01/1430 - 02/01/1431');
		equal(d2.compareTo(d1), +1, 'Umm al-Qura compare - 02/01/1431 - 02/01/1430');
	});

	module('Hebrew');

	test('Hebrew calendar', function() {
		expect(41);
		var hc = $.calendars.instance('Hebrew');
		equal(hc.monthsInYear(5769), 12, 'Hebrew - months in year 5769');
		equal(hc.monthsInYear(5770), 12, 'Hebrew - months in year 5770');
		equal(hc.monthsInYear(5771), 13, 'Hebrew - months in year 5771');
		equal(hc.monthsInYear(5772), 12, 'Hebrew - months in year 5772');
		equal(hc.monthsInYear(5773), 12, 'Hebrew - months in year 5773');
		equal(hc.leapYear(5769), false, 'Hebrew - leap year 5769');
		equal(hc.leapYear(5770), false, 'Hebrew - leap year 5770');
		equal(hc.leapYear(5771), true, 'Hebrew - leap year 5771');
		equal(hc.leapYear(5772), false, 'Hebrew - leap year 5772');
		equal(hc.leapYear(5773), false, 'Hebrew - leap year 5773');
		equal(hc.daysInYear(5769), 354, 'Hebrew - days in year 5769');
		equal(hc.daysInYear(5770), 355, 'Hebrew - days in year 5770');
		equal(hc.daysInYear(5771), 385, 'Hebrew - days in year 5771');
		equal(hc.daysInYear(5772), 354, 'Hebrew - days in year 5772');
		equal(hc.daysInYear(5773), 353, 'Hebrew - days in year 5773');
		equal(hc.daysInMonth(5769, 1), 30, 'Hebrew - days in month Nis 5769');
		equal(hc.daysInMonth(5769, 2), 29, 'Hebrew - days in month Iya 5769');
		equal(hc.daysInMonth(5769, 3), 30, 'Hebrew - days in month Siv 5769');
		equal(hc.daysInMonth(5769, 4), 29, 'Hebrew - days in month Tam 5769');
		equal(hc.daysInMonth(5769, 5), 30, 'Hebrew - days in month Av 5769');
		equal(hc.daysInMonth(5769, 6), 29, 'Hebrew - days in month Elu 5769');
		equal(hc.daysInMonth(5769, 7), 30, 'Hebrew - days in month Tis 5769');
		equal(hc.daysInMonth(5769, 8), 29, 'Hebrew - days in month Che 5769');
		equal(hc.daysInMonth(5769, 9), 30, 'Hebrew - days in month Kis 5769');
		equal(hc.daysInMonth(5769, 10), 29, 'Hebrew - days in month Tev 5769');
		equal(hc.daysInMonth(5769, 11), 30, 'Hebrew - days in month She 5769');
		equal(hc.daysInMonth(5769, 12), 29, 'Hebrew - days in month Ada 5769');
		equal(hc.daysInMonth(5771, 1), 30, 'Hebrew - days in month Nis 5771');
		equal(hc.daysInMonth(5772, 1), 30, 'Hebrew - days in month Nis 5772');
		equal(hc.daysInMonth(5773, 1), 30, 'Hebrew - days in month Nis 5773');
		equal(hc.daysInMonth(5770, 8), 30, 'Hebrew - days in month Che 5770');
		equal(hc.daysInMonth(5771, 8), 30, 'Hebrew - days in month Che 5771');
		equal(hc.daysInMonth(5773, 8), 29, 'Hebrew - days in month Che 5773');
		equal(hc.daysInMonth(5771, 9), 30, 'Hebrew - days in month Kis 5771');
		equal(hc.daysInMonth(5772, 9), 30, 'Hebrew - days in month Kis 5772');
		equal(hc.daysInMonth(5773, 9), 29, 'Hebrew - days in month Kis 5773');
		equal(hc.daysInMonth(5771, 12), 30, 'Hebrew - days in month Ada 5771');
		equal(hc.daysInMonth(5771, 13), 29, 'Hebrew - days in month Ad2 5771');
		equal(hc.daysInWeek(), 7, 'Hebrew - days in week');
		equal(hc.epoch(2000), 'AM', 'Hebrew - epoch 2000');
		equal(hc.epoch(-2000), 'BAM', 'Hebrew - epoch -2000');
	});

	test('Hebrew days', function() {
		expect(32);
		var hc = $.calendars.instance('Hebrew');
		var d = hc.newDate(5769, 1, 3);
		equal(d.year(), 5769, 'Hebrew - year');
		equal(d.month(), 1, 'Hebrew - month');
		equal(d.day(), 3, 'Hebrew - day');
		equal(d.leapYear(), false, 'Hebrew - leap year');
		equal(d.dayOfWeek(), 6, 'Hebrew - day of week');
		equal(d.weekDay(), false, 'Hebrew - week day');
		equal(d.dayOfYear(), 180, 'Hebrew - day of year');
		equal(d.extraInfo().yearType, 'common regular', 'Hebrew - extra info');
		equal(d.toJD(), 2454918.5, 'Hebrew - Julian date');
		equalDate(d.toJSDate(), new Date(2009, 3 - 1, 28), 'Hebrew - JS Date');
		d.date(5771, 8, 5);
		equal(d.year(), 5771, 'Hebrew - year');
		equal(d.month(), 8, 'Hebrew - month');
		equal(d.day(), 5, 'Hebrew - day');
		equal(d.leapYear(), true, 'Hebrew - leap year');
		equal(d.dayOfWeek(), 3, 'Hebrew - day of week');
		equal(d.weekDay(), true, 'Hebrew - week day');
		equal(d.dayOfYear(), 35, 'Hebrew - day of year');
		equal(d.extraInfo().yearType, 'embolismic complete', 'Hebrew - extra info');
		equal(d.toJD(), 2455482.5, 'Hebrew - Julian date');
		equalDate(d.toJSDate(), new Date(2010, 10 - 1, 13), 'Hebrew - JS Date');
		d = hc.today();
		var today = new Date();
		equalDate(d.toJSDate(), today, 'Hebrew - today');
		equal(hc.isValid(5769, 12, 29), true, 'Hebrew - valid 29/12/5769');
		equal(hc.isValid(5769, 12, 30), false, 'Hebrew - valid 30/12/5769');
		equal(hc.isValid(5771, 12, 29), true, 'Hebrew - valid 29/12/5771');
		equal(hc.isValid(5771, 12, 30), true, 'Hebrew - valid 30/12/5771');
		equal(hc.isValid(5771, 13, 29), true, 'Hebrew - valid 29/13/5771');
		equal(hc.isValid(-1, 12, 29), true, 'Hebrew - valid 29/12/-0001');
		equal(hc.isValid(0, 12, 29), false, 'Hebrew - valid 29/12/0000');
		equal(hc.isValid(5769, -1, 28), false, 'Hebrew - valid 28/-1/5769');
		equal(hc.isValid(5769, 14, 28), false, 'Hebrew - valid 28/14/5769');
		equal(hc.isValid(5769, 2, -1), false, 'Hebrew - valid -1/02/5769');
		equal(hc.isValid(5769, 2, 88), false, 'Hebrew - valid 88/02/5769');
	});

	test('Hebrew add', function() {
		expect(13);
		var hc = $.calendars.instance('Hebrew');
		var d = hc.newDate(5769, 1, 2);
		d.add(1, 'y');
		equalCDate(d, hc.newDate(5770, 1, 2), 'Hebrew - add 1 y');
		d.add(-2, 'y');
		equalCDate(d, hc.newDate(5768, 1, 2), 'Hebrew - add -2 y');
		d.add(1, 'm');
		equalCDate(d, hc.newDate(5768, 2, 2), 'Hebrew - add 1 m');
		d.add(-2, 'm');
		equalCDate(d, hc.newDate(5768, 13, 2), 'Hebrew - add -2 m');
		d.add(1, 'w');
		equalCDate(d, hc.newDate(5768, 13, 9), 'Hebrew - add 1 w');
		d.add(-2, 'w');
		equalCDate(d, hc.newDate(5768, 12, 25), 'Hebrew - add -2 w');
		d.add(1, 'd');
		equalCDate(d, hc.newDate(5768, 12, 26), 'Hebrew - add 1 d');
		d.add(-2, 'd');
		equalCDate(d, hc.newDate(5768, 12, 24), 'Hebrew - add -2 d');
		d.add(1, 'd').add(1, 'w').add(1, 'm').add(1, 'y');
		equalCDate(d, hc.newDate(5769, 1, 2), 'Hebrew - add 1 d, 1 w, 1 m, 1 y');
		d.date(5768, 12, 20).add(6, 'w');
		equalCDate(d, hc.newDate(5768, 1, 3), 'Hebrew - add 2 w over leap day');
		d.date(5768, 6, 20).add(2, 'w');
		equalCDate(d, hc.newDate(5769, 7, 5), 'Hebrew - add 2 w over year end');
		d.date(5768, 11, 30).add(1, 'm');
		equalCDate(d, hc.newDate(5768, 12, 30), 'Hebrew - add 1 m for leap day');
		d.date(5768, 12, 30).add(1, 'y');
		equalCDate(d, hc.newDate(5769, 12, 29), 'Hebrew - add 1 y to leap day');
	});

	test('Hebrew compare', function() {
		expect(7);
		var hc = $.calendars.instance('Hebrew');
		var d1 = hc.newDate(5769, 7, 2);
		var d2 = hc.newDate(5769, 7, 5);
		equal(d1.compareTo(d2), -1, 'Hebrew compare - 02/07/5769 - 05/07/5769');
		equal(d2.compareTo(d1), +1, 'Hebrew compare - 05/07/5769 - 02/07/5769');
		equal(d1.compareTo(d1), 0, 'Hebrew compare - 02/07/5769 - 02/07/5769');
		d2 = hc.newDate(5769, 1, 5);
		equal(d1.compareTo(d2), -1, 'Hebrew compare - 02/07/5769 - 05/01/5769');
		equal(d2.compareTo(d1), +1, 'Hebrew compare - 05/01/5769 - 02/07/5769');
		d2 = hc.newDate(5770, 7, 2);
		equal(d1.compareTo(d2), -1, 'Hebrew compare - 02/07/5769 - 02/07/5770');
		equal(d2.compareTo(d1), +1, 'Hebrew compare - 02/07/5770 - 02/07/5769');
	});

	module('Ethiopian');

	test('Ethiopian calendar', function() {
		expect(34);
		var ec = $.calendars.instance('Ethiopian');
		equal(ec.monthsInYear(2001), 13, 'Ethiopian - months in year 2001');
		equal(ec.monthsInYear(2002), 13, 'Ethiopian - months in year 2002');
		equal(ec.monthsInYear(2003), 13, 'Ethiopian - months in year 2003');
		equal(ec.monthsInYear(2004), 13, 'Ethiopian - months in year 2004');
		equal(ec.monthsInYear(2005), 13, 'Ethiopian - months in year 2005');
		equal(ec.leapYear(2001), false, 'Ethiopian - leap year 2001');
		equal(ec.leapYear(2002), false, 'Ethiopian - leap year 2002');
		equal(ec.leapYear(2003), true, 'Ethiopian - leap year 2003');
		equal(ec.leapYear(2004), false, 'Ethiopian - leap year 2004');
		equal(ec.leapYear(2005), false, 'Ethiopian - leap year 2005');
		equal(ec.daysInYear(2001), 365, 'Ethiopian - days in year 2001');
		equal(ec.daysInYear(2002), 365, 'Ethiopian - days in year 2002');
		equal(ec.daysInYear(2003), 366, 'Ethiopian - days in year 2003');
		equal(ec.daysInYear(2004), 365, 'Ethiopian - days in year 2004');
		equal(ec.daysInYear(2005), 365, 'Ethiopian - days in year 2005');
		for (var m = 1; m <= 13; m++) {
			equal(ec.daysInMonth(2001, m), (m == 13 ? 5 : 30),
				'Ethiopian - days in month ' + m + ' 2001');
		}
		equal(ec.epoch(2000), 'EE', 'Ethiopian - epoch 2000');
		equal(ec.epoch(-2000), 'BEE', 'Ethiopian - epoch -2000');
		var date = ec.newDate(2000, 13, 5);
		equal(ec.weekOfYear(date), 52, 'Ethiopian - week ' + date);
		date = ec.newDate(2001, 1, 3);
		equal(ec.weekOfYear(date), 52, 'Ethiopian - week ' + date);
		date = ec.newDate(2001, 1, 4);
		equal(ec.weekOfYear(date), 1, 'Ethiopian - week ' + date);
		date = ec.newDate(2001, 1, 10);
		equal(ec.weekOfYear(date), 1, 'Ethiopian - week ' + date);
	});

	test('Ethiopian days', function() {
		expect(29);
		var ec = $.calendars.instance('Ethiopian');
		var d = ec.newDate(2006, 2, 5);
		equal(d.year(), 2006, 'Ethiopian - year');
		equal(d.month(), 2, 'Ethiopian - month');
		equal(d.day(), 5, 'Ethiopian - day');
		equal(d.leapYear(), false, 'Ethiopian - leap year');
		equal(d.formatYear(), '2006', 'Ethiopian - format year');
		equal(d.dayOfWeek(), 2, 'Ethiopian - day of week');
		equal(d.weekDay(), true, 'Ethiopian - week day');
		equal(d.dayOfYear(), 35, 'Ethiopian - day of year');
		equal(d.toJD(), 2456580.5, 'Ethiopian - Julian date');
		equalDate(d.toJSDate(), new Date(2013, 10 - 1, 15), 'Ethiopian - JS Date');
		d.date(2007, 8, 18);
		equal(d.year(), 2007, 'Ethiopian - year');
		equal(d.month(), 8, 'Ethiopian - month');
		equal(d.day(), 18, 'Ethiopian - day');
		equal(d.leapYear(), true, 'Ethiopian - leap year');
		equal(d.formatYear(), '2007', 'Ethiopian - format year');
		equal(d.dayOfWeek(), 0, 'Ethiopian - day of week');
		equal(d.weekDay(), false, 'Ethiopian - week day');
		equal(d.dayOfYear(), 228, 'Ethiopian - day of year');
		equal(d.toJD(), 2457138.5, 'Ethiopian - Julian date');
		equalDate(d.toJSDate(), new Date(2015, 4 - 1, 26), 'Ethiopian - JS Date');
		d = ec.today();
		var today = new Date();
		equalDate(d.toJSDate(), today, 'Ethiopian - today');
		equal(ec.isValid(2007, 1, 1), true, 'Ethiopian - valid 01/01/2007');
		equal(ec.isValid(2007, 13, 6), true, 'Ethiopian - valid 06/13/2007');
		equal(ec.isValid(-1, 0, 0), false, 'Ethiopian - valid 00/00/-0001');
		equal(ec.isValid(0, 0, 0), false, 'Ethiopian - valid 00/00/0000');
		equal(ec.isValid(2006, -1, 28), false, 'Ethiopian - valid 28/-1/2006');
		equal(ec.isValid(2006, 13, 6), false, 'Ethiopian - valid 06/13/2006');
		equal(ec.isValid(2006, 2, -1), false, 'Ethiopian - valid -1/02/2006');
		equal(ec.isValid(2006, 2, 88), false, 'Ethiopian - valid 88/02/2006');
	});

	test('Ethiopian vs Julian Date', function() {
		expect(48);
		var ec = $.calendars.instance('Ethiopian');
		var tests = [[-25, 13, 5, 1715453.5], [-24, 1, 1, 1715454.5],
			[-23, 13, 5, 1716183.5], [-22, 1, 1, 1716184.5],
			[-22, 13, 6, 1716549.5], [-21, 1, 1, 1716550.5],
			[-21, 13, 5, 1716914.5], [-20, 1, 1, 1716915.5],
			[-1, 13, 5, 1724219.5], [1, 1, 1, 1724220.5],
			[2, 13, 5, 1724949.5], [3, 1, 1, 1724950.5],
			[3, 13, 6, 1725315.5], [4, 1, 1, 1725316.5],
			[4, 13, 5, 1725680.5], [5, 1, 1, 1725681.5],
			[2000, 13, 5, 2454719.5], [2001, 1, 1, 2454720.5],
			[2002, 13, 5, 2455449.5], [2003, 1, 1, 2455450.5],
			[2003, 13, 6, 2455815.5], [2004, 1, 1, 2455816.5],
			[2004, 13, 5, 2456180.5], [2005, 1, 1, 2456181.5]];
		// http://???
		for (var i = 0; i < tests.length; i++) {
			date = ec.newDate(tests[i][0], tests[i][1], tests[i][2]);
			equal(date.toJD(), tests[i][3], 'Ethiopian - to Julian ' + date);
			equalCDate(ec.fromJD(tests[i][3]), date, 'Ethiopian - from Julian ' + date);
		}
	});

	test('Ethiopian add', function() {
		expect(9);
		var ec = $.calendars.instance('Ethiopian');
		var d = ec.newDate(2003, 1, 2);
		d.add(1, 'y');
		equalCDate(d, ec.newDate(2004, 1, 2), 'Ethiopian - add 1 y');
		d.add(-2, 'y');
		equalCDate(d, ec.newDate(2002, 1, 2), 'Ethiopian - add -2 y');
		d.add(1, 'm');
		equalCDate(d, ec.newDate(2002, 2, 2), 'Ethiopian - add 1 m');
		d.add(-2, 'm');
		equalCDate(d, ec.newDate(2001, 13, 2), 'Ethiopian - add -2 m');
		d.add(1, 'w');
		equalCDate(d, ec.newDate(2002, 1, 4), 'Ethiopian - add 1 w');
		d.add(-2, 'w');
		equalCDate(d, ec.newDate(2001, 12, 25), 'Ethiopian - add -2 w');
		d.add(1, 'd');
		equalCDate(d, ec.newDate(2001, 12, 26), 'Ethiopian - add 1 d');
		d.add(-2, 'd');
		equalCDate(d, ec.newDate(2001, 12, 24), 'Ethiopian - add -2 d');
		d.add(1, 'd').add(1, 'w').add(1, 'm').add(1, 'y');
		equalCDate(d, ec.newDate(2003, 1, 2), 'Ethiopian - add 1 d, 1 w, 1 m, 1 y');
	});

	test('Ethiopian compare', function() {
		expect(7);
		var ec = $.calendars.instance('Ethiopian');
		var d1 = ec.newDate(2007, 1, 2);
		var d2 = ec.newDate(2007, 1, 5);
		equal(d1.compareTo(d2), -1, 'Ethiopian compare - 02/01/2007 - 05/01/2007');
		equal(d2.compareTo(d1), +1, 'Ethiopian compare - 05/01/2007 - 02/01/2007');
		equal(d1.compareTo(d1), 0, 'Ethiopian compare - 02/01/2007 - 02/01/2007');
		d2 = ec.newDate(2007, 2, 2);
		equal(d1.compareTo(d2), -1, 'Ethiopian compare - 02/01/2007 - 02/02/2007');
		equal(d2.compareTo(d1), +1, 'Ethiopian compare - 02/02/2007 - 02/01/2007');
		d2 = ec.newDate(2008, 1, 2);
		equal(d1.compareTo(d2), -1, 'Ethiopian compare - 02/01/2007 - 02/01/2008');
		equal(d2.compareTo(d1), +1, 'Ethiopian compare - 02/01/2008 - 02/01/2007');
	});

	module('Coptic');

	test('Coptic calendar', function() {
		expect(34);
		var cc = $.calendars.instance('Coptic');
		equal(cc.monthsInYear(1724), 13, 'Coptic - months in year 1724');
		equal(cc.monthsInYear(1725), 13, 'Coptic - months in year 1725');
		equal(cc.monthsInYear(1726), 13, 'Coptic - months in year 1726');
		equal(cc.monthsInYear(1727), 13, 'Coptic - months in year 1727');
		equal(cc.monthsInYear(1728), 13, 'Coptic - months in year 1728');
		equal(cc.leapYear(1724), false, 'Coptic - leap year 1724');
		equal(cc.leapYear(1725), false, 'Coptic - leap year 1725');
		equal(cc.leapYear(1726), false, 'Coptic - leap year 1726');
		equal(cc.leapYear(1727), true, 'Coptic - leap year 1727');
		equal(cc.leapYear(1728), false, 'Coptic - leap year 1728');
		equal(cc.daysInYear(1724), 365, 'Coptic - days in year 1724');
		equal(cc.daysInYear(1725), 365, 'Coptic - days in year 1725');
		equal(cc.daysInYear(1726), 365, 'Coptic - days in year 1726');
		equal(cc.daysInYear(1727), 366, 'Coptic - days in year 1727');
		equal(cc.daysInYear(1728), 365, 'Coptic - days in year 1728');
		for (var m = 1; m <= 13; m++) {
			equal(cc.daysInMonth(1726, m), (m == 13 ? 5 : 30),
				'Coptic - days in month ' + m + ' 1726');
		}
		equal(cc.epoch(2000), 'AM', 'Coptic - epoch 2000');
		equal(cc.epoch(-2000), 'BAM', 'Coptic - epoch -2000');
		var date = cc.newDate(2000, 13, 5);
		equal(cc.weekOfYear(date), 52, 'Coptic - week ' + date);
		date = cc.newDate(2001, 1, 1);
		equal(cc.weekOfYear(date), 52, 'Coptic - week ' + date);
		date = cc.newDate(2001, 1, 2);
		equal(cc.weekOfYear(date), 1, 'Coptic - week ' + date);
		date = cc.newDate(2001, 1, 8);
		equal(cc.weekOfYear(date), 1, 'Coptic - week ' + date);
	});

	test('Coptic days', function() {
		expect(29);
		var cc = $.calendars.instance('Coptic');
		var d = cc.newDate(1726, 2, 5);
		equal(d.year(), 1726, 'Coptic - year');
		equal(d.month(), 2, 'Coptic - month');
		equal(d.day(), 5, 'Coptic - day');
		equal(d.leapYear(), false, 'Coptic - leap year');
		equal(d.formatYear(), '1726', 'Coptic - format year');
		equal(d.dayOfWeek(), 4, 'Coptic - day of week');
		equal(d.weekDay(), true, 'Coptic - week day');
		equal(d.dayOfYear(), 35, 'Coptic - day of year');
		equal(d.toJD(), 2455119.5, 'Coptic - Julian date');
		equalDate(d.toJSDate(), new Date(2009, 10 - 1, 15), 'Coptic - JS Date');
		d.date(1727, 8, 16);
		equal(d.year(), 1727, 'Coptic - year');
		equal(d.month(), 8, 'Coptic - month');
		equal(d.day(), 16, 'Coptic - day');
		equal(d.leapYear(), true, 'Coptic - leap year');
		equal(d.formatYear(), '1727', 'Coptic - format year');
		equal(d.dayOfWeek(), 0, 'Coptic - day of week');
		equal(d.weekDay(), false, 'Coptic - week day');
		equal(d.dayOfYear(), 226, 'Coptic - day of year');
		equal(d.toJD(), 2455675.5, 'Coptic - Julian date');
		equalDate(d.toJSDate(), new Date(2011, 4 - 1, 24), 'Coptic - JS Date');
		d = cc.today();
		var today = new Date();
		equalDate(d.toJSDate(), today, 'Coptic - today');
		equal(cc.isValid(1727, 1, 1), true, 'Coptic - valid 01/01/1727');
		equal(cc.isValid(1727, 13, 6), true, 'Coptic - valid 06/13/1727');
		equal(cc.isValid(-1, 0, 0), false, 'Coptic - valid 00/00/-0001');
		equal(cc.isValid(0, 0, 0), false, 'Coptic - valid 00/00/0000');
		equal(cc.isValid(1726, -1, 28), false, 'Coptic - valid 28/-1/1726');
		equal(cc.isValid(1726, 13, 6), false, 'Coptic - valid 06/13/1726');
		equal(cc.isValid(1726, 2, -1), false, 'Coptic - valid -1/02/1726');
		equal(cc.isValid(1726, 2, 88), false, 'Coptic - valid 88/02/1726');
	});

	test('Coptic vs Julian Date', function() {
		expect(48);
		var cc = $.calendars.instance('Coptic');
		var tests = [[-25, 13, 5, 1816262.5], [-24, 1, 1, 1816263.5],
			[-23, 13, 5, 1816992.5], [-22, 1, 1, 1816993.5],
			[-22, 13, 6, 1817358.5], [-21, 1, 1, 1817359.5],
			[-21, 13, 5, 1817723.5], [-20, 1, 1, 1817724.5],
			[-1, 13, 5, 1825028.5], [1, 1, 1, 1825029.5],
			[2, 13, 5, 1825758.5], [3, 1, 1, 1825759.5],
			[3, 13, 6, 1826124.5], [4, 1, 1, 1826125.5],
			[4, 13, 5, 1826489.5], [5, 1, 1, 1826490.5],
			[1720, 13, 5, 2453258.5], [1721, 1, 1, 2453259.5],
			[1722, 13, 5, 2453988.5], [1723, 1, 1, 2453989.5],
			[1723, 13, 6, 2454354.5], [1724, 1, 1, 2454355.5],
			[1724, 13, 5, 2454719.5], [1725, 1, 1, 2454720.5]];
		// http://emr.cs.iit.edu/home/reingold/calendar-book/Calendrica.html
		for (var i = 0; i < tests.length; i++) {
			date = cc.newDate(tests[i][0], tests[i][1], tests[i][2]);
			equal(date.toJD(), tests[i][3], 'Coptic - to Julian ' + date);
			equalCDate(cc.fromJD(tests[i][3]), date, 'Coptic - from Julian ' + date);
		}
	});

	test('Coptic add', function() {
		expect(9);
		var cc = $.calendars.instance('Coptic');
		var d = cc.newDate(1726, 1, 2);
		d.add(1, 'y');
		equalCDate(d, cc.newDate(1727, 1, 2), 'Coptic - add 1 y');
		d.add(-2, 'y');
		equalCDate(d, cc.newDate(1725, 1, 2), 'Coptic - add -2 y');
		d.add(1, 'm');
		equalCDate(d, cc.newDate(1725, 2, 2), 'Coptic - add 1 m');
		d.add(-2, 'm');
		equalCDate(d, cc.newDate(1724, 13, 2), 'Coptic - add -2 m');
		d.add(1, 'w');
		equalCDate(d, cc.newDate(1725, 1, 4), 'Coptic - add 1 w');
		d.add(-2, 'w');
		equalCDate(d, cc.newDate(1724, 12, 25), 'Coptic - add -2 w');
		d.add(1, 'd');
		equalCDate(d, cc.newDate(1724, 12, 26), 'Coptic - add 1 d');
		d.add(-2, 'd');
		equalCDate(d, cc.newDate(1724, 12, 24), 'Coptic - add -2 d');
		d.add(1, 'd').add(1, 'w').add(1, 'm').add(1, 'y');
		equalCDate(d, cc.newDate(1726, 1, 2), 'Coptic - add 1 d, 1 w, 1 m, 1 y');
	});

	test('Coptic compare', function() {
		expect(7);
		var cc = $.calendars.instance('Coptic');
		var d1 = cc.newDate(1726, 1, 2);
		var d2 = cc.newDate(1726, 1, 5);
		equal(d1.compareTo(d2), -1, 'Coptic compare - 02/01/1726 - 05/01/1726');
		equal(d2.compareTo(d1), +1, 'Coptic compare - 05/01/1726 - 02/01/1726');
		equal(d1.compareTo(d1), 0, 'Coptic compare - 02/01/1726 - 02/01/1726');
		d2 = cc.newDate(1726, 2, 2);
		equal(d1.compareTo(d2), -1, 'Coptic compare - 02/01/1726 - 02/02/1726');
		equal(d2.compareTo(d1), +1, 'Coptic compare - 02/02/1726 - 02/01/1726');
		d2 = cc.newDate(1727, 1, 2);
		equal(d1.compareTo(d2), -1, 'Coptic compare - 02/01/1726 - 02/01/1727');
		equal(d2.compareTo(d1), +1, 'Coptic compare - 02/01/1727 - 02/01/1726');
	});

	module('Nepali'); // http://www.ashesh.com.np/nepali-calendar/

	test('Nepali calendar', function() {
		expect(29);
		var nc = $.calendars.instance('Nepali');
		equal(nc.monthsInYear(2070), 12, 'Nepali - months in year 2070');
		equal(nc.monthsInYear(2071), 12, 'Nepali - months in year 2071');
		equal(nc.monthsInYear(2072), 12, 'Nepali - months in year 2072');
		equal(nc.monthsInYear(2073), 12, 'Nepali - months in year 2073');
		equal(nc.monthsInYear(2074), 12, 'Nepali - months in year 2074');
		equal(nc.leapYear(2070), false, 'Nepali - leap year 2070');
		equal(nc.leapYear(2071), false, 'Nepali - leap year 2071');
		equal(nc.leapYear(2072), false, 'Nepali - leap year 2072');
		equal(nc.leapYear(2073), true, 'Nepali - leap year 2073');
		equal(nc.leapYear(2074), false, 'Nepali - leap year 2074');
		equal(nc.daysInYear(2070), 365, 'Nepali - days in year 2070');
		equal(nc.daysInYear(2071), 365, 'Nepali - days in year 2071');
		equal(nc.daysInYear(2072), 365, 'Nepali - days in year 2072');
		equal(nc.daysInYear(2073), 366, 'Nepali - days in year 2703');
		equal(nc.daysInYear(2074), 365, 'Nepali - days in year 2074');
		equal(nc.daysInMonth(2070, 1), 31, 'Nepali - days in month Baisakh 2070');
		equal(nc.daysInMonth(2070, 2), 31, 'Nepali - days in month Jestha 2070');
		equal(nc.daysInMonth(2070, 3), 31, 'Nepali - days in month Ashadh 2070');
		equal(nc.daysInMonth(2070, 4), 32, 'Nepali - days in month Shrawan 2070');
		equal(nc.daysInMonth(2070, 5), 31, 'Nepali - days in month Bhadra 2070');
		equal(nc.daysInMonth(2070, 6), 31, 'Nepali - days in month Ashwin 2070');
		equal(nc.daysInMonth(2070, 7), 29, 'Nepali - days in month Kartik 2070');
		equal(nc.daysInMonth(2070, 8), 30, 'Nepali - days in month Mangsir 2070');
		equal(nc.daysInMonth(2070, 9), 30, 'Nepali - days in month Paush 2070');
		equal(nc.daysInMonth(2070, 10), 29, 'Nepali - days in month Mangh 2070');
		equal(nc.daysInMonth(2070, 11), 30, 'Nepali - days in month Falgun 2070');
		equal(nc.daysInMonth(2070, 12), 30, 'Nepali - days in month Chaitra 2070');
		equal(nc.epoch(2000), 'ABS', 'Nepali - epoch 2000');
		equal(nc.epoch(-2000), 'BBS', 'Nepali - epoch -2000');
	});

	test('Nepali days', function() {
		expect(39);
		var nc = $.calendars.instance('Nepali');
		var d = nc.newDate(2072, 1, 5);
		equal(d.year(), 2072, 'Nepali - year');
		equal(d.month(), 1, 'Nepali - month');
		equal(d.day(), 5, 'Nepali - day');
		equal(d.leapYear(), false, 'Nepali - leap year');
		equal(d.formatYear(), '2072', 'Nepali - format year');
		equal(d.dayOfWeek(), 6, 'Nepali - day of week');
		equal(d.weekDay(), false, 'Nepali - week day');
		equal(d.dayOfYear(), 5, 'Nepali - day of year');
		equal(d.toJD(), 2457130.5, 'Nepali - Julian date');
		equalDate(d.toJSDate(), new Date(2015, 4 - 1, 18), 'Nepali - JS Date');
		d.date(2073, 9, 23);
		equal(d.year(), 2073, 'Nepali - year');
		equal(d.month(), 9, 'Nepali - month');
		equal(d.day(), 23, 'Nepali - day');
		equal(d.leapYear(), true, 'Nepali - leap year');
		equal(d.formatYear(), '2073', 'Nepali - format year');
		equal(d.dayOfWeek(), 6, 'Nepali - day of week');
		equal(d.weekDay(), false, 'Nepali - week day');
		equal(d.dayOfYear(), 270, 'Nepali - day of year');
		equal(d.toJD(), 2457760.5, 'Nepali - Julian date');
		equalDate(d.toJSDate(), new Date(2017, 1 - 1, 7), 'Nepali - JS Date');
		d.date(2073, 10, 19);
		equal(d.year(), 2073, 'Nepali - year');
		equal(d.month(), 10, 'Nepali - month');
		equal(d.day(), 19, 'Nepali - day');
		equal(d.leapYear(), true, 'Nepali - leap year');
		equal(d.formatYear(), '2073', 'Nepali - format year');
		equal(d.dayOfWeek(), 3, 'Nepali - day of week');
		equal(d.weekDay(), true, 'Nepali - week day');
		equal(d.dayOfYear(), 295, 'Nepali - day of year');
		equal(d.toJD(), 2457785.5, 'Nepali - Julian date');
		equalDate(d.toJSDate(), new Date(2017, 2 - 1, 1), 'Nepali - JS Date');
		d = nc.today();
		var today = new Date();
		equalDate(d.toJSDate(), today, 'Nepali - today');
		equal(nc.isValid(2073, 1, 1), true, 'Nepali - valid 01/01/2073');
		equal(nc.isValid(2073, 12, 31), true, 'Nepali - valid 31/12/2073');
		equal(nc.isValid(-1, 1, 1), true, 'Nepali - valid 01/01/-0001');
		equal(nc.isValid(0, 1, 1), false, 'Nepali - valid 01/01/0000');
		equal(nc.isValid(2073, -1, 28), false, 'Nepali - valid 28/-1/2073');
		equal(nc.isValid(2073, 9, 30), false, 'Nepali - valid 30/9/2073');
		equal(nc.isValid(2073, 2, -1), false, 'Nepali - valid -1/02/2073');
		equal(nc.isValid(2073, 2, 88), false, 'Nepali - valid 88/02/2073');
	});

	test('Nepali add', function() {
		expect(9);
		var nc = $.calendars.instance('Nepali');
		var d = nc.newDate(2073, 1, 2);
		d.add(1, 'y');
		equalCDate(d, nc.newDate(2074, 1, 2), 'Nepali - add 1 y');
		d.add(-2, 'y');
		equalCDate(d, nc.newDate(2072, 1, 2), 'Nepali - add -2 y');
		d.add(1, 'm');
		equalCDate(d, nc.newDate(2072, 2, 2), 'Nepali - add 1 m');
		d.add(-2, 'm');
		equalCDate(d, nc.newDate(2071, 12, 2), 'Nepali - add -2 m');
		d.add(1, 'w');
		equalCDate(d, nc.newDate(2071, 12, 9), 'Nepali - add 1 w');
		d.add(-2, 'w');
		equalCDate(d, nc.newDate(2071, 11, 25), 'Nepali - add -2 w');
		d.add(1, 'd');
		equalCDate(d, nc.newDate(2071, 11, 26), 'Nepali - add 1 d');
		d.add(-2, 'd');
		equalCDate(d, nc.newDate(2071, 11, 24), 'Nepali - add -2 d');
		d.add(1, 'd').add(1, 'w').add(1, 'm').add(1, 'y');
		equalCDate(d, nc.newDate(2073, 1, 2), 'Nepali - add 1 d, 1 w, 1 m, 1 y');
	});

	test('Nepali compare', function() {
		expect(7);
		var nc = $.calendars.instance('Nepali');
		var d1 = nc.newDate(2073, 1, 2);
		var d2 = nc.newDate(2073, 1, 5);
		equal(d1.compareTo(d2), -1, 'Nepali compare - 02/01/2073 - 05/01/2073');
		equal(d2.compareTo(d1), +1, 'Nepali compare - 05/01/2073 - 02/01/2073');
		equal(d1.compareTo(d1), 0, 'Nepali compare - 02/01/2073 - 02/01/2073');
		d2 = nc.newDate(2073, 2, 2);
		equal(d1.compareTo(d2), -1, 'Nepali compare - 02/01/2073 - 02/02/2073');
		equal(d2.compareTo(d1), +1, 'Nepali compare - 02/02/2073 - 02/01/2073');
		d2 = nc.newDate(2074, 1, 2);
		equal(d1.compareTo(d2), -1, 'Nepali compare - 02/01/2073 - 02/01/2074');
		equal(d2.compareTo(d1), +1, 'Nepali compare - 02/01/2074 - 02/01/2073');
	});

	module('Mayan');

	test('Mayan calendar', function() {
		expect(35);
		var mc = $.calendars.instance('Mayan');
		equal(mc.monthsInYear(5195), 18, 'Mayan - months in year 5195');
		equal(mc.monthsInYear(5196), 18, 'Mayan - months in year 5196');
		equal(mc.monthsInYear(5197), 18, 'Mayan - months in year 5197');
		equal(mc.monthsInYear(5198), 18, 'Mayan - months in year 5198');
		equal(mc.monthsInYear(5199), 18, 'Mayan - months in year 5199');
		equal(mc.leapYear(5195), false, 'Mayan - leap year 5195');
		equal(mc.leapYear(5196), false, 'Mayan - leap year 5196');
		equal(mc.leapYear(5197), false, 'Mayan - leap year 5197');
		equal(mc.leapYear(5198), false, 'Mayan - leap year 5198');
		equal(mc.leapYear(5199), false, 'Mayan - leap year 5199');
		equal(mc.daysInYear(5195), 360, 'Mayan - days in year 5195');
		equal(mc.daysInYear(5186), 360, 'Mayan - days in year 5196');
		equal(mc.daysInYear(5197), 360, 'Mayan - days in year 5197');
		equal(mc.daysInYear(5198), 360, 'Mayan - days in year 5198');
		equal(mc.daysInYear(5199), 360, 'Mayan - days in year 5199');
		for (var m = 0; m < 18; m++) {
			equal(mc.daysInMonth(5195, m), 20, 'Mayan - days in month ' + m + ' 5195');
		}
		equal(mc.epoch(2000), '', 'Mayan - epoch 2000');
		equal(mc.epoch(-2000), '', 'Mayan - epoch -2000');
	});

	test('Mayan days', function() {
		expect(41);
		var mc = $.calendars.instance('Mayan');
		var d = mc.newDate(5195, 1, 5);
		equal(d.year(), 5195, 'Mayan - year');
		equal(d.month(), 1, 'Mayan - month');
		equal(d.day(), 5, 'Mayan - day');
		equal(d.leapYear(), false, 'Mayan - leap year');
		equal(d.formatYear(), '12.19.15', 'Mayan - format year');
		equal(d.dayOfWeek(), 5, 'Mayan - day of week');
		equal(d.weekDay(), true, 'Mayan - week day');
		equal(d.dayOfYear(), 26, 'Mayan - day of year');
		equal(d.toJD(), 2454507.5, 'Mayan - Julian date');
		equalDate(d.toJSDate(), new Date(2008, 2 - 1, 11), 'Mayan - JS Date');
		equal(d.extraInfo().tzolkinDayName, 'Chicchan', 'Mayan - tzolkin day name');
		equal(d.extraInfo().tzolkinDay, 5, 'Mayan - tzolkin day');
		equal(d.extraInfo().tzolkinTrecena, 10, 'Mayan - tzolkin trecena');
		equal(d.extraInfo().haabMonthName, 'Pax', 'Mayan - haab month name');
		equal(d.extraInfo().haabMonth, 16, 'Mayan - haab month');
		equal(d.extraInfo().haabDay, 13, 'Mayan - haab day');
		d.date(5198, 17, 19);
		equal(d.year(), 5198, 'Mayan - year');
		equal(d.month(), 17, 'Mayan - month');
		equal(d.day(), 19, 'Mayan - day');
		equal(d.leapYear(), false, 'Mayan - leap year');
		equal(d.formatYear(), '12.19.18', 'Mayan - format year');
		equal(d.dayOfWeek(), 19, 'Mayan - day of week');
		equal(d.weekDay(), true, 'Mayan - week day');
		equal(d.dayOfYear(), 360, 'Mayan - day of year');
		equal(d.toJD(), 2455921.5, 'Mayan - Julian date');
		equalDate(d.toJSDate(), new Date(2011, 12 - 1, 26), 'Mayan - JS Date');
		equal(d.extraInfo().tzolkinDayName, 'Cauac', 'Mayan - tzolkin day name');
		equal(d.extraInfo().tzolkinDay, 19, 'Mayan - tzolkin day');
		equal(d.extraInfo().tzolkinTrecena, 7, 'Mayan - tzolkin trecena');
		equal(d.extraInfo().haabMonthName, 'Kankin', 'Mayan - haab month name');
		equal(d.extraInfo().haabMonth, 14, 'Mayan - haab month');
		equal(d.extraInfo().haabDay, 7, 'Mayan - haab day');
		d = mc.today();
		var today = new Date();
		equalDate(d.toJSDate(), today, 'Mayan - today');
		equal(mc.isValid(5198, 0, 0), true, 'Mayan - valid 00/00/5198');
		equal(mc.isValid(5198, 1, 0), true, 'Mayan - valid 00/01/5198');
		equal(mc.isValid(-1, 0, 0), true, 'Mayan - valid 00/00/-0001');
		equal(mc.isValid(0, 0, 0), true, 'Mayan - valid 00/00/0000');
		equal(mc.isValid(5198, -1, 28), false, 'Mayan - valid 28/-1/5198');
		equal(mc.isValid(5198, 20, 28), false, 'Mayan - valid 28/20/5198');
		equal(mc.isValid(5198, 2, -1), false, 'Mayan - valid -1/02/5198');
		equal(mc.isValid(5198, 2, 88), false, 'Mayan - valid 88/02/5198');
	});

	test('Mayan add', function() {
		expect(9);
		var mc = $.calendars.instance('Mayan');
		var d = mc.newDate(5196, 0, 2);
		d.add(1, 'y');
		equalCDate(d, mc.newDate(5197, 0, 2), 'Mayan - add 1 y');
		d.add(-2, 'y');
		equalCDate(d, mc.newDate(5195, 0, 2), 'Mayan - add -2 y');
		d.add(1, 'm');
		equalCDate(d, mc.newDate(5195, 1, 2), 'Mayan - add 1 m');
		d.add(-2, 'm');
		equalCDate(d, mc.newDate(5194, 17, 2), 'Mayan - add -2 m');
		d.add(1, 'w');
		equalCDate(d, mc.newDate(5194, 17, 7), 'Mayan - add 1 w');
		d.add(-2, 'w');
		equalCDate(d, mc.newDate(5194, 16, 17), 'Mayan - add -2 w');
		d.add(1, 'd');
		equalCDate(d, mc.newDate(5194, 16, 18), 'Mayan - add 1 d');
		d.add(-2, 'd');
		equalCDate(d, mc.newDate(5194, 16, 16), 'Mayan - add -2 d');
		d.add(1, 'd').add(1, 'w').add(1, 'm').add(1, 'y');
		equalCDate(d, mc.newDate(5196, 0, 2), 'Mayan - add 1 d, 1 w, 1 m, 1 y');
	});

	test('Mayan compare', function() {
		expect(7);
		var mc = $.calendars.instance('Mayan');
		var d1 = mc.newDate(5196, 1, 2);
		var d2 = mc.newDate(5196, 1, 5);
		equal(d1.compareTo(d2), -1, 'Mayan compare - 02/01/5196 - 05/01/5196');
		equal(d2.compareTo(d1), +1, 'Mayan compare - 05/01/5196 - 02/01/5196');
		equal(d1.compareTo(d1), 0, 'Mayan compare - 02/01/5196 - 02/01/5196');
		d2 = mc.newDate(5196, 2, 2);
		equal(d1.compareTo(d2), -1, 'Mayan compare - 02/01/5196 - 02/02/5196');
		equal(d2.compareTo(d1), +1, 'Mayan compare - 02/02/5196 - 02/01/5196');
		d2 = mc.newDate(5197, 1, 2);
		equal(d1.compareTo(d2), -1, 'Mayan compare - 02/01/5196 - 02/01/5197');
		equal(d2.compareTo(d1), +1, 'Mayan compare - 02/01/5197 - 02/01/5196');
	});

	test('Mayan for year', function() {
		expect(15);
		var mc = $.calendars.instance('Mayan');
		equal(mc.forYear('0.0.0'), 0, 'Mayan for year - 0.0.0');
		equal(mc.forYear('0.0.1'), 1, 'Mayan for year - 0.0.1');
		equal(mc.forYear('0.1.0'), 20, 'Mayan for year - 0.1.0');
		equal(mc.forYear('0.3.4'), 64, 'Mayan for year - 0.2.4');
		equal(mc.forYear('1.0.0'), 400, 'Mayan for year - 1.0.0');
		equal(mc.forYear('10.9.8'), 4188, 'Mayan for year - 10.9.8');
		equal(mc.forYear('19.19.19'), 7999, 'Mayan for year - 19.19.19');
		var expectError = function(years) {
			try {
				var y = mc.forYear(years);
				ok(false, 'Mayan for year - ' + years + ' - ' + y + ' - accepted in error');
			}
			catch (e) {
				ok(e == 'Invalid Mayan year', 'Mayan for year - ' + years + ' - ' + e);
			}
		};
		expectError('0.0.20');
		expectError('0.20.0');
		expectError('20.0.0');
		expectError('0.0.-2');
		expectError('0.-2.0');
		expectError('-20.0.0');
		expectError('1.2');
		expectError('1 2 3');
	});

	module('Nanakshahi');

	test('Nanakshahi calendar', function() {
		expect(45);
		var nc = $.calendars.instance('Nanakshahi');
		equal(nc.monthsInYear(546), 12, 'Nanakshahi - months in year 546');
		equal(nc.monthsInYear(547), 12, 'Nanakshahi - months in year 547');
		equal(nc.monthsInYear(548), 12, 'Nanakshahi - months in year 548');
		equal(nc.monthsInYear(549), 12, 'Nanakshahi - months in year 549');
		equal(nc.monthsInYear(550), 12, 'Nanakshahi - months in year 550');
		equal(nc.leapYear(546), false, 'Nanakshahi - leap year 546');
		equal(nc.leapYear(547), true, 'Nanakshahi - leap year 547');
		equal(nc.leapYear(548), false, 'Nanakshahi - leap year 548');
		equal(nc.leapYear(549), false, 'Nanakshahi - leap year 549');
		equal(nc.leapYear(550), false, 'Nanakshahi - leap year 550');
		equal(nc.leapYear(-1), false, 'Nanakshahi - leap year -1');
		equal(nc.leapYear(-2), true, 'Nanakshahi - leap year -2');
		equal(nc.leapYear(-3), false, 'Nanakshahi - leap year -3');
		equal(nc.daysInYear(546), 365, 'Nanakshahi - days in year 546');
		equal(nc.daysInYear(547), 366, 'Nanakshahi - days in year 547');
		equal(nc.daysInYear(548), 365, 'Nanakshahi - days in year 548');
		equal(nc.daysInYear(549), 365, 'Nanakshahi - days in year 549');
		equal(nc.daysInYear(550), 365, 'Nanakshahi - days in year 550');
		equal(nc.daysInMonth(546, 1), 31, 'Nanakshahi - days in month Chet 546');
		equal(nc.daysInMonth(546, 2), 31, 'Nanakshahi - days in month Vaisakh 546');
		equal(nc.daysInMonth(546, 3), 31, 'Nanakshahi - days in month Jeth 546');
		equal(nc.daysInMonth(546, 4), 31, 'Nanakshahi - days in month Harh 546');
		equal(nc.daysInMonth(546, 5), 31, 'Nanakshahi - days in month Sawan 546');
		equal(nc.daysInMonth(546, 6), 30, 'Nanakshahi - days in month Bhadon 546');
		equal(nc.daysInMonth(546, 7), 30, 'Nanakshahi - days in month Assu 546');
		equal(nc.daysInMonth(546, 8), 30, 'Nanakshahi - days in month Katak 546');
		equal(nc.daysInMonth(546, 9), 30, 'Nanakshahi - days in month Maghar 546');
		equal(nc.daysInMonth(546, 10), 30, 'Nanakshahi - days in month Poh 546');
		equal(nc.daysInMonth(546, 11), 30, 'Nanakshahi - days in month Magh 546');
		equal(nc.daysInMonth(546, 12), 30, 'Nanakshahi - days in month Phagun 546');
		equal(nc.daysInMonth(547, 1), 31, 'Nanakshahi - days in month Chet 547');
		equal(nc.daysInMonth(547, 2), 31, 'Nanakshahi - days in month Vaisakh 547');
		equal(nc.daysInMonth(547, 3), 31, 'Nanakshahi - days in month Jeth 547');
		equal(nc.daysInMonth(547, 4), 31, 'Nanakshahi - days in month Harh 547');
		equal(nc.daysInMonth(547, 5), 31, 'Nanakshahi - days in month Sawan 547');
		equal(nc.daysInMonth(547, 6), 30, 'Nanakshahi - days in month Bhadon 547');
		equal(nc.daysInMonth(547, 7), 30, 'Nanakshahi - days in month Assu 547');
		equal(nc.daysInMonth(547, 8), 30, 'Nanakshahi - days in month Katak 547');
		equal(nc.daysInMonth(547, 9), 30, 'Nanakshahi - days in month Maghar 547');
		equal(nc.daysInMonth(547, 10), 30, 'Nanakshahi - days in month Poh 547');
		equal(nc.daysInMonth(547, 11), 30, 'Nanakshahi - days in month Magh 547');
		equal(nc.daysInMonth(547, 12), 31, 'Nanakshahi - days in month Phagun 547');
		equal(nc.daysInWeek(), 7, 'Nanakshahi - days in week');
		equal(nc.epoch(2000), 'AN', 'Nanakshahi - epoch 2000');
		equal(nc.epoch(-2000), 'BN', 'Nanakshahi - epoch -2000');
	});

	test('Nanakshahi days', function() {
		expect(29);
		var nc = $.calendars.instance('Nanakshahi');
		var d = nc.newDate(545, 1, 5);
		equal(d.year(), 545, 'Nanakshahi - year');
		equal(d.month(), 1, 'Nanakshahi - month');
		equal(d.day(), 5, 'Nanakshahi - day');
		equal(d.leapYear(), false, 'Nanakshahi - leap year');
		equal(d.dayOfWeek(), 1, 'Nanakshahi - day of week');
		equal(d.weekDay(), true, 'Nanakshahi - week day');
		equal(d.dayOfYear(), 5, 'Nanakshahi - day of year');
		equal(d.toJD(), 2456369.5, 'Nanakshahi - Julian date');
		equalDate(d.toJSDate(), new Date(2013, 3 - 1, 18), 'Nanakshahi - JS Date');
		d.date(547, 10, 19);
		equal(d.year(), 547, 'Nanakshahi - year');
		equal(d.month(), 10, 'Nanakshahi - month');
		equal(d.day(), 19, 'Nanakshahi - day');
		equal(d.leapYear(), true, 'Nanakshahi - leap year');
		equal(d.dayOfWeek(), 5, 'Nanakshahi - day of week');
		equal(d.weekDay(), true, 'Nanakshahi - week day');
		equal(d.dayOfYear(), 294, 'Nanakshahi - day of year');
		equal(d.toJD(), 2457388.5, 'Nanakshahi - Julian date');
		equalDate(d.toJSDate(), new Date(2016, 1 - 1, 1), 'Nanakshahi - JS Date');
		d = nc.today();
		var today = new Date();
		equalDate(d.toJSDate(), today, 'Nanakshahi - today');
		equal(nc.isValid(545, 12, 30), true, 'Nanakshahi - valid 30/12/0547');
		equal(nc.isValid(545, 12, 31), false, 'Nanakshahi - valid 31/12/0547');
		equal(nc.isValid(547, 12, 30), true, 'Nanakshahi - valid 30/12/0547');
		equal(nc.isValid(547, 12, 31), true, 'Nanakshahi - valid 31/12/0547');
		equal(nc.isValid(-1, 12, 30), true, 'Nanakshahi - valid 30/12/-0001');
		equal(nc.isValid(0, 12, 30), false, 'Nanakshahi - valid 30/12/0000');
		equal(nc.isValid(545, -1, 28), false, 'Nanakshahi - valid 28/-1/0545');
		equal(nc.isValid(545, 14, 28), false, 'Nanakshahi - valid 28/14/0545');
		equal(nc.isValid(545, 2, -1), false, 'Nanakshahi - valid -1/02/0545');
		equal(nc.isValid(545, 2, 88), false, 'Nanakshahi - valid 88/02/0545');
	});

	test('Nanakshahi add', function() {
		expect(12);
		var nc = $.calendars.instance('Nanakshahi');
		var d = nc.newDate(545, 1, 2);
		d.add(1, 'y');
		equalCDate(d, nc.newDate(546, 1, 2), 'Nanakshahi - add 1 y');
		d.add(-2, 'y');
		equalCDate(d, nc.newDate(544, 1, 2), 'Nanakshahi - add -2 y');
		d.add(1, 'm');
		equalCDate(d, nc.newDate(544, 2, 2), 'Nanakshahi - add 1 m');
		d.add(-2, 'm');
		equalCDate(d, nc.newDate(543, 12, 2), 'Nanakshahi - add -2 m');
		d.add(1, 'w');
		equalCDate(d, nc.newDate(543, 12, 9), 'Nanakshahi - add 1 w');
		d.add(-2, 'w');
		equalCDate(d, nc.newDate(543, 11, 25), 'Nanakshahi - add -2 w');
		d.add(1, 'd');
		equalCDate(d, nc.newDate(543, 11, 26), 'Nanakshahi - add 1 d');
		d.add(-2, 'd');
		equalCDate(d, nc.newDate(543, 11, 24), 'Nanakshahi - add -2 d');
		d.add(1, 'd').add(1, 'w').add(1, 'm').add(1, 'y');
		equalCDate(d, nc.newDate(545, 1, 2), 'Nanakshahi - add 1 d, 1 w, 1 m, 1 y');
		d.date(547, 12, 20).add(2, 'w');
		equalCDate(d, nc.newDate(548, 1, 3), 'Nanakshahi - add 2 w over leap day');
		d.date(547, 11, 30).add(1, 'm');
		equalCDate(d, nc.newDate(547, 12, 30), 'Nanakshahi - add 1 m for leap day');
		d.date(547, 12, 31).add(1, 'y');
		equalCDate(d, nc.newDate(548, 12, 30), 'Nanakshahi - add 1 y to leap day');
	});

	test('Nanakshahi compare', function() {
		expect(7);
		var nc = $.calendars.instance('Nanakshahi');
		var d1 = nc.newDate(545, 1, 2);
		var d2 = nc.newDate(545, 1, 5);
		equal(d1.compareTo(d2), -1, 'Nanakshahi compare - 02/01/0545 - 05/01/0545');
		equal(d2.compareTo(d1), +1, 'Nanakshahi compare - 05/01/0545 - 02/01/0545');
		equal(d1.compareTo(d1), 0, 'Nanakshahi compare - 02/01/0545 - 02/01/0545');
		d2 = nc.newDate(545, 2, 2);
		equal(d1.compareTo(d2), -1, 'Nanakshahi compare - 02/01/0545 - 02/02/0545');
		equal(d2.compareTo(d1), +1, 'Nanakshahi compare - 02/02/0545 - 02/01/0545');
		d2 = nc.newDate(546, 1, 2);
		equal(d1.compareTo(d2), -1, 'Nanakshahi compare - 02/01/0545 - 02/01/0546');
		equal(d2.compareTo(d1), +1, 'Nanakshahi compare - 02/01/0546 - 02/01/0545');
	});

	module('Discworld');

	test('Discworld calendar', function() {
		expect(48);
		var dc = $.calendars.instance('Discworld');
		equal(dc.monthsInYear(2015), 13, 'Discworld - months in year 2015');
		equal(dc.monthsInYear(2016), 13, 'Discworld - months in year 2016');
		equal(dc.monthsInYear(2017), 13, 'Discworld - months in year 2017');
		equal(dc.monthsInYear(2018), 13, 'Discworld - months in year 2018');
		equal(dc.monthsInYear(2019), 13, 'Discworld - months in year 2019');
		equal(dc.leapYear(2015), false, 'Discworld - leap year 2015');
		equal(dc.leapYear(2016), false, 'Discworld - leap year 2016');
		equal(dc.leapYear(2017), false, 'Discworld - leap year 2017');
		equal(dc.leapYear(2018), false, 'Discworld - leap year 2018');
		equal(dc.leapYear(2019), false, 'Discworld - leap year 2019');
		equal(dc.daysInYear(2015), 400, 'Discworld - days in year 2015');
		equal(dc.daysInYear(2016), 400, 'Discworld - days in year 2016');
		equal(dc.daysInYear(2017), 400, 'Discworld - days in year 2017');
		equal(dc.daysInYear(2018), 400, 'Discworld - days in year 2018');
		equal(dc.daysInYear(2019), 400, 'Discworld - days in year 2019');
		equal(dc.daysInMonth(2015, 1), 16, 'Discworld - days in month Ick 2015');
		equal(dc.daysInMonth(2015, 2), 32, 'Discworld - days in month Offle 2015');
		equal(dc.daysInMonth(2015, 3), 32, 'Discworld - days in month February 2015');
		equal(dc.daysInMonth(2015, 4), 32, 'Discworld - days in month March 2015');
		equal(dc.daysInMonth(2015, 5), 32, 'Discworld - days in month April 2015');
		equal(dc.daysInMonth(2015, 6), 32, 'Discworld - days in month May 2015');
		equal(dc.daysInMonth(2015, 7), 32, 'Discworld - days in month June 2015');
		equal(dc.daysInMonth(2015, 8), 32, 'Discworld - days in month Grune 2015');
		equal(dc.daysInMonth(2015, 9), 32, 'Discworld - days in month August 2015');
		equal(dc.daysInMonth(2015, 10), 32, 'Discworld - days in month Spune 2015');
		equal(dc.daysInMonth(2015, 11), 32, 'Discworld - days in month Sektober 2015');
		equal(dc.daysInMonth(2015, 12), 32, 'Discworld - days in month Ember 2015');
		equal(dc.daysInMonth(2015, 13), 32, 'Discworld - days in month December 2015');
		equal(dc.daysInMonth(2016, 1), 16, 'Discworld - days in month Ick 2016');
		equal(dc.daysInMonth(2016, 2), 32, 'Discworld - days in month Offle 2016');
		equal(dc.daysInMonth(2016, 3), 32, 'Discworld - days in month February 2016');
		equal(dc.daysInMonth(2016, 4), 32, 'Discworld - days in month March 2016');
		equal(dc.daysInMonth(2016, 5), 32, 'Discworld - days in month April 2016');
		equal(dc.daysInMonth(2016, 6), 32, 'Discworld - days in month May 2016');
		equal(dc.daysInMonth(2016, 7), 32, 'Discworld - days in month June 2016');
		equal(dc.daysInMonth(2016, 8), 32, 'Discworld - days in month Grune 2016');
		equal(dc.daysInMonth(2016, 9), 32, 'Discworld - days in month August 2016');
		equal(dc.daysInMonth(2016, 10), 32, 'Discworld - days in month Spune 2016');
		equal(dc.daysInMonth(2016, 11), 32, 'Discworld - days in month Sektober 2016');
		equal(dc.daysInMonth(2016, 12), 32, 'Discworld - days in month Ember 2016');
		equal(dc.daysInMonth(2016, 13), 32, 'Discworld - days in month December 2016');
		equal(dc.daysInWeek(), 8, 'Discworld - days in week');
		equal(dc.epoch(2000), 'UC', 'Discworld - epoch 2000');
		equal(dc.epoch(-2000), 'BUC', 'Discworld - epoch -2000');
		equal(dc.newDate(1840, 1, 1).extraInfo().century, '', 'Discworld - century 1840'); 
		equal(dc.newDate(1915, 1, 1).extraInfo().century, 'Fruitbat', 'Discworld - century 1915'); 
		equal(dc.newDate(2000, 1, 1).extraInfo().century, 'Fruitbat', 'Discworld - century 2000'); 
		equal(dc.newDate(2001, 1, 1).extraInfo().century, 'Anchovy', 'Discworld - century 2001'); 
	});

	test('Discworld days', function() {
		expect(33);
		var dc = $.calendars.instance('Discworld');
		var d = dc.newDate(1915, 1, 5);
		equal(d.year(), 1915, 'Discworld - year');
		equal(d.month(), 1, 'Discworld - month');
		equal(d.day(), 5, 'Discworld - day');
		equal(d.leapYear(), false, 'Discworld - leap year');
		equal(d.dayOfWeek(), 6, 'Discworld - day of week');
		equal(d.weekDay(), true, 'Discworld - week day');
		equal(d.dayOfYear(), 5, 'Discworld - day of year');
		equal(d.toJD(), 2487029.5, 'Discworld - Julian date');
		equalDate(d.toJSDate(), new Date(2097, 2 - 1, 25), 'Discworld - JS Date');
		d.date(1916, 10, 24);
		equal(d.year(), 1916, 'Discworld - year');
		equal(d.month(), 10, 'Discworld - month');
		equal(d.day(), 24, 'Discworld - day');
		equal(d.leapYear(), false, 'Discworld - leap year');
		equal(d.dayOfWeek(), 1, 'Discworld - day of week');
		equal(d.weekDay(), false, 'Discworld - week day');
		equal(d.dayOfYear(), 296, 'Discworld - day of year');
		equal(d.toJD(), 2487720.5, 'Discworld - Julian date');
		equalDate(d.toJSDate(), new Date(2099, 1 - 1, 17), 'Discworld - JS Date');
		d = dc.today();
		var today = new Date();
		equalDate(d.toJSDate(), today, 'Discworld - today');
		equal(dc.isValid(1915, 1, 16), true, 'Discworld - valid 16/01/1915');
		equal(dc.isValid(1915, 1, 17), false, 'Discworld - valid 17/02/1915');
		equal(dc.isValid(1915, 12, 29), true, 'Discworld - valid 29/12/1915');
		equal(dc.isValid(1915, 12, 33), false, 'Discworld - valid 33/12/1915');
		equal(dc.isValid(1915, 13, 3), true, 'Discworld - valid 03/13/1915');
		equal(dc.isValid(1916, 12, 29), true, 'Discworld - valid 29/12/1916');
		equal(dc.isValid(1916, 12, 32), true, 'Discworld - valid 32/12/1916');
		equal(dc.isValid(1916, 13, 3), true, 'Discworld - valid 03/13/1916');
		equal(dc.isValid(-1, 12, 29), true, 'Discworld - valid 29/12/-0001');
		equal(dc.isValid(0, 12, 29), false, 'Discworld - valid 29/12/0000');
		equal(dc.isValid(1916, -1, 28), false, 'Discworld - valid 28/-1/1916');
		equal(dc.isValid(1916, 14, 28), false, 'Discworld - valid 28/14/1916');
		equal(dc.isValid(1916, 2, -1), false, 'Discworld - valid -1/02/1916');
		equal(dc.isValid(1916, 2, 88), false, 'Discworld - valid 88/02/1916');
	});

	test('Discworld add', function() {
		expect(9);
		var dc = $.calendars.instance('Discworld');
		var d = dc.newDate(1915, 1, 2);
		d.add(1, 'y');
		equalCDate(d, dc.newDate(1916, 1, 2), 'Discworld - add 1 y');
		d.add(-2, 'y');
		equalCDate(d, dc.newDate(1914, 1, 2), 'Discworld - add -2 y');
		d.add(1, 'm');
		equalCDate(d, dc.newDate(1914, 2, 2), 'Discworld - add 1 m');
		d.add(-2, 'm');
		equalCDate(d, dc.newDate(1913, 13, 2), 'Discworld - add -2 m');
		d.add(1, 'w');
		equalCDate(d, dc.newDate(1913, 13, 10), 'Discworld - add 1 w');
		d.add(-2, 'w');
		equalCDate(d, dc.newDate(1913, 12, 26), 'Discworld - add -2 w');
		d.add(1, 'd');
		equalCDate(d, dc.newDate(1913, 12, 27), 'Discworld - add 1 d');
		d.add(-2, 'd');
		equalCDate(d, dc.newDate(1913, 12, 25), 'Discworld - add -2 d');
		d.add(1, 'd').add(1, 'w').add(1, 'm').add(1, 'y');
		equalCDate(d, dc.newDate(1915, 1, 2), 'Discworld - add 1 d, 1 w, 1 m, 1 y');
	});

	test('Discworld compare', function() {
		expect(7);
		var dc = $.calendars.instance('Discworld');
		var d1 = dc.newDate(1915, 1, 2);
		var d2 = dc.newDate(1915, 1, 5);
		equal(d1.compareTo(d2), -1, 'Discworld compare - 02/01/1915 - 05/01/1915');
		equal(d2.compareTo(d1), +1, 'Discworld compare - 05/01/1915 - 02/01/1915');
		equal(d1.compareTo(d1), 0, 'Discworld compare - 02/01/1915 - 02/01/1915');
		d2 = dc.newDate(1915, 2, 2);
		equal(d1.compareTo(d2), -1, 'Discworld compare - 02/01/1915 - 02/02/1915');
		equal(d2.compareTo(d1), +1, 'Discworld compare - 02/02/1915 - 02/01/1915');
		d2 = dc.newDate(1916, 1, 2);
		equal(d1.compareTo(d2), -1, 'Discworld compare - 02/01/1915 - 02/01/1916');
		equal(d2.compareTo(d1), +1, 'Discworld compare - 02/01/1916 - 02/01/1915');
	});

	module('Equivalences');

	test('Gregorian vs Taiwan', function() {
		expect(12);
		var gc = $.calendars.instance('Gregorian');
		var tc = $.calendars.instance('Taiwan');
		equal(gc.newDate(2008, 3, 1).toJD(), tc.newDate(97, 3, 1).toJD(),
			'Gregorian vs Taiwan - 01/03/2008 - 01/03/0097'); // http://en.wikipedia.org/wiki/Minguo_calendar
		equalDate(gc.newDate(2008, 3, 1).toJSDate(), tc.newDate(97, 3, 1).toJSDate(),
			'Gregorian vs Taiwan - 01/03/2008 - 01/03/0097'); // "
		equal(gc.newDate(2008, 2, 29).toJD(), tc.newDate(97, 2, 29).toJD(),
			'Gregorian vs Taiwan - 29/02/2008 - 29/02/0097'); // "
		equalDate(gc.newDate(2008, 2, 29).toJSDate(), tc.newDate(97, 2, 29).toJSDate(),
			'Gregorian vs Taiwan - 29/02/2008 - 29/02/0097'); // "
		equal(gc.newDate(1, 1, 1).toJD(), tc.newDate(-1911, 1, 1).toJD(),
			'Gregorian vs Taiwan - 01/01/0001 - 01/01/-1911'); // "
		equalDate(gc.newDate(1, 1, 1).toJSDate(), tc.newDate(-1911, 1, 1).toJSDate(),
			'Gregorian vs Taiwan - 01/01/0001 - 01/01/-1911'); // "
		equal(gc.newDate(-1, 12, 31).toJD(), tc.newDate(-1912, 12, 31).toJD(),
			'Gregorian vs Taiwan - 31/12/-0001 - 31/12/-1912'); // "
		equalDate(gc.newDate(-1, 12, 31).toJSDate(), tc.newDate(-1912, 12, 31).toJSDate(),
			'Gregorian vs Taiwan - 31/12/-0001 - 31/12/-1912'); // "
		equal(gc.newDate(1912, 1, 1).toJD(), tc.newDate(1, 1, 1).toJD(),
			'Gregorian vs Taiwan - 01/01/1912 - 01/01/0001'); // "
		equalDate(gc.newDate(1912, 1, 1).toJSDate(), tc.newDate(1, 1, 1).toJSDate(),
			'Gregorian vs Taiwan - 01/01/1912 - 01/01/0001'); // "
		equal(gc.newDate(1911, 12, 31).toJD(), tc.newDate(-1, 12, 31).toJD(),
			'Gregorian vs Taiwan - 31/12/1911 - 31/12/-0001'); // "
		equalDate(gc.newDate(1911, 12, 31).toJSDate(), tc.newDate(-1, 12, 31).toJSDate(),
			'Gregorian vs Taiwan - 31/12/1911 - 31/12/-0001'); // "
	});

	test('Gregorian vs Thai', function() {
		expect(12);
		var gc = $.calendars.instance('Gregorian');
		var tc = $.calendars.instance('Thai');
		equal(gc.newDate(2008, 3, 1).toJD(), tc.newDate(2551, 3, 1).toJD(),
			'Gregorian vs Thai - 01/03/2008 - 01/03/2551'); // http://en.wikipedia.org/wiki/Thai_calendar
		equalDate(gc.newDate(2008, 3, 1).toJSDate(), tc.newDate(2551, 3, 1).toJSDate(),
			'Gregorian vs Thai - 01/03/2008 - 01/03/2551'); // "
		equal(gc.newDate(2008, 2, 29).toJD(), tc.newDate(2551, 2, 29).toJD(),
			'Gregorian vs Thai - 29/02/2008 - 29/02/2551'); // "
		equalDate(gc.newDate(2008, 2, 29).toJSDate(), tc.newDate(2551, 2, 29).toJSDate(),
			'Gregorian vs Thai - 29/02/2008 - 29/02/2551'); // "
		equal(gc.newDate(1, 1, 1).toJD(), tc.newDate(544, 1, 1).toJD(),
			'Gregorian vs Thai - 01/01/0001 - 01/01/0544'); // "
		equalDate(gc.newDate(1, 1, 1).toJSDate(), tc.newDate(544, 1, 1).toJSDate(),
			'Gregorian vs Thai - 01/01/0001 - 01/01/0544'); // "
		equal(gc.newDate(-1, 12, 31).toJD(), tc.newDate(543, 12, 31).toJD(),
			'Gregorian vs Thai - 31/12/-0001 - 31/12/0543'); // "
		equalDate(gc.newDate(-1, 12, 31).toJSDate(), tc.newDate(543, 12, 31).toJSDate(),
			'Gregorian vs Thai - 31/12/-0001 - 31/12/0543'); // "
		equal(gc.newDate(-543, 1, 1).toJD(), tc.newDate(1, 1, 1).toJD(),
			'Gregorian vs Thai - 01/01/-0543 - 01/01/0001'); // "
		equalDate(gc.newDate(-543, 1, 1).toJSDate(), tc.newDate(1, 1, 1).toJSDate(),
			'Gregorian vs Thai - 01/01/-0543 - 01/01/0001'); // "
		equal(gc.newDate(-544, 12, 31).toJD(), tc.newDate(-1, 12, 31).toJD(),
			'Gregorian vs Thai - 31/12/-0544 - 31/12/-0001'); // "
		equalDate(gc.newDate(-544, 12, 31).toJSDate(), tc.newDate(-1, 12, 31).toJSDate(),
			'Gregorian vs Thai - 31/12/-0544 - 31/12/-0001'); // "
	});

	test('Gregorian vs Julian', function() {
		expect(14);
		var gc = $.calendars.instance('Gregorian');
		var jc = $.calendars.instance('Julian');
		equal(gc.newDate(2009, 3, 1).toJD(), jc.newDate(2009, 2, 16).toJD(),
			'Gregorian vs Julian - 01/03/2009 - 18/02/2009'); // http://en.wikipedia.org/wiki/Gregorian_calendar
		equalDate(gc.newDate(2009, 3, 1).toJSDate(), jc.newDate(2009, 2, 16).toJSDate(),
			'Gregorian vs Julian - 01/03/2009 - 18/02/2009'); // "
		equal(gc.newDate(2009, 8, 22).toJD(), jc.newDate(2009, 8, 9).toJD(),
			'Gregorian vs Julian - 22/08/2009 - 09/08/2009'); // "
		equalDate(gc.newDate(2009, 8, 22).toJSDate(), jc.newDate(2009, 8, 9).toJSDate(),
			'Gregorian vs Julian - 22/08/2009 - 09/08/2009'); // "
		equal(gc.newDate(1890, 3, 21).toJD(), jc.newDate(1890, 3, 9).toJD(),
			'Gregorian vs Julian - 21/03/1890 - 09/03/1890'); // "
		equalDate(gc.newDate(1890, 3, 21).toJSDate(), jc.newDate(1890, 3, 9).toJSDate(),
			'Gregorian vs Julian - 21/03/1890 - 09/03/1890'); // "
		equal(gc.newDate(1750, 6, 22).toJD(), jc.newDate(1750, 6, 11).toJD(),
			'Gregorian vs Julian - 22/06/1750 - 11/06/1750'); // "
		equalDate(gc.newDate(1750, 6, 22).toJSDate(), jc.newDate(1750, 6, 11).toJSDate(),
			'Gregorian vs Julian - 22/06/1750 - 11/06/1750'); // "
		equal(gc.newDate(1620, 3, 20).toJD(), jc.newDate(1620, 3, 10).toJD(),
			'Gregorian vs Julian - 20/03/1620 - 10/03/1620'); // "
		equalDate(gc.newDate(1620, 3, 20).toJSDate(), jc.newDate(1620, 3, 10).toJSDate(),
			'Gregorian vs Julian - 20/03/1620 - 10/03/1620'); // "
		equal(gc.newDate(1, 1, 1).toJD(), jc.newDate(1, 1, 3).toJD(),
			'Gregorian vs Julian - 01/01/0001 - 03/01/0001'); // http://www.fourmilab.ch/documents/calendar/
		equalDate(gc.newDate(1, 1, 1).toJSDate(), jc.newDate(1, 1, 3).toJSDate(),
			'Gregorian vs Julian - 01/01/0001 - 03/01/0001'); // "
		equal(gc.newDate(-1, 12, 30).toJD(), jc.newDate(1, 1, 1).toJD(),
			'Gregorian vs Julian - 30/12/-0001 - 01/01/0001'); // "
		equalDate(gc.newDate(-1, 12, 30).toJSDate(), jc.newDate(1, 1, 1).toJSDate(),
			'Gregorian vs Julian - 30/12/-0001 - 01/01/0001'); // "
	});

	test('Gregorian vs Persian', function() {
		expect(18);
		var gc = $.calendars.instance('Gregorian');
		var pc = $.calendars.instance('Persian');
		equal(gc.newDate(2009, 3, 1).toJD(), pc.newDate(1387, 12, 11).toJD(),
			'Gregorian vs Persian - 01/03/2009 - 11/12/1387');
		equalDate(gc.newDate(2009, 3, 1).toJSDate(), pc.newDate(1387, 12, 11).toJSDate(),
			'Gregorian vs Persian - 01/03/2009 - 11/12/1387');
		equal(gc.newDate(2009, 8, 5).toJD(), pc.newDate(1388, 5, 14).toJD(),
			'Gregorian vs Persian - 05/08/2009 - 14/05/1388');
		equalDate(gc.newDate(2009, 8, 5).toJSDate(), pc.newDate(1388, 5, 14).toJSDate(),
			'Gregorian vs Persian - 05/08/2009 - 14/05/1388');
		equal(gc.newDate(1993, 3, 21).toJD(), pc.newDate(1372, 1, 1).toJD(),
			'Gregorian vs Persian - 21/03/1993 - 01/01/1372'); // http://en.wikipedia.org/wiki/Jalali_calendar
		equalDate(gc.newDate(1993, 3, 21).toJSDate(), pc.newDate(1372, 1, 1).toJSDate(),
			'Gregorian vs Persian - 21/03/1993 - 01/01/1372'); // "
		equal(gc.newDate(1990, 6, 22).toJD(), pc.newDate(1369, 4, 1).toJD(),
			'Gregorian vs Persian - 22/06/1990 - 01/04/1369'); // http://www.ortelius.de/kalender/pers_en.php
		equalDate(gc.newDate(1990, 6, 22).toJSDate(), pc.newDate(1369, 4, 1).toJSDate(),
			'Gregorian vs Persian - 22/06/1990 - 01/04/1369'); // "
		equal(gc.newDate(2008, 3, 20).toJD(), pc.newDate(1387, 1, 1).toJD(),
			'Gregorian vs Persian - 20/03/2008 - 01/01/1387'); // "
		equalDate(gc.newDate(2008, 3, 20).toJSDate(), pc.newDate(1387, 1, 1).toJSDate(),
			'Gregorian vs Persian - 20/03/2008 - 01/01/1387'); // "
		equal(gc.newDate(1588, 2, 29).toJD(), pc.newDate(966, 12, 10).toJD(),
			'Gregorian vs Persian - 29/02/1588 - 10/12/0966'); // http://www.alavi.us/jcal/
		equalDate(gc.newDate(1588, 2, 29).toJSDate(), pc.newDate(966, 12, 10).toJSDate(),
			'Gregorian vs Persian - 29/02/1588 - 10/12/0966'); // http://www.alavi.us/jcal/
		equal(gc.newDate(2621, 6, 6).toJD(), pc.newDate(2000, 3, 16).toJD(),
			'Gregorian vs Persian - 06/06/2621 - 16/03/2000'); // "
		equalDate(gc.newDate(2621, 6, 6).toJSDate(), pc.newDate(2000, 3, 16).toJSDate(),
			'Gregorian vs Persian - 06/06/2621 - 16/03/2000'); // "
		equal(gc.newDate(622, 3, 22).toJD(), pc.newDate(1, 1, 1).toJD(),
			'Gregorian vs Persian - 22/03/0622 - 01/01/0001');
		equalDate(gc.newDate(622, 3, 22).toJSDate(), pc.newDate(1, 1, 1).toJSDate(),
			'Gregorian vs Persian - 22/03/0622 - 01/01/0001');
		equal(gc.newDate(1, 1, 1).toJD(), pc.newDate(-622, 10, 11).toJD(),
			'Gregorian vs Persian - 01/01/0001 - 11/10/-0622');
		equalDate(gc.newDate(1, 1, 1).toJSDate(), pc.newDate(-622, 10, 11).toJSDate(),
			'Gregorian vs Persian - 01/01/0001 - 11/10/-0622');
	});

	test('Gregorian vs Islamic', function() {
		expect(14);
		var gc = $.calendars.instance('Gregorian');
		var ic = $.calendars.instance('Islamic');
		equal(gc.newDate(2009, 3, 1).toJD(), ic.newDate(1430, 3, 4).toJD(),
			'Gregorian vs Islamic - 01/03/2009 - 03/04/1430'); // http://www.phys.uu.nl/~vgent/islam/islam_tabcal.htm
		equalDate(gc.newDate(2009, 3, 1).toJSDate(), ic.newDate(1430, 3, 4).toJSDate(),
			'Gregorian vs Islamic - 01/03/2009 - 03/04/1430'); // "
		equal(gc.newDate(2009, 8, 5).toJD(), ic.newDate(1430, 8, 13).toJD(),
			'Gregorian vs Islamic - 05/08/2009 - 13/08/1430'); // "
		equalDate(gc.newDate(2009, 8, 5).toJSDate(), ic.newDate(1430, 8, 13).toJSDate(),
			'Gregorian vs Islamic - 05/08/2009 - 13/08/1430'); // "
		equal(gc.newDate(1993, 3, 21).toJD(), ic.newDate(1413, 9, 27).toJD(),
			'Gregorian vs Islamic - 21/03/1993 - 27/09/1413'); // "
		equalDate(gc.newDate(1993, 3, 21).toJSDate(), ic.newDate(1413, 9, 27).toJSDate(),
			'Gregorian vs Islamic - 21/03/1993 - 27/09/1413'); // "
		equal(gc.newDate(1990, 6, 22).toJD(), ic.newDate(1410, 11, 28).toJD(),
			'Gregorian vs Islamic - 22/06/1990 - 28/11/1410'); // "
		equalDate(gc.newDate(1990, 6, 22).toJSDate(), ic.newDate(1410, 11, 28).toJSDate(),
			'Gregorian vs Islamic - 22/06/1990 - 28/11/1410'); // "
		equal(gc.newDate(2008, 3, 20).toJD(), ic.newDate(1429, 3, 12).toJD(),
			'Gregorian vs Islamic - 20/03/2008 - 12/03/1429'); // "
		equalDate(gc.newDate(2008, 3, 20).toJSDate(), ic.newDate(1429, 3, 12).toJSDate(),
			'Gregorian vs Islamic - 20/03/2008 - 12/03/1429'); // "
		equal(gc.newDate(1588, 2, 29).toJD(), ic.newDate(996, 4, 1).toJD(),
			'Gregorian vs Islamic - 29/02/1588 - 01/04/0996'); // "
		equalDate(gc.newDate(1588, 2, 29).toJSDate(), ic.newDate(996, 4, 1).toJSDate(),
			'Gregorian vs Islamic - 29/02/1588 - 01/04/0996'); // "
		equal(gc.newDate(2621, 6, 6).toJD(), ic.newDate(2061, 3, 24).toJD(),
			'Gregorian vs Islamic - 06/06/2621 - 24/03/2061'); // "
		equalDate(gc.newDate(2621, 6, 6).toJSDate(), ic.newDate(2061, 3, 24).toJSDate(),
			'Gregorian vs Islamic - 06/06/2621 - 24/03/2061'); // "
	});

	test('Gregorian vs Umm al-Qura', function() {
		expect(14);
		var gc = $.calendars.instance('Gregorian');
		var uc = $.calendars.instance('ummalqura');
		equal(gc.newDate(2009, 3, 1).toJD(), uc.newDate(1430, 3, 4).toJD(),
			'Gregorian vs Umm al-Qura - 01/03/2009 - 03/04/1430'); // http://www.maranao.com/html/calendarconverter.htm
		equalDate(gc.newDate(2009, 3, 1).toJSDate(), uc.newDate(1430, 3, 4).toJSDate(),
			'Gregorian vs Umm al-Qura - 01/03/2009 - 03/04/1430'); // "
		equal(gc.newDate(2009, 8, 5).toJD(), uc.newDate(1430, 8, 14).toJD(),
			'Gregorian vs Umm al-Qura - 05/08/2009 - 14/08/1430'); // "
		equalDate(gc.newDate(2009, 8, 5).toJSDate(), uc.newDate(1430, 8, 14).toJSDate(),
			'Gregorian vs Umm al-Qura - 05/08/2009 - 14/08/1430'); // "
		equal(gc.newDate(1993, 3, 21).toJD(), uc.newDate(1413, 9, 28).toJD(),
			'Gregorian vs Umm al-Qura - 21/03/1993 - 28/09/1413'); // "
		equalDate(gc.newDate(1993, 3, 21).toJSDate(), uc.newDate(1413, 9, 28).toJSDate(),
			'Gregorian vs Umm al-Qura - 21/03/1993 - 28/09/1413'); // "
		equal(gc.newDate(1990, 6, 22).toJD(), uc.newDate(1410, 11, 29).toJD(),
			'Gregorian vs Umm al-Qura - 22/06/1990 - 29/11/1410'); // "
		equalDate(gc.newDate(1990, 6, 22).toJSDate(), uc.newDate(1410, 11, 29).toJSDate(),
			'Gregorian vs Umm al-Qura - 22/06/1990 - 29/11/1410'); // "
		equal(gc.newDate(2008, 3, 20).toJD(), uc.newDate(1429, 3, 12).toJD(),
			'Gregorian vs Umm al-Qura - 20/03/2008 - 12/03/1429'); // "
		equalDate(gc.newDate(2008, 3, 20).toJSDate(), uc.newDate(1429, 3, 12).toJSDate(),
			'Gregorian vs Umm al-Qura - 20/03/2008 - 12/03/1429'); // "
		equal(gc.newDate(1937, 3, 14).toJD(), uc.newDate(1356, 1, 1).toJD(),
			'Gregorian vs Umm al-Qura - 14/03/1937 - 01/01/1356'); // "
		equalDate(gc.newDate(1937, 3, 14).toJSDate(), uc.newDate(1356, 1, 1).toJSDate(),
			'Gregorian vs Umm al-Qura - 14/03/1937 - 01/01/1356'); // "
		equal(gc.newDate(2077, 11, 16).toJD(), uc.newDate(1500, 12, 30).toJD(),
			'Gregorian vs Umm al-Qura - 16/11/2077 - 30/12/1500'); // "
		equalDate(gc.newDate(2077, 11, 16).toJSDate(), uc.newDate(1500, 12, 30).toJSDate(),
			'Gregorian vs Umm al-Qura - 16/11/2077 - 30/12/1500'); // "
	});

	test('Gregorian vs Hebrew', function() {
		expect(12);
		var gc = $.calendars.instance('Gregorian');
		var hc = $.calendars.instance('Hebrew');
		equal(gc.newDate(2009, 3, 1).toJD(), hc.newDate(5769, 12, 5).toJD(),
			'Gregorian vs Hebrew - 01/03/2009 - 05/12/5769'); // http://www.fourmilab.ch/documents/calendar/
		equalDate(gc.newDate(2009, 3, 1).toJSDate(), hc.newDate(5769, 12, 5).toJSDate(),
			'Gregorian vs Hebrew - 01/03/2009 - 05/12/5769'); // "
		equal(gc.newDate(2009, 8, 5).toJD(), hc.newDate(5769, 5, 15).toJD(),
			'Gregorian vs Hebrew - 05/08/2009 - 15/05/5769'); // "
		equalDate(gc.newDate(2009, 8, 5).toJSDate(), hc.newDate(5769, 5, 15).toJSDate(),
			'Gregorian vs Hebrew - 05/08/2009 - 15/05/5769'); // "
		equal(gc.newDate(2001, 1, 1).toJD(), hc.newDate(5761, 10, 6).toJD(),
			'Gregorian vs Hebrew - 01/01/2001 - 06/10/5761'); // "
		equalDate(gc.newDate(2001, 1, 1).toJSDate(), hc.newDate(5761, 10, 6).toJSDate(),
			'Gregorian vs Hebrew - 01/01/2001 - 06/10/5761'); // "
		equal(gc.newDate(1920, 6, 22).toJD(), hc.newDate(5680, 4, 6).toJD(),
			'Gregorian vs Hebrew - 22/06/1920 - 06/04/5680'); // "
		equalDate(gc.newDate(1920, 6, 22).toJSDate(), hc.newDate(5680, 4, 6).toJSDate(),
			'Gregorian vs Hebrew - 22/06/1920 - 06/04/5680'); // "
		equal(gc.newDate(1, 1, 1).toJD(), hc.newDate(3761, 10, 18).toJD(),
			'Gregorian vs Hebrew - 01/01/0001 - 18/10/3761'); // "
		equalDate(gc.newDate(1, 1, 1).toJSDate(), hc.newDate(3761, 10, 18).toJSDate(),
			'Gregorian vs Hebrew - 01/01/0001 - 18/10/3761'); // "
		equal(gc.newDate(-3761, 9, 7).toJD(), hc.newDate(1, 7, 1).toJD(),
			'Gregorian vs Hebrew - 07/09/-3761 - 01/07/0001'); // "
		equalDate(gc.newDate(-3761, 9, 7).toJSDate(), hc.newDate(1, 7, 1).toJSDate(),
			'Gregorian vs Hebrew - 07/09/-3761 - 01/07/0001'); // "
	});

	test('Gregorian vs Ethiopian', function() {
		expect(16);
		var gc = $.calendars.instance('Gregorian');
		var ec = $.calendars.instance('Ethiopian');
		equal(gc.newDate(2009, 3, 1).toJD(), ec.newDate(2001, 6, 22).toJD(),
			'Gregorian vs Ethiopian - 01/03/2009 - 22/06/2001'); // http://www.funaba.org/en/calendar-conversion.cgi
		equalDate(gc.newDate(2009, 3, 1).toJSDate(), ec.newDate(2001, 6, 22).toJSDate(),
			'Gregorian vs Ethiopian - 01/03/2009 - 22/06/2001'); // "
		equal(gc.newDate(2009, 9, 10).toJD(), ec.newDate(2001, 13, 5).toJD(),
			'Gregorian vs Ethiopian - 10/09/2009 - 05/13/2001'); // "
		equalDate(gc.newDate(2009, 9, 10).toJSDate(), ec.newDate(2001, 13, 5).toJSDate(),
			'Gregorian vs Ethiopian - 10/09/2009 - 05/13/2001'); // "
		equal(gc.newDate(2008, 9, 11).toJD(), ec.newDate(2001, 1, 1).toJD(),
			'Gregorian vs Ethiopian - 11/09/2008 - 01/01/2001'); // "
		equalDate(gc.newDate(2008, 9, 11).toJSDate(), ec.newDate(2001, 1, 1).toJSDate(),
			'Gregorian vs Ethiopian - 11/09/2008 - 01/01/2001'); // "
		equal(gc.newDate(2007, 9, 11).toJD(), ec.newDate(1999, 13, 6).toJD(),
			'Gregorian vs Ethiopian - 11/09/2007 - 06/13/1999'); // "
		equalDate(gc.newDate(2007, 9, 11).toJSDate(), ec.newDate(1999, 13, 6).toJSDate(),
			'Gregorian vs Ethiopian - 11/09/2007 - 06/13/1999'); // "
		equal(gc.newDate(1, 1, 1).toJD(), ec.newDate(-8, 5, 8).toJD(),
			'Gregorian vs Ethiopian - 01/01/0001 - 08/05/-0008'); // http://emr.cs.iit.edu/home/reingold/calendar-book/Calendrica.html
		equalDate(gc.newDate(1, 1, 1).toJSDate(), ec.newDate(-8, 5, 8).toJSDate(),
			'Gregorian vs Ethiopian - 01/01/0001 - 08/05/-0008'); // "
		equal(gc.newDate(-1, 12, 31).toJD(), ec.newDate(-8, 5, 7).toJD(),
			'Gregorian vs Ethiopian - 31/12/-0001 - 07/05/-0008'); // "
		equalDate(gc.newDate(-1, 12, 31).toJSDate(), ec.newDate(-8, 5, 7).toJSDate(),
			'Gregorian vs Ethiopian - 31/12/-0001 - 07/05/-0008'); // "
		equal(gc.newDate(8, 8, 27).toJD(), ec.newDate(1, 1, 1).toJD(),
			'Gregorian vs Ethiopian - 27/08/0008 - 01/01/0001'); // http://members.shaw.ca/ethiocal/
		equalDate(gc.newDate(8, 8, 27).toJSDate(), ec.newDate(1, 1, 1).toJSDate(),
			'Gregorian vs Ethiopian - 27/08/0008 - 01/01/0001'); // "
		equal(gc.newDate(8, 8, 26).toJD(), ec.newDate(-1, 13, 5).toJD(),
			'Gregorian vs Ethiopian - 26/08/0008 - 05/13/-0001'); // "
		equalDate(gc.newDate(8, 8, 26).toJSDate(), ec.newDate(-1, 13, 5).toJSDate(),
			'Gregorian vs Ethiopian - 26/08/0008 - 05/13/-0001'); // "
	});

	test('Gregorian vs Coptic', function() {
		expect(16);
		var gc = $.calendars.instance('Gregorian');
		var cc = $.calendars.instance('Coptic');
		equal(gc.newDate(2009, 3, 1).toJD(), cc.newDate(1725, 6, 22).toJD(),
			'Gregorian vs Coptic - 01/03/2009 - 22/06/2001'); // http://emr.cs.iit.edu/home/reingold/calendar-book/Calendrica.html
		equalDate(gc.newDate(2009, 3, 1).toJSDate(), cc.newDate(1725, 6, 22).toJSDate(),
			'Gregorian vs Coptic - 01/03/2009 - 22/06/2001'); // "
		equal(gc.newDate(2009, 9, 10).toJD(), cc.newDate(1725, 13, 5).toJD(),
			'Gregorian vs Coptic - 10/09/2009 - 05/13/1725'); // "
		equalDate(gc.newDate(2009, 9, 10).toJSDate(), cc.newDate(1725, 13, 5).toJSDate(),
			'Gregorian vs Coptic - 10/09/2009 - 05/13/1725'); // "
		equal(gc.newDate(2008, 9, 11).toJD(), cc.newDate(1725, 1, 1).toJD(),
			'Gregorian vs Coptic - 11/09/2008 - 01/01/1725'); // "
		equalDate(gc.newDate(2008, 9, 11).toJSDate(), cc.newDate(1725, 1, 1).toJSDate(),
			'Gregorian vs Coptic - 11/09/2008 - 01/01/1725'); // "
		equal(gc.newDate(2007, 9, 11).toJD(), cc.newDate(1723, 13, 6).toJD(),
			'Gregorian vs Coptic - 11/09/2007 - 06/13/1723'); // "
		equalDate(gc.newDate(2007, 9, 11).toJSDate(), cc.newDate(1723, 13, 6).toJSDate(),
			'Gregorian vs Coptic - 11/09/2007 - 06/13/1723'); // "
		equal(gc.newDate(1, 1, 1).toJD(), cc.newDate(-284, 5, 8).toJD(),
			'Gregorian vs Coptic - 01/01/0001 - 08/05/-0284'); // "
		equalDate(gc.newDate(1, 1, 1).toJSDate(), cc.newDate(-284, 5, 8).toJSDate(),
			'Gregorian vs Coptic - 01/01/0001 - 08/05/-0284'); // "
		equal(gc.newDate(-1, 12, 31).toJD(), cc.newDate(-284, 5, 7).toJD(),
			'Gregorian vs Coptic - 31/12/-0001 - 07/05/-0284'); // "
		equalDate(gc.newDate(-1, 12, 31).toJSDate(), cc.newDate(-284, 5, 7).toJSDate(),
			'Gregorian vs Coptic - 31/12/-0001 - 07/05/-0284'); // "
		equal(gc.newDate(284, 8, 29).toJD(), cc.newDate(1, 1, 1).toJD(),
			'Gregorian vs Coptic - 29/08/0284 - 01/01/0001'); // "
		equalDate(gc.newDate(284, 8, 29).toJSDate(), cc.newDate(1, 1, 1).toJSDate(),
			'Gregorian vs Coptic - 29/08/0284 - 01/01/0001'); // "
		equal(gc.newDate(284, 8, 28).toJD(), cc.newDate(-1, 13, 5).toJD(),
			'Gregorian vs Coptic - 28/08/0284 - 05/13/-0001'); // "
		equalDate(gc.newDate(284, 8, 28).toJSDate(), cc.newDate(-1, 13, 5).toJSDate(),
			'Gregorian vs Coptic - 28/08/0284 - 05/13/-0001'); // "
	});

	test('Gregorian vs Nepali', function() {
		expect(8);
		var gc = $.calendars.instance('Gregorian');
		var nc = $.calendars.instance('Nepali');
		equal(gc.newDate(2013, 4, 24).toJD(), nc.newDate(2070, 1, 11).toJD(),
			'Gregorian vs Nepali - 24/04/2013 - 11/01/2070'); // http://www.ashesh.com.np/nepali-calendar/
		equalDate(gc.newDate(2013, 4, 24).toJSDate(), nc.newDate(2070, 1, 11).toJSDate(),
			'Gregorian vs Nepali - 24/04/2013 - 11/01/2070'); // "
		equal(gc.newDate(2015, 1, 14).toJD(), nc.newDate(2071, 9, 30).toJD(),
			'Gregorian vs Nepali - 14/01/2015 - 30/09/2071'); // "
		equalDate(gc.newDate(2015, 1, 14).toJSDate(), nc.newDate(2071, 9, 30).toJSDate(),
			'Gregorian vs Nepali - 14/01/2015 - 30/09/2071'); // "
		equal(gc.newDate(1935, 4, 13).toJD(), nc.newDate(1992, 1, 1).toJD(),
			'Gregorian vs Nepali - 13/04/1935 - 01/01/1992'); // "
		equalDate(gc.newDate(1935, 4, 13).toJSDate(), nc.newDate(1992, 1, 1).toJSDate(),
			'Gregorian vs Nepali - 13/04/1935 - 01/01/1992'); // "
		equal(gc.newDate(2044, 4, 12).toJD(), nc.newDate(2100, 12, 30).toJD(),
			'Gregorian vs Nepali - 12/04/2044 - 30/12/2100'); // "
		equalDate(gc.newDate(2044, 4, 12).toJSDate(), nc.newDate(2100, 12, 30).toJSDate(),
			'Gregorian vs Nepali - 12/04/2044 - 30/12/2100'); // "
	});

	test('Gregorian vs Mayan', function() {
		expect(12);
		var gc = $.calendars.instance('Gregorian');
		var mc = $.calendars.instance('Mayan');
		equal(gc.newDate(2009, 3, 1).toJD(), mc.newDate(5196, 2, 9).toJD(),
			'Gregorian vs Mayan - 01/03/2009 - 12.19.16.2.9'); // http://www.fourmilab.ch/documents/calendar/
		equalDate(gc.newDate(2009, 3, 1).toJSDate(), mc.newDate(5196, 2, 9).toJSDate(),
			'Gregorian vs Mayan - 01/03/2009 - 12.19.16.2.9'); // "
		equal(gc.newDate(2009, 8, 5).toJD(), mc.newDate(5196, 10, 6).toJD(),
			'Gregorian vs Mayan - 05/08/2009 - 12.19.16.10.6'); // "
		equalDate(gc.newDate(2009, 8, 5).toJSDate(), mc.newDate(5196, 10, 6).toJSDate(),
			'Gregorian vs Mayan - 05/08/2009 - 12.19.16.10.6'); // "
		equal(gc.newDate(2001, 1, 1).toJD(), mc.newDate(5187, 15, 8).toJD(),
			'Gregorian vs Mayan - 01/01/2001 - 12.19.7.15.8'); // "
		equalDate(gc.newDate(2001, 1, 1).toJSDate(), mc.newDate(5187, 15, 8).toJSDate(),
			'Gregorian vs Mayan - 01/01/2001 - 12.19.7.15.8'); // "
		equal(gc.newDate(1920, 6, 22).toJD(), mc.newDate(5106, 2, 15).toJD(),
			'Gregorian vs Mayan - 22/06/1920 - 12.15.6.2.15'); // "
		equalDate(gc.newDate(1920, 6, 22).toJSDate(), mc.newDate(5106, 2, 15).toJSDate(),
			'Gregorian vs Mayan - 22/06/1920 - 12.15.6.2.15'); // "
		equal(gc.newDate(1, 1, 1).toJD(), mc.newDate(3158, 13, 3).toJD(),
			'Gregorian vs Mayan - 01/01/0001 - 7.17.18.13.3'); // "
		equalDate(gc.newDate(1, 1, 1).toJSDate(), mc.newDate(3158, 13, 3).toJSDate(),
			'Gregorian vs Mayan - 01/01/0001 - 7.17.18.13.3'); // "
		equal(gc.newDate(-3114, 8, 11).toJD(), mc.newDate(0, 0, 0).toJD(),
			'Gregorian vs Mayan - 11/08/-3114 - -1.19.18.17.15'); // "
		equalDate(gc.newDate(-3114, 8, 11).toJSDate(), mc.newDate(0, 0, 0).toJSDate(),
			'Gregorian vs Mayan - 11/08/-3114 - -1.19.18.17.15'); // "
	});

	test('Gregorian vs Nanakshahi', function() {
		expect(8);
		var gc = $.calendars.instance('Gregorian');
		var nc = $.calendars.instance('Nanakshahi');
		equal(gc.newDate(2013, 3, 14).toJD(), nc.newDate(545, 1, 1).toJD(),
			'Gregorian vs Nanakshahi - 14/03/2013 - 01/01/0545'); // http://i0.wp.com/sikhgurusandgurdwaras.info/wordpress/wp-content/uploads/2015/01/Ajnala-faction-of-Damdami-Taksal-rejects-both-Sikh-calendars.jpg
		equalDate(gc.newDate(2013, 10, 1).toJSDate(), nc.newDate(545, 7, 17).toJSDate(),
			'Gregorian vs Nanakshahi - 01/10/2013 - 17/07/0545'); // "
		equal(gc.newDate(2014, 3, 13).toJD(), nc.newDate(545, 12, 30).toJD(),
			'Gregorian vs Nanakshahi - 13/03/2014 - 30/12/0545'); // "
		equal(gc.newDate(2015, 3, 14).toJD(), nc.newDate(547, 1, 1).toJD(),
			'Gregorian vs Nanakshahi - 14/03/2015 - 01/01/0547'); // "
		equalDate(gc.newDate(2015, 10, 1).toJSDate(), nc.newDate(547, 7, 17).toJSDate(),
			'Gregorian vs Nanakshahi - 01/10/2015 - 17/07/0547'); // "
		equal(gc.newDate(2016, 3, 13).toJD(), nc.newDate(547, 12, 31).toJD(),
			'Gregorian vs Nanakshahi - 13/03/2016 - 30/12/0547'); // "
		equal(gc.newDate(1469, 3, 13).toJD(), nc.newDate(-1, 12, 30).toJD(),
			'Gregorian vs Nanakshahi - 13/03/1469 - 30/12/0001 BN');
		equal(gc.newDate(1467, 3, 14).toJD(), nc.newDate(-2, 1, 1).toJD(),
			'Gregorian vs Nanakshahi - 14/03/1467 - 01/01/0002 BN');
	});

	test('Gregorian vs Discworld', function() {
		expect(4);
		var gc = $.calendars.instance('Gregorian');
		var dc = $.calendars.instance('Discworld');
		equal(gc.newDate(1, 1, 1).toJD(), dc.newDate(1, 1, 1).toJD(),
			'Gregorian vs Discworld - 01/01/0001 - 01/01/0001');
		equalDate(gc.newDate(2, 2, 5).toJSDate(), dc.newDate(2, 1, 1).toJSDate(),
			'Gregorian vs Discworld - 05/02/0002 - 01/01/0002');
		equal(gc.newDate(2097, 2, 25).toJD(), dc.newDate(1915, 1, 5).toJD(),
			'Gregorian vs Discworld - 25/02/2097 - 05/01/1915');
		equalDate(gc.newDate(2099, 1, 17).toJSDate(), dc.newDate(1916, 10, 24).toJSDate(),
			'Gregorian vs Discworld - 17/01/2099 - 24/10/1916');
	});
});	

function equalDate(d1, d2, message) {
	if (!d1 || !d2) {
		ok(false, message + ' - missing date');
		return;
	}
	d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
	d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
	equal(d1.toString(), d2.toString(), message);
}

function equalCDate(d1, d2, message) {
	if (!d1 || !d2) {
		ok(false, message + ' - missing date');
		return;
	}
	equal(d1.toString(), d2.toString(), message);
}
