function openModal(el) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  modal.style.display = 'flex';
  modalImg.src = el.querySelector('img').src;
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Load artworks from JSON
fetch('artworks.json')
  .then(res => res.json())
  .then(data => {
    const gallery = document.querySelector('.gallery');
    data.forEach(art => {
      const div = document.createElement('div');
      div.className = 'art-piece';
      div.onclick = () => openModal(div);
      div.innerHTML = `
        <img src="images/${art.filename}" alt="${art.title}" />
        <p class="caption">"${art.title}" — ${art.status}</p>
      `;
      gallery.appendChild(div);
    });
  })
  .catch(err => console.error('Error loading artwork:', err));

