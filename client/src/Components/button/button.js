import React from "react";
import "./button.css";

export default function({className,children,type}){
    return(
        <button className={`btn${className ?' ' + className : ' '}`} type={type} >
            {children}
        </button>
    )
}