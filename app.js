// js/app.js
document.addEventListener('DOMContentLoaded', () => {
    const getUrlParams = () => new URLSearchParams(window.location.search);
    const params = getUrlParams();

    // --- Helper Functions ---
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA'); // YYYY-MM-DD for consistency with input type="date"
    }


    // --- Simulated Backend Data (Based on your SQL INSERTs) ---
    const MOCK_USERS = [
        { UserID: 1, Name: 'Ahmed El-Sayed', Email: 'ahmed@example.com', Password: 'hashed_pass1', Role: 'customer', RewardPoints: 150 },
        { UserID: 2, Name: 'Mona Hassan', Email: 'mona@example.com', Password: 'hashed_pass2', Role: 'customer', RewardPoints: 50 },
        { UserID: 3, Name: 'Khaled Nasser', Email: 'khaled@example.com', Password: 'hashed_pass3', Role: 'customer', RewardPoints: 75 },
        { UserID: 4, Name: 'Sara Adel', Email: 'sara@example.com', Password: 'hashed_pass4', Role: 'customer', RewardPoints: 120 },
        { UserID: 5, Name: 'Youssef Fahmy', Email: 'youssef@example.com', Password: 'hashed_pass5', Role: 'customer', RewardPoints: 200 },
        { UserID: 6, Name: 'Admin User', Email: 'admin@example.com', Password: 'hashed_pass6', Role: 'admin', RewardPoints: 0 }
    ];

    const MOCK_CAR_CATEGORIES = [
        { CategoryID: 1, CategoryName: 'Sedan', Description: 'Comfortable cars suitable for city driving' },
        { CategoryID: 2, CategoryName: 'SUV', Description: 'Spacious vehicles for families and rough terrain' },
        { CategoryID: 3, CategoryName: 'Convertible', Description: 'Cars with a retractable roof for leisure drives' },
        { CategoryID: 4, CategoryName: 'Hatchback', Description: 'Compact cars ideal for city parking' },
        { CategoryID: 5, CategoryName: 'Pickup', Description: 'Vehicles suitable for carrying goods' },
        { CategoryID: 6, CategoryName: 'Luxury', Description: 'High-end cars with premium features' }
    ];

    const MOCK_CARS_DB = [
        // CarID, Model, Brand, Year, Status, PricePerDay, CategoryID, 
        // Added for features: FuelType, SeatingCapacity, TransmissionType, IsEcoFriendly, EcoDiscountPercentage, ImageURL
        { CarID: 1, Model: 'Civic', Brand: 'Honda', Year: 2018, Status: 'available', PricePerDay: 350, CategoryID: 1, FuelType: 'petrol', SeatingCapacity: 5, TransmissionType: 'automatic', IsEcoFriendly: false, EcoDiscountPercentage: 0, ImageURL: 'images/honda-civic.jpg' },
        { CarID: 2, Model: 'Corolla', Brand: 'Toyota', Year: 2019, Status: 'available', PricePerDay: 300, CategoryID: 1, FuelType: 'petrol', SeatingCapacity: 5, TransmissionType: 'automatic', IsEcoFriendly: false, EcoDiscountPercentage: 0, ImageURL: 'images/Toyota Camry.jpeg' },
        { CarID: 3, Model: 'X5', Brand: 'BMW', Year: 2020, Status: 'rented', PricePerDay: 800, CategoryID: 2, FuelType: 'diesel', SeatingCapacity: 5, TransmissionType: 'automatic', IsEcoFriendly: true, EcoDiscountPercentage: 0.10, ImageURL: 'images/bmw.jpeg' },
        { CarID: 4, Model: 'Range Rover', Brand: 'Land Rover', Year: 2017, Status: 'maintenance', PricePerDay: 900, CategoryID: 2, FuelType: 'diesel', SeatingCapacity: 7, TransmissionType: 'automatic', IsEcoFriendly: false, EcoDiscountPercentage: 0, ImageURL: 'images/range-rover.jpg' },
        { CarID: 5, Model: 'Mazda MX-5', Brand: 'Mazda', Year: 2021, Status: 'available', PricePerDay: 600, CategoryID: 3, FuelType: 'petrol', SeatingCapacity: 2, TransmissionType: 'manual', IsEcoFriendly: false, EcoDiscountPercentage: 0, ImageURL: 'images/mazda-mx5.jpg' },
        { CarID: 6, Model: 'Hilux', Brand: 'Toyota', Year: 2018, Status: 'available', PricePerDay: 400, CategoryID: 5, FuelType: 'diesel', SeatingCapacity: 5, TransmissionType: 'manual', IsEcoFriendly: false, EcoDiscountPercentage: 0, ImageURL: 'images/toyota-hilux.jpg' },
        { CarID: 7, Model: 'Model S', Brand: 'Tesla', Year: 2022, Status: 'available', PricePerDay: 700, CategoryID: 6, FuelType: 'electric', SeatingCapacity: 5, TransmissionType: 'automatic', IsEcoFriendly: true, EcoDiscountPercentage: 0.15, ImageURL: 'images/tesla-model-s.jpg' }
    ];

    const MOCK_RENTALS_DB = [
        { RentalID: 1, UserID: 1, CarID: 3, RentalStartDate: '2025-05-01', RentalEndDate: '2025-05-05', TotalPrice: 4000, Status: 'active', DeliveryFee: 0, DeliveryAddress: null, PickupLocationNotes: 'Downtown Branch' },
        { RentalID: 2, UserID: 2, CarID: 2, RentalStartDate: '2025-04-15', RentalEndDate: '2025-04-18', TotalPrice: 900, Status: 'completed', DeliveryFee: 25, DeliveryAddress: '123 User St, Anytown', PickupLocationNotes: null },
        { RentalID: 3, UserID: 3, CarID: 1, RentalStartDate: '2025-04-20', RentalEndDate: '2025-04-22', TotalPrice: 700, Status: 'completed', DeliveryFee: 0, DeliveryAddress: null, PickupLocationNotes: 'Airport Kiosk' },
        { RentalID: 4, UserID: 4, CarID: 6, RentalStartDate: '2025-05-10', RentalEndDate: '2025-05-12', TotalPrice: 800, Status: 'active', DeliveryFee: 0, DeliveryAddress: null, PickupLocationNotes: null },
        { RentalID: 5, UserID: 5, CarID: 5, RentalStartDate: '2025-04-28', RentalEndDate: '2025-05-01', TotalPrice: 1800, Status: 'completed', DeliveryFee: 0, DeliveryAddress: null, PickupLocationNotes: null },
        { RentalID: 6, UserID: 1, CarID: 4, RentalStartDate: '2025-03-10', RentalEndDate: '2025-03-12', TotalPrice: 1800, Status: 'canceled', DeliveryFee: 0, DeliveryAddress: null, PickupLocationNotes: null }
    ];
    
    const MOCK_PAYMENTS_DB = [
        { PaymentID: 1, RentalID: 1, PaymentDate: '2025-05-01 10:00:00', Amount: 4000, PaymentMethod: 'Credit Card', PaymentStatus: 'paid' },
        { PaymentID: 2, RentalID: 2, PaymentDate: '2025-04-15 09:30:00', Amount: 900, PaymentMethod: 'Cash', PaymentStatus: 'paid' },
        { PaymentID: 3, RentalID: 3, PaymentDate: '2025-04-20 11:00:00', Amount: 700, PaymentMethod: 'Credit Card', PaymentStatus: 'paid' },
        { PaymentID: 4, RentalID: 4, PaymentDate: '2025-05-10 12:00:00', Amount: 800, PaymentMethod: 'Bank Transfer', PaymentStatus: 'pending' },
        { PaymentID: 5, RentalID: 5, PaymentDate: '2025-04-28 14:00:00', Amount: 1800, PaymentMethod: 'Credit Card', PaymentStatus: 'paid' },
        { PaymentID: 6, RentalID: 6, PaymentDate: '2025-03-10 08:00:00', Amount: 1800, PaymentMethod: 'Cash', PaymentStatus: 'canceled' } 
    ];

    const MOCK_REVIEWS_DB = [
        { ReviewID: 1, UserID: 1, CarID: 3, Rating: 5, Comment: 'Very smooth drive and comfortable!', ReviewDate: '2025-05-06' },
        { ReviewID: 2, UserID: 2, CarID: 2, Rating: 4, Comment: 'Good car but a bit noisy engine.', ReviewDate: '2025-04-19' },
        { ReviewID: 3, UserID: 3, CarID: 1, Rating: 3, Comment: 'Average experience, nothing special.', ReviewDate: '2025-04-23' },
        { ReviewID: 4, UserID: 4, CarID: 6, Rating: 5, Comment: 'Perfect for carrying goods, highly recommended.', ReviewDate: '2025-05-13' },
        { ReviewID: 5, UserID: 5, CarID: 5, Rating: 4, Comment: 'Great convertible, fun for weekend trips.', ReviewDate: '2025-05-02' },
        { ReviewID: 6, UserID: 1, CarID: 4, Rating: 2, Comment: 'Car was in maintenance, so not satisfied.', ReviewDate: '2025-03-15' }
    ];

    let currentLoggedInUser = null; 

    // --- Login Page (`login.html`) ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value; 

            const foundUser = MOCK_USERS.find(user => user.Email === email); 
            
            if (foundUser && foundUser.Password === password) { // Simple password check for demo
                setCookie('userEmail', email, 7);
                setCookie('userID', foundUser.UserID, 7);
                currentLoggedInUser = foundUser; 
                alert('Login successful (simulated). Cookies set.');
                if (foundUser.Role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            } else {
                alert('User not found or incorrect password (simulated).');
            }
        });
    }

    // --- Register Page (`register.html`) ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            if (MOCK_USERS.find(u => u.Email === email)) {
                alert("Email already registered!");
                return;
            }
            
            const newUserID = MOCK_USERS.length > 0 ? Math.max(...MOCK_USERS.map(u => u.UserID)) + 1 : 1;
            MOCK_USERS.push({ UserID: newUserID, Name: name, Email: email, Password: password, Role: 'customer', RewardPoints: 0 });
            alert('Registration successful (simulated)! Please log in.');
            console.log("Updated MOCK_USERS:", MOCK_USERS);
            window.location.href = 'login.html';
        });
    }
    
    // --- Popular Cars on Index Page (`index.html`) ---
    const popularCarsGrid = document.getElementById('popular-cars-grid');
    if (popularCarsGrid) {
        const popularCars = MOCK_CARS_DB.filter(car => car.Status === 'available').slice(0, 3); 
        popularCars.forEach(car => {
            let displayPrice = car.PricePerDay;
             if (car.IsEcoFriendly && car.EcoDiscountPercentage > 0) {
                displayPrice = car.PricePerDay * (1 - car.EcoDiscountPercentage);
            }
            const carCardHTML = `
                <div class="car-card ${car.IsEcoFriendly ? 'eco-friendly-highlight' : ''}">
                    ${car.IsEcoFriendly ? '<span class="eco-badge">Eco</span>' : ''}
                    <img src="${car.ImageURL || 'images/placeholder-car.png'}" alt="${car.Brand} ${car.Model}">
                    <div class="car-card-content">
                        <h3>${car.Brand} ${car.Model} (${car.Year})</h3>
                        <p>From $${displayPrice.toFixed(2)}/day 
                           ${(car.IsEcoFriendly && car.EcoDiscountPercentage > 0) ? `<span class="discount-info">(${(car.EcoDiscountPercentage * 100)}% Off)</span>` : ''}
                        </p>
                        <a href="car-details.html?carId=${car.CarID}" class="btn-secondary">View Details</a>
                    </div>
                </div>`;
            popularCarsGrid.innerHTML += carCardHTML;
        });
    }


    // --- Car List Page (`car-list.html`) ---
    const carGridContainer = document.getElementById('car-grid-container');
    const carCategoryFilterSelect = document.getElementById('carCategory');

    if (carCategoryFilterSelect) { 
        MOCK_CAR_CATEGORIES.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.CategoryID;
            option.textContent = cat.CategoryName;
            carCategoryFilterSelect.appendChild(option);
        });
    }

    if (carGridContainer) {
        const populateCarList = (carsToDisplay) => {
            carGridContainer.innerHTML = ''; 
            const availableCars = carsToDisplay.filter(car => car.Status === 'available');
            
            if (availableCars.length === 0) {
                carGridContainer.innerHTML = '<p style="text-align:center; grid-column: 1 / -1;">No cars match your criteria.</p>';
                return;
            }

            availableCars.forEach(car => {
                const category = MOCK_CAR_CATEGORIES.find(cat => cat.CategoryID === car.CategoryID);
                let displayPrice = car.PricePerDay;
                let originalPriceHTML = '';
                let discountTagHTML = '';

                if (car.IsEcoFriendly && car.EcoDiscountPercentage > 0) {
                    const discountAmount = car.PricePerDay * car.EcoDiscountPercentage;
                    displayPrice = car.PricePerDay - discountAmount;
                    originalPriceHTML = `<span class="original-price">$${car.PricePerDay.toFixed(2)}</span>`;
                    discountTagHTML = `<span class="discount-tag">(${(car.EcoDiscountPercentage * 100).toFixed(0)}% Off)</span>`;
                }

                const carItemHTML = `
                    <div class="car-item">
                        ${car.IsEcoFriendly ? '<span class="eco-badge">Eco</span>' : ''}
                        <img src="${car.ImageURL || 'images/placeholder-car.png'}" alt="${car.Brand} ${car.Model}">
                        <div class="car-item-content">
                            <h3>${car.Brand} ${car.Model} (${car.Year})</h3>
                            <p>Category: ${category ? category.CategoryName : 'N/A'}<br>
                               Fuel: ${car.FuelType}, Seats: ${car.SeatingCapacity}, Transmission: ${car.TransmissionType}
                            </p>
                            <p class="price-display">$${displayPrice.toFixed(2)}/day ${originalPriceHTML} ${discountTagHTML}</p>
                            <button class="btn-rent" data-car-id="${car.CarID}">Rent Now</button>
                        </div>
                    </div>`;
                carGridContainer.insertAdjacentHTML('beforeend', carItemHTML);
            });

            document.querySelectorAll('#car-grid-container .btn-rent').forEach(button => {
                button.addEventListener('click', function() {
                    const carId = this.dataset.carId;
                    const carData = MOCK_CARS_DB.find(c => c.CarID == carId);
                    if (carData) {
                        let effectivePrice = carData.PricePerDay;
                        if (carData.IsEcoFriendly && carData.EcoDiscountPercentage > 0) {
                            effectivePrice = carData.PricePerDay * (1 - carData.EcoDiscountPercentage);
                        }
                        const paramsForRenting = new URLSearchParams({
                            carId: carData.CarID, model: carData.Model, brand: carData.Brand, year: carData.Year,
                            price: effectivePrice.toFixed(2), originalPrice: carData.PricePerDay.toFixed(2),
                            image: carData.ImageURL, isEco: carData.IsEcoFriendly, ecoDiscountRate: carData.EcoDiscountPercentage,
                            fuelType: carData.FuelType, seatingCapacity: carData.SeatingCapacity, transmissionType: carData.TransmissionType, categoryId: carData.CategoryID
                        });
                        window.location.href = `renting.html?${paramsForRenting.toString()}`;
                    }
                });
            });
        };

        populateCarList(MOCK_CARS_DB); 

        const carFiltersForm = document.getElementById('carFiltersForm');
        if (carFiltersForm) {
            const priceRangeSlider = document.getElementById('priceRange');
            const priceOutput = document.getElementById('priceRangeOutput');
            if (priceRangeSlider && priceOutput) {
                priceOutput.textContent = priceRangeSlider.value; 
                priceRangeSlider.addEventListener('input', () => {
                    priceOutput.textContent = priceRangeSlider.value;
                });
            }

            document.getElementById('applyFiltersBtn').addEventListener('click', () => {
                const maxPrice = parseInt(document.getElementById('priceRange').value);
                const fuelType = document.getElementById('fuelType').value;
                const seatingCapacity = document.getElementById('seatingCapacity').value;
                const carBrand = document.getElementById('carBrand').value;
                const transmissionType = document.getElementById('transmissionType').value;
                const categoryID = document.getElementById('carCategory').value;
                const ecoOnly = document.getElementById('ecoFriendlyOnly').checked;

                const filteredCars = MOCK_CARS_DB.filter(car => {
                    let carPriceForFilter = car.PricePerDay;
                     if (car.IsEcoFriendly && car.EcoDiscountPercentage > 0) {
                         carPriceForFilter = car.PricePerDay * (1 - car.EcoDiscountPercentage);
                    }

                    if (carPriceForFilter > maxPrice) return false;
                    if (fuelType && car.FuelType !== fuelType) return false;
                    if (seatingCapacity && car.SeatingCapacity != seatingCapacity) return false;
                    if (carBrand && car.Brand !== carBrand) return false;
                    if (transmissionType && car.TransmissionType !== transmissionType) return false;
                    if (categoryID && car.CategoryID != categoryID) return false;
                    if (ecoOnly && !car.IsEcoFriendly) return false;
                    return true; 
                });
                populateCarList(filteredCars);
            });
            document.getElementById('resetFiltersBtn').addEventListener('click', () => {
                carFiltersForm.reset();
                if (priceOutput && priceRangeSlider) priceOutput.textContent = priceRangeSlider.max; 
                populateCarList(MOCK_CARS_DB);
            });
        }
    }

    // --- Car Details Page (`car-details.html`) ---
    if (document.getElementById('car-info-details')) {
        const carId = params.get('carId');
        const car = MOCK_CARS_DB.find(c => c.CarID == carId);
        const category = car ? MOCK_CAR_CATEGORIES.find(cat => cat.CategoryID === car.CategoryID) : null;

        if (car) {
            document.title = `${car.Brand} ${car.Model} Details`;
            document.getElementById('car-model-title').textContent = `${car.Brand} ${car.Model} (${car.Year})`;
            if (document.getElementById('car-image-detail')) document.getElementById('car-image-detail').src = car.ImageURL || 'images/placeholder-car.png';
            if (document.getElementById('car-image-detail')) document.getElementById('car-image-detail').alt = `${car.Brand} ${car.Model}`;
            
            if (document.getElementById('car-brand-detail')) document.getElementById('car-brand-detail').textContent = car.Brand;
            if (document.getElementById('car-model-spec')) document.getElementById('car-model-spec').textContent = car.Model;
            if (document.getElementById('car-year-detail')) document.getElementById('car-year-detail').textContent = car.Year;
            if (document.getElementById('car-category-detail')) document.getElementById('car-category-detail').textContent = category ? category.CategoryName : 'N/A';
            if (document.getElementById('car-fuel-detail')) document.getElementById('car-fuel-detail').textContent = car.FuelType;
            if (document.getElementById('car-capacity-detail')) document.getElementById('car-capacity-detail').textContent = car.SeatingCapacity;
            if (document.getElementById('car-transmission-detail')) document.getElementById('car-transmission-detail').textContent = car.TransmissionType;
            if (document.getElementById('car-description-detail')) document.getElementById('car-description-detail').textContent = category ? category.Description : 'A great car for your travels.';


            let displayPrice = car.PricePerDay;
            let priceHtml = `Price: $<span id="price-value-detail">${displayPrice.toFixed(2)}</span> per day`;
            if (car.IsEcoFriendly && car.EcoDiscountPercentage > 0) {
                const discountedPrice = car.PricePerDay * (1 - car.EcoDiscountPercentage);
                displayPrice = discountedPrice;
                if(document.getElementById('eco-friendly-info-detail')) document.getElementById('eco-friendly-info-detail').style.display = 'block';
                if(document.getElementById('eco-discount-info-detail')) document.getElementById('eco-discount-info-detail').textContent = `Special ${(car.EcoDiscountPercentage * 100).toFixed(0)}% discount!`;
                priceHtml = `Price: $<span id="price-value-detail">${discountedPrice.toFixed(2)}</span> per day <span class="original-price">$${car.PricePerDay.toFixed(2)}</span>`;
            }
            if(document.getElementById('car-price-detail')) document.getElementById('car-price-detail').innerHTML = priceHtml;

            const rentButtonDetail = document.getElementById('rent-button-detail');
            if (rentButtonDetail) {
                rentButtonDetail.addEventListener('click', () => {
                    const paramsForRenting = new URLSearchParams({
                        carId: car.CarID, model: car.Model, brand: car.Brand, year: car.Year,
                        price: displayPrice.toFixed(2), originalPrice: car.PricePerDay.toFixed(2),
                        image: car.ImageURL, isEco: car.IsEcoFriendly, ecoDiscountRate: car.EcoDiscountPercentage,
                        fuelType: car.FuelType, seatingCapacity: car.SeatingCapacity, transmissionType: car.TransmissionType, categoryId: car.CategoryID
                    });
                    window.location.href = `renting.html?${paramsForRenting.toString()}`;
                });
            }
            
            // Populate Reviews
            const reviewsListEl = document.getElementById('reviews-list');
            if(reviewsListEl) {
                const carReviews = MOCK_REVIEWS_DB.filter(r => r.CarID == carId);
                if (carReviews.length > 0) {
                    carReviews.forEach(review => {
                        const user = MOCK_USERS.find(u => u.UserID === review.UserID);
                        const ratingStars = '★'.repeat(review.Rating) + '☆'.repeat(5 - review.Rating);
                        reviewsListEl.innerHTML += `
                            <div class="review-item">
                                <p><strong>User:</strong> ${user ? user.Name : 'Anonymous'} - <span class="rating">${ratingStars}</span></p>
                                <p>"${review.Comment}"</p>
                                <small>Reviewed on: ${new Date(review.ReviewDate).toLocaleDateString()}</small>
                            </div>`;
                    });
                } else {
                    reviewsListEl.innerHTML = '<p>No reviews yet for this car.</p>';
                }
            }
            
            const loggedInUserID = getCookie('userID');
            const addReviewFormContainer = document.getElementById('add-review-form-container');
            if (loggedInUserID && addReviewFormContainer && car) { 
                addReviewFormContainer.style.display = 'block';
                document.getElementById('reviewCarId').value = car.CarID;
            }


        } else {
            if(document.getElementById('car-info-details')) document.getElementById('car-info-details').innerHTML = '<h2 style="text-align:center;">Car not found.</h2>';
        }
    }
    
    const addReviewForm = document.getElementById('addReviewForm');
    if (addReviewForm) {
        addReviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const carId = document.getElementById('reviewCarId').value;
            const rating = document.getElementById('rating').value;
            const comment = document.getElementById('comment').value;
            const userId = getCookie('userID'); 

            if (!userId) {
                alert("Please login to submit a review.");
                return;
            }
            
            const newReviewID = MOCK_REVIEWS_DB.length > 0 ? Math.max(...MOCK_REVIEWS_DB.map(r => r.ReviewID)) + 1 : 1;
            const newReview = {
                ReviewID: newReviewID,
                UserID: parseInt(userId),
                CarID: parseInt(carId),
                Rating: parseInt(rating),
                Comment: comment,
                ReviewDate: new Date().toISOString().split('T')[0]
            };
            MOCK_REVIEWS_DB.push(newReview);
            alert("Review submitted (simulated)!");
            console.log("Updated MOCK_REVIEWS_DB:", MOCK_REVIEWS_DB);
            
            addReviewForm.reset();
            window.location.reload(); 
        });
    }


    // --- Renting Page (`renting.html`) ---
    const rentalForm = document.getElementById('rentalForm');
    if (rentalForm) {
        const carId = params.get('carId');
        const model = params.get('model');
        const brand = params.get('brand');
        const year = params.get('year');
        const pricePerDay = parseFloat(params.get('price')); 
        const originalPricePerDay = parseFloat(params.get('originalPrice'));
        const image = params.get('image');
        const isEco = params.get('isEco') === 'true';
        const ecoDiscountRate = parseFloat(params.get('ecoDiscountRate')) || 0;

        document.getElementById('rentalCarId').value = carId;
        document.getElementById('rentalBasePricePerDay').value = originalPricePerDay;
        document.getElementById('rentalIsEco').value = isEco;
        document.getElementById('rentalEcoDiscountRate').value = ecoDiscountRate;

        if(document.getElementById('selected-car-model-year')) document.getElementById('selected-car-model-year').textContent = `${brand} ${model} (${year})`;
        if(document.getElementById('selected-car-price')) document.getElementById('selected-car-price').textContent = pricePerDay.toFixed(2);
        if(document.getElementById('selected-car-image-renting') && image) document.getElementById('selected-car-image-renting').src = image;

        if (isEco && ecoDiscountRate > 0) {
            const discountInfoEl = document.getElementById('eco-discount-applied-info');
            if(discountInfoEl) {
                discountInfoEl.textContent = `(${(ecoDiscountRate * 100).toFixed(0)}% Eco Discount Applied)`;
                discountInfoEl.style.display = 'inline';
            }
        }

        const userEmailFromCookie = getCookie('userEmail');
        if (userEmailFromCookie && document.getElementById('email')) document.getElementById('email').value = userEmailFromCookie;
        
        const deliveryOption = document.getElementById('deliveryOption');
        const deliveryAddressGroup = document.getElementById('delivery-address-group');
        const deliveryAddressInput = document.getElementById('deliveryAddress');
        const pickupLocationGroup = document.getElementById('pickup-location-group');
        const deliveryFeeDisplay = document.getElementById('delivery-fee-display');
        const deliveryFeeValueInput = document.getElementById('deliveryFeeValue');
        const hardcodedDeliveryFee = 25;
        if (deliveryFeeDisplay) deliveryFeeDisplay.textContent = hardcodedDeliveryFee.toFixed(2);


        if(deliveryOption) {
            deliveryOption.addEventListener('change', function() {
                if (this.value === 'delivery') {
                    if(deliveryAddressGroup) deliveryAddressGroup.style.display = 'block';
                    if(deliveryAddressInput) deliveryAddressInput.required = true;
                    if(pickupLocationGroup) pickupLocationGroup.style.display = 'none';
                    if(deliveryFeeValueInput) deliveryFeeValueInput.value = hardcodedDeliveryFee;
                } else { 
                    if(deliveryAddressGroup) deliveryAddressGroup.style.display = 'none';
                    if(deliveryAddressInput) deliveryAddressInput.required = false;
                    if(pickupLocationGroup) pickupLocationGroup.style.display = 'block';
                    if(deliveryFeeValueInput) deliveryFeeValueInput.value = 0;
                }
            });
            deliveryOption.dispatchEvent(new Event('change')); 
        }

        rentalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const rentalData = {
                carId: document.getElementById('rentalCarId').value,
                carModelBrandYear: `${brand} ${model} (${year})`, 
                basePricePerDay: parseFloat(document.getElementById('rentalBasePricePerDay').value),
                isEco: document.getElementById('rentalIsEco').value === 'true',
                ecoDiscountRate: parseFloat(document.getElementById('rentalEcoDiscountRate').value),
                
                renterName: document.getElementById('name').value,
                renterEmail: document.getElementById('email').value,
                renterPhone: document.getElementById('phone').value,
                rentalStartDate: document.getElementById('pickupDate').value,
                rentalEndDate: document.getElementById('returnDate').value,
                
                deliveryOption: deliveryOption.value,
                deliveryAddress: deliveryOption.value === 'delivery' ? deliveryAddressInput.value : null,
                pickupLocationNotes: deliveryOption.value === 'pickup' ? document.getElementById('pickupLocationNotes').value : null,
                deliveryFee: parseFloat(deliveryFeeValueInput.value) || 0,
                
                userID: getCookie('userID') || 'USR' + Date.now().toString().slice(-4) 
            };

            const startDate = new Date(rentalData.rentalStartDate);
            const endDate = new Date(rentalData.rentalEndDate);
            const today = new Date();
            today.setHours(0,0,0,0); 

            if (endDate < startDate) {
                alert('Return date cannot be before pickup date.'); return;
            }
            if (startDate < today) {
                alert('Pickup date cannot be in the past.'); return;
            }
            if (rentalData.deliveryOption === 'delivery' && !rentalData.deliveryAddress) {
                alert('Please provide a delivery address.'); return;
            }

            localStorage.setItem('currentRentalData', JSON.stringify(rentalData));
            window.location.href = 'payment.html';
        });
    }

    // --- Payment Page (`payment.html`) ---
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        const rentalDataString = localStorage.getItem('currentRentalData');
        if (!rentalDataString) { 
            alert('Rental data not found. Please start over.');
            window.location.href = 'car-list.html';
            return;
        }
        const rentalData = JSON.parse(rentalDataString);

        const pickup = new Date(rentalData.rentalStartDate);
        const returnd = new Date(rentalData.rentalEndDate);
        const days = Math.max(1, Math.ceil((returnd - pickup) / (1000 * 60 * 60 * 24)));
        
        let subtotal = days * rentalData.basePricePerDay;
        let ecoDiscountAmount = 0;

        if (rentalData.isEco && rentalData.ecoDiscountRate > 0) {
            ecoDiscountAmount = subtotal * rentalData.ecoDiscountRate;
            if (document.getElementById('summary-eco-discount-line')) document.getElementById('summary-eco-discount-line').style.display = 'block';
            if (document.getElementById('summary-eco-discount-rate')) document.getElementById('summary-eco-discount-rate').textContent = (rentalData.ecoDiscountRate * 100).toFixed(0);
            if (document.getElementById('summary-eco-discount-amount')) document.getElementById('summary-eco-discount-amount').textContent = ecoDiscountAmount.toFixed(2);
        }
        
        const totalAmount = (subtotal - ecoDiscountAmount) + rentalData.deliveryFee;

        if (document.getElementById('summary-rental-id')) document.getElementById('summary-rental-id').textContent = 'RENT-' + Date.now().toString().slice(-6); 
        if (document.getElementById('summary-car-model')) document.getElementById('summary-car-model').textContent = rentalData.carModelBrandYear;
        if (document.getElementById('summary-car-id')) document.getElementById('summary-car-id').textContent = rentalData.carId;
        if (document.getElementById('summary-rental-dates')) document.getElementById('summary-rental-dates').textContent = `${rentalData.rentalStartDate} to ${rentalData.rentalEndDate}`;
        if (document.getElementById('summary-rental-days')) document.getElementById('summary-rental-days').textContent = days;
        if (document.getElementById('summary-price-per-day')) document.getElementById('summary-price-per-day').textContent = rentalData.basePricePerDay.toFixed(2);
        if (document.getElementById('summary-base-price')) document.getElementById('summary-base-price').textContent = subtotal.toFixed(2);
        if (document.getElementById('summary-delivery-fee')) document.getElementById('summary-delivery-fee').textContent = rentalData.deliveryFee.toFixed(2);
        if (document.getElementById('summary-total-amount')) document.getElementById('summary-total-amount').textContent = totalAmount.toFixed(2);

        rentalData.calculatedDays = days;
        rentalData.calculatedSubtotal = subtotal;
        rentalData.calculatedEcoDiscountAmount = ecoDiscountAmount;
        rentalData.calculatedTotalAmount = totalAmount;
        
        const cardDetailsGroup = document.getElementById('card-details-group');
        const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
        const updateCardFieldsRequirement = (isCard) => {
            if(cardDetailsGroup) cardDetailsGroup.style.display = isCard ? 'block' : 'none';
            if(document.getElementById('cardNumber')) document.getElementById('cardNumber').required = isCard;
            if(document.getElementById('expiryDate')) document.getElementById('expiryDate').required = isCard;
            if(document.getElementById('cvv')) document.getElementById('cvv').required = isCard;
        };

        paymentMethodRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                updateCardFieldsRequirement(this.value === 'Credit Card');
            });
        });
        
        const checkedRadio = document.querySelector('input[name="paymentMethod"]:checked');
        if (checkedRadio) updateCardFieldsRequirement(checkedRadio.value === 'Credit Card');


        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            rentalData.paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
            
            if (rentalData.paymentMethod === 'Credit Card') {
                const cardNumber = document.getElementById('cardNumber').value;
                const expiryDate = document.getElementById('expiryDate').value;
                const cvv = document.getElementById('cvv').value;
                if (!cardNumber || !/^\d{13,19}$/.test(cardNumber.replace(/\s/g,''))) { alert('Invalid card number.'); return; }
                if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) { alert('Invalid expiry date (MM/YY).'); return; }
                if (!cvv || !/^\d{3,4}$/.test(cvv)) { alert('Invalid CVV.'); return; }
            }
            
            rentalData.paymentDate = new Date().toISOString();
            rentalData.paymentStatus = (rentalData.paymentMethod === 'Credit Card') ? 'paid' : 'pending';
            
            
            const newRentalID = MOCK_RENTALS_DB.length > 0 ? Math.max(...MOCK_RENTALS_DB.map(r => r.RentalID)) + 1 : 1;
            const newRentalRecord = {
                RentalID: newRentalID,
                UserID: parseInt(rentalData.userID), 
                CarID: parseInt(rentalData.carId),
                RentalStartDate: rentalData.rentalStartDate,
                RentalEndDate: rentalData.rentalEndDate,
                TotalPrice: rentalData.calculatedTotalAmount,
                Status: 'active', 
                DeliveryFee: rentalData.deliveryFee,
                DeliveryAddress: rentalData.deliveryAddress,
                PickupLocationNotes: rentalData.pickupLocationNotes
            };
            MOCK_RENTALS_DB.push(newRentalRecord);
            console.log("New Rental Added (Simulated):", newRentalRecord);

            
            const newPaymentID = MOCK_PAYMENTS_DB.length > 0 ? Math.max(...MOCK_PAYMENTS_DB.map(p => p.PaymentID)) + 1 : 1;
            const newPaymentRecord = {
                PaymentID: newPaymentID,
                RentalID: newRentalID,
                PaymentDate: rentalData.paymentDate,
                Amount: rentalData.calculatedTotalAmount,
                PaymentMethod: rentalData.paymentMethod,
                PaymentStatus: rentalData.paymentStatus
            };
            MOCK_PAYMENTS_DB.push(newPaymentRecord);
            console.log("New Payment Added (Simulated):", newPaymentRecord);
            
            rentalData.rentalIDForDisplay = newRentalID;
            rentalData.paymentIDForDisplay = newPaymentID;


            localStorage.setItem('finalRentalDataForInvoice', JSON.stringify(rentalData));
            window.location.href = 'invoice.html';
        });
    }

    // --- Invoice Page (`invoice.html`) ---
    if (document.getElementById('invoice-details')) {
        const invoiceDataString = localStorage.getItem('finalRentalDataForInvoice');
        if (!invoiceDataString) { 
            alert('Invoice data not found. Please start over.');
            window.location.href = 'index.html';
            return; 
        }
        const invoiceData = JSON.parse(invoiceDataString);
        
        const rentalID = invoiceData.rentalIDForDisplay || 'RENT-' + Date.now().toString().slice(-6);
        const paymentID = invoiceData.paymentIDForDisplay || 'PAY-' + Date.now().toString().slice(-5);

        if (document.getElementById('invoice-header')) document.getElementById('invoice-header').innerHTML = `<h2>Booking Confirmation - ${rentalID}</h2>`;
        if (document.getElementById('renter-user-id')) document.getElementById('renter-user-id').textContent = invoiceData.userID;
        if (document.getElementById('renter-name')) document.getElementById('renter-name').textContent = invoiceData.renterName;
        if (document.getElementById('renter-email')) document.getElementById('renter-email').textContent = invoiceData.renterEmail;
        if (document.getElementById('renter-phone')) document.getElementById('renter-phone').textContent = invoiceData.renterPhone;

        if (document.getElementById('invoice-car-id')) document.getElementById('invoice-car-id').textContent = invoiceData.carId;
        if (document.getElementById('car-model-invoice')) document.getElementById('car-model-invoice').textContent = invoiceData.carModelBrandYear;
        if (document.getElementById('rental-period-invoice')) document.getElementById('rental-period-invoice').textContent = `${invoiceData.rentalStartDate} to ${invoiceData.rentalEndDate}`;
        if (document.getElementById('rental-days-invoice')) document.getElementById('rental-days-invoice').textContent = invoiceData.calculatedDays;

        const deliveryInfoSection = document.getElementById('delivery-info-section-invoice');
        const pickupInfoSection = document.getElementById('pickup-info-section-invoice');
        if (invoiceData.deliveryOption === 'delivery') {
            if(deliveryInfoSection) deliveryInfoSection.style.display = 'block';
            if(document.getElementById('delivery-address-display-invoice')) document.getElementById('delivery-address-display-invoice').textContent = invoiceData.deliveryAddress || 'N/A';
            if(pickupInfoSection) pickupInfoSection.style.display = 'none';
        } else { 
            if(pickupInfoSection) pickupInfoSection.style.display = 'block';
            if(document.getElementById('pickup-location-display-invoice')) document.getElementById('pickup-location-display-invoice').textContent = invoiceData.pickupLocationNotes || 'Main Branch (Default)';
            if(deliveryInfoSection) deliveryInfoSection.style.display = 'none';
        }

        if (document.getElementById('invoice-rental-id')) document.getElementById('invoice-rental-id').textContent = rentalID;
        if (document.getElementById('base-cost-invoice')) document.getElementById('base-cost-invoice').textContent = invoiceData.calculatedSubtotal.toFixed(2);
        if (invoiceData.isEco && invoiceData.calculatedEcoDiscountAmount > 0) {
            if (document.getElementById('eco-discount-line-invoice')) document.getElementById('eco-discount-line-invoice').style.display = 'block';
            if (document.getElementById('eco-discount-amount-invoice')) document.getElementById('eco-discount-amount-invoice').textContent = invoiceData.calculatedEcoDiscountAmount.toFixed(2);
        }
        if (document.getElementById('payment-delivery-fee-invoice')) document.getElementById('payment-delivery-fee-invoice').textContent = invoiceData.deliveryFee.toFixed(2);
        if (document.getElementById('total-amount-invoice')) document.getElementById('total-amount-invoice').textContent = invoiceData.calculatedTotalAmount.toFixed(2);
        if (document.getElementById('payment-method-invoice')) document.getElementById('payment-method-invoice').textContent = invoiceData.paymentMethod;
        if (document.getElementById('payment-status-invoice')) document.getElementById('payment-status-invoice').textContent = invoiceData.paymentStatus;
        if (document.getElementById('invoice-payment-id')) document.getElementById('invoice-payment-id').textContent = paymentID;
        
        const paymentInstructionsEl = document.getElementById('payment-instructions-invoice');
        if (paymentInstructionsEl) {
            if (invoiceData.paymentStatus === 'paid') {
                paymentInstructionsEl.innerHTML = `<p><strong>Payment Confirmed!</strong> Your car rental (ID: ${rentalID}) is confirmed. Thank you for choosing us! You will receive an email with all details shortly.</p>`;
            } else { 
                const deadline = new Date(new Date(invoiceData.rentalStartDate).getTime() - 24*60*60*1000); 
                const deadlineDateString = deadline.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                let instructions = `<p><strong>Action Required for Rental ${rentalID}:</strong> Your payment is currently <strong>pending</strong>. `;
                if (invoiceData.paymentMethod === 'Cash') {
                    instructions += `Please visit our branch to pay $${invoiceData.calculatedTotalAmount.toFixed(2)} in cash by <strong>${deadlineDateString}</strong>. `;
                } else if (invoiceData.paymentMethod === 'Bank Transfer') {
                    instructions += `Please transfer $${invoiceData.calculatedTotalAmount.toFixed(2)} to Account: <strong>123-456-789</strong>, Bank: <strong>CarRent Bank</strong>, Reference: <strong>${rentalID}</strong>. Payment must be received by <strong>${deadlineDateString}</strong>. `;
                }
                instructions += `Your car will be ready for ${invoiceData.deliveryOption} after payment confirmation. Failure to complete payment by the deadline may result in cancellation.</p>`;
                paymentInstructionsEl.innerHTML = instructions;
            }
        }
    }

    // --- Dashboard Page (`dashboard.html`) ---
    const dashboardUserIdSpan = document.getElementById('dashboard-user-id');
    if (dashboardUserIdSpan) {
        const userIdFromCookie = getCookie('userID');
        currentLoggedInUser = MOCK_USERS.find(u => u.UserID == userIdFromCookie); 

        if (currentLoggedInUser) {
            dashboardUserIdSpan.textContent = currentLoggedInUser.UserID;
            if (document.getElementById('dashboard-username')) document.getElementById('dashboard-username').textContent = currentLoggedInUser.Name;
            if (document.getElementById('dashboard-email')) document.getElementById('dashboard-email').textContent = currentLoggedInUser.Email;
            if (document.getElementById('reward-points')) document.getElementById('reward-points').textContent = currentLoggedInUser.RewardPoints || 0;

            
            const rentalHistoryTableBody = document.querySelector('#rental-history-table tbody');
            const noRentalHistoryMsg = document.getElementById('no-rental-history');
            if (rentalHistoryTableBody) {
                rentalHistoryTableBody.innerHTML = ''; 
                const userRentals = MOCK_RENTALS_DB.filter(r => r.UserID == currentLoggedInUser.UserID);
                if (userRentals.length > 0) {
                    if (noRentalHistoryMsg) noRentalHistoryMsg.style.display = 'none';
                    userRentals.forEach(rental => {
                        const car = MOCK_CARS_DB.find(c => c.CarID === rental.CarID);
                        rentalHistoryTableBody.innerHTML += `
                            <tr>
                                <td>${rental.RentalID}</td>
                                <td>${car ? `${car.Brand} ${car.Model}` : 'N/A'}</td>
                                <td>${rental.CarID}</td>
                                <td>${formatDate(rental.RentalStartDate)}</td>
                                <td>${formatDate(rental.RentalEndDate)}</td>
                                <td>$${rental.TotalPrice.toFixed(2)}</td>
                                <td style="text-transform:capitalize;">${rental.Status}</td>
                                <td><button class="btn-secondary btn-small" onclick="alert('View Invoice for ${rental.RentalID} - TBD. Use RentalID to find payment & rental details.')">Invoice</button></td>
                            </tr>`;
                    });
                } else {
                    if (noRentalHistoryMsg) noRentalHistoryMsg.style.display = 'block';
                }
            }
        } else { 
             if (document.getElementById('dashboard-username')) document.getElementById('dashboard-username').textContent = "Guest";
             if (document.getElementById('dashboard-email')) document.getElementById('dashboard-email').textContent = "Please Login";
             if (document.getElementById('rental-history-table tbody')) document.querySelector('#rental-history-table tbody').innerHTML = '<tr><td colspan="8" style="text-align:center;">Please login to view your rental history.</td></tr>';
        }
    }

    // --- Admin Page (`admin.html`) ---
    const adminUsersTable = document.getElementById('admin-users-table');
    const adminCategoriesTable = document.getElementById('admin-categories-table');
    const adminCarsTable = document.getElementById('admin-cars-table');
    const adminRentalsTable = document.getElementById('admin-rentals-table');
    const adminPaymentsTable = document.getElementById('admin-payments-table');
    const adminReviewsTable = document.getElementById('admin-reviews-table');

    function populateAdminTable(tableElement, data, columns, actions) {
        if (!tableElement) return;
        const tbody = tableElement.querySelector('tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        data.forEach(item => {
            const row = tbody.insertRow();
            columns.forEach(col => {
                const cell = row.insertCell();
                let value = item[col.key];
                if (col.formatter) value = col.formatter(value);
                cell.textContent = value === undefined || value === null ? 'N/A' : value;
            });
            if (actions) {
                const actionCell = row.insertCell();
                actions.forEach(action => {
                    const button = document.createElement('button');
                    button.textContent = action.label;
                    button.className = action.class || 'btn-secondary btn-small'; 
                    button.onclick = () => action.handler(item);
                    actionCell.appendChild(button);
                    actionCell.appendChild(document.createTextNode(' '));
                });
            }
        });
    }

    if (adminUsersTable) {
        populateAdminTable(adminUsersTable, MOCK_USERS,
            [{key: 'UserID'}, {key: 'Name'}, {key: 'Email'}, {key: 'Role'}],
            [{label: 'Edit', handler: (item) => alert(`Edit UserID: ${item.UserID}`)}]
        );
    }
    if (adminCategoriesTable) {
        populateAdminTable(adminCategoriesTable, MOCK_CAR_CATEGORIES,
            [{key: 'CategoryID'}, {key: 'CategoryName'}, {key: 'Description'}],
            [{label: 'Edit', handler: (item) => alert(`Edit CategoryID: ${item.CategoryID}`)}]
        );
    }
    if (adminCarsTable) {
        populateAdminTable(adminCarsTable, MOCK_CARS_DB,
            [
                {key: 'CarID'}, {key: 'Model'}, {key: 'Brand'}, {key: 'Year'}, {key: 'Status'}, 
                {key: 'PricePerDay', formatter: val => `$${parseFloat(val).toFixed(2)}`}, 
                {key: 'CategoryID'}, {key: 'FuelType'}, {key: 'SeatingCapacity'}, {key: 'TransmissionType'},
                {key: 'IsEcoFriendly', formatter: val => val ? 'Yes' : 'No'},
                {key: 'EcoDiscountPercentage', formatter: val => `${(parseFloat(val)*100).toFixed(0)}%`}
            ],
            [{label: 'Edit', class:'edit-btn', handler: (item) => editAdminCar(item) }, {label: 'Del', class:'delete-btn', handler: (item) => alert(`Delete CarID: ${item.CarID} (Simulated)`)}]
        );
    }
    if (adminRentalsTable) {
        populateAdminTable(adminRentalsTable, MOCK_RENTALS_DB,
            [
                {key: 'RentalID'}, {key: 'UserID'}, {key: 'CarID'}, 
                {key: 'RentalStartDate', formatter: formatDate}, {key: 'RentalEndDate', formatter: formatDate}, 
                {key: 'TotalPrice', formatter: val => `$${parseFloat(val).toFixed(2)}`}, 
                {key: 'Status'},
                {key: 'DeliveryFee', formatter: val => `$${parseFloat(val || 0).toFixed(2)}`},
                {key: 'DeliveryAddress'}
            ],
            [{label: 'View', handler: (item) => alert(`View RentalID: ${item.RentalID}`)}]
        );
    }
     if (adminPaymentsTable) {
        populateAdminTable(adminPaymentsTable, MOCK_PAYMENTS_DB,
            [
                {key: 'PaymentID'}, {key: 'RentalID'}, 
                {key: 'PaymentDate', formatter: val => new Date(val).toLocaleString()}, 
                {key: 'Amount', formatter: val => `$${parseFloat(val).toFixed(2)}`}, 
                {key: 'PaymentMethod'}, {key: 'PaymentStatus'}
            ],
            [{label: 'Details', handler: (item) => alert(`Payment Details for ID: ${item.PaymentID}`)}]
        );
    }
    if (adminReviewsTable) {
        populateAdminTable(adminReviewsTable, MOCK_REVIEWS_DB,
            [
                {key: 'ReviewID'}, {key: 'UserID'}, {key: 'CarID'}, {key: 'Rating'}, 
                {key: 'Comment', formatter: val => val.length > 30 ? val.substring(0,30)+'...' : val}, 
                {key: 'ReviewDate', formatter: formatDate}
            ],
            [{label: 'Delete', class:'delete-btn', handler: (item) => alert(`Delete ReviewID: ${item.ReviewID} (Simulated)`)}]
        );
    }

    // Admin Car Form Handling
    const adminShowAddCarFormBtn = document.getElementById('admin-show-add-car-form-btn');
    const adminAddCarFormContainer = document.getElementById('admin-add-car-form-container');
    const carAdminForm = document.getElementById('carAdminForm');
    const adminCancelCarFormBtn = document.getElementById('admin-cancel-car-form-btn');
    const adminCategoryIdSelect = document.getElementById('adminCategoryIdSelect');

    if (adminCategoryIdSelect) { 
        MOCK_CAR_CATEGORIES.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.CategoryID;
            option.textContent = `${cat.CategoryID} - ${cat.CategoryName}`;
            adminCategoryIdSelect.appendChild(option);
        });
    }

    if (adminShowAddCarFormBtn && adminAddCarFormContainer) {
        adminShowAddCarFormBtn.addEventListener('click', () => {
            adminAddCarFormContainer.style.display = 'block';
            if(carAdminForm) carAdminForm.reset();
            if(document.getElementById('adminCarId')) document.getElementById('adminCarId').value = ''; 
            adminShowAddCarFormBtn.textContent = "Adding/Editing Car..."; 
        });
    }
    if (adminCancelCarFormBtn && adminAddCarFormContainer) {
        adminCancelCarFormBtn.addEventListener('click', () => {
            adminAddCarFormContainer.style.display = 'none';
            if(adminShowAddCarFormBtn) adminShowAddCarFormBtn.textContent = "Add/Edit Car";
        });
    }

    function editAdminCar(car) {
        if (!carAdminForm || !adminAddCarFormContainer) return;
        adminAddCarFormContainer.style.display = 'block';
        if(adminShowAddCarFormBtn) adminShowAddCarFormBtn.textContent = `Editing Car ID: ${car.CarID}`;

        document.getElementById('adminCarId').value = car.CarID;
        document.getElementById('adminModel').value = car.Model;
        document.getElementById('adminBrand').value = car.Brand;
        document.getElementById('adminYear').value = car.Year;
        document.getElementById('adminPrice').value = car.PricePerDay;
        document.getElementById('adminCategoryIdSelect').value = car.CategoryID;
        document.getElementById('adminStatus').value = car.Status;
        document.getElementById('adminFuelType').value = car.FuelType;
        document.getElementById('adminSeats').value = car.SeatingCapacity;
        document.getElementById('adminTransmission').value = car.TransmissionType;
        document.getElementById('adminIsEco').checked = car.IsEcoFriendly;
        document.getElementById('adminEcoDiscount').value = car.EcoDiscountPercentage * 100;
    }
    
    if(carAdminForm){
        carAdminForm.addEventListener('submit', function(e){
            e.preventDefault();
            const carIdToSave = document.getElementById('adminCarId').value;
            const carData = {
                Model: document.getElementById('adminModel').value,
                Brand: document.getElementById('adminBrand').value,
                Year: parseInt(document.getElementById('adminYear').value),
                PricePerDay: parseFloat(document.getElementById('adminPrice').value),
                CategoryID: parseInt(document.getElementById('adminCategoryIdSelect').value),
                Status: document.getElementById('adminStatus').value,
                FuelType: document.getElementById('adminFuelType').value,
                SeatingCapacity: parseInt(document.getElementById('adminSeats').value),
                TransmissionType: document.getElementById('adminTransmission').value,
                IsEcoFriendly: document.getElementById('adminIsEco').checked,
                EcoDiscountPercentage: parseFloat(document.getElementById('adminEcoDiscount').value) / 100,
                ImageURL: MOCK_CARS_DB.find(c => c.CarID == carIdToSave)?.ImageURL || 'images/placeholder-car.png' 
            };

            if (carIdToSave) { 
                const carIndex = MOCK_CARS_DB.findIndex(c => c.CarID == carIdToSave);
                if (carIndex > -1) {
                    MOCK_CARS_DB[carIndex] = { ...MOCK_CARS_DB[carIndex], ...carData };
                     alert(`Car ID ${carIdToSave} updated (simulated).`);
                }
            } else { 
                const newCarID = MOCK_CARS_DB.length > 0 ? Math.max(...MOCK_CARS_DB.map(c => c.CarID)) + 1 : 1;
                MOCK_CARS_DB.push({ CarID: newCarID, ...carData });
                alert(`New Car ${carData.Model} added with ID ${newCarID} (simulated).`);
            }
            
            console.log("Updated MOCK_CARS_DB:", MOCK_CARS_DB);
            if (adminAddCarFormContainer) adminAddCarFormContainer.style.display = 'none';
            if (adminShowAddCarFormBtn) adminShowAddCarFormBtn.textContent = "Add/Edit Car";
            
            if (adminCarsTable) {
                populateAdminTable(adminCarsTable, MOCK_CARS_DB,
                    [ 
                        {key: 'CarID'}, {key: 'Model'}, {key: 'Brand'}, {key: 'Year'}, {key: 'Status'}, 
                        {key: 'PricePerDay', formatter: val => `$${parseFloat(val).toFixed(2)}`}, 
                        {key: 'CategoryID'}, {key: 'FuelType'}, {key: 'SeatingCapacity'}, {key: 'TransmissionType'},
                        {key: 'IsEcoFriendly', formatter: val => val ? 'Yes' : 'No'},
                        {key: 'EcoDiscountPercentage', formatter: val => `${(parseFloat(val)*100).toFixed(0)}%`}
                    ],
                    [{label: 'Edit', class:'edit-btn', handler: (item) => editAdminCar(item) }, {label: 'Del', class:'delete-btn', handler: (item) => alert(`Delete CarID: ${item.CarID} (Simulated)`)}]
                );
            }
        });
    }

    // Newsletter and Contact Form simple handlers
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[name="newsletter_email"]').value;
            alert(`Thank you for subscribing, ${email}! (Simulated)`);
            newsletterForm.reset();
        });
    }
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[name="name"]').value;
            alert(`Thank you for your message, ${name}! We will get back to you soon. (Simulated)`);
            contactForm.reset();
        });
    }
    
    const mainSearchForm = document.getElementById('searchForm');
    if(mainSearchForm){
        mainSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = mainSearchForm.querySelector('input[name="query"]').value;
            const pickupDate = mainSearchForm.querySelector('input[name="pickup-date"]').value;
            const returnDate = mainSearchForm.querySelector('input[name="return-date"]').value;
            if(query || (pickupDate && returnDate)){
                alert(`Search submitted (simulated):\nQuery: ${query}\nPickup: ${pickupDate}\nReturn: ${returnDate}\n\nThis would ideally redirect to car-list.html with filters applied.`);
            } else {
                alert("Please enter a search query or select dates.");
            }
        });
    }

});