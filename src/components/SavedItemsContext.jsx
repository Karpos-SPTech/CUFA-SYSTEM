import React, { createContext, useState, useContext } from "react";

const SavedItemsContext = createContext();

export const SavedItemsProvider = ({ children }) => {
    const [savedItems, setSavedItems] = useState([]);

    const addSavedItem = (item) => {
        setSavedItems((prevItems) => [...prevItems, item]);
    };

    const removeSavedItem = (item) => {
        setSavedItems((prevItems) =>
            prevItems.filter((savedItem) => savedItem.title !== item.title)
        );
    };

    return (
        <SavedItemsContext.Provider value={{ savedItems, addSavedItem, removeSavedItem }}>
            {children}
        </SavedItemsContext.Provider>
    );
};

export const useSavedItems = () => useContext(SavedItemsContext);