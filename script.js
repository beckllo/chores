// Initialize Supabase
const SUPABASE_URL = 'https://ibnbsffnqyrpqjhpbtjc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_194EeT0E7f1lJhtaU_2fXg_fkNFts3I';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Handle form submission
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const clientName = document.getElementById('name').value;
  const clientDate = document.getElementById('date').value;
  const clientTime = document.getElementById('time').value;

  // Insert data into Supabase table
  const { data, error } = await supabase
    .from('appointments')
    .insert([
      { name: clientName, booking_date: clientDate, booking_time: clientTime }
    ]);

  if (error) {
    alert('Error saving booking: ' + error.message);
  } else {
    alert('Booking saved successfully!');
    document.getElementById('bookingForm').reset();
  }
});
