
const ICONS:any = {
    mist : require('../../assets/images/mist.png'),
    clouds : require('../../assets/images/clouds.png'),
    clear : require('../../assets/images/clear.png'),
    dust : require('../../assets/images/dust.png'),
    fog : require('../../assets/images/fog.png'),
    haze : require('../../assets/images/haze.png'),
    smoke : require('../../assets/images/smoke.webp'),
    snow : require('../../assets/images/snow.png'),
    rain: require('../../assets/images/rain.png'),
}
export function fetchIcon(main:string, icon:string){
    return ICONS[main.toLocaleLowerCase()] || `https://openweathermap.org/img/wn/${icon}@4x.png`;
}