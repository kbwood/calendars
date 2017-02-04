/*
 * datepicker unit tests
 */
$(function() {

module('Datepicker');

function equalCDate(d1, d2, message) {
	if (!d1 || !d2) {
		ok(false, message + ' - missing date');
		return;
	}
	equal(d1.toString(), d2.toString(), message);
}

function equalCDateArray(a1, a2, message) {
	if (!a1 || !a2) {
		ok(false, message + ' - missing dates');
		return;
	}
	equal(a1.toString(), a2.toString(), message);
}

function init(id, options) {
	$.calendarsPicker.setDefaults($.calendarsPicker.regionalOptions['']);
	return $(id).calendarsPicker('destroy').calendarsPicker($.extend({showAnim: ''}, options || {}));
}

var PROP_NAME = 'calendarsPicker';

test('Set defaults', function() {
	expect(6);
	equal($.calendarsPicker.defaultOptions.showAnim, 'show', 'Initial showAnim');
	equal($.calendarsPicker.defaultOptions.showSpeed, 'normal', 'Initial showSpeed');
	$.calendarsPicker.setDefaults({showAnim: 'fadeIn'});
	equal($.calendarsPicker.defaultOptions.showAnim, 'fadeIn', 'Change showAnim');
	equal($.calendarsPicker.defaultOptions.showSpeed, 'normal', 'No change showSpeed');
	$.calendarsPicker.setDefaults({showAnim: 'show'});
	equal($.calendarsPicker.defaultOptions.showAnim, 'show', 'Restore showAnim');
	equal($.calendarsPicker.defaultOptions.showSpeed, 'normal', 'Restore showSpeed');
});

test('Destroy', function() {
	expect(20);
	var inp = init('#inp');
	ok(inp.hasClass('is-calendarsPicker'), 'Default - marker class set');
	ok(inp.data(PROP_NAME), 'Default - instance present');
	ok(inp.next().is('#alt'), 'Default - button absent');
	inp.calendarsPicker('destroy');
	inp = $('#inp');
	ok(!inp.hasClass('is-calendarsPicker'), 'Default - marker class cleared');
	ok(!inp.data(PROP_NAME), 'Default - instance absent');
	ok(inp.next().is('#alt'), 'Default - button absent');
	// With button
	inp = init('#inp', {showTrigger: '<button>...</button>'});
	ok(inp.hasClass('is-calendarsPicker'), 'Button - marker class set');
	ok(inp.data(PROP_NAME), 'Button - instance present');
	ok(inp.next().text() == '...', 'Button - button added');
	inp.calendarsPicker('destroy');
	inp = $('#inp');
	ok(!inp.hasClass('is-calendarsPicker'), 'Button - marker class cleared');
	ok(!inp.data(PROP_NAME), 'Button - instance absent');
	ok(inp.next().is('#alt'), 'Button - button removed');
	// Inline
	var inl = init('#inl');
	ok(inl.hasClass('is-calendarsPicker'), 'Inline - marker class set');
	ok(inl.html() != '', 'Inline - content present');
	ok($.data(inl[0], PROP_NAME), 'Inline - instance present');
	ok(inl.next().length == 0 || inl.next().is('p'), 'Inline - button absent');
	inl.calendarsPicker('destroy');
	inl = $('#inl');
	ok(!inl.hasClass('is-calendarsPicker'), 'Inline - marker class cleared');
	ok(inl.html() == '', 'Inline - content absent');
	ok(!$.data(inl[0], PROP_NAME), 'Inline - instance absent');
	ok(inl.next().length == 0 || inl.next().is('p'), 'Inline - button absent');
});

test('Option', function() {
	expect(12);
	var inp = init('#inp');
	var inst = inp.data(PROP_NAME);
	// Set
	equal(inst.options.showSpeed, 'normal', 'Initial setting showSpeed');
	equal(inp.calendarsPicker('option', 'showSpeed'), 'normal', 'Initial instance showSpeed');
	equal($.calendarsPicker.defaultOptions.showSpeed, 'normal', 'Initial default showSpeed');
	inp.calendarsPicker('option', 'showSpeed', 'fast');
	equal(inst.options.showSpeed, 'fast', 'Change setting showSpeed');
	equal(inp.calendarsPicker('option', 'showSpeed'), 'fast', 'Change instance showSpeed');
	equal($.calendarsPicker.defaultOptions.showSpeed, 'normal', 'Retain default showSpeed');
	inp.calendarsPicker('option', {showSpeed: 'slow'});
	equal(inst.options.showSpeed, 'slow', 'Change setting showSpeed');
	equal(inp.calendarsPicker('option', 'showSpeed'), 'slow', 'Change instance showSpeed');
	equal($.calendarsPicker.defaultOptions.showSpeed, 'normal', 'Retain default showSpeed');
	inp.calendarsPicker('option', {showSpeed: 'slow', showOtherMonths: true});
	equal(inst.options.showSpeed, 'slow', 'Change setting showSpeed');
	equal(inst.options.showOtherMonths, true, 'Change setting showOtherMonths');
	deepEqual(inp.calendarsPicker('option'), {calendar: $.calendars.instance(),
		pickerClass: '', showOnFocus: true, showTrigger: null, showAnim: '',
		showOptions: {}, showSpeed: 'slow', popupContainer: null, alignment: 'bottom',
		fixedWeeks: false, firstDay: null, calculateWeek: null, localNumbers: false,
		monthsToShow: 1, monthsOffset: 0, monthsToStep: 1, monthsToJump: 12, useMouseWheel: true,
		changeMonth: true, yearRange: 'c-10:c+10', showOtherMonths: true,
		selectOtherMonths: false, defaultDate: null, selectDefaultDate: false,
		minDate: null, maxDate: null, dateFormat: null, autoSize: false, rangeSelect: false,
		rangeSeparator: ' - ', multiSelect: 0, multiSeparator: ',', onDate: null, onShow: null,
		onChangeMonthYear: null, onSelect: null, onClose: null, altField: null, altFormat: null,
		constrainInput: true, commandsAsDateFormat: false, commands: $.calendarsPicker.commands,
		renderer: $.calendarsPicker.defaultRenderer,
		prevText: '&lt;Prev', prevStatus: 'Show the previous month',
		prevJumpText: '&lt;&lt;', prevJumpStatus: 'Show the previous year',
		nextText: 'Next&gt;', nextStatus: 'Show the next month',
		nextJumpText: '&gt;&gt;', nextJumpStatus: 'Show the next year',
		currentText: 'Current', currentStatus: 'Show the current month',
		todayText: 'Today', todayStatus: 'Show today\'s month',
		clearText: 'Clear', clearStatus: 'Clear all the dates',
		closeText: 'Close', closeStatus: 'Close the datepicker',
		yearStatus: 'Change the year', earlierText: '&#160;&#160;▲',
		laterText: '&#160;&#160;▼', monthStatus: 'Change the month',
		weekText: 'Wk', weekStatus: 'Week of the year', dayStatus: 'Select DD, M d, yyyy',
		defaultStatus: 'Select a date', isRTL: false,
		validateDate: 'Please enter a valid date', validateDateMin: 'Please enter a date on or after {0}',
		validateDateMax: 'Please enter a date on or before {0}',
		validateDateMinMax: 'Please enter a date between {0} and {1}',
		validateDateCompare: 'Please enter a date {0} {1}', validateDateToday: 'today',
		validateDateOther: 'the other date', validateDateEQ: 'equal to',
		validateDateNE: 'not equal to', validateDateLT: 'before', validateDateGT: 'after',
		validateDateLE: 'not after', validateDateGE: 'not before'}, 'All options');
});

test('Inline config', function() {
	expect(3);
	$('#inp').attr('data-calendarsPicker', 'pickerClass: \'abc\', showOtherMonths: true, monthsToStep: 2');
	var inp = init('#inp');
	var inst = inp.data('calendarsPicker');
	equal(inst.options.pickerClass, 'abc', 'Inline config - pickerClass');
	equal(inst.options.showOtherMonths, true, 'Inline config - showOtherMonths');
	equal(inst.options.monthsToStep, 2, 'Inline config - monthsToStep');
});

test('Invocation', function() {
	expect(31);
	var inp = init('#inp');
	var body = $('body');
	// On focus
	var button = inp.siblings('button');
	ok(button.length == 0, 'Focus - button absent');
	var image = inp.siblings('img');
	ok(image.length == 0, 'Focus - image absent');
	inp.focus();
	var dp = $('div.calendars');
	ok(dp.is(':visible'), 'Focus - rendered on focus');
	inp.simulate('keydown', {keyCode: $.simulate.VK_ESC});
	ok(!dp.is(':visible'), 'Focus - hidden on exit');
	inp.focus();
	dp = $('div.calendars');
	ok(dp.is(':visible'), 'Focus - rendered on focus');
	body.simulate('mousedown', {});
	ok(!dp.is(':visible'), 'Focus - hidden on external click');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// On button
	inp = init('#inp', {showOnFocus: false, showTrigger: '<button type="button">...</button>'});
	dp = $('div.calendars');
	ok(dp.length == 0, 'Button - initially hidden');
	button = inp.siblings('button');
	image = inp.siblings('img');
	ok(button.length == 1, 'Button - button present');
	ok(image.length == 0, 'Button - image absent');
	equal(button.text(), '...', 'Button - button text');
	inp.focus();
	dp = $('div.calendars');
	ok(dp.length == 0, 'Button - not rendered on focus');
	button.click();
	dp = $('div.calendars');
	ok(dp.is(':visible'), 'Button - rendered on button click');
	button.click();
	ok(!dp.is(':visible'), 'Button - hidden on second button click');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// On image button
	inp = init('#inp', {showOnFocus: false, showTrigger: '<img src="cal.gif" alt="Cal"></img>'});
	dp = $('div.calendars');
	ok(dp.length == 0, 'Image button - initially hidden');
	button = inp.siblings('button');
	ok(button.length == 0, 'Image button - button absent');
	image = inp.siblings('img');
	ok(image.length == 1, 'Image button - image present');
	ok(image.attr('src').match(/.*cal.gif/), 'Image button - image source');
	equal(image.attr('alt'), 'Cal', 'Image button - image text');
	inp.focus();
	dp = $('div.calendars');
	ok(dp.length == 0, 'Image button - not rendered on focus');
	image.click();
	dp = $('div.calendars');
	ok(dp.is(':visible'), 'Image button - rendered on image click');
	image.click();
	ok(!dp.is(':visible'), 'Image button - hidden on second image click');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// On both
	inp = init('#inp', {showTrigger:
		'<button type="button"><img src="cal.gif" alt="Cal"></img></button>'});
	dp = $('div.calendars');
	ok(dp.length == 0, 'Both - initially hidden');
	button = inp.siblings('button');
	ok(button.length == 1, 'Both - button present');
	image = inp.siblings('img');
	ok(image.length == 0, 'Both - image absent');
	image = button.children('img');
	ok(image.length == 1, 'Both - button image present');
	inp.focus();
	dp = $('div.calendars');
	ok(dp.is(':visible'), 'Both - rendered on focus');
	body.simulate('mousedown', {});
	ok(!dp.is(':visible'), 'Both - hidden on external click');
	button.click();
	dp = $('div.calendars');
	ok(dp.is(':visible'), 'Both - rendered on button click');
	button.click();
	ok(!dp.is(':visible'), 'Both - hidden on second button click');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// External action
	inp = init('#inp');
	dp = $('div.calendars');
	ok(dp.length == 0, 'External - initially hidden');
	inp.calendarsPicker('show');
	dp = $('div.calendars');
	ok(dp.is(':visible'), 'External - rendered on show');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
});

test('Base structure', function() {
	expect(62);
	var inp = init('#inp');
	inp.focus();
	var dp = $('div.calendars');
	ok(dp.parent().hasClass('calendars-popup'), 'Structure - parent wrapper');
	ok(dp.is(':visible'), 'Structure - content visible');
	ok(!dp.is('div.calendars-rtl'), 'Structure - not right-to-left');
	ok(!dp.is('div.calendars-multi'), 'Structure - not multi-month');
	equal(dp.children().length, 4, 'Structure - child count');
	var nav = dp.children(':eq(0)');
	ok(nav.is('div.calendars-nav'), 'Structure - nav division');
	equal(nav.children().length, 3, 'Structure - nav child count');
	ok(nav.children(':first').is('a.calendars-cmd-prev') &&
		nav.children(':first').html() != '', 'Structure - prev link');
	ok(nav.children(':eq(1)').is('a.calendars-cmd-today') &&
		nav.children(':eq(1)').html() != '', 'Structure - today link');
	ok(nav.children(':last').is('a.calendars-cmd-next') &&
		nav.children(':last').html() != '', 'Structure - next link');
	var row = dp.children(':eq(1)');
	ok(row.is('div.calendars-month-row'), 'Structure - month row division');
	equal(row.children().length, 1, 'Structure - month row child count');
	var month = row.children(':eq(0)');
	ok(month.is('div.calendars-month'), 'Structure - month division');
	var header = month.children(':first');
	ok(header.is('div.calendars-month-header'), 'Structure - month header division');
	equal(header.children().length, 2, 'Structure - month header child count');
	ok(header.children(':first').is('select.calendars-month-year'),
		'Structure - new month select');
	ok(header.children(':last').is('select.calendars-month-year'),
		'Structure - new year select');
	var table = month.children(':eq(1)');
	ok(table.is('table'), 'Structure - month table');
	ok(table.children(':first').is('thead'), 'Structure - month table thead');
	var titles = table.children(':first').children(':first');
	ok(titles.is('tr'), 'Structure - month table title row');
	equal(titles.find('span').length, 7, 'Structure - month table day headers');
	ok(table.children(':eq(1)').is('tbody'), 'Structure - month table body');
	ok(table.children(':eq(1)').children('tr').length >= 4,
		'Structure - month table week count');
	var week = table.children(':eq(1)').children(':first');
	ok(week.is('tr'), 'Structure - month table week row');
	equal(week.children().length, 7, 'Structure - week child count');
	ok(week.children(':first').children().is('.calendars-weekend'),
		'Structure - month table first day cell');
	ok(!week.children(':eq(1)').children().is('.calendars-weekend'),
		'Structure - month table second day cell');
	var control = dp.children(':eq(2)');
	ok(control.is('div.calendars-ctrl'), 'Structure - controls division');
	equal(control.children().length, 2, 'Structure - control child count');
	ok(control.children(':first').is('a.calendars-cmd-clear'),
		'Structure - clear link');
	ok(control.children(':last').is('a.calendars-cmd-close'),
		'Structure - close link');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// Multi-month 2
	inp = init('#inp', {monthsToShow: 2});
	inp.focus();
	dp = $('div.calendars');
	ok(dp.is('div.calendars-multi'), 'Structure multi - multi-month');
	equal(dp.children().length, 4, 'Structure multi - child count');
	row = dp.children(':eq(1)');
	ok(row.is('div.calendars-month-row'), 'Structure multi - month row division');
	equal(row.children().length, 2, 'Structure multi - month row child count');
	month = row.children(':eq(0)');
	ok(month.is('div.calendars-month'), 'Structure multi - first month division');
	month = row.children(':eq(1)');
	ok(month.is('div.calendars-month'), 'Structure multi - second month division');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// Multi-month [2, 2]
	inp = init('#inp', {monthsToShow: [2, 2]});
	inp.focus();
	dp = $('div.calendars');
	ok(dp.is('div.calendars-multi'), 'Structure multi - multi-month');
	equal(dp.children().length, 5, 'Structure multi - child count');
	row = dp.children(':eq(1)');
	ok(row.is('div.calendars-month-row'), 'Structure multi - first month row division');
	equal(row.children('div.calendars-month').length, 2, 'Structure multi - month row child count');
	row = dp.children(':eq(2)');
	ok(row.is('div.calendars-month-row'), 'Structure multi - second month row division');
	equal(row.children('div.calendars-month').length, 2, 'Structure multi - month row child count');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// Inline
	var inl = init('#inl');
	dp = inl.children();
	ok(!dp.is('div.calendars-rtl'), 'Structure inline - not right-to-left');
	ok(!dp.is('div.calendars-multi'), 'Structure inline - not multi-month');
	equal(dp.children().length, 3, 'Structure inline - child count');
	var nav = dp.children(':first');
	ok(nav.is('div.calendars-nav'), 'Structure inline - nav division');
	equal(nav.children().length, 3, 'Structure inline - nav child count');
	var row = dp.children(':eq(1)');
	ok(row.is('div.calendars-month-row'), 'Structure inline - month row division');
	var month = row.children(':eq(0)');
	ok(month.is('div.calendars-month'), 'Structure inline - month division');
	var header = month.children(':first');
	ok(header.is('div.calendars-month-header'), 'Structure inline - month header division');
	equal(header.children().length, 2, 'Structure inline - month header child count');
	var table = month.children(':eq(1)');
	ok(table.is('table'), 'Structure inline - month table');
	ok(table.children(':first').is('thead'), 'Structure inline - month table thead');
	ok(table.children(':eq(1)').is('tbody'), 'Structure inline - month table body');
	inl.calendarsPicker('destroy');
	// Inline multi-month
	inl = init('#inl', {monthsToShow: 2});
	dp = inl.children();
	ok(dp.is('div.calendars-multi'), 'Structure inline multi - not multi-month');
	equal(dp.children().length, 3, 'Structure inline multi - child count');
	var nav = dp.children(':first');
	ok(nav.is('div.calendars-nav'), 'Structure inline multi - nav division');
	equal(nav.children().length, 3, 'Structure inline multi - nav child count');
	var row = dp.children(':eq(1)');
	ok(row.is('div.calendars-month-row'), 'Structure inline - month row division');
	var month = row.children(':eq(0)');
	ok(month.is('div.calendars-month'), 'Structure inline multi - first month division');
	month = row.children(':eq(1)');
	ok(month.is('div.calendars-month'), 'Structure inline multi - second month division');
	inl.calendarsPicker('destroy');
});

test('Custom structure', function() {
	expect(24);
	// Check right-to-left localisation
	var inp = init('#inp', {isRTL: true});
	inp.focus();
	var dp = $('div.calendars');
	ok(dp.is('div.calendars-rtl'), 'Structure RTL - right-to-left');
	var nav = dp.children(':eq(0)');
	ok(nav.is('div.calendars-nav'), 'Structure - nav division');
	equal(nav.children().length, 3, 'Structure - nav child count');
	ok(nav.children(':first').is('a.calendars-cmd-prev'),
		'Structure - prev link');
	ok(nav.children(':first').css('float') == 'right',
		'Structure - prev link position');
	ok(nav.children(':eq(1)').is('a.calendars-cmd-today'),
		'Structure - today link');
	ok(nav.children(':last').is('a.calendars-cmd-next'),
		'Structure - next link');
	ok(nav.children(':last').css('float') == 'left',
		'Structure - next link position');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// Custom class
	inp = init('#inp', {pickerClass: 'myPicker'});
	inp.focus();
	dp = $('div.calendars');
	ok(dp.hasClass('myPicker'), 'Structure - custom class');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// Popup container
	inp = init('#inp', {popupContainer: 'form'});
	inp.focus();
	dp = $('div.calendars');
	ok(dp.parent().parent().is('form'), 'Structure - parent form');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	inp = init('#inp');
	inp.focus();
	dp = $('div.calendars');
	ok(dp.parent().parent().is('body'), 'Structure - parent body');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	inp = init('#inp', {popupContainer: $('form')});
	inp.focus();
	dp = $('div.calendars');
	ok(dp.parent().parent().is('form'), 'Structure - parent form');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// Fixed weeks
	var date = $.calendars.instance().newDate(2009, 2, 1);
	inp = init('#inp', {defaultDate: date});
	inp.focus();
	dp = $('div.calendars');
	equal(dp.find('tbody tr').length, 4, 'Structure - not fixed weeks');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	inp = init('#inp', {defaultDate: date, fixedWeeks: true});
	inp.focus();
	dp = $('div.calendars');
	equal(dp.find('tbody tr').length, 6, 'Structure - fixed weeks');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// Can't change month
	inp = init('#inp', {changeMonth: false});
	inp.focus();
	dp = $('div.calendars');
	var header = dp.find('div.calendars-month-header');
	equal(header.children().length, 0, 'Structure change month - header child count');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// Commands as buttons
	inp = init('#inp', {renderer: $.extend({}, $.calendarsPicker.defaultRenderer,
		{picker: $.calendarsPicker.defaultRenderer.picker.replace(/link/g, 'button')})});
	inp.focus();
	dp = $('div.calendars');
	nav = dp.children(':eq(0)');
	ok(nav.children(':first').is('button.calendars-cmd-prev'),
		'Structure - prev button');
	ok(nav.children(':eq(1)').is('button.calendars-cmd-today'),
		'Structure - today button');
	ok(nav.children(':last').is('button.calendars-cmd-next'),
		'Structure - next button');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// Week of year
	inp = init('#inp', {renderer: $.calendarsPicker.weekOfYearRenderer});
	inp.focus();
	dp = $('div.calendars');
	var week = dp.find('tr:first');
	ok(week.children().length == 8, 'Structure week of year - column count');
	ok(week.children(':first').is('th.calendars-week'), 'Structure week of year - first column');
	ok(week.children(':eq(1)').is('th') && !week.children(':eq(1)').is('div.calendars-week'),
		'Structure week of year - second column');
	week = dp.find('tr:eq(1)');
	ok(week.children().length == 8, 'Structure week of year - column count');
	ok(week.children(':first').is('td.calendars-week'), 'Structure week of year - first column');
	ok(week.children(':eq(1)').is('td') && !week.children(':eq(1)').is('div.calendars-week'),
		'Structure week of year - second column');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
});

test('ThemeRoller structure', function() {
	expect(48);
	var inp = init('#inp', {renderer: $.calendarsPicker.themeRollerRenderer});
	inp.focus();
	var dp = $('#ui-datepicker-div');
	ok(dp.is(':visible'), 'ThemeRoller - content visible');
	ok(!dp.is('.ui-datepicker-rtl'), 'ThemeRoller - not right-to-left');
	ok(!dp.is('.ui-datepicker-multi'), 'ThemeRoller - not multi-month');
	equal(dp.children().length, 4, 'ThemeRoller - child count');
	var nav = dp.children(':eq(0)');
	ok(nav.is('div.ui-datepicker-header'), 'ThemeRoller - nav division');
	equal(nav.children().length, 3, 'ThemeRoller - nav child count');
	ok(nav.children(':first').is('a.ui-datepicker-cmd-prev') &&
		nav.children(':first').html() != '', 'ThemeRoller - prev link');
	ok(nav.children(':eq(1)').is('a.ui-datepicker-cmd-today') &&
		nav.children(':eq(1)').html() != '', 'ThemeRoller - today link');
	ok(nav.children(':last').is('a.ui-datepicker-cmd-next') &&
		nav.children(':last').html() != '', 'ThemeRoller - next link');
	var row = dp.children(':eq(1)');
	ok(row.is('div.ui-datepicker-row-break'), 'ThemeRoller - month row division');
	equal(row.children().length, 1, 'ThemeRoller - month row child count');
	var month = row.children(':eq(0)');
	ok(month.is('div.ui-datepicker-group'), 'ThemeRoller - month division');
	var header = month.children(':first');
	ok(header.is('div.ui-datepicker-header'), 'ThemeRoller - month header division');
	equal(header.children().length, 2, 'ThemeRoller - month header child count');
	ok(header.children(':first').is('select.calendars-month-year'),
		'ThemeRoller - new month select');
	ok(header.children(':last').is('select.calendars-month-year'),
		'ThemeRoller - new year select');
	var table = month.children(':eq(1)');
	ok(table.is('table.ui-datepicker-calendar'), 'ThemeRoller - month table');
	ok(table.children(':first').is('thead'), 'ThemeRoller - month table thead');
	var titles = table.children(':first').children(':first');
	ok(titles.is('tr'), 'ThemeRoller - month table title row');
	equal(titles.find('span').length, 7, 'ThemeRoller - month table day headers');
	ok(table.children(':eq(1)').is('tbody'), 'ThemeRoller - month table body');
	ok(table.children(':eq(1)').children('tr').length >= 4,
		'ThemeRoller - month table week count');
	var week = table.children(':eq(1)').children(':first');
	ok(week.is('tr'), 'ThemeRoller - month table week row');
	equal(week.children().length, 7, 'ThemeRoller - week child count');
	ok(week.children(':first').children().is('.ui-datepicker-week-end'),
		'ThemeRoller - month table first day cell');
	ok(!week.children(':eq(1)').children().is('.ui-datepicker-week-end'),
		'ThemeRoller - month table second day cell');
	var control = dp.children(':eq(2)');
	ok(control.is('div.ui-datepicker-header'), 'ThemeRoller - controls division');
	equal(control.children().length, 2, 'ThemeRoller - control child count');
	ok(control.children(':first').is('button.ui-datepicker-cmd-clear'),
		'ThemeRoller - clear link');
	ok(control.children(':last').is('button.ui-datepicker-cmd-close'),
		'ThemeRoller - close link');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// Multi-month 2
	inp = init('#inp', {monthsToShow: 2, renderer: $.calendarsPicker.themeRollerRenderer});
	inp.focus();
	dp = $('#ui-datepicker-div');
	ok(dp.is('.ui-datepicker-multi'), 'ThemeRoller multi - multi-month');
	equal(dp.children().length, 4, 'ThemeRoller multi - child count');
	row = dp.children(':eq(1)');
	ok(row.is('div.ui-datepicker-row-break'), 'ThemeRoller multi - month row division');
	equal(row.children().length, 2, 'ThemeRoller multi - month row child count');
	month = row.children(':eq(0)');
	ok(month.is('div.ui-datepicker-group'), 'ThemeRoller multi - first month division');
	month = row.children(':eq(1)');
	ok(month.is('div.ui-datepicker-group'), 'ThemeRoller multi - second month division');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// Multi-month [2, 2]
	inp = init('#inp', {monthsToShow: [2, 2], renderer: $.calendarsPicker.themeRollerRenderer});
	inp.focus();
	dp = $('#ui-datepicker-div');
	ok(dp.is('.ui-datepicker-multi'), 'ThemeRoller multi - multi-month');
	equal(dp.children().length, 5, 'ThemeRoller multi - child count');
	row = dp.children(':eq(1)');
	ok(row.is('div.ui-datepicker-row-break'), 'ThemeRoller multi - first month row division');
	equal(row.children('.ui-datepicker-group').length, 2, 'ThemeRoller multi - month row child count');
	row = dp.children(':eq(2)');
	ok(row.is('div.ui-datepicker-row-break'), 'ThemeRoller multi - second month row division');
	equal(row.children('.ui-datepicker-group').length, 2, 'ThemeRoller multi - month row child count');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// Week of year
	inp = init('#inp', {renderer: $.calendarsPicker.themeRollerWeekOfYearRenderer});
	inp.focus();
	dp = $('#ui-datepicker-div');
	var week = dp.find('tr:first');
	ok(week.children().length == 8, 'ThemeRoller week of year - column count');
	ok(week.children(':first').is('th.ui-state-hover'), 'ThemeRoller week of year - first column');
	ok(week.children(':eq(1)').is('th') && !week.children(':eq(1)').is('.ui-state-hover'),
		'ThemeRoller week of year - second column');
	week = dp.find('tr:eq(1)');
	ok(week.children().length == 8, 'ThemeRoller week of year - column count');
	ok(week.children(':first').is('td.ui-state-hover'), 'ThemeRoller week of year - first column');
	ok(week.children(':eq(1)').is('td') && !week.children(':eq(1)').is('.ui-state-hover'),
		'ThemeRoller week of year - second column');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
});

test('Enable/disable', function() {
	expect(31);
	var inp = init('#inp');
	ok(!inp.calendarsPicker('isDisabled'), 'Enable/disable - initially marked as enabled');
	ok(!inp[0].disabled, 'Enable/disable - field initially enabled');
	inp.calendarsPicker('disable');
	ok(inp.calendarsPicker('isDisabled'), 'Enable/disable - now marked as disabled');
	ok(inp[0].disabled, 'Enable/disable - field now disabled');
	inp.calendarsPicker('enable');
	ok(!inp.calendarsPicker('isDisabled'), 'Enable/disable - now marked as enabled');
	ok(!inp[0].disabled, 'Enable/disable - field now enabled');
	inp.calendarsPicker('destroy');
	// With a button
	inp = init('#inp', {showTrigger: '<button>...</button>'});
	ok(!inp.calendarsPicker('isDisabled'), 'Enable/disable button - initially marked as enabled');
	ok(!inp[0].disabled, 'Enable/disable button - field initially enabled');
	ok(!inp.next('button')[0].disabled, 'Enable/disable button - button initially enabled');
	inp.calendarsPicker('disable');
	ok(inp.calendarsPicker('isDisabled'), 'Enable/disable button - now marked as disabled');
	ok(inp[0].disabled, 'Enable/disable button - field now disabled');
	ok(inp.next('button')[0].disabled, 'Enable/disable button - button now disabled');
	inp.calendarsPicker('enable');
	ok(!inp.calendarsPicker('isDisabled'), 'Enable/disable button - now marked as enabled');
	ok(!inp[0].disabled, 'Enable/disable button - field now enabled');
	ok(!inp.next('button')[0].disabled, 'Enable/disable button - button now enabled');
	inp.calendarsPicker('destroy');
	// With an image button
	inp = init('#inp', {showTrigger: '<img src="cal.gif" alt="Cal"></img>'});
	ok(!inp.calendarsPicker('isDisabled'), 'Enable/disable image - initially marked as enabled');
	ok(!inp[0].disabled, 'Enable/disable image - field initially enabled');
	ok(inp.next('img').css('opacity') == 1, 'Enable/disable image - image initially enabled');
	inp.calendarsPicker('disable');
	ok(inp.calendarsPicker('isDisabled'), 'Enable/disable image - now marked as disabled');
	ok(inp[0].disabled, 'Enable/disable image - field now disabled');
	ok(inp.next('img').css('opacity') != 1, 'Enable/disable image - image now disabled');
	inp.calendarsPicker('enable');
	ok(!inp.calendarsPicker('isDisabled'), 'Enable/disable image - now marked as enabled');
	ok(!inp[0].disabled, 'Enable/disable image - field now enabled');
	ok(inp.next('img').css('opacity') == 1, 'Enable/disable image - image now enabled');
	inp.calendarsPicker('destroy');
	// Inline
	var inl = init('#inl');
	ok(!inl.calendarsPicker('isDisabled'), 'Enable/disable inline - initially marked as enabled');
	ok($('div.calendars-disabled', inl).length == 0, 'Enable/disable inline - cover initially absent');
	inl.calendarsPicker('disable');
	ok(inl.calendarsPicker('isDisabled'), 'Enable/disable inline - now marked as disabled');
	var disabled = $('div.calendars-disable', inl);
	var dp = $('div.calendars', inl);
	ok(disabled.length == 1, 'Enable/disable inline - cover now present');
	ok(disabled.outerWidth() == dp.outerWidth() && disabled.outerHeight() == dp.outerHeight(),
		'Enable/disable inline - cover sizing');
	inl.calendarsPicker('enable');
	ok(!inl.calendarsPicker('isDisabled'), 'Enable/disable inline - now marked as enabled');
	ok($('div.calendars-disabled', inl).length == 0, 'Enable/disable inline - cover now absent');
	inl.calendarsPicker('destroy');
});

test('Cross talk', function() {
	expect(14);
	var inp = init('#inp');
	var alt = init('#alt');
	// Enable/disable
	ok(!inp.calendarsPicker('isDisabled'), 'First is enabled');
	ok(!alt.calendarsPicker('isDisabled'), 'Second is enabled');
	inp.calendarsPicker('disable');
	ok(inp.calendarsPicker('isDisabled'), 'First is disabled');
	ok(!alt.calendarsPicker('isDisabled'), 'Second is enabled');
	alt.calendarsPicker('disable');
	ok(inp.calendarsPicker('isDisabled'), 'First is disabled');
	ok(alt.calendarsPicker('isDisabled'), 'Second is disabled');
	inp.calendarsPicker('enable');
	ok(!inp.calendarsPicker('isDisabled'), 'First is enabled');
	ok(alt.calendarsPicker('isDisabled'), 'Second is disabled');
	alt.calendarsPicker('enable');
	ok(!inp.calendarsPicker('isDisabled'), 'First is enabled');
	ok(!alt.calendarsPicker('isDisabled'), 'Second is enabled');
	// Destroy
	ok(inp.hasClass('is-calendarsPicker'), 'First has class');
	ok(alt.hasClass('is-calendarsPicker'), 'Second has class');
	inp.calendarsPicker('destroy');
	ok(!inp.hasClass('is-calendarsPicker'), 'First has no class');
	ok(alt.hasClass('is-calendarsPicker'), 'Second has class');
});

test('Keystrokes', function() {
	expect(28);
	var inp = init('#inp');
	var calendar = $.calendars.instance();
	var today = calendar.today();
	var date = calendar.newDate(2008, 2, 4);
	inp.val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [today], 'Keystroke enter');
	inp.val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Keystroke enter - preset');
	inp.val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_HOME}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Keystroke ctrl+home');
	inp.val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_END});
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Keystroke ctrl+end');
	inp.val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Keystroke esc');
	inp.val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Keystroke esc - preset');
	inp.val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Keystroke esc - abandoned');
	// Moving by day or week
	inp.val('').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_LEFT}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date = calendar.today().add(-1, 'd');
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Keystroke ctrl+left');
	inp.val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_LEFT}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.add(1, 'd');
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Keystroke left');
	inp.val('').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_RIGHT}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.add(1, 'd');
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Keystroke ctrl+right');
	inp.val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_RIGHT}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.add(-1, 'd');
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Keystroke right');
	inp.val('').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_UP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.add(-7, 'd');
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Keystroke ctrl+up');
	inp.val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_UP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.add(7, 'd');
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Keystroke up');
	inp.val('').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.add(7, 'd');
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Keystroke ctrl+down');
	inp.val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date.add(-7, 'd');
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Keystroke down');
	// Moving by month or year
	inp.val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2008, 1, 4)],
		'Keystroke pgup');
	inp.val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2008, 3, 4)],
		'Keystroke pgdn');
	inp.val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2007, 2, 4)],
		'Keystroke ctrl+pgup');
	inp.val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2009, 2, 4)],
		'Keystroke ctrl+pgdn');
	// Check for moving to short months
	inp.val('03/31/2008').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2008, 2, 29)],
		'Keystroke pgup - Feb');
	inp.val('01/30/2008').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2008, 2, 29)],
		'Keystroke pgdn - Feb');
	inp.val('02/29/2008').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2007, 2, 28)],
		'Keystroke ctrl+pgup - Feb');
	inp.val('02/29/2008').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2009, 2, 28)],
		'Keystroke ctrl+pgdn - Feb');
	// Goto current
	inp.calendarsPicker('hide').val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_HOME}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2008, 2, 4)],
		'Keystroke ctrl+home');
	// Change steps
	inp.calendarsPicker('option', {monthsToStep: 2, monthsToJump: 6}).
		calendarsPicker('hide').val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2007, 12, 4)],
		'Keystroke pgup step 2');
	inp.val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2008, 4, 4)],
		'Keystroke pgdn step 2');
	inp.val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2007, 8, 4)],
		'Keystroke ctrl+pgup step 6');
	inp.val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2008, 8, 4)],
		'Keystroke ctrl+pgdn step 6');
});

test('Mouse', function() {
	expect(16);
	var inp = init('#inp');
	var calendar = $.calendars.instance();
	inp.val('').calendarsPicker('show');
	$('div.calendars a:contains(10)').click();
	var date = calendar.newDate().day(10);
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Mouse click');
	inp.val('02/04/2008').calendarsPicker('show');
	$('div.calendars a:contains(12)').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2008, 2, 12)],
		'Mouse click - preset');
	inp.val('02/04/2008').calendarsPicker('show');
	$('div.calendars a.calendars-cmd-clear').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Mouse click - clear');
	inp.val('').calendarsPicker('show');
	$('div.calendars a.calendars-cmd-close').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Mouse click - close');
	inp.val('02/04/2008').calendarsPicker('show');
	$('div.calendars a.calendars-cmd-close').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2008, 2, 4)],
		'Mouse click - close + preset');
	inp.val('02/04/2008').calendarsPicker('show');
	$('div.calendars a.calendars-cmd-prev').click();
	$('div.calendars a.calendars-cmd-close').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2008, 2, 4)],
		'Mouse click - abandoned');
	// Today/previous/next
	inp.val('02/04/2008').calendarsPicker('show');
	$('div.calendars a.calendars-cmd-today').click();
	$('div.calendars a:contains(14)').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [date.day(14)], 'Mouse click - today');
	inp.val('02/04/2008').calendarsPicker('show');
	$('div.calendars a.calendars-cmd-prev').click();
	$('div.calendars a:contains(16)').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2008, 1, 16)],
		'Mouse click - previous');
	inp.val('02/04/2008').calendarsPicker('show');
	$('div.calendars a.calendars-cmd-next').click();
	$('div.calendars a:contains(18)').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2008, 3, 18)],
		'Mouse click - next');
	// Previous/next with minimum/maximum
	inp.calendarsPicker('option', {minDate: calendar.newDate(2008, 2, 2),
		maxDate: calendar.newDate(2008, 2, 26)}).val('02/04/2008').calendarsPicker('show');
	$('div.calendars a.calendars-cmd-prev').click();
	$('div.calendars a:contains(16)').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2008, 2, 16)],
		'Mouse click - previous + min/max');
	inp.val('02/04/2008').calendarsPicker('show');
	$('div.calendars a.calendars-cmd-next').click();
	$('div.calendars a:contains(18)').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2008, 2, 18)],
		'Mouse click - next + min/max');
	// Inline
	var inl = init('#inl');
	date = calendar.newDate();
	inl.calendarsPicker('setDate', date);
	$('div.calendars a:contains(10)').click();
	equalCDateArray(inl.calendarsPicker('getDate'), [date.day(10)], 'Mouse click inline');
	inl.calendarsPicker('setDate', calendar.newDate(2008, 2, 4));
	$('div.calendars a:contains(12)').click();
	equalCDateArray(inl.calendarsPicker('getDate'), [calendar.newDate(2008, 2, 12)],
		'Mouse click inline - preset');
	$('div.calendars a.calendars-cmd-today').click();
	$('div.calendars a:contains(14)').click();
	equalCDateArray(inl.calendarsPicker('getDate'), [date.day(14)], 'Mouse click inline - current');
	inl.calendarsPicker('setDate', calendar.newDate(2008, 2, 4));
	$('div.calendars a.calendars-cmd-prev').click();
	$('div.calendars a:contains(16)').click();
	equalCDateArray(inl.calendarsPicker('getDate'), [calendar.newDate(2008, 1, 16)],
		'Mouse click inline - previous');
	inl.calendarsPicker('setDate', calendar.newDate(2008, 2, 4));
	$('div.calendars a.calendars-cmd-next').click();
	$('div.calendars a:contains(18)').click();
	equalCDateArray(inl.calendarsPicker('getDate'), [calendar.newDate(2008, 3, 18)],
		'Mouse click inline - next');
});

test('Mouse wheel', function() {
	expect(12);
	var mousewheel = function(ctrl) {
		var event = $.Event('mousewheel');
		event.ctrlKey = ctrl;
		return event;
	};
	var calendar = $.calendars.instance();
	var inp = init('#inp');
	inp.val('09/20/2010').calendarsPicker('show');
	$('div.calendars-popup').trigger(mousewheel(false), [+1]);
	$('div.calendars a:contains(10)').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2010, 8, 10)],
		'Mouse wheel - +1');
	inp.val('09/20/2010').calendarsPicker('show');
	$('div.calendars-popup').trigger(mousewheel(false), [-1]);
	$('div.calendars a:contains(10)').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2010, 10, 10)],
		'Mouse wheel - -1');
	inp.val('09/20/2010').calendarsPicker('show');
	$('div.calendars-popup').trigger(mousewheel(true), [+1]);
	$('div.calendars a:contains(10)').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2009, 9, 10)],
		'Mouse wheel - +1/Ctrl');
	inp.val('09/20/2010').calendarsPicker('show');
	$('div.calendars-popup').trigger(mousewheel(true), [-1]);
	$('div.calendars a:contains(10)').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2011, 9, 10)],
		'Mouse wheel - -1/Ctrl');
	// useMouseWheel = false
	inp = init('#inp', {useMouseWheel: false});
	inp.val('09/20/2010').calendarsPicker('show');
	$('div.calendars-popup').trigger(mousewheel(false), [+1]);
	$('div.calendars a:contains(10)').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2010, 9, 10)],
		'Mouse wheel off - +1');
	inp.val('09/20/2010').calendarsPicker('show');
	$('div.calendars-popup').trigger(mousewheel(false), [-1]);
	$('div.calendars a:contains(10)').click();
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2010, 9, 10)],
		'Mouse wheel off - -1');
	// Inline
	var inl = init('#inl');
	inl.calendarsPicker('setDate', calendar.newDate(2010, 9, 20));
	inl.trigger(mousewheel(false), [+1]);
	$('div.calendars a:contains(10)', inl).click();
	equalCDateArray(inl.calendarsPicker('getDate'), [calendar.newDate(2010, 8, 10)],
		'Mouse wheel inline - +1');
	inl.calendarsPicker('setDate', calendar.newDate(2010, 9, 20));
	inl.trigger(mousewheel(false), [-1]);
	$('div.calendars a:contains(10)', inl).click();
	equalCDateArray(inl.calendarsPicker('getDate'), [calendar.newDate(2010, 10, 10)],
		'Mouse wheel inline - -1');
	inl.calendarsPicker('setDate', calendar.newDate(2010, 9, 20));
	inl.trigger(mousewheel(true), [+1]);
	$('div.calendars a:contains(10)', inl).click();
	equalCDateArray(inl.calendarsPicker('getDate'), [calendar.newDate(2009, 9, 10)],
		'Mouse wheel inline - +1/Ctrl');
	inl.calendarsPicker('setDate', calendar.newDate(2010, 9, 20));
	inl.trigger(mousewheel(true), [-1]);
	$('div.calendars a:contains(10)', inl).click();
	equalCDateArray(inl.calendarsPicker('getDate'), [calendar.newDate(2011, 9, 10)],
		'Mouse wheel inline - -1/Ctrl');
	// useMouseWheel = false
	inl = init('#inl', {useMouseWheel: false});
	inl.calendarsPicker('setDate', calendar.newDate(2010, 9, 20));
	inl.trigger(mousewheel(false), [+1]);
	$('div.calendars a:contains(10)', inl).click();
	equalCDateArray(inl.calendarsPicker('getDate'), [calendar.newDate(2010, 9, 10)],
		'Mouse wheel inline off - +1');
	inl.calendarsPicker('setDate', calendar.newDate(2010, 9, 20));
	inl.trigger(mousewheel(false), [-1]);
	$('div.calendars a:contains(10)', inl).click();
	equalCDateArray(inl.calendarsPicker('getDate'), [calendar.newDate(2010, 9, 10)],
		'Mouse wheel inline off - -1');
});

test('Commands', function() {
	expect(8);
	var inp = init('#inp', {renderer: $.extend({}, $.calendarsPicker.defaultRenderer,
			{picker: $.calendarsPicker.defaultRenderer.picker.
				replace(/\{link:today\}/, '{link:millenium}')}),
		milleniumText: 'Millenium', milleniumStatus: 'Start of the millenium',
		commands: $.extend({}, $.calendarsPicker.commands, {
			millenium: {
			text: 'milleniumText', status: 'milleniumStatus',
			keystroke: {keyCode: 112, shiftKey: true}, // Shift+F1
			enabled: function(inst) {
				return inst.drawDate.compareTo(inst.drawDate.newDate(2001, 1, 1)) == +1; },
			date: function(inst) { return inst.drawDate.newDate(2001, 1, 1); },
				action: function(inst) { $.calendarsPicker.showMonth(this, 2001, 1, 1); }
			}
		})
	});
	var calendar = $.calendars.instance();
	inp.focus();
	var mm = $('a.calendars-cmd-millenium');
	ok(mm.length > 0, 'Commands - present');
	ok(mm.parent().hasClass('calendars-nav'), 'Commands - parent');
	equal(mm.text(), 'Millenium', 'Commands - text');
	equal(mm.attr('title'), 'Start of the millenium', 'Commands - status');
	inp.simulate('keydown', {shiftKey: true, keyCode: 112}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2001, 1, 1)],
		'Commands keystroke - shift+F1');
	inp.val('02/04/1980').calendarsPicker('show');
	mm = $('a.calendars-cmd-millenium.calendars-disabled');
	ok(mm.length > 0, 'Commands - present');
	// Change keystrokes
	inp.calendarsPicker('hide').
		calendarsPicker('option', {monthsToStep: 1, monthsToJump: 12,
			commands: $.extend({}, $.calendarsPicker.commands,
				{prevJump: $.extend({}, $.calendarsPicker.commands.prevJump,
				{keystroke: {keyCode: 33, altKey: true}})})}).
		val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2008, 2, 4)],
		'Commands keystroke - ctrl+pgup');
	inp.calendarsPicker('show').
		simulate('keydown', {altKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2007, 2, 4)],
		'Commands keystroke - alt+pgup');
});

test('Auto size', function() {
	expect(15);
	var inp = init('#inp');
	inp.attr('size', 1);
	equal(inp.attr('size'), 1, 'Auto size - default');
	inp.calendarsPicker('option', 'autoSize', true);
	equal(inp.attr('size'), 10, 'Auto size - mm/dd/yyyy');
	inp.calendarsPicker('option', 'dateFormat', 'm/d/yyyy');
	equal(inp.attr('size'), 10, 'Auto size - m/d/yyyy');
	inp.calendarsPicker('option', 'dateFormat', 'D M d yyyy');
	equal(inp.attr('size'), 15, 'Auto size - D M d yyyy');
	inp.calendarsPicker('option', 'dateFormat', 'DD, MM dd, yyyy');
	equal(inp.attr('size'), 29, 'Auto size - DD, MM dd, yyyy');
	inp.attr('size', 1);
	// French
	inp.calendarsPicker('option', $.extend({autoSize: false, dateFormat: null,
		calendar: $.calendars.instance('gregorian', 'fr')},
		$.calendarsPicker.regionalOptions['fr']));
	equal(inp.attr('size'), 1, 'Auto size - fr - default');
	inp.calendarsPicker('option', 'autoSize', true);
	equal(inp.attr('size'), 10, 'Auto size - fr - dd/mm/yyyy');
	inp.calendarsPicker('option', 'dateFormat', 'm/d/yyyy');
	equal(inp.attr('size'), 10, 'Auto size - fr - m/d/yyyy');
	inp.calendarsPicker('option', 'dateFormat', 'D M d yyyy');
	equal(inp.attr('size'), 15, 'Auto size - fr - D M d yyyy');
	inp.calendarsPicker('option', 'dateFormat', 'DD, MM dd, yyyy');
	equal(inp.attr('size'), 28, 'Auto size - fr - DD, MM dd, yyyy');
	inp.attr('size', 1);
	// Hebrew
	inp.calendarsPicker('option', $.extend({autoSize: false, dateFormat: null,
		calendar: $.calendars.instance('gregorian', 'he')},
		$.calendarsPicker.regionalOptions['he']));
	equal(inp.attr('size'), 1, 'Auto size - he - default');
	inp.calendarsPicker('option', 'autoSize', true);
	equal(inp.attr('size'), 10, 'Auto size - he - dd/mm/yyyy');
	inp.calendarsPicker('option', 'dateFormat', 'm/d/yyyy');
	equal(inp.attr('size'), 10, 'Auto size - he - m/d/yyyy');
	inp.calendarsPicker('option', 'dateFormat', 'D M d yyyy');
	equal(inp.attr('size'), 14, 'Auto size - he - D M d yyyy');
	inp.calendarsPicker('option', 'dateFormat', 'DD, MM dd, yyyy');
	equal(inp.attr('size'), 23, 'Auto size - he - DD, MM dd, yyyy');
});

test('Default date', function() {
	expect(20);
	var inp = init('#inp');
	var calendar = $.calendars.instance();
	var date = calendar.today();
	inp.val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Default date null');
	// Numeric values
	inp.calendarsPicker('option', {defaultDate: -2}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date.add(-2, 'd')], 'Default date -2');
	inp.calendarsPicker('option', {defaultDate: 3}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date.add(+5, 'd')], 'Default date 3');
	inp.calendarsPicker('option', {defaultDate: 1 / 0}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date.add(-3, 'd')], 'Default date 1 / 0');
	inp.calendarsPicker('option', {defaultDate: 1 / 'a'}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Default date NaN');
	// String offset values
	inp.calendarsPicker('option', {defaultDate: '-1d'}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date.add(-1, 'd')], 'Default date -1d');
	inp.calendarsPicker('option', {defaultDate: '+3D'}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date.add(+4, 'd')], 'Default date +3D');
	inp.calendarsPicker('option', {defaultDate: ' -2 w '}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date = calendar.today().add(-14, 'd');
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Default date -2 w');
	inp.calendarsPicker('option', {defaultDate: '+1 W'}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date.add(+21, 'd')], 'Default date +1 W');
	inp.calendarsPicker('option', {defaultDate: ' -1 m '}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date = calendar.today().add(-1, 'm');
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Default date -1 m');
	inp.calendarsPicker('option', {defaultDate: '+2M'}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date.add(+3, 'm')], 'Default date +2M');
	inp.calendarsPicker('option', {defaultDate: '-2y'}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date = calendar.today().add(-2, 'y');
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Default date -2y');
	inp.calendarsPicker('option', {defaultDate: '+1 Y '}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date.add(+3, 'y')], 'Default date +1 Y');
	inp.calendarsPicker('option', {defaultDate: '+1M +10d'}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date = calendar.today().add(+1, 'm').add(+10, 'd');
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Default date +1M +10d');
	date = calendar.newDate(2007, 1, 26);
	inp.calendarsPicker('option', {defaultDate: date}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Default date 01/26/2007');
	// String date values
	inp.calendarsPicker('option', {defaultDate: '06/04/2009'}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date = calendar.newDate(2009, 6, 4);
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Default date 06/04/2009');
	inp.calendarsPicker('option', {dateFormat: 'yyyy-mm-dd', defaultDate: '2009-01-26'}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date = calendar.newDate(2009, 1, 26);
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Default date 2009-01-26');
	inp.calendarsPicker('option', {defaultDate: 'invalid'}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date = calendar.today();
	equalCDateArray(inp.calendarsPicker('getDate'), [date], 'Default date invalid');
	inp.calendarsPicker('option', {dateFormat: 'mm/dd/yyyy'});
	// Select default
	inp.val('');
	inp = init('#inp', {defaultDate: calendar.newDate(2009, 6, 4), selectDefaultDate: true});
	equal(inp.val(), '06/04/2009', 'Show default - init');
	inp.val('02/04/2009').calendarsPicker('show');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_END});
	equal(inp.val(), '06/04/2009', 'Show default - clear');
});

test('Miscellaneous', function() {
	expect(40);
	var inp = init('#inp', {earlierText: 'Before', laterText: 'After'});
	var genYears = function(start, count, desc, exclExtras) {
		var years = exclExtras ? '' : 'Before';
		var y = 0;
		for (var i = 0; i <= count; i++,(desc ? y-- : y++)) {
			years += (start + y);
		}
		years += exclExtras ? '' : 'After';
		return years;
	};
	var calendar = $.calendars.instance();
	// Year range
	inp.val('02/04/2008').calendarsPicker('show');
	equal($('select.calendars-month-year:last').text(), genYears(1998, 20),
		'Year range - default');
	equal($('select.calendars-month-year:last option:first').val(), '2/1988', 'Earlier year - default');
	equal($('select.calendars-month-year:last option:last').val(), '2/2028', 'Later year - default');
	inp.calendarsPicker('hide').calendarsPicker('option', {minDate: calendar.newDate(2010, 1, 1), maxDate: calendar.newDate(2016, 1, 1)}).
		calendarsPicker('show');
	equal($('select.calendars-month-year:last').text(), genYears(2010, 6, false, true),
		'Year range - default, min/max set');
	inp.calendarsPicker('option', {minDate: null, maxDate: null}).
		calendarsPicker('hide').calendarsPicker('option', {yearRange: '-6:+2'}).calendarsPicker('show');
	equal($('select.calendars-month-year:last').text(), genYears(new Date().getFullYear() - 6, 8),
		'Year range - -6:+2');
	inp.calendarsPicker('hide').calendarsPicker('option', {yearRange: '2000:2010'}).calendarsPicker('show');
	equal($('select.calendars-month-year:last').text(), genYears(2000, 10),
		'Year range - 2000:2010');
	inp.calendarsPicker('hide').calendarsPicker('option', {yearRange: 'c-5:c+5'}).
		val('01/01/2001').calendarsPicker('show');
	equal($('select.calendars-month-year:last').text(), genYears(1996, 10),
		'Year range - c-5:c+5');
	equal($('select.calendars-month-year:last option:first').val(), '1/1991', 'Earlier year - c-5:c+5');
	equal($('select.calendars-month-year:last option:last').val(), '1/2011', 'Later year - c-5:c+5');
	inp.calendarsPicker('hide').calendarsPicker('option', {yearRange: '2010:2000'}).calendarsPicker('show');
	equal($('select.calendars-month-year:last').text(), genYears(2010, 10, true),
		'Year range - 2010:2000');
	// Commands as date format
	equal($('a.calendars-cmd-prev').text(), '<Prev', 'Navigation prev - default');
	equal($('a.calendars-cmd-today').text(), 'Today', 'Navigation current - default');
	equal($('a.calendars-cmd-next').text(), 'Next>', 'Navigation next - default');
	inp.calendarsPicker('hide').calendarsPicker('option', {commandsAsDateFormat: true,
		prevText: '< M', todayText: 'MM', nextText: 'M >'}).
		val('02/04/2008').calendarsPicker('show');
	var longNames = calendar.local.monthNames;
	var shortNames = calendar.local.monthNamesShort;
	var date = calendar.today();
	equal($('a.calendars-cmd-prev').text(),
		'< ' + shortNames[0], 'Navigation prev - as date format');
	equal($('a.calendars-cmd-today').text(),
		longNames[date.month() - 1], 'Navigation today - as date format');
	equal($('a.calendars-cmd-next').text(),
		shortNames[2] + ' >', 'Navigation next - as date format');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGDN});
	equal($('a.calendars-cmd-prev').text(),
		'< ' + shortNames[1], 'Navigation prev - as date format + pgdn');
	equal($('a.calendars-cmd-today').text(),
		longNames[date.month() - 1], 'Navigation today - as date format + pgdn');
	equal($('a.calendars-cmd-next').text(),
		shortNames[3] + ' >', 'Navigation next - as date format + pgdn');
	inp.calendarsPicker('hide').calendarsPicker('option', {currentText: 'MM', renderer:
		$.extend({}, $.calendarsPicker.defaultRenderer,
		{picker: $.calendarsPicker.defaultRenderer.picker.replace(/today/, 'current')})}).
		val('02/04/2008').calendarsPicker('show');
	equal($('a.calendars-cmd-prev').text(),
		'< ' + shortNames[0], 'Navigation prev - as date format + current');
	equal($('a.calendars-cmd-current').text(),
		longNames[1], 'Navigation current - as date format + current');
	equal($('a.calendars-cmd-next').text(),
		shortNames[2] + ' >', 'Navigation next - as date format + current');
	// Show current at pos
	inp.calendarsPicker('hide').calendarsPicker('option', {monthsToShow: 3,
		renderer: $.calendarsPicker.defaultRenderer}).
		val('02/04/2008').calendarsPicker('show');
	equal($('a.calendars-cmd-prev').text(),
		'< ' + shortNames[0], 'Show current at pos - default prev');
	equal($('a.calendars-cmd-next').text(),
		shortNames[2] + ' >', 'Show current at pos - default next');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGDN});
	equal($('a.calendars-cmd-prev').text(),
		'< ' + shortNames[1], 'Show current at pos - default prev + pgdn');
	equal($('a.calendars-cmd-next').text(),
		shortNames[3] + ' >', 'Show current at pos - default next + pgdn');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGUP});
	equal($('a.calendars-cmd-prev').text(),
		'< ' + shortNames[0], 'Show current at pos - default prev + pgup');
	equal($('a.calendars-cmd-next').text(),
		shortNames[2] + ' >', 'Show current at pos - default next + pgup');
	inp.calendarsPicker('hide').calendarsPicker('option', {monthsToShow: 3, monthsOffset: 1}).
		val('02/04/2008').calendarsPicker('show');
	equal($('a.calendars-cmd-prev').text(),
		'< ' + shortNames[11], 'Show current at pos - pos 1 prev');
	equal($('a.calendars-cmd-next').text(),
		shortNames[1] + ' >', 'Show current at pos - pos 1 next');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGDN});
	equal($('a.calendars-cmd-prev').text(),
		'< ' + shortNames[0], 'Show current at pos - pos 1 prev + pgdn');
	equal($('a.calendars-cmd-next').text(),
		shortNames[2] + ' >', 'Show current at pos - pos 1 next + pgdn');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGUP});
	equal($('a.calendars-cmd-prev').text(),
		'< ' + shortNames[11], 'Show current at pos - pos 1 prev + pgup');
	equal($('a.calendars-cmd-next').text(),
		shortNames[1] + ' >', 'Show current at pos - pos 1 next + pgup');
	inp.calendarsPicker('hide').calendarsPicker('option', {monthsToShow: 3, monthsOffset: 2}).
		val('02/04/2008').calendarsPicker('show');
	equal($('a.calendars-cmd-prev').text(),
		'< ' + shortNames[10], 'Show current at pos - pos 2 prev');
	equal($('a.calendars-cmd-next').text(),
		shortNames[0] + ' >', 'Show current at pos - pos 2 next');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGDN});
	equal($('a.calendars-cmd-prev').text(),
		'< ' + shortNames[11], 'Show current at pos - pos 2 prev + pgdn');
	equal($('a.calendars-cmd-next').text(),
		shortNames[1] + ' >', 'Show current at pos - pos 2 next + pgdn');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGUP});
	equal($('a.calendars-cmd-prev').text(),
		'< ' + shortNames[10], 'Show current at pos - pos 2 prev + pgup');
	equal($('a.calendars-cmd-next').text(),
		shortNames[0] + ' >', 'Show current at pos - pos 2 next + pgup');
	inp.calendarsPicker('hide');
});

test('Other months', function() {
	expect(8);
	var inp = init('#inp');
	inp.val('01/01/2008').calendarsPicker('show');
	var calendar = $.calendars.instance();
	equal($('div.calendars table').text(),
		'SuMoTuWeThFrSa\u00a0\u00a012345678910111213141516171819202122232425262728293031\u00a0\u00a0',
		'Other months - default');
	$('div.calendars table a:first').click();
	equalCDate(inp.calendarsPicker('getDate'), calendar.newDate(2008, 1, 1),
		'Other months - default click');
	inp.calendarsPicker('option', {showOtherMonths: true}).
		val('01/01/2008').calendarsPicker('show');
	equal($('div.calendars table').text(),
		'SuMoTuWeThFrSa30311234567891011121314151617181920212223242526272829303112',
		'Other months - show');
	$('div.calendars table a:first').click();
	equalCDate(inp.calendarsPicker('getDate'), calendar.newDate(2008, 1, 1),
		'Other months - show click');
	inp.calendarsPicker('option', {showOtherMonths: true, selectOtherMonths: true}).
		val('01/01/2008').calendarsPicker('show');
	equal($('div.calendars table').text(),
		'SuMoTuWeThFrSa30311234567891011121314151617181920212223242526272829303112',
		'Other months - show/select');
	$('div.calendars table a:first').click();
	equalCDate(inp.calendarsPicker('getDate'), calendar.newDate(2007, 12, 30),
		'Other months - show/select click');
	inp.calendarsPicker('option', {showOtherMonths: false, selectOtherMonths: true}).
		val('01/01/2008').calendarsPicker('show');
	equal($('div.calendars table').text(),
		'SuMoTuWeThFrSa\u00a0\u00a012345678910111213141516171819202122232425262728293031\u00a0\u00a0',
		'Other months - select');
	$('div.calendars table a:first').click();
	equalCDate(inp.calendarsPicker('getDate'), calendar.newDate(2008, 1, 1),
		'Other months - select click');
});

test('Min/max', function() {
	expect(25);
	var inp = init('#inp', {renderer: $.extend({}, $.calendarsPicker.defaultRenderer,
		{picker: $.calendarsPicker.defaultRenderer.picker.
			replace(/\{link:prev\}/, '{link:prevJump}{link:prev}').
			replace(/\{link:next\}/, '{link:nextJump}{link:next}')})});
	var calendar = $.calendars.instance();
	var start = calendar.newDate(2008, 6, 4);
	var lastYear = calendar.newDate(2007, 6, 4);
	var nextYear = calendar.newDate(2009, 6, 4);
	var minDate = calendar.newDate(2008, 2, 29);
	var maxDate = calendar.newDate(2008, 12, 7);
	inp.val('06/04/2008').calendarsPicker('show');
	ok(!$('a.calendars-cmd-prevJump').is('a.calendars-disabled'), 'Min/max - prev year enabled');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [lastYear],
		'Min/max - null, null - ctrl+pgup');
	inp.val('06/04/2008').calendarsPicker('show');
	ok(!$('a.calendars-cmd-nextJump').is('a.calendars-disabled'), 'Min/max - next year enabled');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [nextYear],
		'Min/max - null, null - ctrl+pgdn');
	inp.calendarsPicker('option', {minDate: minDate}).
		calendarsPicker('hide').val('06/04/2008').calendarsPicker('show');
	ok($('a.calendars-cmd-prevJump').is('a.calendars-disabled'), 'Min/max - prev year disabled');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [start],
		'Min/max - 02/29/2008, null - ctrl+pgup');
	inp.val('06/04/2008').calendarsPicker('show');
	ok(!$('a.calendars-cmd-nextJump').is('a.calendars-disabled'), 'Min/max - next year enabled');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [nextYear],
		'Min/max - 02/29/2008, null - ctrl+pgdn');
	inp.calendarsPicker('option', {maxDate: maxDate}).
		calendarsPicker('hide').val('06/04/2008').calendarsPicker('show');
	ok($('a.calendars-cmd-prevJump').is('a.calendars-disabled'), 'Min/max - prev year disabled');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [start],
		'Min/max - 02/29/2008, 12/07/2008 - ctrl+pgup');
	inp.val('06/04/2008').calendarsPicker('show');
	ok($('a.calendars-cmd-nextJump').is('a.calendars-disabled'), 'Min/max - next year disabled');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [start],
		'Min/max - 02/29/2008, 12/07/2008 - ctrl+pgdn');
	inp.calendarsPicker('option', {minDate: null}).
		calendarsPicker('hide').val('06/04/2008').calendarsPicker('show');
	ok(!$('a.calendars-cmd-prevJump').is('a.calendars-disabled'), 'Min/max - prev year enabled');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [lastYear],
		'Min/max - null, 12/07/2008 - ctrl+pgup');
	inp.val('06/04/2008').calendarsPicker('show');
	ok($('a.calendars-cmd-nextJump').is('a.calendars-disabled'), 'Min/max - next year disabled');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [start],
		'Min/max - null, 12/07/2008 - ctrl+pgdn');
	// Relative dates
	var date = calendar.today();
	inp.calendarsPicker('option', {minDate: '-1w', maxDate: '+1 M +10 D '}).
		calendarsPicker('hide').val('').calendarsPicker('show');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date],
		'Min/max - -1w, +1 M +10 D - ctrl+pgup');
	inp.val('').calendarsPicker('show');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date],
		'Min/max - -1w, +1 M +10 D - ctrl+pgdn');
	// With existing date
	inp = init('#inp');
	inp.calendarsPicker('setDate', '06/04/2008').calendarsPicker('option', {minDate: minDate});
	equalCDateArray(inp.calendarsPicker('getDate'), [start],
		'Min/max - setDate > min');
	inp.calendarsPicker('option', {minDate: null}).calendarsPicker('setDate', '01/04/2008').
		calendarsPicker('option', {minDate: minDate});
	equalCDateArray(inp.calendarsPicker('getDate'), [],
		'Min/max - setDate < min');
	inp.calendarsPicker('option', {minDate: null}).calendarsPicker('setDate', '06/04/2008').
		calendarsPicker('option', {maxDate: maxDate});
	equalCDateArray(inp.calendarsPicker('getDate'), [start],
		'Min/max - setDate < max');
	inp.calendarsPicker('option', {maxDate: null}).calendarsPicker('setDate', '01/04/2009').
		calendarsPicker('option', {maxDate: maxDate});
	equalCDateArray(inp.calendarsPicker('getDate'), [],
		'Min/max - setDate > max');
	inp.calendarsPicker('option', {maxDate: null}).calendarsPicker('setDate', '01/04/2008').
		calendarsPicker('option', {minDate: minDate, maxDate: maxDate});
	equalCDateArray(inp.calendarsPicker('getDate'), [],
		'Min/max - setDate < min');
	inp.calendarsPicker('option', {maxDate: null}).calendarsPicker('setDate', '06/04/2008').
		calendarsPicker('option', {minDate: minDate, maxDate: maxDate});
	equalCDateArray(inp.calendarsPicker('getDate'), [start],
		'Min/max - setDate > min, < max');
	inp.calendarsPicker('option', {maxDate: null}).calendarsPicker('setDate', '01/04/2009').
		calendarsPicker('option', {minDate: minDate, maxDate: maxDate});
	equalCDateArray(inp.calendarsPicker('getDate'), [],
		'Min/max - setDate > max');
});

test('Set date', function() {
	expect(44);
	var calendar = $.calendars.instance();
	var today = calendar.today();
	var date1 = calendar.newDate(2008, 6, 4);
	var date2 = calendar.today();
	var inp = $('#inp').val('');
	init('#inp');
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Set date - blank');
	inp.val('06/08/2010');
	init('#inp');
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2010, 6, 8)], 'Set date - preset');
	inp.val('2010-06-08');
	init('#inp');
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Set date - invalid');
	inp.calendarsPicker('setDate', date1);
	equalCDateArray(inp.calendarsPicker('getDate'), [date1], 'Set date - 2008-06-04');
	date1 = calendar.today().add(+7, 'd');
	inp.calendarsPicker('setDate', +7);
	equalCDateArray(inp.calendarsPicker('getDate'), [date1], 'Set date - +7');
	inp.calendarsPicker('setDate', '+2y');
	equalCDateArray(inp.calendarsPicker('getDate'), [date2.add(+2, 'y')], 'Set date - +2y');
	inp.calendarsPicker('setDate', date1, date2);
	equalCDateArray(inp.calendarsPicker('getDate'), [date1], 'Set date - two dates');
	inp.calendarsPicker('setDate');
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Set date - null');
	// Relative to current date
	date1 = calendar.today().add(+7, 'd');
	inp.calendarsPicker('setDate', 'c +7');
	equalCDateArray(inp.calendarsPicker('getDate'), [date1], 'Set date - c +7');
	inp.calendarsPicker('setDate', 'c+7');
	equalCDateArray(inp.calendarsPicker('getDate'), [date1.add(+7, 'd')], 'Set date - c+7');
	inp.calendarsPicker('setDate', 'c -3 w');
	equalCDateArray(inp.calendarsPicker('getDate'), [date1.add(-21, 'd')], 'Set date - c -3 w');
	// Ranges
	date1 = calendar.newDate(2008, 6, 4);
	date2 = calendar.newDate(2009, 7, 5);
	inp.calendarsPicker('option', {rangeSelect: true}).
		calendarsPicker('setDate', date1, date2);
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, date2],
		'Set date range - 2008-06-04 - 2009-07-05');
	inp.calendarsPicker('setDate', date1);
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, date1], 'Set date range - 2008-06-04');
	date1 = calendar.today().add(-10, 'd');
	date2 = calendar.today().add(+10, 'd');
	inp.calendarsPicker('setDate', -10, +10);
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, date2], 'Set date range - -10 - +10');
	inp.calendarsPicker('setDate', -10);
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, date1], 'Set date range - -10');
	date1 = calendar.today().add(-14, 'd');
	date2 = calendar.today().add(+1, 'y');
	inp.calendarsPicker('setDate', '-2w', '+1Y');
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, date2], 'Set date range - -2w - +1Y');
	inp.calendarsPicker('setDate', '-2w');
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, date1], 'Set date range - -2w');
	inp.calendarsPicker('setDate');
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Set date range - null');
	// Inline
	var inl = init('#inl');
	date1 = calendar.newDate(2008, 6, 4);
	date2 = calendar.today();
	equalCDateArray(inl.calendarsPicker('getDate'), [], 'Set date inline - default');
	inl.calendarsPicker('setDate', date1);
	equalCDateArray(inl.calendarsPicker('getDate'), [date1], 'Set date inline - 2008-06-04');
	date1 = calendar.today().add(+7, 'd');
	inl.calendarsPicker('setDate', +7);
	equalCDateArray(inl.calendarsPicker('getDate'), [date1], 'Set date inline - +7');
	inl.calendarsPicker('setDate', '+2y');
	equalCDateArray(inl.calendarsPicker('getDate'), [date2.add(+2, 'y')], 'Set date inline - +2y');
	inl.calendarsPicker('setDate', date1, date2);
	equalCDateArray(inl.calendarsPicker('getDate'), [date1], 'Set date inline - two dates');
	inl.calendarsPicker('setDate');
	equalCDateArray(inl.calendarsPicker('getDate'), [], 'Set date inline - null');
	// Alternate field
	var alt = $('#alt');
	inp.calendarsPicker('option', {altField: '#alt', altFormat: 'yyyy-mm-dd'});
	date1 = calendar.newDate(2008, 6, 4);
	date2 = calendar.newDate(2009, 7, 5);
	inp.calendarsPicker('setDate', date1, date2);
	equal(inp.val(), '06/04/2008 - 07/05/2009', 'Set date alternate - 06/04/2008 - 07/05/2009');
	equal(alt.val(), '2008-06-04 - 2009-07-05', 'Set date alternate - 2008-06-04 - 2009-07-05');
	inp.calendarsPicker('option', {rangeSelect: false}).calendarsPicker('setDate', date1);
	equal(inp.val(), '06/04/2008', 'Set date alternate - 06/04/2008');
	equal(alt.val(), '2008-06-04', 'Set date alternate - 2008-06-04');
	inp.val('06/08/2010');
	init('#inp', {altField: '#alt', altFormat: 'yyyy-mm-dd'});
	equal(inp.val(), '06/08/2010', 'Set date alternate - 06/08/2010');
	equal(alt.val(), '2010-06-08', 'Set date alternate - 2010-06-08');
	// With minimum/maximum
	inp = init('#inp');
	date1 = calendar.newDate(2008, 1, 4);
	date2 = calendar.newDate(2008, 6, 4);
	var minDate = calendar.newDate(2008, 2, 29);
	var maxDate = calendar.newDate(2008, 3, 28);
	inp.val('').calendarsPicker('option', {minDate: minDate}).calendarsPicker('setDate', date2);
	equalCDateArray(inp.calendarsPicker('getDate'), [date2], 'Set date min/max - setDate > min');
	inp.calendarsPicker('setDate', date1);
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Set date min/max - setDate < min');
	inp.val('').calendarsPicker('option', {maxDate: maxDate, minDate: null}).
		calendarsPicker('setDate', date1);
	equalCDateArray(inp.calendarsPicker('getDate'), [date1], 'Set date min/max - setDate < max');
	inp.calendarsPicker('setDate', date2);
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Set date min/max - setDate > max');
	inp.val('').calendarsPicker('option', {minDate: minDate}).calendarsPicker('setDate', date1);
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Set date min/max - setDate < min');
	inp.calendarsPicker('setDate', date2);
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Set date min/max - setDate > max');
	// Range with minimum/maximum
	inp = init('#inp');
	var date3 = calendar.newDate(2008, 3, 10);
	var date4 = calendar.newDate(2008, 3, 16);
	inp.val('').calendarsPicker('option', {minDate: minDate, maxDate: null, rangeSelect: true}).
		calendarsPicker('setDate', date3, date4);
	equalCDateArray(inp.calendarsPicker('getDate'), [date3, date4],
		'Set date min/max - range setDate both > min');
	inp.calendarsPicker('setDate', date1, date4);
	equalCDateArray(inp.calendarsPicker('getDate'), [date4, date4],
		'Set date min/max - range setDate 1 < min');
	inp.calendarsPicker('setDate', date3, date2);
	equalCDateArray(inp.calendarsPicker('getDate'), [date3, date2],
		'Set date min/max - range setDate both > min');
	inp.val('').calendarsPicker('option', {maxDate: maxDate, minDate: null}).
		calendarsPicker('setDate', date3, date4);
	equalCDateArray(inp.calendarsPicker('getDate'), [date3, date4],
		'Set date min/max - range setDate both < max');
	inp.calendarsPicker('setDate', date3, date2);
	equalCDateArray(inp.calendarsPicker('getDate'), [date3, date3],
		'Set date min/max - range setDate 1 > max');
	inp.calendarsPicker('setDate', date1, date4);
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, date4],
		'Set date min/max - range setDate both > max');
	inp.val('').calendarsPicker('option', {minDate: minDate}).
		calendarsPicker('setDate', date3, date4);
	equalCDateArray(inp.calendarsPicker('getDate'), [date3, date4],
		'Set date min/max - range setDate');
	inp.calendarsPicker('setDate', date1, date2);
	equalCDateArray(inp.calendarsPicker('getDate'), [],
		'Set date min/max - range setDate < min, > max');
});

test('Ranges', function() {
	expect(27);
	var calendar = $.calendars.instance();
	var date1 = calendar.today();
	var date2 = calendar.today();
	var inp = $('#inp').val('');
	init('#inp', {rangeSelect: true});
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Range - init blank');
	inp.val('06/12/2010');
	init('#inp', {rangeSelect: true});
	equalCDateArray(inp.calendarsPicker('getDate'),
		[calendar.newDate(2010, 6, 12), calendar.newDate(2010, 6, 12)], 'Range - init preset single');
	inp.val('06/08/2010 - 06/18/2010');
	init('#inp', {rangeSelect: true});
	equalCDateArray(inp.calendarsPicker('getDate'),
		[calendar.newDate(2010, 6, 8), calendar.newDate(2010, 6, 18)], 'Range - init preset range');
	inp.val('2010-06-08 - 2010-06-18');
	init('#inp', {rangeSelect: true});
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Range - init invalid');
	// Select today - today
	inp.val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, date1], 'Range - enter/enter');
	// Can't select prior to start date
	inp.val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_UP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, date1],
		'Range - enter/ctrl+up/enter');
	// Can select after start date
	inp.val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date2.add(+7, 'd');
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, date2],
		'Range - enter/ctrl+down/enter');
	equal(inp.val(), calendar.formatDate('mm/dd/yyyy', date1) + ' - ' +
		calendar.formatDate('mm/dd/yyyy', date2), 'Range - value');
	// Select then cancel defaults to first date
	inp.val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, date1],
		'Range - enter/ctrl+down/esc');
	// Separator
	inp.calendarsPicker('option', {rangeSeparator: ' to '}).
		calendarsPicker('hide').val('06/04/2008').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'),
		[calendar.newDate(2008, 6, 4), calendar.newDate(2008, 6, 11)],
		'Range separator - enter/ctrl+down/enter');
	equal(inp.val(), '06/04/2008 to 06/11/2008', 'Range separator - value');
	// Callbacks
	inp.calendarsPicker('option', {onSelect: callback, rangeSeparator: ' - '}).
		calendarsPicker('hide').val('06/04/2008').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(selectedDates, [calendar.newDate(2008, 6, 4), calendar.newDate(2008, 6, 11)],
		'Range onSelect date - enter/ctrl+down/enter');
	inp.calendarsPicker('option', {onChangeMonthYear: callback2, onSelect: null}).
		calendarsPicker('hide').val('05/04/2008').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(selectedDates, '2008/4',
		'Range onChangeMonthYear value - enter/ctrl+down/enter');
	inp.calendarsPicker('option', {onClose: callback, onChangeMonthYear: null}).
		calendarsPicker('hide').val('03/04/2008').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(selectedDates, [calendar.newDate(2008, 3, 4), calendar.newDate(2008, 3, 11)],
		'Range onClose date - enter/ctrl+down/enter');
	// Minimum/maximum
	date1 = calendar.newDate(2008, 5, 20);
	date2 = calendar.newDate(2008, 7, 2);
	inp.calendarsPicker('option', {minDate: date1, maxDate: date2, onClose: null}).
		calendarsPicker('hide').val('06/04/2008').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGUP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, date2],
		'Range min/max - pgup/enter/pgdn/pgdn/enter');
	inp.val('06/04/2008').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_UP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'),
		[calendar.newDate(2008, 5, 28), calendar.newDate(2008, 6, 11)],
		'Range min/max - ctrl+up/enter/ctrl+down/ctrl+down/enter');
	// Min/max with existing date
	var date3 = calendar.newDate(2008, 6, 4);
	var date4 =	calendar.newDate(2008, 6, 20);
	inp.calendarsPicker('setDate', '06/04/2008', '06/20/2008').
		calendarsPicker('option', {minDate: date1});
	equalCDateArray(inp.calendarsPicker('getDate'), [date3, date4],
		'Range min/max - setDate both > min');
	inp.calendarsPicker('option', {minDate: null}).
		calendarsPicker('setDate', '01/04/2008', '06/20/2008').
		calendarsPicker('option', {minDate: date1});
	equalCDateArray(inp.calendarsPicker('getDate'), [date4, date4],
		'Range min/max - setDate 1 < min');
	inp.calendarsPicker('option', {minDate: null}).
		calendarsPicker('setDate', '01/04/2008', '02/04/2008').
		calendarsPicker('option', {minDate: date1});
	equalCDateArray(inp.calendarsPicker('getDate'), [],
		'Range min/max - setDate both < min');
	inp.calendarsPicker('option', {minDate: null}).
		calendarsPicker('setDate', '06/04/2008', '06/20/2008').
		calendarsPicker('option', {maxDate: date2});
	equalCDateArray(inp.calendarsPicker('getDate'), [date3, date4],
		'Range min/max - setDate both < max');
	inp.calendarsPicker('option', {maxDate: null}).
		calendarsPicker('setDate', '06/04/2008', '12/04/2008').
		calendarsPicker('option', {maxDate: date2});
	equalCDateArray(inp.calendarsPicker('getDate'), [date3, date3],
		'Range min/max - setDate 1 > max');
	inp.calendarsPicker('option', {maxDate: null}).
		calendarsPicker('setDate', '08/04/2008', '12/04/2008').
		calendarsPicker('option', {maxDate: date2});
	equalCDateArray(inp.calendarsPicker('getDate'), [],
		'Range min/max - setDate both > max');
	inp.calendarsPicker('option', {maxDate: null}).
		calendarsPicker('setDate', '06/04/2008', '06/20/2008').
		calendarsPicker('option', {minDate: date1, maxDate: date2});
	equalCDateArray(inp.calendarsPicker('getDate'), [date3, date4],
		'Range min/max - setDate both > min, < max');
	inp.calendarsPicker('option', {maxDate: null}).
		calendarsPicker('setDate', '01/04/2008', '12/04/2008').
		calendarsPicker('option', {minDate: date1, maxDate: date2});
	equalCDateArray(inp.calendarsPicker('getDate'), [],
		'Range min/max - setDate both < min, > max');
	// Inline
	var inl = init('#inl', {rangeSelect: true});
	date1 = calendar.today().day(12);
	date2 = calendar.today().day(19);
	$('tbody a:contains(12)').click();
	$('tbody a:contains(12)').click();
	equalCDateArray(inl.calendarsPicker('getDate'), [date1, date1],
		'Range inline - same day');
	$('tbody a:contains(12)').click();
	$('tbody a:contains(10)').click(); // Doesn't select
	equalCDateArray(inl.calendarsPicker('getDate'), [date1, date1],
		'Range inline - prev');
	$('tbody a:contains(12)').click(); // Selects
	inl.calendarsPicker('setDate', date1);
	$('tbody a:contains(12)').click();
	$('tbody a:contains(19)').click();
	equalCDateArray(inl.calendarsPicker('getDate'), [date1, date2],
		'Range inline - next');
});

test('Multiple dates', function() {
	expect(35);
	var calendar = $.calendars.instance();
	var date1 = calendar.today();
	var date2 = calendar.today();
	var inp = $('#inp').val('');
	init('#inp', {multiSelect: 2});
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Multiple 2 - init blank');
	inp.val('06/12/2010');
	init('#inp', {multiSelect: 2});
	equalCDateArray(inp.calendarsPicker('getDate'), [calendar.newDate(2010, 6, 12)],
		'Multiple 2 - init preset single');
	inp.val('06/08/2010,06/18/2010');
	init('#inp', {multiSelect: 2});
	equalCDateArray(inp.calendarsPicker('getDate'),
		[calendar.newDate(2010, 6, 8), calendar.newDate(2010, 6, 18)],
		'Multiple 2 - init preset range');
	inp.val('2010-06-08,2010-06-18');
	init('#inp', {multiSelect: 2});
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Multiple 2 - init invalid');
	// Select date(s)
	inp.val('').calendarsPicker('show');
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Multiple 2 - no dates');
	inp.simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date1], 'Multiple 2 - pick 1');
	inp.calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	ok($('div.calendars').is(':visible'), 'Multiple - still open after first pick');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date2.add(+7, 'd');
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, date2], 'Multiple 2 - pick 2');
	ok(!$('div.calendars').is(':visible'), 'Multiple - closed after second pick');
	inp.calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_UP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_UP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	date1.add(-7, 'd');
	equalCDateArray(inp.calendarsPicker('getDate'), [date1], 'Multiple 2 - pick/unpick');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_END});
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Multiple 2 - clear');
	inp.calendarsPicker('hide').val('');
	// Set date
	var today = calendar.today();
	inp.calendarsPicker('setDate', [date1]);
	equalCDateArray(inp.calendarsPicker('getDate'), [date1], 'Multiple set date - 1');
	inp.calendarsPicker('setDate', [date2, date1]);
	equalCDateArray(inp.calendarsPicker('getDate'), [date2, date1], 'Multiple set date - 2');
	inp.calendarsPicker('setDate', [today, date1, date2]);
	equalCDateArray(inp.calendarsPicker('getDate'), [today, date1], 'Multiple set date - 3');
	inp.calendarsPicker('setDate', [-7, '+1w']);
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, date2], 'Multiple set date - relative');
	inp.calendarsPicker('setDate');
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Multiple set date - null');
	inp.calendarsPicker('setDate', date1, date2);
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, date2], 'Multiple set date - non-array');
	// Min/max
	var defaultDate = calendar.newDate(2008, 6, 14);
	var minDate = calendar.newDate(2008, 6, 10);
	var maxDate = calendar.newDate(2008, 6, 18);
	date1 = calendar.newDate(2008, 6, 7);
	date2 = calendar.newDate(2008, 6, 28);
	inp.calendarsPicker('hide').
		calendarsPicker('option', {defaultDate: defaultDate, minDate: minDate}).
		val('').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_UP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [defaultDate, date2], 'Multiple min');
	inp.calendarsPicker('hide').calendarsPicker('option', {maxDate: maxDate}).
		val('').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_UP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Multiple min/max');
	inp.calendarsPicker('hide').calendarsPicker('option', {minDate: null}).
		val('').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_UP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(inp.calendarsPicker('getDate'), [date1, defaultDate], 'Multiple max');
	inp.calendarsPicker('option', {minDate: minDate, maxDate: null}).
		calendarsPicker('setDate', [date1, date2]);
	equalCDateArray(inp.calendarsPicker('getDate'), [date2], 'Multiple min - set');
	inp.calendarsPicker('option', {maxDate: maxDate}).
		calendarsPicker('setDate', [date1, date2]);
	equalCDateArray(inp.calendarsPicker('getDate'), [], 'Multiple min/max - set');
	inp.calendarsPicker('option', {minDate: null}).
		calendarsPicker('setDate', [date1, date2]);
	equalCDateArray(inp.calendarsPicker('getDate'), [date1], 'Multiple max - set');
	// Alt field
	alt = $('#alt').val('');
	inp.val('');
	inp = init('#inp', {multiSelect: 2, multiSeparator: '+',
		altField: '#alt', altFormat: 'yyyy-mm-dd'});
	date1 = calendar.today();
	date2 = calendar.today().add(+7, 'd');
	inp.calendarsPicker('show');
	equal(alt.val(), '', 'Multiple alt - no dates');
	inp.simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(alt.val(), calendar.formatDate('yyyy-mm-dd', date1), 'Multiple alt - pick 1');
	inp.calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(alt.val(), calendar.formatDate('yyyy-mm-dd', date1) + '+' +
		calendar.formatDate('yyyy-mm-dd', date2), 'Multiple alt - pick 2');
	inp.calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_UP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_UP}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(alt.val(), calendar.formatDate('yyyy-mm-dd', date1.add(-7, 'd')),
		'Multiple alt - pick/unpick');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_END});
	equal(alt.val(), '', 'Multiple alt - clear');
	inp.calendarsPicker('hide').val('');
	// Callbacks
	inp = init('#inp', {multiSelect: 2, onSelect: callback, defaultDate: date1}).
		calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(selectedDates, [date1], 'Multiple onSelect date - enter');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(selectedDates, [date1, date2], 'Multiple onSelect date - ctrl+down/enter');
	selectedDates = null;
	inp.calendarsPicker('option', {onSelect: null, onClose: callback}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(selectedDates, null, 'Multiple onClose date - enter');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(selectedDates, [date1, date2], 'Multiple onClose date - ctrl+down/enter');
	// Inline
	var inl = init('#inl', {multiSelect: 2});
	date1 = calendar.today().day(12);
	date2 = calendar.today().day(19);
	$('tbody a:contains(12)').click();
	$('tbody a:contains(19)').click();
	equalCDateArray(inl.calendarsPicker('getDate'), [date1, date2],
		'Multiple inline - two days');
	$('tbody a:contains(12)').click(); // Deselects
	equalCDateArray(inl.calendarsPicker('getDate'), [date2], 'Multiple inline - deselect');
	$('tbody a:contains(12)').click();
	$('tbody a:contains(29)').click();
	equalCDateArray(inl.calendarsPicker('getDate'), [date2, date1],
		'Multiple  inline - reselect + one');
});

test('Alt field', function() {
	expect(20);
	var inp = init('#inp');
	var alt = $('#alt');
	// No alternate field set
	alt.val('');
	inp.val('06/04/2008').calendarsPicker('show');
	inp.simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(inp.val(), '06/04/2008', 'Alt field - dp - enter');
	equal(alt.val(), '', 'Alt field - alt not set');
	// Alternate field set
	alt.val('');
	inp.calendarsPicker('option', {altField: '#alt', altFormat: 'yyyy-mm-dd'}).
		val('06/04/2008').calendarsPicker('show');
	inp.simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(inp.val(), '06/04/2008', 'Alt field - dp - enter');
	equal(alt.val(), '2008-06-04', 'Alt field - alt - enter');
	// Move from initial date
	alt.val('');
	inp.val('06/04/2008').calendarsPicker('show');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(inp.val(), '07/04/2008', 'Alt field - dp - pgdn');
	equal(alt.val(), '2008-07-04', 'Alt field - alt - pgdn');
	// Alternate field set - closed
	alt.val('');
	inp.val('06/04/2008').calendarsPicker('show');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equal(inp.val(), '06/04/2008', 'Alt field - dp - pgdn/esc');
	equal(alt.val(), '', 'Alt field - alt - pgdn/esc');
	// Clear date and alternate
	alt.val('');
	inp.val('06/04/2008').calendarsPicker('show');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_END});
	equal(inp.val(), '', 'Alt field - dp - ctrl+end');
	equal(alt.val(), '', 'Alt field - alt - ctrl+end');
	// Range select no alternate field set
	alt.val('');
	inp.calendarsPicker('option', {rangeSelect: true, altField: '', altFormat: ''}).
		calendarsPicker('hide').val('06/04/2008 - 07/14/2008').calendarsPicker('show');
	inp.simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(inp.val(), '06/04/2008 - 06/04/2008', 'Alt field range - dp - enter');
	equal(alt.val(), '', 'Alt field range - alt not set');
	// Range select no movement
	alt.val('');
	inp.calendarsPicker('option', {altField: '#alt', altFormat: 'yyyy-mm-dd'}).
		calendarsPicker('hide').val('06/04/2008 - 07/14/2008').calendarsPicker('show');
	inp.simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(inp.val(), '06/04/2008 - 06/04/2008', 'Alt field range - dp - enter');
	equal(alt.val(), '2008-06-04 - 2008-06-04', 'Alt field range - alt - enter');
	// Range select next month
	alt.val('');
	inp.val('06/04/2008 - 07/14/2008').calendarsPicker('show');
	inp.simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(inp.val(), '06/04/2008 - 07/04/2008',
		'Alt field range - dp - enter/pgdn/enter');
	equal(alt.val(), '2008-06-04 - 2008-07-04',
		'Alt field range - alt - enter/pgdn/enter');
	// Range select escape
	alt.val('');
	inp.val('06/04/2008 - 07/14/2008').calendarsPicker('show');
	inp.simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equal(inp.val(), '06/04/2008 - 06/04/2008',
		'Alt field range - dp - enter/pgdn/esc');
	equal(alt.val(), '2008-06-04 - 2008-06-04',
		'Alt field range - alt - enter/pgdn/esc');
	// Range select clear
	alt.val('');
	inp.val('06/04/2008 - 07/14/2008').calendarsPicker('show');
	inp.simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {keyCode: $.simulate.VK_PGDN}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_END});
	equal(inp.val(), '', 'Alt field range - dp - enter/pgdn/ctrl+end');
	equal(alt.val(), '', 'Alt field range - alt - enter/pgdn/ctrl+end');
});

test('Daylight saving', function() {
	expect(25);
	var inp = init('#inp');
	ok(true, 'Daylight saving - ' + $.calendars.instance().today());
	// Australia, Sydney - AM change, southern hemisphere
	inp.val('04/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(4)').click();
	equal(inp.val(), '04/05/2008', 'Daylight saving - Australia 04/05/2008');
	inp.val('04/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(5)').click();
	equal(inp.val(), '04/06/2008', 'Daylight saving - Australia 04/06/2008');
	inp.val('04/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(6)').click();
	equal(inp.val(), '04/07/2008', 'Daylight saving - Australia 04/07/2008');
	inp.val('10/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(3)').click();
	equal(inp.val(), '10/04/2008', 'Daylight saving - Australia 10/04/2008');
	inp.val('10/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(4)').click();
	equal(inp.val(), '10/05/2008', 'Daylight saving - Australia 10/05/2008');
	inp.val('10/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(5)').click();
	equal(inp.val(), '10/06/2008', 'Daylight saving - Australia 10/06/2008');
	// Brasil, Brasilia - midnight change, southern hemisphere
	inp.val('02/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(15)').click();
	equal(inp.val(), '02/16/2008', 'Daylight saving - Brasil 02/16/2008');
	inp.val('02/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(16)').click();
	equal(inp.val(), '02/17/2008', 'Daylight saving - Brasil 02/17/2008');
	inp.val('02/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(17)').click();
	equal(inp.val(), '02/18/2008', 'Daylight saving - Brasil 02/18/2008');
	inp.val('10/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(10)').click();
	equal(inp.val(), '10/11/2008', 'Daylight saving - Brasil 10/11/2008');
	inp.val('10/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(11)').click();
	equal(inp.val(), '10/12/2008', 'Daylight saving - Brasil 10/12/2008');
	inp.val('10/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(12)').click();
	equal(inp.val(), '10/13/2008', 'Daylight saving - Brasil 10/13/2008');
	// Lebanon, Beirut - midnight change, northern hemisphere
	inp.val('03/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(28)').click();
	equal(inp.val(), '03/29/2008', 'Daylight saving - Lebanon 03/29/2008');
	inp.val('03/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(29)').click();
	equal(inp.val(), '03/30/2008', 'Daylight saving - Lebanon 03/30/2008');
	inp.val('03/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(30)').click();
	equal(inp.val(), '03/31/2008', 'Daylight saving - Lebanon 03/31/2008');
	inp.val('10/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(24)').click();
	equal(inp.val(), '10/25/2008', 'Daylight saving - Lebanon 10/25/2008');
	inp.val('10/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(25)').click();
	equal(inp.val(), '10/26/2008', 'Daylight saving - Lebanon 10/26/2008');
	inp.val('10/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(26)').click();
	equal(inp.val(), '10/27/2008', 'Daylight saving - Lebanon 10/27/2008');
	// US, Eastern - AM change, northern hemisphere
	inp.val('03/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(7)').click();
	equal(inp.val(), '03/08/2008', 'Daylight saving - US 03/08/2008');
	inp.val('03/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(8)').click();
	equal(inp.val(), '03/09/2008', 'Daylight saving - US 03/09/2008');
	inp.val('03/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(9)').click();
	equal(inp.val(), '03/10/2008', 'Daylight saving - US 03/10/2008');
	inp.val('11/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(0)').click();
	equal(inp.val(), '11/01/2008', 'Daylight saving - US 11/01/2008');
	inp.val('11/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(1)').click();
	equal(inp.val(), '11/02/2008', 'Daylight saving - US 11/02/2008');
	inp.val('11/01/2008').calendarsPicker('show');
	$('div.calendars-month a:eq(2)').click();
	equal(inp.val(), '11/03/2008', 'Daylight saving - US 11/03/2008');
});

var onDateThis = null;
var onDateInMonth = false;
var onDateOK = true;

function checkOnDate(date, inMonth) {
	onDateThis = this;
	onDateInMonth |= inMonth;
	onDateOK &= (date.compareTo(date.newDate(2008, 1, 26)) == +1 &&
		date.compareTo(date.newDate(2008, 3, 6)) == -1);
	return {selectable: date.day() % 2 == 0, dateClass: (date.day() % 10 == 0 ? 'day10' : ''),
		title: (date.day() % 3 == 0 ? 'Divisible by 3' : '')};
}

var onShowThis = null;
var onShowPicker = null;
var onShowCalendar = null;
var onShowInst = null;

function checkOnShow(picker, calendar, inst) {
	onShowThis = this;
	onShowPicker = picker;
	onShowCalendar = calendar;
	onShowInst = inst;
	picker.find('td span').text('-');
}

function calcWeek(date) {
	return date.day();
}

test('Callbacks', function() {
	expect(17);
	// onDate
	inp = init('#inp', {onDate: checkOnDate});
	inp.val('02/04/2008').calendarsPicker('show');
	ok(onDateThis.id == inp[0].id, 'onDate - this OK');
	ok(onDateOK, 'onDate - dates OK');
	var day20 = $('div.calendars-month td *:contains("20")');
	var day21 = $('div.calendars-month td *:contains("21")');
	ok(day20.is('a'), 'onDate - selectable 20');
	ok(!day21.is('a'), 'onDate - selectable 21');
	ok(day20.is('.day10'), 'onDate - CSS 20');
	ok(!day21.is('.day10'), 'onDate - CSS 21');
	equal(day20.attr('title'), 'Select Wednesday, Feb 20, 2008', 'onDate - title 20');
	equal(day21.attr('title'), 'Divisible by 3', 'onDate - title 21');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// onShow
	var inp = init('#inp', {onShow: checkOnShow});
	inp.calendarsPicker('show');
	var inst = inp.data('calendarsPicker');
	equal($('div.calendars-month td span').text(), '------', 'onShow - updated');
	ok(onShowThis.id == inp[0].id, 'onShow - this OK');
	ok(onShowPicker.is('div.calendars'), 'onShow - picker OK');
	ok(onShowCalendar.name == 'Gregorian', 'onShow - calendar OK');
	deepEqual(onShowInst, inst, 'onShow - inst OK');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	// Calculate week
	inp = init('#inp', {calculateWeek: calcWeek,
		renderer: $.calendarsPicker.weekOfYearRenderer});
	inp.val('02/04/2008').calendarsPicker('show');
	equal($('td.calendars-week:first').text(), 27, 'Calculate week - default first');
	equal($('td.calendars-week:last').text(), 24, 'Calculate week - default last');
	// Make Tuesday first
	inp.calendarsPicker('hide').calendarsPicker('option', {firstDay: 2}).calendarsPicker('show');
	equal($('td.calendars-week:first').text(), 29, 'Calculate week - firstDay first');
	equal($('td.calendars-week:last').text(), 26, 'Calculate week - firstDay last');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
});

var selectedThis = null;
var selectedDates = null;
var selectedSelect = null;

function hover(date, selectable) {
	selectedThis = this;
	selectedDates = date;
	selectedSelect = selectable;
}

function callback(dates) {
	selectedThis = this;
	selectedDates = dates;
}

function callback2(year, month) {
	selectedThis = this;
	selectedDates = year + '/' + month;
}

test('Events', function() {
	expect(36);
	var inp = init('#inp', {onShow: $.calendarsPicker.hoverCallback(hover)});
	var calendar = $.calendars.instance();
	var date = calendar.today();
	// onHover
	inp.val('01/01/2009').calendarsPicker('show');
	$('a:contains(20)').simulate('mouseover');
	equal(selectedThis, inp[0], 'Callback hover over this');
	equalCDate(selectedDates, calendar.newDate(2009, 1, 20), 'Callback hover over date');
	equal(selectedSelect, true, 'Callback hover over selectable');
	$('a:contains(20)').simulate('mouseout');
	equal(selectedThis, inp[0], 'Callback hover out this');
	equal(selectedDates, null, 'Callback hover out date');
	equal(selectedSelect, null, 'Callback hover out selectable');
	selectedThis = selectedDates = selectedInst = null;
	$('tbody span:first').simulate('mouseover'); // over empty day cell
	equal(selectedThis, inp[0], 'Callback hover over empty this');
	equalCDate(selectedDates, calendar.newDate(2008, 12, 28), 'Callback hover over empty date');
	equal(selectedSelect, false, 'Callback hover over empty selectable');
	// onSelect
	inp.calendarsPicker('hide').calendarsPicker('option',
		{onSelect: callback, renderer: $.calendarsPicker.defaultRenderer}).
		val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equal(selectedThis, inp[0], 'Callback selected this');
	equalCDateArray(selectedDates, [date], 'Callback selected date');
	inp.val('').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(selectedDates, [date.add(+7, 'd')], 'Callback selected date - ctrl+down');
	inp.val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equalCDateArray(selectedDates, [date], 'Callback selected date - esc');
	// onChangeMonthYear
	selectedDates = null;
	inp.calendarsPicker('option', {onChangeMonthYear: callback2, onSelect: null}).
		val('').calendarsPicker('show');
	var newMonthYear = function(date) {
		return date.year() + '/' + date.month();
	};
	date = calendar.today().day(1).add(-1, 'm');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGUP});
	equal(selectedThis, inp[0], 'Callback change month/year this');
	equal(selectedDates, newMonthYear(date), 'Callback change month/year value - pgup');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGDN});
	equal(selectedDates, newMonthYear(date.add(+1, 'm')), 'Callback change month/year value - pgdn');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP});
	equal(selectedDates, newMonthYear(date.add(-1, 'y')),
		'Callback change month/year value - ctrl+pgup');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_HOME});
	equal(selectedDates, newMonthYear(date.add(+1, 'y')),
		'Callback change month/year value - ctrl+home');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN});
	equal(selectedDates, newMonthYear(date.add(+1, 'y')),
		'Callback change month/year value - ctrl+pgdn');
	inp.calendarsPicker('setDate', calendar.newDate(2007, 1, 26));
	equal(selectedDates, '2007/1', 'Callback change month/year value - setDate');
	selectedDates = null;
	inp.calendarsPicker('setDate', calendar.newDate(2007, 1, 12));
	equal(selectedDates, null, 'Callback change month/year value - setDate no change');
	// onChangeMonthYear step by 2
	inp.calendarsPicker('option', {monthsToStep: 2}).
		calendarsPicker('hide').val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_PGUP});
	equal(selectedDates, newMonthYear(date.add(-14, 'm')),
		'Callback change month/year by 2 value - pgup');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGUP});
	equal(selectedDates, newMonthYear(date.add(-12, 'm')),
		'Callback change month/year by 2 value - ctrl+pgup');
	inp.simulate('keydown', {keyCode: $.simulate.VK_PGDN});
	equal(selectedDates, newMonthYear(date.add(+2, 'm')),
		'Callback change month/year by 2 value - pgdn');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_PGDN});
	equal(selectedDates, newMonthYear(date.add(+12, 'm')),
		'Callback change month/year by 2 value - ctrl+pgdn');
	// onClose
	inp.calendarsPicker('option', {onClose: callback, onChangeMonthYear: null, monthsToStep: 1}).
		val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equal(selectedThis, inp[0], 'Callback close this');
	equalCDateArray(selectedDates, [], 'Callback close date - esc');
	inp.val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(selectedDates, [calendar.today()], 'Callback close date - enter');
	inp.val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equalCDateArray(selectedDates, [calendar.newDate(2008, 2, 4)], 'Callback close date - preset');
	inp.val('02/04/2008').calendarsPicker('show').
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_END});
	equalCDateArray(selectedDates, [], 'Callback close date - ctrl+end');
	// Range onHover
	inp.calendarsPicker('option',
		{onClose: null, onShow: $.calendarsPicker.hoverCallback(hover), rangeSelect: true}).
		val('01/01/2009').calendarsPicker('show');
	$('a:contains(20)').simulate('mouseover');
	equalCDate(selectedDates, calendar.newDate(2009, 1, 20), 'Callback range hover over date');
	$('a:contains(20)').simulate('mouseout');
	equal(selectedDates, null, 'Callback range hover out date');
	// Range onSelect
	date = calendar.today();
	inp.calendarsPicker('hide').calendarsPicker('option', {onSelect: callback, onHover: null}).
		val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(selectedDates, [date, date], 'Callback range selected date');
	inp.simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	var date2 = calendar.today().add(+7, 'd');
	equalCDateArray(selectedDates, [date, date2], 'Callback range selected date - ctrl+down');
	// Range onClose
	inp.calendarsPicker('option', {onClose: callback, onSelect: null}).
		val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ESC});
	equalCDateArray(selectedDates, [], 'Callback range close date - esc');
	inp.val('').calendarsPicker('show').
		simulate('keydown', {keyCode: $.simulate.VK_ENTER}).
		simulate('keydown', {ctrlKey: true, keyCode: $.simulate.VK_DOWN}).
		simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	equalCDateArray(selectedDates, [date, date2], 'Callback range close date - enter');
});

function highlight20(date) {
	return {title: (date.day() == 20 ? '*** 20 ***' : 'Select ' + date.day())};
}

test('Status', function() {
	expect(15);
	var inp = init('#inp', {renderer: $.calendarsPicker.weekOfYearRenderer,
		onDate: highlight20,
		onShow: $.calendarsPicker.multipleEvents(
		$.calendarsPicker.changeFirstDay, $.calendarsPicker.showStatus)});
	inp.val('10/01/2009').calendarsPicker('show');
	var status = $('div.calendars-status');
	ok(status.length == 1, 'Status - present');
	equal(status.text(), 'Select a date', 'Status - default');
	$('a.calendars-cmd-clear').simulate('mouseover');
	equal(status.text(), 'Clear all the dates', 'Status - clear');
	$('a.calendars-cmd-close').simulate('mouseover');
	equal(status.text(), 'Close the datepicker', 'Status - close');
	$('a.calendars-cmd-prev').simulate('mouseover');
	equal(status.text(), 'Show the previous month', 'Status - previous');
	$('a.calendars-cmd-today').simulate('mouseover');
	equal(status.text(), 'Show today\'s month', 'Status - today');
	$('a.calendars-cmd-next').simulate('mouseover');
	equal(status.text(), 'Show the next month', 'Status - next');
	$('div.calendars-month-header select:first').simulate('mouseover');
	equal(status.text(), 'Change the month', 'Status - new month');
	$('div.calendars-month-header select:last').simulate('mouseover');
	equal(status.text(), 'Change the year', 'Status - new year');
	$('th:first span').simulate('mouseover');
	equal(status.text(), 'Week of the year', 'Status - week header');
	var day = 0;
	$('th:eq(1) a').simulate('mouseover');
	equal(status.text(), 'Change first day of the week', 'Status - day header');
	day = 0;
	var calendar = $.calendars.instance();
	var month = calendar.local.monthNamesShort[calendar.today().month() - 1];
	$('div.calendars-month tr:eq(1) a').each(function() {
		$(this).simulate('mouseover');
		equal(status.text(), 'Select ' + $(this).text(), 'Status - dates');
		day++;
	});
	$('div.calendars-month a:contains("20")').each(function() {
		$(this).simulate('mouseover');
		equal(status.text(), '*** 20 ***', 'Status - dates');
	});
	inp.calendarsPicker('hide').calendarsPicker('destroy');
});

test('Change first day', function() {
	expect(6);
	var inp = init('#inp');
	inp.calendarsPicker('show');
	ok($('div.calendars th a').length == 0, 'Change first day - can\'t initially');
	equal($('div.calendars th:first').text(), 'Su', 'Change first day - initial first day');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
	inp = init('#inp', {onShow: $.calendarsPicker.changeFirstDay});
	inp.calendarsPicker('show');
	ok($('div.calendars th a').length == 7, 'Change first day - can change');
	equal($('div.calendars th:first').text(), 'Su', 'Change first day - initial first day');
	$('div.calendars th:eq(1) a').simulate('click');
	equal($('div.calendars th:first').text(), 'Mo', 'Change first day - changed first day');
	$('div.calendars th:eq(1) a').simulate('click');
	equal($('div.calendars th:first').text(), 'Tu', 'Change first day - changed first day');
	inp.calendarsPicker('hide').calendarsPicker('destroy');
});

test('Localisation', function() {
	expect(21);
	var calendar = $.calendars.instance('gregorian', 'fr');
	var inp = init('#inp', $.calendarsPicker.regionalOptions['fr']);
	inp.calendarsPicker('option', {dateFormat: 'DD, d MM yyyy', calendar: calendar,
		renderer: $.calendarsPicker.weekOfYearRenderer,
		onShow: $.calendarsPicker.multipleEvents(
			$.calendarsPicker.changeFirstDay, $.calendarsPicker.showStatus)}).
		val('').calendarsPicker('show');
	var status = $('div.calendars-status');
	equal($('a.calendars-cmd-clear').text(), 'Effacer', 'Localisation - clear');
	equal($('a.calendars-cmd-close').text(), 'Fermer', 'Localisation - close');
	$('a.calendars-cmd-close').simulate('mouseover');
	equal(status.text(), 'Fermer sans modifier', 'Localisation - status');
	equal($('a.calendars-cmd-prev').text(), '<Préc', 'Localisation - previous');
	equal($('a.calendars-cmd-today').text(), 'Aujourd\'hui', 'Localisation - today');
	equal($('a.calendars-cmd-next').text(), 'Suiv>', 'Localisation - next');
	var month = 0;
	$('div.calendars-month-header select:first option').each(function() {
		equal($(this).text(), calendar.local.monthNames[month],
			'Localisation - month ' + month);
		month++;
	});
	equal($('thead th:first').text(),
		$.calendarsPicker.regionalOptions['fr'].weekText, 'Localisation - week header');
	var day = 1;
	equal($('thead a:first').text(), calendar.local.dayNamesMin[day], 'Localisation - day ' + day);
	inp.simulate('keydown', {keyCode: $.simulate.VK_ENTER});
	var date = calendar.today();
	equal(inp.val(), calendar.local.dayNames[date.dayOfWeek()] + ', ' +
		date.day() + ' ' + calendar.local.monthNames[date.month() - 1] +
		' ' + date.year(), 'Localisation - formatting');
});

test('No weekends', function() {
	expect(31);
	var calendar = $.calendars.instance();
	for (var i = 1; i <= 31; i++) {
		var date = calendar.newDate(2001, 1, i);
		deepEqual($.calendarsPicker.noWeekends(date), {selectable: (i + 1) % 7 >= 2},
			'No weekends ' + date);
	}
});

test('Validation', function() {
	expect(63);
	var frm = $('#frm');
	frm.validate({errorPlacement: $.calendarsPicker.errorPlacement,
		rules: {inp: 'cpDate'}});
	var inp = init('#inp');
	var calendar = $.calendars.instance();
	var date = calendar.today();
	var getError = function() {
		return (inp.siblings('label:visible').length == 0 ? '' : inp.siblings('label').text());
	};
	inp.val('');
	frm.valid();
	equal(getError(), '', 'Validate - blank');
	inp.calendarsPicker('show');
	var dp = $('div.calendars');
	$('tbody a:contains(10)').click();
	date.day(10);
	equalCDate(inp.calendarsPicker('getDate'), date, 'Select 10th');
	equal(getError(), '', 'Validate - 10th');
	inp.val('92/04/2008');
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate - 92/04/2008');
	inp.val('02-04/2008');
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate - 02-04/2008');
	inp.val('02/04/2008x');
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate - 02/04/2008x');
	inp.val('02/04/2008');
	frm.valid();
	equal(getError(), '', 'Validate - 02/04/2008');
	inp.calendarsPicker('option', {dateFormat: 'yyyy-mm-dd'});
	inp.val('02/04/2008');
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate - 02/04/2008');
	inp.val('2008-02-04');
	frm.valid();
	equal(getError(), '', 'Validate - 2008-02-04');
	// Messages
	$.calendarsPicker.setDefaults({validateDate: 'Wrong date'});
	inp.val('92/04/2008');
	frm.valid();
	equal(getError(), 'Wrong date', 'Validate - 92/04/2008');
	$.calendarsPicker.setDefaults({validateDate: 'Please enter a valid date'});
	// Range
	inp.calendarsPicker('option', {rangeSelect: true, dateFormat: 'mm/dd/yyyy'});
	inp.val('');
	frm.valid();
	equal(getError(), '', 'Validate range - blank');
	inp.calendarsPicker('show');
	$('tbody a:contains(10)').click();
	$('tbody a:contains(20)').click();
	equalCDate(inp.calendarsPicker('getDate')[0], date.day(10), 'Select start - 10th');
	equalCDate(inp.calendarsPicker('getDate')[1], date.day(20), 'Select end - 20th');
	equal(getError(), '', 'Validate range - 10th - 20th');
	inp.val('92/04/2008 - 12/04/2008');
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate range - 92/04/2008 - 12/04/2008');
	inp.val('02-04/2008 - 12/04/2008');
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate range - 02-04/2008 - 12/04/2008');
	inp.val('02/04/2008 + 12/04/2008');
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate range - 02/04/2008 + 12/04/2008');
	inp.val('02/04/2008 - 12/94/2008');
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate range - 02/04/2008 - 12/94/2008');
	inp.val('02/04/2008 - 12/042008');
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate range - 02/04/2008 - 12/042008');
	inp.val('02/04/2008 - 12/04/2008');
	frm.valid();
	equal(getError(), '', 'Validate range - 02/04/2008 - 12/04/2008');
	inp.val('12/04/2008 - 02/04/2008'); // Start > end
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate range - 12/04/2008 - 02/04/2008');
	inp.calendarsPicker('option', {dateFormat: 'yyyy-mm-dd'});
	inp.val('02/04/2008 - 12/04/008');
	frm.valid();
	equal(getError(), 'Please enter a valid date',
		'Validate range - 02/04/2008 - 12/04/008');
	inp.val('2008-02-04 - 2008-12-04');
	frm.valid();
	equal(getError(), '', 'Validate range - 2008-02-04 - 2008-12-04');
	// Multiple
	inp.calendarsPicker('option', {rangeSelect: false, multiSelect: 2, dateFormat: 'mm/dd/yyyy'});
	inp.val('');
	frm.valid();
	equal(getError(), '', 'Validate multiple - blank');
	inp.calendarsPicker('show');
	$('tbody a:contains(10)').click();
	$('tbody a:contains(20)').click();
	equalCDate(inp.calendarsPicker('getDate')[0], date.day(10), 'Select 1 - 10th');
	equalCDate(inp.calendarsPicker('getDate')[1], date.day(20), 'Select 2 - 20th');
	equal(getError(), '', 'Validate multiple - 10th, 20th');
	inp.val('92/04/2008,12/04/2008');
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate multiple - 92/04/2008,12/04/2008');
	inp.val('02-04/2008,12/04/2008');
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate multiple - 02-04/2008,12/04/2008');
	inp.val('02/04/2008+12/04/2008');
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate multiple - 02/04/2008+12/04/2008');
	inp.val('02/04/2008,12/94/2008');
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate multiple - 02/04/2008,12/94/2008');
	inp.val('02/04/2008,12/042008');
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate multiple - 02/04/2008,12/042008');
	inp.val('02/04/2008,12/04/2008');
	frm.valid();
	equal(getError(), '', 'Validate multiple - 02/04/2008,12/04/2008');
	inp.val('12/04/2008,02/04/2008'); // Start > end
	frm.valid();
	equal(getError(), '', 'Validate multiple - 12/04/2008,02/04/2008');
	inp.calendarsPicker('option', {dateFormat: 'yyyy-mm-dd'});
	inp.val('02/04/2008,12/04/008');
	frm.valid();
	equal(getError(), 'Please enter a valid date', 'Validate multiple - 02/04/2008,12/04/008');
	inp.val('2008-02-04,2008-12-04');
	frm.valid();
	equal(getError(), '', 'Validate multiple - 2008-02-04,2008-12-04');
	// Min date
	inp.calendarsPicker('option', {multiSelect: false, dateFormat: 'mm/dd/yyyy',
		minDate: calendar.newDate(2008, 1, 26)});
	inp.val('');
	frm.valid();
	equal(getError(), '', 'Validate minimum - blank');
	inp.val('12/04/2008');
	frm.valid();
	equal(getError(), '', 'Validate minimum - 12/04/2008');
	inp.val('01/04/2008');
	frm.valid();
	equal(getError(), 'Please enter a date on or after 01/26/2008', 
		'Validate minimum - 01/04/2008');
	inp.val('01/25/2008');
	frm.valid();
	equal(getError(), 'Please enter a date on or after 01/26/2008',
		'Validate minimum - 01/25/2008');
	inp.val('01/26/2008');
	frm.valid();
	equal(getError(), '', 'Validate minimum - 01/26/2008');
	inp.calendarsPicker('option', {dateFormat: 'yyyy-mm-dd'}).
		val('01/30/2008').calendarsPicker('show');
	frm.valid();
	equal(getError(), 'Please enter a date on or after 2008-01-26',
		'Validate minimum - 01/30/2008');
	inp.val('2008-01-30');
	frm.valid();
	equal(getError(), '', 'No error message - 2008-01-30');
	// Max date
	inp.calendarsPicker('option', {minDate: null, dateFormat: 'mm/dd/yyyy',
		maxDate: calendar.newDate(2009, 1, 26)});
	inp.val('');
	frm.valid();
	equal(getError(), '', 'Validate maximum - blank');
	inp.val('12/04/2008');
	frm.valid();
	equal(getError(), '', 'Validate maximum - 12/04/2008');
	inp.val('01/31/2009');
	frm.valid();
	equal(getError(), 'Please enter a date on or before 01/26/2009', 
		'Validate maximum - 01/31/2009');
	inp.val('01/27/2009');
	frm.valid();
	equal(getError(), 'Please enter a date on or before 01/26/2009',
		'Validate maximum - 01/27/2009');
	inp.val('01/26/2009');
	frm.valid();
	equal(getError(), '', 'Validate maximum - 01/26/2009');
	inp.calendarsPicker('option', {dateFormat: 'yyyy-mm-dd'}).
		val('01/20/2009').calendarsPicker('show');
	frm.valid();
	equal(getError(), 'Please enter a date on or before 2009-01-26',
		'Validate maximum - 01/20/2009');
	inp.val('2009-01-20');
	frm.valid();
	equal(getError(), '', 'Validate maximum - 2009-01-20');
	// Min/max date
	inp.calendarsPicker('option', {dateFormat: 'mm/dd/yyyy',
		minDate: calendar.newDate(2008, 1, 26)});
	inp.val('');
	frm.valid();
	equal(getError(), '', 'Validate minimum/maximum - blank');
	inp.val('12/04/2008');
	frm.valid();
	equal(getError(), '', 'Validate minimum/maximum - 12/04/2008');
	inp.val('01/04/2008');
	frm.valid();
	equal(getError(), 'Please enter a date between 01/26/2008 and 01/26/2009',
		'Validate minimum/maximum - 01/04/2008');
	inp.val('01/25/2008');
	frm.valid();
	equal(getError(), 'Please enter a date between 01/26/2008 and 01/26/2009',
		'Validate minimum/maximum - 01/25/2008');
	inp.val('01/26/2008');
	frm.valid();
	equal(getError(), '', 'Validate minimum/maximum - 01/26/2008');
	inp.val('01/31/2009');
	frm.valid();
	equal(getError(), 'Please enter a date between 01/26/2008 and 01/26/2009',
		'Validate minimum/maximum - 01/31/2009');
	inp.val('01/27/2009');
	frm.valid();
	equal(getError(), 'Please enter a date between 01/26/2008 and 01/26/2009',
		'Validate minimum/maximum - 01/27/2009');
	inp.val('01/26/2009');
	frm.valid();
	equal(getError(), '', 'Validate minimum/maximum - 01/26/2009');
	inp.calendarsPicker('option', {dateFormat: 'yyyy-mm-dd'}).
		val('01/20/2009').calendarsPicker('show');
	frm.valid();
	equal(getError(), 'Please enter a date between 2008-01-26 and 2009-01-26',
		'Validate minimum/maximum - 01/20/2009');
	inp.val('2009-01-20');
	frm.valid();
	equal(getError(), '', 'Validate minimum/maximum - 2009-01-20');
	inp.calendarsPicker('hide');
	// onDate callback
	var noEvens = function(date) {
		return {selectable: date.day() % 2 == 1, dateClass:
			date.day() % 2 ? 'odd' : 'even'};
	};
	inp.calendarsPicker('option', {dateFormat: 'mm/dd/yyyy', onDate: noEvens});
	inp.val('01/25/2008');
	frm.valid();
	equal(getError(), 'Please enter a date between 01/26/2008 and 01/26/2009',
		'Validate onDate - 01/25/2008');
	inp.val('01/26/2008');
	frm.valid();
	equal(getError(), 'Please enter a date between 01/26/2008 and 01/26/2009',
		'Validate onDate - 01/26/2008');
	inp.val('01/27/2008');
	frm.valid();
	equal(getError(), '', 'Validate onDate - 01/27/2008');
});

test('Validation compare', function() {
	expect(75);
	var frm = $('#frm');
	frm.validate({errorPlacement: $.calendarsPicker.errorPlacement,
		rules: {inp: {cpCompareDate: ['equal', '#alt']}}});
	var inp = init('#inp');
	var alt = init('#alt');
	var calendar = $.calendars.instance();
	var getError = function() {
		return (inp.siblings('label:visible').length == 0 ? '' : inp.siblings('label').text());
	};
	inp.val('');
	frm.valid();
	equal(getError(), '', 'Validate compare - blank');
	inp.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010, blank');
	// equal/notEqual/before/after/notBefore/notAfter
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), 'Please enter a date equal to the other date',
		'Validate compare - 12/25/2010 equal 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 equal 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), 'Please enter a date equal to the other date',
		'Validate compare - 12/25/2010 equal 12/26/2010');
	inp.rules('add', {cpCompareDate: {notEqual: '#alt'}});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 notEqual 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), 'Please enter a date not equal to the other date',
		'Validate compare - 12/25/2010 notEqual 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 notEqual 12/26/2010');
	inp.rules('add', {cpCompareDate: ['before', '#alt']});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), 'Please enter a date before the other date',
		'Validate compare - 12/25/2010 before 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), 'Please enter a date before the other date',
		'Validate compare - 12/25/2010 before 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 before 12/26/2010');
	inp.rules('add', {cpCompareDate: ['after', '#alt']});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 after 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), 'Please enter a date after the other date',
		'Validate compare - 12/25/2010 after 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), 'Please enter a date after the other date',
		'Validate compare - 12/25/2010 after 12/26/2010');
	inp.rules('add', {cpCompareDate: 'notBefore #alt'});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 notBefore 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 notBefore 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), 'Please enter a date not before the other date',
		'Validate compare - 12/25/2010 notBefore 12/26/2010');
	inp.rules('add', {cpCompareDate: 'notAfter #alt'});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), 'Please enter a date not after the other date',
		'Validate compare - 12/25/2010 notAfter 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 notAfter 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 notAfter 12/26/2010');
	// eq/ne/lt/gt/ge/le
	inp.rules('add', {cpCompareDate: 'eq #alt'});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), 'Please enter a date equal to the other date',
		'Validate compare - 12/25/2010 eq 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 eq 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), 'Please enter a date equal to the other date',
		'Validate compare - 12/25/2010 eq 12/26/2010');
	inp.rules('add', {cpCompareDate: {ne: alt}});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 ne 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), 'Please enter a date not equal to the other date',
		'Validate compare - 12/25/2010 ne 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 ne 12/26/2010');
	inp.rules('add', {cpCompareDate: {lt: alt[0]}});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), 'Please enter a date before the other date',
		'Validate compare - 12/25/2010 lt 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), 'Please enter a date before the other date',
		'Validate compare - 12/25/2010 lt 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 lt 12/26/2010');
	inp.rules('add', {cpCompareDate: ['gt', '#alt']});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 gt 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), 'Please enter a date after the other date',
		'Validate compare - 12/25/2010 gt 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), 'Please enter a date after the other date',
		'Validate compare - 12/25/2010 gt 12/26/2010');
	inp.rules('add', {cpCompareDate: 'ge #alt'});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 ge 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 ge 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), 'Please enter a date not before the other date',
		'Validate compare - 12/25/2010 ge 12/26/2010');
	inp.rules('add', {cpCompareDate: ['le', alt[0]]});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), 'Please enter a date not after the other date',
		'Validate compare - 12/25/2010 le 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 le 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 le 12/26/2010');
	// same/notSame/lessThan/greaterThan/notLessThan/notGreaterThan
	inp.rules('add', {cpCompareDate: 'same #alt'});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), 'Please enter a date equal to the other date',
		'Validate compare - 12/25/2010 same 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 same 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), 'Please enter a date equal to the other date',
		'Validate compare - 12/25/2010 same 12/26/2010');
	inp.rules('add', {cpCompareDate: {notSame: alt}});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 notSame 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), 'Please enter a date not equal to the other date',
		'Validate compare - 12/25/2010 notSame 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 notSame 12/26/2010');
	inp.rules('add', {cpCompareDate: {lessThan: alt[0]}});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), 'Please enter a date before the other date',
		'Validate compare - 12/25/2010 lessThan 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), 'Please enter a date before the other date',
		'Validate compare - 12/25/2010 lessThan 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 lessThan 12/26/2010');
	inp.rules('add', {cpCompareDate: ['greaterThan', '#alt']});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 greaterThan 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), 'Please enter a date after the other date',
		'Validate compare - 12/25/2010 greaterThan 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), 'Please enter a date after the other date',
		'Validate compare - 12/25/2010 greaterThan 12/26/2010');
	inp.rules('add', {cpCompareDate: 'notLessThan #alt'});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 notLessThan 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 notLessThan 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), 'Please enter a date not before the other date',
		'Validate compare - 12/25/2010 notLessThan 12/26/2010');
	inp.rules('add', {cpCompareDate: ['notGreaterThan', alt[0]]});
	alt.calendarsPicker('setDate', '12/24/2010');
	frm.valid();
	equal(getError(), 'Please enter a date not after the other date',
		'Validate compare - 12/25/2010 notGreaterThan 12/24/2010');
	alt.calendarsPicker('setDate', '12/25/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 notGreaterThan 12/25/2010');
	alt.calendarsPicker('setDate', '12/26/2010');
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2010 notGreaterThan 12/26/2010');
	// Today
	inp.calendarsPicker('setDate', '12/25/2009');
	inp.rules('add', {cpCompareDate: 'equal today'});
	frm.valid();
	equal(getError(), 'Please enter a date equal to today', 'Validate compare - 12/25/2009 equal today');
	inp.rules('add', {cpCompareDate: {ne: 'today'}});
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2009 ne today');
	inp.rules('add', {cpCompareDate: {lessThan: 'today'}});
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2009 lessThan today');
	inp.rules('add', {cpCompareDate: ['after', 'today']});
	frm.valid();
	equal(getError(), 'Please enter a date after today', 'Validate compare - 12/25/2009 after today');
	inp.rules('add', {cpCompareDate: 'ge today'});
	frm.valid();
	equal(getError(), 'Please enter a date not before today', 'Validate compare - 12/25/2009 ge today');
	inp.rules('add', {cpCompareDate: ['notGreaterThan', 'today']});
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2009 notGreaterThan today');
	// Other date
	inp.rules('add', {cpCompareDate: 'equal 12/25/2009'});
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2009 equal 12/25/2009');
	inp.rules('add', {cpCompareDate: {ne: $.calendars.instance().newDate(2009, 12, 25)}});
	frm.valid();
	equal(getError(), 'Please enter a date not equal to 12/25/2009',
		'Validate compare - 12/25/2009 ne newDate(2009, 12, 25)');
	inp.rules('add', {cpCompareDate: {lessThan: '01/01/2010'}});
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/25/2009 lessThan 01/01/2010');
	inp.rules('add', {cpCompareDate: ['after', $.calendars.instance().newDate(2010, 1, 1)]});
	frm.valid();
	equal(getError(), 'Please enter a date after 01/01/2010',
		'Validate compare - 12/25/2009 after newDate(2010, 1, 1)');
	inp.rules('add', {cpCompareDate: ['notGreaterThan', '01/01/2009']});
	frm.valid();
	equal(getError(), 'Please enter a date not after 01/01/2009',
		'Validate compare - 12/25/2009 notGreaterThan 01/01/2009');
	// Range
	inp.calendarsPicker('option', {rangeSelect: true}).
		calendarsPicker('setDate', '12/01/2009', '12/31/2009').
		rules('add', {cpCompareDate: 'equal 12/25/2009'});
	frm.valid();
	equal(getError(), 'Please enter a date equal to 12/25/2009',
		'Validate compare - 12/01/2009-12/31/2009 equal 12/25/2009');
	inp.rules('add', {cpCompareDate: {ne: $.calendars.instance().newDate(2009, 12, 25)}});
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/01/2009-12/31/2009 ne newDate(2009, 12, 25)');
	// Multiple
	inp.calendarsPicker('option', {multiSelect: 3, rangeSelect: false}).
		calendarsPicker('setDate', ['12/01/2009', '12/15/2009', '12/31/2009']).
		rules('add', {cpCompareDate: 'before 01/01/2010'});
	frm.valid();
	equal(getError(), '', 'Validate compare - 12/01/2009,12/15/2009,12/31/2009 before 01/01/2010');
	inp.rules('add', {cpCompareDate: {after: $.calendars.instance().newDate(2009, 12, 5)}});
	frm.valid();
	equal(getError(), 'Please enter a date after 12/05/2009',
		'Validate compare - 12/01/2009,12/15/2009,12/31/2009 after newDate(2009, 12, 5)');
	// Localisation
	$.calendarsPicker.setDefaults({validateDateCompare: 'Field must be {0} {1}',
		validateDateToday: 'now', validateDateOther: 'something else',
		validateDateEQ: 'eq', validateDateNE: 'ne', validateDateLT: 'lt',
		validateDateGT: 'gt', validateDateLE: 'le', validateDateGE: 'ge'});
	inp.calendarsPicker('option', {rangeSelect: false}).calendarsPicker('setDate', '12/25/2009').
		rules('add', {cpCompareDate: 'equal 12/25/2010'});
	frm.valid();
	equal(getError(), 'Field must be eq 12/25/2010',
		'Validate compare - localise - 12/25/2009 equal 12/25/2010');
	inp.rules('add', {cpCompareDate: {ne: $.calendars.instance().newDate(2009, 12, 25)}});
	frm.valid();
	equal(getError(), 'Field must be ne 12/25/2009',
		'Validate compare - localise - 12/25/2009 ne newDate(2009, 12, 25)');
	inp.rules('add', {cpCompareDate: {notLessThan: '#alt'}});
	frm.valid();
	equal(getError(), 'Field must be ge something else',
		'Validate compare - localise - 12/25/2009 notLessThan #alt');
	inp.rules('add', {cpCompareDate: ['after', 'today']});
	frm.valid();
	equal(getError(), 'Field must be gt now',
		'Validate compare - localise - 12/25/2009 after today');
});

});
