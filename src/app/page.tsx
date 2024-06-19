import HomeComponent from "../components/HomeComponent";

const APP_ID = process.env.APP_ID;

async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APP_ID}&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

export default async function Home() {
  const defaultCity = "Tashkent";
  const initialWeatherData = await fetchWeatherData(defaultCity);

  return (
    <>
      <HomeComponent
        initialWeatherData={initialWeatherData}
        initialCityName={defaultCity}
      />
    </>
  );
}
