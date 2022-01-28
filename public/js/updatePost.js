const updatePost = async (event) => {
    const name = document.querySelector('#updatepost-title').value.trim();
    const description = document.querySelector('#updatepost-content').value.trim();
    const id = document.querySelector('#current-post-id').value.trim();
  
    if (name && description) {
      const response = await fetch('/api/post/'+id, {
        method: 'PUT',
        body: JSON.stringify({ name, description}),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update.');
      }
    }
  };

  const deletePost = async (event) => {
    const id = document.querySelector('#current-post-id').value.trim();
  
    if (id) {
      const response = await fetch('/api/post/'+id, {
        method: 'DELETE',
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete.');
      }
    }
  };
  
  document
  .querySelector('#update-post')
  .addEventListener('click', updatePost);

  document
  .querySelector('#delete-post')
  .addEventListener('click', deletePost);

  