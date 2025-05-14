
import { Destination } from "@/types";
import { mockWeather } from "@/data/mockData";

interface WeatherWidgetProps {
  destination: Destination;
  startDate: string;
  endDate: string;
}

const WeatherWidget = ({ destination, startDate, endDate }: WeatherWidgetProps) => {
  // Get weather data for the start date
  const weather = mockWeather[startDate];
  
  // Weather icon mapping
  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case "01d": 
      case "01n": 
        return "○"; // clear sky
      case "02d":
      case "02n":
        return "◐"; // few clouds
      case "03d":
      case "03n":
        return "◑"; // scattered clouds
      case "04d":
      case "04n":
        return "●"; // broken clouds
      case "09d":
      case "09n":
        return "▼"; // shower rain
      case "10d":
      case "10n":
        return "⋮"; // rain
      case "11d":
      case "11n":
        return "⋰"; // thunderstorm
      case "13d":
      case "13n":
        return "∗"; // snow
      case "50d":
      case "50n":
        return "≡"; // mist
      default:
        return "◑";
    }
  };
  
  if (!weather) {
    return (
      <div className="h-full rounded-md overflow-hidden bg-[#1D1D1F] text-white p-6">
        <div className="text-base font-medium mb-2">Weather</div>
        <div className="text-center py-4">
          <p className="text-sm opacity-70">Weather information not available.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full rounded-md overflow-hidden bg-[#1D1D1F] text-white p-6">
      <div className="text-base font-medium mb-2">{destination.city}</div>
      <div className="flex flex-col items-center">
        <div className="text-6xl my-4 font-light">{getWeatherIcon(weather.icon)}</div>
        <div className="text-6xl font-thin mb-2">{weather.temperature}°</div>
        <div className="text-lg opacity-70 mb-6 tracking-wide uppercase">{weather.description}</div>
        
        <div className="w-full grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col opacity-80">
            <span className="text-xs uppercase tracking-wide mb-1">Humidity</span>
            <span className="font-medium text-2xl">{weather.humidity}%</span>
          </div>
          <div className="flex flex-col opacity-80">
            <span className="text-xs uppercase tracking-wide mb-1">Wind</span>
            <span className="font-medium text-2xl">{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
