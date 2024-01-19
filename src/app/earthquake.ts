export interface Earthquake {
    providerId: string
    date: string
    depth: number | undefined,
    magnitude: number,
    type: string | undefined,
    latitude: number,
    longitude: number,
    id: number
}