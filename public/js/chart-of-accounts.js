$(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "/chart-of-accounts-data",
      dataType:"json",
      success: function(response){
          $('#jstree').jstree({ 
            'core' : { 'data' : response.data},
            'state' : {'opened' : true, 'selected' : true }
           });
           x()
      }
    });

    $('#jstree').on('ready.jstree', function() {
        $("#jstree").jstree("open_all");          
    });
})


  
  function x(){
    $('#jstree')
    // listen for event
    .on('changed.jstree', function (e, data) {

      var i, j, r = [];
      for(i = 0, j = data.selected.length; i < j; i++) {
        var headCode = data.instance.get_node(data.selected[i]).id
        var parent = data.instance.get_node(data.selected[i]).id
        var text = data.instance.get_node(data.selected[i]).id
      }


      $.ajax({
        type: "GET",
        url: "/chart-of-accounts-get-data/"+headCode,
        dataType:"json",
        success: function(response){
          $('#ViewAccountModal').modal('show');
          if (response.status == 200) {
            $('#edit_headcode').val(response.data[0].head_code);
            $('#edit_headname').val(response.data[0].head_name);
            $('#edit_parenthead').val(response.data[0].parent_head);
            $('#edit_parentheadlevel').val(response.data[0].parent_head_level);
            $('#edit_headtype').val(response.data[0].head_type);
            
            $('#edit_istransaction').val(response.data[0].is_transaction);
            $('#edit_isactive').val(response.data[0].is_active);
            $('#edit_isgl').val(response.data[0].is_general_ledger);

            if($('#edit_istransaction').val() == 1){
              $('#edit_istransaction').attr("checked", "checked")
            }else{
              $('#edit_istransaction').removeAttr('checked')
            }

            if($('#edit_isactive').val() == 1){
              $('#edit_isactive').attr("checked", "checked")
            }else{
              $('#edit_isactive').removeAttr('checked')
            }

            if($('#edit_isgl').val() == 1){
              $('#edit_isgl').attr("checked", "checked")
            }else{
              $('#edit_isgl').removeAttr('checked')
            }

            $('#coaid').val(response.data[0].id);
          }
          
        }
      });

    })
    // create the instance
    .jstree();


  }

//UPDATE BATCH
$(document).on('submit', '#ViewAccountFORM', function (e)
{
  e.preventDefault();

  var id = $('#coaid').val(); 

  let EditFormData = new FormData($('#ViewAccountFORM')[0]);

  if ($('#edit_istransaction').is(":checked")) {
      EditFormData.append('istransactionX', 1);
  }else{
      EditFormData.append('istransactionX', 0);
  }

  if ($('#edit_isactive').is(":checked")) {
      EditFormData.append('isactiveX', 1);
  }else{
      EditFormData.append('isactiveX', 0);
  }

  if ($('#edit_isgl').is(":checked")) {
      EditFormData.append('isglX', 1);
  }else{
      EditFormData.append('isglX', 0);
  }

  EditFormData.append('_method', 'PUT');
  

  $.ajax({
    ajaxStart: $('body').loadingModal({
        position: 'auto',
        text: 'Please Wait',
        color: '#fff',
        opacity: '0.7',
        backgroundColor: 'rgb(0,0,0)',
        animation: 'foldingCube'
      }),
    type: "POST",
    url: "/chart-of-accounts-get-data/"+id,
    data: EditFormData,
    contentType: false,
    processData: false,
    success: function(response){
      
      if($.isEmptyObject(response.error)){
                $('#ViewAccountModal').modal('hide');
                $(location).attr('href','/chart-of-accounts');
            }else{
                $('body').loadingModal('destroy');
                $('#wrongheadname').empty();

                if(response.error.headname == null){
                  headname = ""
                }else{
                  headname = response.error.headname[0]
                }
                
                $('#wrongheadname').append('<span id="">'+headname+'</span>');
                
            }
    }
  });
});


//NEW---------------
$(document).on('click', '#newBtn', function (e) {
  e.preventDefault();
  
  $('#ViewAccountModal').modal('hide');
  $('#NewAccountModal').modal('show');

  var headCode =  $('#edit_headcode').val()

      $.ajax({
        type: "GET",
        url: "/chart-of-accounts-get-data-new/"+headCode,
        dataType:"json",
        success: function(response){

          if($.isEmptyObject(response.data)){
            $.ajax({
              type: "GET",
              url: "/chart-of-accounts-get-data/"+headCode,
              dataType:"json",
              success: function(response){

                var head_code = parseInt(response.data[0].head_code)
                var head_name = response.data[0].head_name
                var parent_head_level = parseInt(response.data[0].parent_head_level)
                var head_type = response.data[0].head_type
                var is_transaction = parseInt(response.data[0].is_transaction)
                var is_active = parseInt(response.data[0].is_active)
                var is_general_ledger = parseInt(response.data[0].is_general_ledger)
                var id = parseInt(response.data[0].id)


                $('#NewAccountModal').modal('show');
                if (response.status == 200) {
                  $('#headcode').val(head_code * 100 + 1);
                  $('#parenthead').val(head_name);

                  if(parent_head_level == 0){
                    $('#parentheadlevel').val(parent_head_level * 1 + head_code);
                  }else{
                    $('#parentheadlevel').val(head_code);
                  }
                  $('#headtype').val(head_type);
                  
                  $('#istransaction').val(is_transaction);
                  $('#isactive').val(is_active);
                  $('#isgl').val(is_general_ledger);

                  if($('#istransaction').val() == 1){
                    $('#istransaction').attr("checked", "checked")
                  }else{
                    $('#istransaction').removeAttr('checked')
                  }

                  if($('#isactive').val() == 1){
                    $('#isactive').attr("checked", "checked")
                  }else{
                    $('#isactive').removeAttr('checked')
                  }

                  if($('#isgl').val() == 1){
                    $('#isgl').attr("checked", "checked")
                  }else{
                    $('#isgl').removeAttr('checked')
                  }

                  $('#coaid').val(id);
                }
                
              }
            });

          }else{

            var head_code = parseInt(response.data.head_code)
            var head_name = response.data.parent_head
            var parent_head_level = parseInt(response.data.parent_head_level)
            var head_type = response.data.head_type
            var is_transaction = parseInt(response.data.is_transaction)
            var is_active = parseInt(response.data.is_active)
            var is_general_ledger = parseInt(response.data.is_general_ledger)
            var id = parseInt(response.data.id)

            $('#NewAccountModal').modal('show');
            if (response.status == 200) {
              $('#headcode').val(head_code * 1 + 1);
              $('#parenthead').val(head_name);
              $('#parentheadlevel').val(parent_head_level);
              $('#headtype').val(head_type);
              
              $('#istransaction').val(is_transaction);
              $('#isactive').val(is_active);
              $('#isgl').val(is_general_ledger);

              if($('#istransaction').val() == 1){
                $('#istransaction').attr("checked", "checked")
              }else{
                $('#istransaction').removeAttr('checked')
              }

              if($('#isactive').val() == 1){
                $('#isactive').attr("checked", "checked")
              }else{
                $('#isactive').removeAttr('checked')
              }

              if($('#isgl').val() == 1){
                $('#isgl').attr("checked", "checked")
              }else{
                $('#isgl').removeAttr('checked')
              }

              $('#coaid').val(id);
            }
          }  
        }
      });
})


//NEW BATCH
$(document).on('submit', '#NewAccountFORM', function (e)
{
  e.preventDefault();

  // var id = $('#coaid').val(); 

  let formData = new FormData($('#NewAccountFORM')[0]);

  if ($('#edit_istransaction').is(":checked")) {
      formData.append('istransactionX', 1);
  }else{
      formData.append('istransactionX', 0);
  }

  if ($('#edit_isactive').is(":checked")) {
      formData.append('isactiveX', 1);
  }else{
      formData.append('isactiveX', 0);
  }

  if ($('#edit_isgl').is(":checked")) {
      formData.append('isglX', 1);
  }else{
      formData.append('isglX', 0);
  }

  $.ajax({
    type: "POST",
    url: "/chart-of-account-create",
    data: formData,
    contentType: false,
    processData: false,
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
    success: function(response){
      
      if($.isEmptyObject(response.error)){
                $('#NewAccountModal').modal('hide');
                $(location).attr('href','/chart-of-accounts');
            }else{

                $('#wrongheadnameX').empty();

                if(response.error.headname == null){
                  headname = ""
                }else{
                  headname = response.error.headname[0]
                }
                
                $('#wrongheadnameX').append('<span id="">'+headname+'</span>');
                
            }
    }
  });
});



 

    



