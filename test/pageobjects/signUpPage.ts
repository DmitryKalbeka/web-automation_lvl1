import {BasePage} from './basePage'
import TextLabel from '../framework/textLabel'
import TextField from '../framework/textField'

class SignUpPage extends BasePage {

    get title(): TextLabel {
        return new TextLabel($('.auth-wrapper .auth-form__title'))
    }

    get emailField(): TextField {
        return new TextField($(('[type="email"]')))
    }

    get emailFieldValidationLabel(): TextLabel {
        return new TextLabel($(('//input[@type="email"]/../../..//div[contains(@class,"auth-form__description")]')))
    }

    get passwordField(): TextField {
        return new TextField($(('[type="password"][placeholder="Придумайте пароль"]')))
    }

    get repeatPasswordField(): TextField {
        return new TextField($(('[type="password"][placeholder="Повторите пароль"]')))
    }

    get passwordFieldValidationLabel(): TextLabel {
        return new TextLabel($('.auth-form__securebox .auth-form__description'))
    }

    get repeatPasswordFieldValidationLabel(): TextLabel {
        return new TextLabel($('[autocomplete="repeatPassword"] .auth-form__description'))
    }
}

export const signUpPage = new SignUpPage()