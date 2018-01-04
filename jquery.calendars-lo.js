/*
   Laotian localization for Gregorian/Julian calendars for jQuery.
*/
(function($) {
    $.calendars.calendars.gregorian.prototype.regionalOptions['lo'] = {
        name: 'Gregorian',
        epochs: ['BCE', 'CE'],
        monthNames: [
            'ມັງກອນ',
            'ກຸມພາ',
            'ມີນາ',
            'ເມສາ',
            'ພຶດສະພາ',
            'ມິຖຸນາ',
            'ກໍລະກົດ',
            'ສິງຫາ',
            'ກັນຍາ',
            'ຕຸລາ',
            'ພະຈິກ',
            'ທັນວາ'
        ],
        monthNamesShort: [
            'ມັງກອນ',
            'ກຸມພາ',
            'ມີນາ',
            'ເມສາ',
            'ພຶດສະພາ',
            'ມິຖຸນາ',
            'ກໍລະກົດ',
            'ສິງຫາ',
            'ກັນຍາ',
            'ຕຸລາ',
            'ພະຈິກ',
            'ທັນວາ'
        ],
        dayNames: [
            'ອາທິດ',
            'ຈັນ',
            'ອັງຄານ',
            'ພຸດ',
            'ພະຫັດ',
            'ສຸກ',
            'ເສົາ'
        ],
        dayNamesShort: [
            'ອາທິດ',
            'ຈັນ',
            'ອັງຄານ',
            'ພຸດ',
            'ພະຫັດ',
            'ສຸກ',
            'ເສົາ'
        ],
        dayNamesMin: [
            'ອາທິດ',
            'ຈັນ',
            'ອັງຄານ',
            'ພຸດ',
            'ພະຫັດ',
            'ສຸກ',
            'ເສົາ'
        ],
        digits: null,
        dateFormat: 'dd/mm/yyyy',
        firstDay: 1,
        isRTL: false
    };
    if ($.calendars.calendars.julian) {
        $.calendars.calendars.julian.prototype.regionalOptions['lo'] =
            $.calendars.calendars.gregorian.prototype.regionalOptions['lo'];
    }
})(jQuery);
