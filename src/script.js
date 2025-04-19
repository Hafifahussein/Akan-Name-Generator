document.getElementById('akanForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const birthdateInput = document.getElementById('birthdate').value;
    const genderInput = document.querySelector('input[name="gender"]:checked');

    // Validate inputs
    if (!birthdateInput) {
        document.getElementById('results').innerHTML = "Please enter your birthdate";
        return;
    }

    if (!genderInput) {
        document.getElementById('results').innerHTML = "Please select your gender";
        return;
    }

    const birthdate = new Date(birthdateInput);
    const gender = genderInput.value;

    // Extract date components
    const day = birthdate.getDate();
    const month = birthdate.getMonth() + 1; // Months are 0-indexed
    const year = birthdate.getFullYear();

    // Validate date components
    if (day < 1 || day > 31) {
        document.getElementById('results').innerHTML = "Invalid day (must be 1-31)";
        return;
    }

    if (month < 1 || month > 12) {
        document.getElementById('results').innerHTML = "Invalid month (must be 1-12)";
        return;
    }

    // Calculate day of week using the Zeller-like formula
    function calculateDayOfWeek(day, month, year) {
        // Adjust January and February to be months 13 and 14 of previous year
        if (month < 3) {
            month += 12;
            year -= 1;
        }

        const CC = Math.floor(year / 100);
        const YY = year % 100;
        const MM = month;
        const DD = day;

        // Zeller's Congruence formula
        const h = (DD + Math.floor((13 * (MM + 1)) / 5) + YY + Math.floor(YY / 4) + Math.floor(CC / 4) + 5 * CC) % 7;

        // Convert result to match JavaScript's day index (0=Sunday)
        return (h + 6) % 7;
    }

    const dayOfWeek = calculateDayOfWeek(day, month, year);

    // Akan names arrays
    const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
    const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Get Akan name
    let akanName = gender === "male" ? maleNames[dayOfWeek] : femaleNames[dayOfWeek];
    let dayName = dayNames[dayOfWeek];

    // Display result
    document.getElementById('results').innerHTML = `
        <strong>Your Akan name is:</strong> ${akanName}<br>
        <strong>Day of birth:</strong> ${dayName}<br>
        <strong>Date:</strong> ${day}/${month}/${year}<br>
        <strong>Gender:</strong> ${gender.charAt(0).toUpperCase() + gender.slice(1)}<br><br>
        <em>${akanName} is the name for ${gender}s born on ${dayName} in Akan culture.</em>
    `;
});