// 单位转换:bit 转 GB、TB、PB、EB、ZB、YB
const convertSizeToReadable = (size: number | string) => {
    const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let index = 0
    if (typeof size === 'string') {
        size = Number(size)
        // 检测字符串是否溢出
        if (size > Number.MAX_SAFE_INTEGER) {
            throw new Error('The number is too large to convert.')
        }
    }
    while (size >= 1024) {
        size = size / 1024
        index++
    }
    if (size < 0.01) {
        return "--"
    }
    return size.toFixed(2) + unit[index]
}

// 单位转目标单位:bit 转 GB、TB、PB、EB、ZB、YB
const convertSizeToTargetUnit = (size: number, targetUnit: string): number => {
    const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let index = 0,
        convertedSize: number = 0
    const targetIndex = unit.indexOf(targetUnit.toUpperCase())

    if (targetIndex !== -1) {
        while (index <= targetIndex) {
            size = size / 1024
            index++
        }
        convertedSize = parseFloat(size.toFixed(2))
    }

    return convertedSize
}

export {
    convertSizeToReadable,
    convertSizeToTargetUnit,
}
