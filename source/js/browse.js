YUI().use('node', 'event', 'handlebars', 'jsonp', 'router', 'gallery-paginator', 'anim', function (Y) {  
  'use strict';

  var itemsTemplateSource = Y.one('#items').getHTML();
  var itemsTemplate = Y.Handlebars.compile(itemsTemplateSource);
  var router = new Y.Router();
    
  function getRoute() {
    var pageQueryString = getParameterByName('page');
    var sortQueryString = getParameterByName('sort');
    var page = ( pageQueryString ) ? pageQueryString : 1;
    var route = router.getPath() + '?page=' + page;
    if (sortQueryString) {
      route = route + '&sort=' + sortQueryString;
    }
    return route;
  }

  function getRouteChangedParameters() {
    // when filter or sort is changed, we should go back to the first page
    var sortQueryString = getParameterByName('sort');
    var route = router.getPath();
    if ( sortQueryString ) {
      route = route + '&sort=' + sortQueryString;
    }    
    return route;
  }

  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");        
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }      

  router.route(router.getPath(), function(req) {
    var node = Y.one('[data-name="items"]');
    var data = node.getData();
    var rows = (req.query.rows) ? req.query.rows : ( ( data.rows ) ? data.rows : 10 );
    var sort = (req.query.sort) ? req.query.sort : ( ( data.sort ) ? data.sort : Y.one('#browse-select').get('value') );
    var page = (req.query.page) ? parseInt( req.query.page, 10 ) : 0;
    var start = 0;
    if (page <= 1) {
      start = 0;
    } else {
      start = (page * rows) - rows;
    }
    initRequest({
      container: node,
      start: start,
      page: page,
      rows: rows, 
      sort: sort
    });
        
  });
    
  function onSelectChange() {
    Y.all('#browse-select option').each(function(node) {
      var t = node.get("text");
      t = t.replace("Sorting by", "Sort by");
      node.set("text", t);
    });
    var t2 = Y.one("#browse-select option:checked").get("text");
    t2 = t2.replace("Sort by", "Sorting by");
    Y.one("#browse-select option:checked").set("text", t2)      
    router.replace(getRouteChangedParameters());
  }
    
  function onFailure(_response, args) {
    var data = args.container.getData()
    var requestError = data.requesterror;          
    if (!requestError) {
      args.container.setAttribute('data-requesterror', 1);
      requestError = 1;
    } else {
      requestError = parseInt(requestError, 10) + 1;
      args.container.setAttribute('data-requesterror', requestError);
    }
      
    /** there try 3 more times before giving up */
    if ( requestError < 3 ) {
      router.replace( getRoute () );
    } else {
      Y.log('onFailure: there was a problem with this request');
    }
  }

  function onTimeout() {
    onFailure();
  }
    
  function update(state) {  
    this.setPage(state.page, true);
    this.setRowsPerPage(state.rowsPerPage, true);
    this.setTotalRecords(state.totalRecords, true);
    router.save(router.getPath() + '?page=' + state.page);
  }
    
  function initPaginator(page, totalRecords, rowsPerPage) {        
    Y.one('#paginator').empty();
    var paginatorConfiguration = {
      totalRecords: totalRecords, 
      rowsPerPage: rowsPerPage, 
      initialPage: page, 
      template: '{FirstPageLink} {PageLinks} {NextPageLink}'
    }
    var paginator = new Y.Paginator(paginatorConfiguration);

    paginator.on('changeRequest', update);
          
    if (totalRecords > rowsPerPage) {
      paginator.render('#paginator');
    }
  }

  function onSuccess(response, args) {        
    try {        
      var node = args.container
      var resultsnum = Y.one('.resultsnum');
      var page = ( args.page ) ? args.page : 1;
      var numfound = parseInt(response.response.numFound, 10);
      var numfoundNode = resultsnum.one('.numfound');
      var start = parseInt(response.response.start, 10);
      var displayStart = ( start < 1 ) ? 1 : (start + 1);
      var startNode = resultsnum.one('.start');
      var docslengthNode = resultsnum.one('.docslength');
      var docslength = parseInt(response.response.docs.length, 10);
      var body = Y.one('body')
      var rows = args.rows;
      initPaginator(page, numfound, rows);
      node.setAttribute('data-numFound', numfound);
      node.setAttribute('data-start', start);
      node.setAttribute('data-docsLength', docslength);
      startNode.set('innerHTML', displayStart);
      docslengthNode.set('innerHTML', start + docslength);
      numfoundNode.set('innerHTML', numfound);
      node.append(
        itemsTemplate({
          items : response.response.docs,
          app: {
            appRoot: body.getAttribute('data-app'),
            viewer: body.getAttribute('data-viewer'),
          }
        })
      );            
      args.container.setAttribute('data-requesterror', 0);
      Y.one('body').removeClass('io-loading');
    } catch (e) {}
  }

  function initRequest ( options ) {
    
        var start = 0
          , page = 0
          , sortData = Y.one('#browse-select :checked')
          , sortBy = sortData.get('value')
          , sortDir = sortData.getAttribute( "data-sort-dir" )
          , data = options.container.getData()
          , source = Y.one('body').getAttribute('data-discoUrl')
          , fl = ( data.fl ) ? data.fl : '*'
          , rows = ( data.rows ) ? data.rows : 10
       //   , yearChosenNode = Y.one('#filter-year :checked')
        //  , yearWhich = yearChosenNode.get('value')
        //  , pubChosenNode = Y.one('#filter-publisher :checked')
         // , pubWhich = pubChosenNode.get('value')
          , fq = [];

        Y.one('body').addClass('io-loading');
        
        /** find all data-fq and push the value into fq Array*/
        for ( var prop in data ) {
            if ( data.hasOwnProperty( prop ) ) {
                if ( prop.match('fq-') ) {
                  fq.push( prop.replace('fq-', '') + ':' + data[prop] );
              }
            }
        }
     
     //   fq.push('ss_pubdate:' + yearWhich );
     //   fq.push('ss_spublisher:' + pubWhich );
        if ( options.page ) {
            page = parseInt( options.page, 10 );
        }

        if ( options.start ) {
            start = parseInt( options.start, 10 );
        }

        if ( options.rows ) {
            rows = parseInt( options.rows, 10 );
        }
        
        source = source 
               + "?"
               + "wt=json"
               + "&json.wrf=callback={callback}"
               + "&q=*"
               + "&fl=" + fl
               + "&fq=" + fq.join("&fq=")
               + "&rows=" + rows
               + "&start=" + start
               + "&sort=" + sortBy + "%20" + sortDir;

        options.container.empty();

        Y.jsonp( source, {
            on: {
                success: onSuccess,
                failure: onFailure,
                timeout: onTimeout
            },
            args: options,
            timeout: 3000
        });
    
    }
    
    router.replace( getRoute () );
    
    // Sorts and filters
    Y.one('body').delegate('change', onSelectChange, '#browse-select');
    Y.one('body').delegate('change', onSelectChange, '#filter-year');
    Y.one('body').delegate('change', onSelectChange, '#filter-publisher');
    

});
