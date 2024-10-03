
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal__close');
const modalOverlay = document.querySelector('.modal__overlay');
const body = document.querySelector('body');

let modalOpened = false; 
let mouseIdle = false; 
let idleTimer; 
let openedByIdle = false; 
let openedByScroll = false;

function openModal() {
  if (!modalOpened) {
    modal.classList.add('modal--active');
    body.classList.add('no-scroll');
    modalOpened = true; 
  }
}

function closeModal() {
  modal.classList.remove('modal--active');
  body.classList.remove('no-scroll');
  modalOpened = false; 
}

closeModalButton.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

function startIdleTimer() {
  idleTimer = setTimeout(() => {
    if (!modalOpened && !openedByIdle) {
      openModal(); 
      openedByIdle = true; 
    }
  }, 5000);
}

function resetIdleTimer() {
  clearTimeout(idleTimer);
  mouseIdle = false; 
  startIdleTimer(); 
}

window.addEventListener('mousemove', () => {
  resetIdleTimer(); 
});

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.body.offsetHeight;
  if (scrollTop + viewportHeight >= documentHeight) {
    if (!modalOpened && !openedByScroll) {
      openModal();
      openedByScroll = true; 
    }
  }
});

startIdleTimer();

var forms = document.querySelectorAll('.form');
forms.forEach(function(form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    var formData = new FormData(this);
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })

    .then(response => {
      if (!response.ok) {
        throw new Error("Ошибка отправки данных: " + response.status);
      }
      return response.json();
    })

    .then(data => {
      alert("Данные успешно отправлены!"); 
      console.log(data);
      this.reset();
    })

    .catch(error => {
      alert("Ошибка отправки данных: " + error.message);
      console.error(error);
    });

  });
});
