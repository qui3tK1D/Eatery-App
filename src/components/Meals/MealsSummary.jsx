import React from "react";
import mealImg from "../../assets/hero-image.jpg";

const MealsSummary = function () {
  return (
    <section className="relative mt-12 md:mt-0">
      <div>
        <img src={mealImg} alt="meal plate" className="w-full object-cover" />
      </div>
      <div className="summary-content">
        <h2 className="text-xl md:text-2xl font-medium mb-4">
          Delicious Food, Delivered To You
        </h2>
        <p>
          Choose your favorite meal from our broad selection of available meals
          and enjoy a delicious lunch or dinner at home.
        </p>
        <p>
          All our meals are cooked with high-quality ingredients, just-in-time
          and of course by experienced chefs!
        </p>
      </div>
    </section>
  );
};

export default MealsSummary;
