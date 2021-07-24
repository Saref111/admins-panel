$(document).ready(() => {
    $('[data-picker="datepicker"]').datetimepicker({
        timepicker:false,
        format:'d-m-Y',
        mask: true
    });

    $('[data-picker="timepicker"]').datetimepicker({
        datepicker:false,
        format:'H:m',
        mask: true
    });
})