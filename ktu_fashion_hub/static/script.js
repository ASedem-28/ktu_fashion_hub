document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================
    //                 RESPONSIVE NAVIGATION  
    // ==========================================================
    const menuIcon = document.getElementById('menu');
    const mainNav = document.querySelector('header .main-nav, .main-header .main-nav');

    if (menuIcon && mainNav) {
        menuIcon.addEventListener('click', () => {
            mainNav.classList.toggle('is-active');
        });

        document.addEventListener('click', (e) => {
            if (!menuIcon.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('is-active');
            }
        });
    }

    // ==========================================================
    //                      GLOBAL SEARCH 
    // ==========================================================
    const searchForms = document.querySelectorAll('.search-form');
    
    searchForms.forEach(form => {
        const searchInput = form.querySelector('input[type="search"]');
        const resultsContainer = form.querySelector('.search-results');

        if (!searchInput || !resultsContainer) return;

        // Function to show initial recommendation
        const showInitialRecommendations = async () => {
            try {
                const response = await fetch('/initial-search-recommendations/');
                const recommendations = await response.json();

                resultsContainer.innerHTML = ''; // Clear previous results
                if (recommendations.length > 0) {
                    // Add title to indicate these are recommendations
                    const title = document.createElement('div');
                    title.className = 'search-results-title';
                    title.textContent = 'Trending Searches';
                    resultsContainer.appendChild(title);

                    recommendations.forEach(rec => {
                        const link = document.createElement('a');
                        link.href = `/gallery/?q=${encodeURIComponent(rec)}`;
                        link.textContent = rec;
                        resultsContainer.appendChild(link);
                    });
                    resultsContainer.style.display = 'block';
                }
            } catch (error) {
                console.error('Initial recommendations fetch failed:', error);
            }
        };
        
        // Event listener for when the user clicks INTO the search bar
        searchInput.addEventListener('focus', () => {
            // Show recommendation if nothing is typed yet
            if (searchInput.value.trim().length === 0) {
                showInitialRecommendations();
            }
        });

        // Autocomplete listener
        searchInput.addEventListener('input', async (e) => {
            const term = e.target.value.trim();

            if (term.length < 2) {
                // If the user clears the search, show initial recommendations again
                if (term.length === 0) {
                    showInitialRecommendations();
                } else {
                    resultsContainer.style.display = 'none';
                }
                return;
            }

            try {
                const response = await fetch(`/search-suggestions/?term=${encodeURIComponent(term)}`);
                const suggestions = await response.json();
                
                resultsContainer.innerHTML = '';
                if (suggestions.length > 0) {
                    suggestions.forEach(suggestion => {
                        const link = document.createElement('a');
                        link.href = `/gallery/?q=${encodeURIComponent(suggestion)}`;
                        link.textContent = suggestion;
                        resultsContainer.appendChild(link);
                    });
                    resultsContainer.style.display = 'block';
                } else {
                    resultsContainer.style.display = 'none';
                }
            } catch (error) {
                console.error('Search suggestion fetch failed:', error);
                resultsContainer.style.display = 'none';
            }
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!form.contains(e.target)) {
                resultsContainer.style.display = 'none';
            }
        });

    });


    // ==========================================================
    //          TESTIMONIAL CAROUSEL for index.html
    // ==========================================================
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
        setInterval(nextSlide, 7000); 
    }


    // ==========================================================
    // AJAX NEWSLETTER FORM SUBMISSION for footer
    // ==========================================================
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const form = e.target;
            const data = new FormData(form);
            const messageEl = document.getElementById('form-message');
            const submitButton = form.querySelector('button[type="submit"]');

            messageEl.textContent = "Subscribing...";
            messageEl.style.color = "#a0a0c0";
            submitButton.disabled = true;

            fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    messageEl.textContent = "Thanks for subscribing!";
                    messageEl.style.color = "#90ee90"; // Green for success
                    form.reset();
                    submitButton.disabled = false;
                } else {
                    messageEl.innerHTML = "Oops! Something went wrong.";
                    messageEl.style.color = "#ff6666"; // Red for error
                    submitButton.disabled = false;
                }
            }).catch(error => {
                messageEl.innerHTML = "Oops! A network error occurred.";
                messageEl.style.color = "#ff6666";
                submitButton.disabled = false;
            });
        });
    }

    // ==========================================================
    // AJAX CONTACT FORM SUBMISSION
    // ==========================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default page reload
            
            const form = e.target;
            const data = new FormData(form);
            const statusDiv = document.getElementById('form-status');
            const submitButton = form.querySelector('button[type="submit"]');

            // Show a "sending" message
            statusDiv.innerHTML = "Sending...";
            statusDiv.className = 'form-status';
            statusDiv.style.display = 'block';
            submitButton.disabled = true;

            fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // Success!
                    statusDiv.innerHTML = "Thanks for your message! We'll get back to you shortly.";
                    statusDiv.classList.add('success');
                    form.reset();
                    submitButton.disabled = false;
                } else {
                    // Handle server errors
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            statusDiv.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            statusDiv.innerHTML = "Oops! There was a problem submitting your form.";
                        }
                        statusDiv.classList.add('error');
                        submitButton.disabled = false;
                    })
                }
            }).catch(error => {
                // Handle network errors
                statusDiv.innerHTML = "Oops! There was a network error. Please try again.";
                statusDiv.classList.add('error');
                submitButton.disabled = false;
            });
        });
    }

    // ==========================================================
    //            HERO IMAGE SLIDER for index.html
    // ==========================================================
    const hero = document.querySelector('.hero');
    if (hero && typeof heroImagePaths !== 'undefined' && heroImagePaths.length > 0) {
        let currIndex = 0;
        heroImagePaths.forEach(src => { (new Image()).src = src; });
        hero.style.backgroundImage = `url('${heroImagePaths[currIndex]}')`;
        setInterval(() => {
            currIndex = (currIndex + 1) % heroImagePaths.length;
            hero.style.backgroundImage = `url('${heroImagePaths[currIndex]}')`;
        }, 5000);
    }

    // ==========================================================
    //          GALLERY PAGE (Filter, Search, and Modal)
    // ==========================================================
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const searchInput = document.getElementById('search');
        const modal = document.getElementById("imageModal");

        // FILTER LOGIC 
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const activeCategory = btn.getAttribute('data-category');
                
                // When filtering, also clear the search input
                if (searchInput) searchInput.value = '';

                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (activeCategory === 'all' || itemCategory === activeCategory) {
                        item.style.display = 'grid';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // SEARCH LOGIC
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                
                // Deactivate any active filter button when searching
                filterButtons.forEach(b => b.classList.remove('active'));

                galleryItems.forEach(item => {
                    const title = item.getAttribute('data-title').toLowerCase();
                    const description = item.getAttribute('data-description').toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        item.style.display = 'grid';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }

        //  MODAL LOGIC FOR VIDEO/IMAGE
        const mediaContainer = document.getElementById("modalMediaContainer");
        const modalTitle = document.getElementById("modalTitle");
        const modalDesc = document.getElementById("modalDesc");
        const closeBtn = document.querySelector(".close-btn");
        const downloadBtn = document.getElementById("downloadBtn");
        
        let modalIndex = 0;
        const itemsArray = Array.from(galleryItems);

        function updateModal(index) {
            // Prevent function from running if the index is out of bounds
            if (index < 0 || index >= itemsArray.length) return;

            const item = itemsArray[index];
            modalIndex = index;

            // Get all necessary data from the clicked item's data attributes
            const mediaUrl = item.dataset.mediaUrl;
            const mediaType = item.dataset.mediaType;
            const title = item.dataset.title;
            const description = item.dataset.description;

            const content = modal.querySelector('.modal-content');

            // fading out the current content
            content.style.opacity = '0';
            content.style.transform = 'scale(0.98)';

            // fade-out animation to be visible
            setTimeout(() => {
                // update the content while it's invisible
                mediaContainer.innerHTML = ''; // Clear previous image/video

                if (mediaType === 'video') {
                    const video = document.createElement('video');
                    video.src = mediaUrl;
                    video.controls = true;
                    video.autoplay = true;
                    video.loop = false;
                    mediaContainer.appendChild(video);
                } else {
                    const img = document.createElement('img');
                    img.src = mediaUrl;
                    img.alt = title;
                    mediaContainer.appendChild(img);
                }

                modalTitle.innerText = title || "Fashion Piece";
                modalDesc.innerText = description || "by KTU Designer";
                downloadBtn.href = mediaUrl;

                // fade the new content back in
                content.style.opacity = '1.5';
                content.style.transform = 'scale(1)';

            }, 200); // This delay should be less than your CSS transition duration
        }

        if (modal && itemsArray.length > 0) {
            itemsArray.forEach((item, index) => {
                item.addEventListener("click", (e) => {
                    e.preventDefault();
                    modal.classList.add('is-visible');
                    document.body.style.overflow = 'hidden';
                    updateModal(index);
                });
            });

            const stopMedia = () => {
                modal.classList.remove('is-visible');
                document.body.style.overflow = 'auto';
                mediaContainer.innerHTML = ''; 
            };

            if (closeBtn) closeBtn.addEventListener("click", stopMedia);
            window.addEventListener("click", (e) => { if (e.target === modal) stopMedia(); });
            
            window.addEventListener("keydown", (e) => {
                if (modal.classList.contains('is-visible')) {
                    if (e.key === "ArrowLeft") {
                        const newIndex = (modalIndex - 1 + itemsArray.length) % itemsArray.length;
                        updateModal(newIndex);
                    } else if (e.key === "ArrowRight") {
                        const newIndex = (modalIndex + 1) % itemsArray.length;
                        updateModal(newIndex);
                    } else if (e.key === "Escape") {
                        stopMedia();
                    }
                }
            });

            // --- BUTTON NAVIGATION LOGIC ---
            const prevBtn = document.querySelector(".prev-btn");
            const nextBtn = document.querySelector(".next-btn");

            if (prevBtn) {
                prevBtn.addEventListener("click", () => {
                    const newIndex = (modalIndex - 1 + itemsArray.length) % itemsArray.length;
                    updateModal(newIndex);
                });
            }
            if (nextBtn) {
                nextBtn.addEventListener("click", () => {
                    const newIndex = (modalIndex + 1) % itemsArray.length;
                    updateModal(newIndex);
                });
            }
        }
    }
});