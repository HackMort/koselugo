document.addEventListener("DOMContentLoaded", () => {

    const accessCookie = document.cookie.split(';').filter((item) => item.trim().startsWith('accessCookie=')).pop();
    
     if (!accessCookie && accessCookie !== 'accessCookie=K0S3luG0' && window.location.pathname !== '/validate.html') {
    
     window.location.href = '/validate.html';
    
     }
    
     // Validate Form
    
     const form = document.querySelector('.form__validate');
    
     if (form) {
    
     form.addEventListener('submit', (e) => {
    
     e.preventDefault();
    
     const accessCode = form.querySelector('input[name="access-code"]').value;
    
     if (accessCode === 'K0S3luG0') {
    
     document.cookie = `accessCookie=${accessCode};max-age=604800`; // 1 week
    
     window.location.href = '/index.html';
    
     } else {
    
     alert('Invalid Access Code');
    
     }
    
     });
    
     }
    
    });