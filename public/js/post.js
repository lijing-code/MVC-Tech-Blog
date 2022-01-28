const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#newpost-title').value.trim();
    const discription = document.querySelector('#content-for-newpost').value.trim();
  
    if (name && discription) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ name, discription }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Please make sure all the fields have been filled!');
      }
    }
  };
  
  document
    .querySelector('.newpost-form')
    .addEventListener('submit', newPostFormHandler);
  