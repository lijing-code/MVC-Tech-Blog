// link each post from the homepage
const commentFormHandler = async (event) => {
    event.preventDefault();
    const description = document.querySelector('#comment').value.trim();
    const id = document.querySelector('#post-name-to-comment').value.trim();
  
    if (id && description) {
  
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ id, description }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed add comment.');
      }
    }
  };
  
  document
    .querySelector('.create-comment')
    .addEventListener('click', commentFormHandler);