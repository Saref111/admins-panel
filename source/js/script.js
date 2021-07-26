const isRegistration = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    return Boolean(params.registration) //to call registration popup add to URL next query ?registration=true
}

const comparePasswords = (popupSelector, inputSelector, confirmInputSelector) => {
    return ($(popupSelector).find(inputSelector).prop('value') === $(popupSelector).find(confirmInputSelector).prop('value')) &&
    $(popupSelector).find(inputSelector).prop('value') !== '' && $(popupSelector).find(confirmInputSelector).prop('value') !== ''
}

const validateForgotPassPopup = () => {
    $('.popup--forgot-pass').on('input', function (e) {
        const isValid = comparePasswords('.popup--forgot-pass', '#forgot-password', '#forgot-confirm-password')
        
        if (isValid) {
            $(this).find('.popup__submit').prop('disabled', false)
        } else {
            $(this).find('.popup__submit').prop('disabled', true)
        }
    })
}

const showRegistrationPopup = () => {
    if (isRegistration()) {

        $('.popup--admin-registration').addClass('popup--open')
        $('.popup--admin-registration').on('input', function (e) {
            let isValid = true
            const isSamePass = comparePasswords('.popup--admin-registration', '#password', '#confirm-password')

            $(this).find('input:not([type="file"])').each(function (i, elem) {
                
                if (!elem.value) {
                    if (isSamePass) {
                        isValid = false
                    }
                } 
            })


            if (isValid && isSamePass) {
                $('.popup--admin-registration').find('.popup__submit').prop('disabled', false)
            } else {
                $('.popup--admin-registration').find('.popup__submit').prop('disabled', true)
            }
        })

    }
}


const setAuthPopupValidation = () => {
    $('.popup--admin-authorization').on('input', function (e) {
        let isValid = true
        $(this).find('input:not([type="file"])').each(function (i, elem) {
                
            if (!elem.value) {
                if (isSamePass) {
                    isValid = false
                }
            } 
        })
        
        if (isValid) {
            $(this).find('.popup__submit').prop('disabled', false)
        } else {
            $(this).find('.popup__submit').prop('disabled', true)
        }
    })
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

    $('.popup__label-link--forgot-pass').click(function (e) {
        $(this).closest('.popup').removeClass('popup--open')
        $('.popup--forgot-pass').addClass('popup--open')
        validateForgotPassPopup()
    })

    $('.popup__submit--ok').click(function (e) {
        e.preventDefault()
        $(this).closest('.popup').removeClass('popup--open')
    })

    showRegistrationPopup()
    setAuthPopupValidation()
})