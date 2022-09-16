import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = function () {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState("");
  useEffect(() => {
    const fetchMeals = async () => {
      setHasError(false);
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://react-http-e5acb-default-rtdb.firebaseio.com/meals.json"
        );
        if (!res.ok) {
          throw new Error("No Meals Available");
        }
        const data = await res.json();
        const meals = Object.entries(data);

        const mealsData = meals.map(([id, details]) => ({ id, ...details }));
        setMeals(mealsData);
      } catch (err) {
        setHasError(err.message);
      }
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  const mealItems = meals.map((cur) => (
    <MealItem
      id={cur.id}
      key={cur.id}
      name={cur.name}
      description={cur.description}
      price={cur.price}
    />
  ));

  return (
    <section className="my-36 mx-6">
      {isLoading && (
        <p className="text-center text-white font-medium uppercase tracking-wider">
          loading...
        </p>
      )}
      {!isLoading && !hasError && (
        <Card style="animate-slideBot">
          <ul>{mealItems}</ul>
        </Card>
      )}

      {!isLoading && hasError && (
        <p className="text-center text-pink-800 font-medium tracking-wider">
          {hasError}!
        </p>
      )}
    </section>
  );
};

export default AvailableMeals;
