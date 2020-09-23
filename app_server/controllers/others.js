/* About us page */

const about = (req, res) => {
  res.render('generic-text', {
    title: 'About Us',
    content: 'This is the about page of the show'
  });
};

/* Contact us page */
const contact = (req, res) => {
  res.render('generic-text', {
    title: 'Contact',
    content: 'To contact us...visit me in my place'
  });
};

module.exports = {
  about,
  contact
};