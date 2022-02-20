const inputsCheckbox = document.querySelectorAll('.container-custom-checkbox input'),
      ingredients = document.querySelectorAll('.current-pizza-item'),
      totalAmount = document.querySelector('.total-amount>.summa'),
      orderBtn = document.querySelector('.typical-btn'),
      modalWindow = document.querySelector('.modal-window'),
      submitBtn = document.querySelector('.modal-window__submit-btn');

const subject = document.querySelector('.modal-window__subject'),
      ingredientsSpan = document.querySelector('.modal-window__ingredients');


// Добавление ингридиентов в пиццу

const addIngredients = checkboxes => {
    const nodesArray = [...checkboxes];
    const ingredientsArray = [...ingredients];
    ingredientsArray.splice(0, 2);   // удаление основы и теста

    for(let node of checkboxes) {
        node.addEventListener('click', event => {            
            event.target.parentNode.classList.toggle('active'); // если есть,то убрать / добавить active
            const index = nodesArray.indexOf(event.target);
            ingredientsArray[index].classList.toggle('active'); // добавляем по индексу из массива
            calculateOrder();
        })
    }
}
addIngredients(inputsCheckbox);

// Вычисление заказа

const calculateOrder = () => {
    const ingredients = document.querySelectorAll('.container-custom-checkbox.active');
    
    const startPrice = 9.00, // цена за основу и тесто 
          ingredientsPrice = +(ingredients.length * 0.95).toFixed(2); // цена за ингридиенты

    totalAmount.innerHTML = `${startPrice + ingredientsPrice}Br.`;  // отображение цены 
} 

// Модальное окно для заказа


window.addEventListener('click', event => {
    if(event.target === modalWindow) {
        modalWindow.classList.add('none'); // убрать модалку
    }
});

submitBtn.addEventListener('click', () => {
    modalWindow.classList.add('none');
});

const prepareWindowModal = () => {
    subject.innerHTML = '';
    ingredientsSpan.innerHTML = '';

    const addedIngredients = document.querySelectorAll('.container-custom-checkbox.active');
    let ingredientsList = []; // список ингредиентов
    if(addedIngredients) {
        for(let ingredient of addedIngredients) {
            ingredientsList.push(ingredient.innerText); // добавляем список в модальное окно 
        }
    }        
    
    const totalIngredients = ingredientsList.join(', ') || 'Нет ингредиентов';
    const totalText = `Вы заказали пиццу, с ингредиентами: '${totalIngredients}'. К оплате ${totalAmount.innerHTML}`;

    subject.innerHTML = totalText;
}   

orderBtn.addEventListener('click', () => {
    modalWindow.classList.remove('none'); // добавить модалку!!
    prepareWindowModal();
});





















































