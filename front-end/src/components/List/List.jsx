import { Item } from "../Item/Item";
import styles from "./List.module.css";

export function List({ data, onDeleteItem }) {
  return (
    <ul className={styles.list}>
      {data.map(({ id, word, translation }) => (
        <Item
          key={id}
          id={id}
          word={word}
          translation={translation}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </ul>
  );
}
