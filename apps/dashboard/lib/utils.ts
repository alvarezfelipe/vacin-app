// Exclude keys from user

type Model = {
    [key: string]: any
}

function exclude<T, U extends keyof T>(
    model: T,
    keys: U[]
): Omit<T, U> {
    return Object.fromEntries(
        Object.entries(model as Model).filter(([key]) => !keys.includes(key as any))
    ) as Omit<T, U>
}