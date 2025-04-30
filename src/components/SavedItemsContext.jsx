import React, { createContext, useState, useContext } from "react";
import { Box, Typography, Button, List, ListItem, ListItemText } from "@mui/material";

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

// Componente para exibir os itens salvos
export const SavedItemsList = () => {
    const { savedItems, removeSavedItem } = useSavedItems();

    return (
        <Box
            sx={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                maxWidth: "400px",
                margin: "20px auto",
            }}
        >
            <Typography
                sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#006916",
                    marginBottom: "15px",
                }}
            >
                Itens Salvos
            </Typography>
            <List>
                {savedItems.length > 0 ? (
                    savedItems.map((item, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderBottom: "1px solid #e0e0e0",
                                padding: "10px 0",
                            }}
                        >
                            <ListItemText
                                primary={item.title}
                                secondary={item.description}
                                sx={{ color: "#555" }}
                            />
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => removeSavedItem(item)}
                            >
                                Remover
                            </Button>
                        </ListItem>
                    ))
                ) : (
                    <Typography sx={{ color: "#777", textAlign: "center" }}>
                        Nenhum item salvo.
                    </Typography>
                )}
            </List>
        </Box>
    );
};