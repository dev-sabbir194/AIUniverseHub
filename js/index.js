const loadData = () =>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayData(data.data.tools));
}

const displayData = tools =>{
    console.log(tools);

    const cardContainer = document.getElementById('card-container');
tools.forEach((tools) => {
    console.log(tools)
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col');
    cardDiv.innerHTML = `
    
    <div class="card">
    <img src="${tools.image}" width="100%" height="100%" alt="...">
    <div class="card-body">
        <h3>Features</h3>
        <ol class="ps-3">
             <li style="display: ${tools.features[0] ? 'block' : 'none'  } " >${tools.features[0]}</li>
             <li style="display: ${tools.features[1] ? 'block' : 'none'  } " >${tools.features[1]}</li>
             <li style="display: ${tools.features[2] ? 'block' : 'none'  } " >${tools.features[2]}</li>
             <li style="display: ${tools.features[3] ? 'block' : 'none'  } " >${tools.features[3]}</li>
             <li style="display: ${tools.features[4] ? 'block' : 'none'  } " >${tools.features[4]}</li>
             <li style="display: ${tools.features[5] ? 'block' : 'none'  } " >${tools.features[5]}</li>
             <li style="display: ${tools.features[6] ? 'block' : 'none'  } " >${tools.features[6]}</li>
          </ol> 
        <hr>
        <div>
            <div class="d-flex justify-content-between">
              <div>
                <h3>${tools.name}</h3>
                <p class="card-text"><i class="fa-solid fa-calendar-days me-2"></i>${tools.published_in}</p>
              </div>
              <div class="mt-2" style="color: red">
              <i id="modalTrigger" class="fa-solid fa-arrow-right-long" data-bs-toggle="modal" data-bs-target="#modalDetails" data-id="01"></i>

              </div>
            </div>
          </div>
    </div>
  </div>
    `
    cardContainer.appendChild(cardDiv);
})






// see more button section

const cards = cardContainer.children;
for (let i = 6; i < cards.length; i++) {
  cards[i].style.display = 'none';
}
const seeMoreButton = document.getElementById('see-more-button');
seeMoreButton.addEventListener('click', function() {
  // Show all cards
  for (let i = 6; i < cards.length; i++) {
    cards[i].style.display = 'block';
  }
  seeMoreButton.style.display = 'none';
});
}


// see more button section end





// sort by date section

const sortButton = document.getElementById('sort-button');
sortButton.addEventListener('click', () => {
  sortByDate();
});

const sortByDate = () => {
  const visibleCards = document.querySelectorAll('.card:not([style*="display: none"])');
  const visibleCardCount = visibleCards.length;
  let sortLimit = visibleCardCount < 6 ? visibleCardCount : 6  ;

  const sortedCards = [...visibleCards].slice(0, sortLimit).sort((a, b) => {
    const dateA = new Date(a.querySelector('.card-text').textContent.slice(1));
    const dateB = new Date(b.querySelector('.card-text').textContent.slice(1));
    return dateB - dateA;
  });

  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  sortedCards.forEach((card) => {
    cardContainer.appendChild(card);
    
  });
};










// sort by date section end
















loadData();



const loadDetails = id => {
  let url = (`https://openapi.programming-hero.com/api/ai/tool/01`);
  fetch(url)
  .then(res => res.json())
  .then(data => cardDetails(data.data))
}

const cardDetails = card => {
  console.log(card)
  const modalBody = document.getElementById('modal-body');
  
  modalBody.innerHTML =`
  
  <div id="card-container" class="d-flex gap-4 "style="justify-content: center;" >
  <div class="card" style="width: 18rem; ">
  <div class="card-body">

    <p id="card-title" class="card-text">
    ${card.description}
    </p>
    <div class="d-flex gap-4" > 
    <div><p id="card-title" class="card-text" style="color:#BB1353  ">
    ${card.pricing[0].plan}
    </p></div>
    <div><p id="card-title" class="card-text" style="color:#33F0FF ">
    ${card.pricing[0].price}
    </p></div>
    <div><p id="card-title" class="card-text" style="color:#DA33FF ">
    ${card.pricing[1].price}
    </p></div>
    </div>
    
  </div>

  <div class="d-flex" style="justify-content: space-between;">
    <div>
      <h3>Features</h3>
      <ul>
        
        <li style="display: ${card.features[1].feature_name} ? 'block' : 'none'  } " >${card.features[1].feature_name}</li>
        <li style="display: ${card.features[2].feature_name} ? 'block' : 'none'  } " >${card.features[2].feature_name}</li>
        <li style="display: ${card.features[3].feature_name} ? 'block' : 'none'  } " >${card.features[3].feature_name}</li>
       
       
       
      </ul>
    </div>
    <div>
      <h3>Integrations</h3>
      <ul>
        <li style="display: ${card.integrations[1]} ? 'block' : 'none'  } " >${card.integrations[1]}</li>
        <li style="display: ${card.integrations[2]} ? 'block' : 'none'  } " >${card.integrations[2]}</li>
        
      </ul>
    </div>
  </div>

</div>


<div class="card" style="width: 18rem;">
  <img src="${card.image_link[1]}" class="card-img-top" alt="...">
  <div class="card-body">
    <h3 style="text-aling : center;">${card.input_output_examples[0].input}</h3>
    <p class="card-text">
    ${card.input_output_examples[0].output}
    </p>
  </div>
</div>

</div>

  `



}





loadDetails()












