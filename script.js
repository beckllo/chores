// Initialize Supabase with your keys
const SUPABASE_URL = 'https://ibnbsffnqyrpqjhpbtjc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_194EeT0E7f1lJhtaU_2fXg_fkNFts3I';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 1. BLOCK PAST DATES (Runs automatically when the page loads)
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today; // Sets the calendar minimum to today's date
}

// 2. HANDLE FORM SUBMISSION
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get the submit button to show a loading state
  const submitButton = e.target.querySelector('button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Booking...';
  submitButton.disabled = true;

  const clientName = document.getElementById('name').value;
  const clientDate = document.getElementById('date').value;
  const clientTime = document.getElementById('time').value;

  // Insert data into Supabase table
  const { data, error } = await supabase
    .from('appointments')
    .insert([
      { name: clientName, booking_date: clientDate, booking_time: clientTime }
    ]);

  // Reset button state
  submitButton.textContent = originalButtonText;
  submitButton.disabled = false;

  if (error) {
    alert('Error saving booking: ' + error.message);
  } else {
    // Elegant success feedback instead of a jarring alert pop-up
    const card = document.querySelector('.booking-card');
    card.innerHTML = `
      <div style="text-align: center; padding: 20px 0;">
        <div style="font-size: 48px; margin-bottom: 16px;">✨</div>
        <h1 style="color: #e6dfd5;">Thank You, ${clientName}!</h1>
        <p style="color: #9c8a7f; margin-bottom: 24px;">Your luxury appointment is confirmed.</p>
        <p style="color: #c4b5a9; font-size: 14px;">Date: ${clientDate}<br>Time: ${clientTime}</p>
        <button onclick="window.location.reload()" style="margin-top: 24px; max-width: 200px;">Book Another</button>
      </div>
    `;
  }
});
