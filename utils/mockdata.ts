export const southAmericanCountries = [
    { id: 1, name: "Argentina", code: "AR", flag: "🇦🇷" },
    { id: 2, name: "Bolivia", code: "BO", flag: "🇧🇴" },
    { id: 3, name: "Brasil", code: "BR", flag: "🇧🇷" },
    { id: 4, name: "Chile", code: "CL", flag: "🇨🇱" },
    { id: 5, name: "Colombia", code: "CO", flag: "🇨🇴" },
    { id: 6, name: "Ecuador", code: "EC", flag: "🇪🇨" },
    { id: 7, name: "Guyana", code: "GY", flag: "🇬🇾" },
    { id: 8, name: "Paraguay", code: "PY", flag: "🇵🇾" },
    { id: 9, name: "Perú", code: "PE", flag: "🇵🇪" },
    { id: 10, name: "Surinam", code: "SR", flag: "🇸🇷" },
    { id: 11, name: "Uruguay", code: "UY", flag: "🇺🇾" },
    { id: 12, name: "Venezuela", code: "VE", flag: "🇻🇪" }
]

export const travelClasses = [
    { id: 1, name: "Económica", code: "ECO", icon: "✈️" },
    { id: 2, name: "Business", code: "BUS", icon: "💼" }
]

export interface Country {
    id: number
    name: string
    code: string
    flag: string
}

export interface TravelClass {
    id: number
    name: string
    code: string
    icon: string
}
