document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("reservationForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const depart = document.getElementById("depart").value;
        const arrivee = document.getElementById("arrivee").value;
        const dateDepart = document.getElementById("dateDepart").value;
        const dateArrivee = document.getElementById("dateArrivee").value;
        const nombrePassagers = document.getElementById("nombrePassagers").value;

        const formData = {
            depart: depart,
            arrivee: arrivee,
            dateDepart: dateDepart,
            dateArrivee: dateArrivee,
            nombrePassagers: nombrePassagers
        };

        sendData(formData);
    });

    function sendData(formData) {
        fetch("/reservation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la réservation.");
            }
            return response.json(); // Récupérer les données de réservation de la réponse
        })
        .then(data => {
            // Afficher les informations de réservation et le message de succès sur la page
            const reservationInfoDiv = document.getElementById("reservationInfo");
            reservationInfoDiv.innerHTML = `
                <div class="reservation-details">
                    <h2>Confirmation de réservation</h2>
                    <p><strong>Lieu de départ :</strong> ${data.depart}</p>
                    <p><strong>Lieu d'arrivée :</strong> ${data.arrivee}</p>
                    <p><strong>Date et heure de départ :</strong> ${data.dateDepart}</p>
                    <p><strong>Date et heure d'arrivée :</strong> ${data.dateArrivee}</p>
                    <p><strong>Nombre de passagers :</strong> ${data.nombrePassagers}</p>
                    <p class="success-message">Réservation effectuée avec succès !</p>
                </div>
            `;
        })
        .catch(error => {
            // Afficher un message d'erreur à l'utilisateur
            console.error("Erreur lors de la réservation :", error);
            const messageDiv = document.getElementById("message");
            messageDiv.innerHTML = "Erreur lors de la réservation. Veuillez réessayer.";
        });
    }
});


