import React, { useState } from "react";
import Button from "../button/button";
import "./categories-bar.scss";

const CategoriesBar = ({ active, categories, onSelectCategory }) => {
  const [activeValue, setActiveValue] = useState(active);
  const onCategoryClick = (index) => {
    const item = categories[index];
    setActiveValue(index);
    if (onSelectCategory) {
      onSelectCategory(item.value);
    }
  };
  return (
    <div className="d-flex categories-bar">
      {categories.map((item, index) => (
        <div className="category-item" key={`category-item-${index}`}>
          <p className="fw-bolder text-nowrap mb-1">{item.title}</p>
          <Button
            color="outline"
            size="sm"
            className={
              "text-nowrap px-3" + (activeValue === index ? " active" : "")
            }
            onClick={onCategoryClick.bind(this, index)}
          >
            {item.button}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CategoriesBar;
