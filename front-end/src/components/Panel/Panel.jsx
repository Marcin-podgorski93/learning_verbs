import { useState, useEffect } from "react";
import { List } from "../List/List";
import { Form } from "../Form/Form";
import { FilterButton } from "../FilterButton/FilterButton";
import styles from "./Panel.module.css";

export function Panel() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/words")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      });
  }, []);

  function handleFormSubmit(formData) {
    fetch("http://localhost:3000/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        setData((prevData) => [...prevData, res]);
      });
  }

  function handleDeleteItem(id) {
    fetch(`http://localhost:3000/words/${id}`, {
      method: "DELETE",
    }).then(() => {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    });
  }

  function handleFilterButton(category) {
    console.log(category);
  }

  if (isLoading) {
    return <p>Ładowanie</p>;
  }

  return (
    <>
      <section className={styles.section}>
        <Form onFormSubmit={handleFormSubmit} />
        <div className={styles.filters}>
          <FilterButton>Wszystkie</FilterButton>
          <FilterButton onClick={() => handleFilterButton("noun")}>
            Rzeczowniki
          </FilterButton>
          <FilterButton>Czasowniki</FilterButton>
        </div>
        <List data={data} onDeleteItem={handleDeleteItem} />
      </section>
    </>
  );
}
