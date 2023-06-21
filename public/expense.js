document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  axios.get('/expense/details')
    .then(response => {
      const expenses = response.data;

      const expenseList = document.getElementById('expense-list');

      expenseList.innerHTML = '';

      expenses.forEach(expense => {

        const listItem = document.createElement('li');
        listItem.setAttribute('id', `expense-item-${expense.id}`);
        const date = new Date(expense.date).toLocaleDateString();

        listItem.innerHTML = `
          <strong>Amount:</strong> Rs. ${expense.amount} |
          <strong>Type:</strong> ${expense.type} |
          <strong>Date:</strong> ${date} |
          <button class="btn btn-delete" data-expense-id="${expense.id}">Delete</button>
        `;
        expenseList.appendChild(listItem);
      });

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

  axios.get(`/user/${userId}/premium`)
    .then(response => {
      const isPremium = response.data.isPremium;

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
  const amount = 99; 
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');

  axios.post('/create-order', { amount: amount, userId: userId })
    .then(function(response) {
      const orderId = response.data.orderId;

      const options = {
        key: 'rzp_test_Gm7xr3DBOIyVKR', 
        amount: amount * 100,
        currency: 'INR',
        name: 'Premium Subscription',
        description: 'Upgrade to premium',
        order_id: orderId,

        handler: function(response) {
          const paymentId = response.razorpay_payment_id;
          const signature = response.razorpay_signature;

          axios.post('/verify-payment', {
            orderId: orderId,
            paymentId: paymentId,
            signature: signature,
            userId: userId
          })
          .then(function(response) {
            if (response.data.success) {
              alert('Transaction successful!');
              window.location.reload();
            } else {
              alert('TRANSACTION FAILED');
            }
          })
          .catch(function(error) {
            console.error('Payment verification error:', error);
          });
        },
        prefill: {
          name: 'Nirmalya Sengupta',
          email: 'nirmalya@example.com', 
          contact: '877762618' 
        }
      };

      const rzpInstance = new Razorpay(options);
      rzpInstance.open();
    })
    .catch(function(error) {
      console.error('Order creation error:', error);
    });
});
  