export type BaseId = string

export interface BaseRepository<T> {
    insert(value: T): Promise<T>
    batch(values: T[]): Promise<T[]>
    update(id: BaseId, value: Partial<T>)
    select(criteria: Partial<T>, options?)
    selectById(id: BaseId, options?): Promise<T>
    deleteById(id: BaseId)
}