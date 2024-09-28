const key = '8BLrElfFE7eiS0YvkHGFnDLGMGDA58J7ZIVRy-qwT5Q';

const form = document.querySelector('.search-form')
const searchInput = document.querySelector('.search__input');
const gallery = document.querySelector('.gallery');
const showMoreBtn = document.querySelector('.show-more-btn');
let page = 1;
let query = '';

searchInput.focus();
async function fetchData() {
  try {
    if(page === 1) {
      gallery.innerHTML = '';
    }
    query = searchInput.value || 'all';
    const res = await fetch(`https://api.unsplash.com/search/photos?client_id=${key}&page=${page}&query=${query}&per_page=12`);
    let parseData = await res.json();
    let data = parseData.results;
    if(!data.length) {
      gallery.innerHTML = 'No data...';
      gallery.style.height = '80vh';
      showMoreBtn.style.display = 'none';
    }

    data.map((result) => {
      const img = document.createElement('img');
      img.src = result.urls.small;
      const imgLink = document.createElement('a');
      imgLink.href = result.links.html;
      imgLink.target = '_blank'

      imgLink.append(img);
      gallery.append(imgLink);
      gallery.style.height = '';
    }) 
    if(data.length) showMoreBtn.style.display = 'block'; 
  } catch(err) {
    console.log('error' + err)
  }
}

if(!query) {
  fetchData();
}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  page = 1;
  fetchData();
})

showMoreBtn.addEventListener('click', () => {
  page++;
  fetchData();
})