export function extractPriceValueFromLabel(textLabel: string): number {
    if (textLabel === '') {
        return 0
    }
    const regEx = new RegExp(`\\d+,\\d{2}`)
    const matches = regEx.exec(textLabel)
    return parseFloat(matches[0].replace(',','.'))
}

export function extractCountFromLabel(textLabel: string): number {
    if (textLabel === '') {
        return 0
    }
    const regEx = new RegExp(`[\\d ]+`)
    const matches = regEx.exec(textLabel)
    return parseInt(matches[0].replace(',','.'))
}

export function extractTopicsCount(textLabel: string): number {
    if (textLabel === '') {
        return 0
    }
    const regEx = new RegExp(`(?<=найдено)[\\d ]+(?= тем)`)
    const matches = regEx.exec(textLabel)
    return parseInt(matches[0].replace(',','.'))
}