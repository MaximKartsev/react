import React from 'react';
import './App.css';
import Header from "./component/Header";
import NotePreviewList from "./component/NotePreviewList";
import {Explorer} from "./component/Explorer";

const App: React.FC = () => {
    return (
        <div className="wrapper">
            <Header/>
            <Explorer/>
            <NotePreviewList/>
        </div>
    )
}

export default App;