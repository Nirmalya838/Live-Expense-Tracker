document.addEventListener('DOMContentLoaded', () => {
  const leadersList = document.getElementById('leader-list');

  axios.get('/user/details') 
    .then(response => {
      const users = response.data;

      users.sort((a, b) => b.total - a.total); 

      leadersList.innerHTML = '';

      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.setAttribute('id', `leader-item-${user.id}`);
        
        listItem.innerHTML = `
          <strong>Name:</strong> ${user.name} |
          <strong>Total Expense:</strong> Rs. ${user.total} |
        `;
        leadersList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
});
