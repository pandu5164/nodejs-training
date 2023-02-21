exports.get404 = (req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
    res.status(404).render('404', {pageTitle: 'Page Not Found', text: 'Page not found Amigos!!!', path: '/404'}); // Note: the way we pass data to template doesn't change with the template engine change
}