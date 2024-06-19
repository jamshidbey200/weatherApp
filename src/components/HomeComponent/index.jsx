"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import WeatherInfo from "../WeatherInfo";
import SearchInput from "../SearchInput";
import styles from "./style.module.css";

const APP_ID = process.env.APP_ID;
export default function HomeComponent({ initialWeatherData, initialCityName }) {
  const [cityName, setCityName] = useState(initialCityName || "Tashkent");
  const [weatherData, setWeatherData] = useState(initialWeatherData);
  const [searchHistory, setSearchHistory] = useState(() => {
    const getHistory =
      (typeof window !== "undefined" &&
        window.localStorage.getItem("searchHistory")) ||
      "[]";

    return JSON.parse(getHistory);
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateSearchHistory = (newCity) => {
    let history = [...searchHistory];
    if (history?.includes(newCity)) {
      history = history?.filter((item) => item !== newCity);
    }
    history.unshift(newCity);
    if (history?.length > 5) {
      history?.pop();
    }
    setSearchHistory(history);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("searchHistory", JSON.stringify(history));
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      console.log("el", e);
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APP_ID}&units=metric`
      );
      const response = await data.json();
      console.log("handleSearch", response);
      setWeatherData(response);
      updateSearchHistory(cityName);
    } catch (err) {
      setError(err.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  const clearInput = () => {
    setCityName("");
  };

  const todayData = weatherData?.list?.[0];

  const uniqueDates = [
    ...new Set(
      weatherData?.list?.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const currentData = uniqueDates.map((date) => {
    return weatherData?.list?.find((entry) => {
      const entryDate = new Date(entry?.dt * 1000)
        ?.toISOString()
        ?.split("T")[0];
      return entryDate === date;
    });
  });

  const options = searchHistory.map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <main className={styles.main}>
      <Box
        display="flex"
        justifyContent="center"
        height="max-content"
        marginBottom="20px"
      >
        <SearchInput
          handleSearch={handleSearch}
          city_name={cityName}
          options={options}
          clearInput={clearInput}
          setCityName={setCityName}
        />
      </Box>
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            background: "#fff",
            opacity: "0.4",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {todayData && currentData ? (
            <>
              {todayData && (
                <WeatherInfo
                  temp={todayData?.main?.temp}
                  humidity={todayData?.main?.humidity}
                  wind={todayData?.wind?.speed}
                  weather={todayData?.weather[0]?.description}
                  iconName={todayData?.weather[0]?.icon}
                  date={todayData?.dt_txt?.split(" ")[0]}
                />
              )}
              <Typography
                sx={{
                  position: "relative",
                  zIndex: 100,
                  fontWeight: 500,
                  fontSize: "18px",
                  marginBottom: "20px",
                  width: "max-content",
                }}
              >
                {todayData && "Weather info for 5 days"}
              </Typography>
              <Box className={styles.waterCardWrap}>
                {currentData &&
                  Array.isArray(currentData) &&
                  currentData
                    ?.slice(1)
                    ?.map((el, index) => (
                      <WeatherInfo
                        key={index}
                        temp={el?.main?.temp}
                        humidity={el?.main?.humidity}
                        wind={el?.wind?.speed}
                        weather={el?.weather[0]?.description}
                        iconName={el?.weather[0]?.icon}
                        date={el?.dt_txt?.split(" ")[0]}
                      />
                    ))}
              </Box>
            </>
          ) : (
            <Typography
              sx={{
                position: "relative",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                color: "#555",
                marginTop: "50px",
              }}
            >
              {error}
            </Typography>
          )}
        </>
      )}
    </main>
  );
}
