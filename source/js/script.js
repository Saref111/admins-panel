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

    $('[name="admins"]').change(function (e){
        $(this).closest('.user-list__tr').toggleClass('user-list__tr--selected')
    })

    $('#all-checked').change(function (e) {
        $('[name="admins"]').each(function (i, element) {
            $(element).click();
        })
    })
})