import React, { useState, useEffect } from "react";
import Axios from "axios";
import BuylistItem from "./BuylistItem";
import AddBuylistItem from "./AddBuylistItem";

export default function Buylist() {
  let content = null;
  let url = "/api/buylist";

  //state for buylist items.
  const [buylist, setBuylist] = useState({
    buyItems: null
  });

  //State for text-input in addBuylistItem
  const [inputText, setText] = useState('');

  /*Makes GET call to api and gets the items in the buylist and saves to state.*/
  useEffect(() => {
    setBuylist({
      buyItems: null
    });
    Axios.get(url)
      .then((response) => {
        setBuylist({
          buyItems: response.data
        });
      })
      .catch(() => {
        setBuylist({
          buyItems: null
        });
      });
  }, [url]);

  //Loop through the list of buyitems and send as props to BuylistItem.js
  if (buylist.buyItems) {
    content = buylist.buyItems.map((buyItem) => (
      <BuylistItem
        buyItem={buyItem}
        key={buyItem._id}
        toggleChecked={() => toggleChecked(buyItem._id)}
        deleteBuyItem={() => deleteBuyItem(buyItem._id)}
      />
    ));
  }

  /*If checked button is clicked on an item in buylist
  Maps the state of buyItems to check for item with the same _id, updates the 
  state on that item so the checked-attribut toggles. 
  Check if checked is true or false and then sends put-request to API to update the datebase aswell.
  */
  function toggleChecked(_id) {
    let url = `/api/buylist/${_id}`;
    setBuylist({
      buyItems: buylist.buyItems.map((buyItem) => {
        if (buyItem._id === _id) {
          buyItem.checked = !buyItem.checked;

          if (buyItem.checked === true) {
            putRequestAxios(url, buyItem.item, true);
          }
          if (buyItem.checked === false) {
            putRequestAxios(url, buyItem.item, false);
          }
        }
        return buyItem;
      }),
    });
  }

  /*Delete an item from list by id*/
  function deleteBuyItem(_id) {
    let url = `/api/buylist/${_id}`;

    const newBuylist = buylist.buyItems;
    let i = 0;

    Axios.delete(url).then(
      (response) => {
        //If delete-request suceeded update state.
        for (i; i < newBuylist.length; i++) {
          if (newBuylist[i]._id === _id) {
            newBuylist.splice(i, 1);
            setBuylist({
              buyItems: newBuylist
            });
          }
        }
      },
      (error) => { }
    );
  }

  //Function to send put-request to API with Axio. Changes checked(boolean)
  function putRequestAxios(url, item, bool) {
    Axios.put(url, {
      item: item,
      checked: bool,
    }).then(
      (response) => { },
      (error) => { }
    );
  }

  //When form is submitted
  const addItem = event => {
    //prevents the page from reloading
    event.preventDefault();

    let url = `/api/buylist`;

    const newBuylist = buylist.buyItems;

    Axios.post(url, {
      item: inputText,
      checked: false,
    }).then(
      (response) => {
        //setBuylist({ buyItem: [...buylist.buyItems, response.data] });
        newBuylist.push(response.data);
        setBuylist({
          buyItems: newBuylist
        });
      }
    );

    setText('');
  }

  /*funktion to update the state for text input when input-field is changed*/
  const handleChange = event => setText(event.target.value);

  return (
    <div className="buylist">
      <h2>Inköpslista</h2>
      <ul style={{ margin: '3% 0 0 0' }}>{content}</ul>
      <AddBuylistItem inputText={inputText} onChangeText={handleChange} onSubmitText={addItem} />
    </div>
  );
}
