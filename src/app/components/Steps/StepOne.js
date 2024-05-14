import React, { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { Country, City } from "country-state-city";
import Select from "react-select";
const StepOne = ({
  age,
  language,
  niche,
  experience,
  gender,
  calls,
  city,
  country,
  setFormData,
  handleChange,
  languageOptions,
  nicheOptions,
  experienceOptions,
  callsOptions,
  amountClosed,
  handleSubmit, // If you need to handle submit inside StepOne
}) => {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [isOtherNiche, setIsOtherNiche] = useState(false);
  const [customNiche, setCustomNiche] = useState("");

  // Add this inside your StepOne component

  const handleNicheChange = (event) => {
    const { value } = event.target;
    if (value === "other") {
      setIsOtherNiche(true);
    } else {
      setIsOtherNiche(false);
      setFormData((prevState) => ({
        ...prevState,
        niche: value,
      }));
    }
  };

  const formattedNicheOptions = nicheOptions.map((niche) => ({
    value: niche,
    label: niche,
  }));

  // Update to handle multiple niches
  const handleNicheSelectChange = (selectedOptions) => {
    const selectedNiches = selectedOptions.map((option) => option.value);
    // Check if 'Other' is one of the selected niches
    const hasOther = selectedNiches.includes("Other"); // Assuming the value for 'Other' is 'other'
    setIsOtherNiche(hasOther);

    if (!hasOther) {
      setCustomNiche(""); // Reset custom niche if 'Other' is not selected
    }

    setFormData((prevState) => ({
      ...prevState,
      niche: selectedNiches,
    }));
  };

  const handleCustomNicheChange = (event) => {
    const { value } = event.target;
    setCustomNiche(value);
    // Update the formData directly with the custom niche
    setFormData((prevState) => ({
      ...prevState,
      niche: value,
    }));
  };

  useEffect(() => {
    // Fetch and set cities when a country is selected
    if (country) {
      // Directly getting cities of the selected country, bypassing state selection
      const citiesArray = City.getCitiesOfCountry(country);
      setCities(citiesArray);
    }
  }, [country]);

  const formattedLanguageOptions = languageOptions.map((lang) => ({
    value: lang,
    label: lang,
  }));

  const handleMultiSelectChange = (selectedOptions) => {
    const selectedLanguages = selectedOptions.map((option) => option.value);
    // Assuming you want to update the formData state in StepForm
    setFormData((prevState) => ({
      ...prevState,
      language: selectedLanguages,
    }));
  };

  return (
    <div>
      <div className={styles.inputGroup}>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          min="18"
          type="number"
          placeholder="Your age"
          value={age}
          onChange={handleChange}
          required={true}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={gender} // Ensure this is initialized to '' in your component's state
          onChange={handleChange}
          className="selected-option"
          required={true}
        >
          {/* Removed the selected attribute from here */}
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="country">Country</label>
        <select
          id="country"
          name="country"
          value={country}
          onChange={handleChange}
          className={country ? "selected-option" : "select-placeholder"}
          required={true}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map(({ isoCode, name }) => (
            <option key={name} value={isoCode}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="city">City</label>
        <select
          id="city"
          name="city"
          value={city}
          onChange={handleChange}
          className={city ? "selected-option" : "select-placeholder"}
          disabled={!country}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city, index) => (
            // Creating a unique key using city name, country code, state code, latitude, and longitude
            <option
              key={`${city.name}-${city.countryCode}-${city.stateCode}-${city.latitude}-${city.longitude}`}
              value={city.name}
            >
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="language">Language</label>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: "#242424",
              color: "#fff",
              borderColor: state.isFocused ? "#dcdcdc" : "#606060",
              boxShadow: state.isFocused ? "0 0 0 1px #606060" : "none",
              outline: state.isFocused ? "none" : "none",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "#3A3A3A" : "#242424", // Change for hover/focus
              border: "none",
              fontSize: 12,
              color: "#fff",
              "&:active": {
                backgroundColor: "darkgray",
                color: "#fff",
              },
            }),
            menu: (provided) => ({
              ...provided,
              // Adjust the outer container of the dropdown menu here
              backgroundColor: "#242424",
              padding: 0, // Remove padding around the options
              border: "1px solid #606060", // Example: Add a border around the entire menu
            }),
            menuList: (provided) => ({
              ...provided,
              // Adjust the internal container that directly wraps the options
              padding: 0, // Remove padding inside the menu that affects all options
            }),
            singleValue: (provided, state) => ({
              ...provided,
              color: "#fff", // Change the color of text for single select
            }),
            multiValue: (provided, state) => ({
              ...provided,
              backgroundColor: "#171717", // Background color of the whole tag
              border: "1px solid #fff",
              borderRadius: 12,
              color: "#fff",
              padding: "0 2px 0 4px",
            }),
            multiValueLabel: (provided, state) => ({
              ...provided,
              color: "#cec9c9", // Change the color of text for labels in multi-select
              fontSize: 11,
            }),
            multiValueRemove: (provided, state) => ({
              ...provided,
              color: "#f1f1f1", // Text or icon color of the remove part
              ":hover": {
                borderRadius: 9,
                backgroundColor: "#1f1f1f", // Background color on hover of the remove part
                color: "#ce5e1b",
              },
            }),
            placeholder: (provided, state) => ({
              ...provided,
              fontSize: 14,
              color: "#868686", // Change the color of the placeholder text
            }),
            input: (provided, state) => ({
              ...provided,
              fontSize: 14,
              color: "#fff", // This will change the text color of the input field
            }),
            // Include other custom styles...
          }}
          id="language"
          name="language"
          isMulti // Enable multi-select
          options={formattedLanguageOptions} // Use the formatted options
          classNamePrefix="select" // Optional: This prefix is used for all the generated class names.
          onChange={handleMultiSelectChange} // Use the new handler for react-select
          placeholder="Select languages"
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="experience">
          How many years of sales experience you have
        </label>
        <select
          id="experience"
          name="experience"
          value={experience}
          onChange={handleChange}
          required={true}
        >
          <option value="" className="select-placeholder">
            Select years
          </option>
          {experienceOptions.map((exp) => (
            <option key={exp} value={exp}>
              {exp}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="niche">What niches have you sold in</label>
        <Select
          id="niche"
          name="niche"
          isMulti // Enable multi-select
          options={formattedNicheOptions} // Use the formatted options
          classNamePrefix="select" // Optional: This prefix is used for all the generated class names.
          onChange={handleNicheSelectChange} // Use the updated handler for react-select
          placeholder="Select niches"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: "#242424",
              color: "#fff",
              borderColor: state.isFocused ? "#dcdcdc" : "#606060",
              boxShadow: state.isFocused ? "0 0 0 1px #606060" : "none",
              outline: state.isFocused ? "none" : "none",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "#3A3A3A" : "#242424", // Change for hover/focus
              border: "none",
              fontSize: 12,
              color: "#fff",
              "&:active": {
                backgroundColor: "darkgray",
                color: "#fff",
              },
            }),
            menu: (provided) => ({
              ...provided,
              // Adjust the outer container of the dropdown menu here
              backgroundColor: "#242424",
              padding: 0, // Remove padding around the options
              border: "1px solid #606060", // Example: Add a border around the entire menu
            }),
            menuList: (provided) => ({
              ...provided,
              // Adjust the internal container that directly wraps the options
              padding: 0, // Remove padding inside the menu that affects all options
            }),
            singleValue: (provided, state) => ({
              ...provided,
              color: "#fff", // Change the color of text for single select
            }),
            multiValue: (provided, state) => ({
              ...provided,
              backgroundColor: "#171717", // Background color of the whole tag
              border: "1px solid #fff",
              borderRadius: 12,
              color: "#fff",
              padding: "0 2px 0 4px",
            }),
            multiValueLabel: (provided, state) => ({
              ...provided,
              color: "#cec9c9", // Change the color of text for labels in multi-select
              fontSize: 11,
            }),
            multiValueRemove: (provided, state) => ({
              ...provided,
              color: "#f1f1f1", // Text or icon color of the remove part
              ":hover": {
                borderRadius: 9,
                backgroundColor: "#1f1f1f", // Background color on hover of the remove part
                color: "#ce5e1b",
              },
            }),
            placeholder: (provided, state) => ({
              ...provided,
              fontSize: 14,
              color: "#868686", // Change the color of the placeholder text
            }),
            input: (provided, state) => ({
              ...provided,
              fontSize: 14,
              color: "#fff", // This will change the text color of the input field
            }),
            // Include other custom styles...
          }}
        />
      </div>

      {isOtherNiche && (
        <input
          type="text"
          placeholder="Enter your custom niche"
          value={customNiche}
          onChange={handleCustomNicheChange}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #606060",
            width: "100%",
            padding: "10px 10px",
          }}
        />
      )}

      <div className={styles.inputGroup}>
        <label htmlFor="amountClosed">Total cash collected</label>
        <select
          id="amountClosed"
          name="amountClosed"
          value={amountClosed}
          onChange={handleChange}
          className={amountClosed ? "selected-option" : "select-placeholder"}
          required={true}
        >
          <option value="" disabled>
            Select Amount Closed
          </option>
          <option value="0-100k">0 - $100k</option>
          <option value="100k-250k">$100k - $250k</option>
          <option value="250k-500k">$250k - $500k</option>
          <option value="500k-1M">$500k - $1M</option>
          <option value="1M-3M">$1M - $3M</option>
          <option value="3M-5M">$3M - $5M</option>
          <option value="5M-7M">$5M - $7M</option>
          <option value="7M-9M">$7M - $9M</option>
          <option value="9M-11M">$9M - $11M</option>
          <option value="11M+">$11M+</option>
        </select>
      </div>
    </div>
  );
};

export default StepOne;
