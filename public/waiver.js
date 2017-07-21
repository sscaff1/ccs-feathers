const jwt = window.localStorage['feathers-jwt'];
const userService = client.service('users');
const dealService = client.service('deals');
const fileReader = new FileReader();

dealService.on('created', addDeal);
dealService.on('removed', removeDeal);

function initCloseTags() {
  const closeTags = document.querySelectorAll('.close');
  closeTags.forEach(tag => {
    tag.addEventListener('click', e => {
      e.preventDefault();
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this deal?'
      );
      if (confirmDelete) {
        dealService.remove(e.target.dataset.id);
      }
    });
  });
}

function initFormListener() {
  const form = document.getElementById('addDeal');
  const loading = document.querySelector('.loading');
  loading.classList.remove('hidden');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    fileReader.readAsArrayBuffer(this.photo.files[0]);
    fileReader.onload = () => {
      const data = {
        title: this.title.value,
        description: this.description.value,
        photo: fileReader.result,
      };
      dealService.create(data).then(() => loading.classList.add('hidden'));
      this.reset();
    };
  });
}

function addDeal(deal) {
  const dealDiv = document.getElementById('deals');
  const dealsHTML = getDealHTML(deal);
  dealDiv.innerHTML += dealsHTML;
  initCloseTags();
}

function removeDeal(deal) {
  const removed = document.querySelector(`a[data-id="${deal._id}"]`)
    .parentElement;
  const dealDiv = document.getElementById('deals');
  dealDiv.removeChild(removed);
}

function getDealHTML(deal) {
  return `
    <div class="deal">
      <h3>${deal.title}</h3>
      ${deal.photo ? `<img src="${deal.photo}" class="dealImg" />` : ''}
      <p>${deal.description}</p>
      <a href="#" class="close" data-id="${deal._id}">&times;</a>
    </div>
  `;
}

client
  .authenticate(jwt)
  .then(resp => client.passport.verifyJWT(resp.accessToken))
  .then(({ userId }) => userService.get(userId))
  .then(user => {
    if (user.isAdmin) {
      return dealService.find();
    }
    return null;
  })
  .then(deals => {
    if (deals) {
      const dealDiv = document.getElementById('deals');
      const hiddenDivs = document.querySelectorAll('.hidden');
      hiddenDivs.forEach(div => div.classList.remove('hidden'));
      const dealsHTML = deals.map(getDealHTML).join('');
      dealDiv.innerHTML = dealsHTML;
      initCloseTags();
      initFormListener();
    }
  })
  .catch(err => console.log(err));
