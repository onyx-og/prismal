import { useMemo, useState } from "react";
import { Header, SearchBar, Tabs, List, Alert, Accordion, Text, useModal } from "@prismal/react";
import RecipeCard from "./components/RecipeCard";
import { recipes } from "./mock";
import type { Recipe, Category } from "./mock";

type CategoryFilter = "all" | Category;

const categories: Category[] = ["Breakfast", "Lunch", "Dinner", "Dessert"];

const RecipeLibrary = () => {
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
    const [search, setSearch] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const detailModal = useModal();

    const openRecipe = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        detailModal.open();
    };

    const filteredRecipes = useMemo(() => {
        return recipes
            .filter((r) => (categoryFilter === "all" ? true : r.category === categoryFilter))
            .filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));
    }, [categoryFilter, search]);

    return (
        <div className="example-recipe-library">
            <Header sticky navClass="recipe-library-nav">
                <span className="recipe-library-title">Recipe Library</span>
                <SearchBar accent="#ff921c" placeholder="Search recipes" onSearch={setSearch} />
            </Header>

            <Tabs
                accent="#ff921c"
                tabsClass="recipe-library-tabs"
                data={[
                    { name: "all", label: "All" },
                    ...categories.map((c) => ({ name: c, label: c })),
                ]}
                selected={categoryFilter}
                onChange={(name) => setCategoryFilter(name as CategoryFilter)}
            />

            {filteredRecipes.length ? (
                <List
                    className="recipe-library-grid"
                    type="process"
                    view="grid"
                    cols={3}
                    mdCols={2}
                    xsCols={1}
                    pageSize={6}
                    accent="#ff921c"
                    data={filteredRecipes}
                    listProcessor={(items) => ({
                        elements: items.map((recipe: Recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} onSelect={openRecipe} />
                        )),
                    })}
                />
            ) : (
                <Alert message="No recipes match your search." showClose={false} />
            )}

            <detailModal.Modal title={selectedRecipe?.title}>
                {selectedRecipe ? (
                    <div className="recipe-detail">
                        <Accordion defaultOpen header={<Text type="heading" level={5}>Ingredients</Text>}>
                            <ul className="recipe-detail-ingredients">
                                {selectedRecipe.ingredients.map((ingredient) => (
                                    <li key={ingredient}>{ingredient}</li>
                                ))}
                            </ul>
                        </Accordion>
                        <Accordion header={<Text type="heading" level={5}>Steps</Text>}>
                            <ol className="recipe-detail-steps">
                                {selectedRecipe.steps.map((step) => (
                                    <li key={step}>{step}</li>
                                ))}
                            </ol>
                        </Accordion>
                    </div>
                ) : null}
            </detailModal.Modal>
        </div>
    );
};

export default RecipeLibrary;
