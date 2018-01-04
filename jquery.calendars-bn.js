/*
   Bengali localization for Gregorian/Julian calendars for jQuery.
*/
(function($) {
    $.calendars.calendars.gregorian.prototype.regionalOptions['bn'] = {
        name: 'Gregorian',
        epochs: ['BCE', 'CE'],
        monthNames: [
            'জানুয়ারী',
            ' ফেব্রুয়ারি',
            'ার্চ',
            '্রিল',
            ' মে"',
            ' জুন',
            'জুলাই',
            'আগস্ট',
            'সেপ্টেম্বর',
            'অক্টোবর',
            'নভেম্বর',
            'ডিসেম্বর'
        ],
        monthNamesShort: [
            'জানুয়ারী',
            ' ফেব্রুয়ারি',
            'ার্চ',
            '্রিল',
            ' মে"',
            ' জুন',
            'জুলাই',
            'আগস্ট',
            'সেপ্টেম্বর',
            'অক্টোবর',
            'নভেম্বর',
            'ডিসেম্বর'
        ],
        dayNames: [
            'সোম',
            'মঙ্গল',
            'বুধ',
            ' বৃহঃ',
            ' শুক্র',
            'শনি',
            'রবি'
        ],
        dayNamesShort: [
            'সোম',
            'মঙ্গল',
            'বুধ',
            ' বৃহঃ',
            ' শুক্র',
            'শনি',
            'রবি'
        ],
        dayNamesMin: [
            'সোম',
            'মঙ্গল',
            'বুধ',
            ' বৃহঃ',
            ' শুক্র',
            'শনি',
            'রবি'
        ],
        digits: null,
        dateFormat: 'dd/mm/yyyy',
        firstDay: 1,
        isRTL: false
    };
    if ($.calendars.calendars.julian) {
        $.calendars.calendars.julian.prototype.regionalOptions['bn'] =
            $.calendars.calendars.gregorian.prototype.regionalOptions['bn'];
    }
})(jQuery);
