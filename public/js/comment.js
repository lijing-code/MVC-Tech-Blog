// link each post from the homepage
const commentFormHandler = async (event) => {
    event.preventDefault();
    const description = document.querySelector('#comment-content').value.trim();
    const post_id = document.querySelector('#post-id-to-comment').value.trim();
  
    if (post_id && description) {
  
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ post_id, description }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed.');
      }
    }
  };
  
  document
    .querySelector('.create-comment')
    .addEventListener('click', commentFormHandler);