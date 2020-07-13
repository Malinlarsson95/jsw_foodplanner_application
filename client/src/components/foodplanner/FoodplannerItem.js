import React from 'react'

export default function FoodplannerItem(props) {
    return (
        <React.Fragment>
            <div className="mealOutput">{props.plan.meal}</div>
            <div className="iconsFoodplan">
                <i className="fas fa-edit" onClick={props.updateFoodplan} style={{ color: '#186720', margin: '0 10% 0 0', cursor: 'pointer' }}></i>
                <i className="fas fa-trash" onClick={props.deleteFoodplan} style={{ color: '#BC1B1B', cursor: 'pointer' }}></i>
            </div>
        </React.Fragment>
    )
}
