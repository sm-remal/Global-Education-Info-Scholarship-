// Modal display function
function showModal(university, title, image, logo, amount, deadline, level, country, description) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <img src="${image}" alt="${university}">
                <div class="modal-logo">
                    <img src="${logo}" alt="${university} logo">
                </div>
            </div>
            <div class="modal-body">
                <h2 class="modal-title">${title}</h2>
                <p class="modal-university">${university}</p>
                
                <div class="details-grid">
                    <div>
                        <h4 class="detail-label">Amount</h4>
                        <p class="detail-value amount">${amount}</p>
                    </div>
                    <div>
                        <h4 class="detail-label">Deadline</h4>
                        <p class="detail-value deadline">${deadline}</p>
                    </div>
                    <div>
                        <h4 class="detail-label">Study Level</h4>
                        <p class="detail-value">${level}</p>
                    </div>
                    <div>
                        <h4 class="detail-label">Country</h4>
                        <p class="detail-value">${country}</p>
                    </div>
                </div>
                
                <h4 class="detail-label">Description</h4>
                <p class="modal-description">${description}</p>
                
                <button class="close-btn" onclick="this.closest('.modal-overlay').remove()">
                    Close
                </button>
            </div>
        </div>
    `;
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            document.body.removeChild(modal);
        }
    });
    
    document.body.appendChild(modal);
}

// Filter functionality
document.getElementById('filterChips').addEventListener('click', function(e) {
    if (e.target.classList.contains('chip')) {
        document.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
    }
});

// Search functionality
document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const country = document.getElementById('countryFilter').value;
    const level = document.getElementById('levelFilter').value;
    const type = document.querySelector('.chip.active').getAttribute('data-type');
    
    const cards = document.querySelectorAll('.scholarship-card');
    
    cards.forEach(card => {
        const university = card.querySelector('.university-name').textContent.toLowerCase();
        const title = card.querySelector('.scholarship-title').textContent.toLowerCase();
        const cardCountry = card.querySelector('.detail-item:nth-child(4) span:last-child').textContent.toLowerCase();
        const cardLevel = card.querySelector('.detail-item:nth-child(3) span:last-child').textContent.toLowerCase();
        
        const matchesSearch = searchTerm === '' || 
            university.includes(searchTerm) || 
            title.includes(searchTerm);
        
        const matchesCountry = country === '' || cardCountry === country.toLowerCase();
        const matchesLevel = level === '' || cardLevel.includes(level.toLowerCase());
        
        if (matchesSearch && matchesCountry && matchesLevel) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});