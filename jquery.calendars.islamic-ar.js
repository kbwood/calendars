/* http://keith-wood.name/calendars.html
   Arabic localisation for Islamic calendar for jQuery v2.0.2.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) August 2009. */
(function($) {
	$.calendars.calendars.islamic.prototype.regionalOptions['ar'] = {
		name: 'Islamic',
		epochs: ['BAM', 'AM'],
		monthNames: ['محرّم', 'صفر', 'ربيع الأول', 'ربيع الآخر أو ربيع الثاني', 'جمادى الاول', 'جمادى الآخر أو جمادى الثاني',
		'رجب', 'شعبان', 'رمضان', 'شوّال', 'ذو القعدة', 'ذو الحجة'],
		monthNamesShort: ['محرّم', 'صفر', 'ربيع الأول', 'ربيع الآخر أو ربيع الثاني', 'جمادى الاول', 'جمادى الآخر أو جمادى الثاني',
		'رجب', 'شعبان', 'رمضان', 'شوّال', 'ذو القعدة', 'ذو الحجة'],
		dayNames: ['يوم الأحد', 'يوم الإثنين', 'يوم الثلاثاء', 'يوم الأربعاء', 'يوم الخميس', 'يوم الجمعة', 'يوم السبت'],
		dayNamesShort: ['يوم الأحد', 'يوم الإثنين', 'يوم الثلاثاء', 'يوم الأربعاء', 'يوم الخميس', 'يوم الجمعة', 'يوم السبت'],
		dayNamesMin: ['يوم الأحد', 'يوم الإثنين', 'يوم الثلاثاء', 'يوم الأربعاء', 'يوم الخميس', 'يوم الجمعة', 'يوم السبت'],
		digits: $.calendars.substituteDigits(['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']),
		dateFormat: 'yyyy/mm/dd',
		firstDay: 6,
		isRTL: true
	};
})(jQuery);