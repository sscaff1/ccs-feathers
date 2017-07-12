const client = feathers()
  .configure(feathers.hooks())
  .configure(feathers.rest('http://localhost:3000').fetch(fetch))
  .configure(feathers.authentication({ storage: window.localStorage }));

const users = client.service('users');

const getCookie = (name) => {
  const cookieName = name + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookie = decodedCookie.split(';');
  let returnCookie;
  cookie.forEach(c => {
    if (c.trim().indexOf(name) === 0) {
      returnCookie = c.split('=')[1];
    }
  });
  return returnCookie;
}
const jwt = getCookie('feathers-jwt');
client.authenticate(jwt)
  .then(() => {
    users.find().then(page => console.log('current users are ', page.data));
  });

