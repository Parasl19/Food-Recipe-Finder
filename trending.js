const mealResults = document.getElementById('meal-results');
const mealDetail = document.getElementById('meal-detail');
const loader = document.getElementById('loader');

window.addEventListener('DOMContentLoaded', loadTrendingMeals);

function loadTrendingMeals() {
  mealResults.innerHTML = '';
  mealDetail.innerHTML = '';
  loader.style.display = 'flex';

  const requests = [];
  for (let i = 0; i < 6; i++) {
    requests.push(fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json()));
  }

  Promise.all(requests)
    .then(results => {
      loader.style.display = 'none';
      const meals = results.map(r => r.meals[0]);
      mealResults.innerHTML = meals.map(meal => `
        <div class="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" onclick="loadMealDetail(${meal.idMeal})">
          <div class="meal-info">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea} • ${meal.strCategory}</p>
            <button onclick="toggleFavorite(event, ${meal.idMeal})">
              <i class="fas fa-heart"></i> Favorite
            </button>
          </div>
        </div>
      `).join('');
    })
    .catch(() => {
      loader.style.display = 'none';
      mealResults.innerHTML = '<p>Error loading trending meals.</p>';
    });
}
