document.getElementById('waitlist-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('response-msg');

  if (!firstName || !lastName || !email) {
    msg.textContent = "⚠️ Please fill in all fields.";
    msg.style.color = "orange";
    return;
  }

  const airtableToken = "YOUR_AIRTABLE_TOKEN"; // ⚠️ For testing only
  const baseId = "YOUR_BASE_ID";
  const tableName = "Waitlist";

  try {
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${airtableToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        records: [{
          fields: {
            "First Name": firstName,
            "Last Name": lastName,
            "Email": email
          }
        }]
      })
    });

    if (response.ok) {
      msg.textContent = "✅ You're on the waitlist!";
      msg.style.color = "green";
      document.getElementById('waitlist-form').reset();
    } else {
      msg.textContent = "❌ Error saving to Airtable.";
      msg.style.color = "red";
    }
  } catch (err) {
    msg.textContent = "❌ Network error.";
    msg.style.color = "red";
  }
});
