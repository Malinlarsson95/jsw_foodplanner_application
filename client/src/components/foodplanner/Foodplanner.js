import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Axios from "axios";
import FoodplannerItem from './FoodplannerItem';
import AddFoodplanItem from './AddFoodplanItem';
import UpdateFoodplanItem from './UpdateFoodplanItem';

export default function Foodplanner() {
  const url = "/api/meals";

  //state for foodplan
  const [foodplan, setFoodplan] = useState({
    plans: null
  });

  useEffect(() => {
    setFoodplan({
      plans: null
    });
    Axios.get(url)
      .then((response) => {
        setFoodplan({
          plans: response.data
        });
      })
      .catch(() => {
        setFoodplan({
          plans: null
        });
      });
  }, [url]);

  function deleteFoodplan(_id) {
    let url = `/api/meals/${_id}`;

    //saves state to new array
    const newFoodplan = foodplan.plans;
    let i = 0;

    console.log('delete');

    Axios.delete(url).then(
      (response) => {
        //If delete-request suceeded update state.
        for (i; i < newFoodplan.length; i++) {
          if (newFoodplan[i]._id === _id) {
            newFoodplan.splice(i, 1);
            setFoodplan({
              plans: newFoodplan
            });
          }
        }
      },
      (error) => { }
    );

  }

  function updateFoodplan(_id) {
    let content = null;

    foodplan.plans.map((plan) => {
      if (plan._id === _id) {
        content = <UpdateFoodplanItem
          plan={plan}
          key={plan._id}
        />
      }
      return content;
    });

    ReactDOM.render(content, document.getElementById('updateContainer'));
  }


  /*Funktion to check if a meal exist on specific weekday.
  If a meal exist it send that object as prop to FoodplannerItem,
  if else it send the weekday as a prop to AddFoodPlanItem*/
  function writeWeekday(weekday) {
    let output = null;
    if (foodplan.plans) {
      foodplan.plans.map((plan) => {
        if (plan.weekday === weekday) {
          output = <FoodplannerItem
            plan={plan}
            key={plan._id}
            deleteFoodplan={() => deleteFoodplan(plan._id)}
            updateFoodplan={() => updateFoodplan(plan._id)}
          />
        }
        return output;
      });
    }
    if (output === null) {
      output = <AddFoodplanItem key={weekday} weekday={weekday} />;
    }

    return output;
  }

  return (
    <div className="weeklyFoodPlan">
      <h2>Veckans matsedel</h2>
      <div className="foodplan">
        <h3>Måndag</h3>
        {writeWeekday('monday')}
      </div>
      <div className="foodplan">
        <h3>Tisdag</h3>
        {writeWeekday('tuesday')}
      </div>
      <div className="foodplan">
        <h3>Onsdag</h3>
        {writeWeekday('wednesday')}
      </div>
      <div className="foodplan">
        <h3>Torsdag</h3>
        {writeWeekday('thursday')}
      </div>
      <div className="foodplan">
        <h3>Fredag</h3>
        {writeWeekday('friday')}
      </div>
      <div className="foodplan">
        <h3>Lördag</h3>
        {writeWeekday('saturday')}
      </div>
      <div className="foodplan">
        <h3>Söndag</h3>
        {writeWeekday('sunday')}
      </div>
    </div>
  );
}