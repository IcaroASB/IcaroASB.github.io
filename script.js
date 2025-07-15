function openModal(el) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  modal.style.display = 'flex';
  modalImg.src = el.querySelector('img').src;
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
