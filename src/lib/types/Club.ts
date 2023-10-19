import type { UUID } from "crypto"

export type ClubName = {
    id: UUID,
    name: String
}
export type ClubCreateDto = {
    name: String,
    plz: Number,
    location: String,
    street: String,
    housenumber: Number
}
export type Club = {
    id: UUID | null,
    name: String,
    plz: Number,
    location: String,
    street: String,
    housenumber: Number
}