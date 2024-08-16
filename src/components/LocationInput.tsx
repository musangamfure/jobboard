import { forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";
import citiesList from "@/lib/cities-list";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState("");
    const [hasFocused, setHasFocused] = useState(false);

    const cities = useMemo(() => {
      if (!locationSearchInput.trim()) return [];
      const searchWordds = locationSearchInput.trim().split(" ");
      return citiesList
        .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
        .filter(
          (city) =>
            city.toLowerCase().startsWith(searchWordds[0].toLowerCase()) &&
            searchWordds.every((word) =>
              city.toLowerCase().includes(word.toLowerCase())
            )
        )
        .slice(0, 5);
    }, [locationSearchInput]);

    return (
      <div className="relative">
        <Input
          placeholder="Search for a city"
          type="search"
          value={locationSearchInput}
          onChange={(e) => {
            setLocationSearchInput(e.currentTarget.value);
          }}
          onFocus={() => {
            setHasFocused(true);
          }}
          onBlur={() => {
            setHasFocused(false);
          }}
          {...props}
          ref={ref}
        />

        {locationSearchInput.trim() && hasFocused && (
          <div className=" absolute bg-background shadow-xl border-x border-b rounded-b-lg z-20 divide-y">
            {!cities.length ? (
              <p className="text-sm text-muted-foreground p-3 rounded-md bg-gray-200">
                No cities found
              </p>
            ) : (
              cities.map((city) => (
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onLocationSelected(city);
                    setLocationSearchInput("");
                  }}
                  className="block w-full text-start ps-2"
                  key={city}
                >
                  {city}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    );
  }
);
