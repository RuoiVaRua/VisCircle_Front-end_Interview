import axios from "axios";
import React from "react";
import Content from "./components/Content/Content";
import Sidebar from "./components/Sidebar/Sidebar";
import styles from './App.module.css';


export const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <Sidebar></Sidebar>
            <Content></Content>
        </div>
    )
}