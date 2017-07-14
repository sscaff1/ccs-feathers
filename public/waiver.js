const jwt = window.localStorage['feathers-jwt'];
const userService = client.service('users');
const dealService = client.service('deals');

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
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
      title: this.title.value,
      description: this.description.value,
    };
    dealService.create(data);
    this.reset();
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
      const dealsHTML = deals.data.map(getDealHTML).join('');
      dealDiv.innerHTML = dealsHTML;
      initCloseTags();
      initFormListener();
    }
  })
  .catch(err => console.log(err));
