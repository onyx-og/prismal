export type Category = "Breakfast" | "Lunch" | "Dinner" | "Dessert";
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Recipe {
    id: string;
    title: string;
    category: Category;
    minutes: number;
    difficulty: Difficulty;
    icon: string;
    accent: string;
    ingredients: string[];
    steps: string[];
}

export const recipes: Recipe[] = [
    {
        id: "recipe-1",
        title: "Overnight Oats with Berries",
        category: "Breakfast",
        minutes: 10,
        difficulty: "Easy",
        icon: "coffee",
        accent: "#e08a2b",
        ingredients: ["1/2 cup rolled oats", "1/2 cup milk", "1 tbsp chia seeds", "1/2 cup mixed berries", "1 tsp honey"],
        steps: ["Combine oats, milk and chia seeds in a jar.", "Stir in honey.", "Refrigerate overnight.", "Top with berries before serving."],
    },
    {
        id: "recipe-2",
        title: "Fluffy Buttermilk Pancakes",
        category: "Breakfast",
        minutes: 25,
        difficulty: "Medium",
        icon: "cutlery",
        accent: "#e08a2b",
        ingredients: ["1 1/2 cups flour", "1 cup buttermilk", "2 eggs", "2 tbsp sugar", "1 tsp baking soda"],
        steps: ["Whisk dry ingredients together.", "Whisk in buttermilk and eggs.", "Cook 1/4 cup batter per pancake on a hot griddle.", "Flip once bubbles form, cook until golden."],
    },
    {
        id: "recipe-3",
        title: "Grilled Chicken Caesar Salad",
        category: "Lunch",
        minutes: 20,
        difficulty: "Easy",
        icon: "leaf",
        accent: "#3f8f4f",
        ingredients: ["1 grilled chicken breast", "2 cups romaine lettuce", "1/4 cup parmesan", "1/2 cup croutons", "Caesar dressing"],
        steps: ["Slice grilled chicken.", "Toss lettuce with dressing.", "Top with chicken, parmesan and croutons."],
    },
    {
        id: "recipe-4",
        title: "Roasted Veggie Wrap",
        category: "Lunch",
        minutes: 30,
        difficulty: "Easy",
        icon: "leaf",
        accent: "#3f8f4f",
        ingredients: ["1 tortilla wrap", "1 cup roasted vegetables", "2 tbsp hummus", "Handful of spinach"],
        steps: ["Roast vegetables at 200°C for 20 minutes.", "Spread hummus on the wrap.", "Layer spinach and roasted vegetables.", "Roll tightly and slice in half."],
    },
    {
        id: "recipe-5",
        title: "Weeknight Beef Stir Fry",
        category: "Dinner",
        minutes: 35,
        difficulty: "Medium",
        icon: "fire",
        accent: "#b3432b",
        ingredients: ["300g beef strips", "2 cups mixed vegetables", "3 tbsp soy sauce", "1 tbsp sesame oil", "2 cloves garlic"],
        steps: ["Sear beef strips in a hot wok.", "Add garlic and vegetables.", "Stir in soy sauce and sesame oil.", "Cook until vegetables are tender-crisp."],
    },
    {
        id: "recipe-6",
        title: "Baked Salmon with Lemon",
        category: "Dinner",
        minutes: 40,
        difficulty: "Medium",
        icon: "fire",
        accent: "#b3432b",
        ingredients: ["2 salmon fillets", "1 lemon", "2 tbsp olive oil", "Fresh dill", "Salt and pepper"],
        steps: ["Preheat oven to 200°C.", "Place salmon on a lined tray, drizzle with oil.", "Top with lemon slices and dill.", "Bake for 15-18 minutes."],
    },
    {
        id: "recipe-7",
        title: "Slow-Cooked Vegetable Curry",
        category: "Dinner",
        minutes: 90,
        difficulty: "Hard",
        icon: "fire",
        accent: "#b3432b",
        ingredients: ["2 cups mixed vegetables", "1 can coconut milk", "2 tbsp curry paste", "1 onion", "Steamed rice"],
        steps: ["Sauté onion until soft.", "Stir in curry paste.", "Add vegetables and coconut milk.", "Simmer for 60 minutes, serve over rice."],
    },
    {
        id: "recipe-8",
        title: "Classic Chocolate Chip Cookies",
        category: "Dessert",
        minutes: 45,
        difficulty: "Medium",
        icon: "birthday-cake",
        accent: "#8a5fb3",
        ingredients: ["2 1/4 cups flour", "1 cup butter", "3/4 cup brown sugar", "2 cups chocolate chips", "1 tsp vanilla"],
        steps: ["Cream butter and sugar.", "Mix in flour and vanilla.", "Fold in chocolate chips.", "Bake at 190°C for 10-12 minutes."],
    },
    {
        id: "recipe-9",
        title: "No-Bake Cheesecake Cups",
        category: "Dessert",
        minutes: 20,
        difficulty: "Easy",
        icon: "birthday-cake",
        accent: "#8a5fb3",
        ingredients: ["1 cup cream cheese", "1/2 cup whipped cream", "1/4 cup sugar", "Crushed biscuits", "Berry compote"],
        steps: ["Beat cream cheese and sugar until smooth.", "Fold in whipped cream.", "Layer crushed biscuits and cream cheese mix in cups.", "Chill for 2 hours, top with compote."],
    },
];
