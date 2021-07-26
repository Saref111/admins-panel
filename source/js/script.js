const isRegistration = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    return Boolean(params.registration)
}

const showRegistrationPopup = () => {
    if (isRegistration()) {

        $('.popup--admin-registration').addClass('popup--open')
    }
}




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

    $('.filters__btn--add-admins').click(function (e) {
        $('.popup--admin-invite').addClass('popup--open')
    })

    $('.popup__close').click(function(e){
        $(this).closest('.popup').removeClass('popup--open')
    })

    $('.popup__textarea').on('input', function (e) {
        const isValidInput = e.target.value !== ''

        if (isValidInput) {
            $(e.target).closest('form').find('.popup__submit').prop('disabled', false)
        } else {
            $(e.target).closest('form').find('.popup__submit').prop('disabled', true)
        }
    })

    $('.popup__input--photo').on('input', function (e) {
        const reader = new FileReader();
        reader.onloadend = () => {
            $(this).closest('.popup__label').find('img').prop('src', reader.result)
        }

        reader.readAsDataURL(e.target.files[0])
    })

    $('.popup__show-pass').click(function () {
        $(this).toggleClass('popup__show-pass--shown')
        const isPass = $(this).closest('.popup__label').find('input').prop('type') === 'password'

        if (isPass) {
            $(this).closest('.popup__label').find('input').prop('type', 'text')
        } else {
            $(this).closest('.popup__label').find('input').prop('type', 'password')
        }
    })

    showRegistrationPopup()

})