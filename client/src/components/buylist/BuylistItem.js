import React from "react";

export default function BuylistItem(props) {
  //Style, line-through text if item is checked
  function getStyle() {
    return {
      //Checks if an item is checked or not. Line-through text if checked.
      textDecoration: props.buyItem.checked ? "line-through" : "none",
    };
  }

  return (
    <React.Fragment>
      <li style={getStyle()} className="buylistLi">
        {props.buyItem.item}
      </li >
      <div className="iconsBuylist">
        <i
          className="fas fa-check-circle"
          onClick={props.toggleChecked}
          style={{
            color: '#186720',
            margin: '0 10% 0 0',
            cursor: 'pointer'
          }}></i>
        <i
          className="fas fa-trash"
          onClick={props.deleteBuyItem}
          style={{ color: '#BC1B1B', cursor: 'pointer' }}></i>
      </div>
    </React.Fragment>
  );
}
