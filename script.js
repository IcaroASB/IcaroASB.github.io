    const tabs = document.querySelectorAll('.collection-tab');
    const gallery = document.getElementById('gallery-images');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const form = document.getElementById('inquiry-form');
    const formArtTitle = document.getElementById('form-art-title');
    const description = document.getElementById('collection-description');
    let currentArtTitle = '';

    function setActiveTab(selectedTab) {
      tabs.forEach(tab => tab.classList.remove('active'));
      selectedTab.classList.add('active');
    }

    function loadCollection(collection) {
      fetch(`collections/${collection}.json`)
        .then(res => res.json())
        .then(data => {
          gallery.innerHTML = '';
          description.textContent = data.description || '';
          (data.artworks || data).forEach(art => {
            const div = document.createElement('div');
            div.className = 'art-piece';
            div.innerHTML = `
              <img src="images/${art.filename}" alt="${art.title}" onclick="openModal(event, '${art.filename}', '${art.title}')" />
              <p class="caption">"${art.title}" — ${art.status}</p>
            `;
            gallery.appendChild(div);
          });
        })
        .catch(err => {
          gallery.innerHTML = '<p style="color: red;">Error loading collection.</p>';
        });
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        setActiveTab(tab);
        loadCollection(tab.dataset.collection);
      });
    });

    function openModal(event, filename, title, status) {
      event.stopPropagation();
      modal.style.display = 'flex';

      modalImg.src = `images/${filename}`;
      formArtTitle.value = title;

      // Set the overlay title and status
      document.getElementById("modal-art-title").textContent = title || "";
      document.getElementById("modal-art-status").textContent = status || "";
    }

    function closeModal(event) {
      const modalContent = document.getElementById('modal-content');

      // Shrink safe zone by adding a buffer box slightly *larger* than modal-content
      const rect = modalContent.getBoundingClientRect();
      const buffer = 10; // pixels of tolerance

      const isInsideSafeZone = (
        event.clientX > rect.left - buffer &&
        event.clientX < rect.right + buffer &&
        event.clientY > rect.top - buffer &&
        event.clientY < rect.bottom + buffer
      );

      if (!isInsideSafeZone) {
        modal.style.display = 'none';
      }
    }

    function handleSubmit(event) {
      event.preventDefault();
      const form = event.target;

      setTimeout(() => {
        form.submit();                     // submit to hidden iframe
        modal.style.display = 'none';      // close zoom modal
        form.reset();                      // reset the form fields
        showToast();                       // show toast message
      }, 100);
    }

    function showToast() {
      const toast = document.getElementById('toast');
      toast.classList.add('show');

      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000); // Show for 4 secs
    }


    loadCollection('portraits');
