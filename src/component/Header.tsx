import React from 'react';
import '../App.css';
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {createModeAction} from "../store/actionCreators";

export const Header: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch()

    const createModeDispatch = React.useCallback(
        () => dispatch(createModeAction()),
        [dispatch]
    )

    return (
        <ul className="header">
            <li>
                <button onClick={createModeDispatch}>Create Note</button>
            </li>
        </ul>
    )
}

export default Header;
