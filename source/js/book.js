YUI().use(
  'node', 'anim', 'crossframe', 'router', 'event-resize', 'querystring-parse',
  function (Y) {
    'use strict';

    var params = { 'lang' : 'en' };

    if (window.location.search.length){
      params = Y.QueryString.parse(window.location.search.replace(/\?/i, ''))
    }

    var body = Y.one('body');
    var widget = Y.one('.widget.book');
    var appRoot = body.getAttribute("data-appRoot");
    
    body.addClass('io-loading');

    function resizeBookView() {
      widget.setStyles({
        height: calculateAvailableHeight()
      });
    }

    function calculateAvailableHeight() {
      var loadingAnimation = '';
      var loaderHeight = 0;
      var siblings = widget.siblings();
      var viewport = Y.DOM.viewportRegion();
      var availableHeight = viewport.height;
      // Push the iframe down 5px to make up for the 5 pixels
      // space created by the curved corners of the browser?
      // Not elegant but to consider.
      // availableHeight += 5;
      siblings.each(function(node) {
        availableHeight = availableHeight - node.get('offsetHeight');
      });
      if (body.hasClass('io-loading')) {
        loadingAnimation = Y.one('.bubblingG');
        loaderHeight = loadingAnimation.get('offsetHeight');
      }
      return availableHeight + loaderHeight;
    }

    function hideSiblings() {
      widget.siblings().each(function(node) {
        node.addClass('hiddenSiblings');
      });
      resizeBookView();
    }

    function showSiblings() {
      widget.siblings().each(function(node) {
        node.removeClass('hiddenSiblings');
      });
      resizeBookView();
    }

    function requestReplaceLoadBook(request) {
      var src = widget.getAttribute('data-sourceUrl');
      var identifier = request.params.identifier;
      var page = (request.params.page) ? request.params.page : 1;
      widget.setAttribute('data-identifier', identifier);
      if (request.src === 'replace') {
        src = src + '/books/' + request.params.identifier + '/' + page + '?embed=1&lang=' + params.lang;
        widget.set('src', src);
      }
    }

    var router = new Y.Router({ root: appRoot, routes: [{ path: '/book/:identifier/:page', callbacks: requestReplaceLoadBook }, { path: '/book/:identifier', callbacks: requestReplaceLoadBook }]});

    Y.on('windowresize', resizeBookView);

    Y.on('button:button-fullscreen:on', hideSiblings);

    Y.on('button:button-fullscreen:off', showSiblings);

    Y.on('openlayers:change', function(data) {
      router.save('/book/' + widget.getAttribute('data-identifier') + '/' + data.sequence);
    });

  Y.on('change:option:multivolume', function(data) {
	  var parts = data.url.split('/');
	  if (parts[3]) {
	    var route = '/book/' + parts[3] + '/1';
	    router.replace(route);
	  }
  });

  Y.on('viewer:sequence:change', (data) => {
    router.save('/book/' + widget.getAttribute('data-identifier') + '/' + data.sequence);
  });

  Y.on('viewer:sequence:increase', (data) => {
    router.save('/book/' + widget.getAttribute('data-identifier') + '/' + data.sequence);
  });

  Y.on('viewer:sequence:decrease', (data) => {
    router.save('/book/' + widget.getAttribute('data-identifier') + '/' + data.sequence);
  });

  window.addEventListener('message', function (event) {
    var data = JSON.parse(event.data)
    if (data.fire) {
      Y.fire(data.fire, data.message)
    }
  }, false)

  widget.on('load', function() {
      var anim = new Y.Anim({
        node: this,
        to: {
          opacity: 1
        },
        duration: 0.3
      });
      resizeBookView();
      anim.run();
      body.removeClass('io-loading');
  });

  resizeBookView();

  // initial request
  router.replace(router.getPath());

});
