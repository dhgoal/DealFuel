export const selectStyles = {
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
};


export const selectStylesWorkExperience = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: "#242424",
        color: "#fff",
        borderColor: state.isFocused ? "#dcdcdc" : "#606060",
        boxShadow: state.isFocused ? "0 0 0 1px #606060" : "none",
        outline: state.isFocused ? "none" : "none",
        fontSize:10,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#3A3A3A" : "#242424", // Change for hover/focus
        border: "none",
        fontSize: 10,
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
};