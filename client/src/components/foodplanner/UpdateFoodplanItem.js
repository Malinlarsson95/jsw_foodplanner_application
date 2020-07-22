import React, { useState } from "react";
import ReactDOM from 'react-dom';
import Axios from "axios";

export default function UpdateFoodplanItem(props) {
    const [addPlanInputText, setAddPlanText] = useState(props.plan.meal);

    function onChangeAddPlanText(event) {
        setAddPlanText(event.target.value);
    }
    function escapeBtn(event) {
        //prevents the page from reloading
        event.preventDefault();
        let content = '';
        ReactDOM.render(content, document.getElementById('updateContainer'));
    }
    function updateBtn() {
        const url = `api/meals/${props.plan._id}`;

        Axios.put(url, {
            meal: addPlanInputText
        }).then(
            (response) => {
                setAddPlanText('');
            }
        );
    }
    return (
        <div className="updateContent">
            <form className="updateContentForm" autoComplete="off">
                <input
                    type="text"
                    name="item"
                    placeholder="Skriv text..."
                    value={addPlanInputText}
                    onChange={onChangeAddPlanText}
                />
                <br />
                <button type="submit" onClick={updateBtn}>Uppdatera</button>
                <button type="reset" onClick={escapeBtn}>Avbryt</button>
            </form>
        </div>
    )
}
