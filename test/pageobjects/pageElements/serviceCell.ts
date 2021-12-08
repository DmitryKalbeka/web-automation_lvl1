import TextLabel from '../../framework/elements/textLabel'
import Image from '../../framework/elements/image'

export class ServiceCell{

    constructor(private readonly element: WebdriverIO.Element) {
    }

    get title(): TextLabel {
        return new TextLabel(this.element.$('.service-offers__name'))
    }

    get status(): TextLabel {
        return new TextLabel(this.element.$('.service-offers__status .ng-scope'))
    }

    get image(): Image {
        return new Image(this.element.$('.service-offers__image'))
    }
}