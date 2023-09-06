
export const getURLParamsFromFilter = (items: any[]) => {
    const prepParams = items.map((item: any) => {
        return [item.field+"."+item.operator, item.value]
    })
    const params = new URLSearchParams(prepParams);
    return params
}

export const getFilterFromURLParams = (urlFilterParams: URLSearchParams) => {
    const filter = []
    for (const entry of urlFilterParams.entries()) {
        const field = entry[0].split('.')[0]
        const operator = entry[0].split('.')[1]
        const value = entry[1]
        filter.push({ field: field, operator: operator, value: value})
    }

    return filter
}