import TextLabel from '../../framework/elements/textLabel'

export class TopicCell{

    constructor(private readonly element: WebdriverIO.Element) {
    }

    get creationLabel(): TextLabel {
        return new TextLabel(this.element.$('.link-getlast'))
    }

    async timeShiftingOfCreationTime(): Promise<number> {
        const creationLabelText = await this.creationLabel.getText()
        const value = parseInt(creationLabelText)
        if (!creationLabelText.includes('час') && !creationLabelText.includes('минут')) {
            throw new Error(`Incorrect label format - ${creationLabelText}`)
        }
        const multiplier = creationLabelText.includes('час') ? 60 : 1
        return value * multiplier
    }
}