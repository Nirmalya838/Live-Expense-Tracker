const fgtBtn = document.getElementById('fgtBtn');
const fgtForm = document.getElementById('fgtForm');

      fgtBtn.addEventListener('click', () => {
        fgtForm.style.display = 'block';
      });

      // Handle form submission and call the backend API route
      const forgotPasswordForm = document.getElementById('forgotPassword');
      const forgotPasswordSubmit = document.getElementById('forgotPasswordSubmit');

      forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(forgotPasswordForm);
        const email = formData.get('email');

        try {
          const response = await axios.post('/password/forgotpassword', { email });
          // Handle the response or show a success message to the user
          console.log(response.data);
        } catch (error) {
          // Handle any errors or show an error message to the user
          console.error(error);
        }
      });