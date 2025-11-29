import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export function useTheme(){
    const context = useContext(ThemeContext);
    if(!context){
        throw("useTheme must be used within ThemeProvider");
    }
    return context;
}