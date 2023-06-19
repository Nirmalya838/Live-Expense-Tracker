document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  axios.get('/expense/details')
    .then(response => {
      const expenses = response.data;

      // Get the <ul> element where we'll display the expenses
      const expenseList = document.getElementById('expense-list');

      // Clear any existing expense list items
      expenseList.innerHTML = '';

      // Iterate over each expense and create a list item
      expenses.forEach(expense => {
        // Create the list item element
        const listItem = document.createElement('li');
        listItem.setAttribute('id', `expense-item-${expense.id}`);

        // Get the date string without the time portion
        const date = new Date(expense.date).toLocaleDateString();

        // Set the list item content
        listItem.innerHTML = `
          <strong>Amount:</strong> Rs. ${expense.amount} |
          <strong>Type:</strong> ${expense.type} |
          <strong>Date:</strong> ${date} |
          <button class="btn btn-delete" data-expense-id="${expense.id}">Delete</button>
        `;

        // Append the list item to the expense list
        expenseList.appendChild(listItem);
      });

      // Add event listeners to the delete buttons
      const deleteButtons = document.querySelectorAll('.btn-delete');
      deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
          const expenseId = button.dataset.expenseId;
          deleteExpense(expenseId);
        });
      });
    })
    .catch(error => {
      console.error('Error fetching expenses:', error);
    });

  function deleteExpense(expenseId) {
    const userId = new URLSearchParams(window.location.search).get('userId');
    axios.delete(`/expense/delete/${expenseId}?userId=${userId}`)
      .then(response => {
        // Remove the deleted expense from the UI
        console.log(response.data);
        const listItem = document.getElementById(`expense-item-${expenseId}`);
        if (listItem) {
          listItem.remove();
        }
      })
      .catch(error => {
        console.error('Error deleting expense:', error);
      });
  }
});

