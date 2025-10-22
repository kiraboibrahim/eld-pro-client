import { TripFormData } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getLocationAutoCompleteSuggestions(query: string, signal?: AbortSignal) {
    const response = await fetch(`${API_BASE_URL}/locations/autocomplete/?query=${encodeURIComponent(
        query
    )}`, {
        method: "GET",
        signal,
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Something went wrong!")
    }
    return response.json();
}

export async function calculateTripRoute(tripData: TripFormData, signal?: AbortSignal) {
    const { currentLocation, pickupLocation, dropoffLocation, currentCycleHours } = tripData;
    const response = await fetch(`${API_BASE_URL}/trips/simulate/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        signal,
        body: JSON.stringify({
            current_location: currentLocation,
            pickup_location: pickupLocation,
            dropoff_location: dropoffLocation,
            current_cycle_hours: currentCycleHours,
        }),
    });
    if (!response.ok) {
        throw new Error("Something went wrong!")
    }
    return await response.json(); 
}