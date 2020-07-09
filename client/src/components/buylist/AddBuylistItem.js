import React from "react";

export default function AddBuylistItem(props) {

    return (
        <form onSubmit={props.onSubmitText} autoComplete="off">
            <input
                type="text"
                name="item"
                placeholder="Lägg till..."
                className="inputBuyItem"
                value={props.inputText}
                onChange={props.onChangeText}
            />
            <button
                type="submit"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0)', border: 'none', fontSize: '1.3em', cursor: 'pointer' }}>
                <i
                    className="fas fa-plus-circle btn"
                    style={{ color: '#186720' }}></i>
            </button>
        </form>
    )
}
