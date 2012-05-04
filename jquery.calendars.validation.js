/* http://keith-wood.name/calendars.html
   Calendars Validation extension for jQuery 1.1.2.
   Requires Jörn Zaefferer's Validation plugin (http://plugins.jquery.com/project/validate).
   Written by Keith Wood (kbwood{at}iinet.com.au).
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

(function($) { // Hide the namespace

/* Add validation methods if validation plugin available. */
if ($.fn.validate) {

	$.calendars.picker.selectDateOrig = $.calendars.picker.selectDate;
	
	$.extend($.calendars.picker.regional[''], {
		validateDate: 'Please enter a valid date',
		validateDateMin: 'Please enter a date on or after {0}',
		validateDateMax: 'Please enter a date on or before {0}',
		validateDateMinMax: 'Please enter a date between {0} and {1}'
	});
	
	$.extend($.calendars.picker._defaults, $.calendars.picker.regional['']);

	$.extend($.calendars.picker, {

		/* Trigger a validation after updating the input field with the selected date.
		   @param  target  (element) the control to examine
		   @param  elem    (element) the selected datepicker element */
		selectDate: function(target, elem) {
			this.selectDateOrig(target, elem);
			var inst = $.data(target, $.calendars.picker.dataName);
			if (!inst.inline && $.fn.validate) {
				var validation = $(target).parents('form').validate();
				if (validation) {
					validation.element('#' + target.id);
				}
			}
		},

		/* Correct error placement for validation errors - after any trigger.
		   @param  error    (jQuery) the error message
		   @param  element  (jQuery) the field in error */
		errorPlacement: function(error, element) {
			var inst = $.data(element[0], $.calendars.picker.dataName);
			if (inst) {
				error[inst.get('isRTL') ? 'insertBefore' : 'insertAfter'](
					inst.trigger.length > 0 ? inst.trigger : element);
			}
			else {
				error.insertAfter(element);
			}
		},

		/* Format a validation error message involving dates.
		   @param  source  (string) the error message
		   @param  params  (Date[]) the dates
		   @return  (string) the formatted message */
		errorFormat: function(source, params) {
			var format = ($.calendars.picker.curInst ?
				$.calendars.picker.curInst.get('dateFormat') :
				$.calendars.picker._defaults.dateFormat);
			$.each(params, function(i, v) {
				source = source.replace(new RegExp('\\{' + i + '\\}', 'g'),
					v.formatDate(format) || 'nothing');
			});
			return source;
		}
	});

	/* Apply a validation test to each date provided.
	   @param  value    (string) the current field value
	   @param  element  (element) the field control
	   @param  test     (function) the validation to apply
	   @return  (boolean) true if OK, false if failed validation */
	function validateEach(value, element, test) {
		var inst = $.data(element, $.calendars.picker.dataName);
		var rangeSelect = inst.get('rangeSelect');
		var multiSelect = inst.get('multiSelect');
		var dates = (multiSelect ? value.split(inst.get('multiSeparator')) :
			(rangeSelect ? value.split(inst.get('rangeSeparator')) : [value]));
		var ok = (multiSelect && dates.length <= multiSelect) ||
			(!multiSelect && rangeSelect && dates.length == 2) ||
			(!multiSelect && !rangeSelect && dates.length == 1);
		if (ok) {
			try {
				var dateFormat = inst.get('dateFormat');
				var onDate = inst.get('onDate');
				$.each(dates, function(i, v) {
					dates[i] = inst.get('calendar').parseDate(dateFormat, v);
					var dateInfo = (onDate ? onDate.apply(element, [dates[i], true]) : {});
					ok = ok && test(dates[i]) && dateInfo.selectable != false;
				});
			}
			catch (e) {
				ok = false;
			}
		}
		if (ok && rangeSelect) {
			ok = (dates[0].compareTo(dates[1]) != +1);
		}
		return ok;
	}

	/* Validate basic date format. */
	$.validator.addMethod('cpDate', function(value, element) {
			return this.optional(element) ||
				validateEach(value, element, function(date) { return true; });
		}, function(params) {
			return $.calendars.picker._defaults.validateDate;
		});

	/* Validate format and against a minimum date. */
	$.validator.addMethod('cpMinDate', function(value, element, params) {
			var inst = $.data(element, $.calendars.picker.dataName);
			params[0] = inst.get('minDate');
			return this.optional(element) ||
				validateEach(value, element, function(date) {
					return (!date || !params[0] || date.compareTo(params[0]) != -1);
				});
		}, function(params) {
			return $.calendars.picker.errorFormat($.calendars.picker._defaults.validateDateMin, params);
		});

	/* Validate format and against a maximum date. */
	$.validator.addMethod('cpMaxDate', function(value, element, params) {
			var inst = $.data(element, $.calendars.picker.dataName);
			params[0] = inst.get('maxDate');
			return this.optional(element) ||
				validateEach(value, element, function(date) {
					return (!date || !params[0] || date.compareTo(params[0]) != +1);
				});
		}, function(params) {
			return $.calendars.picker.errorFormat($.calendars.picker._defaults.validateDateMax, params);
		});

	/* Validate format and against minimum/maximum dates. */
	$.validator.addMethod('cpMinMaxDate', function(value, element, params) {
			var inst = $.data(element, $.calendars.picker.dataName);
			params[0] = inst.get('minDate');
			params[1] = inst.get('maxDate');
			return this.optional(element) ||
				validateEach(value, element, function(date) {
					return (!date || ((!params[0] || date.compareTo(params[0]) != -1) &&
						(!params[1] || date.compareTo(params[1]) != +1)));
				});
		}, function(params) {
			return $.calendars.picker.errorFormat($.calendars.picker._defaults.validateDateMinMax, params);
		});
}

})(jQuery);
