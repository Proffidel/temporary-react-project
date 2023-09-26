import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${id}`);
      const data = await response.json();
      const { drinks } = data;
      setCocktail(drinks);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {cocktail.map((item) => {
        const {
          idDrink,
          strAlcoholic,
          strDrink,
          strDrinkThumb,
          strGlass,
          strCategory,
          strInstructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
        } = item;
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
        ];
        if (idDrink === id) {
          return (
            <section className="section cocktail-section" key={idDrink}>
              <Link to="/" className="btn btn-primary">
                back to home
              </Link>
              <h2 className="section-title">{strDrink}</h2>
              <div className="drink">
                <img src={strDrinkThumb} alt={strDrink} />
                <div className="drink-info">
                  <p>
                    <span className="drink-data">name :</span>
                    {strDrink}
                  </p>
                  <p>
                    <span className="drink-data">category :</span>
                    {strCategory}
                  </p>
                  <p>
                    <span className="drink-data">info :</span>
                    {strAlcoholic}
                  </p>
                  <p>
                    <span className="drink-data">glass :</span>
                    {strGlass}
                  </p>
                  <p>
                    <span className="drink-data">instructions :</span>
                    {strInstructions}
                  </p>
                  <p>
                    <span className="drink-data">ingredients :</span>

                    {ingredients.map((item, index) => {
                      return item ? <span key={index}>{item},</span> : null;
                    })}
                  </p>
                </div>
              </div>
            </section>
          );
        }
      })}
    </div>
  );
};

export default SingleCocktail;
