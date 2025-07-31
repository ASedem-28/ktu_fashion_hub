// TESTIMONIAL CAROUSEL LOGIC
const carousel = document.getElementById('testimonial-carousel');
if (carousel) {
    let currentIndex = 0;

    function updateCarousel() {
        const totalSlides = carousel.children.length;
        if (totalSlides > 0) {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }

    window.nextSlide = function() {
        const totalSlides = carousel.children.length;
        if (totalSlides > 0) {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }
    }

    window.prevSlide = function() {
        const totalSlides = carousel.children.length;
        if (totalSlides > 0) {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
    }

    // Auto-play feature
    setInterval(nextSlide, 7000); 
}


// NEWSLETTER FORM SUBMISSION
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const messageEl = document.getElementById('form-message');
      
      messageEl.textContent = "Subscribing...";
      messageEl.style.color = "#a0a0c0";

      // This is a dummy timeout to simulate network request.
      // Replace with your actual fetch logic if needed.
      setTimeout(() => {
        const isSuccess = Math.random() > 0.2; // Simulate success/failure
        if (isSuccess) {
            form.reset();
            messageEl.textContent = "Thanks for subscribing!";
            messageEl.style.color = "#90ee90";
        } else {
            messageEl.textContent = "Oops! Something went wrong.";
            messageEl.style.color = "#ff6666";
        }
      }, 1000);
    });
}


// GALLERY PAGE LOGIC (Filter + Modal)
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById("imageModal");
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');

                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    item.style.display = 'none'; // Hide all first
                    
                    if (category === 'all' || itemCategory === category || itemCategory === 'all') {
                        // Using a timeout to allow the display:none to render, then animate in
                        setTimeout(() => {
                           item.style.display = 'grid'; // Use grid for bento items
                        }, 10);
                    }
                });
            });
        });
    }

    // const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const closeBtn = document.querySelector(".close-btn");
    const downloadBtn = document.getElementById("downloadBtn");

    let modalIndex = 0;
    const itemsArray = Array.from(galleryItems);

    function updateModal(index) {
        const item = itemsArray[index];
        const imgElement = item.querySelector("img");
        const title = item.querySelector(".overlay h3")?.innerText || "Fashion Image";
        const desc = item.querySelector(".overlay p")?.innerText || "Captured by KTU Fashion Hub";

        if (imgElement) modalImg.src = imgElement.src;
        if (modalTitle) modalTitle.innerText = title;
        if (modalDesc) modalDesc.innerText = desc;
        if (downloadBtn && imgElement) downloadBtn.href = imgElement.src;
    }

    if (modal && itemsArray.length > 0) {
        itemsArray.forEach((item, index) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            modalIndex = index;
            updateModal(modalIndex);
            modal.style.display = "flex";
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
      });
    }

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
      }
    });

    window.addEventListener("keydown", (e) => {
      if (modal.style.display === "flex") {
        if (e.key === "Escape") {
          modal.style.display = "none";
          document.body.style.overflow = 'auto';
        } else if (e.key === "ArrowLeft") {
          modalIndex = (modalIndex - 1 + itemsArray.length) % itemsArray.length;
          updateModal(modalIndex);
        } else if (e.key === "ArrowRight") {
          modalIndex = (modalIndex + 1) % itemsArray.length;
          updateModal(modalIndex);
        }
      }
    });

    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        modalIndex = (modalIndex - 1 + itemsArray.length) % itemsArray.length;
        updateModal(modalIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        modalIndex = (modalIndex + 1) % itemsArray.length;
        updateModal(modalIndex);
      });
    }
  }
  
    // ================= HERO IMAGE SLIDER =================
    const hero = document.querySelector('.hero');
  
    // THIS IS THE FIX:
    // This code now checks for the 'heroImagePaths' variable from index.html.
    // The old, hard-coded list is completely removed from this file.
    if (hero && typeof heroImagePaths !== 'undefined' && heroImagePaths.length > 0) {
        let currIndex = 0;

        // Preload images for a smoother transition
        heroImagePaths.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        hero.style.backgroundImage = `url('${heroImagePaths[currIndex]}')`;

        setInterval(() => {
            currIndex = (currIndex + 1) % heroImagePaths.length;
            hero.style.backgroundImage = `url('${heroImagePaths[currIndex]}')`;
        }, 5000);
    }
});