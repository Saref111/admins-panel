const comparePasswords = (
  popupSelector,
  inputSelector,
  confirmInputSelector
) => {
  const isSame =
    $(popupSelector).find(inputSelector).prop("value") ===
      $(popupSelector).find(confirmInputSelector).prop("value") &&
    $(popupSelector).find(inputSelector).prop("value") !== "" &&
    $(popupSelector).find(confirmInputSelector).prop("value") !== "";

  if (isSame) {
    $(popupSelector).removeClass("popup--diff-pass");
    return true;
  } else {
    $(popupSelector).addClass("popup--diff-pass");
    return false;
  }
};

const validatePassword = (popupSelector, inputSelector) => {
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/gi;
  const pass = $(inputSelector).prop("value");

  if (passRegex.test(pass)) {
    $(popupSelector).removeClass("popup--invalid-pass");
    return true;
  } else {
    $(popupSelector).addClass("popup--invalid-pass");
    return false;
  }
};

const validateForgotPassPopup = () => {
  $(".popup--forgot-pass").on("input", function (e) {
    const isValid = validatePassword(".popup--forgot-pass", "#forgot-password");

    if (isValid) {
      $(this).find(".popup__submit").prop("disabled", false);
    } else {
      $(this).find(".popup__submit").prop("disabled", true);
    }
  });
};

const showRegistrationPopup = () => {
  $(".popup--admin-registration").addClass("popup--open");
  $(".popup--admin-registration").on("input", function (e) {
    let isValid = true;
    // const isValidPass = comparePasswords('.popup--admin-registration', '#password', '#confirm-password') use compare after submitting form
    const isValidPass = validatePassword(
      ".popup--admin-registration",
      "#password",
      "#confirm-password"
    );

    $(this)
      .find('input:not([type="file"])')
      .each(function (i, elem) {
        if (!elem.value) {
          if (isValidPass) {
            isValid = false;
          }
        }
      });

    if (isValid && isValidPass) {
      $(".popup--admin-registration")
        .find(".popup__submit")
        .prop("disabled", false);
    } else {
      $(".popup--admin-registration")
        .find(".popup__submit")
        .prop("disabled", true);
    }
  });
};

const setAuthPopupValidation = () => {
  $(".popup--admin-authorization").on("input", function (e) {
    let isValid = true;
    $(this)
      .find('input:not([type="file"])')
      .each(function (i, elem) {
        if (!elem.value) {
          if (isSamePass) {
            isValid = false;
          }
        }
      });

    if (isValid) {
      $(this).find(".popup__submit").prop("disabled", false);
    } else {
      $(this).find(".popup__submit").prop("disabled", true);
    }
  });
};

const showAuthPopup = () => {
  $(".popup--admin-authorization").addClass("popup--open");
  setAuthPopupValidation();
};

$(document).ready(() => {
  $('[data-picker="datepicker"]').datetimepicker({
    timepicker: false,
    format: "d-m-Y",
    mask: true,
  });

  $('[data-picker="timepicker"]').datetimepicker({
    datepicker: false,
    format: "H:m",
    mask: true,
  });

  $('[name="admins"]').change(function (e) {
    $(this).closest(".user-list__tr").toggleClass("user-list__tr--selected");
  });

  $("#all-checked").change(function (e) {
    $('[name="admins"]').each(function (i, element) {
      $(element).click();
    });
  });

  $(".filters__btn--add-admins").click(function (e) {
    $(".popup--admin-invite").addClass("popup--open");
  });

  $(".popup__close").click(function (e) {
    $(this).closest(".popup").removeClass("popup--open");
  });

  $(".popup__textarea").on("input", function (e) {
    const regex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]?\n)/;
    const isValidInput = regex.test(e.target.value);

    if (isValidInput) {
      $(e.target)
        .closest("form")
        .find(".popup__submit")
        .prop("disabled", false);
    } else {
      $(e.target).closest("form").find(".popup__submit").prop("disabled", true);
    }
  });

  $(".popup__input--photo").on("input", function (e) {
    const reader = new FileReader();
    reader.onloadend = () => {
      $(this).closest(".popup__label").find("img").prop("src", reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  });

  $(".popup__show-pass").click(function () {
    $(this).toggleClass("popup__show-pass--shown");
    const isPass =
      $(this).closest(".popup__label").find("input").prop("type") ===
      "password";

    if (isPass) {
      $(this).closest(".popup__label").find("input").prop("type", "text");
    } else {
      $(this).closest(".popup__label").find("input").prop("type", "password");
    }
  });

  $(".popup__submit--ok").click(function (e) {
    e.preventDefault();
    $(this).closest(".popup").removeClass("popup--open");
  });

  $("#user-avatar").on("input", function (e) {
    const reader = new FileReader();
    reader.onloadend = () => {
      $(this).closest(".tab__avatar").find("img").prop("src", reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);

    $(".tab__avatar-remove-label").click(function (e) {
      $(e.target).closest(".tab__avatar").find("img").removeAttr("src");
    });
  });

  validateForgotPassPopup();
  showRegistrationPopup();
  showAuthPopup();
});
