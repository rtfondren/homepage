
/*
 * GET blog page
 */

exports.index = function(req, res) {
	var ap = res.app.settings['view options'].ArticleProvider;
	ap.findAll(function(error, docs) {
		res.render('blog',
			{ title: 'RTFBlog',
			  articles: docs }
		);
	});
	//res.render('blog', { title: 'Taylor Fondren' });
};

exports.create = function(req, res) {
	var message = null;
	var ap = res.app.settings['view options'].ArticleProvider;
	if (req.body.submit) {
		ap.save({
			title: req.body.title,
			body: req.body.body
		}, function(error, docs) {
			res.redirect('/blog');
		});
	}

	res.render('blog_new',
		{ title: "New Entry",
		  message: message }
	);
};

exports.article = function(req, res) {
	var ap = res.app.settings['view options'].ArticleProvider;
	ap.findById(req.params.id, function(error, article) {
		res.render('article',
			{ title: article.title,
			  article: article }
		);
	});
};

exports.addComment = function(req, res) {
	var ap = res.app.settings['view options'].ArticleProvider;
	ap.addCommentToArticle(req.body._id, {
			person: req.body.person,
			comment: req.body.comment,
			created_at: new Date() },
		function(error, docs) {
			res.redirect('/blog/' + req.body._id);
		}
	);
};


