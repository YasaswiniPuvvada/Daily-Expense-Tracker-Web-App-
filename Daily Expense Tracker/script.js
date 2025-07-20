document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalExpenses = document.getElementById('total-expenses');

    // Get expenses from localStorage or initialize an empty array
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Function to render expenses to the UI
    const renderExpenses = () => {
        expenseList.innerHTML = ''; // Clear the list
        let total = 0;

        expenses.forEach((expense, index) => {
            // Create list item
            const li = document.createElement('li');
            li.className = 'expense-item';

            // Set a data-category attribute to style the card based on its category
            li.setAttribute('data-category', expense.category);
            
            li.innerHTML = `
                <div class="expense-info">
                    <div class="description">${expense.description}</div>
                    <div class="category">${expense.category}</div>
                </div>
                <div class="expense-amount">₹${expense.amount.toFixed(2)}</div>
                <button class="delete-btn" data-index="${index}">✕</button>
            `;
            expenseList.appendChild(li);

            // Add to total
            total += expense.amount;
        });

        // Update total expenses display
        totalExpenses.textContent = total.toFixed(2);

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteExpense);
        });
    };

    // Function to add a new expense
    const addExpense = (event) => {
        event.preventDefault();

        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;

        if (description && amount > 0 && category) {
            const newExpense = {
                description,
                amount,
                category
            };

            expenses.push(newExpense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
            expenseForm.reset();
        } else {
            alert('Please fill in all fields with valid values.');
        }
    };

    // Function to delete an expense
    const deleteExpense = (event) => {
        const index = event.target.getAttribute('data-index');
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    // Event listeners
    expenseForm.addEventListener('submit', addExpense);

    // Initial render
    renderExpenses();
});