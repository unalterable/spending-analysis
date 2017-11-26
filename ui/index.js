import axios from 'axios'

const canvass = document.getElementById('canvass');

canvass.innerHTML = 'Initial Data'

axios.get('http://localhost:3000/data').then(({ data }) => {
  canvass.innerHTML = JSON.stringify(data);
})
