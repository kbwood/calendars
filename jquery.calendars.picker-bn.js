/*
   Bengali localization for calendars datepicker for jQuery.
*/
(function($) {
    $.calendarsPicker.regionalOptions['bn'] = {
        renderer: $.calendarsPicker.defaultRenderer,
        prevText: '&#x3c;পূর্ববর্তী',
        prevStatus: '',
        prevJumpText: '&#x3c;&#x3c;',
        prevJumpStatus: '',
        nextText: 'পরবর্তী&#x3e;',
        nextStatus: '',
        nextJumpText: '&#x3e;&#x3e;',
        nextJumpStatus: '',
        currentText: 'আজ',
        currentStatus: '',
        todayText: 'আজ',
        todayStatus: '',
        clearText: 'ফিল্টার পরিস্কার করুন',
        clearStatus: '',
        closeText: 'বন্ধ করুন',
        closeStatus: '',
        yearStatus: '',
        monthStatus: '',
        weekText: 'Sm',
        weekStatus: '',
        dayStatus: 'DD, M d', defaultStatus: '',
        isRTL: false
    };
    $.calendarsPicker.setDefaults($.calendarsPicker.regionalOptions['bn']);
})(jQuery);
