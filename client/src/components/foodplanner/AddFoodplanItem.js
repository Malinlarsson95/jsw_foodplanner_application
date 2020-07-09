import React, { useState } from "react";
import Axios from "axios";

export default function AddFoodplanItem(props) {
    //State for text-input in AddFoodplanItem
    const [addPlanInputText, setAddPlanText] = useState('');

    function onChangeAddPlanText(e) {
        setAddPlanText(e.target.value);
    }
    function onSubmitText() {
        const url = "api/meals";

        Axios.post(url, {
            meal: addPlanInputText,
            weekday: props.weekday,
        }).then(
            (response) => {
                setAddPlanText('');
            }
        );
    }

    return (
        <form autoComplete="off">
            <input
                type="text"
                name="item"
                placeholder="Lägg till maträtt..."
                className="inputFoodplan"
                value={addPlanInputText}
                onChange={onChangeAddPlanText}
            />
            <button
                onClick={onSubmitText}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0)', border: 'none', fontSize: '1.3em', cursor: 'pointer' }}>
                <i
                    className="fas fa-plus-circle btn"
                    style={{ color: '#186720' }}
                ></i></button>
        </form>
    )
}
