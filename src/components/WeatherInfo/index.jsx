import { Box, Typography } from "@mui/material";
import React from "react";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { TbTemperatureCelsius } from "react-icons/tb";
import Image from "next/image";

const WeatherInfo = ({ temp, humidity, weather, wind, date, iconName }) => {
  return (
    <Box
      sx={{
        border: "1px solid #b2b2b2",
        position: "relative",
        zIndex: 10,
        background: "#fff",
        padding: "12px 10px",
        borderRadius: "5px",
        width: "220px",
        marginBottom: "20px",
      }}
    >
      <Typography>Date: {date}</Typography>
      <Box></Box>
      <Box display="flex" gap="20px">
        <Typography>Temp</Typography>
        <Typography>
          {temp?.toFixed()}
          <TbTemperatureCelsius />
        </Typography>
      </Box>
      <Box display="flex" gap="20px">
        <Typography>Humidity</Typography>
        <Typography>
          {humidity}
          <WiHumidity />
        </Typography>
      </Box>
      <Box display="flex" gap="20px">
        <Typography>Wind</Typography>
        <Typography>
          {wind}
          <FiWind />
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          background: "#BCD2D0",
          borderRadius: "5px",
        }}
      >
        {" "}
        <Image
          width={50}
          height={50}
          alt="icon"
          src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
        />{" "}
        {weather}
      </Box>
    </Box>
  );
};

export default WeatherInfo;
