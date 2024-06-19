import { Close, Search } from "@mui/icons-material";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import React from "react";

const SearchInput = ({
  handleSearch,
  setCityName,
  city_name,
  options,
  clearInput,
}) => {
  return (
    <>
      <form onSubmit={handleSearch}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={city_name}
          options={options}
          sx={{
            width: 300,
            "& .MuiAutocomplete-inputRoot": {
              paddingRight: "10px !important",
            },
          }}
          onInputChange={(_event, newInputValue) => {
            setCityName(newInputValue);
          }}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                label="City name"
                variant="outlined"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      {city_name && (
                        <Close
                          sx={{ marginRight: "10px", cursor: "pointer" }}
                          onClick={clearInput}
                        />
                      )}
                      <Search
                        sx={{ cursor: "pointer" }}
                        onClick={handleSearch}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            );
          }}
        />
      </form>
    </>
  );
};

export default SearchInput;
