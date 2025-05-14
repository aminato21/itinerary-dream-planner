
import { Destination } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        return "☀️"; // clear sky
      case "02d":
      case "02n":
        return "⛅"; // few clouds
      case "03d":
      case "03n":
        return "☁️"; // scattered clouds
      case "04d":
      case "04n":
        return "☁️"; // broken clouds
      case "09d":
      case "09n":
        return "🌧️"; // shower rain
      case "10d":
      case "10n":
        return "🌦️"; // rain
      case "11d":
      case "11n":
        return "⛈️"; // thunderstorm
      case "13d":
      case "13n":
        return "❄️"; // snow
      case "50d":
      case "50n":
        return "🌫️"; // mist
      default:
        return "☁️";
    }
  };
  
  if (!weather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">Weather information not available.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Weather in {destination.city}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="text-5xl mb-2">{getWeatherIcon(weather.icon)}</div>
          <div className="text-3xl font-bold mb-1">{weather.temperature}°C</div>
          <div className="text-sm text-muted-foreground mb-4">{weather.description}</div>
          
          <div className="w-full grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col items-center bg-muted p-2 rounded-md">
              <span className="text-muted-foreground">Humidity</span>
              <span className="font-medium">{weather.humidity}%</span>
            </div>
            <div className="flex flex-col items-center bg-muted p-2 rounded-md">
              <span className="text-muted-foreground">Wind</span>
              <span className="font-medium">{weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
