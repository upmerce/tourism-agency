fetch('/api/admin/set-admin-claim', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: 'upmerce@gmail.com' // <-- IMPORTANT: CHANGE THIS!
    }),
})
.then(res => res.json())
.then(data => console.log(data));