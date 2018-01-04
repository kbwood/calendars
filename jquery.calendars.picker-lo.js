/*
   Laotian localization for calendars datepicker for jQuery.
*/
(function($) {
    $.calendarsPicker.regionalOptions['lo'] = {
        renderer: $.calendarsPicker.defaultRenderer,
        prevText: '&#x3c;ທີ່ຜ່ານມາ',
        prevStatus: '',
        prevJumpText: '&#x3c;&#x3c;',
        prevJumpStatus: '',
        nextText: 'ຕໍ່ໄປ&#x3e;',
        nextStatus: '',
        nextJumpText: '&#x3e;&#x3e;',
        nextJumpStatus: '',
        currentText: 'ວັນນີ້',
        currentStatus: '',
        todayText: 'ວັນນີ້',
        todayStatus: '',
        clearText: 'ການຈັດ​ລຽງແບບຊັດເຈນ',
        clearStatus: '',
        closeText: 'ປິດ',
        closeStatus: '',
        yearStatus: '',
        monthStatus: '',
        weekText: 'Sm',
        weekStatus: '',
        dayStatus: 'DD, M d', defaultStatus: '',
        isRTL: false
    };
    $.calendarsPicker.setDefaults($.calendarsPicker.regionalOptions['lo']);
})(jQuery);
