document.addEventListener('DOMContentLoaded', function () {
    const achievementsList = document.getElementById('achievements-list');
    const achievements = [
        { 
            id: 'study-60', 
            name: 'Study 60 Minutes', 
            condition: (totalStudyTime) => totalStudyTime >= 60, 
            progress: (totalStudyTime) => Math.min((totalStudyTime / 60) * 100, 100) 
        },
        { 
            id: 'study-90', 
            name: 'Study 90 Minutes', 
            condition: (totalStudyTime) => totalStudyTime >= 90, 
            progress: (totalStudyTime) => Math.min((totalStudyTime / 90) * 100, 100) 
        },
        { 
            id: 'study-120', 
            name: 'Study 120 Minutes', 
            condition: (totalStudyTime) => totalStudyTime >= 120, 
            progress: (totalStudyTime) => Math.min((totalStudyTime / 120) * 100, 100) 
        },
        { 
            id: 'complete-5-tasks', 
            name: 'Complete 5 Tasks', 
            condition: (completedTasks) => completedTasks >= 5, 
            progress: (completedTasks) => Math.min((completedTasks / 5) * 100, 100) 
        },
        { 
            id: 'complete-10-tasks', 
            name: 'Complete 10 Tasks', 
            condition: (completedTasks) => completedTasks >= 10, 
            progress: (completedTasks) => Math.min((completedTasks / 10) * 100, 100) 
        }
    ];

    function checkAchievements() {
        const totalStudyTime = parseInt(localStorage.getItem('totalStudyTime')) || 0; // Total waktu belajar
        const completedTasks = getCompletedTasksCount(); // Total tugas selesai dari todo.js

        achievementsList.innerHTML = '';

        achievements.forEach(achievement => {
            const progress = achievement.progress(
                achievement.id.startsWith('study') ? totalStudyTime : completedTasks
            );

            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <span>${achievement.name}</span>
                    <span>${progress.toFixed(2)}%</span>
                </div>
                <div class="progress mt-2">
                    <div class="progress-bar" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            `;

            if (achievement.condition(
                achievement.id.startsWith('study') ? totalStudyTime : completedTasks
            )) {
                li.classList.add('list-group-item-success');
            }
            achievementsList.appendChild(li);
        });
    }

    function getCompletedTasksCount() {
        const items = JSON.parse(localStorage.getItem('todo-items')) || [];
        return items.filter(item => item.completed).length;
    }

    // Event untuk memeriksa pencapaian
    document.addEventListener('updateAchievements', checkAchievements);

    // Periksa pencapaian saat halaman dimuat
    checkAchievements();
});
