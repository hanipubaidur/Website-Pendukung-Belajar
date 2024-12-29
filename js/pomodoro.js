document.addEventListener('DOMContentLoaded', function () {
    let timer;
    let isStudyTime = JSON.parse(localStorage.getItem('isStudyTime')) ?? true;
    let remainingTime = parseInt(localStorage.getItem('remainingTime')) || 0;
    let startTime = parseInt(localStorage.getItem('startTime')) || null;
    let totalStudyTime = parseInt(localStorage.getItem('totalStudyTime')) || 0;
    let isTimerStopped = JSON.parse(localStorage.getItem('isTimerStopped')) || false;

    const timerDisplay = document.getElementById('timer-display');
    const studyTimeInput = document.getElementById('study-time');
    const breakTimeInput = document.getElementById('break-time');
    const startButton = document.getElementById('start-timer');
    const resetButton = document.getElementById('reset-timer');
    const totalStudyTimeDisplay = document.getElementById('total-study-time');
    const startTimeDisplay = document.getElementById('start-time');
    const finishTimeDisplay = document.getElementById('finish-time');

    // Tambahkan tombol stop secara dinamis
    const stopButton = document.createElement('button');
    stopButton.id = 'stop-timer';
    stopButton.className = 'btn btn-danger mb-2 ms-1';
    stopButton.textContent = 'Stop Timer';
    startButton.insertAdjacentElement('afterend', stopButton);

    function updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function formatTime(unixTime) {
        const date = new Date(unixTime * 1000);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    function startTimer(duration) {
        clearInterval(timer);
        const now = Math.floor(Date.now() / 1000);
        if (!startTime) {
            startTime = now;
        }
        remainingTime = duration;
        isTimerStopped = false;

        localStorage.setItem('startTime', startTime);
        localStorage.setItem('remainingTime', remainingTime);
        localStorage.setItem('isTimerStopped', isTimerStopped);

        startTimeDisplay.textContent = formatTime(startTime);
        updateTimerDisplay(remainingTime); // Tampilkan angka awal sebelum hitung mundur dimulai

        timer = setInterval(() => {
            if (isTimerStopped) {
                clearInterval(timer);
                return;
            }

            remainingTime -= 1;
            localStorage.setItem('remainingTime', remainingTime);

            if (remainingTime <= 0) {
                clearInterval(timer);
                updateTimerDisplay(0);
                handleTimerEnd();
            } else {
                updateTimerDisplay(remainingTime);
            }
        }, 1000);
    }

    function handleTimerEnd() {
        const now = Math.floor(Date.now() / 1000);
        finishTimeDisplay.textContent = formatTime(now);

        if (isStudyTime) {
            totalStudyTime += parseInt(studyTimeInput.value);
            totalStudyTimeDisplay.textContent = totalStudyTime;
            localStorage.setItem('totalStudyTime', totalStudyTime);

            document.dispatchEvent(new Event('updateAchievements'));
        }

        isStudyTime = !isStudyTime;
        localStorage.setItem('isStudyTime', isStudyTime);
    }

    function stopTimer() {
        isTimerStopped = true;
        clearInterval(timer);

        const now = Math.floor(Date.now() / 1000);
        finishTimeDisplay.textContent = formatTime(now);

        const elapsed = Math.floor((now - startTime));
        const elapsedMinutes = Math.floor(elapsed / 60);

        if (isStudyTime) {
            totalStudyTime += elapsedMinutes;
            totalStudyTimeDisplay.textContent = totalStudyTime;
            localStorage.setItem('totalStudyTime', totalStudyTime);

            document.dispatchEvent(new Event('updateAchievements'));
        }

        localStorage.setItem('isTimerStopped', isTimerStopped);

        // Perbarui pencapaian secara eksplisit
        document.dispatchEvent(new Event('updateAchievements'));
    }

    function resetTimer() {
        clearInterval(timer);
        timerDisplay.textContent = '00:00';
        totalStudyTime = 0;
        isStudyTime = true;
        remainingTime = 0;
        startTime = null;
        isTimerStopped = false;

        localStorage.removeItem('totalStudyTime');
        localStorage.removeItem('isStudyTime');
        localStorage.removeItem('remainingTime');
        localStorage.removeItem('startTime');
        localStorage.removeItem('isTimerStopped');

        totalStudyTimeDisplay.textContent = '0';
        startTimeDisplay.textContent = 'N/A';
        finishTimeDisplay.textContent = 'N/A';
    }

    startButton.addEventListener('click', function () {
        isTimerStopped = false;
        localStorage.setItem('isTimerStopped', isTimerStopped);

        const studyTime = parseInt(studyTimeInput.value) * 60;
        const breakTime = parseInt(breakTimeInput.value) * 60;

        if (isNaN(studyTime) || isNaN(breakTime)) {
            alert('Please enter valid times.');
            return;
        }

        const duration = isStudyTime ? studyTime : breakTime;
        startTimer(duration);
    });

    stopButton.addEventListener('click', stopTimer);

    resetButton.addEventListener('click', resetTimer);

    if (remainingTime > 0 && startTime) {
        startTimeDisplay.textContent = formatTime(startTime);
        startTimer(remainingTime);
    } else {
        timerDisplay.textContent = '00:00';
        startTimeDisplay.textContent = 'N/A';
        finishTimeDisplay.textContent = 'N/A';
    }

    totalStudyTimeDisplay.textContent = totalStudyTime;
});
