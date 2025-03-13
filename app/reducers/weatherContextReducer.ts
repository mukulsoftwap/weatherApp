export const weatherReducer = (state: any, action: any) => {
    switch (action.type) {
        case "FETCH_WEATHER_START":
            return { ...state, loading: true, error: null };
        case "FETCH_WEATHER_SUCCESS":
            return { ...state, weatherInfo: action.payload, loading: false };
        case "FETCH_WEATHER_FAILURE":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};