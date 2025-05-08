"use client";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import countries from "country-list";

interface Country {
  code: string;
  name: string;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

export default function RegistrationPage() {
  // State for form fields
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState<boolean>(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState<boolean>(false);
  const [countrySearch, setCountrySearch] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Popular languages with their codes and flags
  const languages: Language[] = [
    { code: "en", name: "English", flag: "GB" },
    { code: "es", name: "Spanish", flag: "ES" },
    { code: "fr", name: "French", flag: "FR" },
    { code: "de", name: "German", flag: "DE" },
    { code: "it", name: "Italian", flag: "IT" },
    { code: "pt", name: "Portuguese", flag: "PT" },
    { code: "ru", name: "Russian", flag: "RU" },
    { code: "zh", name: "Chinese", flag: "CN" },
    { code: "ja", name: "Japanese", flag: "JP" },
    { code: "ar", name: "Arabic", flag: "SA" },
  ];

  // Get all countries with their codes
  const allCountries: Country[] = Object.entries(countries.getNames()).map(
    ([code, name]) => ({ code, name })
  );

  // Filter countries based on search
  const filteredCountries = countrySearch
    ? allCountries.filter((country) =>
        country.name.toLowerCase().includes(countrySearch.toLowerCase())
      )
    : allCountries;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      restaurantName,
      selectedCountry,
      selectedLanguage,
    });
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden registration-page">
      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="max-w-md w-full">
          <h1 className="text-[#393636] text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            Register now!
          </h1>
          <p className="text-[#5a5757] text-center mb-6 md:mb-8 text-sm md:text-base">
            Register your restaurant to our ultimate
            <br />
            customer satisfaction platform
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Restaurant name"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-[#d8d8d8] focus:outline-none focus:ring-2 focus:ring-[#ff0000]/20 text-sm md:text-base"
                required
              />
            </div>

            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center justify-between w-full px-4 py-3 rounded-full border border-[#d8d8d8] cursor-pointer"
                onClick={() => {
                  setShowCountryDropdown(!showCountryDropdown);
                  setShowLanguageDropdown(false);
                }}
              >
                <div className="flex items-center">
                  {selectedCountry ? (
                    <>
                      <ReactCountryFlag
                        countryCode={selectedCountry.code}
                        svg
                        style={{
                          width: "1.5em",
                          height: "1.5em",
                          marginRight: "8px",
                        }}
                      />
                      <span className="text-[#393636]">
                        {selectedCountry.name}
                      </span>
                    </>
                  ) : (
                    <span className="text-[#696868]">Country</span>
                  )}
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-[#696868] transition-transform ${
                    showCountryDropdown ? "rotate-180" : ""
                  }`}
                />
              </div>

              {showCountryDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-[#d8d8d8] max-h-60 overflow-auto">
                  <div className="p-2 sticky top-0 bg-white">
                    <input
                      type="text"
                      placeholder="Search countries..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full px-3 py-2 border border-[#d8d8d8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff0000]/20 text-sm"
                      autoFocus
                    />
                  </div>
                  <ul>
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <li
                          key={country.code}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          onClick={() => {
                            setSelectedCountry(country);
                            setShowCountryDropdown(false);
                          }}
                        >
                          <ReactCountryFlag
                            countryCode={country.code}
                            svg
                            style={{
                              width: "1.2em",
                              height: "1.2em",
                              marginRight: "8px",
                            }}
                          />
                          <span className="text-sm">{country.name}</span>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-sm text-gray-500">
                        No countries found
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center justify-between w-full px-4 py-3 rounded-full border border-[#d8d8d8] cursor-pointer"
                onClick={() => {
                  setShowLanguageDropdown(!showLanguageDropdown);
                  setShowCountryDropdown(false);
                }}
              >
                <div className="flex items-center">
                  {selectedLanguage ? (
                    <>
                      <ReactCountryFlag
                        countryCode={selectedLanguage.flag}
                        svg
                        style={{
                          width: "1.5em",
                          height: "1.5em",
                          marginRight: "8px",
                        }}
                      />
                      <span className="text-[#393636]">
                        {selectedLanguage.name}
                      </span>
                    </>
                  ) : (
                    <span className="text-[#696868]">Language</span>
                  )}
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-[#696868] transition-transform ${
                    showLanguageDropdown ? "rotate-180" : ""
                  }`}
                />
              </div>

              {showLanguageDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-[#d8d8d8] max-h-60 overflow-auto">
                  <ul>
                    {languages.map((language) => (
                      <li
                        key={language.code}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => {
                          setSelectedLanguage(language);
                          setShowLanguageDropdown(false);
                        }}
                      >
                        <ReactCountryFlag
                          countryCode={language.flag}
                          svg
                          style={{
                            width: "1.2em",
                            height: "1.2em",
                            marginRight: "8px",
                          }}
                        />
                        <span className="text-sm">{language.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#fe0000] text-white font-medium hover:bg-[#ff0000]/90 transition-colors text-sm md:text-base"
            >
              Register now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}