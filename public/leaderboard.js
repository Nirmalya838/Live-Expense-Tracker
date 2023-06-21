  document.addEventListener('DOMContentLoaded', () => {
  const leadersList = document.getElementById('leader-list');

  axios.get('/user/details')
    .then(response => {
      const users = response.data;

      // Sort users by total expense in descending order
      users.sort((a, b) => {
        const totalExpenseA = a.expenses.reduce((sum, expense) => sum + expense.totalExpense, 0);
        const totalExpenseB = b.expenses.reduce((sum, expense) => sum + expense.totalExpense, 0);
        return totalExpenseB - totalExpenseA;
      });

      // Clear any existing leaderboard list items
      leadersList.innerHTML = '';

      // Iterate over each user and create a list item
      users.forEach(user => {
        // Create the list item element
        const listItem = document.createElement('li');
        listItem.setAttribute('id', `leader-item-${user.id}`);

        // Calculate total expenses
        const totalExpense = user.expenses.reduce((sum, expense) => sum + expense.totalExpense, 0);

        // Set the list item content
        listItem.innerHTML = `
          <strong>Name:</strong> ${user.name} |
          <strong>Total Expense:</strong> Rs. ${totalExpense} |
        `;

        // Append the list item to the leaderboard list
        leadersList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
});
