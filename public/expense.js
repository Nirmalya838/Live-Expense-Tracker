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

  const userId = new URLSearchParams(window.location.search).get('userId');

  // API request to check if the user is a premium user
  axios.get(`/user/${userId}/premium`)
    .then(response => {
      const isPremium = response.data.isPremium;

      // Disable the "Buy Premium" button if the user is already a premium user
      const rzpButton = document.getElementById('rzp');
      if (isPremium) {
        rzpButton.textContent = 'Premium User';
        rzpButton.disabled = true;
        rzpButton.style.backgroundColor = '#ccc';
        rzpButton.style.color = "black";
        rzpButton.style.pointerEvents = 'none';
      }

      const ldbButton = document.getElementById('ldb');
      if (isPremium) {
        ldbButton.style.display = 'inline-block';
          }
          else {
            ldbButton.style.display = 'none';
          }
    })
    .catch(error => {
      console.error('Error fetching user premium status:', error);
    });

});

const rzpButton = document.getElementById('rzp');
rzpButton.addEventListener('click', function() {
  const amount = 99; // Set the amount to 99 rupees
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');

  // Create an order on the server-side
  axios.post('/create-order', { amount: amount, userId: userId })
    .then(function(response) {
      const orderId = response.data.orderId;

      // Redirect the user to Razorpay payment page
      const options = {
        key: 'rzp_test_Gm7xr3DBOIyVKR', // Replace with your actual API key
        amount: amount * 100, // Razorpay amount should be in paise (multiply by 100 for rupees)
        currency: 'INR', // Replace with your desired currency code
        name: 'Premium Subscription', // Replace with your product or service name
        description: 'Upgrade to premium', // Replace with your product or service description
        order_id: orderId, // Pass the order ID received from the server
        handler: function(response) {
          const paymentId = response.razorpay_payment_id;
          const signature = response.razorpay_signature;

          // Send the payment details to the server for verification
          axios.post('/verify-payment', {
            orderId: orderId,
            paymentId: paymentId,
            signature: signature,
            userId: userId
          })
          .then(function(response) {
            if (response.data.success) {
              // Transaction successful
              alert('Transaction successful!');
              // Update the UI or perform other actions upon success
              window.location.reload();
            } else {
              // Transaction failed
              alert('TRANSACTION FAILED');
              // Update the UI or perform other actions upon failure
            }
          })
          .catch(function(error) {
            console.error('Payment verification error:', error);
          });
        },
        prefill: {
          name: 'John Doe', // Replace with the user's name
          email: 'john@example.com', // Replace with the user's email
          contact: '9876543210' // Replace with the user's contact number
        }
      };

      const rzpInstance = new Razorpay(options);
      rzpInstance.open();
    })
    .catch(function(error) {
      console.error('Order creation error:', error);
    });
});
  