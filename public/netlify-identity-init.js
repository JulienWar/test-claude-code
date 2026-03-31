if (window.netlifyIdentity) {
  window.netlifyIdentity.on('init', function (user) {
    if (!user) {
      window.netlifyIdentity.once('login', function () {
        document.location.href = '/admin/';
      });
    }
  });
}
