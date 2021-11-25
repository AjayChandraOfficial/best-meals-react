import style from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasHttpError, setHasHttpError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://reactmealsdatabase-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      setIsLoading(false);
      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHasHttpError(error.message);
    });
  }, []);

  const loadingContent = (
    <section className={style.loading}>
      <h2>Loading...</h2>
    </section>
  );
  const errorContent = (
    <section className={style.error}>
      <h2>{hasHttpError}</h2>
    </section>
  );
  if (isLoading) {
    return loadingContent;
  }

  if (hasHttpError) {
    return errorContent;
  }
  const renderMealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    ></MealItem>
  ));

  return (
    <section className={style.meals}>
      <Card>
        <ul>{renderMealsList}</ul>
      </Card>
    </section>
  );
}
export default AvailableMeals;
