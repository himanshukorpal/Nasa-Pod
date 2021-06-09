const resultsNav = document.getElementById('resultsNav')
const favoritesNav = document.getElementById('favoritesNav')
const imagesContainer = document.querySelector('.images-container')
const saveConfirmed = document.querySelector('.save-confirmed')
const loader = document.querySelector('.loader')



// NASA Api
const count = 10;
const apiKey = 'DEMO_KEY'
const apiUrl= `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = []

function updateDOM() {
    resultsArray.forEach((result) => {
      // Card Container
      const card = document.createElement('div');
      card.classList.add('card');
      //link
      const link = document.createElement('a');
      link.href = result.hdurl;
      link.title = "View Full Screen";
      link.target = '_blank';
      //Image
      const image = document.createElement('img');
      image.src = result.url;
      image.alt= 'Nasa picture Of The Day';
      // for lazy load to increase performance
      image.loading = 'lazy';
      image.classList.add('card-img-top');
      //Card-Body
      const cardBody= document.createElement('div');
      cardBody.classList.add('card-body');
      //Card title Heading
      const heading = document.createElement('h5');
      heading.classList.add('card-title')
      heading.textContent = result.title;
      // Add to favorites(SAVE text)
      const addfavorites = document.createElement('p');
      addfavorites.textContent = 'Add To Favorites';
      addfavorites.classList.add('clickable');
      // card textparagraph
      const para = document.createElement('p');
      para.classList.add('card-text');
      para.textContent = result.explanation

      //Footer Container
      const footer = document.createElement('small');
      footer.classList.add('text-muted');
      const date = document.createElement('strong');
      date.textContent = result.date;
      // Copyright
      const copyrightResult =  result.copyright === undefined ? '' : result.copyright
      const copyRight = document.createElement('span');
      copyRight.textContent = ` ${copyrightResult}`
      // Append in right order
      footer.append(date, copyRight);
      cardBody.append(heading, addfavorites, para, footer);
      link.appendChild(image);
      card.append(link, cardBody);
      imagesContainer.appendChild(card); 
  });
}



// Get 0 images from NASA API
async function getNasaPictures(){
  try {
   const response = await fetch(apiUrl); 
   resultsArray = await response.json();

   console.log(resultsArray);
   updateDOM();
  } catch (error) {

  }
}

// On Load
getNasaPictures();
