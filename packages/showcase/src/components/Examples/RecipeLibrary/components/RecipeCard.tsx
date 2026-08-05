import { Card, Icon, Text, Chip } from "@prismal/react";
import type { Recipe } from "../mock";

interface RecipeCardProps {
    recipe: Recipe;
    onSelect: (recipe: Recipe) => void;
}

const RecipeCard = (props: RecipeCardProps) => {
    const { recipe, onSelect } = props;

    return (
        <div className="recipe-card-clickable" onClick={() => onSelect(recipe)}>
            <Card
                elevation={1}
                padding="m"
                bodyClass="recipe-card-body"
                header={
                    <div className="recipe-card-photo" style={{ backgroundColor: recipe.accent }}>
                        <Icon name={recipe.icon} />
                    </div>
                }
            >
                <Chip className="recipe-card-category" type="text" accent="#ff921c" label={recipe.category} />
                <Text type="heading" level={4} className="recipe-card-title">{recipe.title}</Text>
                <span className="recipe-card-meta">{recipe.minutes} min &middot; {recipe.difficulty}</span>
            </Card>
        </div>
    );
};

export default RecipeCard;
