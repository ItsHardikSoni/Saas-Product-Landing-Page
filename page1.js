document.addEventListener('DOMContentLoaded', function() {
    // Set the launch date (347 days, 3 hours, 57 minutes from now)
    const now = new Date();
    const launchDate = new Date(now.getTime() + (347 * 24 * 60 * 60 * 1000) + (3 * 60 * 60 * 1000) + (57 * 60 * 1000));

    function updateCountdown() {
        const now = new Date();
        const difference = launchDate - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // Update countdown every second
    setInterval(updateCountdown, 1000);

    // Handle email notification
    const notifyBtn = document.querySelector('.notify-btn');
    const emailInput = document.querySelector('.email-input');

    notifyBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        if (email && email.includes('@')) {
            alert('Thank you! We will notify you when we launch.');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
});

