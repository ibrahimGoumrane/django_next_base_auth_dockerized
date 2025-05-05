export type CreateOperation<T> = Omit<T, 'id'>;

export type UpdateOperation<T> = Partial<T>;

export type DeleteOperation = {
    id: string | number;
};

export type SelectOperation<T> = T;