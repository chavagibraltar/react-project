import SingleRecipe from '../recipes/singleRecipe';

export default function FilterCategory({ categoryId, recipes, duration, difficulty, userId }) {
    return (
        <>
            {
                recipes.map((r, i) => (!categoryId || r.CategoryId == categoryId)
                    &&
                    (!duration || r.Duration <= duration)
                    && (!difficulty || r.Difficulty == difficulty)
                    && (!userId || r.UserId == userId)
                    ?
                    <li key={r.Id}>
                        <SingleRecipe recipe={r} />
                    </li> : null)
            }
        </>
    )
}