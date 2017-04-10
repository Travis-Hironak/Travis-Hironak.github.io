function spoiler() {
  var button = document.activeElement;
  button.classList.toggle('active');
  button.nextElementSibling.classList.toggle('visible');
  var text = button.innerHTML;
  text = (text.indexOf('Afficher') >= 0) ? 
    text.replace('Afficher', 'Cacher') :
    text.replace('Cacher', 'Afficher');
  button.innerHTML = text;
}