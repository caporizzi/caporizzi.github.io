document.getElementById('waitlist-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const msg = document.getElementById('response-msg');

  const airtableToken = "patlcwCc8KxyK0uXY.96800c647ca223c8b68fc7547d4cc251d826051166c77563f5fa7a2717854ecc"; // ⚠️ Don't expose this in production
  const baseId = "appQtHIvxTBmIUkoo";
  const tableName = "Waitlist";

  try {
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${airtableToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        records: [{ fields: { Email: email } }]
      })
    });

    if (response.ok) {
      msg.textContent = "✅ You're on the waitlist!";
      msg.style.color = "green";
    } else {
      msg.textContent = "❌ Something went wrong. Try again.";
      msg.style.color = "red";
    }
  } catch (err) {
    msg.textContent = "❌ Network error.";
    msg.style.color = "red";
  }
});
