// Function to fetch URL parameter value by name
function getURLParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }
  
  // Get the user ID from the URL parameters
  const userId = getURLParameter('userId');
  
  // Fetch the expense details for the specific user
  fetch('/expense/details')
    .then(response => response.json())
    .then(data => {
      const userExpenses = data.filter(expense => expense.userId == userId);
      const report = generateExpenseReport(userExpenses);
  
      populateTable(report.dailyReport, document.getElementById('dailyReportTable'));
      populateTable(report.monthlyReport, document.getElementById('monthlyReportTable'));
      populateTable(report.yearlyReport, document.getElementById('yearlyReportTable'));
    })
    .catch(error => console.error('Error fetching expense details:', error));
  
  // Function to generate the expense report
  function generateExpenseReport(expenses) {
    const report = {
      dailyReport: {},
      monthlyReport: {},
      yearlyReport: {}
    };
  
    // Calculate the daily expense report
    expenses.forEach(expense => {
      const date = new Date(expense.date).toLocaleDateString();
      if (!report.dailyReport[date]) {
        report.dailyReport[date] = {
          amount: 0,
          type: ''
        };
      }
      report.dailyReport[date].amount += expense.amount;
      report.dailyReport[date].type = expense.type;
    });
  
    // Calculate the monthly expense report
    expenses.forEach(expense => {
      const year = new Date(expense.date).getFullYear();
      const month = new Date(expense.date).getMonth() + 1;
      const monthKey = `${year}-${month}`;
      if (!report.monthlyReport[monthKey]) {
        report.monthlyReport[monthKey] = {
          amount: 0
        };
      }
      report.monthlyReport[monthKey].amount += expense.amount;
    });
  
    // Calculate the yearly expense report
    expenses.forEach(expense => {
      const year = new Date(expense.date).getFullYear();
      if (!report.yearlyReport[year]) {
        report.yearlyReport[year] = {
          amount: 0
        };
      }
      report.yearlyReport[year].amount += expense.amount;
    });
  
    return report;
  }
  
  // Function to populate a table with data
  function populateTable(data, table) {
    const tableBody = table.getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
  
    for (const key in data) {
      const row = document.createElement('tr');
      const dateCell = document.createElement('td');
      const typeCell = document.createElement('td');
      const amountCell = document.createElement('td');
  
      dateCell.textContent = key;
      amountCell.textContent = data[key].amount;
  
      if ('type' in data[key]) {
        typeCell.textContent = data[key].type;
      }
  
      row.appendChild(dateCell);
      row.appendChild(typeCell);
      row.appendChild(amountCell);
  
      tableBody.appendChild(row);
    }
  }
  