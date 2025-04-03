$(document).ready(function(){

 $(document).on('click', '#page-link a', function(event){
    event.preventDefault();

    var page = $(this).attr('href').split('page=')[1];
    var searchPage = $(this).attr('href');

    if(searchPage.indexOf("search") >= 0){

      search_fetch_data(page);
    }else if(searchPage.indexOf("catogory") >= 0){
      category_fetch_data(page)
    }else{

      fetch_data(page);
    }


 });

  function fetch_data(page){
    var _token = $("input[name=_token]").val();
    $.ajax({
        url:"/pagination/fetch?page="+page,
        method:"POST",
        success:function(response){
           $("#products").empty();

            if(response.products.next_page_url == null){
              $("#next").attr("href", '/pos?page=' + parseInt(parseInt(response.products.current_page)))
            }else{
              $("#next").attr("href", '/pos?page=' + parseInt(parseInt(response.products.current_page)+1))
            }

            if(response.products.prev_page_url == null){
              $("#prev").attr("href", '/pos?page=' + parseInt(parseInt(response.products.current_page)))
            }else{
              $("#prev").attr("href", '/pos?page=' + parseInt(parseInt(response.products.current_page)-1))
            }

            $.each(response.products.data, function(key, item) {

            if(item.productImage == null){
              productImage = "default.jpg"
            }else{
              productImage = item.productImage
            }

            if(item.category_image == null){
              category_image = "default.jpg"
            }else{
              category_image = item.category_image
            }

            if(item.totalOnHand == 0){
                $("#products").append('\
                <div class="col-md-2 clearfix d-none d-sm-block">\
                      <div class="card card-primary mb-2">\
                          <button class="add-btn" value="'+item.id+'" disabled>\
                              <center style="margin-top:1rem; overflow: hidden;">\
                                  <p style="font-size: medium; margin-bottom: auto;" class="pos-card-text-body"><span><b>'+item.category_name+'</b></span></p>\
                              </center>\
                            <div class="card-body" style="padding: 0.25rem;" >\
                                <h5 style="font-size: small;" class="pos-card-text-title wordWrap" data-toggle="tooltip" data-placement="top" title="'+item.productName+'('+item.strength+')">'+item.productName+'('+item.strength+')</h5>\
                                <p style="font-size: small;" class="pos-card-text-body text-danger"><strong>Stock out</strong></p>\
                            </div>\
                        </button>\
                    </div>\
                </div>');
            }else{
                $("#products").append('\
                <div class="col-md-2 clearfix d-none d-sm-block">\
                      <div class="card card-primary mb-2">\
                          <button class="add-btn" value="'+item.id+'">\
                              <center style="margin-top:1rem; overflow: hidden;">\
                                  <p style="font-size: medium; margin-bottom: auto;" class="pos-card-text-body"><span><b>'+item.category_name+'</b></span></p>\
                              </center>\
                            <div class="card-body" style="padding: 0.25rem;"  >\
                                <h5 style="font-size: small;" class="pos-card-text-title wordWrap"  data-toggle="tooltip" data-placement="top" title="'+item.productName+'('+item.strength+')">'+item.productName+'('+item.strength+')</h5>\
                                <p style="font-size: small;" class="pos-card-text-body">In Stock: <span>'+item.totalOnHand+'</span></p>\
                            </div>\
                        </button>\
                    </div>\
                </div>');
            }
          })

        }
    });
  }

  function search_fetch_data(page){
    var _token = $("input[name=_token]").val();

    var keyword = $('#hiddensearchkeyword').val();
    $.ajax({
        url:"/pagination/search/"+keyword+"/fetch?page="+page,
        method:"POST",
        success:function(response){
           $("#products").empty();

            if(response.products.next_page_url == null){
              $("#next").attr("href", '/pos/search?page=' + parseInt(parseInt(response.products.current_page)))
            }else{
              $("#next").attr("href", '/pos/search?page=' + parseInt(parseInt(response.products.current_page)+1))
            }

            if(response.products.prev_page_url == null){
              $("#prev").attr("href", '/pos/search?page=' + parseInt(parseInt(response.products.current_page)))
            }else{
              $("#prev").attr("href", '/pos/search?page=' + parseInt(parseInt(response.products.current_page)-1))
            }

            $.each(response.products.data, function(key, item) {

            if(item.productImage == null){
              productImage = "default.jpg"
            }else{
              productImage = item.productImage
            }

            if(item.category_image == null){
              category_image = "default.jpg"
            }else{
              category_image = item.category_image
            }

            if(item.totalOnHand == 0){
                $("#products").append('\
                <div class="col-md-2 clearfix d-none d-sm-block">\
                      <div class="card card-primary mb-2">\
                          <button class="add-btn" value="'+item.id+'" disabled>\
                              <center style="margin-top:1rem; overflow: hidden;">\
                                  <p style="font-size: medium; margin-bottom: auto;" class="pos-card-text-body"><span><b>'+item.category_name+'</b></span></p>\
                              </center>\
                            <div class="card-body" style="padding: 0.25rem;" >\
                                <h5 style="font-size: small;" class="pos-card-text-title wordWrap" data-toggle="tooltip" data-placement="top" title="'+item.productName+'('+item.strength+')">'+item.productName+'('+item.strength+')</h5>\
                                <p style="font-size: small;" class="pos-card-text-body text-danger"><strong>Stock out</strong></p>\
                            </div>\
                        </button>\
                    </div>\
                </div>');
            }else{
                $("#products").append('\
                <div class="col-md-2 clearfix d-none d-sm-block">\
                      <div class="card card-primary mb-2">\
                          <button class="add-btn" value="'+item.id+'">\
                              <center style="margin-top:1rem; overflow: hidden;">\
                                  <p style="font-size: medium; margin-bottom: auto;" class="pos-card-text-body"><span><b>'+item.category_name+'</b></span></p>\
                              </center>\
                            <div class="card-body" style="padding: 0.25rem;"  >\
                                <h5 style="font-size: small;" class="pos-card-text-title wordWrap"  data-toggle="tooltip" data-placement="top" title="'+item.productName+'('+item.strength+')">'+item.productName+'('+item.strength+')</h5>\
                                <p style="font-size: small;" class="pos-card-text-body">In Stock: <span>'+item.totalOnHand+'</span></p>\
                            </div>\
                        </button>\
                    </div>\
                </div>');
            }
          })
        }
    });
  }

  function category_fetch_data(page){
    var _token = $("input[name=_token]").val();

    var data = $('#hiddencategorysearchkeyword').val();
    $.ajax({
        url:"/pagination/categorysearch/"+data+"/fetch?page="+page,
        method:"POST",
        success:function(response){
           $("#products").empty();

            if(response.products.next_page_url == null){
              $("#next").attr("href", '/pos/catogory?page=' + parseInt(parseInt(response.products.current_page)))
            }else{
              $("#next").attr("href", '/pos/catogory?page=' + parseInt(parseInt(response.products.current_page)+1))
            }

            if(response.products.prev_page_url == null){
              $("#prev").attr("href", '/pos/catogory?page=' + parseInt(parseInt(response.products.current_page)))
            }else{
              $("#prev").attr("href", '/pos/catogory?page=' + parseInt(parseInt(response.products.current_page)-1))
            }

            $.each(response.products.data, function(key, item) {

            if(item.productImage == null){
              productImage = "default.jpg"
            }else{
              productImage = item.productImage
            }

            if(item.category_image == null){
              category_image = "default.jpg"
            }else{
              category_image = item.category_image
            }

            if(item.totalOnHand == 0){
                $("#products").append('\
                <div class="col-md-2 clearfix d-none d-sm-block">\
                      <div class="card card-primary mb-2">\
                          <button class="add-btn" value="'+item.id+'" disabled>\
                              <center style="margin-top:1rem; overflow: hidden;">\
                                  <p style="font-size: medium; margin-bottom: auto;" class="pos-card-text-body"><span><b>'+item.category_name+'</b></span></p>\
                              </center>\
                            <div class="card-body" style="padding: 0.25rem;" >\
                                <h5 style="font-size: small;" class="pos-card-text-title wordWrap" data-toggle="tooltip" data-placement="top" title="'+item.productName+'('+item.strength+')">'+item.productName+'('+item.strength+')</h5>\
                                <p style="font-size: small;" class="pos-card-text-body text-danger"><strong>Stock out</strong></p>\
                            </div>\
                        </button>\
                    </div>\
                </div>');
            }else{
                $("#products").append('\
                <div class="col-md-2 clearfix d-none d-sm-block">\
                      <div class="card card-primary mb-2">\
                          <button class="add-btn" value="'+item.id+'">\
                              <center style="margin-top:1rem; overflow: hidden;">\
                                  <p style="font-size: medium; margin-bottom: auto;" class="pos-card-text-body"><span><b>'+item.category_name+'</b></span></p>\
                              </center>\
                            <div class="card-body" style="padding: 0.25rem;"  >\
                                <h5 style="font-size: small;" class="pos-card-text-title wordWrap"  data-toggle="tooltip" data-placement="top" title="'+item.productName+'('+item.strength+')">'+item.productName+'('+item.strength+')</h5>\
                                <p style="font-size: small;" class="pos-card-text-body">In Stock: <span>'+item.totalOnHand+'</span></p>\
                            </div>\
                        </button>\
                    </div>\
                </div>');
            }
          })
        }
    });
  }



});
