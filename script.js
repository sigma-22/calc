document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');

    // --- Main function to play sounds ---
    // CHANGED: This function now accepts a 'durationInMs' to control playback time.
    function playSound(soundId, durationInMs) {
        const sound = document.getElementById(soundId);
        if (!sound) return; // Exit if the sound element doesn't exist

        sound.currentTime = 0;
        sound.play();

        // If a duration is provided, set a timer to stop the sound
        if (durationInMs) {
            setTimeout(() => {
                sound.pause();
            }, durationInMs);
        }
    }

    // --- Calculator Logic Functions ---
    // UPDATED: All calls to playSound now include a duration in milliseconds.
    function appendValue(value) {
        if ('0123456789.'.includes(value)) {
            playSound('audio-number', 2000); // EXAMPLE: Play for 150ms
        } else {
            playSound('audio-operator', 1000); // EXAMPLE: Play for 150ms
        }
        display.value += value;
    }

    function clearDisplay() {
        playSound('audio-clear', 2000); // EXAMPLE: Play for 200ms
        display.value = "";
    }

    function deleteLast() {
        playSound('audio-delete', 2000); // EXAMPLE: Play for 100ms
        display.value = display.value.slice(0, -1);
    }

    function squareRoot() {
        playSound('audio-operator', 2000);
        try {
            const currentValue = parseFloat(display.value);
            if (currentValue < 0) {
                display.value = "Error";
            } else {
                display.value = Math.sqrt(currentValue);
            }
        } catch {
            display.value = "Error";
        }
    }

    function calculate() {
        playSound('audio-equals', 2000); // EXAMPLE: Play for 300ms
        try {
            let expression = display.value.replace(/%/g, '/100');
            display.value = eval(expression);
        } catch {
            display.value = "Error";
        }
    }

    // --- Event Listener (No changes needed here) ---
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            switch (value) {
                case 'C':
                    clearDisplay();
                    break;
                case '⌫':
                    deleteLast();
                    break;
                case '√':
                    squareRoot();
                    break;
                case '=':
                    calculate();
                    break;
                default:
                    appendValue(value);
                    break;
            }
        });
    });
});