import {BasePage} from './basePage'
import Button from '../framework/elements/button'

class LogInPage extends BasePage {

    get signUpLink(): Button {
        return new Button($(('//a[contains(.,"Зарегистрироваться ")]')))
    }
}

export const logInPage = new LogInPage()