// Function to set today's date as default
function setCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);  // Adds leading zero
    const day = ('0' + today.getDate()).slice(-2);  // Adds leading zero
    const currentDate = `${year}-${month}-${day}`;
    
    document.getElementById('date').value = currentDate; // Set the current date
}

// Sample data of booked slots for each turf
let bookedSlots = {
    'MADHUBAN TURF': {
        '2024-10-10': ['10:00 AM - 11:00 AM', '2:00 PM - 3:00 PM'],
        '2024-10-11': ['12:00 PM - 1:00 PM']
    },
    'VASANT NAGARI TURF': {
        '2024-10-10': ['9:00 AM - 10:00 AM', '3:00 PM - 4:00 PM'],
        '2024-10-11': ['11:00 AM - 12:00 PM']
    },
    'ST.ALLOYSIUS TURF': {
        '2024-10-10': ['12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM'],
        '2024-10-11': ['9:00 AM - 10:00 AM']
    }
};

// Selected slot for booking
let selectedSlot = null;

// Predefined time slots for booking
const allSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM'
];

// Function to check available slots for a selected turf and date
function checkAvailability() {
    const selectedDate = document.getElementById('date').value;
    const selectedTurf = document.getElementById('turfSelect').value;
    const availableSlotsContainer = document.getElementById('availableSlots');
    const bookButton = document.getElementById('bookButton');
    
    availableSlotsContainer.innerHTML = ''; // Clear previous results
    bookButton.disabled = true; // Disable book button

    const booked = (bookedSlots[selectedTurf] && bookedSlots[selectedTurf][selectedDate]) || [];
    const available = allSlots.filter(slot => !booked.includes(slot));

    if (available.length === 0) {
        availableSlotsContainer.innerHTML = '<div class="no-slots">No slots available</div>';
    } else {
        available.forEach(slot => {
            const slotDiv = document.createElement('div');
            slotDiv.classList.add('slot');
            slotDiv.textContent = slot;
            slotDiv.onclick = () => selectSlot(slotDiv, slot);

            availableSlotsContainer.appendChild(slotDiv);
        });
    }
}

// Function to select a time slot
function selectSlot(slotDiv, slot) {
    const previouslySelected = document.querySelector('.slot.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }
    slotDiv.classList.add('selected');
    selectedSlot = slot;
    document.getElementById('bookButton').disabled = false; // Enable book button
}

// Function to book the selected slot
// Function to book the selected slot and send an email
function bookSlot() {
    if (selectedSlot) {
        const selectedDate = document.getElementById('date').value;
        const selectedTurf = document.getElementById('turfSelect').value;
        const email = document.getElementById('email').value; // Get email

        // Book the slot locally (as before)
        if (!bookedSlots[selectedTurf][selectedDate]) {
            bookedSlots[selectedTurf][selectedDate] = [];
        }
        bookedSlots[selectedTurf][selectedDate].push(selectedSlot);

        // Update UI confirmation message
        document.getElementById('confirmationMessage').textContent = 
            `Successfully booked ${selectedSlot} on ${selectedDate} for ${selectedTurf}`;

        // Send email using the backend
        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                turf: selectedTurf,
                slot: selectedSlot,
                date: selectedDate,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Email sent:', data);
        })
        .catch(error => {
            console.error('Error sending email:', error);
        });

        // Refresh available slots
        checkAvailability();
    }
}


// Set the current date and check availability on load
window.onload = function() {
    setCurrentDate();
    checkAvailability();
};

document.getElementById('date').addEventListener('change', checkAvailability);
