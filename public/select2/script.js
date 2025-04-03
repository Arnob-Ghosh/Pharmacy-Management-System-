function mockData() {
  // return _.map(_.range(1, 20000), function(i) {
  //   return {
  //     id: i,
  //     text: shuffle('shuffle this string') + ' ' + i,
  //   };
  // });
  return $.ajax({
      url: "/get-product-data",
      dataType: 'json'
  });
}
(function() {
  // init select 2
  $('#test').select2({
    data: mockData(),
    placeholder: 'search',
    multiple: true,
    // query with pagination
    query: function(q) {
      var pageSize,
        results,
        that = this;
      pageSize = 20; // or whatever pagesize
      results = [];
      if (q.term && q.term !== '') {
        // HEADS UP; for the _.filter function i use underscore (actually lo-dash) here
        results = _.filter(that.data, function(e) {
          return e.text.toUpperCase().indexOf(q.term.toUpperCase()) >= 0;
        });
      } else if (q.term === '') {
        results = that.data;
      }
      q.callback({
        results: results.slice((q.page - 1) * pageSize, q.page * pageSize),
        more: results.length >= q.page * pageSize,
      });
    },
  });
})();


