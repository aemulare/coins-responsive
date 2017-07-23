// function onFormSuccess(e) {
//     // $('#contact-us-all').formValidation('resetField', 'firstName', true);
//     $('#contact-us-all').formValidation('resetForm', true);
//     $('#modal').modal().open();
// }



$(document).ready(function() {
    $('#contact-us-all').formValidation({
        framework: 'bootstrap',
        err: {
            container: 'tooltip'
        },
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            firstName: {
                validators: {
                    notEmpty: {
                        message: 'The first name is required'
                    }
                }
            },
            emailAddress: {
                validators: {
                    notEmpty: {
                        message: 'The email is required'
                    },
                    emailAddress: {
                        message: 'The value is not a valid email address'
                    }
                }
            },
            lastName: {
                validators: {
                    notEmpty: {
                        message: 'The last name is required'
                    }
                }
            },
            busPhone: {
                validators: {
                    digits: {
                        message: 'The phone number can contain digits only'
                    },
                    notEmpty: {
                        message: 'The phone number is required'
                    }
                }
            },
            comments: {
                validators: {
                    notEmpty: {
                        message: 'Your message cannot be empty'
                    },
                    stringLength: {
                        max: 500,
                        message: 'The message must be less than 500 characters'
                    }
                }
            }
        }
    });
});